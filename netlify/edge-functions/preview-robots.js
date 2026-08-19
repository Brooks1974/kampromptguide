export default async (request, context) => {
  const url = new URL(request.url);
  if (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt') {
    return;
  }

  const response = await context.next();
  if (!url.hostname.endsWith('netlify.app')) return response;

  try {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  } catch {
    // Immutable headers: leave the origin response as-is.
  }
  return response;
};

export const config = { path: '/*' };
