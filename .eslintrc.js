module.exports = {
  "parser": "babel-eslint",
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
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true,
      }],
    "react/jsx-indent": [1, 2],
    "comma-dangle": 0,
    "indent": [1, 2],
    "react/jsx-indent-props": [1, 2],
    "react/prop-types": 0,
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
    }],
    "no-unused-vars": ["warn", { "ignoreRestSiblings": true }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "react/jsx-props-no-spreading": ["error", {
      "custom": "ignore"
    }]
  },
};
