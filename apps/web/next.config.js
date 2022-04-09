const withTM = require("next-transpile-modules")([ "@brionmario/ui" ]);

module.exports = withTM({
  reactStrictMode: true
});
