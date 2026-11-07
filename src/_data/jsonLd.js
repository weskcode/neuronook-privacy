import site from './site.json' with { type: 'json' };

export default {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      inLanguage: 'en',
    },
    {
      '@type': 'MobileApplication',
      '@id': `${site.url}/#app`,
      name: site.name,
      url: `${site.url}/`,
      downloadUrl: site.appStoreUrl,
      installUrl: site.appStoreUrl,
      operatingSystem: 'iOS 26.0 or later',
      applicationCategory: 'HealthApplication',
      description: 'A private wellness journal for iPhone and iPad. Daily check-in games add a house to a seven-day neighborhood.',
      image: `${site.url}/assets/social.png`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};
