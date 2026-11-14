import { buildJsonLdGraph } from './src/_data/jsonLd.js';

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/_headers': '_headers' });
  eleventyConfig.addPassthroughCopy({ 'src/.well-known': '.well-known' });
  eleventyConfig.addFilter('rssDate', value => new Date(value).toUTCString());
  eleventyConfig.addFilter('isoDate', value => new Date(value).toISOString());
  eleventyConfig.addFilter('ymdDate', value => new Date(value).toISOString().slice(0, 10));
  eleventyConfig.addFilter('dateLabel', value => new Intl.DateTimeFormat('en', {
    dateStyle: 'long', timeZone: 'UTC'
  }).format(new Date(value)));
  eleventyConfig.addFilter('safeJsonLd', value =>
    JSON.stringify(buildJsonLdGraph(value)).replace(/</g, '\\u003c')
  );
  return { dir: { input: 'src', output: '_site' }, markdownTemplateEngine: 'njk' };
}
