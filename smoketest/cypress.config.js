const { defineConfig } = require('cypress');
const assert = require('assert');

module.exports = defineConfig({
  experimentalWebKitSupport: true,
  chromeWebSecurity: true,
  projectId: '8p1ybc',
  defaultCommandTimeout: 2000,
  e2e: {
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
