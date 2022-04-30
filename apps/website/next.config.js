const withTM = require("next-transpile-modules")([ "@brionmario/ui" ]);

module.exports = withTM({
  reactStrictMode: true
});

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {

    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve("react")
        .replace("index.js", "")
    };

    return config;
  }
};

