var webpack = require('webpack');

var config = {
  entry: {
    'index': "./index.js",
    vendor: ['jquery']
  },
  output: {
    //publicPath: './static/js',
    path: './assets/js',
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  devServer: {
    inline: true,
    port: 4013,
    hot: true
  },
  externals: {
    //'react':'React',
    //'react-dom':'ReactDOM',
    //'jquery':"$",
    // 'iscroll':'IScroll'
  },

  plugins: [
    /*new webpack.optimize.CommonsChunkPlugin({
       name:"vendor",  
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {

    loaders: [{
      test: /\.js|\.es6$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      loaders: ['vue-loader']
    }, {
      test: /\.(css)$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
      loader: 'file'
    }]
  },

}

module.exports = config;