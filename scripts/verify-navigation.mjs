#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = fs.readFileSync(new URL('../assets/js/site.js', import.meta.url), 'utf8');

// A small DOM fixture runs the real shared script without adding site dependencies.
function setup() {
  const frames = [];
  const element = () => ({
    inert: false, listeners: {}, attributes: {},
    addEventListener(type, handler) { this.listeners[type] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
    focus() { document.activeElement = this; }
  });
  const toggle = element();
  const close = element();
  const link = element();
  const lastLink = element();
  const background = element();
  const alreadyInert = element();
  alreadyInert.inert = true;
  const menu = { ...element(), hidden: true,
    contains: (el) => [close, link, lastLink].includes(el),
    querySelectorAll: (selector) => selector === 'a' ? [link, lastLink] : [close, link, lastLink]
  };
  const document = { activeElement: toggle, listeners: {},
    body: { style: { overflow: 'auto' }, children: [background, menu, alreadyInert] },
    querySelector: (selector) => selector === '[data-nav-toggle]' ? toggle : close,
    querySelectorAll: () => [],
    getElementById: () => menu,
    addEventListener(type, handler) { this.listeners[type] = handler; }
  };
  const window = { innerWidth: 390, listeners: {}, matchMedia: () => ({ matches: true }),
    addEventListener(type, handler) { this.listeners[type] = handler; }
  };
  vm.runInNewContext(source, { document, window, requestAnimationFrame: (fn) => frames.push(fn) });
  const key = (key, shiftKey = false) => {
    const event = { key, shiftKey, prevented: false, preventDefault() { this.prevented = true; } };
    document.listeners.keydown(event);
    return event;
  };
  const flushFrames = () => { while (frames.length) frames.shift()(); };
  return { toggle, close, link, lastLink, background, alreadyInert, menu, document, window, key, flushFrames };
}

test('opening the menu focuses its close control and isolates the background', () => {
  const ui = setup();
  ui.toggle.listeners.click();
  assert.equal(ui.menu.hidden, false);
  assert.equal(ui.document.activeElement, ui.close);
  assert.equal(ui.background.inert, true);
  assert.equal(ui.toggle.attributes['aria-expanded'], 'true');
  assert.equal(ui.document.body.style.overflow, 'hidden');
});

test('Tab and Shift+Tab wrap inside the menu', () => {
  const ui = setup();
  ui.toggle.listeners.click();
  ui.close.focus();
  assert.equal(ui.key('Tab', true).prevented, true);
  assert.equal(ui.document.activeElement, ui.lastLink);
  assert.equal(ui.key('Tab').prevented, true);
  assert.equal(ui.document.activeElement, ui.close);
  ui.link.focus();
  assert.equal(ui.key('Tab').prevented, false);
});

for (const reason of ['close button', 'Escape', 'navigation link', 'desktop resize']) {
  test(`${reason} closes the menu and restores the previous background state`, () => {
    const ui = setup();
    ui.toggle.listeners.click();
    if (reason === 'close button') ui.close.listeners.click();
    if (reason === 'Escape') ui.key('Escape');
    if (reason === 'navigation link') ui.link.listeners.click();
    if (reason === 'desktop resize') {
      ui.window.innerWidth = 1000;
      ui.window.listeners.resize();
    }
    ui.flushFrames();
    assert.equal(ui.menu.hidden, true);
    assert.equal(ui.background.inert, false);
    assert.equal(ui.alreadyInert.inert, true);
    assert.equal(ui.document.body.style.overflow, 'auto');
    assert.equal(ui.toggle.attributes['aria-expanded'], 'false');
    assert.equal(ui.document.activeElement, ui.toggle);
    assert.equal(ui.key('Tab', true).prevented, false);
  });
}
