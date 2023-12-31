module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
