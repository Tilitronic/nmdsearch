/* eslint-disable linebreak-style */
// npm install --save-dev eslint-plugin-jest
// .\node_modules\.bin\eslint src\** --fix

/* eslint-env node */
module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest', '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 0,
    'indent': ['error', 2],
    // 'linebreak-style': [
    //   'error',
    //   'windows'
    // ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/prop-types': 0,
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect'
    }
  }
};