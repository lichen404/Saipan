const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function getAssetPath(path: string): string {
  if (!path) {
    return basePath;
  }

  return path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`;
}
