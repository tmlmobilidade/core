/* * */

import { next } from '@carrismetropolitana/eslint'

/* * */

export default [
  ...next,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'scripts/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
]
