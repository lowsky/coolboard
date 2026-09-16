import { clerkSetup } from '@clerk/testing/cypress';

import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 2,
  experimentalWebKitSupport: true,
  projectId: 'epr8fo',
  defaultCommandTimeout: 4000,
  expose: {
    LOGIN: 'skylab@nurfuerspam.de',
    PRODUCTION_LOGIN: 'coolboard+testnew@protonmail.com',
    branch: process.env.CYPRESS_branch,
  },
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        debug: true,
        dotenv: false,
      };

      // set from local process environment, so that it doesn't require
      // extra parameters
      let productionpassword = process.env.PRODUCTION_PASSWORD;
      if(!productionpassword ||productionpassword.trim().length === 0) {
        throw Error("PRODUCTION_PASSWORD not found in environment!")
      }
      config.env.PRODUCTION_PASSWORD = productionpassword

      let password = process.env.PASSWORD;
      if(!password ||password.trim().length === 0) {
        throw Error("PASSWORD not found in environment!")
      }
      config.env.PASSWORD = password

      return clerkSetup({ config, options });
    },

    blockHosts: ['eum.instana.com'],
    baseUrl: 'https://www.coolboard.eu',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
