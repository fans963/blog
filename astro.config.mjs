// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import angular from '@analogjs/astro-angular';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://fans963blog.asia',
  integrations: [
    mdx(), 
    sitemap(), 
    angular({
      vite: {
        inlineStylesExtension: 'scss|sass',
        transformFilter: (_code, id) => {
          // Only transform Angular TypeScript files in components directory
          return id.includes('src/components/angular');
        },
      },
    })
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // 继续使用 sharp
      config: {
        imageService: 'compile', // 强制在构建时预处理图片
      }
    }
  },
  vite: {
    ssr: {
      // Transform Angular packages during SSR
      noExternal: ['@angular/**', '@analogjs/**'],
    },
  },

  adapter: cloudflare({ imageService: 'compile' }),
});