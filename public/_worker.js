// Live public mirror: content stays on the Site updated by the existing schedule.
// Next export copies this file to out/_worker.js (Cloudflare Pages advanced mode).
const SOURCE = 'https://brain-paper-digest.c19111996.chatgpt.site';
const FORWARD_HEADERS = ['accept', 'accept-language', 'range', 'rsc',
  'next-router-state-tree', 'next-router-prefetch', 'next-router-segment-prefetch',
  'next-url', 'x-vinext-interception-context', 'x-vinext-mounted-slots',
  'x-vinext-rsc-render-mode'];

export default {
  async fetch(request) {
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const incoming = new URL(request.url);
    const target = new URL(SOURCE);
    target.pathname = incoming.pathname;
    target.search = incoming.search;
    const headers = new Headers();
    for (const name of FORWARD_HEADERS) {
      if (request.headers.has(name)) headers.set(name, request.headers.get(name));
    }
    // Never forward visitor cookies, authorization, or request bodies.
    let upstream;
    try {
      upstream = await fetch(target, {
        method: request.method, headers, redirect: 'manual',
        signal: AbortSignal.timeout(20000), cf: { cacheTtl: 0, cacheEverything: false },
      });
    } catch {
      return new Response('简报内容暂时无法加载，请稍后刷新。', {
        status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete('set-cookie');
    responseHeaders.set('X-Neurobrief-Sync', 'live');
    // Prevent stale pages and RSC payloads after scheduled publication.
    responseHeaders.set('Cache-Control', 'no-store');
    responseHeaders.delete('CDN-Cache-Control');
    responseHeaders.delete('Cloudflare-CDN-Cache-Control');
    const location = responseHeaders.get('location');
    if (location) {
      const redirect = new URL(location, target);
      if (redirect.origin === SOURCE) {
        responseHeaders.set('location', incoming.origin + redirect.pathname + redirect.search + redirect.hash);
      }
    }
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
  },
};
