import { prompts } from '../data/prompts';
import { pageUrl } from '../lib/site';

export async function GET() {
  const paths = ['/', '/how', ...prompts.map((prompt) => `/prompts/${prompt.slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => `  <url><loc>${pageUrl(path)}</loc></url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
