const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const antdLessLoader = require('./antd.config');
const modifyVars = require('./src/theme');

if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {}; // eslint-disable-line
}

module.exports = antdLessLoader({
    distDir: 'dist',
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]'
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars
    },
    webpack: (config, { isServer }) => {
        // 压缩css
        if (config.mode === 'production' && Array.isArray(config.optimization.minimizer)) {
            config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }

        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        };

        config.resolve.alias['@'] = path.join(__dirname, 'src');
        // 按需引入icon
        // config.resolve.alias['@ant-design/icons/lib/dist$'] = path.join(__dirname, 'src/icons.js');

        if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback);
                    } else {
                        callback();
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ];
        }
        return config;
    },
    assetPrefix: './'
});
