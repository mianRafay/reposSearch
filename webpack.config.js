const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const sourcePath = path.join(__dirname, './src');
    const outPath = path.join(__dirname, './dist');

    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'assets/index.html',
            title: 'BlooWatch - GitBook Mark',
        }),
        new CleanWebpackPlugin(),
    ];

    return {
        context: sourcePath,
        entry: {
            app: './main.tsx',
        },
        output: {
            path: outPath,
            filename: '[name].[contenthash].js', // Use [name] placeholder to generate unique filenames for each entry point
            chunkFilename: '[name].[contenthash].js', // Use [name] placeholder to generate unique filenames for each chunk
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
                    type: 'asset/resource',
                    generator: {
                        filename: 'css/[hash][ext][query]',
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
                            options: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                modules: {
                                    localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('postcss-import'),
                                        require('postcss-url'),
                                        require('postcss-cssnext'),
                                        require('postcss-reporter'),
                                        require('postcss-browser-reporter')({
                                            disabled: isProduction,
                                        }),
                                    ],
                                },
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
                            options: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                modules: {
                                    localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                                },
                            },
                        },
                        'sass-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('postcss-import'),
                                        require('postcss-url'),
                                        require('postcss-cssnext'),
                                        require('postcss-reporter'),
                                        require('postcss-browser-reporter')({
                                            disabled: isProduction,
                                        }),
                                    ],
                                },
                            },
                        },
                    ],
                },
                // static assets
                { test: /\.(png|jpg|jpeg)$/, type: 'asset/resource' },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.gif$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'images/', // Output directory for the images
                                publicPath: '/images/', // Public URL path for the images
                            },
                        },
                    ]
                }
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                },
            },
        },
        plugins,
        devServer: {
            https: false,
            hot: true,
            historyApiFallback: {
                disableDotRule: true,
            }
        },
        node: {
            __dirname: false,
            __filename: false,
            global: false,
        },
    };
};
