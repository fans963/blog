import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  return rss({
    title: 'My Blog',
    description: 'Material Design 3 风格的现代化博客',
    site: context.site ?? 'https://example.com',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>zh-CN</language>`,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
  });
}
