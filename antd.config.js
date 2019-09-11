

const cssLoaderConfig = require('@zeit/next-css/css-loader-config');

module.exports = (nextConfig = {}) => Object.assign({}, nextConfig, {
    webpack(config, options) {
        const { dev, isServer } = options;
        const {
            cssModules,
            cssLoaderOptions,
            postcssLoaderOptions,
            lessLoaderOptions = {}
        } = nextConfig;

        options.defaultLoaders.less = cssLoaderConfig(config, {
            extensions: ['less'],
            cssModules,
            cssLoaderOptions,
            postcssLoaderOptions,
            dev,
            isServer,
            loaders: [
                {
                    loader: 'less-loader',
                    options: lessLoaderOptions
                }
            ]
        });

        config.module.rules.push({
            test: /\.less$/,
            exclude: /node_modules/,
            use: options.defaultLoaders.less
        });

        // disable antd css module
        config.module.rules.push({
            test: /\.less$/,
            include: /node_modules/,
            use: cssLoaderConfig(config, {
                extensions: ['less'],
                cssModules: false,
                cssLoaderOptions: {},
                dev,
                isServer,
                loaders: [
                    {
                        loader: 'less-loader',
                        options: lessLoaderOptions
                    }
                ]
            })
        });

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    }
});
