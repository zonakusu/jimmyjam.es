const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =
    [{
        entry: [
            './main.js',
        ],

        output: {
            filename: 'main.js',
            path: './docs/js',
            publicPath: '/',
        },

        resolve: {
            modules: ['./src/js', 'node_modules'],
            extensions: ['.js', '.json']
        },

        context: resolve(__dirname, 'src/js'),

        devtool: "source-map",

        // Todo: For dist version, create ES6 and ES5 version
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
                        minimize: true
                    }
                }
            ],
        },

        node: {
            console: true,
            fs: 'empty'
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
        ]
    },{
        entry: resolve(__dirname, 'src/css/main.css'),

        output: {
            path: resolve(__dirname, 'docs/css'),
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
