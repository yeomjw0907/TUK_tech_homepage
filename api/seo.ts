import type { IncomingMessage, ServerResponse } from 'http';
import {
    applyMetaToHtml, staticMetaFor, postMeta, companyMeta, parseDynamicRoute,
    type PageMeta, type MetaPost, type MetaCompany,
} from './_lib/seoMeta';

/**
 * 검색엔진·메신저 크롤러(네이버 Yeti, 구글봇, 카카오톡 등)에게 페이지별 메타 태그가 채워진
 * index.html 을 돌려준다. vercel.json 의 User-Agent 조건 rewrite 로만 진입하며,
 * 일반 사용자는 기존처럼 정적 index.html 을 받아 클라이언트(useDocumentMeta)가 태그를 갱신한다.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://akccdgjddyhhlpwcqate.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
    || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrY2NkZ2pkZHloaGxwd2NxYXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NzA5NzYsImV4cCI6MjEwNDM0Njk3Nn0.ZQYQXZOjiaB1sMl4Uj4U5yDva0rZ3lA9pIlmWJvoztA';

let cachedHtml: { value: string; fetchedAt: number } | null = null;
const HTML_TTL_MS = 5 * 60 * 1000;

const originOf = (req: IncomingMessage): string => {
    const host = (req.headers['x-forwarded-host'] as string | undefined) || req.headers.host || 'holdings.tukorea.ac.kr';
    const proto = (req.headers['x-forwarded-proto'] as string | undefined) || 'https';
    return `${proto}://${host.split(',')[0].trim()}`;
};

/** 빌드된 index.html(해시된 스크립트 경로 포함)을 배포본에서 가져온다. */
const loadIndexHtml = async (origin: string): Promise<string> => {
    if (cachedHtml && Date.now() - cachedHtml.fetchedAt < HTML_TTL_MS) return cachedHtml.value;
    const res = await fetch(`${origin}/index.html`, { headers: { 'user-agent': 'tuk-holdings-seo-renderer' } });
    if (!res.ok) throw new Error(`index.html fetch failed: ${res.status}`);
    const value = await res.text();
    cachedHtml = { value, fetchedAt: Date.now() };
    return value;
};

const supabaseSelect = async <T>(table: string, query: string): Promise<T | null> => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}&limit=1`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as T[];
    return rows[0] ?? null;
};

type PostRow = { title: string; category: string; content: string | null };
type CompanyRow = { name: string; category: string; short_desc: string | null; business: string | null; bg_image: string | null };

const resolveMeta = async (pathname: string): Promise<PageMeta> => {
    const dynamic = parseDynamicRoute(pathname);
    try {
        if (dynamic?.kind === 'post') {
            const row = await supabaseSelect<PostRow>('posts', `select=title,category,content&id=eq.${dynamic.id}`);
            if (row) {
                const post: MetaPost = { title: row.title, category: row.category, content: row.content };
                return postMeta(post, pathname);
            }
        } else if (dynamic?.kind === 'company') {
            const row = await supabaseSelect<CompanyRow>('companies', `select=name,category,short_desc,business,bg_image&id=eq.${encodeURIComponent(dynamic.id)}`);
            if (row) {
                const company: MetaCompany = { name: row.name, category: row.category, shortDesc: row.short_desc, business: row.business, bgImage: row.bg_image };
                return companyMeta(company, pathname);
            }
        }
    } catch (error) {
        console.error('[seo] data lookup failed', error instanceof Error ? error.message : error);
    }
    return staticMetaFor(pathname);
};

const requestedPath = (req: IncomingMessage): string => {
    const url = new URL(req.url || '/', 'http://localhost');
    const fromQuery = url.searchParams.get('path');
    if (fromQuery !== null) return fromQuery.startsWith('/') ? fromQuery : `/${fromQuery}`;
    return url.pathname.replace(/^\/api\/seo\/?/, '/');
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    const pathname = requestedPath(req);
    const origin = originOf(req);

    try {
        const [html, meta] = await Promise.all([loadIndexHtml(origin), resolveMeta(pathname)]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
        res.setHeader('X-SEO-Render', 'server');
        res.end(applyMetaToHtml(html, meta));
    } catch (error) {
        console.error('[seo] render failed', error instanceof Error ? error.message : error);
        // 실패 시 정적 index.html 로 넘겨서 페이지 자체는 항상 뜨게 한다.
        res.statusCode = 307;
        res.setHeader('Location', `${origin}/index.html`);
        res.end();
    }
}
