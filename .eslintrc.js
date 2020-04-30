module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-console": "warn",
    "react/jsx-indent": [1, 4],
    "comma-dangle": 0,
    "indent": [1, 4],
    "react/jsx-indent-props": [1, 4],
    "react/prop-types": 0,
    "no-unused-expressions": {
      severity: 1,
      "allowShortCircuit": true,
      "allowTernary": true
    }
  },
};
