const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve("build/js/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
