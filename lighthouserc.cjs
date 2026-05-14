module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["/", "/en/"],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      assertions: {
        "categories:seo": ["error", { minScore: 1 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:performance": ["warn", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],
        "uses-responsive-images": "warn",
        "uses-optimized-images": "warn",
        "modern-image-formats": "warn",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
