const { defineConfig } = require('cypress');
const assert = require('assert');

module.exports = defineConfig({
  chromeWebSecurity: true,
  projectId: '8p1ybc',
  defaultCommandTimeout: 2000,
  e2e: {
    setupNodeEvents(on, config) {
      // modify config values
      // e.g. config.defaultCommandTimeout = 10000

      const branch = config.env.branch ?? 'missing-branch-env';
      const isMainBranch = 'main' === branch;

      // will be set by cypress.json, or via env: CYPRESS_baseUrl
      const baseUrl = isMainBranch
        ? 'https://www.coolboard.fun'
        : config.baseUrl;

      assert(
        baseUrl.endsWith('localhost:3000') ||
          baseUrl.endsWith('www.coolboard.fun') ||
          (baseUrl.startsWith('https://coolboard-') &&
            baseUrl.endsWith('-lowsky.vercel.app')),
        `Check: Domain or URL should be one of:
            localhost:3000 | www.coolboard.fun | https://coolboard-...-lowsky.vercel.app
         but was: ${baseUrl}`
      );

      config.env.branch = branch;
      config.env.isMainBranch = isMainBranch;
      config.baseUrl = baseUrl;

      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://www.coolboard.fun',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
