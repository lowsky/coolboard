import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalWebKitSupport: true,
  projectId: '8p1ybc',
  defaultCommandTimeout: 8000,
  e2e: {
    blockHosts: [
      'eum.instana.com'
    ],
    baseUrl: 'https://www.coolboard.eu',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
