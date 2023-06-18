var webpack = require('webpack');
var path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// variables
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    context: sourcePath,
    entry: {
        app: './main.tsx',
    },
    output: {
        path: outPath,
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].js',
        publicPath: '/',
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        mainFields: ['module', 'browser', 'main'],
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
            assets: path.resolve(__dirname, 'src/assets'),
            webSales: path.resolve(__dirname, 'src/app/websales'),
            selfService: path.resolve(__dirname, 'src/app/selfservice'),
            admin: path.resolve(__dirname, 'src/app/admin'),
        },
    },
    module: {
        rules: [
            // Font files
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                loader: 'file-loader',
                include: [/fonts/],

                options: {
                    name: '[hash].[ext]',
                    outputPath: 'css/',
                    publicPath: url => '../css/' + url,
                },
            },

            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: [
                    isProduction && {
                        loader: 'babel-loader',
                        options: { plugins: ['react-hot-loader/babel'] },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ].filter(Boolean),
            },
            // css
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMap: !isProduction,
                            importLoaders: 1,
                            localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import')({ addDependencyTo: webpack }),
                                require('postcss-url')(),
                                require('postcss-cssnext')(),
                                require('postcss-reporter')(),
                                require('postcss-browser-reporter')({
                                    disabled: isProduction,
                                }),
                            ],
                        },
                    },
                ],
            },
            // scss
            {
                test: /\.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMap: !isProduction,
                            importLoaders: 1,
                            localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import')({ addDependencyTo: webpack }),
                                require('postcss-url')(),
                                require('postcss-cssnext')(),
                                require('postcss-reporter')(),
                                require('postcss-browser-reporter')({
                                    disabled: isProduction,
                                }),
                            ],
                        },
                    },
                ],
            },
            // static assets

            { test: /\.(png)$/, use: 'url-loader?limit=10000' },
            { test: /\.(jpg|gif|jpeg)$/, use: 'file-loader' },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10,
                },
            },
        },
        runtimeChunk: true,
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: false,
        }),
        new WebpackCleanupPlugin(),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
            disable: !isProduction,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'assets/index.html',
            title: 'BlooWatch - GitBook Mark',
        }),
        new WebpackMd5Hash()
    ],
    devServer: {
        https: false,
        contentBase: sourcePath,
        hot: true,
        inline: true,
        historyApiFallback: {
            disableDotRule: true,
        },
        stats: 'minimal',
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty',
    },
};
