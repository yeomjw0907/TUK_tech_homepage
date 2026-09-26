import { MenuItem } from '../types';

/* ── 표기 통일 상수 — 회사명·프로그램명·핵심 수치는 반드시 여기서 가져다 쓴다 ── */

/** 일반(본문·화면) 표기 */
export const COMPANY_NAME = '한국공학대학교 기술지주회사';
/** 법인 공식 표기 — 푸터 카피라이트·공문서 맥락에서만 사용 */
export const COMPANY_NAME_LEGAL = '㈜한국공학대학교기술지주회사';
/** 성장지원 프로그램 공식 표기 (TU-RN Up / TU RN-UP 등 변형 금지) */
export const PROGRAM_TURN_UP = 'TU-RN UP';

/**
 * 핵심 성과 수치 — 화면에 노출되는 모든 통계는 이 객체를 단일 기준으로 사용.
 * 자회사/포트폴리오 개수는 가능한 곳에서는 companies 데이터의 filter().length로 산출한다.
 */
export const KEY_STATS = {
    baseDate: '2025년 12월 기준',
    /** FUNDS_DATA 합계 (3+3+30+3+70+4 = 113억) */
    fundTotal: '113억+',
    fundTotalLabel: '총 113억원 규모',
    subsidiaries: '16',
    /** TODO(확인 필요): 기존 코드에 313억/3.13억원이 혼재 — 정확한 값 확정 후 이 한 곳만 수정 */
    cumulativeInvestment: '313억+',
} as const;

/** 헤더·퀵메뉴 등에서 쓰는 외부 사이트 */
export const EXTERNAL_LINKS = {
    incubator: 'https://tukbic.tukorea.ac.kr/',
    tipsOperator: 'https://jointips.or.kr/network/operators/detail?companyId=efef6522-9a20-41b2-b9d5-b55775504940&returnUrl=%2Fnetwork%2Foperators%3Fregion%3D41%26sort%3Dupdated%26dir%3Ddesc',
} as const;

// Menu Structure
export const MENU_STRUCTURE: MenuItem[] = [
    {
        id: 'about',
        label: '회사소개',
        subItems: [
            { id: 'overview', label: '회사 개요' },
            { id: 'ceo', label: 'CEO 인사말' },
            { id: 'history', label: '연혁' },
            { id: 'vision', label: '비전 & 미션' },
            { id: 'org', label: '조직도' },
            { id: 'location', label: '오시는길' },
        ]
    },
    {
        id: 'investment',
        label: '투자',
        subItems: [
            { id: 'fields', label: '투자분야' },
            { id: 'process', label: '투자프로세스' },
            { id: 'growth', label: '성장지원(TU-RN UP 프로그램)' },
            { id: 'tips', label: 'TIPS 프로그램' },
            { id: 'portfolio', label: '투자 포트폴리오' },
            { id: 'apply', label: 'IR 접수' },
        ]
    },
    {
        id: 'subsidiary',
        label: '자회사',
        subItems: [
            { id: 'intro', label: '자회사란?' },
            { id: 'procedure', label: '자회사 설립·편입 절차' },
            { id: 'support', label: '자회사 성장지원' },
            { id: 'exit', label: '자회사 투자회수 현황' },
        ]
    },
    {
        id: 'incubator',
        label: '창업보육',
        href: EXTERNAL_LINKS.incubator,
    },
    {
        id: 'tech-transfer',
        label: '기술이전·사업화',
    },
    {
        id: 'portfolio',
        label: '포트폴리오 기업',
        subItems: [
            { id: 'all_portfolio', label: '전체' },
            { id: 'subsidiaries', label: '자회사' },
            { id: 'investees', label: '투자기업' },
            { id: 'tips_reco', label: 'TIPS 선정기업' },
        ]
    },
    {
        id: 'news',
        label: '회사소식',
        subItems: [
            { id: 'notice', label: '공지사항' },
            { id: 'press', label: '언론보도' },
            { id: 'resources', label: '자료실' },
            { id: 'faq', label: 'Q&A' },
        ]
    },
    {
        id: 'contact',
        label: '문의/신청',
    },
];

// Investment Funds Data
export const FUNDS_DATA = [
    { name: '케이이룸(K-IRUM) 개인투자조합 1호', agency: '중소벤처기업부', size: '3억원', status: '운용중', period: '2018.10.~2028.10.' },
    { name: '케이도움주기 투자조합 1호', agency: '중소벤처기업부', size: '3억원', status: '운용중', period: '2022.05.~2027.05.' },
    { name: '대학창업투자조합', agency: '교육부(한국벤처투자)', size: '30억원', status: '운용중', period: '2022.08.~2032.08.' },
    { name: '케이도움주기 투자조합 2호', agency: '중소벤처기업부', size: '3억원', status: '운용중', period: '2024.01.~2029.01.' },
    { name: '시흥창업펀드', agency: '중소벤처기업부', size: '70억원', status: '운용중', period: '2025.06.~2033.06.' },
    { name: '케이도움주기 투자조합 3호', agency: '중소벤처기업부', size: '4억원', status: '운용중', period: '2025.09.~2033.09.' },
];

// TIPS Cooperation Partners — 클릭 시 각 기관 공식 홈페이지로 이동
/** TIPS KOREA 공식 로고 (jointips.or.kr) */
export const TIPS_LOGO = '/partner-logos/tips-korea.png';

/** TIPS 컨소시엄 기관 — 로고는 각 기관 홈페이지에서 수집 (public/partner-logos) */
export const TIPS_COOP = [
    { name: 'JC VALLEY', logo: '/partner-logos/jcvalley.png', url: 'https://www.jcvalley.co/' },
    { name: '경기테크노파크', logo: '/partner-logos/gtp.png', url: 'https://www.gtp.or.kr/' },
    { name: '특허법인 이노', logo: '/partner-logos/innolaw.png', url: 'http://innolaw.co.kr/' },
    { name: '수원대학교 창업지원단', logo: '/partner-logos/suwon.png', url: 'https://wow.suwon.ac.kr/' },
    { name: '아이티엘', logo: '/partner-logos/itl.png', url: 'http://www.itlist.co.kr/' },
    { name: '시흥산업진흥원', logo: '/partner-logos/sida.png', url: 'https://www.sida.kr/' },
    { name: '경기과학기술대학교 산학협력단', logo: '/partner-logos/gtec.png', url: 'https://www.gtec.ac.kr/iacf/index.do' },
    { name: '한국공학대학교', logo: '/partner-logos/tukorea.svg', url: 'https://www.tukorea.ac.kr/' },
    { name: '피앤피인베스트먼트', logo: '/partner-logos/pnp.png', url: 'http://pnpinvest.co.kr/' },
    { name: '코맥스벤처러스', logo: '/partner-logos/venturus.png', url: 'https://iventurus.com/' },
    { name: '벤처박스', logo: '/partner-logos/venturebox.png', url: 'https://venturebox.co.kr/' },
    { name: '하이브워크', logo: '/partner-logos/hivework.png', url: 'https://hivework.co.kr/' },
    { name: '한양대학교에리카 산학협력단', logo: '/partner-logos/erica.png', url: 'http://ericaresearch.hanyang.ac.kr/' },
] as const;

export const INQUIRY_TYPES = ['일반 문의', 'IR 접수', '자회사 접수', 'TIPS 문의', '기술이전 문의'] as const;

/** 우수기술·맞춤기술 찾기 — 산학협력단 페이지로 새 탭 이동 */
export const TECH_TRANSFER_LINKS = {
    excellentTech: 'https://sac.tukorea.ac.kr/companySupport/techMarket/tech/smk/smkList.hs?sso=ok',
    findTech: 'https://sac.tukorea.ac.kr/companySupport/techMarket/findTech/findTechList.hs?sso=ok',
} as const;

/** IR·자회사 접수 시 첨부파일·개인정보 동의가 필요한 유형 */
export const INQUIRY_APPLICATION_TYPES = ['IR 접수', '자회사 접수'] as const;

export const INQUIRY_NOTICES = {
    'IR 접수': {
        title: 'IR 접수 전 확인사항',
        items: [
            '기술기반 창업기업 또는 예비창업자',
            '차별화된 기술 또는 사업화 가능한 핵심기술 보유',
            '시장성과 성장 가능성을 갖춘 사업모델(BM) 보유',
        ],
    },
    '자회사 접수': {
        title: '자회사 접수 전 확인사항',
        items: [
            '한국공학대학교 보유기술을 활용한 사업화를 추진하고 있거나 희망하는 기업',
            '해당 기술을 기반으로 사업화 가능한 제품·서비스 또는 사업모델(BM)을 보유한 기업',
            '기술지주회사 자회사 편입 및 사업화 협력을 희망하는 기업',
        ],
    },
    '기술이전 문의': {
        title: '기술이전 문의 전 확인사항',
        items: [
            '한국공학대학교 보유기술의 이전 또는 활용을 희망하는 기업',
            '도입을 희망하는 기술 분야 또는 해결하고자 하는 기술적 수요가 있는 기업',
            '이전받은 기술을 제품·서비스 개발 및 사업화에 활용하고자 하는 기업',
        ],
    },
} as const;

export const PRIVACY_CONSENT_NOTICE = {
    title: '개인정보 수집 및 이용 동의',
    body: [
        { label: '수집 항목', text: '이름, 연락처, 이메일, 기업명, 문의내용, 첨부파일' },
        { label: '수집 목적', text: 'IR·자회사 접수 검토, 회신 및 사후 안내' },
        { label: '보유 기간', text: '접수일로부터 3년 (목적 달성 시 지체 없이 파기)' },
        { label: '동의 거부 권리', text: '동의를 거부할 수 있으나, 이 경우 접수 처리가 제한됩니다.' },
    ],
} as const;

// Company History Data
export const HISTORY_DATA: { year: string; events: { month: string; title: string; desc?: string }[] }[] = [
    {
        year: '2025',
        events: [
            { month: '9', title: '케이도움주기 투자조합 3호 결성' },
            { month: '6', title: '시흥창업투자펀드 2호 결성' },
        ]
    },
    {
        year: '2024',
        events: [
            { month: '6', title: '팁스(TIPS) 운영사 선정' },
            { month: '1', title: '케이도움주기 투자조합 2호 결성' },
        ]
    },
    {
        year: '2022',
        events: [
            { month: '8', title: '대학창업투자조합 결성' },
            { month: '5', title: '케이도움주기 투자조합 1호 결성' },
        ]
    },
    {
        year: '2018',
        events: [
            { month: '10', title: '케이이룸개인투자조합 1호 결성' },
        ]
    },
    {
        year: '2013',
        events: [
            { month: '12', title: '한국공학대학교기술지주회사 설립' },
        ]
    }
];

/** 오시는길 — 한국공학대학교 제1캠퍼스(시흥비즈니스센터) 좌표·주소 */
export const CAMPUS_LOCATION = {
    name: '한국공학대학교',
    lat: 37.33996728377462,
    lng: 126.73398077869885,
    level: 3,
    kakaoPlaceId: '11213437',
    wcongnamulX: 441060,
    wcongnamulY: 1066940,
    roadAddress: '[15073] 경기도 시흥시 산기대학로 237 (정왕동) 한국공학대학교',
    jibunAddress: '[15073] 경기도 시흥시 정왕동 2121-1',
    office: '시흥비즈니스센터 7층',
} as const;

/** 오시는길 — 자가용·지하철·버스 안내 */
export const CAMPUS_DIRECTIONS = {
    car: [
        {
            label: '제2경인고속도로',
            route: '신천IC → 남인천톨게이트 → 서창분기점 → 월곶분기점 → 정왕역 → 한국공학대학교',
        },
        {
            label: '제3경인고속도로',
            route: '정왕IC → 정왕톨게이트 → 정왕교차로 → 동원아파트삼거리 → 정왕역 → 한국공학대학교',
        },
        {
            label: '영동고속도로',
            route: '서안산IC → 서안산톨게이트 → 시화산단방면 → 고가도로 → 만해사거리 → 한국공학대학교',
        },
    ],
    subway: {
        line: '4호선, 수인분당선',
        route: '정왕역(한국공학대학교역) 하차 → 1번출구 → 학교셔틀버스',
        time: '약5분',
    },
    bus: [
        {
            type: '일반버스',
            routes: '11-A, 11-B, 20-1, 21, 26, 28, 29, 30, 350, 5602',
            stop: '한국공학대학교, 시흥터미널, 기타정류장하차',
            time: '약10분',
        },
        {
            type: '광역버스',
            routes: '3400(사당/서초/역삼/양재), 5200(신도림)',
            stop: '한국공학대학교, 시흥터미널, 기타정류장하차',
            time: '약5분',
        },
        {
            type: '일반버스',
            routes: '1, 22, 23, 25, 55, 99, 99-2, 123, 125',
            stop: '성담스퀘어앞하차',
            time: '약15분',
        },
        {
            type: '광역버스',
            routes: '3401(석수/광명역), 3402(성남), P6540(판교), P9541(사당)',
            stop: '성담스퀘어앞하차',
            time: '약15분',
        },
        {
            type: '기타',
            routes: '7000(인천국제공항)',
            stop: '성담스퀘어앞하차',
            time: '약15분',
        },
    ],
} as const;
