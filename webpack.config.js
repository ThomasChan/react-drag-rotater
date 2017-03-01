
const webpack = require('atool-build/lib/webpack');

module.exports = function(config) {
  config.plugins.push(
    new webpack.NoErrorsPlugin()
  );
  return config;
}
