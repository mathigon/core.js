module.exports = {
  root: true,
  ignorePatterns: ['node_modules/**', '**/*.js', '**/*.d.ts'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'never'],
    'brace-style': 'error',
    'camelcase': ['error', {'properties': 'never'}],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'consistent-return': 'off',
    'curly': ['error', 'multi-line'],
    'eol-last': 'error',
    'eqeqeq': ['error', 'smart'],
    'func-call-spacing': 'error',
    'func-style': ['error', 'declaration', {'allowArrowFunctions': true}],
    'generator-star-spacing': ['error', 'after'],
    'guard-for-in': 'error',
    'indent': ['error', 2],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': 'error',
    'new-cap': 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-multi-assign': 'off',
    'no-multi-spaces': ['error', {'ignoreEOLComments': true}],
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['warn', {'max': 2, 'maxEOF': 0, 'maxBOF': 0}],
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'no-tabs': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-useless-concat': 'error',
    'no-constant-condition': ['error', {checkLoops: false}],
    'no-var': 'error',
    'object-curly-newline': 'off',
    'object-curly-spacing': ['error', 'never'],
    'object-shorthand': ['error', 'always', {'avoidQuotes': true}],
    'one-var': ['error', {'var': 'never', 'let': 'never', 'const': 'never'}],
    'operator-linebreak': ['error', 'after'],
    'prefer-const': ['error', {'destructuring': 'all'}],
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'rest-spread-spacing': 'error',
    'semi': 'error',
    'semi-spacing': 'error',
    'sort-imports': ['error', {'ignoreCase': true, 'ignoreDeclarationSort': true}],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {'asyncArrow': 'always', 'anonymous': 'never', 'named': 'never'}],
    'spaced-comment': ['error', 'always'],
    'switch-colon-spacing': 'error',
    'yield-star-spacing': ['error', 'after'],
    '@typescript-eslint/no-unused-vars': ['warn', {'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_'}],
    '@typescript-eslint/array-type': ['error', {'default': 'array-simple'}],
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
