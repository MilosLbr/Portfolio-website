const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html'
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssExtract = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  })



module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },

  module: {
    rules: [{
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
        }
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
          },
        },
      ],
    },
    
    ],
    
    },

    plugins: [
        CssExtract,
        HtmlPlugin
    ]


};