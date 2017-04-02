const { resolve }       = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        entry: {
            'webpack-dev-server/client?http://localhost:8080': 'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server': 'webpack/hot/only-dev-server',
            'main': './main.js',
        },

        output: {
            filename: '[name].js',
            path: resolve(__dirname, 'build/js'),
            // publicPath: 'build',
        },

        resolve: {
            modules: ['./src/js', 'node_modules'],
            extensions: ['.js', '.json'],
            alias: {
                handlebars: 'handlebars/dist/handlebars.min.js'
            }
        },

        context: resolve(__dirname, 'src/js'),

        // devtool: 'inline-source-map',

        devServer: {
            hot: true,
            contentBase: resolve(__dirname, 'src'),
            // publicPath: '/',
            host: '0.0.0.0',
            historyApiFallback: true,
        },

        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    loaders: [
                        'babel-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    query: {
                        // minimize: true
                    }
                }
            ],
        },

        performance: {
            hints: false
        },

        plugins: [
            // new webpack.optimize.UglifyJsPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
    },{
        entry: resolve(__dirname, 'src/css/main.css'),

        output: {
            path: resolve(__dirname, 'build/css'),
            filename: 'main.css'
        },

        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ loader: 'css-loader?importLoaders=1!postcss-loader' }),
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin("[name].css")
        ]
    }
];
