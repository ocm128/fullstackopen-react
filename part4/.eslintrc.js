module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
    'es2021': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    /*"plugin:react/recommended"*/
  ],
  'overrides': [
    {
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  /* "plugins": [
    "react"
  ], */
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0

  }
}
