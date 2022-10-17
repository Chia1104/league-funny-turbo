module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "@wanin/base"],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    sourceType: "module",
    requireConfigFile: false,
  },
  parser: "vue-eslint-parser",
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
