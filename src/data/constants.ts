import { MenuItem } from '../types';

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
