import site from './site.json' with { type: 'json' };

const personNode = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.author.name,
  alternateName: site.author.alternateNames,
  jobTitle: site.author.jobTitle,
  url: `${site.url}/about/`,
  email: `mailto:${site.email}`,
  knowsAbout: [
    'iOS App Development',
    'SwiftUI',
    'ADHD-Friendly Software Design',
    'Privacy-First Wellness Journaling',
    'Neurodivergent Productivity Tools',
  ],
  sameAs: [
    site.author.profiles.github,
    site.author.profiles.x,
    site.author.profiles.linkedin,
    site.author.profiles.littlelink,
    site.appStoreUrl,
  ],
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  alternateName: [site.appName, 'NeuroNook App'],
  url: `${site.url}/`,
  inLanguage: 'en',
  publisher: { '@id': `${site.url}/#person` },
  author: { '@id': `${site.url}/#person` },
};

const appNode = {
  '@type': 'MobileApplication',
  '@id': `${site.url}/#app`,
  name: site.name,
  alternateName: site.appName,
  url: `${site.url}/`,
  downloadUrl: site.appStoreUrl,
  installUrl: site.appStoreUrl,
  sameAs: site.appStoreUrl,
  operatingSystem: 'iOS 26.0 or later, iPadOS 26.0 or later',
  applicationCategory: 'HealthApplication',
  applicationSubCategory: 'Mood Journal & Wellness Check-In',
  inLanguage: ['en', 'es'],
  isAccessibleForFree: true,
  author: { '@id': `${site.url}/#person` },
  creator: { '@id': `${site.url}/#person` },
  publisher: { '@id': `${site.url}/#person` },
  keywords: 'NeuroNook, ADHD mood journal, apps for ADHD, daily check-in app, neurodivergent wellness app, private mood tracker, no blank page journal, iPhone, iPad, Wesley Keetch',
  description: 'A private, ADHD-friendly wellness journal for iPhone and iPad by Wesley Keetch. Nine quick construction mini-games turn daily check-ins into a growing seven-day neighborhood of houses, stored locally on your device.',
  featureList: [
    'Nine quick construction-themed mini-games covering sleep, stress, mood, motivation, social connection, and energy',
    'No blank-page pressure with optional private journal notes',
    'Seven-day illustrated neighborhood street that grows with each completed check-in',
    'Calendar view, wellness trends, and built-in Learning Center with ADHD Support and Autism Awareness guides',
    'Local-first on-device storage with no accounts, no ads, and no tracking',
    'Reduce Motion accessibility support and full English and Spanish localization',
    'Home Screen and Lock Screen widgets, gentle reminders, and JSON or PDF export',
  ],
  image: `${site.url}/assets/social.png`,
  screenshot: [
    `${site.url}/assets/neighborhood-day-large.webp`,
    `${site.url}/assets/game-brick-large.webp`,
    `${site.url}/assets/game-pipes-large.webp`,
    `${site.url}/assets/calendar-current-large.webp`,
    `${site.url}/assets/day-detail-large.webp`,
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

export function buildJsonLdGraph({ page, title, description, home, isPost, date, updated, keywords, faq }) {
  const pageUrl = `${site.url}${page?.url || '/'}`;
  const graph = [websiteNode, personNode, appNode];

  if (home) {
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  const pageType = page?.url === '/about/'
    ? 'AboutPage'
    : page?.url === '/blog/'
      ? 'CollectionPage'
      : 'WebPage';

  const webPageNode = {
    '@type': pageType,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#app` },
    author: { '@id': `${site.url}/#person` },
  };
  if (updated) {
    webPageNode.dateModified = new Date(updated).toISOString();
  }
  graph.push(webPageNode);

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: site.name,
      item: `${site.url}/`,
    },
  ];

  if (isPost) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Notes',
      item: `${site.url}/blog/`,
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: title,
      item: pageUrl,
    });
  } else if (page?.url && page.url !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: title,
      item: pageUrl,
    });
  }

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  });

  if (isPost && date) {
    const publishedIso = new Date(date).toISOString();
    const modifiedIso = updated ? new Date(updated).toISOString() : publishedIso;
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: title,
      description,
      url: pageUrl,
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      datePublished: publishedIso,
      dateModified: modifiedIso,
      inLanguage: 'en',
      keywords: keywords || site.defaultKeywords,
      image: `${site.url}/assets/social.png`,
      author: { '@id': `${site.url}/#person` },
      publisher: { '@id': `${site.url}/#person` },
      about: { '@id': `${site.url}/#app` },
    });
  }

  if (Array.isArray(faq) && faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export default {
  '@context': 'https://schema.org',
  '@graph': [websiteNode, personNode, appNode],
};
