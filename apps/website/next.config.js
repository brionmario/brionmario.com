const withTM = require("next-transpile-modules")([ "@brionmario/ui" ]);

module.exports = withTM({
  reactStrictMode: true,
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === "true"
        ? { source: "/((?!coming-soon)(?!_next)(?!static)(?!assets).*)", destination: "/coming-soon", permanent: false }
        : null
    ].filter(Boolean);
  }
});
