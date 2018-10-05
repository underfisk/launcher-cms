const ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path')

module.exports = {

    watch: true,

    target: 'electron-renderer',

    entry: './app/src/index.js',

    output: {
        path: __dirname + '/app/dist/',
        //publicPath: 'app/dist/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //exclude: "/node_modules/", in dev we need it
                loader: 'babel-loader',
                options: {
                    presets: ['react'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                  loader: 'css-loader',
                  options: {
                    modules: false
                  }
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        })
    ],

    resolve: {
      extensions: ['.js', '.json', '.jsx']
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }

}
