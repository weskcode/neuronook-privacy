import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const read = file => readFile(file, 'utf8');
const pages = ['index.html', 'privacy/index.html', 'support/index.html', 'blog/index.html', 'blog/welcome/index.html', 'changelog/index.html', '404.html'];
const titles = new Set();
const descriptions = new Set();
for (const file of pages) {
  const html = await read(`_site/${file}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/s)?.[1];
  assert(title && !titles.has(title), `${file}: title must be unique`);
  assert(description && !descriptions.has(description), `${file}: description must be unique`);
  titles.add(title); descriptions.add(description);
  assert(html.includes('name="apple-itunes-app" content="app-id=6745560129"'), `${file}: smart banner missing`);
  assert(html.includes('rel="canonical" href="https://neuronook.app/'), `${file}: canonical missing`);
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
    assert(html.includes(`property="${tag}"`), `${file}: ${tag} missing`);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one h1 required`);
  assert(!/weskcode@duck\.com|gmail\.com/i.test(html), `${file}: outdated or private contact address`);
  assert(!/<script\b|<iframe\b|<embed\b|<style\b|\son\w+=/i.test(html), `${file}: active or inline content`);
  for (const match of html.matchAll(/<(?:img|link)\b[^>]*(?:src|href)="([^"]+)"/g)) {
    assert(!/^https?:\/\//.test(match[1]) || match[0].includes('canonical'), `${file}: external asset ${match[1]}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(match[0]), `${file}: image missing alt`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)/g)) {
    const target = match[1].split('#')[0];
    if (!target) continue;
    const disk = path.join('_site', target, target.endsWith('/') ? 'index.html' : '');
    await readFile(disk);
  }
}
// Archive integrity and current/legacy parity remain separate from editorial wording.
const archivedOriginals = {"privacy-original.md": "7cc0cae4a8faa6359d704111ade33f4482597794fe4165c7115e6f600d0d3645", "support-original.md": "be0fc4e3a14e5d0c44db96aa3fcb5837bbaf82f6c7921561db6fe0b0fe28d8ef"};
for (const [file, sha256] of Object.entries(archivedOriginals)) {
  assert.equal(createHash('sha256').update(await readFile(`legacy/${file}`)).digest('hex'), sha256, `${file}: archived original changed`);
}
const markdownBody = text => text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n(?:\r?\n)?/, '');
for (const [file, destination] of [['index.md', 'privacy'], ['support/index.md', 'support']]) {
  const legacy = await read(file);
  assert(legacy.includes(`redirect_target: https://neuronook.app/${destination}/`));
  assert.equal(markdownBody(legacy), markdownBody(await read(`src/${destination}/index.md`)), 'legacy fallback must match the current published text');
}
const policy = await read('_site/privacy/index.html');
assert(policy.includes('<th scope="col" role="columnheader">Service</th>') && policy.includes('<th scope="col" role="columnheader">Information and purpose</th>'), 'privacy service table must retain semantic headers');
for (const service of ['WeatherKit', 'RevenueCat', 'App Store']) assert(policy.includes(service), `privacy: missing ${service} disclosure`);
assert((await read('_config.yml')).includes('  - legacy/**\n'), 'exclude archived contents without hiding the legacy.html layout');
const legacyLayout = await read('_layouts/legacy.html');
assert(legacyLayout.includes('{% if site.redirects_enabled %}<meta http-equiv="refresh" content="0; url={{ page.redirect_target }}">'));
assert(legacyLayout.includes('rel="canonical" href="{{ page.redirect_target }}"'));
assert((await read('_config.yml')).includes('redirects_enabled: true'), 'legacy redirects must stay enabled after domain activation');
for (const route of ['privacy', 'support']) {
  const html = await read(`_site/${route}/index.html`);
  assert(html.includes('href="mailto:support@neuronook.app"') && html.includes('>support@neuronook.app</a>'), 'support email must remain visible and usable');
}
assert((await read('_site/support/index.html')).includes('href="/privacy/"'), 'support privacy link must reach the moved policy');
const sitemap = await read('_site/sitemap.xml');
for (const route of ['/', '/privacy/', '/support/', '/blog/', '/blog/welcome/', '/changelog/']) assert(sitemap.includes(`https://neuronook.app${route}</loc>`));
assert(!sitemap.includes('404.html'));
assert((await read('_site/feed.xml')).includes('<guid>https://neuronook.app/blog/welcome/</guid>'));
assert((await read('_site/robots.txt')).includes('Sitemap: https://neuronook.app/sitemap.xml'));
assert.equal(await read('_site/_headers'), await read('src/_headers'));
const assets = await readdir('_site/assets');
assert(!assets.some(name => /\.(?:js|mjs)$/.test(name)));
const pkg = JSON.parse(await read('package.json'));
assert.deepEqual(Object.keys(pkg.devDependencies), ['@11ty/eleventy']);
console.log(`PASS: ${pages.length} pages, local links/assets, approved policy/support, legacy redirects, metadata, RSS, sitemap, robots and headers`);
