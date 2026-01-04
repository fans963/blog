import type { APIRoute } from 'astro';

export const prerender = false;

// In-memory store for development mode
const devViewCounts = new Map<string, number>();

export const GET: APIRoute = async ({ params, locals }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let count = 0;

  // Try to get count from KV
  try {
    const { BLOG_VIEWS } = locals.runtime.env;
    if (BLOG_VIEWS) {
      const stored = await BLOG_VIEWS.get(`views:${slug}`);
      count = parseInt(stored as string) || 0;
    } else {
      // Development mode fallback - use in-memory store
      count = devViewCounts.get(slug) || 0;
    }
  } catch (e) {
    // Demo mode - return random count for display
    console.warn('[Views API] KV error:', e);
    count = Math.floor(Math.random() * 50) + 10;
  }

  return new Response(JSON.stringify({
    slug,
    views: count
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ params, locals }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let count = 1;

  try {
    const { BLOG_VIEWS } = locals.runtime.env;
    if (BLOG_VIEWS) {
      const current = await BLOG_VIEWS.get(`views:${slug}`);
      count = (parseInt(current as string) || 0) + 1;
      await BLOG_VIEWS.put(`views:${slug}`, count.toString());
    } else {
      // Development mode fallback - use in-memory store
      const current = devViewCounts.get(slug) || 0;
      count = current + 1;
      devViewCounts.set(slug, count);
    }
  } catch (e) {
    // Demo mode - return random count for display
    console.warn('[Views API] KV error:', e);
    count = Math.floor(Math.random() * 100) + 1;
  }

  return new Response(JSON.stringify({
    slug,
    views: count
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
