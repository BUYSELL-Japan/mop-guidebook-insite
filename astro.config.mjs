// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mop-insite.com',
  base: '/',
  output: 'static',
  build: {
    format: 'directory',
    assets: '_guidebook_assets'
  },
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      serialize(item) {
        return item;
      },
      customPages: [],
      // Only list guidebook pages. "/" belongs to the map app, /debug/ is internal,
      // and legacy /en/guide/* pages canonicalize to /en/guidebook/*.
      filter: (page) => /^https:\/\/mop-insite\.com\/(en|zh)\/guidebook\//.test(page),
    })
  ]
});
