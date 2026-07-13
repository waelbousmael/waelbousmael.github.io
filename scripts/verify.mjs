#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../data/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const has = (text, fragment, label) => assert.ok(text.includes(fragment), label);
const htmlEscape = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const formattedDate = (iso, lang) => new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en-GB', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC', calendar: 'gregory'
}).format(new Date(`${iso}T00:00:00Z`));
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const classTokens = (openingTag) => {
  const classAttribute = openingTag.match(/[\t\n\f\r ]class="([^"]*)"/);
  return new Set((classAttribute?.[1] ?? '').trim().split(/\s+/).filter(Boolean));
};
const hasClassTokens = (openingTag, requiredClasses) => {
  const required = Array.isArray(requiredClasses) ? requiredClasses : [requiredClasses];
  const tokens = classTokens(openingTag);
  return required.every((className) => tokens.has(className));
};
const elements = (text, { tag, classes = [] } = {}) => {
  const found = [];
  const openingTags = /<([a-z][\w:-]*)\b[^>]*>/gi;
  for (const match of text.matchAll(openingTags)) {
    const elementTag = match[1].toLowerCase();
    if (tag && elementTag !== tag.toLowerCase()) continue;
    if (!hasClassTokens(match[0], classes)) continue;

    const start = match.index;
    const openingEnd = start + match[0].length;
    if (VOID_ELEMENTS.has(elementTag) || /\/\s*>$/.test(match[0])) {
      found.push({ tag: elementTag, open: match[0], inner: '', outer: match[0], index: start });
      continue;
    }

    const sameTag = new RegExp(`<\\/?${escapeRegExp(elementTag)}\\b[^>]*>`, 'gi');
    sameTag.lastIndex = openingEnd;
    let depth = 1;
    let closing;
    for (const candidate of text.matchAll(sameTag)) {
      if (candidate[0].startsWith('</')) depth -= 1;
      else if (!/\/\s*>$/.test(candidate[0])) depth += 1;
      if (depth === 0) {
        closing = candidate;
        break;
      }
    }
    assert.ok(closing, `HTML element <${elementTag}> must have a closing tag`);
    const closingStart = closing.index;
    const end = closingStart + closing[0].length;
    found.push({
      tag: elementTag,
      open: match[0],
      inner: text.slice(openingEnd, closingStart),
      outer: text.slice(start, end),
      index: start
    });
  }
  return found;
};
const elementWithClasses = (text, requiredClasses, label, tag) => {
  const matches = elements(text, { tag, classes: requiredClasses });
  assert.ok(matches.length > 0, label);
  return matches[0];
};
const directChildElements = (text) => {
  const found = elements(text);
  return found.filter((candidate) => !found.some((possibleParent) =>
    possibleParent !== candidate
      && possibleParent.index < candidate.index
      && possibleParent.index + possibleParent.outer.length >= candidate.index + candidate.outer.length
  ));
};
const attribute = (element, name, label) => {
  const match = element.open.match(new RegExp(`[\\t\\n\\f\\r ]${escapeRegExp(name)}="([^"]*)"`));
  assert.ok(match, label);
  return match[1];
};
const hasAttribute = (element, name) => new RegExp(`[\\t\\n\\f\\r ]${escapeRegExp(name)}(?:[\\t\\n\\f\\r =/>])`).test(element.open);
const hasClasses = (text, requiredClasses, label) => {
  const hasMatchingElement = [...text.matchAll(/<[^>]+>/g)].some(([openingTag]) => hasClassTokens(openingTag, requiredClasses));
  assert.ok(hasMatchingElement, label);
};
const assertPair = (field, label) => {
  assert.equal(typeof field?.ar, 'string', `${label}.ar must be a string`);
  assert.ok(field.ar.trim(), `${label}.ar must not be empty`);
  assert.equal(typeof field?.en, 'string', `${label}.en must be a string`);
  assert.ok(field.en.trim(), `${label}.en must not be empty`);
};
const withoutBlockComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');
const skipBalanced = (text, start, open, close) => {
  let depth = 0;
  let quote = null;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (char === '\\') index += 1;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === open) depth += 1;
    else if (char === close && --depth === 0) return index + 1;
  }
  return text.length;
};
const positiveSelectorText = (selector) => {
  let positive = '';
  for (let index = 0; index < selector.length;) {
    const char = selector[index];
    if (char === '[') {
      index = skipBalanced(selector, index, '[', ']');
      continue;
    }
    if (char === '"' || char === "'") {
      const quote = char;
      index += 1;
      while (index < selector.length && selector[index] !== quote) {
        index += selector[index] === '\\' ? 2 : 1;
      }
      index += 1;
      continue;
    }
    const notMatch = selector.slice(index).match(/^:not\s*\(/i);
    if (notMatch) {
      index = skipBalanced(selector, index + notMatch[0].length - 1, '(', ')');
      continue;
    }
    positive += char;
    index += 1;
  }
  return positive;
};
const cssRuleSelectors = (text) => {
  const source = withoutBlockComments(text);
  const selectors = [];
  let statementStart = 0;
  let quote = null;
  let bracketDepth = 0;
  let parenDepth = 0;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (char === '\\') index += 1;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === '[') bracketDepth += 1;
    else if (char === ']') bracketDepth = Math.max(0, bracketDepth - 1);
    else if (char === '(') parenDepth += 1;
    else if (char === ')') parenDepth = Math.max(0, parenDepth - 1);
    else if (char === '{' && bracketDepth === 0 && parenDepth === 0) {
      const prelude = source.slice(statementStart, index).trim();
      if (prelude && !prelude.startsWith('@')) selectors.push(prelude);
      statementStart = index + 1;
    } else if ((char === '}' || char === ';') && bracketDepth === 0 && parenDepth === 0) {
      statementStart = index + 1;
    }
  }
  return selectors;
};
const cssDeclarations = (text) => {
  const source = withoutBlockComments(text);
  const declarations = [];
  const blocks = [];
  let segmentStart = 0;
  let quote = null;
  let bracketDepth = 0;
  let parenDepth = 0;
  const addDeclaration = (end) => {
    const match = source.slice(segmentStart, end).match(/^\s*([\w-]+)\s*:\s*([\s\S]*?)\s*$/);
    if (match) declarations.push({ property: match[1].toLowerCase(), value: match[2], selector: blocks.at(-1) ?? '' });
  };
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (char === '\\') index += 1;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === '[') bracketDepth += 1;
    else if (char === ']') bracketDepth = Math.max(0, bracketDepth - 1);
    else if (char === '(') parenDepth += 1;
    else if (char === ')') parenDepth = Math.max(0, parenDepth - 1);
    else if (char === '{' && bracketDepth === 0 && parenDepth === 0) {
      blocks.push(source.slice(segmentStart, index).trim());
      segmentStart = index + 1;
    } else if (char === ';' && bracketDepth === 0 && parenDepth === 0) {
      addDeclaration(index);
      segmentStart = index + 1;
    } else if (char === '}' && bracketDepth === 0 && parenDepth === 0) {
      addDeclaration(index);
      blocks.pop();
      segmentStart = index + 1;
    }
  }
  return declarations;
};
const withoutCssStringsAndUrls = (text) => {
  let masked = '';
  for (let index = 0; index < text.length;) {
    const char = text[index];
    if (char === '"' || char === "'") {
      const start = index;
      const quote = char;
      index += 1;
      while (index < text.length && text[index] !== quote) index += text[index] === '\\' ? 2 : 1;
      index = Math.min(text.length, index + 1);
      masked += ' '.repeat(index - start);
      continue;
    }
    const urlMatch = text.slice(index).match(/^url\s*\(/i);
    if (urlMatch && (index === 0 || !/[\w-]/.test(text[index - 1]))) {
      const start = index;
      index = skipBalanced(text, index + urlMatch[0].length - 1, '(', ')');
      masked += ' '.repeat(index - start);
      continue;
    }
    masked += char;
    index += 1;
  }
  return masked;
};
const hasCssSelector = (text, selector, label) => {
  assert.match(selector, /^\.[a-z_-][\w-]*$/i, 'CSS selector guard accepts a single class selector');
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const selectorToken = new RegExp(`(?:^|[^\\w-])${escapedSelector}(?![\\w-])`);
  assert.ok(cssRuleSelectors(text).some((candidate) => selectorToken.test(positiveSelectorText(candidate))), label);
};
const hasCssSelectorBranch = (text, selector, label) => {
  const normalizedSelector = selector.trim().replace(/\s+/g, ' ');
  const hasExactBranch = cssRuleSelectors(text).some((candidate) =>
    candidate.split(',').some((branch) => branch.trim().replace(/\s+/g, ' ') === normalizedSelector)
  );
  assert.ok(hasExactBranch, label);
};
const assertCssDeclarations = (text, selector, expected, label) => {
  const escaped = escapeRegExp(selector).replace(/\s+/g, '\\s+');
  const match = withoutBlockComments(text).match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^{}]*)\\}`));
  assert.ok(match, `${label} must define ${selector}`);
  const actual = new Map([...match[1].matchAll(/([\w-]+)\s*:\s*([^;]+);/g)].map((declaration) => [declaration[1], declaration[2].trim().replace(/\s+/g, ' ')]));
  for (const [property, value] of Object.entries(expected)) {
    assert.equal(actual.get(property), value, `${label} ${selector} must set ${property}: ${value}`);
  }
};
const assertCssOmitsDeclarations = (text, selector, forbidden, label) => {
  const escaped = escapeRegExp(selector).replace(/\s+/g, '\\s+');
  const match = withoutBlockComments(text).match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^{}]*)\\}`));
  assert.ok(match, `${label} must define ${selector}`);
  const actual = new Set([...match[1].matchAll(/([\w-]+)\s*:/g)].map((declaration) => declaration[1]));
  for (const property of forbidden) assert.ok(!actual.has(property), `${label} ${selector} must not set ${property}`);
};
const assertServiceInteractionCss = (text, label) => {
  assertCssDeclarations(text, '.service-editorial-row:hover, .service-editorial-row:focus-visible', { 'border-block-end-color': 'var(--line-strong)' }, label);
  assertCssDeclarations(text, '.service-editorial-row:hover .svc-more, .service-editorial-row:focus-visible .svc-more', { color: 'var(--ink)' }, label);
  const serviceRule = /(?:^|[^\w-])\.service-editorial-row(?![\w-])/;
  for (const rule of withoutBlockComments(text).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!serviceRule.test(positiveSelectorText(rule[1]))) continue;
    assert.doesNotMatch(rule[2], /\b(?:transition|animation)(?:-[\w-]+)?\s*:/i, `${label} must not add motion to service rows`);
  }
};
const assertResponsiveJournalPlacement = (text, label) => {
  assertCssDeclarations(text, '.journal-editorial-list a', { 'grid-template-columns': '1fr auto' }, label);
  assertCssDeclarations(text, '.journal-editorial-list p', { 'grid-column': '1 / -1' }, label);
  assertCssDeclarations(text, '.journal-editorial-list a > time', { 'grid-column': '1', 'grid-row': '1' }, label);
  assertCssDeclarations(text, '.journal-editorial-list a > .svc-more', { 'grid-column': '2', 'grid-row': '1' }, label);
  assertCssDeclarations(text, '.journal-editorial-list a > .journal-entry-copy', {
    'grid-column': '1 / -1', 'grid-row': '2', 'min-width': '0'
  }, label);
};
const assertDirectContactInteractionCss = (text, label) => {
  assertCssDeclarations(text, '.direct-contact a:hover, .direct-contact a:focus-visible', { color: 'var(--ink)' }, label);
  for (const rule of withoutBlockComments(text).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/\.direct-contact\s+a\b/.test(positiveSelectorText(rule[1]))) continue;
    assert.doesNotMatch(rule[2], /\b(?:transition|animation)(?:-[\w-]+)?\s*:/i, `${label} must not add motion to direct-contact links`);
  }
};
const assertMobileMenuFocusRestoration = (text, label) => {
  const source = withoutBlockComments(text);
  const closeMenu = source.match(/const\s+closeMenu\s*=\s*\(\)\s*=>\s*\{([\s\S]*?)\n\s*\};/);
  assert.ok(closeMenu, `${label} must define closeMenu`);
  assert.match(closeMenu[1], /toggle\.focus\(\s*\)/, `${label} closeMenu must restore focus to the navigation toggle`);
};
const assertEditorialCss = (text, requireLockedTokens = false) => {
  const source = withoutBlockComments(text);
  const declarations = cssDeclarations(source);
  const isZeroValue = (value) => /^0(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|q)?$/i.test(value);
  assert.doesNotMatch(source, /\bstamp-in\b/i, 'CSS must not contain the stamp-in motion token');

  for (const match of source.matchAll(/\bbox-shadow\s*:\s*([^;{}]+)/gi)) {
    const value = match[1].replace(/\s*!important\s*$/i, '').trim();
    const parts = value.split(/\s+/);
    const isTransparentZeroShadow = parts.length === 5
      && parts.slice(0, 4).every(isZeroValue)
      && parts[4].toLowerCase() === 'transparent';
    assert.ok(value.toLowerCase() === 'none' || isTransparentZeroShadow, `CSS must not contain visible box shadows: ${match[0].trim()}`);
  }

  for (const match of source.matchAll(/--radius(?:-sm|-pill)?\s*:\s*([^;{}]+)/gi)) {
    assert.ok(isZeroValue(match[1].trim()), `CSS radius token must be zero-valued: ${match[0].trim()}`);
  }
  for (const match of source.matchAll(/\bborder(?:-[a-z]+)*-radius\s*:\s*([^;{}]+)/gi)) {
    const values = match[1].trim().split(/\s+/);
    const isZeroRadius = values.every((value) =>
      isZeroValue(value) || /^var\(--radius(?:-sm|-pill)?\)$/i.test(value)
    );
    assert.ok(isZeroRadius, `CSS radius must resolve to zero: ${match[0].trim()}`);
  }

  const lockedColors = new Map([
    ['--bg', '#faf8f4'],
    ['--surface', '#f2eee7'],
    ['--ink', '#1e1c19'],
    ['--ink-soft', '#4a463f'],
    ['--muted', '#857f74'],
    ['--line', 'rgba(30,28,25,.13)'],
    ['--line-strong', 'rgba(30,28,25,.38)']
  ]);
  for (const [token, expected] of lockedColors) {
    const matches = declarations.filter(({ property }) => property === token);
    if (requireLockedTokens || matches.length > 0) {
      assert.equal(matches.length, 1, `CSS must declare locked token ${token} exactly once`);
      assert.equal(matches[0].selector, ':root', `CSS must declare locked token ${token} exactly once in canonical :root`);
      assert.equal(matches[0].value.replace(/\s+/g, '').toLowerCase(), expected, `CSS ${token} must retain its locked value`);
    }
  }

  const rootMatch = source.match(/:root\s*\{([^{}]*)\}/i);
  let sourceWithoutLockedColors = source;
  if (rootMatch) {
    let rootWithoutLockedColors = rootMatch[0];
    for (const [token, expected] of lockedColors) {
      const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const declaration = new RegExp(`(${escapedToken}\\s*:\\s*)([^;{}]+)(\\s*;)`, 'i');
      const match = rootMatch[0].match(declaration);
      if (!match) continue;
      rootWithoutLockedColors = rootWithoutLockedColors.replace(declaration, `$1var(--locked-color)$3`);
    }
    sourceWithoutLockedColors = source.replace(rootMatch[0], rootWithoutLockedColors);
  }

  const namedColors = new Set(`aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen`.split(/\s+/));
  const colorBearingProperty = /^(?:color|[\w-]+-color|background|border|border-(?:block|inline)(?:-(?:start|end))?|border-(?:top|right|bottom|left)|outline|fill|stroke|text-shadow|box-shadow)$/;
  for (const { property, value } of declarations.filter(({ property }) => colorBearingProperty.test(property))) {
    const inspectableValue = withoutCssStringsAndUrls(value);
    for (const match of inspectableValue.matchAll(/var\(\s*(--[\w-]+)/gi)) {
      assert.ok(lockedColors.has(match[1].toLowerCase()), `CSS ${property} must use a locked color token`);
    }
    for (const match of inspectableValue.matchAll(/\b[a-z][a-z0-9-]*\b/gi)) {
      assert.ok(!namedColors.has(match[0].toLowerCase()), `CSS must not contain hardcoded or named colors: ${property}: ${value}`);
    }
  }

  const inspectableSource = withoutCssStringsAndUrls(sourceWithoutLockedColors);
  assert.doesNotMatch(
    inspectableSource,
    /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\s*\(/i,
    'CSS must not contain hardcoded or named colors outside locked :root token declarations'
  );
};
const leadForm = (page, label) => {
  const match = page.match(/<form id="leadForm"(?=[\s>])[\s\S]*?<\/form>/);
  assert.ok(match, `${label} contact page must contain the lead form`);
  return match[0];
};
const assertWorkCredits = (page, lang, prefix, label) => {
  const credits = elementWithClasses(page, 'work-credits', `${label} work page must retain its scoped credits note`);
  const links = elements(credits.inner, { tag: 'a' });
  assert.ok(links.length > 0, `${label} work credits must contain a link`);
  assert.equal(attribute(links[0], 'href', `${label} work credits link must have an href`), `${prefix}/credits/`, `${label} work credits must link to the localized credits page`);
  has(links[0].inner, htmlEscape(site.work.noteLink[lang]), `${label} work credits must retain the localized note link text`);
};
const replaceElement = (text, element, replacement) =>
  text.slice(0, element.index) + replacement + text.slice(element.index + element.outer.length);
const replaceElementInner = (text, element, inner) =>
  replaceElement(text, element, `${element.open}${inner}</${element.tag}>`);
const assertWorkPage = (page, lang, prefix, label, portfolio = projects) => {
  const grid = elementWithClasses(page, 'work-editorial-grid', `${label} work page must use the editorial portfolio grid`);
  const cards = elements(grid.inner, { tag: 'a', classes: 'project-card' });
  assert.equal(cards.length, portfolio.length, `${label} work project card count must match portfolio data`);
  portfolio.forEach((project, projectIndex) => {
    const card = cards[projectIndex];
    const cardLabel = `${label} work project card ${projectIndex + 1}`;
    assert.equal(attribute(card, 'href', `${cardLabel} must have an href`), `${prefix}/work/${project.slug}/`, `${cardLabel} must follow portfolio data order`);
    const cardText = elementWithClasses(card.inner, 'card-text', `${cardLabel} must retain card-text`);
    const title = elements(cardText.inner, { tag: 'h3' })[0];
    assert.ok(title, `${cardLabel} card-text must retain its title`);
    has(title.inner, htmlEscape(project.title[lang]), `${cardLabel} must retain its localized title`);
    const metadata = elementWithClasses(cardText.inner, 'card-meta', `${cardLabel} must retain card metadata`);
    const statusTags = elements(metadata.inner, { classes: 'tag' });
    if (project.placeholder) {
      assert.equal(statusTags.length, 1, `${cardLabel} placeholder must retain exactly one status tag`);
      assert.equal(statusTags[0].inner.trim(), htmlEscape(project.status[lang]), `${cardLabel} status tag must retain localized status`);
    } else {
      assert.equal(statusTags.length, 0, `${cardLabel} real project must not render a status tag`);
    }
    const metadataWithoutTag = statusTags.reduce((content, tag) => content.replace(tag.outer, ''), metadata.inner).trim();
    const expectedMetadata = htmlEscape([project.category[lang], project.location[lang], project.year].join(' · '));
    assert.equal(metadataWithoutTag, expectedMetadata, `${cardLabel} must retain exact localized card metadata`);
    assert.equal(hasClassTokens(card.open, 'is-wide'), projectIndex === 0, `${cardLabel} must ${projectIndex === 0 ? '' : 'not '}be the wide card`);
    assertImage(card.inner, project.cover, lang, { eager: projectIndex === 0, label: cardLabel });
  });
  assertWorkCredits(page, lang, prefix, label);
};
const assertImage = (scope, image, lang, { eager, label }) => {
  const imageElement = elements(scope, { tag: 'img' })[0];
  assert.ok(imageElement, `${label} must contain an image`);
  assert.equal(attribute(imageElement, 'src', `${label} image must have src`), htmlEscape(image.src), `${label} must retain its image source`);
  assert.equal(attribute(imageElement, 'width', `${label} image must have intrinsic width`), String(image.w), `${label} must retain intrinsic width`);
  assert.equal(attribute(imageElement, 'height', `${label} image must have intrinsic height`), String(image.h), `${label} must retain intrinsic height`);
  assert.equal(attribute(imageElement, 'alt', `${label} image must have localized alt text`), htmlEscape(image.alt[lang]), `${label} must retain localized escaped alt text`);
  assert.equal(attribute(imageElement, 'decoding', `${label} image must declare decoding semantics`), 'async', `${label} image must decode asynchronously`);
  if (eager) {
    assert.equal(attribute(imageElement, 'fetchpriority', `${label} eager image must have fetch priority`), 'high', `${label} eager image must use high fetch priority`);
    assert.ok(!hasAttribute(imageElement, 'loading'), `${label} eager image must not be lazy loaded`);
  } else {
    assert.equal(attribute(imageElement, 'loading', `${label} lazy image must declare loading semantics`), 'lazy', `${label} gallery image must be lazy loaded`);
    assert.ok(!hasAttribute(imageElement, 'fetchpriority'), `${label} lazy image must not use eager fetch priority`);
  }
};
const assertProjectPage = (page, project, projectIndex, lang, prefix, label, portfolio = projects) => {
  const pageLabel = `${label} ${project.slug}`;
  const heading = elementWithClasses(page, 'display-xl', `${pageLabel} must retain its page heading`, 'h1');
  has(heading.inner, htmlEscape(project.title[lang]), `${pageLabel} heading must retain the localized title`);

  const cover = elementWithClasses(page, 'project-cover', `${pageLabel} must retain its cover figure`, 'figure');
  assert.ok(heading.index < cover.index, `${pageLabel} heading must remain before the project cover`);
  assertImage(cover.inner, project.cover, lang, { eager: true, label: `${pageLabel} cover` });

  const intro = elementWithClasses(page, 'project-intro-grid', `${pageLabel} must use the editorial intro grid`);
  const story = elementWithClasses(intro.inner, ['project-story', 'flow'], `${pageLabel} must group its narrative in the project story`);
  const storyParagraphs = elements(story.inner, { tag: 'p' });
  assert.equal(storyParagraphs.length, project.body.length + 1, `${pageLabel} story must contain the thesis followed by every body paragraph`);
  assert.ok(hasClassTokens(storyParagraphs[0].open, 'thesis'), `${pageLabel} story must begin with the thesis`);
  has(storyParagraphs[0].inner, htmlEscape(project.thesis[lang]), `${pageLabel} must retain its localized thesis`);
  for (const [bodyIndex, paragraph] of project.body.entries()) {
    has(storyParagraphs[bodyIndex + 1].inner, htmlEscape(paragraph[lang]), `${pageLabel} must retain localized body paragraph ${bodyIndex + 1}`);
  }

  const details = elementWithClasses(intro.inner, 'details', `${pageLabel} must retain its project details`, 'dl');
  const detailRows = elements(details.inner, { classes: 'details-row' });
  const detailValues = [
    [site.project.location[lang], project.location[lang]],
    [site.project.year[lang], String(project.year)],
    [site.project.category[lang], project.category[lang]],
    [site.project.status[lang], project.status[lang]],
    [site.project.services[lang], project.services[lang].join(' · ')]
  ];
  assert.equal(detailRows.length, detailValues.length, `${pageLabel} must retain exactly five token-matched detail rows`);
  detailValues.forEach(([term, value], detailIndex) => {
    const terms = elements(detailRows[detailIndex].inner, { tag: 'dt' });
    const descriptions = elements(detailRows[detailIndex].inner, { tag: 'dd' });
    assert.equal(terms.length, 1, `${pageLabel} detail row ${detailIndex + 1} must contain one term`);
    assert.equal(descriptions.length, 1, `${pageLabel} detail row ${detailIndex + 1} must contain one description`);
    has(terms[0].inner, htmlEscape(term), `${pageLabel} detail row ${detailIndex + 1} must retain its localized label`);
    has(descriptions[0].inner, htmlEscape(value), `${pageLabel} detail row ${detailIndex + 1} must retain its data-derived value`);
  });

  const gallery = elementWithClasses(page, 'gallery', `${pageLabel} must retain its gallery`);
  const gallerySections = elements(page, { tag: 'section' }).filter((section) =>
    elements(section.inner, { classes: 'gallery' }).length > 0
  );
  assert.equal(gallerySections.length, 1, `${pageLabel} must retain exactly one gallery section`);
  const galleryWraps = elements(gallerySections[0].inner, { classes: 'wrap' }).filter((wrap) =>
    elements(wrap.inner, { classes: 'gallery' }).length > 0
  );
  assert.equal(galleryWraps.length, 1, `${pageLabel} gallery section must retain exactly one gallery wrap`);
  const galleryWrap = galleryWraps[0];
  const scopedGallery = elementWithClasses(galleryWrap.inner, 'gallery', `${pageLabel} gallery region must contain its gallery`);
  const galleryFigures = elements(scopedGallery.inner, { tag: 'figure' });
  assert.equal(galleryFigures.length, project.gallery.length, `${pageLabel} must retain every gallery figure`);
  project.gallery.forEach((galleryImage, galleryIndex) => {
    const figure = galleryFigures[galleryIndex];
    const expectedLayout = galleryImage.w >= galleryImage.h ? 'g-wide' : 'g-tall';
    assert.ok(hasClassTokens(figure.open, expectedLayout), `${pageLabel} gallery figure ${galleryIndex + 1} must use ${expectedLayout}`);
    assert.ok(hasAttribute(figure, 'data-reveal'), `${pageLabel} gallery figure ${galleryIndex + 1} must retain data-reveal`);
    assertImage(figure.inner, galleryImage, lang, { eager: false, label: `${pageLabel} gallery figure ${galleryIndex + 1}` });
  });

  const galleryNotes = elements(galleryWrap.inner, { classes: 'gallery-note' });
  if (project.placeholder) {
    assert.equal(galleryNotes.length, 1, `${pageLabel} placeholder gallery region must retain one gallery note`);
    assert.ok(galleryNotes[0].index > scopedGallery.index + scopedGallery.outer.length, `${pageLabel} gallery note must follow the gallery within the same wrap`);
    has(galleryNotes[0].inner, htmlEscape(site.project.galleryNote[lang]), `${pageLabel} gallery note must retain its localized text`);
    const noteLink = elements(galleryNotes[0].inner, { tag: 'a' })[0];
    assert.ok(noteLink, `${pageLabel} gallery note must contain its credits link`);
    assert.equal(attribute(noteLink, 'href', `${pageLabel} gallery note link must have href`), `${prefix}/credits/`, `${pageLabel} gallery note must use the localized credits href`);
    has(noteLink.inner, htmlEscape(site.project.galleryNoteLink[lang]), `${pageLabel} gallery note must retain localized link text`);
  } else {
    assert.equal(galleryNotes.length, 0, `${pageLabel} non-placeholder gallery region must not render a gallery note`);
  }

  const next = portfolio[(projectIndex + 1) % portfolio.length];
  const nextContainer = elementWithClasses(page, 'next-project', `${pageLabel} must retain its next-project container`);
  has(nextContainer.inner, htmlEscape(site.project.nextProject[lang]), `${pageLabel} must retain the localized next-project label`);
  const nextLink = elementWithClasses(nextContainer.inner, 'next-link', `${pageLabel} must retain its next-project link`, 'a');
  assert.equal(attribute(nextLink, 'href', `${pageLabel} next-project link must have href`), `${prefix}/work/${next.slug}/`, `${pageLabel} next-project link must target the correct localized project`);
  has(nextLink.inner, htmlEscape(next.title[lang]), `${pageLabel} next-project link must retain the localized project title`);
  has(nextLink.inner, lang === 'ar' ? '←' : '→', `${pageLabel} next-project link must retain the directional arrow`);
  assert.ok(
    heading.index < cover.index
      && cover.index < intro.index
      && intro.index < gallery.index
      && gallery.index < nextContainer.index,
    `${pageLabel} must retain the heading, cover, intro, gallery, next-project structural sequence`
  );
};

const jsonLdGraph = (page, label) => {
  const match = page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, `${label} must retain its JSON-LD graph`);
  return JSON.parse(match[1])['@graph'];
};
const assertSeoShell = (page, data, lang, logicalPath, label) => {
  const localizedPath = lang === 'ar' ? logicalPath : `/en${logicalPath}`;
  has(page, `<title>${htmlEscape(data.seoTitle[lang])}</title>`, `${label} must retain its SEO title`);
  has(page, `<meta name="description" content="${htmlEscape(data.seoDesc[lang])}" />`, `${label} must retain its SEO description`);
  has(page, `<link rel="canonical" href="${site.domain}${localizedPath}" />`, `${label} must retain its canonical URL`);
  has(page, `<link rel="alternate" hreflang="ar" href="${site.domain}${logicalPath}" />`, `${label} must retain its Arabic alternate`);
  has(page, `<link rel="alternate" hreflang="en" href="${site.domain}/en${logicalPath}" />`, `${label} must retain its English alternate`);
};
const assertServiceRows = (scope, landings, lang, prefix, headingTag, label) => {
  const list = elementWithClasses(scope, 'service-editorial-list', `${label} must use service-editorial-list`);
  const rows = elements(list.inner, { tag: 'a', classes: 'service-editorial-row' });
  assert.equal(rows.length, landings.length, `${label} service row count must match landing data`);
  landings.forEach((landing, index) => {
    const row = rows[index];
    assert.equal(attribute(row, 'href', `${label} row ${index + 1} must have an href`), `${prefix}/${landing.slug}/`, `${label} row ${index + 1} must retain its localized path`);
    assert.ok(hasAttribute(row, 'data-reveal'), `${label} row ${index + 1} must retain data-reveal`);
    const heading = elements(row.inner, { tag: headingTag })[0];
    assert.ok(heading, `${label} row ${index + 1} must use ${headingTag}`);
    assert.equal(heading.inner.trim(), htmlEscape(landing.label[lang]), `${label} row ${index + 1} must retain its localized label`);
    const summary = elements(row.inner, { tag: 'p' })[0];
    assert.ok(summary, `${label} row ${index + 1} must retain its summary`);
    assert.equal(summary.inner.trim(), htmlEscape(landing.summary[lang]), `${label} row ${index + 1} must retain its localized summary`);
    const more = elementWithClasses(row.inner, 'svc-more', `${label} row ${index + 1} must retain svc-more`, 'span');
    has(more.inner, htmlEscape(site.services.explore[lang]), `${label} row ${index + 1} must retain localized explore copy`);
    has(more.inner, lang === 'ar' ? '←' : '→', `${label} row ${index + 1} must retain its directional arrow`);
  });
};
const assertServicesPage = (page, lang, prefix, label) => {
  assertSeoShell(page, site.services, lang, '/services/', label);
  has(page, htmlEscape(site.services.h1[lang]), `${label} must retain its localized heading`);
  has(page, htmlEscape(site.services.intro[lang]), `${label} must retain its localized introduction`);
  assertServiceRows(page, site.landings, lang, prefix, 'h2', label);
  const graph = jsonLdGraph(page, label);
  assert.equal(graph.filter((node) => node['@type'] === 'Service').length, site.landings.length, `${label} must retain one Service schema node per landing`);
  assert.equal(graph.filter((node) => node['@type'] === 'BreadcrumbList').length, 1, `${label} must retain BreadcrumbList schema`);
};
const assertLandingPage = (page, landing, lang, prefix, label) => {
  const logicalPath = `/${landing.slug}/`;
  assertSeoShell(page, landing, lang, logicalPath, label);
  for (const field of [landing.eyebrow, landing.h1, landing.intro]) has(page, htmlEscape(field[lang]), `${label} must retain localized landing copy`);
  const contentGrid = elementWithClasses(page, ['wrap', 'landing-content-grid'], `${label} must use landing-content-grid`);
  const sections = elements(contentGrid.inner, { tag: 'section', classes: 'landing-section-row' });
  assert.equal(sections.length, landing.sections.length, `${label} content row count must match landing data`);
  landing.sections.forEach((section, index) => {
    const heading = elements(sections[index].inner, { tag: 'h2', classes: 'display' })[0];
    assert.ok(heading, `${label} content row ${index + 1} must retain its display heading`);
    assert.equal(heading.inner.trim(), htmlEscape(section.heading[lang]), `${label} content row ${index + 1} must retain its heading text`);
    const paragraph = elements(sections[index].inner, { tag: 'p' })[0];
    assert.ok(paragraph, `${label} content row ${index + 1} must retain its paragraph`);
    assert.equal(paragraph.inner.trim(), htmlEscape(section.body[lang]), `${label} content row ${index + 1} must retain its body text`);
  });
  landing.faq.forEach((item) => {
    has(page, htmlEscape(item.q[lang]), `${label} must retain every FAQ question`);
    has(page, htmlEscape(item.a[lang]), `${label} must retain every FAQ answer`);
  });
  has(page, `href="https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage[lang])}"`, `${label} must retain its WhatsApp CTA`);
  has(page, `href="${prefix}/contact/"`, `${label} must retain its contact CTA`);
  has(page, htmlEscape(site.contactBand.text[lang]), `${label} must retain the core offer copy`);
  for (const slug of landing.relatedProjects || []) has(page, `href="${prefix}/work/${slug}/"`, `${label} must retain related project links`);
  const relatedLandings = (landing.related || []).map((slug) => site.landings.find((candidate) => candidate.slug === slug)).filter(Boolean);
  if (relatedLandings.length) assertServiceRows(page, relatedLandings, lang, prefix, 'h3', `${label} related services`);
  const graph = jsonLdGraph(page, label);
  assert.deepEqual(graph.map((node) => node['@type']), ['Service', 'FAQPage', 'BreadcrumbList'], `${label} must retain its Service, FAQPage and BreadcrumbList graph`);
  const service = graph[0];
  assert.equal(service.name, landing.h1[lang], `${label} Service schema must retain its name`);
  assert.equal(service.description, landing.seoDesc[lang], `${label} Service schema must retain its description`);
  assert.equal(service.url, `${site.domain}${prefix}${logicalPath}`, `${label} Service schema must retain its localized URL`);
  assert.deepEqual(graph[1].mainEntity.map((entity) => [entity.name, entity.acceptedAnswer.text]), landing.faq.map((item) => [item.q[lang], item.a[lang]]), `${label} FAQPage schema must retain every localized FAQ`);
  assert.equal(graph[2].itemListElement.at(-1).item, `${site.domain}${prefix}${logicalPath}`, `${label} breadcrumb schema must retain its current URL`);
};
const assertApproachPage = (page, lang, prefix, label) => {
  const approach = site.approach;
  assertSeoShell(page, approach, lang, '/approach/', label);
  for (const field of [approach.h1, approach.intro, approach.servicesTitle, approach.processTitle]) has(page, htmlEscape(field[lang]), `${label} must retain all approach headings and introduction`);
  approach.services.forEach((service) => {
    has(page, htmlEscape(service.title[lang]), `${label} must retain every service title`);
    has(page, htmlEscape(service.text[lang]), `${label} must retain every service description`);
  });
  const sequence = elementWithClasses(page, 'approach-sequence', `${label} must use approach-sequence`, 'ol');
  assert.equal(attribute(sequence, 'role', `${label} approach sequence must declare a role`), 'list', `${label} approach sequence must retain Safari/VoiceOver list semantics`);
  const steps = elements(sequence.inner, { tag: 'li' });
  assert.equal(steps.length, approach.steps.length, `${label} step count must match approach data`);
  approach.steps.forEach((step, index) => {
    const number = elementWithClasses(steps[index].inner, 'step-num', `${label} step ${index + 1} must retain its number`, 'span');
    assert.equal(number.inner.trim(), String(index + 1).padStart(2, '0'), `${label} step ${index + 1} must retain its ordered number`);
    assert.equal(attribute(number, 'aria-hidden', `${label} step ${index + 1} number must declare aria-hidden`), 'true', `${label} step ${index + 1} visible number must not duplicate spoken numbering`);
    const content = elements(steps[index].inner, { tag: 'div' })[0];
    assert.ok(content, `${label} step ${index + 1} must group heading and text in a div`);
    assert.equal(elements(content.inner, { tag: 'h3' })[0]?.inner.trim(), htmlEscape(step.title[lang]), `${label} step ${index + 1} must retain its title in order`);
    assert.equal(elements(content.inner, { tag: 'p' })[0]?.inner.trim(), htmlEscape(step.text[lang]), `${label} step ${index + 1} must retain its text in order`);
  });
  assert.doesNotMatch(page, /class="[^"]*\bworkflow(?:-media|-step|-num)?\b/, `${label} must not render obsolete workflow classes`);
  for (const step of approach.steps) assert.ok(!page.includes(step.image.src), `${label} must not render workflow image output`);
  has(page, htmlEscape(site.offer[lang]), `${label} must retain the offer`);
  has(page, `href="${prefix}/contact/"`, `${label} must retain its contact CTA`);
  has(page, `href="https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage[lang])}"`, `${label} must retain its WhatsApp CTA`);
  assert.equal(jsonLdGraph(page, label)[0]['@type'], 'BreadcrumbList', `${label} must retain BreadcrumbList schema`);
};

const assertAboutPage = (page, lang, prefix, label) => {
  const about = site.about;
  assertSeoShell(page, about, lang, '/about/', label);
  const founder = elementWithClasses(page, ['wrap', 'founder-grid'], `${label} must use founder-grid`);
  assert.equal(elements(page, { classes: 'founder-grid' }).length, 1, `${label} must contain exactly one founder-grid`);
  for (const field of [about.h1, about.intro, about.name, about.bio, about.practiceTitle, about.practiceText]) {
    has(page, htmlEscape(field[lang]), `${label} must retain all localized founder copy`);
  }
  has(founder.inner, `src="${htmlEscape(about.portrait.src)}"`, `${label} must retain the founder portrait`);
  has(founder.inner, `alt="${htmlEscape(about.portrait.alt[lang])}"`, `${label} must retain localized founder portrait alt text`);
  about.facts.forEach((fact) => {
    has(page, htmlEscape(fact.label[lang]), `${label} must retain every founder fact label`);
    has(page, htmlEscape(fact.value[lang]), `${label} must retain every founder fact value`);
  });
  has(page, `href="${prefix}/contact/"`, `${label} must retain its contact CTA`);
  has(page, `href="https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage[lang])}"`, `${label} must retain its WhatsApp CTA`);
};

const assertJournalHub = (page, lang, prefix, label) => {
  const meta = site.journalMeta;
  assertSeoShell(page, meta, lang, '/journal/', label);
  const list = elementWithClasses(page, 'journal-editorial-list', `${label} must use journal-editorial-list`, 'ul');
  const rows = elements(list.inner, { tag: 'li' });
  const sorted = [...site.journal].sort((a, b) => (a.date < b.date ? 1 : -1));
  assert.equal(rows.length, sorted.length, `${label} must retain every journal article`);
  sorted.forEach((article, index) => {
    const links = elements(rows[index].inner, { tag: 'a' });
    assert.equal(links.length, 1, `${label} row ${index + 1} must contain exactly one link`);
    const link = links[0];
    assert.equal(attribute(link, 'href', `${label} row ${index + 1} must have a route`), `${prefix}/journal/${article.slug}/`, `${label} row ${index + 1} must preserve localized article order and route`);
    const directChildren = directChildElements(link.inner);
    assert.deepEqual(directChildren.map((child) => [child.tag, [...classTokens(child.open)]]), [
      ['time', []], ['div', ['journal-entry-copy']], ['span', ['svc-more']]
    ], `${label} row ${index + 1} must keep time, journal copy and read-more as direct link children`);
    const time = elements(link.inner, { tag: 'time' })[0];
    assert.ok(time, `${label} row ${index + 1} must retain its date`);
    assert.equal(attribute(time, 'datetime', `${label} row ${index + 1} date must have datetime`), article.date, `${label} row ${index + 1} must retain its machine-readable date`);
    assert.equal(time.inner.trim(), formattedDate(article.date, lang), `${label} row ${index + 1} must retain its exact localized formatted date`);
    const copy = elementWithClasses(link.inner, 'journal-entry-copy', `${label} row ${index + 1} must group article copy`);
    assert.equal(elements(copy.inner, { tag: 'h2' })[0]?.inner.trim(), htmlEscape(article.h1[lang]), `${label} row ${index + 1} must retain its title`);
    assert.equal(elements(copy.inner, { tag: 'p' })[0]?.inner.trim(), htmlEscape(article.desc[lang]), `${label} row ${index + 1} must retain its description`);
    const more = elementWithClasses(link.inner, 'svc-more', `${label} row ${index + 1} must retain read-more copy`, 'span');
    has(more.inner, htmlEscape(meta.readMore[lang]), `${label} row ${index + 1} must retain localized read-more copy`);
    has(more.inner, lang === 'ar' ? '←' : '→', `${label} row ${index + 1} must retain its directional arrow`);
  });
};

const assertArticlePage = (page, article, lang, prefix, label) => {
  const logicalPath = `/journal/${article.slug}/`;
  assertSeoShell(page, { seoTitle: article.title, seoDesc: article.desc }, lang, logicalPath, label);
  const readingColumn = elementWithClasses(page, ['wrap', 'article-reading-column', 'flow'], `${label} must use article-reading-column`);
  assert.equal(elements(page, { classes: 'article-reading-column' }).length, 1, `${label} must contain exactly one article reading column`);
  for (const field of [article.h1, article.intro]) has(page, htmlEscape(field[lang]), `${label} must retain article metadata and introduction`);
  has(page, `<time datetime="${article.date}">`, `${label} must retain article date metadata`);
  assert.equal(elements(readingColumn.inner, { tag: 'h2', classes: 'display' }).length, article.sections.length, `${label} must retain every article section`);
  article.sections.forEach((section) => {
    has(readingColumn.inner, htmlEscape(section.heading[lang]), `${label} must retain every section heading`);
    has(readingColumn.inner, htmlEscape(section.body[lang]), `${label} must retain every section body`);
  });
  const related = (article.related || []).map((slug) => site.landings.find((candidate) => candidate.slug === slug)).filter(Boolean);
  if (related.length) assertServiceRows(page, related, lang, prefix, 'h3', `${label} related services`);
  const graph = jsonLdGraph(page, label);
  assert.deepEqual(graph.map((node) => node['@type']), ['Article', 'BreadcrumbList'], `${label} must retain Article and BreadcrumbList schema`);
  assert.equal(graph[0].headline, article.h1[lang], `${label} Article schema must retain its headline`);
  assert.equal(graph[0].description, article.desc[lang], `${label} Article schema must retain its description`);
  assert.equal(graph[0].datePublished, article.date, `${label} Article schema must retain its publication date`);
  assert.equal(graph[0].mainEntityOfPage, `${site.domain}${prefix}${logicalPath}`, `${label} Article schema must retain its localized URL`);
};

const assertField = (scope, expected, label) => {
  const fields = elements(scope, { tag: expected.tag });
  const field = fields.find((candidate) => attribute(candidate, 'name', `${label} field must have a name`) === expected.name);
  assert.ok(field, `${label} must retain the ${expected.name} field`);
  for (const [name, value] of Object.entries(expected.attributes)) {
    assert.equal(attribute(field, name, `${label} ${expected.name} must retain ${name}`), value, `${label} ${expected.name} must retain ${name}="${value}"`);
  }
  for (const name of expected.booleanAttributes || []) assert.ok(hasAttribute(field, name), `${label} ${expected.name} must retain ${name}`);
  return field;
};

const assertContactPage = (page, lang, label) => {
  const form = leadForm(page, label);
  assert.equal(attribute(elements(form, { tag: 'form' })[0], 'action', `${label} form must have action`), site.formAction, `${label} form must retain FormSubmit endpoint`);
  assert.equal(attribute(elements(form, { tag: 'form' })[0], 'method', `${label} form must have method`), 'POST', `${label} form must retain POST method`);
  assert.ok(hasAttribute(elements(form, { tag: 'form' })[0], 'novalidate'), `${label} form must retain novalidate behavior`);
  const hidden = elements(form, { tag: 'input' }).filter((input) => /\stype="hidden"/.test(input.open));
  assert.deepEqual(hidden.map((input) => [attribute(input, 'name', `${label} hidden field name`), attribute(input, 'value', `${label} hidden field value`)]), [
    ['_subject', 'WB Studio - Plot Details Free Call Request'],
    ['_template', 'table'],
    ['_captcha', 'false']
  ], `${label} must retain every hidden field exactly`);
  const groups = elements(form, { tag: 'fieldset', classes: 'contact-field-group' });
  assert.equal(groups.length, 3, `${label} contact form must contain exactly three contact field groups`);
  const expectations = [
    { legend: site.form.contactGroupLabel[lang], fields: ['name', 'phone', 'email'] },
    { legend: site.form.plotGroupLabel[lang], fields: ['location', 'maps'] },
    { legend: site.form.budgetGroupLabel[lang], fields: ['budget'] }
  ];
  expectations.forEach((expected, index) => {
    const legends = elements(groups[index].inner, { tag: 'legend' });
    assert.equal(legends.length, 1, `${label} group ${index + 1} must contain exactly one legend`);
    assert.equal(legends[0].inner.trim(), htmlEscape(expected.legend), `${label} group ${index + 1} must use its localized legend`);
    const names = [
      ...elements(groups[index].inner, { tag: 'input' }),
      ...elements(groups[index].inner, { tag: 'select' })
    ].map((field) => attribute(field, 'name', `${label} grouped field must have a name`));
    assert.deepEqual(names, expected.fields, `${label} group ${index + 1} must contain the exact fields in order`);
  });
  const name = assertField(groups[0].inner, { tag: 'input', name: 'name', attributes: { id: 'name', type: 'text', autocomplete: 'name', placeholder: htmlEscape(site.form.namePh[lang]) }, booleanAttributes: ['required'] }, label);
  const phone = assertField(groups[0].inner, { tag: 'input', name: 'phone', attributes: { id: 'phone', type: 'tel', autocomplete: 'tel', placeholder: htmlEscape(site.form.phonePh[lang]), pattern: '^[+\\d\\s]{7,}$' }, booleanAttributes: ['required'] }, label);
  const email = assertField(groups[0].inner, { tag: 'input', name: 'email', attributes: { id: 'email', type: 'email', autocomplete: 'email', placeholder: htmlEscape(site.form.emailPh[lang]) }, booleanAttributes: ['required'] }, label);
  const location = assertField(groups[1].inner, { tag: 'input', name: 'location', attributes: { id: 'location', type: 'text', placeholder: htmlEscape(site.form.locationPh[lang]) } }, label);
  const maps = assertField(groups[1].inner, { tag: 'input', name: 'maps', attributes: { id: 'maps', type: 'url', placeholder: htmlEscape(site.form.mapsPh[lang]) } }, label);
  const budget = assertField(groups[2].inner, { tag: 'select', name: 'budget', attributes: { id: 'budget' } }, label);
  for (const field of [name, phone, email]) assert.ok(hasAttribute(field, 'required'), `${label} required contact fields must remain required`);
  for (const field of [location, maps, budget]) {
    assert.ok(!hasAttribute(field, 'required'), `${label} optional plot and budget fields must remain optional`);
    assert.ok(!hasAttribute(field, 'autocomplete'), `${label} optional plot and budget fields must not gain autocomplete attributes`);
  }
  const options = elements(budget.inner, { tag: 'option' });
  assert.deepEqual(options.map((option) => option.inner.trim()), [htmlEscape(site.form.budgetPh[lang]), ...site.form.budgetOptions[lang].map(htmlEscape)], `${label} must retain every budget option in order`);
  has(groups[1].inner, htmlEscape(site.form.locationHelper[lang]), `${label} plot group must retain its helper text`);
  const feedback = elements(form, { tag: 'p', classes: 'form-feedback' })[0];
  assert.ok(feedback, `${label} must retain form feedback`);
  assert.equal(attribute(feedback, 'id', `${label} feedback must retain id`), 'formFeedback', `${label} feedback must retain id`);
  assert.equal(attribute(feedback, 'aria-live', `${label} feedback must retain aria-live`), 'polite', `${label} feedback must remain polite`);
  assert.equal(attribute(feedback, 'data-msg-success', `${label} feedback must retain success copy`), htmlEscape(site.form.success[lang]), `${label} feedback must retain localized success copy`);
  assert.equal(attribute(feedback, 'data-msg-error', `${label} feedback must retain error copy`), htmlEscape(site.form.error[lang]), `${label} feedback must retain localized error copy`);
  assert.ok(elements(form, { tag: 'button' }).some((button) => /\stype="submit"/.test(button.open)), `${label} must retain its submit button`);
  has(page, 'window.GOOGLE_MAPS_API_KEY', `${label} must retain the Google Maps hook`);
  has(page, `href="https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage[lang])}"`, `${label} must retain its WhatsApp contact CTA`);
  has(page, `href="tel:${site.phoneE164}"`, `${label} must retain direct phone contact`);
  has(page, `href="${site.gmailCompose}"`, `${label} must retain direct email contact`);
  for (const field of [site.contactPage.h1, site.contactPage.intro, site.contactPage.whatsappCta, site.contactPage.directTitle, site.contactPage.faqTitle]) {
    has(page, htmlEscape(field[lang]), `${label} must retain all localized contact content`);
  }
};

const homeAr = read('index.html');
const homeEn = read('en/index.html');
const workAr = read('work/index.html');
const workEn = read('en/work/index.html');
const contactAr = read('contact/index.html');
const contactEn = read('en/contact/index.html');
const { projects } = JSON.parse(read('data/projects.json'));
const css = read('assets/css/site.css');
const siteJs = read('assets/js/site.js');
const contactJs = read('assets/js/contact.js');
const buildSource = read('scripts/build.mjs');
const sitemap = read('sitemap.xml');

for (const [label, lang, prefix, directory] of [
  ['Arabic', 'ar', '', ''],
  ['English', 'en', '/en', 'en/']
]) {
  const servicesPage = read(`${directory}services/index.html`);
  assertServicesPage(servicesPage, lang, prefix, `${label} services`);
  site.landings.forEach((landing) => {
    const landingPage = read(`${directory}${landing.slug}/index.html`);
    assertLandingPage(landingPage, landing, lang, prefix, `${label} ${landing.slug}`);
  });
  const approachPage = read(`${directory}approach/index.html`);
  assertApproachPage(approachPage, lang, prefix, `${label} approach`);
  const aboutPage = read(`${directory}about/index.html`);
  assertAboutPage(aboutPage, lang, prefix, `${label} about`);
  const journalPage = read(`${directory}journal/index.html`);
  assertJournalHub(journalPage, lang, prefix, `${label} journal`);
  site.journal.forEach((article) => {
    const articlePage = read(`${directory}journal/${article.slug}/index.html`);
    assertArticlePage(articlePage, article, lang, prefix, `${label} article ${article.slug}`);
  });
  assertContactPage(read(`${directory}contact/index.html`), lang, `${label} contact`);
  const approachSequenceProbe = elementWithClasses(approachPage, 'approach-sequence', `${label} approach probe must contain its sequence`, 'ol');
  assert.throws(
    () => assertApproachPage(approachPage.replace(approachSequenceProbe.open, approachSequenceProbe.open.replace(' role="list"', '')), lang, prefix, `${label} approach role probe`),
    /approach sequence must declare a role/,
    `${label} approach checks must reject a sequence missing role=list`
  );
  assert.throws(
    () => assertApproachPage(approachPage.replace(/(<span class="step-num") aria-hidden="true"/, '$1'), lang, prefix, `${label} approach number probe`),
    /number must declare aria-hidden/,
    `${label} approach checks must reject a visible step number missing aria-hidden=true`
  );
}

assert.throws(
  () => hasCssSelector('.home-hero-grid-extra {}', '.home-hero-grid', 'Required CSS selector token is missing'),
  /Required CSS selector token is missing/,
  'CSS selector checks must reject suffix-only matches'
);
assert.throws(
  () => hasCssSelector('.foo:not(.home-hero-grid) {}', '.home-hero-grid', 'Required positive CSS class selector is missing'),
  /Required positive CSS class selector is missing/,
  'CSS selector checks must reject classes used only inside :not()'
);
assert.throws(
  () => hasCssSelector('[data-x=".home-hero-grid"] {}', '.home-hero-grid', 'Required positive CSS class selector is missing'),
  /Required positive CSS class selector is missing/,
  'CSS selector checks must reject classes used only inside attribute values'
);
assert.doesNotThrow(
  () => hasCssSelector('@media (max-width: 860px) { .home-hero-grid { display: grid; } }', '.home-hero-grid', 'Nested selector is missing'),
  'CSS selector checks must find positive classes nested in at-rules'
);
assert.doesNotThrow(
  () => hasCssSelector('.home-hero-grid { display: grid; }', '.home-hero-grid', 'Normal selector is missing'),
  'CSS selector checks must find a normal positive class selector'
);
assert.doesNotThrow(
  () => hasCssSelector('.foo, .home-hero-grid > img { display: block; }', '.home-hero-grid', 'Listed selector is missing'),
  'CSS selector checks must find positive classes in selector lists'
);
assert.throws(
  () => hasCssSelectorBranch('.work-editorial-grid .project-card:first-child .card-media img {}', '.work-editorial-grid .card-media img', 'Generic work image selector is missing'),
  /Generic work image selector is missing/,
  'CSS branch checks must reject a first-child-only work image selector'
);
const serviceInteractionFixture = `.service-editorial-row:hover, .service-editorial-row:focus-visible { border-block-end-color: var(--line-strong); }
.service-editorial-row:hover .svc-more, .service-editorial-row:focus-visible .svc-more { color: var(--ink); }`;
assert.doesNotThrow(
  () => assertServiceInteractionCss(serviceInteractionFixture, 'Service interaction probe'),
  'Service interaction checks must accept hover and focus-visible parity using locked tokens'
);
assert.throws(
  () => assertCssDeclarations('.service-editorial-row:hover { border-block-end-color: var(--line-strong); }', '.service-editorial-row:hover, .service-editorial-row:focus-visible', { 'border-block-end-color': 'var(--line-strong)' }, 'Service interaction probe'),
  /must define/,
  'Service interaction checks must reject hover feedback without focus-visible parity'
);
assert.throws(
  () => assertCssDeclarations('.service-editorial-row:hover, .service-editorial-row:focus-visible { border-block-end-color: var(--line); }', '.service-editorial-row:hover, .service-editorial-row:focus-visible', { 'border-block-end-color': 'var(--line-strong)' }, 'Service interaction probe'),
  /must set border-block-end-color/,
  'Service interaction checks must reject a weak or changed feedback token'
);
assert.throws(
  () => assertServiceInteractionCss(serviceInteractionFixture.replace('.service-editorial-row:hover .svc-more, .service-editorial-row:focus-visible .svc-more', '.service-editorial-row:hover .svc-more'), 'Service interaction probe'),
  /must define/,
  'Service interaction checks must reject svc-more hover feedback without focus-visible parity'
);
assert.throws(
  () => assertServiceInteractionCss(serviceInteractionFixture.replace('color: var(--ink)', 'color: var(--ink-soft)'), 'Service interaction probe'),
  /must set color/,
  'Service interaction checks must reject a changed svc-more feedback token'
);
assert.throws(
  () => assertServiceInteractionCss(`${serviceInteractionFixture}\n.service-editorial-row { transition: color 0.2s; }`, 'Service interaction motion probe'),
  /must not add motion/,
  'Service interaction checks must reject newly introduced row motion'
);
for (const [probe, expected] of [
  ['.stamp { animation : 900ms ease stamp-in both; }', /stamp-in motion token/],
  ['.stamp { animation-name : stamp-in; }', /stamp-in motion token/],
  ['@keyframes stamp-in { from { opacity: 0; } }', /stamp-in motion token/],
  [':root { --radius : 1px; } .panel { border-radius : var(--radius); }', /radius token must be zero-valued/],
  ['.panel { border-radius : 50%; }', /radius must resolve to zero/],
  ['.panel { color : #fff; }', /hardcoded or named colors/]
]) {
  assert.throws(() => assertEditorialCss(probe), expected, `Editorial CSS guard must reject: ${probe}`);
}
assert.doesNotThrow(
  () => assertEditorialCss(':root { --bg: #faf8f4; --radius: 0px; } .panel { border-radius: var(--radius); }'),
  'Editorial CSS guard must allow palette-token declarations and zero-valued radii'
);
assert.throws(
  () => assertEditorialCss(':root { --bg: #ffffff; }'),
  /locked value/,
  'Editorial CSS guard must reject changed palette tokens'
);
assert.throws(
  () => assertEditorialCss('.panel { color: rgb(1, 2, 3); }'),
  /hardcoded or named colors/,
  'Editorial CSS guard must reject rgb colors outside palette tokens'
);
assert.throws(
  () => assertEditorialCss('.panel { color: hsl(0 0% 0%); }'),
  /hardcoded or named colors/,
  'Editorial CSS guard must reject hsl colors outside palette tokens'
);
assert.doesNotThrow(
  () => assertEditorialCss('.panel { background: url(data:image/svg+xml,<svg fill=red></svg>); } /* color: oklch(0% 0 0); */'),
  'Editorial CSS guard must ignore color-like content inside URLs and comments'
);
for (const colorValue of [
  'red',
  'oklch(50% 0.2 30)',
  'hwb(30 10% 20%)',
  'color(display-p3 1 0 0)'
]) {
  assert.throws(
    () => assertEditorialCss(`.panel { color: ${colorValue}; }`),
    /hardcoded or named colors/,
    `Editorial CSS guard must reject color: ${colorValue}`
  );
}
assert.throws(
  () => assertEditorialCss(':root { --bg: #faf8f4; --bg: #faf8f4; }'),
  /exactly once/,
  'Editorial CSS guard must reject duplicate locked token declarations'
);
assert.throws(
  () => assertEditorialCss(':root { --bg: #faf8f4; } html { --bg: var(--surface); }'),
  /exactly once/,
  'Editorial CSS guard must reject locked token overrides outside :root'
);
assert.doesNotThrow(
  () => assertEditorialCss('.panel { box-shadow: none; }'),
  'Editorial CSS guard must allow an explicit no-shadow value'
);
assert.doesNotThrow(
  () => assertEditorialCss('.panel { box-shadow: 0 0 0 0 transparent; }'),
  'Editorial CSS guard must allow a safely recognized zero-effect shadow'
);
assert.doesNotThrow(
  () => assertEditorialCss('.panel { box-shadow: none !important; }'),
  'Editorial CSS guard must allow no-shadow with !important'
);
assert.doesNotThrow(
  () => assertEditorialCss('.panel { box-shadow: 0 0 0 0 transparent !important; }'),
  'Editorial CSS guard must allow a safely recognized zero-effect shadow with !important'
);
assert.throws(
  () => assertEditorialCss('.panel { box-shadow: 0 1px 2px var(--line); }'),
  /box shadows/,
  'Editorial CSS guard must reject visible shadows'
);
assert.throws(
  () => assertEditorialCss('.panel { box-shadow: 0 1px 2px var(--line) !important; }'),
  /box shadows/,
  'Editorial CSS guard must reject visible shadows with !important'
);

assert.throws(
  () => hasClasses('<a class="mobile-lang-link-extra">', 'mobile-lang-link', 'Required class token is missing'),
  /Required class token is missing/,
  'Class checks must reject suffix-only matches'
);
assert.throws(
  () => hasClasses('<div data-class="mobile-lang-link">', 'mobile-lang-link', 'Required class attribute is missing'),
  /Required class attribute is missing/,
  'Class checks must ignore data-class attributes'
);
assert.doesNotThrow(
  () => hasClasses('<div class="footer-editorial wrap footer-grid extra">', ['footer-grid', 'footer-editorial'], 'Required footer classes are missing'),
  'Class checks must ignore token order and allow additional classes'
);

assert.ok(Array.isArray(site.home.trustItems), 'Homepage trust items must be an array');
assert.equal(site.home.trustItems.length, 4, 'Homepage must have exactly four trust items');
site.home.trustItems.forEach((item, index) => assertPair(item, `Homepage trust item ${index + 1}`));

assert.ok(Array.isArray(site.home.serviceThemes), 'Homepage service themes must be an array');
assert.equal(site.home.serviceThemes.length, 3, 'Homepage must have exactly three service themes');
site.home.serviceThemes.forEach((theme, index) => {
  const label = `Homepage service theme ${index + 1}`;
  assertPair(theme.title, `${label} title`);
  assertPair(theme.text, `${label} text`);
  assert.equal(typeof theme.href, 'string', `${label} href must be a string`);
  assert.ok(theme.href.trim(), `${label} href must not be empty`);
  assert.match(theme.href, /^\/(?:[a-z0-9-]+\/)+$/, `${label} href must be a canonical internal path`);

  const hrefSegments = theme.href.slice(1).split('/').filter(Boolean);
  const arTarget = path.join(ROOT, ...hrefSegments, 'index.html');
  const enTarget = path.join(ROOT, 'en', ...hrefSegments, 'index.html');
  assert.ok(fs.existsSync(arTarget), `${label} Arabic target must exist: ${theme.href}index.html`);
  assert.ok(fs.existsSync(enTarget), `${label} English target must exist: /en${theme.href}index.html`);
});

has(homeAr, '<html lang="ar" dir="rtl">', 'Arabic root must use RTL Arabic markup');
has(homeEn, '<html lang="en" dir="ltr">', 'English mirror must use LTR English markup');

for (const [label, page] of [['Arabic', homeAr], ['English', homeEn]]) {
  for (const className of [
    'mobile-lang-link',
    'home-hero-grid',
    'home-hero-copy',
    'home-hero-media',
    'trust-strip',
    'home-work-grid',
    'home-service-list'
  ]) {
    hasClasses(page, className, `${label} home must contain the ${className} class`);
  }
  hasClasses(page, ['footer-grid', 'footer-editorial'], `${label} home must use the editorial footer`);
}

for (const [label, page, prefix, lang] of [
  ['Arabic', workAr, '', 'ar'],
  ['English', workEn, '/en', 'en']
]) {
  assertWorkPage(page, lang, prefix, label);
}

assert.throws(
  () => assertWorkCredits(`<footer><a href="/credits/">${htmlEscape(site.work.noteLink.en)}</a></footer><p class="work-credits">Missing</p>`, 'en', '', 'Probe'),
  /work credits/,
  'Work credits checks must reject a credits link found only in the footer'
);

const workProbeGrid = elementWithClasses(workEn, 'work-editorial-grid', 'Work probe must contain its grid');
const workProbeCards = elements(workProbeGrid.inner, { tag: 'a', classes: 'project-card' });
const firstProbeCard = workProbeCards[0];
const secondProbeCard = workProbeCards[1];
const swappedCardsInner = workProbeGrid.inner.slice(0, firstProbeCard.index)
  + secondProbeCard.outer
  + workProbeGrid.inner.slice(firstProbeCard.index + firstProbeCard.outer.length, secondProbeCard.index)
  + firstProbeCard.outer
  + workProbeGrid.inner.slice(secondProbeCard.index + secondProbeCard.outer.length);
assert.throws(
  () => assertWorkPage(replaceElementInner(workEn, workProbeGrid, swappedCardsInner), 'en', '/en', 'Probe'),
  /project card 1/,
  'Work checks must reject project cards rendered out of data order'
);

const laterWideEagerCard = secondProbeCard.outer
  .replace('class="project-card"', 'class="project-card is-wide"')
  .replace('loading="lazy"', 'fetchpriority="high"');
const laterWideEagerInner = replaceElement(workProbeGrid.inner, secondProbeCard, laterWideEagerCard);
assert.throws(
  () => assertWorkPage(replaceElementInner(workEn, workProbeGrid, laterWideEagerInner), 'en', '/en', 'Probe'),
  /project card 2/,
  'Work checks must reject a later card that becomes wide and eager'
);

const outsideCard = workProbeCards.at(-1);
const gridWithoutLastCard = replaceElement(workProbeGrid.inner, outsideCard, '');
const outsideGridCardPage = replaceElementInner(workEn, workProbeGrid, gridWithoutLastCard)
  .replace('</body>', `${outsideCard.outer}</body>`);
assert.throws(
  () => assertWorkPage(outsideGridCardPage, 'en', '/en', 'Probe'),
  /project card count/,
  'Work checks must not accept a project card link found outside the editorial grid'
);

const firstCardMeta = elementWithClasses(firstProbeCard.inner, 'card-meta', 'Metadata probe must contain card metadata');
const firstCardWithoutMeta = firstProbeCard.outer.replace(firstCardMeta.outer, '');
const workWithoutMetadata = replaceElementInner(
  workEn,
  workProbeGrid,
  replaceElement(workProbeGrid.inner, firstProbeCard, firstCardWithoutMeta)
);
assert.throws(
  () => assertWorkPage(workWithoutMetadata, 'en', '/en', 'Probe'),
  /card metadata/,
  'Work checks must reject a project card with removed metadata'
);

const syntheticPlaceholderProject = { ...projects[0], placeholder: true };
const syntheticPlaceholderPortfolio = [syntheticPlaceholderProject, ...projects.slice(1)];
const firstMetaWithoutTags = elements(firstCardMeta.inner, { classes: 'tag' })
  .reduce((content, tag) => content.replace(tag.outer, ''), firstCardMeta.inner);
const syntheticStatusTag = ` <span class="tag">${htmlEscape(syntheticPlaceholderProject.status.en)}</span>`;
const syntheticPlaceholderMeta = `${firstCardMeta.open}${firstMetaWithoutTags}${syntheticStatusTag}</p>`;
const syntheticPlaceholderCard = firstProbeCard.outer.replace(firstCardMeta.outer, syntheticPlaceholderMeta);
const syntheticPlaceholderWorkPage = replaceElementInner(
  workEn,
  workProbeGrid,
  replaceElement(workProbeGrid.inner, firstProbeCard, syntheticPlaceholderCard)
);
assert.doesNotThrow(
  () => assertWorkPage(syntheticPlaceholderWorkPage, 'en', '/en', 'Synthetic placeholder probe', syntheticPlaceholderPortfolio),
  'Work verifier must accept a synthetic placeholder card with localized status'
);
const syntheticCardWithoutStatus = syntheticPlaceholderCard.replace(syntheticStatusTag, '');
const workWithoutStatus = replaceElementInner(
  workEn,
  workProbeGrid,
  replaceElement(workProbeGrid.inner, firstProbeCard, syntheticCardWithoutStatus)
);
assert.throws(
  () => assertWorkPage(workWithoutStatus, 'en', '/en', 'Probe', syntheticPlaceholderPortfolio),
  /status tag/,
  'Work checks must reject a synthetic placeholder card with removed status'
);

const allRealProjects = projects.map((project) => ({ ...project, placeholder: false }));
const allRealGridInner = [...workProbeCards].reverse().reduce((gridInner, card) => {
  const cardWithoutTags = elements(card.inner, { classes: 'tag' })
    .reduce((cardHtml, tag) => cardHtml.replace(tag.outer, ''), card.outer);
  return replaceElement(gridInner, card, cardWithoutTags);
}, workProbeGrid.inner);
const allRealWorkPage = replaceElementInner(workEn, workProbeGrid, allRealGridInner);
assert.doesNotThrow(
  () => assertWorkPage(allRealWorkPage, 'en', '/en', 'All-real probe', allRealProjects),
  'Work verifier logic must support a portfolio dataset with no placeholders'
);

for (const [label, lang, prefix] of [
  ['Arabic', 'ar', ''],
  ['English', 'en', '/en']
]) {
  projects.forEach((project, projectIndex) => {
    const localizedDirectory = prefix ? `${prefix.slice(1)}/` : '';
    const page = read(`${localizedDirectory}work/${project.slug}/index.html`);
    assertProjectPage(page, project, projectIndex, lang, prefix, label);
  });
}

const semanticProbeProject = projects[0];
const semanticProbePage = read(`en/work/${semanticProbeProject.slug}/index.html`);
const sequenceProbeCover = elementWithClasses(semanticProbePage, 'project-cover', 'Sequence probe must contain its cover');
const sequencePageWithoutCover = replaceElement(semanticProbePage, sequenceProbeCover, '');
const sequenceProbeIntro = elementWithClasses(sequencePageWithoutCover, 'project-intro-grid', 'Sequence probe must contain its intro');
const coverAfterIntroPage = sequencePageWithoutCover.slice(0, sequenceProbeIntro.index + sequenceProbeIntro.outer.length)
  + sequenceProbeCover.outer
  + sequencePageWithoutCover.slice(sequenceProbeIntro.index + sequenceProbeIntro.outer.length);
assert.throws(
  () => assertProjectPage(coverAfterIntroPage, semanticProbeProject, 0, 'en', '/en', 'Probe'),
  /structural sequence/,
  'Project checks must reject a cover moved after the intro'
);
assert.throws(
  () => assertProjectPage(
    semanticProbePage.replace(/(<figure class="g-(?:wide|tall)") data-reveal/, '$1'),
    semanticProbeProject,
    0,
    'en',
    '/en',
    'Probe'
  ),
  /gallery figure 1 must retain data-reveal/,
  'Project checks must reject a gallery figure that loses reveal semantics'
);
assert.throws(
  () => assertProjectPage(
    semanticProbePage.replace(' loading="lazy"', ''),
    semanticProbeProject,
    0,
    'en',
    '/en',
    'Probe'
  ),
  /gallery figure 1 lazy image must declare loading semantics/,
  'Project checks must reject a gallery image that loses lazy-loading semantics'
);

const allRealProjectPage = [...elements(semanticProbePage, { classes: 'gallery-note' })].reverse()
  .reduce((page, note) => replaceElement(page, note, ''), semanticProbePage);
assert.doesNotThrow(
  () => assertProjectPage(allRealProjectPage, allRealProjects[0], 0, 'en', '/en', 'All-real probe', allRealProjects),
  'Project verifier logic must support a portfolio dataset with no placeholders'
);

const syntheticGalleryWrap = elements(allRealProjectPage, { classes: 'wrap' }).find((wrap) =>
  elements(wrap.inner, { classes: 'gallery' }).length > 0
);
assert.ok(syntheticGalleryWrap, 'Synthetic gallery-note fixture must contain a gallery wrap');
const syntheticGallery = elementWithClasses(syntheticGalleryWrap.inner, 'gallery', 'Synthetic gallery-note fixture must contain its gallery');
const syntheticGalleryNote = `<p class="note gallery-note">${htmlEscape(site.project.galleryNote.en)} <a href="/en/credits/">${htmlEscape(site.project.galleryNoteLink.en)}</a>.</p>`;
const syntheticGalleryWrapInner = syntheticGalleryWrap.inner.slice(0, syntheticGallery.index + syntheticGallery.outer.length)
  + `\n        ${syntheticGalleryNote}`
  + syntheticGalleryWrap.inner.slice(syntheticGallery.index + syntheticGallery.outer.length);
const syntheticGalleryNotePage = replaceElementInner(allRealProjectPage, syntheticGalleryWrap, syntheticGalleryWrapInner);
assert.doesNotThrow(
  () => assertProjectPage(syntheticGalleryNotePage, syntheticPlaceholderProject, 0, 'en', '/en', 'Synthetic placeholder probe', syntheticPlaceholderPortfolio),
  'Project verifier must accept a synthetic placeholder gallery note in the gallery region'
);
const galleryNoteProbe = elementWithClasses(syntheticGalleryNotePage, 'gallery-note', 'Synthetic gallery-note probe must contain its note');
const pageWithoutScopedGalleryNote = replaceElement(syntheticGalleryNotePage, galleryNoteProbe, '');
const galleryNoteOutsideRegionPage = pageWithoutScopedGalleryNote.replace('</article>', `${galleryNoteProbe.outer}</article>`);
assert.throws(
  () => assertProjectPage(galleryNoteOutsideRegionPage, syntheticPlaceholderProject, 0, 'en', '/en', 'Probe', syntheticPlaceholderPortfolio),
  /gallery region/,
  'Project checks must reject a synthetic gallery note moved outside the gallery region'
);

has(homeAr, '<link rel="canonical" href="https://wbstudio.xyz/" />', 'Arabic home canonical must target the root');
has(homeAr, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/" />', 'Arabic home must link its Arabic alternate');
has(homeAr, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/" />', 'Arabic home must link its English alternate');
has(homeEn, '<link rel="canonical" href="https://wbstudio.xyz/en/" />', 'English home canonical must target /en/');
has(homeEn, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/" />', 'English home must link its Arabic alternate');
has(homeEn, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/" />', 'English home must link its English alternate');

const whatsappHrefAr = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage.ar)}`;
const whatsappHrefEn = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.waMessage.en)}`;
has(homeAr, `href="${whatsappHrefAr}"`, 'Arabic home must contain its generated WhatsApp href');
has(homeEn, `href="${whatsappHrefEn}"`, 'English home must contain its generated WhatsApp href');

has(contactAr, '<link rel="canonical" href="https://wbstudio.xyz/contact/" />', 'Arabic contact canonical must target /contact/');
has(contactAr, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/contact/" />', 'Arabic contact must link its Arabic alternate');
has(contactAr, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/contact/" />', 'Arabic contact must link its English alternate');
has(contactEn, '<link rel="canonical" href="https://wbstudio.xyz/en/contact/" />', 'English contact canonical must target /en/contact/');
has(contactEn, '<link rel="alternate" hreflang="ar" href="https://wbstudio.xyz/contact/" />', 'English contact must link its Arabic alternate');
has(contactEn, '<link rel="alternate" hreflang="en" href="https://wbstudio.xyz/en/contact/" />', 'English contact must link its English alternate');

for (const [label, page] of [['Arabic', contactAr], ['English', contactEn]]) {
  const form = leadForm(page, label);
  hasClasses(page, ['footer-grid', 'footer-editorial'], `${label} contact page must use the shared editorial footer`);
  has(form, 'action="https://formsubmit.co/ajax/wael.bousmael@gmail.com"', `${label} contact form must use FormSubmit`);
  for (const field of ['name', 'phone', 'email', 'location', 'maps', 'budget']) {
    has(form, `name="${field}"`, `${label} contact form must retain the ${field} field`);
  }
  has(page, 'window.GOOGLE_MAPS_API_KEY', `${label} contact page must retain the Google Maps hook`);
}

assert.equal(site.whatsappNumber, '966538060383', 'The WhatsApp number must remain unchanged');
assert.equal(site.formAction, 'https://formsubmit.co/ajax/wael.bousmael@gmail.com', 'The FormSubmit endpoint must remain unchanged');
assert.deepEqual(site.form.contactGroupLabel, { ar: 'بيانات التواصل', en: 'Contact details' }, 'Lead form contactGroupLabel must retain exact bilingual copy');
assert.deepEqual(site.form.plotGroupLabel, { ar: 'بيانات الأرض', en: 'Plot details' }, 'Lead form plotGroupLabel must retain exact bilingual copy');
assert.deepEqual(site.form.budgetGroupLabel, { ar: 'نطاق الميزانية', en: 'Budget range' }, 'Lead form budgetGroupLabel must retain exact bilingual copy');
assert.doesNotMatch(sitemap, /<lastmod\b/i, 'Generated sitemap must omit unreliable lastmod values');
const sitemapSourceStart = buildSource.indexOf('function renderSitemap()');
const sitemapSourceEnd = buildSource.indexOf('write everything', sitemapSourceStart);
assert.ok(sitemapSourceStart >= 0 && sitemapSourceEnd > sitemapSourceStart, 'Build verifier must locate the sitemap generator source');
const sitemapGeneratorSource = buildSource.slice(sitemapSourceStart, sitemapSourceEnd);
assert.doesNotMatch(sitemapGeneratorSource, /\bnew\s+Date\b|\bDate\.now\b|<lastmod\b/i, 'Sitemap generator must not depend on the current date or emit lastmod');
const reproducibilityScriptPath = path.join(ROOT, 'scripts/check-reproducible-build.mjs');
assert.ok(fs.existsSync(reproducibilityScriptPath), 'Repository must provide the repeat-build reproducibility helper');
const reproducibilitySource = fs.readFileSync(reproducibilityScriptPath, 'utf8');
assert.match(reproducibilitySource, /spawnSync\(process\.execPath,\s*\['scripts\/build\.mjs'\]/, 'Reproducibility helper must invoke the real generator');
assert.match(reproducibilitySource, /first[\s\S]*second[\s\S]*(?:deepEqual|notDeepEqual|===|!==)/, 'Reproducibility helper must compare two build snapshots');
assert.match(withoutBlockComments(siteJs), /const\s+prefersReducedMotion\s*=\s*window\.matchMedia\(\s*(['"])\(prefers-reduced-motion:\s*reduce\)\1\s*\)\.matches\s*;[\s\S]*?if\s*\(\s*prefersReducedMotion\b[\s\S]*?\)\s*\{\s*revealElements\.forEach\s*\(/, 'Reduced-motion preference must control the reveal fallback');
assertMobileMenuFocusRestoration(siteJs, 'Mobile menu behavior');
assert.throws(
  () => assertMobileMenuFocusRestoration('const closeMenu = () => {\n  menu.hidden = true;\n};', 'Mobile menu probe'),
  /must restore focus/,
  'Mobile menu verifier must reject close behavior that loses keyboard focus'
);
assert.match(withoutBlockComments(contactJs), /const\s+apiKey\s*=\s*typeof\s+window\.GOOGLE_MAPS_API_KEY\s*===\s*(['"])string\1[\s\S]*?;[\s\S]*?loadGoogleMapsPlaces\(\s*apiKey\s*\)/, 'The Google Maps API key must flow into the Places loader');
assert.doesNotMatch(withoutBlockComments(css), /(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/i, 'CSS must not contain gradients');
for (const selector of [
  '.home-hero-grid',
  '.trust-strip',
  '.home-work-grid',
  '.home-services-grid',
  '.mobile-header-actions',
  '.work-editorial-grid',
  '.project-intro-grid',
  '.project-story'
]) {
  hasCssSelector(css, selector, `CSS must define the ${selector} selector`);
}
assertCssDeclarations(css, '.service-editorial-list', {
  'border-block-start': '1px solid var(--line-strong)'
}, 'Service editorial CSS');
assertCssDeclarations(css, '.service-editorial-row', {
  display: 'grid',
  'grid-template-columns': 'minmax(200px, 0.8fr) minmax(0, 1.2fr) auto',
  gap: '1.25rem',
  'align-items': 'baseline',
  'padding-block': '1.4rem',
  'border-block-end': '1px solid var(--line)',
  color: 'inherit',
  'text-decoration': 'none'
}, 'Service editorial CSS');
assertCssDeclarations(css, '.service-editorial-row h2, .service-editorial-row h3, .service-editorial-row p', { margin: '0' }, 'Service editorial CSS');
assertCssDeclarations(css, '.service-editorial-row p', { color: 'var(--ink-soft)' }, 'Service editorial CSS');
assertServiceInteractionCss(css, 'Service interaction CSS');
assertDirectContactInteractionCss(css, 'Direct-contact interaction CSS');
assert.doesNotThrow(
  () => assertDirectContactInteractionCss('.direct-contact a:hover, .direct-contact a:focus-visible { color: var(--ink); }', 'Direct-contact probe'),
  'Direct-contact verifier must accept matching hover and keyboard-focus feedback'
);
assert.throws(
  () => assertDirectContactInteractionCss('.direct-contact a:hover { color: var(--ink); }', 'Direct-contact probe'),
  /must define \.direct-contact a:hover, \.direct-contact a:focus-visible/,
  'Direct-contact verifier must reject hover-only feedback'
);
assert.throws(
  () => assertDirectContactInteractionCss('.direct-contact a:hover, .direct-contact a:focus-visible { color: var(--ink); transition: color 0.2s; }', 'Direct-contact probe'),
  /must not add motion/,
  'Direct-contact verifier must reject interaction motion'
);
assertCssDeclarations(css, ':focus-visible', { outline: '2px solid var(--ink)', 'outline-offset': '3px' }, 'Global focus CSS');
assertCssDeclarations(css, '.landing-content-grid', { 'border-block-start': '1px solid var(--line-strong)' }, 'Landing content CSS');
assertCssDeclarations(css, '.landing-section-row', {
  display: 'grid',
  'grid-template-columns': 'minmax(220px, 0.8fr) minmax(0, 1.2fr)',
  gap: 'clamp(1.5rem, 5vw, 5rem)',
  'padding-block': '1.75rem',
  'border-block-end': '1px solid var(--line)'
}, 'Landing content CSS');
assertCssDeclarations(css, '.landing-section-row h2, .landing-section-row p', { margin: '0' }, 'Landing content CSS');
assertCssDeclarations(css, '.landing-section-row p', { color: 'var(--ink-soft)' }, 'Landing content CSS');
assertCssDeclarations(css, '.approach-sequence', {
  'list-style': 'none',
  margin: '2.5rem 0 0',
  padding: '0',
  'border-block-start': '1px solid var(--line-strong)'
}, 'Approach sequence CSS');
assertCssDeclarations(css, '.approach-sequence li', {
  display: 'grid',
  'grid-template-columns': '5rem 1fr',
  gap: '1rem',
  'padding-block': '1.5rem',
  'border-block-end': '1px solid var(--line)'
}, 'Approach sequence CSS');
assertCssDeclarations(css, '.approach-sequence h3', { 'margin-block-end': '0.45rem' }, 'Approach sequence CSS');
assertCssDeclarations(css, '.approach-sequence p', { color: 'var(--ink-soft)' }, 'Approach sequence CSS');
assertCssDeclarations(css, '.founder-grid', {
  display: 'grid',
  'grid-template-columns': 'minmax(260px, 0.75fr) minmax(0, 1.25fr)',
  gap: 'clamp(2.5rem, 7vw, 7rem)',
  'align-items': 'start'
}, 'Founder grid CSS');
assertCssDeclarations(css, '.journal-editorial-list', {
  'list-style': 'none', margin: '0', padding: '0',
  'border-block-start': '1px solid var(--line-strong)'
}, 'Journal editorial CSS');
assertCssDeclarations(css, '.journal-editorial-list li', { 'border-block-end': '1px solid var(--line)' }, 'Journal editorial CSS');
assertCssDeclarations(css, '.journal-editorial-list a', {
  display: 'grid',
  'grid-template-columns': '8rem minmax(0, 1fr) auto',
  gap: '1rem',
  'padding-block': '1.5rem',
  color: 'inherit',
  'text-decoration': 'none'
}, 'Journal editorial CSS');
assertCssOmitsDeclarations(css, '.journal-editorial-list a', [
  'padding', 'padding-inline', 'padding-inline-start', 'padding-inline-end', 'padding-left', 'padding-right'
], 'Journal editorial CSS');
assert.doesNotThrow(
  () => assertCssOmitsDeclarations('.journal-editorial-list a { padding-block: 1.5rem; }', '.journal-editorial-list a', ['padding', 'padding-inline'], 'Journal padding probe'),
  'Journal padding verifier must allow block-only padding'
);
for (const forbiddenPadding of ['padding', 'padding-inline', 'padding-inline-start', 'padding-inline-end']) {
  assert.throws(
    () => assertCssOmitsDeclarations(`.journal-editorial-list a { padding-block: 1.5rem; ${forbiddenPadding}: 1rem; }`, '.journal-editorial-list a', [forbiddenPadding], 'Journal padding probe'),
    new RegExp(`must not set ${forbiddenPadding}`),
    `Journal padding verifier must reject ${forbiddenPadding}`
  );
}
assertCssDeclarations(css, '.journal-entry-copy h2', { margin: '0 0 0.4rem' }, 'Journal editorial CSS');
assertCssDeclarations(css, '.journal-entry-copy p', { margin: '0', color: 'var(--ink-soft)' }, 'Journal editorial CSS');
assertCssDeclarations(css, '.journal-editorial-list a:hover, .journal-editorial-list a:focus-visible', { background: 'var(--surface)' }, 'Journal interaction CSS');
assertCssDeclarations(css, '.journal-editorial-list a:hover .svc-more, .journal-editorial-list a:focus-visible .svc-more', { color: 'var(--ink)' }, 'Journal interaction CSS');
for (const rule of withoutBlockComments(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  if (!/\.journal-editorial-list\b/.test(positiveSelectorText(rule[1]))) continue;
  assert.doesNotMatch(rule[2], /\b(?:transition|animation)(?:-[\w-]+)?\s*:/i, 'Journal row interactions must not add motion');
}
assertCssDeclarations(css, '.article-reading-column', { 'max-width': '70ch', 'margin-inline': 'auto' }, 'Article reading CSS');
assertCssDeclarations(css, '.article-reading-column p', { 'line-height': '1.9' }, 'Article reading CSS');
assertCssDeclarations(css, '.contact-field-group', { border: '0', margin: '0', padding: '0', display: 'grid', gap: '1.4rem' }, 'Contact field group CSS');
assertCssDeclarations(css, '.contact-field-group + .contact-field-group', {
  'margin-block-start': '1.5rem',
  'padding-block-start': '1.5rem',
  'border-block-start': '1px solid var(--line)'
}, 'Contact field group CSS');
assertCssDeclarations(css, '.contact-field-group legend', { width: '100%', 'margin-block-end': '1rem', color: 'var(--muted)', 'font-size': '0.8rem' }, 'Contact legend CSS');
assertCssDeclarations(css, 'html[lang="en"] .contact-field-group legend', { 'text-transform': 'uppercase', 'letter-spacing': '0.12em' }, 'English contact legend CSS');
const responsiveCss = css.slice(css.indexOf('@media (max-width: 860px)'), css.indexOf('@media (prefers-reduced-motion: reduce)'));
assertCssDeclarations(responsiveCss, '.service-editorial-row', { 'grid-template-columns': '1fr auto' }, 'Responsive service editorial CSS');
assertCssDeclarations(responsiveCss, '.service-editorial-row p', { 'grid-column': '1 / -1' }, 'Responsive service editorial CSS');
assertCssDeclarations(responsiveCss, '.landing-section-row', { 'grid-template-columns': '1fr', gap: '0.75rem' }, 'Responsive landing content CSS');
assertCssDeclarations(responsiveCss, '.approach-sequence li', { 'grid-template-columns': '3rem 1fr' }, 'Responsive approach sequence CSS');
assertCssDeclarations(responsiveCss, '.founder-grid', { 'grid-template-columns': '1fr' }, 'Responsive founder grid CSS');
assertResponsiveJournalPlacement(responsiveCss, 'Responsive journal CSS');
assert.throws(
  () => assertCssDeclarations('.journal-entry-copy p { grid-column: 1 / -1; }', '.journal-editorial-list p', { 'grid-column': '1 / -1' }, 'Responsive journal selector probe'),
  /must define \.journal-editorial-list p/,
  'Responsive journal verifier must reject the divergent journal-entry-copy selector'
);
assert.throws(
  () => assertCssDeclarations('.journal-editorial-list .copy p { grid-column: 1 / -1; }', '.journal-editorial-list p', { 'grid-column': '1 / -1' }, 'Responsive journal selector probe'),
  /must define \.journal-editorial-list p/,
  'Responsive journal verifier must reject a descendant selector that is not the exact row paragraph selector'
);
assert.throws(
  () => assertResponsiveJournalPlacement('.journal-editorial-list p { grid-column: 1 / -1; }', 'Responsive journal placement probe'),
  /must define \.journal-editorial-list a/,
  'Responsive journal verifier must reject the paragraph-only rule because it cannot place the direct grid children'
);
assert.throws(
  () => assertResponsiveJournalPlacement(`
    .journal-editorial-list a { grid-template-columns: 1fr auto; }
    .journal-editorial-list p { grid-column: 1 / -1; }
    .journal-editorial-list a > time { grid-column: 1; grid-row: 1; }
    .journal-editorial-list a > .journal-entry-copy { grid-column: 1 / -1; grid-row: 2; min-width: 0; }
  `, 'Responsive journal placement probe'),
  /must define \.journal-editorial-list a > \.svc-more/,
  'Responsive journal verifier must reject missing direct-child read-more placement'
);
for (const obsolete of ['.svc-list', '.svc-card', '.workflow', '.workflow-media', '.workflow-step', '.workflow-num']) {
  assert.ok(!cssRuleSelectors(css).some((selector) => new RegExp(`(?:^|[^\\w-])${escapeRegExp(obsolete)}(?![\\w-])`).test(positiveSelectorText(selector))), `CSS must not retain obsolete selector ${obsolete}`);
}
const generatedHtml = [];
const collectHtml = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === '.worktrees') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(fullPath);
    else if (entry.name === 'index.html') {
      const relativePath = path.relative(ROOT, fullPath).replaceAll('\\', '/');
      generatedHtml.push({ relativePath, page: read(relativePath) });
    }
  }
};
collectHtml(ROOT);
assert.equal(generatedHtml.length, 46, 'Repository must contain exactly 46 generated index pages');
for (const { relativePath, page } of generatedHtml) {
  const label = `Generated page ${relativePath}`;
  const isEnglish = relativePath.startsWith('en/');
  const localizedPath = relativePath === 'index.html' ? '/' : `/${relativePath.replace(/index\.html$/, '')}`;
  const logicalPath = isEnglish ? localizedPath.replace(/^\/en/, '') : localizedPath;
  const expectedLang = isEnglish ? 'en' : 'ar';
  const expectedDir = isEnglish ? 'ltr' : 'rtl';
  const expectedCanonical = `${site.domain}${localizedPath}`;

  assert.match(page, new RegExp(`<html\\s+lang="${expectedLang}"\\s+dir="${expectedDir}">`), `${label} must use the correct language and direction`);
  assert.equal(elements(page, { tag: 'h1' }).length, 1, `${label} must contain exactly one h1`);
  assert.equal((page.match(/<link rel="canonical"/g) || []).length, 1, `${label} must contain exactly one canonical link`);
  has(page, `<link rel="canonical" href="${expectedCanonical}" />`, `${label} canonical must match its path`);
  const alternates = [
    ['ar', `${site.domain}${logicalPath}`],
    ['en', `${site.domain}/en${logicalPath}`],
    ['x-default', `${site.domain}${logicalPath}`]
  ];
  for (const [hreflang, href] of alternates) {
    assert.equal((page.match(new RegExp(`<link rel="alternate" hreflang="${hreflang}"`, 'g')) || []).length, 1, `${label} must contain exactly one ${hreflang} alternate`);
    has(page, `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`, `${label} must retain its ${hreflang} alternate`);
  }

  for (const image of elements(page, { tag: 'img' })) {
    const imageLabel = `${label} image ${attribute(image, 'src', `${label} image must have src`)}`;
    assert.match(attribute(image, 'width', `${imageLabel} must have intrinsic width`), /^\d+$/, `${imageLabel} width must be numeric`);
    assert.match(attribute(image, 'height', `${imageLabel} must have intrinsic height`), /^\d+$/, `${imageLabel} height must be numeric`);
    const alt = attribute(image, 'alt', `${imageLabel} must have alt text`);
    if (!alt.trim()) assert.ok(classTokens(image.open).has('stamp'), `${imageLabel} may use empty alt only when it is a decorative stamp`);
    const isHeaderStamp = classTokens(image.open).has('stamp') && !hasAttribute(image, 'loading');
    const isLazy = hasAttribute(image, 'loading') && attribute(image, 'loading', `${imageLabel} loading policy`) === 'lazy';
    const isPrioritized = hasAttribute(image, 'fetchpriority') && attribute(image, 'fetchpriority', `${imageLabel} fetch priority`) === 'high';
    assert.ok(isHeaderStamp || isLazy || isPrioritized, `${imageLabel} must be lazy-loaded or explicitly prioritized`);
  }

  const scripts = elements(page, { tag: 'script' });
  for (const script of scripts) {
    if (!hasAttribute(script, 'src')) {
      assert.ok(/type="application\/ld\+json"/.test(script.open) || /window\.GOOGLE_MAPS_API_KEY/.test(script.inner), `${label} must not contain unapproved inline scripts`);
      continue;
    }
    assert.match(attribute(script, 'src', `${label} script must have src`), /^\/assets\/js\/(?:site|contact)\.js$/, `${label} may load only first-party protected scripts`);
  }
  assert.doesNotMatch(page, /\b(?:googletagmanager|google-analytics|gtag\s*\(|analytics\.js|plausible|hotjar|segment\.com)\b/i, `${label} must remain analytics-free`);
  assert.doesNotMatch(page, /(?:width|min-width|max-width)\s*:\s*\d{4,}px|margin-(?:left|right)\s*:\s*-\d{3,}px/i, `${label} must not contain obvious inline overflow-prone fixed sizing`);

  for (const openingTag of page.matchAll(/<[^>]+>/g)) {
    const tokens = classTokens(openingTag[0]);
    for (const obsolete of ['svc-list', 'svc-card', 'workflow', 'workflow-media', 'workflow-step', 'workflow-num']) {
      assert.ok(!tokens.has(obsolete), `Generated pages must not retain obsolete class ${obsolete}`);
    }
  }
}

assert.equal(read('CNAME').trim(), 'wbstudio.xyz', 'CNAME must retain the production domain');
assert.ok(fs.existsSync(path.join(ROOT, '.nojekyll')), '.nojekyll must exist');
assert.ok(fs.existsSync(path.join(ROOT, 'manifest.webmanifest')), 'manifest.webmanifest must exist');
const manifest = JSON.parse(read('manifest.webmanifest'));
assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'Web manifest must retain icon entries');
for (const icon of manifest.icons) {
  assert.match(icon.src, /^\/assets\/(?:icons|images)\//, 'Manifest icons must remain local assets');
  assert.ok(fs.existsSync(path.join(ROOT, icon.src.slice(1))), `Manifest icon must exist: ${icon.src}`);
}
const protectedAssets = ['assets/icons/favicon.ico', 'assets/icons/apple-touch-icon.png', 'assets/icons/brand-logo.png'];
for (const asset of protectedAssets) assert.ok(fs.existsSync(path.join(ROOT, asset)), `Protected icon must exist: ${asset}`);
assert.deepEqual(
  fs.readdirSync(path.join(ROOT, 'assets/js')).filter((name) => name.endsWith('.js')).sort(),
  ['contact.js', 'site.js'],
  'The site must retain only its two protected JavaScript files'
);

assertCssDeclarations(css, '.btn', { 'min-height': '3rem' }, 'Primary control sizing');
for (const selector of ['.mobile-lang-link', '.nav-toggle', '.mobile-close']) {
  const declarations = cssDeclarations(css).filter(({ selector: candidate }) => candidate === selector);
  const values = new Map(declarations.map(({ property, value }) => [property, value.trim()]));
  const inlineSize = values.get('min-inline-size') ?? values.get('width');
  const blockSize = values.get('min-block-size') ?? values.get('height');
  assert.equal(inlineSize, '2.75rem', `${selector} must retain a minimum 44px inline touch target`);
  assert.equal(blockSize, '2.75rem', `${selector} must retain a minimum 44px block touch target`);
}
hasCssSelectorBranch(css, '.work-editorial-grid .card-media img', 'CSS must size every editorial work-grid image, not only the first card image');
assertEditorialCss(css, true);

console.log('Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.');
