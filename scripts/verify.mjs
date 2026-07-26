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
    const isTranÛ~õÖÚ$z{-®éÜj×VVF&6²pÐ¢“°Ð¦76W'BçF‡&÷w2€Ð¢‚’Óâ76W'DF—&V7D6öçF7D–çFW&7F–öä772‚ræF—&V7BÖ6öçF7B¦†÷fW"ÂæF—&V7BÖ6öçF7B¦fö7W2×f—6–&ÆR²6öÆ÷#¢f"‚ÒÖ–æ²“²G&ç6—F–öã¢6öÆ÷"ã'3²ÒrÂtF—&V7BÖ6öçF7B&ö&Rr’ÀÐ¢ö×W7Bæ÷BFBÖ÷F–öâòÀÐ¢tF—&V7BÖ6öçF7BfW&–f–W"×W7B&V¦V7B–çFW&7F–öâÖ÷F–öâpÐ¢“°Ð¦76W'D774FV6Æ&F–öç2†772Âs¦fö7W2×f—6–&ÆRrÂ²÷WFÆ–æS¢s'‚6öÆ–Bf"‚ÒÖ–æ²’rÂv÷WFÆ–æRÖöfg6WBs¢s7‚rÒÂtvÆö&Âfö7W2552r“°Ð¦76W'D774FV6Æ&F–öç2†772ÂræÆæF–ærÖ6öçFVçBÖw&–BrÂ²v&÷&FW"Ö&Æö6²×7F'Bs¢s‚6öÆ–Bf"‚ÒÖÆ–æR×7G&öær’rÒÂtÆæF–ær6öçFVçB552r“°Ð¦76W'D774FV6Æ&F–öç2†772ÂræÆæF–ær×6V7F–öâ×&÷rrÂ°Ð¢F—7Æ“¢vw&–BrÀÐ¢vw&–B×FV×ÆFRÖ6öÇVÖç2s¢vÖ–æÖ‚ƒ##‚Âã†g"’Ö–æÖ‚ƒÂã&g"’rÀÐ¢v¢v6Æ×ƒãW&VÒÂWgrÂW&VÒ’rÀÐ¢wFF–ærÖ&Æö6²s¢sãsW&VÒrÀÐ¢v&÷&FW"Ö&Æö6²ÖVæBs¢s‚6öÆ–Bf"‚ÒÖÆ–æR’pÐ§ÒÂtÆæF–ær6öçFVçB552r“°Ð¦76W'D774FV6Æ&F–öç2†772ÂræÆæF–ær×6V7F–öâ×&÷rƒ"ÂæÆæF–ær×6V7F–öâ×&÷rrÂ²Ö&v–ã¢srÒÂtÆæF–ær6öçFVçB552r“°Ð¦76W'D774FV6Æ&F–öç2†772ÂræÆæF–ær×6V7F–öâ×&÷rrÂ²6öÆ÷#¢wf"‚ÒÖ–æ²×6ögB’rÒÂtÆæF–ær6öçFVçB552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ&ö6‚×6WVVæ6RrÂ°Ð¢vÆ—7B×7G–ÆRs¢væöæRrÀÐ¢Ö&v–ã¢s"ãW&VÒrÀÐ¢FF–æs¢srÀÐ¢v&÷&FW"Ö&Æö6²×7F'Bs¢s‚6öÆ–Bf"‚ÒÖÆ–æR×7G&öær’pÐ§ÒÂt&ö6‚6WVVæ6R552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ&ö6‚×6WVVæ6RÆ’rÂ°Ð¢F—7Æ“¢vw&–BrÀÐ¢vw&–B×FV×ÆFRÖ6öÇVÖç2s¢sW&VÒg"rÀÐ¢v¢s&VÒrÀÐ¢wFF–ærÖ&Æö6²s¢sãW&VÒrÀÐ¢v&÷&FW"Ö&Æö6²ÖVæBs¢s‚6öÆ–Bf"‚ÒÖÆ–æR’pÐ§ÒÂt&ö6‚6WVVæ6R552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ&ö6‚×6WVVæ6Rƒ2rÂ²vÖ&v–âÖ&Æö6²ÖVæBs¢sãCW&VÒrÒÂt&ö6‚6WVVæ6R552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ&ö6‚×6WVVæ6RrÂ²6öÆ÷#¢wf"‚ÒÖ–æ²×6ögB’rÒÂt&ö6‚6WVVæ6R552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræf÷VæFW"Öw&–BrÂ°Ð¢F—7Æ“¢vw&–BrÀÐ¢vw&–B×FV×ÆFRÖ6öÇVÖç2s¢vÖ–æÖ‚ƒ#c‚ÂãsVg"’Ö–æÖ‚ƒÂã#Vg"’rÀÐ¢v¢v6Æ×ƒ"ãW&VÒÂwgrÂw&VÒ’rÀÐ¢vÆ–vâÖ—FV×2s¢w7F'BpÐ§ÒÂtf÷VæFW"w&–B552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ°Ð¢vÆ—7B×7G–ÆRs¢væöæRrÂÖ&v–ã¢srÂFF–æs¢srÀÐ¢v&÷&FW"Ö&Æö6²×7F'Bs¢s‚6öÆ–Bf"‚ÒÖÆ–æR×7G&öær’pÐ§ÒÂt¦÷W&æÂVF—F÷&–Â552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BÆ’rÂ²v&÷&FW"Ö&Æö6²ÖVæBs¢s‚6öÆ–Bf"‚ÒÖÆ–æR’rÒÂt¦÷W&æÂVF—F÷&–Â552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ°Ð¢F—7Æ“¢vw&–BrÀÐ¢vw&–B×FV×ÆFRÖ6öÇVÖç2s¢s‡&VÒÖ–æÖ‚ƒÂg"’WFòrÀÐ¢v¢s&VÒrÀÐ¢wFF–ærÖ&Æö6²s¢sãW&VÒrÀÐ¢6öÆ÷#¢v–æ†W&—BrÀÐ¢wFW‡BÖFV6÷&F–öâs¢væöæRpÐ§ÒÂt¦÷W&æÂVF—F÷&–Â552r“°Ð¦76W'D774öÖ—G4FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ°Ð¢wFF–ærrÂwFF–ærÖ–æÆ–æRrÂwFF–ærÖ–æÆ–æR×7F'BrÂwFF–ærÖ–æÆ–æRÖVæBrÂwFF–ærÖÆVgBrÂwFF–ær×&–v‡BpÐ¥ÒÂt¦÷W&æÂVF—F÷&–Â552r“°Ð¦76W'BæFöW4æ÷EF‡&÷r€Ð¢‚’Óâ76W'D774öÖ—G4FV6Æ&F–öç2‚ræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B²FF–ærÖ&Æö6³¢ãW&VÓ²ÒrÂræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ²wFF–ærrÂwFF–ærÖ–æÆ–æRuÒÂt¦÷W&æÂFF–ær&ö&Rr’ÀÐ¢t¦÷W&æÂFF–ærfW&–f–W"×W7BÆÆ÷r&Æö6²ÖöæÇ’FF–ærpÐ¢“°Ð¦f÷"†6öç7Bf÷&&–FFVåFF–æröb²wFF–ærrÂwFF–ærÖ–æÆ–æRrÂwFF–ærÖ–æÆ–æR×7F'BrÂwFF–ærÖ–æÆ–æRÖVæBuÒ’°Ð¢76W'BçF‡&÷w2€Ð¢‚’Óâ76W'D774öÖ—G4FV6Æ&F–öç2†æ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B²FF–ærÖ&Æö6³¢ãW&VÓ²G¶f÷&&–FFVåFF–æwÓ¢&VÓ²ÖÂræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ¶f÷&&–FFVåFF–æuÒÂt¦÷W&æÂFF–ær&ö&Rr’ÀÐ¢æWr&VtW‡†×W7Bæ÷B6WBG¶f÷&&–FFVåFF–æwÖ’ÀÐ¢¦÷W&æÂFF–ærfW&–f–W"×W7B&V¦V7BG¶f÷&&–FFVåFF–æwÖ Ð¢“°Ð§ÐÐ¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVçG'’Ö6÷’ƒ"rÂ²Ö&v–ã¢sãG&VÒrÒÂt¦÷W&æÂVF—F÷&–Â552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVçG'’Ö6÷’rÂ²Ö&v–ã¢srÂ6öÆ÷#¢wf"‚ÒÖ–æ²×6ögB’rÒÂt¦÷W&æÂVF—F÷&–Â552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B¦†÷fW"Âæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B¦fö7W2×f—6–&ÆRrÂ²&6¶w&÷VæC¢wf"‚Ò×7W&f6R’rÒÂt¦÷W&æÂ–çFW&7F–öâ552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B¦†÷fW"ç7f2ÖÖ÷&RÂæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B¦fö7W2×f—6–&ÆRç7f2ÖÖ÷&RrÂ²6öÆ÷#¢wf"‚ÒÖ–æ²’rÒÂt¦÷W&æÂ–çFW&7F–öâ552r“°Ð¦f÷"†6öç7B'VÆRöbv—F†÷WD&Æö6´6öÖÖVçG2†772’æÖF6„ÆÂ‚ò…µç·ÕÒ²•Ç²…µç·ÕÒ¢•ÇÒör’’°Ð¢–b‚õÂæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7EÆ"òçFW7B‡÷6—F—fU6VÆV7F÷%FW‡B‡'VÆU³Ò’’’6öçF–çVS°Ð¢76W'BæFöW4æ÷DÖF6‚‡'VÆU³%ÒÂõÆ"ƒó§G&ç6—F–öçÆæ–ÖF–öâ’ƒó¢ÕµÇrÕÒ²“õÇ2£¢ö’Ât¦÷W&æÂ&÷r–çFW&7F–öç2×W7Bæ÷BFBÖ÷F–öâr“°Ð§ÐÐ¦76W'D774FV6Æ&F–öç2†772Âræ'F–6ÆR×&VF–ærÖ6öÇVÖârÂ²vÖ‚×v–GF‚s¢ss6‚rÂvÖ&v–âÖ–æÆ–æRs¢vWFòrÒÂt'F–6ÆR&VF–ær552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ'F–6ÆR×&VF–ærÖ6öÇVÖârÂ²vÆ–æRÖ†V–v‡Bs¢sã’rÒÂt'F–6ÆR&VF–ær552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ6öçF7BÖf–VÆBÖw&÷WrÂ²&÷&FW#¢srÂÖ&v–ã¢srÂFF–æs¢srÂF—7Æ“¢vw&–BrÂv¢sãG&VÒrÒÂt6öçF7Bf–VÆBw&÷W552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ6öçF7BÖf–VÆBÖw&÷W²æ6öçF7BÖf–VÆBÖw&÷WrÂ°Ð¢vÖ&v–âÖ&Æö6²×7F'Bs¢sãW&VÒrÀÐ¢wFF–ærÖ&Æö6²×7F'Bs¢sãW&VÒrÀÐ¢v&÷&FW"Ö&Æö6²×7F'Bs¢s‚6öÆ–Bf"‚ÒÖÆ–æR’pÐ§ÒÂt6öçF7Bf–VÆBw&÷W552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âræ6öçF7BÖf–VÆBÖw&÷WÆVvVæBrÂ²v–GFƒ¢sRrÂvÖ&v–âÖ&Æö6²ÖVæBs¢s&VÒrÂ6öÆ÷#¢wf"‚ÒÖ×WFVB’rÂvföçB×6—¦Rs¢sã‡&VÒrÒÂt6öçF7BÆVvVæB552r“°Ð¦76W'D774FV6Æ&F–öç2†772Âv‡FÖÅ¶ÆæsÒ&Vâ%Òæ6öçF7BÖf–VÆBÖw&÷WÆVvVæBrÂ²wFW‡B×G&ç6f÷&Òs¢wWW&66RrÂvÆWGFW"×76–ærs¢sã&VÒrÒÂtVævÆ—6‚6öçF7BÆVvVæB552r“°Ð¦6öç7B&W7öç6—fT772Ò772ç6Æ–6R†772æ–æFW„öb‚tÖVF–†Ö‚×v–GFƒ¢ƒc‚’r’Â772æ–æFW„öb‚tÖVF–‡&VfW'2×&VGV6VBÖÖ÷F–öã¢&VGV6R’r’“°Ð¦76W'D774FV6Æ&F–öç2‡&W7öç6—fT772Ârç6W'f–6RÖVF—F÷&–Â×&÷rrÂ²vw&–B×FV×ÆFRÖ6öÇVÖç2s¢sg"WFòrÒÂu&W7öç6—fR6W'f–6RVF—F÷&–Â552r“°Ð¦76W'D774FV6Æ&F–öç2‡&W7öç6—fT772Ârç6W'f–6RÖVF—F÷&–Â×&÷rrÂ²vw&–BÖ6öÇVÖâs¢sòÓrÒÂu&W7öç6—fR6W'f–6RVF—F÷&–Â552r“°Ð¦76W'D774FV6Æ&F–öç2‡&W7öç6—fT772ÂræÆæF–ær×6V7F–öâ×&÷rrÂ²vw&–B×FV×ÆFRÖ6öÇVÖç2s¢sg"rÂv¢sãsW&VÒrÒÂu&W7öç6—fRÆæF–ær6öçFVçB552r“°Ð¦76W'D774FV6Æ&F–öç2‡&W7öç6—fT772Âræ&ö6‚×6WVVæ6RÆ’rÂ²vw&–B×FV×ÆFRÖ6öÇVÖç2s¢s7&VÒg"rÒÂu&W7öç6—fR&ö6‚6WVVæ6R552r“°Ð¦76W'D774FV6Æ&F–öç2‡&W7öç6—fT772Âræf÷VæFW"Öw&–BrÂ²vw&–B×FV×ÆFRÖ6öÇVÖç2s¢sg"rÒÂu&W7öç6—fRf÷VæFW"w&–B552r“°Ð¦76W'E&W7öç6—fT¦÷W&æÅÆ6VÖVçB‡&W7öç6—fT772Âu&W7öç6—fR¦÷W&æÂ552r“°Ð¦76W'BçF‡&÷w2€Ð¢‚’Óâ76W'D774FV6Æ&F–öç2‚ræ¦÷W&æÂÖVçG'’Ö6÷’²w&–BÖ6öÇVÖã¢òÓ²ÒrÂræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ²vw&–BÖ6öÇVÖâs¢sòÓrÒÂu&W7öç6—fR¦÷W&æÂ6VÆV7F÷"&ö&Rr’ÀÐ¢ö×W7BFVf–æRÂæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BòÀÐ¢u&W7öç6—fR¦÷W&æÂfW&–f–W"×W7B&V¦V7BF†RF—fW&vVçB¦÷W&æÂÖVçG'’Ö6÷’6VÆV7F÷"pÐ¢“°Ð¦76W'BçF‡&÷w2€Ð¢‚’Óâ76W'D774FV6Æ&F–öç2‚ræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7Bæ6÷’²w&–BÖ6öÇVÖã¢òÓ²ÒrÂræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BrÂ²vw&–BÖ6öÇVÖâs¢sòÓrÒÂu&W7öç6—fR¦÷W&æÂ6VÆV7F÷"&ö&Rr’ÀÐ¢ö×W7BFVf–æRÂæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BòÀÐ¢u&W7öç6—fR¦÷W&æÂfW&–f–W"×W7B&V¦V7BFW66VæFçB6VÆV7F÷"F†B—2æ÷BF†RW†7B&÷r&w&‚6VÆV7F÷"pÐ¢“°Ð¦76W'BçF‡&÷w2€Ð¢‚’Óâ76W'E&W7öç6—fT¦÷W&æÅÆ6VÖVçB‚ræ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B²w&–BÖ6öÇVÖã¢òÓ²ÒrÂu&W7öç6—fR¦÷W&æÂÆ6VÖVçB&ö&Rr’ÀÐ¢ö×W7BFVf–æRÂæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BòÀÐ¢u&W7öç6—fR¦÷W&æÂfW&–f–W"×W7B&V¦V7BF†R&w&‚ÖöæÇ’'VÆR&V6W6R—B6ææ÷BÆ6RF†RF—&V7Bw&–B6†–ÆG&VâpÐ¢“°Ð¦76W'BçF‡&÷w2€Ð¢‚’Óâ76W'E&W7öç6—fT¦÷W&æÅÆ6VÖVçB† Ð¢æ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B²w&–B×FV×ÆFRÖ6öÇVÖç3¢g"WFó²ÐÐ¢æ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7B²w&–BÖ6öÇVÖã¢òÓ²ÐÐ¢æ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BâF–ÖR²w&–BÖ6öÇVÖã¢²w&–B×&÷s¢²ÐÐ¢æ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7Bâæ¦÷W&æÂÖVçG'’Ö6÷’²w&–BÖ6öÇVÖã¢òÓ²w&–B×&÷s¢#²Ö–â×v–GFƒ¢²ÐÐ¢Âu&W7öç6—fR¦÷W&æÂÆ6VÖVçB&ö&Rr’ÀÐ¢ö×W7BFVf–æRÂæ¦÷W&æÂÖVF—F÷&–ÂÖÆ—7BâÂç7f2ÖÖ÷&RòÀÐ¢u&W7öç6—fR¦÷W&æÂfW&–f–W"×W7B&V¦V7BÖ—76–ærF—&V7BÖ6†–ÆB&VBÖÖ÷&RÆ6VÖVçBpÐ¢“°Ð¦f÷"†6öç7Bö'6öÆWFRöb²rç7f2ÖÆ—7BrÂrç7f2Ö6&BrÂrçv÷&¶fÆ÷rrÂrçv÷&¶fÆ÷rÖÖVF–rÂrçv÷&¶fÆ÷r×7FWrÂrçv÷&¶fÆ÷rÖçVÒuÒ’°Ð¢76W'Bæö²‚775'VÆU6VÆV7F÷'2†772’ç6öÖR‚‡6VÆV7F÷"’ÓâæWr&VtW‡†ƒó¥çÅµåÅÇrÕÒ’G¶W66U&VtW‡†ö'6öÆWFR—ÒƒòµÅÇrÕÒ–’çFW7B‡÷6—F—fU6VÆV7F÷%FW‡B‡6VÆV7F÷"’’’Â552×W7Bæ÷B&WF–âö'6öÆWFR6VÆV7F÷"G¶ö'6öÆWFWÖ“°Ð§ÐÐ¦6öç7BvVæW&FVD‡FÖÂÒµÓ°Ð¦6öç7B6öÆÆV7D‡FÖÂÒ†F—&V7F÷'’’Óâ°Ð¢f÷"†6öç7BVçG'’öbg2ç&VFF—%7–æ2†F—&V7F÷'’Â²v—F„f–ÆUG—W3¢G'VRÒ’’°Ð¢–b†VçG'’ææÖRÓÓÒræv—BrÇÂVçG'’ææÖRÓÓÒrçv÷&·G&VW2r’6öçF–çVS°Ð¢6öç7BgVÆÅF‚ÒF‚æ¦ö–â†F—&V7F÷'’ÂVçG'’ææÖR“°Ð¢–b†VçG'’æ—4F—&V7F÷'’‚’’6öÆÆV7D‡FÖÂ†gVÆÅF‚“°Ð¢VÇ6R–b†VçG'’ææÖRÓÓÒv–æFW‚æ‡FÖÂr’°Ð¢6öç7B&VÆF—fUF‚ÒF‚ç&VÆF—fR…$ôõBÂgVÆÅF‚’ç&WÆ6TÆÂ‚uÅÂrÂròr“°Ð¢vVæW&FVD‡FÖÂçW6‚‡²&VÆF—fUF‚ÂvS¢&VB‡&VÆF—fUF‚’Ò“°Ð¢ÐÐ¢ÐÐ§Ó°Ð¦6öÆÆV7D‡FÖÂ…$ôõB“°Ð¦6öç7BW‡V7FVDvVæW&FVEvT6÷VçBÒ"¢ƒ‚²&ö¦V7G2æÆVæwF‚²6—FRæÆæF–æw2æÆVæwF‚²6—FRæ¦÷W&æÂæÆVæwF‚“°Ð¦76W'BæWVÂ†vVæW&FVD‡FÖÂæÆVæwF‚ÂW‡V7FVDvVæW&FVEvT6÷VçBÂu&W÷6—F÷'’×W7B6öçF–âF†RFFÖFW&—fVBçVÖ&W"öbvVæW&FVB–æFW‚vW2r“°Ð¦f÷"†6öç7B²&VÆF—fUF‚ÂvRÒöbvVæW&FVD‡FÖÂ’°Ð¢6öç7BÆ&VÂÒvVæW&FVBvRG·&VÆF—fUF‡Ö°Ð¢76W'Bæö²‚õ²ÇEÒ²BöÒçFW7B‡vR’ÂG¶Æ&VÇÒ×W7Bæ÷B6öçF–âG&–Æ–ærv†—FW76V“°Ð¢6öç7B—4VævÆ—6‚Ò&VÆF—fUF‚ç7F'G5v—F‚‚vVâòr“°Ð¢6öç7BÆö6Æ—¦VEF‚Ò&VÆF—fUF‚ÓÓÒv–æFW‚æ‡FÖÂròròr¢òG·&VÆF—fUF‚ç&WÆ6R‚ö–æFW…Âæ‡FÖÂBòÂrr—Ö°Ð¢6öç7BÆöv–6ÅF‚Ò—4VævÆ—6‚òÆö6Æ—¦VEF‚ç&WÆ6R‚õåÂöVâòÂrr’¢Æö6Æ—¦VEFƒ°Ð¢6öç7BW‡V7FVDÆærÒ—4VævÆ—6‚òvVâr¢v"s°Ð¢6öç7BW‡V7FVDF—"Ò—4VævÆ—6‚òvÇG"r¢w'FÂs°Ð¢6öç7BW‡V7FVD6æöæ–6ÂÒG·6—FRæFöÖ–çÒG¶Æö6Æ—¦VEF‡Ö°Ð Ð¢76W'BæÖF6‚‡vRÂæWr&VtW‡†Æ‡FÖÅÅÇ2¶ÆæsÒ"G¶W‡V7FVDÆæwÒ%ÅÇ2¶F—#Ò"G¶W‡V7FVDF—'Ò#æ’ÂG¶Æ&VÇÒ×W7BW6RF†R6÷'&V7BÆæwVvRæBF—&V7F–öæ“°Ð¢76W'BæWVÂ†VÆVÖVçG2‡vRÂ²Fs¢vƒrÒ’æÆVæwF‚ÂÂG¶Æ&VÇÒ×W7B6öçF–âW†7FÇ’öæRƒ“°Ð¢76W'BæWVÂ‚‡vRæÖF6‚‚óÆÆ–æ²&VÃÒ&6æöæ–6Â"ör’ÇÂµÒ’æÆVæwF‚ÂÂG¶Æ&VÇÒ×W7B6öçF–âW†7FÇ’öæR6æöæ–6ÂÆ–æ¶“°Ð¢†2‡vRÂÆÆ–æ²&VÃÒ&6æöæ–6Â"‡&VcÒ"G¶W‡V7FVD6æöæ–6ÇÒ"óæÂG¶Æ&VÇÒ6æöæ–6Â×W7BÖF6‚—G2F†“°Ð¢6öç7BÇFW&æFW2Ò°Ð¢²v"rÂG·6—FRæFöÖ–çÒG¶Æöv–6ÅF‡ÖÒÀÐ¢²vVârÂG·6—FRæFöÖ–çÒöVâG¶Æöv–6ÅF‡ÖÒÀÐ¢²w‚ÖFVfVÇBrÂG·6—FRæFöÖ–çÒG¶Æöv–6ÅF‡ÖÐÐ¢Ó°Ð¢f÷"†6öç7B¶‡&VfÆærÂ‡&VeÒöbÇFW&æFW2’°Ð¢76W'BæWVÂ‚‡vRæÖF6‚†æWr&VtW‡†ÆÆ–æ²&VÃÒ&ÇFW&æFR"‡&VfÆæsÒ"G¶‡&VfÆæwÒ&Âvrr’’ÇÂµÒ’æÆVæwF‚ÂÂG¶Æ&VÇÒ×W7B6öçF–âW†7FÇ’öæRG¶‡&VfÆæwÒÇFW&æFV“°Ð¢†2‡vRÂÆÆ–æ²&VÃÒ&ÇFW&æFR"‡&VfÆæsÒ"G¶‡&VfÆæwÒ"‡&VcÒ"G¶‡&VgÒ"óæÂG¶Æ&VÇÒ×W7B&WF–â—G2G¶‡&VfÆæwÒÇFW&æFV“°Ð¢ÐÐ Ð¢f÷"†6öç7B–ÖvRöbVÆVÖVçG2‡vRÂ²Fs¢v–ÖrrÒ’’°Ð¢6öç7B–ÖvTÆ&VÂÒG¶Æ&VÇÒ–ÖvRG¶GG&–'WFR†–ÖvRÂw7&2rÂG¶Æ&VÇÒ–ÖvR×W7B†fR7&6—Ö°Ð¢76W'BæÖF6‚†GG&–'WFR†–ÖvRÂwv–GF‚rÂG¶–ÖvTÆ&VÇÒ×W7B†fR–çG&–ç6–2v–GF†’ÂõåÆB²BòÂG¶–ÖvTÆ&VÇÒv–GF‚×W7B&RçVÖW&–6“°Ð¢76W'BæÖF6‚†GG&–'WFR†–ÖvRÂv†V–v‡BrÂG¶–ÖvTÆ&VÇÒ×W7B†fR–çG&–ç6–2†V–v‡F’ÂõåÆB²BòÂG¶–ÖvTÆ&VÇÒ†V–v‡B×W7B&RçVÖW&–6“°Ð¢6öç7BÇBÒGG&–'WFR†–ÖvRÂvÇBrÂG¶–ÖvTÆ&VÇÒ×W7B†fRÇBFW‡F“°Ð¢–b‚ÇBçG&–Ò‚’’76W'Bæö²†6Æ75Fö¶Vç2†–ÖvRæ÷Vâ’æ†2‚w7F×r’ÂG¶–ÖvTÆ&VÇÒÖ’W6RV×G’ÇBöæÇ’v†Vâ—B—2FV6÷&F—fR7F×“°Ð¢6öç7B—4†VFW%7F×Ò6Æ75Fö¶Vç2†–ÖvRæ÷Vâ’æ†2‚w7F×r’bb†4GG&–'WFR†–ÖvRÂvÆöF–ærr“°Ð¢6öç7B—4Æ§’Ò†4GG&–'WFR†–ÖvRÂvÆöF–ærr’bbGG&–'WFR†–ÖvRÂvÆöF–ærrÂG¶–ÖvTÆ&VÇÒÆöF–æröÆ–7–’ÓÓÒvÆ§’s°Ð¢6öç7B—5&–÷&—F—¦VBÒ†4GG&–'WFR†–ÖvRÂvfWF6‡&–÷&—G’r’bbGG&–'WFR†–ÖvRÂvfWF6‡&–÷&—G’rÂG¶–ÖvTÆ&VÇÒfWF6‚&–÷&—G–’ÓÓÒv†–v‚s°Ð¢76W'Bæö²†—4†VFW%7F×ÇÂ—4Æ§’ÇÂ—5&–÷&—F—¦VBÂG¶–ÖvTÆ&VÇÒ×W7B&RÆ§’ÖÆöFVB÷"W‡Æ–6—FÇ’&–÷&—F—¦VF“°Ð¢ÐÐ Ð¢6öç7B67&—G2ÒVÆVÖVçG2‡vRÂ²Fs¢w67&—BrÒ“°Ð¢f÷"†6öç7B67&—Böb67&—G2’°Ð¢–b‚†4GG&–'WFR‡67&—BÂw7&2r’’°Ð¢76W'Bæö²‚÷G—SÒ&Æ–6F–öåÂöÆEÂ¶§6öâ"òçFW7B‡67&—Bæ÷Vâ’ÇÂ÷v–æF÷uÂätôôtÄUôÔ5ô•ô´U’òçFW7B‡67&—Bæ–ææW"’ÂG¶Æ&VÇÒ×W7Bæ÷B6öçF–âVæ&÷fVB–æÆ–æR67&—G6“°Ð¢6öçF–çVS°Ð¢ÐÐ¢76W'BæÖF6‚†GG&–'WFR‡67&—BÂw7&2rÂG¶Æ&VÇÒ67&—B×W7B†fR7&6’ÂõåÂö76WG5Âö§5Âòƒó§6—FWÆ6öçF7B•Âæ§2BòÂG¶Æ&VÇÒÖ’ÆöBöæÇ’f—'7B×'G’&÷FV7FVB67&—G6“°Ð¢ÐÐ¢76W'BæFöW4æ÷DÖF6‚‡vRÂõÆ"ƒó¦vöövÆWFvÖævW'ÆvöövÆRÖæÇ—F–77ÆwFuÇ2¥Â‡ÆæÇ—F–75Âæ§7ÇÆW6–&ÆWÆ†÷F¦'Ç6VvÖVçEÂæ6öÒ•Æ"ö’ÂG¶Æ&VÇÒ×W7B&VÖ–âæÇ—F–72Ög&VV“°Ð¢76W'BæFöW4æ÷DÖF6‚‡vRÂòƒó§v–GF‡ÆÖ–â×v–GF‡ÆÖ‚×v–GF‚•Ç2£¥Ç2¥ÆG³BÇ×‡ÆÖ&v–âÒƒó¦ÆVgGÇ&–v‡B•Ç2£¥Ç2¢ÕÆG³2Ç×‚ö’ÂG¶Æ&VÇÒ×W7Bæ÷B6öçF–âö'f–÷W2–æÆ–æR÷fW&fÆ÷r×&öæRf—†VB6—¦–æv“°Ð Ð¢f÷"†6öç7B÷Væ–æuFröbvRæÖF6„ÆÂ‚óÅµãåÒ³âör’’°Ð¢6öç7BFö¶Vç2Ò6Æ75Fö¶Vç2†÷Væ–æuFu³Ò“°Ð¢f÷"†6öç7Bö'6öÆWFRöb²w7f2ÖÆ—7BrÂw7f2Ö6&BrÂwv÷&¶fÆ÷rrÂwv÷&¶fÆ÷rÖÖVF–rÂwv÷&¶fÆ÷r×7FWrÂwv÷&¶fÆ÷rÖçVÒuÒ’°Ð¢76W'Bæö²‚Fö¶Vç2æ†2†ö'6öÆWFR’ÂvVæW&FVBvW2×W7Bæ÷B&WF–âö'6öÆWFR6Æ72G¶ö'6öÆWFWÖ“°Ð¢ÐÐ¢ÐÐ§ÐÐ Ð¦76W'BæWVÂ‡&VB‚t4äÔRr’çG&–Ò‚’Âwv'7GVF–òç‡—¢rÂt4äÔR×W7B&WF–âF†R&öGV7F–öâFöÖ–âr“°Ð¦76W'Bæö²†g2æW†—7G57–æ2‡F‚æ¦ö–â…$ôõBÂrææö¦V·–ÆÂr’’Ârææö¦V·–ÆÂ×W7BW†—7Br“°Ð¦76W'Bæö²†g2æW†—7G57–æ2‡F‚æ¦ö–â…$ôõBÂvÖæ–fW7BçvV&Öæ–fW7Br’’ÂvÖæ–fW7BçvV&Öæ–fW7B×W7BW†—7Br“°Ð¦6öç7BÖæ–fW7BÒ¥4ôâç'6R‡&VB‚vÖæ–fW7BçvV&Öæ–fW7Br’“°Ð¦76W'Bæö²„'&’æ—4'&’†Öæ–fW7Bæ–6öç2’bbÖæ–fW7Bæ–6öç2æÆVæwF‚âÂuvV"Öæ–fW7B×W7B&WF–â–6öâVçG&–W2r“°Ð¦f÷"†6öç7B–6öâöbÖæ–fW7Bæ–6öç2’°Ð¢76W'BæÖF6‚†–6öâç7&2ÂõåÂö76WG5Âòƒó¦–6öç7Æ–ÖvW2•ÂòòÂtÖæ–fW7B–6öç2×W7B&VÖ–âÆö6Â76WG2r“°Ð¢76W'Bæö²†g2æW†—7G57–æ2‡F‚æ¦ö–â…$ôõBÂ–6öâç7&2ç6Æ–6Rƒ’’’ÂÖæ–fW7B–6öâ×W7BW†—7C¢G¶–6öâç7&7Ö“°Ð§ÐÐ¦6öç7B&÷FV7FVD76WG2Ò²v76WG2ö–6öç2öff–6öâæ–6òrÂv76WG2ö–6öç2öÆR×F÷V6‚Ö–6öâçærrÂv76WG2ö–6öç2ö'&æBÖÆövòçæruÓ°Ð¦f÷"†6öç7B76WBöb&÷FV7FVD76WG2’76W'Bæö²†g2æW†—7G57–æ2‡F‚æ¦ö–â…$ôõBÂ76WB’’Â&÷FV7FVB–6öâ×W7BW†—7C¢G¶76WGÖ“°Ð¦76W'BæFVWWVÂ€Ð¢g2ç&VFF—%7–æ2‡F‚æ¦ö–â…$ôõBÂv76WG2ö§2r’’æf–ÇFW"‚†æÖR’ÓâæÖRæVæG5v—F‚‚ræ§2r’’ç6÷'B‚’ÀÐ¢²v6öçF7Bæ§2rÂw6—FRæ§2uÒÀÐ¢uF†R6—FR×W7B&WF–âöæÇ’—G2Gvò&÷FV7FVB¦f67&—Bf–ÆW2pÐ¢“°Ð Ð¦76W'D774FV6Æ&F–öç2†772Âræ'FârÂ²vÖ–âÖ†V–v‡Bs¢s7&VÒrÒÂu&–Ö'’6öçG&öÂ6—¦–ærr“°Ð¦f÷"†6öç7B6VÆV7F÷"öb²ræÖö&–ÆRÖÆærÖÆ–æ²rÂrææb×FövvÆRrÂræÖö&–ÆRÖ6Æ÷6RuÒ’°Ð¢76W'DÖ–æ–×VÕF÷V6…F&vWB†772Â6VÆV7F÷"Â6VÆV7F÷"“°Ð§ÐÐ¦76W'BçF‡&÷w2€Ð¢‚’Óâ76W'DÖ–æ–×VÕF÷V6…F&vWB‚rç&ö&R²v–GFƒ¢"ãsW&VÓ²†V–v‡C¢"ãsW&VÓ²ÒrÂrç&ö&RrÂuF÷V6‚×F&vWB&ö&Rr’ÀÐ¢öBÆV7BC‡‚òÀÐ¢uF÷V6‚×F&vWBfW&–f–W"×W7B&V¦V7BCG‚6öçG&öÇ2pÐ¢“°Ð¦76W'BæFöW4æ÷EF‡&÷r€Ð¢‚’Óâ76W'DÖ–æ–×VÕF÷V6…F&vWB‚rç&ö&R²Ö–âÖ–æÆ–æR×6—¦S¢7&VÓ²Ö–âÖ&Æö6²×6—¦S¢C‡ƒ²ÒrÂrç&ö&RrÂuF÷V6‚×F&vWB&ö&Rr’ÀÐ¢uF÷V6‚×F&vWBfW&–f–W"×W7B66WBC‡‚6öçG&öÇ2pÐ¢“°Ð¦†47756VÆV7F÷$'&æ6‚†772Ârçv÷&²ÖVF—F÷&–ÂÖw&–Bæ6&BÖÖVF––ÖrrÂt552×W7B6—¦RWfW'’VF—F÷&–Âv÷&²Öw&–B–ÖvRÂæ÷BöæÇ’F†Rf—'7B6&B–ÖvRr“°Ð¦76W'DVF—F÷&–Ä772†772ÂG'VR“°Ð Ð¦6öç6öÆRæÆör‚ufW&–f–6F–öâ76VC¢&–Æ–æwVÂ6†VÆÂÂ4TòÇFW&æFW2Â6öçF7BÇVÖ&–ærÂæBÖ÷F–öâ–çf&–çG2âr“°Ð