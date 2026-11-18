import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const executablePath = process.env.CHROME_PATH;
assert(executablePath, 'Set CHROME_PATH to an existing Chromium executable.');
const root = dirname(fileURLToPath(import.meta.url));
await mkdir(join(root, 'exports'), { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
const results = [];
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/*', route => {
    const request = route.request();
    if (/^(file:|data:)/.test(request.url())) route.continue();
    else { errors.push('Unexpected network request: ' + request.url()); route.abort(); }
  });
  for (const [source, output, width, height] of [
    ['01-intro', '01-intro', 1080, 1350],
    ...['A', 'B', 'C'].map(letter => [letter, letter, 1080, 1350]),
    ...['A', 'B', 'C'].map(letter => [letter + '-mobile', letter + '-mobile', 1080, 1350]),
    ['comparison', '04-comparison', 1920, 1080],
    ['comparison-BCA', '04-comparison-BCA', 1920, 1080],
    ['comparison-CAB', '04-comparison-CAB', 1920, 1080],
    ['05-poll', '05-poll', 1080, 1350]
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(pathToFileURL(join(root, source + '.html')).href);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(image => image.decode()));
    });
    const state = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      brokenImages: [...document.images].filter(image => !image.naturalWidth).length,
      scripts: document.scripts.length,
      contentBottom: Math.max(...[...document.querySelectorAll('.site')].map(el => el.getBoundingClientRect().bottom), 0)
    }));
    assert.equal(state.width, width, source + ' horizontal overflow');
    assert.equal(state.height, height, source + ' vertical overflow');
    assert.equal(state.brokenImages, 0);
    assert.equal(state.scripts, 0);
    if (!source.startsWith('comparison')) assert(state.contentBottom < height - 55, source + ' footer collision');
    await page.screenshot({ path: join(root, 'exports', output + '.png') });
    results.push({ source, width, height, ...state });
  }
  const signatures = [];
  for (const letter of ['A', 'B', 'C']) {
    await page.goto(pathToFileURL(join(root, letter + '.html')).href);
    signatures.push(await page.$eval('.site', site => ({ text: site.innerText, images: [...site.querySelectorAll('img')].map(image => image.getAttribute('src')) })));
  }
  assert.deepEqual(signatures[0], signatures[1]);
  assert.deepEqual(signatures[1], signatures[2]);
  for (const order of ['ABC', 'BCA', 'CAB']) {
    await page.goto(pathToFileURL(join(root, 'deck-' + order + '.html')).href);
    await page.evaluate(async () => Promise.all([...document.images].map(image => image.decode())));
    assert.equal(await page.$$eval('img', images => images.length), 6);
  }
  assert.deepEqual(errors, []);
  await writeFile(join(root, 'verification.json'), JSON.stringify({ checks: results, decks: ['ABC', 'BCA', 'CAB'], errors }, null, 2) + '\n');
  console.log('PASS: 11 PNG exports, 3 deck orders, images decoded, no clipping, scripts or network requests.');
} finally {
  await browser.close();
}
