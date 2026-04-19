/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const repository = process.env.GITHUB_REPOSITORY || '';
const repositoryName = repository.split('/')[1] || '';
const isProjectPages =
  Boolean(process.env.GITHUB_ACTIONS) &&
  Boolean(repositoryName) &&
  !repositoryName.endsWith('.github.io');
const basePath = isProjectPages ? `/${repositoryName}`.toLowerCase() : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);
