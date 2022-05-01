const withTM = require("next-transpile-modules")([ "@brionmario/ui" ]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {

    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve("react")
        .replace("index.js", "")
    };

    return config;
  }
});
