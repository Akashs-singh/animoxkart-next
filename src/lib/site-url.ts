export const DEFAULT_SITE_URL = 'https://animoxkart.in';

function normalizeSiteUrl(value?: string | null): string {
  const trimmed = value?.trim();

  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return DEFAULT_SITE_URL;
  }

  return trimmed.replace(/\/+$/, '');
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getAbsoluteUrl(path = ''): string {
  const baseUrl = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return path ? `${baseUrl}${normalizedPath}` : baseUrl;
}

// Made with Bob
