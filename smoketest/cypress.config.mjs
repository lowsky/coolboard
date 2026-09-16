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
      return clerkSetup({ config });
    },

    blockHosts: ['eum.instana.com'],
    baseUrl: 'https://www.coolboard.eu',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
