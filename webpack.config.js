var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, './public')
var APP_DIR = path.resolve(__dirname, './src')

var config = {
  entry: [
    'babel-polyfill',
    './src/index.js',
    'bootstrap-loader?bootstrapPath=./node_modules/bootstrap-sass/assets/stylesheets/' +
        '_bootstrap.scss'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    public: '0.0.0.0:3020'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: APP_DIR
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.jpg$/,
        loader: "file-loader"
      }, {
        test: /\.(woff2|woff|ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000&name=./fonts/[hash].[ext]'
      }, {
        test: /\.(svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000&name=./imgs/[hash].[ext]'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new webpack.HotModuleReplacementPlugin({multiStep:false}),
    //   new webpack.DefinePlugin({ // <-- key to reducing React's size
    // 'process.env': {     'NODE_ENV': JSON.stringify('production')   } }), new
    // webpack.optimize.UglifyJsPlugin(), //minify everything new
    // webpack.optimize.AggressiveMergingPlugin()//Merge chunks

  ]
}

module.exports = config