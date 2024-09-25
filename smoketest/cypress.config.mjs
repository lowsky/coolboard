import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalWebKitSupport: true,
  projectId: '8p1ybc',
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: 'https://www.coolboard.fun',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
