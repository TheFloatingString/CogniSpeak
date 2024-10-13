module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: { inline: true },
    });

    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    };

    return config;
  },
};
