//Konfiguracja Webpack
var path = require("path");

module.exports = {
  entry: ["./js/app.jsx", "./sass/main.scss"],
  output: { filename: "out.js", path: path.resolve(__dirname, "js") },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  mode: "development", watch: true,
  module: {
    rules: [{
      test: /\.jsx$/, exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: { presets: ["es2015", "stage-2", "react"] }
      }
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: 'fonts',
          outputPath: 'fonts'
        }
      }
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              new require('autoprefixer')({
                browsers: [
                  'ie 11'
                ]
              })
            ]
          }
        },
        'sass-loader']
    },
    {
      test: /\.(jpg|jpeg|gif|png|csv|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: 'images',
          outputPath: 'images'
        }
      }
    }]
  }
}