export const SITE_ORIGIN = 'https://kampromptguide.com';
export const SITE_NAME = 'Value Matters';
export const GUIDE_NAME = 'KAM prompt guide';
export const ORG_URL = 'https://www.value-matters.net';
export const ORG_LINKEDIN = 'https://www.linkedin.com/in/richardbrooks';
export const OG_IMAGE = `${SITE_ORIGIN}/og.png`;

export function pageUrl(pathname: string): string {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return new URL(path, `${SITE_ORIGIN}/`).href;
}

export const organizationLd = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: ORG_URL,
  sameAs: [ORG_LINKEDIN],
};
