module.exports = {
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  root: true,
  ignorePatterns: [".eslintrc.js"],
  extends: ["@wanin/nestjs"],
};
