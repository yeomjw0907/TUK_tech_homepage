import { Company, Post, Inquiry, Popup } from '../types';

// Mock Data Generation Helper
const CEO_NAMES = ['김영호', '이정민', '박서준', '최유진', '강민재', '윤지원', '정하늘', '한도윤', '오세진', '송민규', '신예린', '임태현', '조은비', '유재석', '권지수', '노현우'];
const BUSINESSES = [
    'AI 기반 의료영상 분석 솔루션 개발',
    '스마트 팩토리 자동화 시스템',
    '친환경 에너지 저장 장치 제조',
    '바이오 신약 연구개발',
    '클라우드 기반 ERP 서비스',
    '자율주행 센서 기술 개발',
    '블록체인 금융 서비스 플랫폼',
    '디지털 트윈 시뮬레이션 소프트웨어',
    'IoT 스마트홈 솔루션',
    '빅데이터 분석 컨설팅',
    '반도체 검사 장비 개발',
    '헬스케어 웨어러블 디바이스',
    '신재생에너지 발전 시스템',
    '산업용 로봇 제어 시스템',
    '메타버스 콘텐츠 플랫폼',
    '전기차 배터리 관리 시스템'
];
const SHORT_DESCS = [
    '혁신적인 기술로 미래를 선도합니다',
    '글로벌 시장을 목표로 도전합니다',
    '지속가능한 성장을 추구합니다',
    '기술과 사람을 연결합니다',
    '산업의 디지털 전환을 이끕니다'
];

export const createCompany = (name: string, isTips = false, category: 'subsidiary' | 'portfolio' = 'portfolio'): Company => {
    const year = 2018 + Math.floor(Math.random() * 7);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const nameHash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const companyId = name.replace(/\s/g, '-').replace(/[()*]/g, '');
    const logoKey = companyId.replace(/㈜/g, '').replace(/^주/, '').replace(/\*/g, '');

    return {
        id: companyId,
        name: name.replace('*', ''),
        ceo: CEO_NAMES[nameHash % CEO_NAMES.length],
        foundedDate: `${year}-${month}-${day}`,
        business: BUSINESSES[nameHash % BUSINESSES.length],
        room: `P동 ${300 + (nameHash % 20)}호`,
        moveInDate: `202${3 + (nameHash % 2)}-0${1 + (nameHash % 9)}-01`,
        homepage: 'https://www.tukorea.ac.kr',
        note: '-',
        isTips: name.includes('*') || isTips,
        category,
        logo: `/company-logos/${logoKey}`,
        bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        shortDesc: SHORT_DESCS[nameHash % SHORT_DESCS.length]
    };
};


const RAW_SUBSIDIARIES = [
    "(주)링크솔루션", "㈜이노테크", "㈜더웨이", "㈜제이케이테크놀로지",
    "(주)비타민상상력", "이트렌코텍", "㈜에이치엠오", "㈜퓨처리스텍",
    "㈜비오에스", "㈜이소프트", "㈜이코모스", "㈜제노", "㈜티케이",
    "㈜스태커스", "㈜케이제이테크", "㈜에스비에너지"
];

const RAW_PORTFOLIO = [
    "(주)링크솔루션", "엘포톤*", "기억*", "와첸", "네이앤컴퍼니", "유쾌한프로젝트",
    "메디앤리서치", "이안나노텍", "셀바크이노베이션*", "이트렌코텍*", "쉘피아",
    "㈜제이케이테크놀로지*", "스카일리*", "퀀텀매트릭스*", "액티부키", "큐티뮨바이오*",
    "어플라이드서멀", "크림", "에버트레져", "프로미엘*", "엘엠케이"
];

export const INITIAL_COMPANIES: Company[] = [
    ...RAW_SUBSIDIARIES.map(name => createCompany(name, false, 'subsidiary')),
    ...RAW_PORTFOLIO.map(name => createCompany(name, false, 'portfolio'))
].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

export const INITIAL_POSTS: Post[] = [
    {
        id: 4,
        category: 'press',
        title: '한국공학대 기술지주회사, 시흥창업펀드 70억 조성',
        date: '2025.01.20',
        isNew: false,
        views: 154,
        author: '관리자',
        content: `한국공학대학교 기술지주회사가 시흥산업진흥원과 함께 시흥창업펀드를 조성했다.\n이번 펀드는 총 70억원 규모로, 관내 우수 창업기업 발굴 및 육성에 투입될 예정이다.\n...`
    },
    {
        id: 5,
        category: 'resources',
        title: '기술지주회사 리플렛',
        date: '2026.08.27',
        fileType: 'PDF',
        views: 0,
        author: '관리자',
        content: '한국공학대학교 기술지주회사 소개 리플렛입니다.',
        fileName: '한국공학대학교기술지주회사_리플렛.pdf',
        fileUrl: '/files/한국공학대학교기술지주회사_리플렛.pdf',
    },
    {
        id: 10,
        category: 'press',
        title: '기술지주회사 자회사 ㈜퓨처리스텍, 시리즈A 50억 투자 유치',
        date: '2025.01.15',
        isNew: false,
        views: 892,
        author: '홍보팀',
        content: `한국공학대학교 기술지주회사의 자회사인 ㈜퓨처리스텍이 시리즈A 라운드에서 50억 원 규모의 투자를 유치했다고 밝혔다.\n\n이번 투자는 KB인베스트먼트가 리드하였으며, 기존 투자자인 한국기술지주펀드와 신규 투자자 2곳이 참여했다.\n\n㈜퓨처리스텍은 AI 기반 스마트 팩토리 솔루션을 개발하는 기업으로, 이번 투자금은 글로벌 시장 진출과 R&D 인력 확충에 사용할 예정이다.\n\n회사 관계자는 "이번 투자를 통해 기술 고도화와 해외 진출에 박차를 가할 것"이라고 밝혔다.`
    },
    {
        id: 11,
        category: 'press',
        title: '한국공학대 기술지주, CES 2025 참가 자회사 5곳 지원',
        date: '2025.01.08',
        isNew: false,
        views: 567,
        author: '홍보팀',
        content: `한국공학대학교 기술지주회사가 자회사 5곳의 CES 2025 참가를 지원했다.\n\n이번에 참가한 자회사는 ㈜이노테크, ㈜에이치엠오, ㈜더웨이, ㈜나노누리, ㈜스태커스 등 5개 기업이다.\n\n각 기업은 AI, IoT, 친환경 기술 분야에서 혁신적인 제품을 선보였으며, 현지에서 글로벌 바이어들과 활발한 상담을 진행했다.\n\n기술지주회사는 자회사들의 해외 전시회 참가 비용 일부와 부스 운영을 지원했다.`
    },
    {
        id: 15,
        category: 'press',
        title: '기술지주회사, 2024년 투자 성과 발표... 신규 투자 15건 달성',
        date: '2024.12.28',
        isNew: false,
        views: 723,
        author: '홍보팀',
        content: `한국공학대학교 기술지주회사가 2024년 한 해 동안 총 15건의 신규 투자를 집행하며 역대 최고 실적을 달성했다고 밝혔다.\n\n2024년 신규 투자 규모는 총 45억 원으로, 전년 대비 30% 증가한 수치다. 투자 분야는 AI/SW(6건), 바이오헬스(4건), 친환경에너지(3건), 기타(2건) 순이었다.\n\n기술지주회사 관계자는 "2025년에는 딥테크 분야 투자를 확대하고, 기존 포트폴리오 기업들의 후속 투자 유치를 적극 지원할 계획"이라고 밝혔다.`
    },
    {
        id: 20,
        category: 'faq',
        title: '어떤 기업이 투자 검토 대상인가요?',
        date: '2026.08.27',
        author: '기업투자본부',
        content: '기술기반 창업기업 또는 예비창업자로서 차별화된 기술과 성장 가능성을 보유한 기업을 대상으로 투자를 검토합니다.'
    },
    {
        id: 21,
        category: 'faq',
        title: 'IR은 어떻게 접수하나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        content: '홈페이지 IR 접수 또는 이메일을 통해 사업계획서(IR 자료)를 제출해 주시면 기업투자본부에서 검토 후 개별 안내드립니다.'
    },
    {
        id: 22,
        category: 'faq',
        title: '투자 검토는 얼마나 걸리나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        content: '제출 자료와 기업 상황에 따라 달라질 수 있으며, 일반적으로 IR 접수 후 검토 결과는 순차적으로 안내드립니다.'
    },
    {
        id: 23,
        category: 'faq',
        title: 'TIPS 추천은 어떻게 받을 수 있나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        content: '당사의 투자 및 심사를 거친 기업을 대상으로 기술성, 성장성 등을 종합 검토하여 TIPS 운영사 추천 여부를 결정합니다.'
    },
    {
        id: 24,
        category: 'faq',
        title: '어떤 지원을 받을 수 있나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        content: '투자뿐만 아니라 TU-RN Up 프로그램, 창업보육센터, 기술사업화 및 정부 연구개발(R&D) 연계 등 다양한 성장지원 프로그램을 제공합니다.'
    },
    {
        id: 25,
        category: 'faq',
        title: '자회사와 투자기업의 차이는 무엇인가요?',
        date: '2026.08.27',
        author: '기업투자본부',
        content: '자회사는 대학 기술을 활용하여 기술지주회사가 일정 지분을 보유한 기업이며, 투자기업은 기술지주회사가 투자한 포트폴리오 기업을 의미합니다.'
    }
];

export const INITIAL_POPUPS: Popup[] = [
    {
        id: 1,
        title: "2025 입주기업 모집",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
        startDate: "2025-01-20",
        endDate: "2025-03-30",
        isVisible: true,
        link: "https://www.tukorea.ac.kr"
    }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
    { id: 1, inquiryType: '일반 문의', name: '김철수', contact: '010-1234-5678', email: 'kim@example.com', companyName: '예시기업', content: '입주 관련 상담을 받고 싶습니다. 가능하면 빠른 답변 부탁드립니다.', date: '2025-02-20', status: '대기' },
    { id: 2, inquiryType: 'TIPS 문의', name: '이영희', contact: '010-9876-5432', email: 'lee@company.com', companyName: '스타트업A', content: 'TIPS 프로그램 지원 절차 문의드립니다.', date: '2025-02-18', status: '완료' },
    { id: 3, inquiryType: 'IR 접수', name: '박민수', contact: '010-5555-4444', email: 'park@start.up', companyName: '딥테크B', content: '투자 검토 요청드립니다.', date: '2025-02-15', status: '대기' },
];
