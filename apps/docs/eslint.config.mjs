/* * */

import { next } from '@carrismetropolitana/eslint'

/* * */

export default [
  ...next,
  {
    files: ['source.config.ts', 'src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['.source/**/*'],
  },
]
