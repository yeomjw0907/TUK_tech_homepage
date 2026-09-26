import type { IncomingMessage, ServerResponse } from 'http';
import { SITE_URL, STATIC_PAGES } from './_lib/seoMeta.js';

/**
 * 동적 sitemap.xml — 정적 페이지 + Supabase 의 게시글/기업 상세 URL 을 매번 생성한다.
 * vercel.json 에서 /sitemap.xml → /api/sitemap 으로 rewrite 된다.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://akccdgjddyhhlpwcqate.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
    || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY2NkZ2pkZHloaGxwd2NxYXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NzA5NzYsImV4cCI6MjEwNDM0Njk3Nn0.ZQYQXZOjiaB1sMl4Uj4U5yDva0rZ3lA9pIlmWJvoztA';

interface UrlEntry { loc: string; lastmod?: string; changefreq: string; priority: string }

const fetchRows = async <T>(table: string, query: string): Promise<T[]> => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`${table} fetch failed: ${res.status}`);
    return (await res.json()) as T[];
};

/** '2026.09.23' / '2026-09-23' → '2026-09-23', 그 외는 undefined */
const toIsoDate = (value: string | null | undefined): string | undefined => {
    const m = value?.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
    if (!m) return undefined;
    return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
};

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const staticEntries = (): UrlEntry[] =>
    Object.keys(STATIC_PAGES)
        .filter(path => path !== '/admin')
        .map(path => ({
            loc: `${SITE_URL}${path === '/' ? '/' : path}`,
            changefreq: 'weekly',
            priority: path === '/' ? '1.0' : path.split('/').length <= 2 ? '0.8' : '0.6',
        }));

const dynamicEntries = async (): Promise<UrlEntry[]> => {
    const [posts, companies] = await Promise.all([
        fetchRows<{ id: number; date: string | null }>('posts', 'select=id,date&order=id.desc&limit=1000'),
        fetchRows<{ id: string }>('companies', 'select=id&order=sort_order.asc&limit=1000'),
    ]);
    return [
        ...posts.map(p => ({ loc: `${SITE_URL}/post/${p.id}`, lastmod: toIsoDate(p.date), changefreq: 'monthly', priority: '0.5' })),
        ...companies.map(c => ({ loc: `${SITE_URL}/company/${encodeURIComponent(c.id)}`, changefreq: 'monthly', priority: '0.5' })),
    ];
};

const renderXml = (entries: UrlEntry[]): string => {
    const body = entries.map(e => [
        '  <url>',
        `    <loc>${escapeXml(e.loc)}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        '  </url>',
    ].filter(Boolean).join('\n')).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
};

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
    let entries = staticEntries();
    let status = 200;
    try {
        entries = [...entries, ...(await dynamicEntries())];
    } catch (error) {
        // DB 조회 실패 시에도 정적 페이지만으로 사이트맵을 제공한다.
        console.error('[sitemap] dynamic entries failed', error instanceof Error ? error.message : error);
        res.setHeader('X-Sitemap-Partial', 'true');
    }
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.end(renderXml(entries));
}
