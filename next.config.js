const path = require('path');
const withLess = require('@zeit/next-less');

module.exports = withLess({
    cssModules: true,
    webpack: (config) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        };

        config.resolve.alias['@'] = path.join(__dirname);

        return config;
    }
});
