module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  root: true,
  extends: ['@wanin/nestjs'],
};
