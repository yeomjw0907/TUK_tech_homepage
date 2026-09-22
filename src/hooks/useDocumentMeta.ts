import { useEffect } from 'react';
import type { PageMeta } from '../seo/meta';

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const removeMeta = (attr: 'name' | 'property', key: string) => {
    document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
};

/**
 * 라우트가 바뀔 때 document.title 과 description·Open Graph·canonical 태그를 갱신한다.
 * 자바스크립트를 실행하지 않는 크롤러는 api/seo.ts 가 같은 값을 서버에서 넣어준다.
 */
export function useDocumentMeta(meta: PageMeta) {
    useEffect(() => {
        document.title = meta.title;
        upsertMeta('name', 'description', meta.description);
        upsertMeta('property', 'og:title', meta.title);
        upsertMeta('property', 'og:description', meta.description);
        upsertMeta('property', 'og:url', meta.url);
        upsertMeta('property', 'og:image', meta.image);
        upsertMeta('property', 'og:type', meta.type);
        upsertMeta('name', 'twitter:title', meta.title);
        upsertMeta('name', 'twitter:description', meta.description);
        upsertMeta('name', 'twitter:image', meta.image);

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = meta.url;

        if (meta.noindex) upsertMeta('name', 'robots', 'noindex, nofollow');
        else removeMeta('name', 'robots');
    }, [meta.title, meta.description, meta.url, meta.image, meta.type, meta.noindex]);
}
