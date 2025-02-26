import { config as baseConfig } from '@hakui/eslint-config/vite';

/** @type {import('eslint').Linter.Config} */
const config = [
  ...baseConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];

export default config;
