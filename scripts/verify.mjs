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
const assertProjectPage = (page, project, projectIndex, lang, prefix, label) => {
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
  const galleryFigures = elements(gallery.inner, { tag: 'figure' });
  assert.equal(galleryFigures.length, project.gallery.length, `${pageLabel} must retain every gallery figure`);
  project.gallery.forEach((galleryImage, galleryIndex) => {
    const figure = galleryFigures[galleryIndex];
    const expectedLayout = galleryImage.w >= galleryImage.h ? 'g-wide' : 'g-tall';
    assert.ok(hasClassTokens(figure.open, expectedLayout), `${pageLabel} gallery figure ${galleryIndex + 1} must use ${expectedLayout}`);
    assert.ok(hasAttribute(figure, 'data-reveal'), `${pageLabel} gallery figure ${galleryIndex + 1} must retain data-reveal`);
    assertImage(figure.inner, galleryImage, lang, { eager: false, label: `${pageLabel} gallery figure ${galleryIndex + 1}` });
  });

  const galleryNotes = elements(page, { classes: 'gallery-note' });
  if (project.placeholder) {
    assert.equal(galleryNotes.length, 1, `${pageLabel} placeholder project must retain one gallery note`);
    has(galleryNotes[0].inner, htmlEscape(site.project.galleryNote[lang]), `${pageLabel} gallery note must retain its localized text`);
    const noteLink = elements(galleryNotes[0].inner, { tag: 'a' })[0];
    assert.ok(noteLink, `${pageLabel} gallery note must contain its credits link`);
    assert.equal(attribute(noteLink, 'href', `${pageLabel} gallery note link must have href`), `${prefix}/credits/`, `${pageLabel} gallery note must use the localized credits href`);
    has(noteLink.inner, htmlEscape(site.project.galleryNoteLink[lang]), `${pageLabel} gallery note must retain localized link text`);
  } else {
    assert.equal(galleryNotes.length, 0, `${pageLabel} non-placeholder project must not render a gallery note`);
  }

  const next = projects[(projectIndex + 1) % projects.length];
  const nextContainer = elementWithClasses(page, 'next-project', `${pageLabel} must retain its next-project container`);
  has(nextContainer.inner, htmlEscape(site.project.nextProject[lang]), `${pageLabel} must retain the localized next-project label`);
  const nextLink = elementWithClasses(nextContainer.inner, 'next-link', `${pageLabel} must retain its next-project link`, 'a');
  assert.equal(attribute(nextLink, 'href', `${pageLabel} next-project link must have href`), `${prefix}/work/${next.slug}/`, `${pageLabel} next-project link must target the correct localized project`);
  has(nextLink.inner, htmlEscape(next.title[lang]), `${pageLabel} next-project link must retain the localized project title`);
  has(nextLink.inner, lang === 'ar' ? '←' : '→', `${pageLabel} next-project link must retain the directional arrow`);
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
  hasClasses(page, 'work-editorial-grid', `${label} work page must use the editorial portfolio grid`);
  assertWorkCredits(page, lang, prefix, label);
  for (const project of projects) {
    has(page, `href="${prefix}/work/${project.slug}/"`, `${label} work page must retain the ${project.slug} project card`);
  }
}

assert.throws(
  () => assertWorkCredits(`<footer><a href="/credits/">${htmlEscape(site.work.noteLink.en)}</a></footer><p class="work-credits">Missing</p>`, 'en', '', 'Probe'),
  /work credits/,
  'Work credits checks must reject a credits link found only in the footer'
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
assert.match(withoutBlockComments(siteJs), /const\s+prefersReducedMotion\s*=\s*window\.matchMedia\(\s*(['"])\(prefers-reduced-motion:\s*reduce\)\1\s*\)\.matches\s*;[\s\S]*?if\s*\(\s*prefersReducedMotion\b[\s\S]*?\)\s*\{\s*revealElements\.forEach\s*\(/, 'Reduced-motion preference must control the reveal fallback');
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
assertEditorialCss(css, true);

console.log('Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.');
