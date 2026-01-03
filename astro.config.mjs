// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://fans963blog.asia',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});