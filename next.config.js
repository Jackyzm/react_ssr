const path = require('path');
const antdLessLoader = require('./antd.config');
const modifyVars = require('./public/static/theme');

if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {}; // eslint-disable-line
}

module.exports = antdLessLoader({
    compress: false,
    distDir: 'dist',
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars
    },
    webpack: (config) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        };

        config.resolve.alias['@'] = path.join(__dirname, 'src');

        return config;
    }
});
