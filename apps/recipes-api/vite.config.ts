/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/recipes-api',

  plugins: [nxViteTsPaths()],

  test: {
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./src/test-setup.ts'],
  },
});
