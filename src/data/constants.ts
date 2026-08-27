import { MenuItem } from '../types';

/* ── 표기 통일 상수 — 회사명·프로그램명·핵심 수치는 반드시 여기서 가져다 쓴다 ── */

/** 일반(본문·화면) 표기 */
export const COMPANY_NAME = '한국공학대학교 기술지주회사';
/** 법인 공식 표기 — 푸터 카피라이트·공문서 맥락에서만 사용 */
export const COMPANY_NAME_LEGAL = '㈜한국공학대학교기술지주회사';
/** 성장지원 프로그램 공식 표기 (TU-RN UP / TU RN-UP 등 변형 금지) */
export const PROGRAM_TURN_UP = 'TU-RN Up';

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
            { id: 'growth', label: '성장지원(TU-RN Up)' },
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
        label: '지원하기',
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

// TIPS Cooperation Partners
export const TIPS_COOP = [
    "JC VALLEY", "경기테크노파크", "특허법인 이노", "수원대학교 창업지원단", "아이티엘",
    "시흥산업진흥원", "경기과학기술대학교 산학협력단", "한국공학대학교",
    "피앤피인베스트먼트", "코맥스벤처러스", "벤처박스", "하이브워크", "한양대학교에리카 산학협력단"
];

export const INQUIRY_TYPES = ['일반 문의', 'IR 접수', 'TIPS 문의', '기술사업화 문의'] as const;

// Company History Data
export const HISTORY_DATA = [
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
        year: '2014',
        events: [
            { month: '1', title: '한국공학대학교기술지주회사 설립' },
        ]
    }
];
