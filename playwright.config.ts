import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalTimeout: 180 * 1000,
  /* Test timeout */
  timeout: 45 * 1000,
  /* Expect timeout */
  expect: {
    timeout: 5 * 1000,
  },

  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['list']] : 'list',
  /* Stop after first fail */
  maxFailures: undefined, // process.env.CI ? 1 : undefined,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //Timeout of any action
    actionTimeout: 10000,
    // Base URL to use in actions like `await page.goto('/')`
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'web-client',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--exclude-switches=enable-automation',
            '--disable-gpu',
          ],
        },
      },
    },
  ],
});
