/**
 * 페이지별 SEO 메타 정보.
 * 브라우저(useDocumentMeta)와 크롤러용 서버 함수(api/seo.ts)가 함께 사용하므로
 * React·Vite 전용 API(import.meta.env 등)에 의존하지 않는 순수 모듈로 유지한다.
 */

export const SITE_URL = 'https://holdings.tukorea.ac.kr';
export const SITE_NAME = '한국공학대학교 기술지주회사';
export const DEFAULT_IMAGE = `${SITE_URL}/hero_campus.jpg`;
export const DEFAULT_DESCRIPTION =
    '한국공학대학교 기술지주회사는 대학의 우수한 연구성과를 발굴하여 기술이전, 자회사 설립, 투자 연계로 기술사업화를 지원하는 대학 기술지주회사입니다.';

export interface PageMeta {
    title: string;
    description: string;
    url: string;
    image: string;
    type: 'website' | 'article';
    noindex?: boolean;
}

/** 서버·클라이언트가 공통으로 넘길 수 있는 최소 게시글/기업 정보 */
export interface MetaPost {
    title: string;
    category: 'notice' | 'press' | 'resources' | 'faq' | string;
    content?: string | null;
}
export interface MetaCompany {
    name: string;
    category: 'subsidiary' | 'portfolio' | string;
    shortDesc?: string | null;
    business?: string | null;
    bgImage?: string | null;
}

interface StaticEntry { title: string; description: string }

/** 정적 페이지 경로별 제목·설명. 키는 `/page` 또는 `/page/sub`. */
export const STATIC_PAGES: Record<string, StaticEntry> = {
    '/': { title: SITE_NAME, description: DEFAULT_DESCRIPTION },

    '/about': { title: '회사소개', description: '한국공학대학교 기술지주회사의 개요, CEO 인사말, 연혁, 비전과 조직을 소개합니다.' },
    '/about/overview': { title: '회사 개요', description: '대학 연구성과의 사업화를 위해 설립된 한국공학대학교 기술지주회사의 설립 목적과 주요 사업을 소개합니다.' },
    '/about/ceo': { title: 'CEO 인사말', description: '한국공학대학교 기술지주회사 대표이사 인사말입니다. 대학과 사회가 함께 성장하는 기술사업화 선순환 구조를 만들어갑니다.' },
    '/about/history': { title: '연혁', description: '한국공학대학교 기술지주회사의 설립부터 현재까지 주요 연혁을 연도별로 정리했습니다.' },
    '/about/vision': { title: '비전 & 미션', description: '대학 기술을 창업과 투자로 연결하고 혁신기업의 성장을 지원하는 한국공학대학교 기술지주회사의 비전과 미션입니다.' },
    '/about/org': { title: '조직도', description: '기술사업화, 투자, 창업보육 등 전주기 지원을 담당하는 한국공학대학교 기술지주회사의 조직 구성입니다.' },
    '/about/location': { title: '오시는길', description: '한국공학대학교 기술지주회사 위치 안내. 경기도 시흥시 정왕동 한국공학대학교 캠퍼스 내, 자가용·지하철·버스 이용 방법을 안내합니다.' },

    '/investment': { title: '투자', description: '한국공학대학교 기술지주회사의 투자분야, 투자프로세스, 성장지원 프로그램과 TIPS 프로그램을 안내합니다.' },
    '/investment/fields': { title: '투자분야', description: '한국공학대학교 기술지주회사가 집중 투자하는 기술 분야와 투자 대상 기업의 조건을 안내합니다.' },
    '/investment/process': { title: '투자프로세스', description: 'IR 접수부터 심사, 투자 집행, 후속 지원까지 한국공학대학교 기술지주회사의 투자 절차를 단계별로 안내합니다.' },
    '/investment/growth': { title: '성장지원(TU-RN UP 프로그램)', description: '투자기업의 성장을 위한 한국공학대학교 기술지주회사의 TU-RN UP 성장지원 프로그램을 소개합니다.' },
    '/investment/tips': { title: 'TIPS 프로그램', description: '한국공학대학교 기술지주회사 TIPS 운영사 프로그램 안내. 민간투자주도형 기술창업지원 프로그램(TIPS) 추천과 지원 내용을 확인하세요.' },
    '/investment/portfolio': { title: '투자 포트폴리오', description: '한국공학대학교 기술지주회사가 운용 중인 투자조합과 펀드 현황을 소개합니다.' },
    '/investment/apply': { title: 'IR 접수', description: '한국공학대학교 기술지주회사 투자 검토를 위한 IR 자료 접수 안내입니다.' },

    '/subsidiary': { title: '자회사', description: '한국공학대학교 기술지주회사 자회사의 개념, 설립·편입 절차, 성장지원, 투자회수 현황을 안내합니다.' },
    '/subsidiary/intro': { title: '자회사란?', description: '대학 기술지주회사 자회사의 정의와 요건, 교원·학생 창업기업이 자회사로 편입될 때의 장점을 설명합니다.' },
    '/subsidiary/procedure': { title: '자회사 설립·편입 절차', description: '한국공학대학교 기술지주회사 자회사 설립 및 편입 절차와 준비 서류를 단계별로 안내합니다.' },
    '/subsidiary/support': { title: '자회사 성장지원', description: '한국공학대학교 기술지주회사가 자회사에 제공하는 경영, 투자, 기술, 공간 등 성장지원 내용을 소개합니다.' },
    '/subsidiary/exit': { title: '자회사 투자회수 현황', description: '한국공학대학교 기술지주회사 자회사 투자회수(Exit) 현황과 성과를 소개합니다.' },

    '/tech-transfer': { title: '기술이전·사업화', description: '한국공학대학교의 우수 기술을 발굴하고 기술이전, 기술평가, 지식재산 관리를 통해 사업화를 지원합니다.' },

    '/portfolio': { title: '포트폴리오 기업', description: '한국공학대학교 기술지주회사의 자회사와 투자기업, TIPS 선정기업 목록을 소개합니다.' },
    '/portfolio/all_portfolio': { title: '전체 포트폴리오 기업', description: '한국공학대학교 기술지주회사의 전체 자회사·투자기업 목록입니다.' },
    '/portfolio/subsidiaries': { title: '자회사 목록', description: '한국공학대학교 기술지주회사가 설립·편입한 자회사 목록과 주요 사업 내용을 소개합니다.' },
    '/portfolio/investees': { title: '투자기업 목록', description: '한국공학대학교 기술지주회사가 투자한 기업 목록과 주요 사업 내용을 소개합니다.' },
    '/portfolio/tips_reco': { title: 'TIPS 선정기업', description: '한국공학대학교 기술지주회사 추천으로 TIPS 프로그램에 선정된 기업 목록입니다.' },

    '/news': { title: '회사소식', description: '한국공학대학교 기술지주회사의 공지사항, 언론보도, 자료실, Q&A를 확인하세요.' },
    '/news/notice': { title: '공지사항', description: '한국공학대학교 기술지주회사의 공지사항과 모집·행사 안내입니다.' },
    '/news/press': { title: '언론보도', description: '한국공학대학교 기술지주회사와 자회사·투자기업 관련 언론보도 모음입니다.' },
    '/news/resources': { title: '자료실', description: '한국공학대학교 기술지주회사 관련 서식과 안내 자료를 다운로드할 수 있습니다.' },
    '/news/faq': { title: 'Q&A', description: '한국공학대학교 기술지주회사 투자, 자회사, 기술이전 관련 자주 묻는 질문과 답변입니다.' },

    '/admin': { title: '관리자', description: '관리자 전용 페이지입니다.' },

    '/contact': { title: '문의/신청', description: '한국공학대학교 기술지주회사 일반 문의, IR 접수, 자회사 접수, TIPS·기술이전 문의를 접수합니다.' },
};

export const POST_CATEGORY_LABEL: Record<string, string> = {
    notice: '공지사항', press: '언론보도', resources: '자료실', faq: 'Q&A',
};
export const COMPANY_CATEGORY_LABEL: Record<string, string> = {
    subsidiary: '자회사', portfolio: '투자기업',
};

const pageTitle = (title: string) => (title === SITE_NAME ? title : `${title} | ${SITE_NAME}`);

/** HTML 본문을 검색엔진 설명용 평문으로 변환한다. */
export function toPlainText(html: string | null | undefined, maxLength = 160): string {
    if (!html) return '';
    const text = html
        .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<br\s*\/?>|<\/(p|div|li|h[1-6]|tr|td|th|blockquote)>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/\s+/g, ' ')
        .trim();
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

const absoluteUrl = (src: string | null | undefined): string | undefined => {
    if (!src) return undefined;
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith('/')) return `${SITE_URL}${src}`;
    return undefined;
};

/** 대표 이미지로 쓸 수 있는 출처인지 확인한다(자체 도메인·Supabase 스토리지만 허용, 이모지·외부 아이콘 제외). */
const isOwnImage = (url: string): boolean =>
    url.startsWith(`${SITE_URL}/`) || /^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\//i.test(url);

/** 본문에서 대표 이미지로 쓸 첫 이미지의 절대 URL을 찾는다. 없으면 undefined. */
export function firstImageUrl(html: string | null | undefined): string | undefined {
    if (!html) return undefined;
    for (const match of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
        const url = absoluteUrl(match[1]);
        if (url && isOwnImage(url)) return url;
    }
    return undefined;
}

const normalizePath = (pathname: string): string => {
    const parts = pathname.split('/').filter(Boolean);
    return parts.length ? `/${parts.join('/')}` : '/';
};

/** 경로에 맞는 정적 페이지 메타를 반환한다. 미등록 경로는 상위 경로 → 기본값 순으로 대체. */
export function staticMetaFor(pathname: string): PageMeta {
    const parts = pathname.split('/').filter(Boolean);
    const key = parts.length ? `/${parts.slice(0, 2).join('/')}` : '/';
    const entry = STATIC_PAGES[key] ?? (parts.length ? STATIC_PAGES[`/${parts[0]}`] : undefined) ?? STATIC_PAGES['/'];
    return {
        title: pageTitle(entry.title),
        description: entry.description,
        url: `${SITE_URL}${normalizePath(pathname)}`,
        image: DEFAULT_IMAGE,
        type: 'website',
        noindex: parts[0] === 'admin',
    };
}

export function postMeta(post: MetaPost, pathname: string): PageMeta {
    const label = POST_CATEGORY_LABEL[post.category] ?? '회사소식';
    const summary = toPlainText(post.content);
    return {
        title: pageTitle(`${post.title} | ${label}`),
        description: summary || `${SITE_NAME} ${label} - ${post.title}`,
        url: `${SITE_URL}${normalizePath(pathname)}`,
        image: firstImageUrl(post.content) ?? DEFAULT_IMAGE,
        type: 'article',
    };
}

export function companyMeta(company: MetaCompany, pathname: string): PageMeta {
    const label = COMPANY_CATEGORY_LABEL[company.category] ?? '포트폴리오 기업';
    const summary = toPlainText(company.shortDesc || company.business);
    return {
        title: pageTitle(`${company.name} | ${label}`),
        description: summary ? `${company.name} - ${summary}` : `${SITE_NAME} ${label} ${company.name}을(를) 소개합니다.`,
        url: `${SITE_URL}${normalizePath(pathname)}`,
        image: absoluteUrl(company.bgImage) ?? DEFAULT_IMAGE,
        type: 'website',
    };
}

/** 경로만으로 판단 가능한 동적 라우트 정보 */
export function parseDynamicRoute(pathname: string): { kind: 'post'; id: number } | { kind: 'company'; id: string } | null {
    const parts = pathname.split('/').filter(Boolean).map(p => { try { return decodeURIComponent(p); } catch { return p; } });
    if (parts[0] === 'post' && parts[1]) {
        const id = Number.parseInt(parts[1], 10);
        return Number.isFinite(id) ? { kind: 'post', id } : null;
    }
    if (parts[0] === 'company' && parts[1]) return { kind: 'company', id: parts[1] };
    return null;
}

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** 빌드된 index.html의 기본 메타 태그를 페이지별 값으로 치환한다(서버 크롤러 응답용). */
export function applyMetaToHtml(html: string, meta: PageMeta): string {
    let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`);
    const pairs: Array<[RegExp, string]> = [
        [/(<meta name="description" )content="[^"]*"/i, meta.description],
        [/(<meta property="og:title" )content="[^"]*"/i, meta.title],
        [/(<meta property="og:description" )content="[^"]*"/i, meta.description],
        [/(<meta property="og:url" )content="[^"]*"/i, meta.url],
        [/(<meta property="og:image" )content="[^"]*"/i, meta.image],
        [/(<meta property="og:type" )content="[^"]*"/i, meta.type],
        [/(<meta name="twitter:title" )content="[^"]*"/i, meta.title],
        [/(<meta name="twitter:description" )content="[^"]*"/i, meta.description],
        [/(<meta name="twitter:image" )content="[^"]*"/i, meta.image],
    ];
    for (const [re, value] of pairs) {
        out = out.replace(re, (_m, pre: string) => `${pre}content="${escapeAttr(value)}"`);
    }
    out = out.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${escapeAttr(meta.url)}"`);
    if (meta.noindex) {
        out = out.replace(/<\/head>/i, '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
    }
    return out;
}
