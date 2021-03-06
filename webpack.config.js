const path = require('path');


if (process.env.NODE_ENV === 'development') {
  require('./index.html')
}


// plugins
const webpack = require('webpack'); 
const jqueryPlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'src/images/favicon.png'
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssExtract = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
});


// module exports
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/'
          },
        },
      ],
    },
    {
      test: /.html$/,
      use: ['html-loader']
    }
    
    ],
    
    },

    plugins: [
        CssExtract,
        HtmlPlugin,
        jqueryPlugin
    ]


};