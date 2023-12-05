import { defineConfig, devices } from '@playwright/experimental-ct-react';
import { nxE2EPreset } from '@nx/playwright/preset';

const nxConfig = nxE2EPreset(__filename, { testDir: '.' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxConfig,
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
  ],
  testMatch: '**/*.pw.tsx',
  timeout: 10_000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
});
