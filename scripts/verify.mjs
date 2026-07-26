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
  assert.match(
    closeMenu[1],
    /requestAnimationFrame\(\s*\(\)\s*=>\s*requestAnimationFrame\(\s*\(\)\s*=>\s*toggle\.focus\(\s*\)\s*\)\s*\)/,
    `${label} closeMenu must restore toggle focus after two frames so close-button click completion cannot overwrite it`
  );
};
const assertMinimumTouchTarget = (text, selector, label) => {
  const declarations = cssDeclarations(text).filter(({ selector: candidate }) => candidate === selector);
  const values = new Map(declarations.map(({ property, value }) => [property, value.trim()]));
  const inlineSize = values.get('min-inline-size') ?? values.get('width');
  const blockSize = values.get('min-block-size') ?? values.get('height');
  const isAtLeast48px = (value) => {
    const match = value?.match(/^(\d*\.?\d+)(px|rem)$/);
    if (!match) return false;
    return Number(match[1]) * (match[2] === 'rem' ? 16 : 1) >= 48;
  };
  assert.ok(isAtLeast48px(inlineSize), `${label} must provide at least 48px inline target size`);
  assert.ok(isAtLeast48px(blockSize), `${label} must provide at least 48px block target size`);
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

  for (const match of source.matchAll(/Û}}ÒÚ$z{-®éÜj×ntactInteractionCss('.direct-contact a:hover { color: var(--ink); }', 'Direct-contact probe'),
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
const expectedGeneratedPageCount = 2 * (8 + projects.length + site.landings.length + site.journal.length);
assert.equal(generatedHtml.length, expectedGeneratedPageCount, 'Repository must contain the data-derived number of generated index pages');
for (const { relativePath, page } of generatedHtml) {
  const label = `Generated page ${relativePath}`;
  assert.ok(!/[ \t]+$/m.test(page), `${label} must not contain trailing whitespace`);
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
  assertMinimumTouchTarget(css, selector, selector);
}
assert.throws(
  () => assertMinimumTouchTarget('.probe { width: 2.75rem; height: 2.75rem; }', '.probe', 'Touch-target probe'),
  /at least 48px/,
  'Touch-target verifier must reject 44px controls'
);
assert.doesNotThrow(
  () => assertMinimumTouchTarget('.probe { min-inline-size: 3rem; min-block-size: 48px; }', '.probe', 'Touch-target probe'),
  'Touch-target verifier must accept 48px controls'
);
hasCssSelectorBranch(css, '.work-editorial-grid .card-media img', 'CSS must size every editorial work-grid image, not only the first card image');
assertEditorialCss(css, true);

console.log('Verification passed: bilingual shell, SEO alternates, contact plumbing, and motion invariants.');
