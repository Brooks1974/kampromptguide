// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kampromptguide.com',
  redirects: {
    '/prompts': '/',
  },
});
