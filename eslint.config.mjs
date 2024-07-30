import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'prefer-const': 'error',
      semi: ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-unused-expressions': 'error',
      'no-unexpected-multiline': 'error'
    }
  }
]