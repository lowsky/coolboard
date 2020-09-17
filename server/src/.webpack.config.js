//./config/webpack.functions.js
const nodeExternals = require('webpack-node-externals');

module.exports = {

  externals: [
    "@instana/collector", "@instana/lambda", "@instana/coreƒ",
    nodeExternals()
  ],
};
