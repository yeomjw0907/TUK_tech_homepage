import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, ChevronRight, ChevronDown, MapPin, Phone, Mail, 
  Building, TrendingUp, Users, Award, ExternalLink, ArrowRight,
  Target, Briefcase, FileText, CheckCircle2, MoreHorizontal,
  Download, Bell, MessageCircle
} from 'lucide-react';

// --- Types & Data ---

type PageId = 'home' | 'about' | 'investment' | 'subsidiary' | 'portfolio' | 'news' | 'contact';
type SubPageId = string;

interface MenuItem {
  id: PageId;
  label: string;
  subItems?: { id: SubPageId; label: string }[];
}

interface Company {
  id: string;
  name: string;
  ceo: string;
  foundedDate: string;
  business: string;
  room: string;
  moveInDate: string;
  homepage: string;
  note: string;
  isTips: boolean;
  category: 'subsidiary' | 'portfolio';
}

const MENU_STRUCTURE: MenuItem[] = [
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
      { id: 'apply', label: 'Apply' },
    ]
  },
  { 
    id: 'subsidiary', 
    label: '자회사 안내',
    subItems: [
      { id: 'procedure', label: '자회사 설립절차' },
      { id: 'support', label: '자회사 성장지원' },
      { id: 'exit', label: '자회사 투자회수 현황' },
    ]
  },
  { 
    id: 'portfolio', 
    label: '기업소개',
    subItems: [
      { id: 'subsidiaries', label: '자회사 소개' },
      { id: 'tips_reco', label: 'TIPS 추천 기업' },
      { id: 'all_portfolio', label: '전체 포트폴리오' },
    ]
  },
  { 
    id: 'news', 
    label: '회사소식',
    subItems: [
      { id: 'notice', label: '공지사항' },
      { id: 'press', label: '보도소식' },
      { id: 'resources', label: '자료실' },
      { id: 'faq', label: 'FAQ' },
    ]
  },
  { id: 'contact', label: '문의하기' },
];

const FUNDS_DATA = [
  { name: '케이이룸(K-IRUM) 개인투자조합 1호', agency: '중소벤처기업부', size: '3억원', status: '운용중', period: '2018.10.~2028.10.' },
  { name: '케이도움주기 투자조합 1호', agency: '중소벤처기업부', size: '3억원', status: '운용중', period: '2022.05.~2027.05.' },
  { name: '대학창업투자조합', agency: '교육부(한국벤처투자)', size: '30억원', status: '운용중', period: '2022.08.~2032.08.' },
  { name: '케이도움주기 투자조합 2호', agency: '중소벤처기업부', size: '3억원', status: '운용중', period: '2024.01.~2029.01.' },
  { name: '시흥창업펀드', agency: '중소벤처기업부', size: '70억원', status: '운용중', period: '2025.06.~2033.06.' },
  { name: '케이도움주기 투자조합 3호', agency: '중소벤처기업부', size: '4억원', status: '운용중', period: '2025.09.~2033.09.' },
];

// Mock Data Generation Helper
const createCompany = (name: string, isTips = false, category: 'subsidiary' | 'portfolio' = 'portfolio'): Company => ({
  id: name.replace(/\s/g, '-').replace(/[()*]/g, ''),
  name: name.replace('*', ''),
  ceo: '홍길동',
  foundedDate: '2023-01-01',
  business: 'AI 및 빅데이터 기반 기술 솔루션 개발',
  room: 'P동 301호',
  moveInDate: '2024-03-01',
  homepage: 'https://www.tukorea.ac.kr',
  note: '-',
  isTips: name.includes('*') || isTips,
  category
});

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

const COMPANY_DB: Company[] = [
  ...RAW_SUBSIDIARIES.map(name => createCompany(name, false, 'subsidiary')),
  ...RAW_PORTFOLIO.map(name => createCompany(name, false, 'portfolio'))
].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i); // Deduplicate

const TIPS_COOP = [
  "JC VALLEY", "경기테크노파크", "특허법인 이노", "수원대학교 창업지원단", "아이티엘",
  "시흥산업진흥원", "경기과학기술대학교 산학협력단", "한국공학대학교", 
  "피앤피인베스트먼트", "코맥스벤처러스", "벤처박스", "하이브워크", "한양대학교에리카 산학협력단"
];

const RECENT_NOTICES = [
  { id: 1, title: '2025년도 예비창업패키지 모집 공고', date: '2025.02.15', isNew: true },
  { id: 2, title: '제5회 한국공학대학교 창업경진대회 수상자 발표', date: '2025.02.10', isNew: false },
  { id: 3, title: '2025년 입주기업 상반기 모집 안내', date: '2025.01.28', isNew: false },
  { id: 4, title: '기술지주회사 개인투자조합 결성 총회 개최', date: '2025.01.15', isNew: false },
];

const RECENT_RESOURCES = [
  { id: 1, title: '2025년 정부지원사업 통합공고문', date: '2025.01.05', type: 'PDF' },
  { id: 2, title: '사업계획서 작성 가이드라인 (표준양식)', date: '2024.12.20', type: 'HWP' },
  { id: 3, title: 'TIPS 프로그램 소개 자료', date: '2024.12.15', type: 'PPT' },
];

// --- Components ---

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }: any) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003E7E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  const variants = {
    primary: "bg-[#003E7E] text-white hover:bg-[#002F60] border border-transparent shadow-sm hover:shadow-md",
    secondary: "bg-white text-[#003E7E] border border-[#003E7E] hover:bg-slate-50 shadow-sm hover:shadow-md",
    outline: "bg-transparent text-white border border-white/70 hover:bg-white/10 hover:border-white",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizeClass = sizes[size as keyof typeof sizes] || sizes.md;
  const variantClass = variants[variant as keyof typeof variants] || variants.primary;

  return (
    <button className={`${baseStyle} ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 md:mb-16 text-center">
    {subtitle && (
      <span className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase block mb-3">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
      {title}
    </h2>
    <div className="w-12 h-1 bg-[#003E7E] mx-auto mt-6 rounded-full"></div>
  </div>
);

const Card = ({ title, children, className = '' }: any) => (
  <div className={`bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 p-8 transition-shadow duration-300 ${className}`}>
    {title && <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">{title}</h3>}
    {children}
  </div>
);

// --- Quick Menu ---
const QuickMenu = ({ onNavigate }: { onNavigate: (page: PageId, subPage?: string) => void }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[100] hidden md:flex flex-col gap-3 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all">
      {[
        { icon: Bell, label: "공지사항", action: () => onNavigate('news', 'notice') },
        { icon: Download, label: "자료실", action: () => onNavigate('news', 'resources') },
        { icon: ExternalLink, label: "창업보육센터", action: () => window.open('https://bi.tukorea.ac.kr', '_blank') },
        { icon: MessageCircle, label: "문의하기", action: () => onNavigate('contact') },
      ].map((item, idx) => (
        <div key={idx} className="group relative flex items-center justify-center">
          <button 
            onClick={item.action}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 bg-white shadow-sm border border-slate-100 hover:bg-[#003E7E] hover:text-white hover:border-[#003E7E] hover:shadow-md transition-all duration-300 relative z-20"
          >
            <item.icon className="w-5 h-5" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-xl translate-x-2 group-hover:translate-x-0 z-10">
             {item.label}
             {/* Arrow */}
             <div className="absolute top-1/2 right-[-4px] -mt-1 border-4 border-transparent border-l-slate-900/90"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Layout Components ---

const Header = ({ activePage, activeSubPage, onNavigate }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<PageId | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group gap-3"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 bg-[#003E7E] text-white rounded flex items-center justify-center shadow-sm group-hover:bg-[#002952] transition-colors">
              <Building className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[#003E7E] font-bold text-lg leading-none tracking-tight">한국공학대학교</span>
              <span className="text-slate-500 text-[11px] font-medium tracking-widest mt-0.5 uppercase">기술지주회사</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex h-full items-center gap-8">
            {MENU_STRUCTURE.map((item) => (
              <div 
                key={item.id}
                className="relative h-full flex items-center group/nav"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  className={`relative py-2 text-[15px] transition-colors duration-200 ${
                    activePage === item.id 
                      ? 'text-[#003E7E] font-bold' 
                      : 'text-slate-600 font-medium hover:text-[#003E7E]'
                  }`}
                  onClick={() => onNavigate(item.id, item.subItems?.[0]?.id)}
                >
                  {item.label}
                  {/* Minimalist Underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#003E7E] rounded-full transform origin-left transition-transform duration-300 ease-out translate-y-7 ${
                    activePage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                  }`}></span>
                </button>
                
                {/* Dropdown */}
                {item.subItems && hoveredMenu === item.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white shadow-xl rounded-lg border border-slate-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 mt-0.5">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        className="block w-full text-left px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#003E7E] transition-colors"
                        onClick={() => onNavigate(item.id, sub.id)}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="h-4 w-px bg-slate-200 mx-2"></div>
            <a href="#" className="flex items-center text-xs font-semibold text-slate-500 hover:text-[#003E7E] transition-colors uppercase tracking-wide">
              창업보육센터 <ExternalLink className="w-3 h-3 ml-1.5" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-[#003E7E] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {MENU_STRUCTURE.map((item) => (
              <div key={item.id} className="py-1">
                <button
                  className="w-full text-left font-bold text-slate-800 py-3 px-2 border-b border-slate-50 hover:bg-slate-50 rounded"
                  onClick={() => {
                    onNavigate(item.id, item.subItems?.[0]?.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
                {item.subItems && (
                  <div className="pl-4 mt-1 space-y-1 bg-slate-50 rounded-lg">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        className="block w-full text-left text-sm text-slate-600 py-3 px-4 hover:text-[#003E7E] font-medium"
                        onClick={() => {
                          onNavigate(item.id, sub.id);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        - {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFamilySiteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const familySites = [
    "한국공학대학교", "일반대학원", "산업기술경영대학원", "지식기반기술에너지대학원",
    "생활관", "대학일자리센터", "학생상담센터", "학보사", "공학교육혁신센터",
    "산학협력단", "일학습병행사업단", "교수학습개발센터", "ITP(산업기술최고경영자과정)",
    "커뮤니케이션교육센터", "도서관", "평생교육원", "현장실습업무지원시스템",
    "창업보육센터", "가족회사종합지원센터", "EH사업화센터", "공용장비지원센터", "LINC+ 사업단"
  ];

  return (
    <footer className="bg-white border-t border-slate-200 py-10 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo, Links, Family Site */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          
          {/* Logo & Links Group */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:w-auto">
            {/* Logo */}
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-[#003E7E] text-white rounded flex items-center justify-center">
                  <Building className="w-5 h-5" />
               </div>
               <div className="flex items-center text-slate-800 font-bold text-lg">
                 <span>한국공학대학교</span>
                 <span className="mx-2 text-slate-300 font-light">|</span>
                 <span>기술지주회사</span>
               </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-600 md:ml-6">
              <a href="#" className="hover:text-[#003E7E]">개인정보취급방침</a>
              <a href="#" className="hover:text-[#003E7E]">정보보호실천수칙</a>
              <a href="#" className="hover:text-[#003E7E]">홈페이지운영지침</a>
            </div>
          </div>

          {/* Family Site Dropdown */}
          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button 
              onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
              className="w-full flex justify-between items-center border border-slate-300 rounded px-3 py-2.5 bg-white hover:border-[#003E7E] transition-colors"
            >
              <span className="text-xs text-slate-600">TUKOREA 관련기관 링크</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFamilySiteOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Content */}
            {isFamilySiteOpen && (
              <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-slate-300 shadow-lg max-h-60 overflow-y-auto text-xs z-50">
                {familySites.map((site, idx) => (
                  <a key={idx} href="#" className="block px-3 py-2 hover:bg-slate-50 hover:text-[#003E7E] border-b border-slate-50 last:border-0 text-slate-600">
                    ::{site}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Info */}
        <div className="text-xs text-slate-500 space-y-1.5 border-t border-transparent">
          <p className="font-bold text-slate-700 text-sm mb-1">한국공학대학교 기술지주회사</p>
          <p>경기도 시흥시 산기대학로 237 시흥비즈니스센터 7층</p>
          <div className="flex flex-wrap gap-4 text-slate-500">
            <span className="font-medium text-slate-600">T. 031-8041-0965</span>
            <span className="font-medium text-slate-600">F. 031-8041-0899</span>
            <span>E. tuholdings@tukorea.ac.kr</span>
          </div>
          <p className="pt-4 text-slate-400">Copyright© 2024 한국공학대학교 기술지주회사 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const SubPageHeader = ({ title, parent, menuItems, activeSub, onSubNav }: any) => (
  <div className="bg-slate-50 border-b border-slate-200">
    <div className="relative bg-[#003E7E] py-20 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <span className="text-blue-300/90 font-bold tracking-widest text-xs uppercase mb-3 block">{parent}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{title}</h1>
      </div>
    </div>
    
    {menuItems && (
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar space-x-1 md:justify-center">
            {menuItems.map((item: any) => (
              <button
                key={item.id}
                className={`whitespace-nowrap px-6 py-4 text-sm font-bold border-b-2 transition-all duration-200 ${
                  activeSub === item.id 
                    ? 'border-[#003E7E] text-[#003E7E]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
                onClick={() => onSubNav(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const CompanyDetail = ({ company, onBack }: { company: Company, onBack: () => void }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-12">
         <div className="w-1.5 h-8 bg-[#003E7E]"></div>
         <h2 className="text-2xl font-bold text-slate-900">기업 상세 안내</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-0 border-t-2 border-slate-900 bg-white shadow-sm">
         {/* Left: Image Area */}
         <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 p-8 flex items-center justify-center min-h-[300px]">
           <div className="w-full aspect-[4/3] bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-4">
              {/* Placeholder for company logo */}
              <div className="text-center">
                <Building className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <span className="text-slate-400 font-bold text-lg">{company.name}</span>
              </div>
           </div>
         </div>

         {/* Right: Info Table */}
         <div className="md:col-span-2">
            <h3 className="p-6 text-xl font-extrabold text-slate-900 border-b border-slate-200">
               {company.name} {company.isTips && <span className="ml-2 text-xs text-[#003E7E] bg-blue-50 px-2 py-1 rounded border border-blue-100 align-middle">TIPS 선정기업</span>}
            </h3>
            <div className="text-sm">
               <div className="grid grid-cols-4 border-b border-slate-100">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">대표자명</div>
                  <div className="col-span-3 p-4 text-slate-600">{company.ceo}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-100">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">설립일</div>
                  <div className="col-span-3 p-4 text-slate-600">{company.foundedDate}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-100">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">주요사업</div>
                  <div className="col-span-3 p-4 text-slate-600">{company.business}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-100">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">사용호실</div>
                  <div className="col-span-3 p-4 text-slate-600">{company.room}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-100">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">입주일자</div>
                  <div className="col-span-3 p-4 text-slate-600">{company.moveInDate}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-100">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">홈페이지</div>
                  <div className="col-span-3 p-4 text-slate-600">
                    <a href={company.homepage} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{company.homepage}</a>
                  </div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-200">
                  <div className="col-span-1 bg-slate-50 p-4 font-bold text-slate-700 flex items-center">비고</div>
                  <div className="col-span-3 p-4 text-slate-600">{company.note}</div>
               </div>
            </div>
         </div>
      </div>

      <div className="mt-12 text-right">
        <Button onClick={onBack} size="lg" className="px-10">목록</Button>
      </div>
    </div>
  );
}

const HomePage = ({ onNavigate, onCompanyClick }: any) => {
  const recentCompanies = COMPANY_DB.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[#003E7E] text-white overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003E7E] via-[#002952] to-black opacity-90 z-10"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute right-0 top-0 w-2/3 h-full opacity-20 z-0">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
             <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grad1)" />
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" style={{stopColor:'rgb(255,255,255)', stopOpacity:0}} />
                 <stop offset="100%" style={{stopColor:'rgb(255,255,255)', stopOpacity:0.3}} />
               </linearGradient>
             </defs>
           </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pt-10">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold mb-6 backdrop-blur-sm">
              한국공학대학교 기술지주회사
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              기술의 가치를 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">비즈니스로 연결합니다</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-light">
              대학의 우수 기술을 발굴하고 체계적인 엑셀러레이팅을 통해
              여러분의 아이디어가 유니콘 기업으로 성장하도록 돕겠습니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate('about', 'overview')}>회사소개 자세히 보기</Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('investment', 'process')}>
                투자 문의 <ChevronRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Info Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Recent Companies */}
            <div className="lg:col-span-3 mb-8">
               <div className="flex justify-between items-end mb-6">
                 <h3 className="text-2xl font-bold text-slate-900">최신 입주/투자 기업</h3>
                 <button onClick={() => onNavigate('portfolio', 'all_portfolio')} className="text-sm text-slate-500 hover:text-[#003E7E] flex items-center">더보기 <ChevronRight className="w-4 h-4" /></button>
               </div>
               <div className="grid md:grid-cols-4 gap-6">
                 {recentCompanies.map(company => (
                   <div 
                      key={company.id} 
                      onClick={() => onCompanyClick(company)}
                      className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                   >
                      <div className="aspect-video bg-slate-50 rounded-lg mb-4 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                        <Building className="w-8 h-8 text-slate-300 group-hover:text-[#003E7E]" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-1 truncate">{company.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{company.business}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Notices */}
            <div className="lg:col-span-2">
               <div className="flex justify-between items-end mb-6">
                 <h3 className="text-2xl font-bold text-slate-900">공지사항</h3>
                 <button onClick={() => onNavigate('news', 'notice')} className="text-sm text-slate-500 hover:text-[#003E7E] flex items-center">더보기 <ChevronRight className="w-4 h-4" /></button>
               </div>
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                  {RECENT_NOTICES.map(notice => (
                    <div key={notice.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => onNavigate('news', 'notice')}>
                      <div className="flex-grow">
                         <h4 className="text-slate-800 font-medium mb-1 line-clamp-1 flex items-center gap-2">
                           {notice.isNew && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                           {notice.title}
                         </h4>
                         <p className="text-xs text-slate-400">{notice.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                  ))}
               </div>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
               <div className="flex justify-between items-end mb-6">
                 <h3 className="text-2xl font-bold text-slate-900">자료실</h3>
                 <button onClick={() => onNavigate('news', 'resources')} className="text-sm text-slate-500 hover:text-[#003E7E] flex items-center">더보기 <ChevronRight className="w-4 h-4" /></button>
               </div>
               <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  {RECENT_RESOURCES.map((resource, idx) => (
                    <div key={resource.id} className={`p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${idx !== RECENT_RESOURCES.length - 1 ? 'border-b border-slate-100' : ''}`} onClick={() => onNavigate('news', 'resources')}>
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                        {resource.type}
                      </div>
                      <div className="flex-grow min-w-0">
                         <h4 className="text-slate-800 font-medium text-sm line-clamp-2 leading-snug mb-1">{resource.title}</h4>
                         <p className="text-xs text-slate-400">{resource.date}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#003E7E] py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">기술사업화의 파트너가 되어드립니다</h2>
            <p className="text-blue-100 text-lg font-light">한국공학대학교 기술지주회사가 여러분의 성공적인 비즈니스를 지원합니다.</p>
          </div>
          <Button variant="outline" size="lg" className="flex items-center" onClick={() => onNavigate('contact')}>
            문의하기 <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

// --- App Component ---

const App = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [activeSubPage, setActiveSubPage] = useState<string | undefined>(undefined);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleNavigate = (page: PageId, subPage?: string) => {
    setActivePage(page);
    setActiveSubPage(subPage);
    setSelectedCompany(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubNavigate = (subPage: string) => {
    setActiveSubPage(subPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (selectedCompany) {
      return (
        <div className="py-20 px-4 bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
           <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompany(null)} />
        </div>
      );
    }

    if (activePage === 'home') {
      return <HomePage onNavigate={handleNavigate} onCompanyClick={handleCompanyClick} />;
    }

    const menuItem = MENU_STRUCTURE.find(item => item.id === activePage);
    const subMenuItem = menuItem?.subItems?.find(s => s.id === activeSubPage);
    
    return (
      <div className="animate-in fade-in zoom-in-95 duration-300">
        <SubPageHeader 
          title={subMenuItem?.label || menuItem?.label} 
          parent={menuItem?.label}
          menuItems={menuItem?.subItems}
          activeSub={activeSubPage}
          onSubNav={handleSubNavigate}
        />
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[500px]">
           {renderSubPageContent()}
        </div>
      </div>
    );
  };

  const renderSubPageContent = () => {
     // Portfolio Logic
     if (activePage === 'portfolio') {
        let companies = [];
        if (activeSubPage === 'subsidiaries') companies = COMPANY_DB.filter(c => c.category === 'subsidiary');
        else if (activeSubPage === 'tips_reco') companies = COMPANY_DB.filter(c => c.isTips);
        else companies = COMPANY_DB; // all_portfolio

        return (
          <>
            <div className="flex justify-between items-center mb-8">
               <div className="text-slate-500">총 <strong className="text-[#003E7E]">{companies.length}</strong>개의 기업이 있습니다.</div>
               <div className="flex gap-2">
                  {/* Filter buttons could go here */}
               </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies.map(company => (
                <div 
                  key={company.id} 
                  onClick={() => handleCompanyClick(company)}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="aspect-video bg-slate-50 rounded-lg mb-4 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    <Building className="w-8 h-8 text-slate-300 group-hover:text-[#003E7E]" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1 truncate">{company.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{company.business}</p>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {company.isTips && <span className="text-[10px] font-bold text-[#003E7E] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">TIPS</span>}
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
     }

     // Investment Fields
     if (activePage === 'investment' && activeSubPage === 'fields') {
         return (
             <div className="space-y-12">
                 <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: TrendingUp, title: "IT/SW", desc: "인공지능, 빅데이터, 클라우드, 사물인터넷 등 4차 산업혁명 핵심 기술 분야" },
                        { icon: Target, title: "바이오/헬스케어", desc: "디지털 헬스케어, 의료기기, 바이오 소재 등 국민 건강 증진을 위한 혁신 기술" },
                        { icon: Briefcase, title: "제조/소재/부품", desc: "첨단 제조 공정, 신소재, 고기능성 부품 등 산업 경쟁력 강화를 위한 기반 기술" }
                    ].map((item, idx) => (
                        <Card key={idx} className="text-center p-10 h-full flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#003E7E]">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </Card>
                    ))}
                 </div>
             </div>
         )
     }

     // News - Notice
     if (activePage === 'news' && activeSubPage === 'notice') {
         return (
             <div className="space-y-8 max-w-4xl mx-auto">
                 <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold">{RECENT_NOTICES.length}</span>건</span>
                    <div className="flex gap-2">
                        <input type="text" placeholder="검색어 입력" className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#003E7E] w-48" />
                        <Button size="sm">검색</Button>
                    </div>
                 </div>
                 <div className="bg-white border-t-2 border-[#003E7E]">
                    {RECENT_NOTICES.map((notice) => (
                        <div key={notice.id} className="flex flex-col md:flex-row md:items-center py-5 px-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                             <div className="w-16 text-center text-slate-400 text-sm font-medium mb-2 md:mb-0">{notice.id}</div>
                             <div className="flex-grow md:px-4">
                                 <h4 className="text-slate-800 font-medium group-hover:text-[#003E7E] transition-colors flex items-center gap-2">
                                     {notice.title}
                                     {notice.isNew && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>}
                                 </h4>
                             </div>
                             <div className="text-slate-400 text-sm w-24 text-center mt-2 md:mt-0">{notice.date}</div>
                        </div>
                    ))}
                 </div>
             </div>
         )
     }

     // Default Empty State
     return (
       <div className="flex flex-col items-center justify-center py-20 text-center">
         <div className="w-20 h-20 bg-slate-50 rounded-full mb-6 flex items-center justify-center text-slate-300">
            <FileText className="w-10 h-10" />
         </div>
         <h3 className="text-2xl font-bold text-slate-400 mb-2">페이지 준비 중</h3>
         <p className="text-slate-500 max-w-md mx-auto">
            현재 페이지는 준비 중입니다. <br/>
            빠른 시일 내에 유용한 정보로 찾아뵙겠습니다.
         </p>
         <Button variant="outline" className="mt-8" onClick={() => handleNavigate('home')}>홈으로 돌아가기</Button>
       </div>
     );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#003E7E] selection:text-white flex flex-col">
      <Header activePage={activePage} activeSubPage={activeSubPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <QuickMenu onNavigate={handleNavigate} />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);