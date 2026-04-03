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
      filter: (page) => true,
    })
  ]
});
