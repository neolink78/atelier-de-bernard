// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ik.imagekit.io']
    },
    i18n
};

module.exports = nextConfig;
