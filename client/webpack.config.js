const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".json"],
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.ts(x?)$/,
        exclude: ["/node_modules/"],
        use: ["babel-loader", "ts-loader"],
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"],
      },
    ],
  },
};
