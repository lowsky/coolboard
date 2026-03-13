import { clerkSetup } from '@clerk/testing/cypress';

import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalWebKitSupport: true,
  projectId: '8p1ybc',
  defaultCommandTimeout: 8000,
  // https://docs.cypress.io/app/references/experiments#Experimental-Fast-Visibility
  experimentalFastVisibility: true,
  expose: {
    "LOGIN": "skylab@nurfuerspam.de",
    "PRODUCTION_LOGIN": "coolboard+testnew@protonmail.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({ config });
    },

    blockHosts: [
      'eum.instana.com'
    ],
    baseUrl: 'https://www.coolboard.eu',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
