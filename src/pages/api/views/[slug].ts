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

  // Debug: log environment info
  console.log('[Views API] GET - locals keys:', Object.keys(locals));

  // Try to get count from KV
  try {
    // @ts-ignore - Cloudflare runtime binding
    const cfLocals = locals as Record<string, any>;
    const runtime = cfLocals.runtime;
    console.log('[Views API] runtime:', !!runtime);
    const kv = runtime?.env?.BLOG_VIEWS;
    console.log('[Views API] KV binding:', !!kv);

    if (kv) {
      const stored = await kv.get(`views:${slug}`);
      count = parseInt(stored as string) || 0;
      console.log('[Views API] KV read:', slug, count);
    } else {
      // Development mode fallback - use in-memory store
      count = devViewCounts.get(slug) || 0;
      console.log('[Views API] Dev mode fallback:', slug, count);
    }
  } catch (e) {
    // Demo mode - return random count for display
    console.warn('[Views API] KV error, using demo mode:', e);
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

  console.log('[Views API] POST - locals keys:', Object.keys(locals));

  try {
    // @ts-ignore - Cloudflare runtime binding
    const cfLocals = locals as Record<string, any>;
    const runtime = cfLocals.runtime;
    console.log('[Views API] runtime:', !!runtime);
    const kv = runtime?.env?.BLOG_VIEWS;
    console.log('[Views API] KV binding:', !!kv);

    if (kv) {
      const current = await kv.get(`views:${slug}`);
      count = (parseInt(current as string) || 0) + 1;
      await kv.put(`views:${slug}`, count.toString());
      console.log('[Views API] KV write:', slug, count);
    } else {
      // Development mode fallback - use in-memory store
      const current = devViewCounts.get(slug) || 0;
      count = current + 1;
      devViewCounts.set(slug, count);
      console.log('[Views API] Dev mode fallback write:', slug, count);
    }
  } catch (e) {
    // Demo mode - return random count for display
    console.warn('[Views API] KV error, using demo mode:', e);
    count = Math.floor(Math.random() * 100) + 1;
  }

  return new Response(JSON.stringify({
    slug,
    views: count
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
