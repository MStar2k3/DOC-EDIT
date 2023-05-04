const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ],
    mode: 'development',
    entry: './src/index.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    resolve: {
        fallback: {
        "os": require.resolve("os-browserify/browser")
        }
        }
    },
};
