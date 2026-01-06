/// <reference types="vitest" />
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/public',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      prerender: {
        routes: async () => {
          return [
            '/',
            '/about',
            '/blog',
            '/blog/m3-blog-introduction',
            '/blog/microfrontend-architecture',
            '/blog/tailwind-v4-highlights',
            '/blog/typescript-best-practices',
            '/blog/react-19-features',
          ];
        },
        sitemap: {
          host: 'https://blog.example.com',
        },
      },
      ssrBuildDir: './.amplify-hosting/compute/default',
      nitro: {
        preset: 'cloudflare-pages',
        serveStatic: true,
        externals: { inline: ['zone.js/node', '@angular/**'] },
        output: {
          dir: 'dist',
          publicDir: 'dist/public',
        },
        rollupConfig: {
          output: {
            entryFileNames: 'server.mjs',
          },
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
