#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import site from '../data/site.mjs';
import { createRoutes } from '../data/locales.mjs';

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
const { routes } = createRoutes(site, projects);
const expectedGeneratedFiles = [...new Set([
  ...[...routes.values()].flatMap((alternates) => Object.values(alternates).map((url) => `${url.slice(1)}index.html`)),
  'en/index.html', // Legacy homepage alias shares the canonical English root.
  'sitemap.xml'
])].sort();
for (const file of trackedGeneratedFiles) {
  assert.ok(expectedGeneratedFiles.includes(file), `Tracked generated output must be covered by the locale registry or explicit alias: ${file}`);
}

const snapshot = () => expectedGeneratedFiles.map((file) => [
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

assert.deepEqual(second, first, 'Two consecutive builds must produce byte-identical generated output, including newly generated locale pages');
console.log(`Reproducible build passed: ${expectedGeneratedFiles.length} registry-derived generated outputs are identical.`);
