import { Company, Post, Inquiry, Popup } from '../types';

export const createCompany = (name: string, isTips = false, category: 'subsidiary' | 'portfolio' = 'portfolio'): Company => {
    const companyId = name.replace(/\s/g, '-').replace(/[()*]/g, '');
    const logoKey = companyId.replace(/㈜/g, '').replace(/^주/, '').replace(/\*/g, '');

    return {
        id: companyId,
        name: name.replace('*', ''),
        ceo: '',
        foundedDate: '',
        business: '',
        room: '',
        moveInDate: '',
        homepage: '',
        note: '',
        isTips: name.includes('*') || isTips,
        category,
        logo: `/company-logos/${logoKey}`,
    };
};

const RAW_SUBSIDIARIES = [
    "(주)링크솔루션", "㈜이노테크", "㈜더웨이", "㈜제이케이테크놀로지",
    "(주)비타민상상력", "이트렌코텍", "㈜에이치엠오", "㈜퓨처리스텍",
    "㈜비오에스", "㈜이소프트", "㈜이코모스", "㈜제노", "㈜티케이",
    "㈜스태커스", "㈜케이제이테크", "㈜에스비에너지"
];

const RAW_PORTFOLIO = [
    "(주)링크솔루션", "(주)인터루얼", "엘포톤*", "기억*", "와첸", "네이앤컴퍼니", "유쾌한프로젝트",
    "메디앤리서치", "이안나노텍", "셀바크이노베이션*", "이트렌코텍*", "쉘피아",
    "㈜제이케이테크놀로지*", "스카일리*", "퀀텀매트릭스*", "액티부키", "큐티뮨바이오*",
    "어플라이드서멀", "크림", "에버트레져", "프로미엘*", "엘엠케이", "㈜메이즈"
];

export const INITIAL_COMPANIES: Company[] = [
    ...RAW_SUBSIDIARIES.map(name => createCompany(name, false, 'subsidiary')),
    ...RAW_PORTFOLIO.map(name => createCompany(name, false, 'portfolio'))
].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

export const INITIAL_POSTS: Post[] = [
    {
        id: 20,
        category: 'faq',
        title: '어떤 기업이 투자 검토 대상인가요?',
        date: '2026.08.27',
        author: '기업투자본부',
        sortOrder: 0,
        content: '기술기반 창업기업 또는 예비창업자로서 차별화된 기술과 성장 가능성을 보유한 기업을 대상으로 투자를 검토합니다.'
    },
    {
        id: 21,
        category: 'faq',
        title: 'IR은 어떻게 접수하나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        sortOrder: 1,
        content: '홈페이지 IR 접수 또는 이메일을 통해 사업계획서(IR 자료)를 제출해 주시면 기업투자본부에서 검토 후 개별 안내드립니다.'
    },
    {
        id: 22,
        category: 'faq',
        title: '투자 검토는 얼마나 걸리나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        sortOrder: 2,
        content: '제출 자료와 기업 상황에 따라 달라질 수 있으며, 일반적으로 IR 접수 후 검토 결과는 순차적으로 안내드립니다.'
    },
    {
        id: 23,
        category: 'faq',
        title: 'TIPS 추천은 어떻게 받을 수 있나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        sortOrder: 3,
        content: '당사의 투자 및 심사를 거친 기업을 대상으로 기술성, 성장성 등을 종합 검토하여 TIPS 운영사 추천 여부를 결정합니다.'
    },
    {
        id: 24,
        category: 'faq',
        title: '어떤 지원을 받을 수 있나요?',
        date: '2026.08.27',
        author: '기업투자본부',
        sortOrder: 4,
        content: '투자뿐만 아니라 TU-RN UP 프로그램, 창업보육센터, 기술사업화 및 정부 연구개발(R&D) 연계 등 다양한 성장지원 프로그램을 제공합니다.'
    },
    {
        id: 25,
        category: 'faq',
        title: '자회사와 투자기업의 차이는 무엇인가요?',
        date: '2026.08.27',
        author: '기업투자본부',
        sortOrder: 5,
        content: '자회사는 대학 기술을 활용하여 기술지주회사가 일정 지분을 보유한 기업이며, 투자기업은 기술지주회사가 투자한 포트폴리오 기업을 의미합니다.'
    }
];

export const INITIAL_POPUPS: Popup[] = [];

export const INITIAL_INQUIRIES: Inquiry[] = [];
