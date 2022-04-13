const withFonts = require('next-fonts');

const prodConfig = {
    target: 'serverless',
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = withFonts(prodConfig);
