const baseUrl = process.env.LHCI_BASE_URL;

module.exports = {
  ci: {
    collect: {
      url: [
        baseUrl,
        `${baseUrl}/busking-map`,
        `${baseUrl}/performance-list?tab=upcoming`,
        `${baseUrl}/performance-list?tab=past`,
        `${baseUrl}/about-us`,
      ],
      numberOfRuns: 1,
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
