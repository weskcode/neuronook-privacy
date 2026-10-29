export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/_headers': '_headers' });
  eleventyConfig.addFilter('rssDate', value => new Date(value).toUTCString());
  eleventyConfig.addFilter('isoDate', value => new Date(value).toISOString());
  eleventyConfig.addFilter('dateLabel', value => new Intl.DateTimeFormat('en', {
    dateStyle: 'long', timeZone: 'UTC'
  }).format(new Date(value)));
  return { dir: { input: 'src', output: '_site' }, markdownTemplateEngine: 'njk' };
}
