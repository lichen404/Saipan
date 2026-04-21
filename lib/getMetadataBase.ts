function normalizeUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getMetadataBase(): URL {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (explicitUrl) {
    return new URL(normalizeUrl(explicitUrl));
  }

  const repository = process.env.GITHUB_REPOSITORY || '';
  const [owner, repo] = repository.split('/');

  if (owner && repo) {
    if (repo.endsWith('.github.io')) {
      return new URL(`https://${repo}`);
    }

    return new URL(`https://${owner}.github.io`);
  }

  return new URL('https://example.com');
}