const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { spawnSync } = require('child_process');

const { resolveHtmlFile, resolveBaseName } = require('./html_to_pdf_png_svg');

const SCRIPT = path.join(__dirname, 'html_to_pdf_png_svg.js');

test('resolveHtmlFile builds correct path from area name', () => {
  const result = resolveHtmlFile('snel-west-rand-uni');
  const expected = path.join(__dirname, '..', 'artifacts', 'snel-west-rand-uni', 'public', 'index.html');
  assert.equal(result, expected);
});

test('resolveHtmlFile uses area name verbatim', () => {
  const result = resolveHtmlFile('frogtown-north');
  assert.ok(result.includes('frogtown-north'));
  assert.ok(result.endsWith(path.join('public', 'index.html')));
});

test('resolveBaseName extracts area directory from html path', () => {
  const htmlFile = path.join(__dirname, '..', 'artifacts', 'snel-west-rand-uni', 'public', 'index.html');
  assert.equal(resolveBaseName(htmlFile), 'snel-west-rand-uni');
});

test('resolveBaseName works for any area name', () => {
  const htmlFile = path.join(__dirname, '..', 'artifacts', 'frogtown-north', 'public', 'index.html');
  assert.equal(resolveBaseName(htmlFile), 'frogtown-north');
});

test('CLI exits with code 1 and prints usage when no argument given', () => {
  const result = spawnSync('node', [SCRIPT], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes('Usage:'));
  assert.ok(result.stderr.includes('geographic-area'));
});

test('CLI exits with code 1 and prints friendly message for unknown area', () => {
  const result = spawnSync('node', [SCRIPT, 'no-such-place'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.ok(result.stderr.includes('no-such-place'));
  assert.ok(result.stderr.includes('not found'));
});
