const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: true,
  projectId: '8p1ybc',
  defaultCommandTimeout: 2000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      console.log(config); // see everything in here!

      // modify config values
      //config.defaultCommandTimeout = 10000
      //config.baseUrl = 'https://staging.acme.com'

      // modify env var value
      config.env.ENVIRONMENT = 'staging';

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
