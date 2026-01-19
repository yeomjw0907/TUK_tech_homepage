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

    return {
        id: name.replace(/\s/g, '-').replace(/[()*]/g, ''),
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
        logo: `https://via.placeholder.com/100x100.png?text=${name.charAt(0)}`,
        bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
        shortDesc: SHORT_DESCS[nameHash % SHORT_DESCS.length]
    };
};


const RAW_SUBSIDIARIES = [
    "(주)링크솔루션", "㈜이노테코", "㈜더웨이", "㈜제이케이테크롤러지",
    "(주)비타민상상력", "이트렌코텍", "㈜에이치엠오", "㈜퓨처리스텍",
    "㈜비오에스", "㈜나노누리", "㈜이코모스", "㈜제노", "㈜티케이",
    "㈜스태커스", "㈜케이제이테크", "㈜에스비에너지"
];

const RAW_PORTFOLIO = [
    "(주)링크솔루션", "엘포톤*", "기억*", "와첸", "네이앤컴퍼니", "유쾌한프로젝트",
    "메디앤리서치", "이안나노텍", "셀바크이노베이션*", "이트렌코텍*", "쉘피아",
    "㈜제이케이테크롤러지*", "스카일리*", "퀀텀매트릭스*", "액티부키", "큐티뮨바이오*",
    "어플라이드서멀", "크림", "에버트레져", "프로미엘*", "엘엠케이"
];

export const INITIAL_COMPANIES: Company[] = [
    ...RAW_SUBSIDIARIES.map(name => createCompany(name, false, 'subsidiary')),
    ...RAW_PORTFOLIO.map(name => createCompany(name, false, 'portfolio'))
].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

export const INITIAL_POSTS: Post[] = [
    {
        id: 1,
        category: 'notice',
        title: '2025년도 예비창업패키지 모집 공고',
        date: '2025.02.15',
        isNew: true,
        views: 1240,
        author: '창업지원팀',
        content: `2025년도 예비창업패키지 예비창업자 모집 공고\n\n혁신적인 기술 창업 소재가 있는 예비창업자의 원활한 창업사업화를 위하여 사업화 자금, 창업교육, 멘토링 등을 지원하는 『2025년 예비창업패키지』에 참여할 예비창업자를 다음과 같이 모집합니다.\n\n1. 신청방법 및 대상\n□ 신청기간 : 2025.02.15 (목) ~ 2025.03.15 (목) 16:00 까지\n□ 신청방법 : K-Startup 누리집(www.k-startup.go.kr)을 통한 온라인 신청\n□ 신청대상 : 공고일 기준 '신청자 명의'의 사업자 등록(개인, 법인)이 없는 자\n\n2. 지원내용\n□ 사업화 자금 : 최대 1억원 (평균 50백만원)\n□ 창업프로그램 : BM 고도화, MVP 제작, 후속투자 연계 등\n\n자세한 내용은 첨부파일을 참조하시기 바랍니다.`,
        fileName: '2025_예비창업패키지_모집공고.hwp'
    },
    {
        id: 2,
        category: 'notice',
        title: '제5회 한국공학대학교 창업경진대회 수상자 발표',
        date: '2025.02.10',
        isNew: false,
        views: 856,
        author: '운영지원팀',
        content: `제5회 한국공학대학교 창업경진대회에 참여해 주신 모든 분들께 감사드립니다.\n치열한 경쟁을 뚫고 선정된 최종 수상자를 발표합니다.\n\n[대상]\n- (주)퓨처리스텍 (대표: 홍길동)\n\n[최우수상]\n- 엘포톤 (대표: 김철수)\n\n수상하신 모든 분들 축하드리며, 시상식 일정은 개별 통보 예정입니다.\n감사합니다.`
    },
    {
        id: 3,
        category: 'notice',
        title: '2025년 입주기업 상반기 모집 안내',
        date: '2025.01.28',
        isNew: false,
        views: 2105,
        author: '창업보육센터',
        content: `2025년 상반기 한국공학대학교 기술지주회사 입주기업을 모집합니다.\n\n1. 모집개요\n- 위치 : 시흥비즈니스센터 7층\n- 규모 : 5개 호실 내외\n- 대상 : 기술기반 예비창업자 및 창업 7년 이내 기업\n\n2. 입주혜택\n- 사무공간 임대료 감면\n- 회의실, 휴게실 등 공용공간 무상 제공\n- 전문가 멘토링 및 기술지도 지원\n- 정부지원사업 연계 지원\n\n관심있는 기업들의 많은 참여 바랍니다.`,
        fileName: '2025_입주기업_모집안내.pdf'
    },
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
        title: '2025년 정부지원사업 통합공고문',
        date: '2025.01.05',
        fileType: 'PDF',
        views: 3421,
        author: '관리자',
        content: `2025년도 창업지원사업 통합공고문입니다.\n각 부처별 지원사업 일정을 확인하시고 미리 준비하시기 바랍니다.`,
        fileName: '2025년_창업지원사업_통합공고.pdf'
    },
    {
        id: 6,
        category: 'resources',
        title: '사업계획서 작성 가이드라인 (표준양식)',
        date: '2024.12.20',
        fileType: 'HWP',
        views: 5620,
        author: '창업지원팀',
        content: `성공적인 자금조달을 위한 사업계획서 작성 가이드라인 및 표준양식입니다.\nPSST 방식에 따른 작성법이 상세히 안내되어 있으니 참고하시기 바랍니다.`,
        fileName: '사업계획서_가이드라인.hwp'
    },
    {
        id: 7,
        category: 'resources',
        title: 'TIPS 프로그램 소개 자료',
        date: '2024.12.15',
        fileType: 'PPT',
        views: 1205,
        author: '투자팀',
        content: `TIPS(Tech Incubator Program for Startup) 프로그램 소개 자료입니다.\n운영사별 특징 및 지원 절차에 대한 내용이 포함되어 있습니다.`,
        fileName: 'TIPS_프로그램_소개.ppt'
    },
    {
        id: 8,
        category: 'faq',
        title: '기술지주회사 자회사 설립 요건은 어떻게 되나요?',
        date: '2024.11.01',
        author: '관리자',
        content: '기술지주회사의 자회사가 되기 위해서는 대학이 보유한 기술을 출자하여 설립해야 하며, 기술지주회사가 자회사 지분의 10% 이상(또는 20% 이상)을 확보해야 합니다. 상세 요건은 자회사 설립 절차 메뉴를 참고하시기 바랍니다.'
    },
    {
        id: 9,
        category: 'faq',
        title: '투자 검토 기간은 얼마나 걸리나요?',
        date: '2024.10.25',
        author: '투자팀',
        content: '투자 검토 기간은 기업의 상황 및 제출 서류의 완비 여부에 따라 달라질 수 있으나, 통상적으로 서류 접수 후 예비 심사까지 2~3주, 본 심사 및 투자 집행까지 약 1~2개월 정도 소요됩니다.'
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
        content: `한국공학대학교 기술지주회사가 자회사 5곳의 CES 2025 참가를 지원했다.\n\n이번에 참가한 자회사는 ㈜이노테코, ㈜에이치엠오, ㈜더웨이, ㈜나노누리, ㈜스태커스 등 5개 기업이다.\n\n각 기업은 AI, IoT, 친환경 기술 분야에서 혁신적인 제품을 선보였으며, 현지에서 글로벌 바이어들과 활발한 상담을 진행했다.\n\n기술지주회사는 자회사들의 해외 전시회 참가 비용 일부와 부스 운영을 지원했다.`
    },
    {
        id: 12,
        category: 'faq',
        title: '입주기업 지원 혜택은 어떤 것이 있나요?',
        date: '2024.10.15',
        author: '창업보육센터',
        content: '입주기업에게는 사무공간 임대료 감면, 회의실 및 공용공간 무상 제공, 전문가 멘토링, 정부지원사업 연계 지원, 네트워킹 행사 참여 기회 등 다양한 혜택이 제공됩니다. 또한 한국공학대학교 교수진과의 기술 협력 기회도 마련됩니다.'
    },
    {
        id: 13,
        category: 'faq',
        title: 'TIPS 프로그램 추천을 받으려면 어떻게 해야 하나요?',
        date: '2024.10.10',
        author: '투자팀',
        content: 'TIPS 프로그램 추천을 받기 위해서는 먼저 기술지주회사에 투자 상담을 신청하셔야 합니다. 기술성, 시장성, 팀 역량 등을 종합적으로 검토한 후 적합한 기업에 한해 TIPS 운영사로서 추천을 진행합니다. 투자 상담은 홈페이지 문의하기를 통해 신청 가능합니다.'
    },
    {
        id: 14,
        category: 'notice',
        title: '2025년 상반기 스타트업 네트워킹 데이 개최 안내',
        date: '2025.02.01',
        isNew: false,
        views: 445,
        author: '운영지원팀',
        content: `한국공학대학교 기술지주회사에서 2025년 상반기 스타트업 네트워킹 데이를 개최합니다.\n\n■ 행사개요\n- 일시 : 2025년 3월 15일(금) 14:00 ~ 18:00\n- 장소 : 시흥비즈니스센터 7층 대회의실\n- 대상 : 입주기업, 자회사, 포트폴리오사, 예비창업자\n\n■ 프로그램\n- 14:00~14:30 : 개회 및 기조연설\n- 14:30~16:00 : 기업 피칭 세션\n- 16:00~18:00 : 자유 네트워킹\n\n많은 참여 부탁드립니다.`,
        fileName: '2025_네트워킹데이_안내.pdf'
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
    { id: 1, name: '김철수', contact: '010-1234-5678', email: 'kim@example.com', content: '입주 관련 상담을 받고 싶습니다. 가능하면 빠른 답변 부탁드립니다.', date: '2025-02-20', status: '대기' },
    { id: 2, name: '이영희', contact: '010-9876-5432', email: 'lee@company.com', content: 'TIPS 프로그램 지원 절차 문의드립니다.', date: '2025-02-18', status: '완료' },
    { id: 3, name: '박민수', contact: '010-5555-4444', email: 'park@start.up', content: '투자 검토 요청드립니다.', date: '2025-02-15', status: '대기' },
];
