#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import site from '../data/site.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { cwd: ROOT, encoding: 'utf8', ...options });
  assert.equal(result.status, 0, result.stderr || `${command} failed with status ${result.status}`);
  return result.stdout;
};

const trackedGeneratedFiles = run('git', ['ls-files', '-z'])
  .split('\0')
  .filter((file) => file === 'index.html' || file.endsWith('/index.html') || file === 'sitemap.xml')
  .sort();

const { projects } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
const expectedPages = 2 * (8 + projects.length + site.landings.length + site.journal.length);
assert.equal(trackedGeneratedFiles.length, expectedPages + 1, 'Tracked generated output must match the bilingual site data and sitemap');

const snapshot = () => trackedGeneratedFiles.map((file) => [
  file,
  createHash('sha256').update(fs.readFileSync(path.join(ROOT, file))).digest('hex')
]);

const runBuild = () => {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || `Build failed with status ${result.status}`);
};

runBuild();
const first = snapshot();
runBuild();
const second = snapshot();

assert.deepEqual(second, first, 'Two consecutive builds must produce byte-identical tracked generated output');
console.log(`Reproducible build passed: ${trackedGeneratedFiles.length} tracked generated outputs are identical.`);
