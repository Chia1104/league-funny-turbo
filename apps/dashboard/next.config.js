const withTM = require("next-transpile-modules")(["@wanin/ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
