/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment and set basePath if using GitHub project pages (e.g., username.github.io/repo-name)
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);
