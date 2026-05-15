module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'started server',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/busking-map',
        'http://localhost:3000/performance-list?tab=upcoming',
        'http://localhost:3000/performance-list?tab=past',
        'http://localhost:3000/about-us',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
