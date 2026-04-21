/** @type {import('next').NextConfig} */
const fs = require('fs');
const createNextIntlPlugin = require('next-intl/plugin');

// Normalize module path casing via realpathSync.native so webpack
// doesn't create duplicate instances from mixed-case Windows paths.
class NormalizePathCasingPlugin {
  apply(resolver) {
    resolver.hooks.result.tap('NormalizePathCasingPlugin', (result) => {
      if (result && result.path) {
        try {
          result.path = fs.realpathSync.native(result.path);
        } catch (_) {
          // Ignore – path may not exist yet
        }
      }
      return result;
    });
  }
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const repository = process.env.GITHUB_REPOSITORY || '';
const repositoryName = repository.split('/')[1] || '';
const isProjectPages =
  Boolean(process.env.GITHUB_ACTIONS) &&
  Boolean(repositoryName) &&
  !repositoryName.endsWith('.github.io');
const basePath = isProjectPages ? `/${repositoryName}` : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new NormalizePathCasingPlugin(),
    ];
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
