/** @type {import('next').NextConfig} */
const config = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = config;
