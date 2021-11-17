module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export' : "off",
    'no-unused-vars' : 'off',
    'linebreak-style': 0,
    'no-underscore-dangle' : 'off',
    'arrow-parens' : 'off',
    'eqeqeq' : 'off',
    'no-undef' : 'off',
    'dot-notation' : 'off',
    'func-names' : 'off',
  },
};