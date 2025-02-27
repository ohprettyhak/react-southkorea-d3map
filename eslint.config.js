import { config as baseConfig } from '@hakui/eslint-config/vite';

/** @type {import('eslint').Linter.Config} */
const config = [
  ...baseConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json'],
        },
        node: {
          project: ['tsconfig.json'],
        },
      },
    },
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: ['geojson', 'topojson-specification'],
        },
      ],
    },
  },
];

export default config;
