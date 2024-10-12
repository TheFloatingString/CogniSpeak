module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: { inline: true },
    });
    return config;
  },
};
