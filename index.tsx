import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, ChevronRight, ChevronDown, MapPin, Phone, Mail, 
  Building, TrendingUp, Users, Award, ExternalLink, ArrowRight,
  Target, Briefcase, FileText, CheckCircle2, MoreHorizontal,
  Download, Bell, MessageCircle, Presentation, SearchCheck, Gavel, 
  FileSignature, Rocket, Lightbulb, CheckCircle, Sprout, Handshake, 
  RefreshCw, LineChart, Binoculars, ClipboardCheck, Calendar, Flag,
  GraduationCap, Globe, ArrowDown, ChevronLeft, Eye, User, Clock,
  FileIcon, Paperclip, PieChart, Filter, ArrowUpDown, Lock, LayoutDashboard,
  Trash2, Plus, PenTool, Inbox, LogOut, CheckSquare, Search, Settings, Home,
  HelpCircle, Megaphone, FolderOpen, Edit, Image as ImageIcon, Layers, Link as LinkIcon, XCircle
} from 'lucide-react';

// --- Types & Data ---

type PageId = 'home' | 'about' | 'investment' | 'subsidiary' | 'portfolio' | 'news' | 'contact' | 'admin';
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
  // New Fields
  logo?: string;
  bgImage?: string;
  shortDesc?: string;
}

interface Post {
  id: number;
  category: 'notice' | 'press' | 'resources' | 'faq';
  title: string;
  date: string;
  author?: string;
  views?: number;
  content?: string;
  isNew?: boolean;
  fileType?: string; // For resources like PDF, HWP
  fileName?: string; // Attached file name
}

interface Inquiry {
  id: number;
  name: string;
  contact: string;
  email: string;
  content: string;
  date: string;
  status: '대기' | '완료';
}

interface Popup {
  id: number;
  title: string;
  image?: string; // Image URL
  content?: string;
  link?: string;
  startDate: string;
  endDate: string;
  isVisible: boolean;
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
const createCompany = (name: string, isTips = false, category: 'subsidiary' | 'portfolio' = 'portfolio'): Company => {
  // Generate a random date for better sorting demonstration
  const year = 2018 + Math.floor(Math.random() * 7);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

  return {
    id: name.replace(/\s/g, '-').replace(/[()*]/g, ''),
    name: name.replace('*', ''),
    ceo: '홍길동',
    foundedDate: `${year}-${month}-${day}`,
    business: 'AI 및 빅데이터 기반 기술 솔루션 개발',
    room: 'P동 301호',
    moveInDate: '2024-03-01',
    homepage: 'https://www.tukorea.ac.kr',
    note: '-',
    isTips: name.includes('*') || isTips,
    category,
    // Add default mock images
    logo: `https://via.placeholder.com/100x100.png?text=${name.charAt(0)}`,
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    shortDesc: '미래를 선도하는 혁신 기술 기업'
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

const INITIAL_COMPANIES: Company[] = [
  ...RAW_SUBSIDIARIES.map(name => createCompany(name, false, 'subsidiary')),
  ...RAW_PORTFOLIO.map(name => createCompany(name, false, 'portfolio'))
].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i); // Deduplicate

const TIPS_COOP = [
  "JC VALLEY", "경기테크노파크", "특허법인 이노", "수원대학교 창업지원단", "아이티엘",
  "시흥산업진흥원", "경기과학기술대학교 산학협력단", "한국공학대학교", 
  "피앤피인베스트먼트", "코맥스벤처러스", "벤처박스", "하이브워크", "한양대학교에리카 산학협력단"
];

const INITIAL_POSTS: Post[] = [
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
  }
];

const INITIAL_POPUPS: Popup[] = [
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

const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, name: '김철수', contact: '010-1234-5678', email: 'kim@example.com', content: '입주 관련 상담을 받고 싶습니다. 가능하면 빠른 답변 부탁드립니다.', date: '2025-02-20', status: '대기' },
  { id: 2, name: '이영희', contact: '010-9876-5432', email: 'lee@company.com', content: 'TIPS 프로그램 지원 절차 문의드립니다.', date: '2025-02-18', status: '완료' },
  { id: 3, name: '박민수', contact: '010-5555-4444', email: 'park@start.up', content: '투자 검토 요청드립니다.', date: '2025-02-15', status: '대기' },
];

const HISTORY_DATA = [
  {
    year: '2025',
    events: [
      { month: '09', title: '케이도움주기 투자조합 3호 결성 (예정)', desc: '중소벤처기업부, 4억원 규모' },
      { month: '06', title: '시흥창업펀드 결성 (예정)', desc: '중소벤처기업부, 70억원 규모' },
    ]
  },
  {
    year: '2024',
    events: [
      { month: '01', title: '케이도움주기 투자조합 2호 결성', desc: '중소벤처기업부, 3억원 규모' },
    ]
  },
  {
    year: '2022',
    events: [
      { month: '08', title: '대학창업투자조합 결성', desc: '교육부/한국벤처투자, 30억원 규모' },
      { month: '05', title: '케이도움주기 투자조합 1호 결성', desc: '중소벤처기업부, 3억원 규모' },
    ]
  },
  {
    year: '2018',
    events: [
      { month: '10', title: '케이이룸(K-IRUM) 개인투자조합 1호 결성', desc: '중소벤처기업부, 3억원 규모' },
    ]
  },
  {
    year: '2016',
    events: [
      { month: '04', title: '한국공학대학교 기술지주회사 설립', desc: '산학협력단 자회사' },
    ]
  },
  {
    year: '2015',
    events: [
      { month: '08', title: '(주)링크솔루션 자회사 편입', desc: '제1호 자회사, 7천만원 투자' },
    ]
  }
];

// --- Skeleton Components ---

const SkeletonLoader = () => (
  <div className="w-full animate-pulse space-y-12">
    <div className="flex flex-col items-center space-y-4 mb-16 opacity-50">
       <div className="h-4 bg-slate-300 rounded w-24"></div>
       <div className="h-10 bg-slate-300 rounded w-64"></div>
       <div className="h-1.5 bg-slate-300 rounded w-16"></div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
        <div className="h-64 bg-slate-200 rounded-2xl border border-slate-300/50"></div>
        <div className="h-64 bg-slate-200 rounded-2xl border border-slate-300/50"></div>
    </div>
    <div className="h-96 bg-slate-200 rounded-3xl border border-slate-300/50"></div>
  </div>
);

const HomeSkeleton = () => (
    <div className="animate-pulse bg-white min-h-screen">
        <div className="h-[600px] bg-slate-800 w-full relative overflow-hidden">
             <div className="absolute inset-0 bg-slate-700/50"></div>
             <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 flex flex-col justify-center h-full">
                 <div className="h-8 bg-slate-600 rounded-full w-48 mb-8"></div>
                 <div className="h-20 bg-slate-600 rounded-xl w-3/4 mb-8"></div>
                 <div className="h-6 bg-slate-600 rounded-xl w-1/2 mb-12"></div>
                 <div className="flex gap-5">
                     <div className="h-16 bg-slate-600 rounded-xl w-40"></div>
                     <div className="h-16 bg-slate-600/50 rounded-xl w-40"></div>
                 </div>
             </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24">
             <div className="grid lg:grid-cols-3 gap-12">
                 <div className="lg:col-span-3 h-80 bg-slate-200 rounded-2xl"></div>
                 <div className="lg:col-span-2 h-64 bg-slate-200 rounded-2xl"></div>
                 <div className="lg:col-span-1 h-64 bg-slate-200 rounded-2xl"></div>
             </div>
        </div>
    </div>
);

// --- Components ---

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }: any) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#003E7E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };

  const variants = {
    primary: "bg-[#003E7E] text-white hover:bg-[#002952] hover:shadow-lg shadow-md border border-transparent",
    secondary: "bg-white text-[#003E7E] border border-[#003E7E] hover:bg-slate-50 shadow-sm hover:shadow-md",
    outline: "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white backdrop-blur-sm",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
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
  <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
    {subtitle && (
      <span className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase block mb-3 animate-in slide-in-from-bottom-2 fade-in duration-500">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
      {title}
    </h2>
    <div className="w-16 h-1.5 bg-[#003E7E] mx-auto rounded-full"></div>
  </div>
);

const Card = ({ title, children, className = '' }: any) => (
  <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 p-8 transition-all duration-300 hover:-translate-y-1 ${className}`}>
    {title && <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">{title}</h3>}
    {children}
  </div>
);

const PostDetail = ({ post, type, onBack, onPostClick, allPosts }: { post: Post, type: string, onBack: () => void, onPostClick: (post: Post) => void, allPosts: Post[] }) => {
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mb-8 flex items-center justify-between">
         <button onClick={onBack} className="flex items-center text-slate-500 hover:text-[#003E7E] font-bold transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
         </button>
         <span className="text-sm font-medium text-slate-400">{type}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
         <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/30">
            <h1 className="text-3xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{post.title}</h1>
            <div className="flex flex-wrap gap-y-2 text-sm text-slate-500 font-medium">
               <div className="flex items-center mr-6">
                  <User className="w-4 h-4 mr-2 text-slate-400" /> {post.author || '관리자'}
               </div>
               <div className="flex items-center mr-6">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" /> {post.date}
               </div>
               <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-slate-400" /> {post.views?.toLocaleString() || 0}
               </div>
            </div>
         </div>

         <div className="p-8 md:p-10 min-h-[400px]">
            <div className="prose max-w-none text-slate-700 leading-8 whitespace-pre-wrap">
               {post.content}
            </div>
         </div>

         {(post.fileName || post.fileType) && (
             <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center"><Paperclip className="w-4 h-4 mr-2 text-[#003E7E]" /> 첨부파일</h4>
                <div className="flex flex-col gap-2">
                   <div className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-[#003E7E] cursor-pointer transition-colors group">
                      <FileIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003E7E] mr-3" />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex-grow truncate">
                         {post.fileName || `${post.title} 관련 첨부파일.${post.fileType?.toLowerCase() || 'pdf'}`}
                      </span>
                      <Download className="w-4 h-4 text-slate-300 group-hover:text-[#003E7E]" />
                   </div>
                </div>
             </div>
         )}

         <div className="border-t border-slate-100 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div 
                className={`flex-1 p-5 transition-colors flex items-center text-sm ${newerPost ? 'hover:bg-slate-50 cursor-pointer text-slate-600' : 'text-slate-300 cursor-default'}`}
                onClick={() => newerPost && onPostClick(newerPost)}
            >
               <ChevronLeft className="w-4 h-4 mr-2 flex-shrink-0" /> 
               <span className="font-bold mr-3">이전글</span>
               <span className="truncate">{newerPost ? newerPost.title : '이전 게시글이 없습니다.'}</span>
            </div>
             <div 
                className={`flex-1 p-5 transition-colors flex items-center justify-end text-sm ${olderPost ? 'hover:bg-slate-50 cursor-pointer text-slate-600' : 'text-slate-300 cursor-default'}`}
                onClick={() => olderPost && onPostClick(olderPost)}
             >
               <span className="truncate text-right">{olderPost ? olderPost.title : '다음 게시글이 없습니다.'}</span>
               <span className="font-bold ml-3">다음글</span>
               <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
            </div>
         </div>
      </div>
    </div>
  );
};


// --- Quick Menu ---
const QuickMenu = ({ onNavigate }: { onNavigate: (page: PageId, subPage?: string) => void }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[100] hidden md:flex flex-col gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all">
      {[
        { icon: Bell, label: "공지사항", action: () => onNavigate('news', 'notice') },
        { icon: Download, label: "자료실", action: () => onNavigate('news', 'resources') },
        { icon: ExternalLink, label: "창업보육센터", action: () => window.open('https://bi.tukorea.ac.kr', '_blank') },
        { icon: MessageCircle, label: "문의하기", action: () => onNavigate('contact') },
      ].map((item, idx) => (
        <div key={idx} className="group relative flex items-center justify-center">
          <button 
            onClick={item.action}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 bg-white shadow-sm border border-slate-100 hover:bg-[#003E7E] hover:text-white hover:border-[#003E7E] hover:shadow-lg hover:scale-105 transition-all duration-300 relative z-20"
          >
            <item.icon className="w-5 h-5" />
          </button>
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-xl translate-x-2 group-hover:translate-x-0 z-10">
             {item.label}
             <div className="absolute top-1/2 right-[-4px] -mt-1 border-4 border-transparent border-l-slate-900"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Popup Overlay ---
const PopupOverlay = ({ popups, onClose }: { popups: Popup[], onClose: (id: number, doNotShowToday: boolean) => void }) => {
    const activePopups = popups.filter(p => p.isVisible);
    if (activePopups.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center md:items-start md:justify-start md:p-10 gap-4 flex-wrap">
            {activePopups.map(popup => (
                <div key={popup.id} className="pointer-events-auto bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden w-full max-w-[350px] animate-in zoom-in-95 duration-300 flex flex-col">
                    {/* Image Area - 1:1 Ratio & Clickable */}
                    <div className="relative aspect-square bg-slate-100 group cursor-pointer" onClick={() => popup.link && window.open(popup.link, '_blank')}>
                        {popup.image ? (
                            <img src={popup.image} alt={popup.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ImageIcon className="w-12 h-12" />
                            </div>
                        )}
                        {/* Overlay hint if link exists */}
                        {popup.link && (
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="bg-slate-50 p-3 flex justify-between items-center text-xs border-t border-slate-100 mt-auto">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-900">
                            <input type="checkbox" className="rounded border-slate-300" onChange={(e) => { if(e.target.checked) onClose(popup.id, true) }} />
                            오늘 하루 보지 않기
                        </label>
                        <button onClick={() => onClose(popup.id, false)} className="font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded hover:bg-slate-100 transition-colors">닫기</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Admin Component ---

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 scrollbar-hide">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="font-bold text-lg text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminPage = ({ 
  companies, setCompanies, 
  posts, setPosts, 
  inquiries, setInquiries,
  popups, setPopups,
  onLogout 
}: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modals state
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);
  
  // State for viewing inquiry detail
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);

  // Editing state
  const [editingId, setEditingId] = useState<string | number | null>(null);

  // Filter state for posts
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');

  // Form states
  const [companyFormData, setCompanyFormData] = useState<Partial<Company>>({
      name: '', ceo: '', category: 'portfolio', business: '', foundedDate: '',
      room: '', moveInDate: '', homepage: '', note: '', isTips: false,
      logo: '', bgImage: '', shortDesc: ''
  });

  const [postFormData, setPostFormData] = useState<Partial<Post>>({
      title: '', author: '관리자', content: '', category: 'notice', fileName: ''
  });

  const [popupFormData, setPopupFormData] = useState<Partial<Popup>>({
      title: '', image: '', content: '', link: '', 
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isVisible: true
  });
  
  const TABS = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'companies', label: '자회사/기업 관리', icon: Building },
    { id: 'posts', label: '게시글(회사소식) 관리', icon: Bell },
    { id: 'popups', label: '팝업 관리', icon: Layers },
    { id: 'inquiries', label: '문의하기 관리', icon: Inbox },
  ];

  const POST_CATEGORIES = [
      { id: 'all', label: '전체' },
      { id: 'notice', label: '공지사항' },
      { id: 'press', label: '보도소식' },
      { id: 'resources', label: '자료실' },
      { id: 'faq', label: 'FAQ' },
  ];

  // --- Handlers ---

  const deleteCompany = (id: string) => setCompanies(companies.filter((c: Company) => c.id !== id));
  const deletePost = (id: number) => setPosts(posts.filter((n: Post) => n.id !== id));
  const deleteInquiry = (id: number) => {
      setInquiries(inquiries.filter((i: Inquiry) => i.id !== id));
      if (viewingInquiry?.id === id) setViewingInquiry(null);
  };
  const deletePopup = (id: number) => setPopups(popups.filter((p: Popup) => p.id !== id));
  
  const toggleInquiryStatus = (id: number) => {
    const updatedInquiries = inquiries.map((i: Inquiry) => i.id === id ? { ...i, status: i.status === '대기' ? '완료' : '대기' } : i);
    setInquiries(updatedInquiries);
    // Also update viewed inquiry if it's the one being toggled
    if (viewingInquiry && viewingInquiry.id === id) {
        setViewingInquiry(updatedInquiries.find(i => i.id === id) || null);
    }
  };
  
  const togglePopupVisibility = (id: number) => {
      setPopups(popups.map((p: Popup) => p.id === id ? { ...p, isVisible: !p.isVisible } : p));
  };

  // Company Handlers
  const openCompanyModal = (company?: Company) => {
      if (company) {
          setEditingId(company.id);
          setCompanyFormData(company);
      } else {
          setEditingId(null);
          setCompanyFormData({
            name: '', ceo: '', category: 'portfolio', business: '', 
            foundedDate: new Date().toISOString().split('T')[0],
            room: '', moveInDate: '', homepage: '', note: '', isTips: false,
            logo: '', bgImage: '', shortDesc: ''
          });
      }
      setIsCompanyModalOpen(true);
  };

  const handleSaveCompany = () => {
    if(!companyFormData.name) return alert("기업명을 입력해주세요");
    
    if (editingId) {
        setCompanies(companies.map((c: Company) => c.id === editingId ? { ...c, ...companyFormData } : c));
    } else {
        const newId = Date.now().toString();
        const newCompany = { ...companyFormData, id: newId } as Company;
        setCompanies([newCompany, ...companies]);
    }
    setIsCompanyModalOpen(false);
  };

  // Post Handlers
  const openPostModal = (post?: Post) => {
      if (post) {
          setEditingId(post.id);
          setPostFormData(post);
      } else {
          setEditingId(null);
          setPostFormData({ title: '', author: '관리자', content: '', category: 'notice', fileName: '' });
      }
      setIsPostModalOpen(true);
  };

  const handleSavePost = () => {
    if(!postFormData.title) return alert("제목을 입력해주세요");

    if (editingId) {
        setPosts(posts.map((p: Post) => p.id === editingId ? { ...p, ...postFormData } : p));
    } else {
        const newId = Date.now();
        const newPost = { 
            ...postFormData, 
            id: newId, 
            date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
            isNew: true,
            views: 0
        } as Post;
        setPosts([newPost, ...posts]);
    }
    setIsPostModalOpen(false);
  };

  // Popup Handlers
  const openPopupModal = (popup?: Popup) => {
      if(popup) {
          setEditingId(popup.id);
          setPopupFormData(popup);
      } else {
          setEditingId(null);
          setPopupFormData({
            title: '', image: '', content: '', link: '', 
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isVisible: true
          });
      }
      setIsPopupModalOpen(true);
  }

  const handleSavePopup = () => {
      if(!popupFormData.title) return alert("제목을 입력해주세요");
      
      if(editingId) {
          setPopups(popups.map((p: Popup) => p.id === editingId ? { ...p, ...popupFormData } : p));
      } else {
          const newId = Date.now();
          setPopups([...popups, { ...popupFormData, id: newId } as Popup]);
      }
      setIsPopupModalOpen(false);
  }

  const handleFileChange = (e: any, type: 'post' | 'company_logo' | 'company_bg' | 'popup_img') => {
      if(e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          // In a real app, upload to server and get URL. Here we simulate.
          if (type === 'post') setPostFormData({...postFormData, fileName: file.name});
          if (type === 'company_logo') setCompanyFormData({...companyFormData, logo: URL.createObjectURL(file)});
          if (type === 'company_bg') setCompanyFormData({...companyFormData, bgImage: URL.createObjectURL(file)});
          if (type === 'popup_img') setPopupFormData({...popupFormData, image: URL.createObjectURL(file)});
      }
  };

  const getFilteredPosts = () => {
      if(postCategoryFilter === 'all') return posts;
      return posts.filter((p: Post) => p.category === postCategoryFilter);
  };

  const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-transparent outline-none transition-all bg-white shadow-sm text-slate-800 placeholder-slate-400";
  const labelClass = "block text-sm font-bold text-slate-800 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#003E7E] text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-6 border-b border-blue-900">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5" /> 관리자 페이지
          </h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {/* Home Button in Sidebar */}
          <button 
            onClick={() => onLogout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-white/10 hover:text-white transition-colors mb-4 border border-white/10"
          >
            <Home className="w-5 h-5" />
            홈으로 이동
          </button>

          <div className="h-px bg-blue-800 my-2 mx-2"></div>

          {TABS.map(tab => (
             <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-white/10 font-bold text-white' : 'text-blue-200 hover:bg-white/5 hover:text-white'}`}
             >
               <tab.icon className="w-5 h-5" />
               {tab.label}
             </button>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-900">
          <button onClick={() => onLogout()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-900 hover:bg-blue-950 rounded-lg text-sm font-bold transition-colors">
            <LogOut className="w-4 h-4" /> 로그아웃
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 border-b border-slate-200 pb-4">
          {TABS.find(t => t.id === activeTab)?.label}
        </h1>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-500">등록된 기업</h3>
                  <Building className="w-6 h-6 text-[#003E7E]" />
                </div>
                <div className="text-3xl font-black text-slate-900">{companies.length}개</div>
                <div className="text-xs text-slate-400 mt-2">자회사 및 투자기업 포함</div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-500">총 게시글</h3>
                  <Bell className="w-6 h-6 text-[#003E7E]" />
                </div>
                <div className="text-3xl font-black text-slate-900">{posts.length}개</div>
                <div className="text-xs text-slate-400 mt-2">공지, 보도, 자료, FAQ 포함</div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-500">진행중인 팝업</h3>
                  <Layers className="w-6 h-6 text-[#003E7E]" />
                </div>
                <div className="text-3xl font-black text-slate-900">{popups.filter((p:Popup) => p.isVisible).length}건</div>
                <div className="text-xs text-slate-400 mt-2">홈페이지 노출 중</div>
             </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-slate-700">기업 목록</h3>
               <Button size="sm" onClick={() => openCompanyModal()}><Plus className="w-4 h-4 mr-1"/> 기업 추가</Button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">기업명</th>
                      <th className="px-6 py-4">대표자</th>
                      <th className="px-6 py-4">구분</th>
                      <th className="px-6 py-4">설립일</th>
                      <th className="px-6 py-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {companies.map((company: Company) => (
                      <tr key={company.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-800">{company.name}</td>
                        <td className="px-6 py-4 text-slate-600">{company.ceo}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${company.category === 'subsidiary' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                            {company.category === 'subsidiary' ? '자회사' : '투자기업'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{company.foundedDate}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openCompanyModal(company)} className="text-slate-400 hover:text-[#003E7E] transition-colors p-2">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteCompany(company.id)} className="text-slate-400 hover:text-red-600 transition-colors p-2">
                                <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
               <h3 className="font-bold text-slate-700 flex items-center">게시글 목록 <span className="ml-2 text-xs font-normal text-slate-500">({getFilteredPosts().length})</span></h3>
               <div className="flex items-center gap-3">
                   <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                       {POST_CATEGORIES.map(cat => (
                           <button 
                               key={cat.id}
                               onClick={() => setPostCategoryFilter(cat.id)}
                               className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${postCategoryFilter === cat.id ? 'bg-[#003E7E] text-white shadow-sm' : 'text-slate-500 hover:text-[#003E7E] hover:bg-slate-50'}`}
                           >
                               {cat.label}
                           </button>
                       ))}
                   </div>
                   <Button size="sm" onClick={() => openPostModal()}><Plus className="w-4 h-4 mr-1"/> 글쓰기</Button>
               </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 w-20">구분</th>
                      <th className="px-6 py-4">제목</th>
                      <th className="px-6 py-4">작성자</th>
                      <th className="px-6 py-4">작성일</th>
                      <th className="px-6 py-4 text-center">첨부</th>
                      <th className="px-6 py-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {getFilteredPosts().map((post: Post) => (
                      <tr key={post.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                {POST_CATEGORIES.find(c => c.id === post.category)?.label}
                            </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 max-w-xs truncate">{post.title}</td>
                        <td className="px-6 py-4 text-slate-600">{post.author}</td>
                        <td className="px-6 py-4 text-slate-500">{post.date}</td>
                        <td className="px-6 py-4 text-center">
                            {(post.fileName || post.fileType) && <Paperclip className="w-4 h-4 text-slate-400 mx-auto" />}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openPostModal(post)} className="text-slate-400 hover:text-[#003E7E] transition-colors p-2">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => deletePost(post.id)} className="text-slate-400 hover:text-red-600 transition-colors p-2">
                                <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'popups' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-700">팝업 관리</h3>
                    <Button size="sm" onClick={() => openPopupModal()}><Plus className="w-4 h-4 mr-1"/> 팝업 추가</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {popups.map((popup: Popup) => (
                        <div key={popup.id} className={`border rounded-xl overflow-hidden relative group ${popup.isVisible ? 'border-blue-200 shadow-sm' : 'border-slate-200 opacity-70'}`}>
                            <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden">
                                {popup.image ? (
                                    <img src={popup.image} alt={popup.title} className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-slate-300" />
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 truncate pr-2">{popup.title}</h4>
                                    <button onClick={() => togglePopupVisibility(popup.id)} className={`shrink-0 w-8 h-5 rounded-full relative transition-colors ${popup.isVisible ? 'bg-[#003E7E]' : 'bg-slate-300'}`}>
                                        <span className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${popup.isVisible ? 'left-4' : 'left-1'}`}></span>
                                    </button>
                                </div>
                                <div className="text-xs text-slate-500 space-y-1">
                                    <div>{popup.startDate} ~ {popup.endDate}</div>
                                    <div className="truncate">{popup.link || '링크 없음'}</div>
                                </div>
                                <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                                    <button onClick={() => openPopupModal(popup)} className="text-slate-400 hover:text-[#003E7E] text-xs font-bold flex items-center">
                                        <Edit className="w-3 h-3 mr-1" /> 수정
                                    </button>
                                    <button onClick={() => deletePopup(popup.id)} className="text-slate-400 hover:text-red-600 text-xs font-bold flex items-center ml-2">
                                        <Trash2 className="w-3 h-3 mr-1" /> 삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-200 bg-slate-50">
               <h3 className="font-bold text-slate-700">문의 내역</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 w-20">상태</th>
                      <th className="px-6 py-4">이름 (연락처)</th>
                      <th className="px-6 py-4">내용</th>
                      <th className="px-6 py-4">작성일</th>
                      <th className="px-6 py-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.map((inquiry: Inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => toggleInquiryStatus(inquiry.id)}
                            className={`px-2 py-1 rounded text-xs font-bold border ${inquiry.status === '대기' ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'} transition-colors`}
                          >
                            {inquiry.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-slate-800">
                          <div className="font-bold">{inquiry.name}</div>
                          <div className="text-xs text-slate-400">{inquiry.contact}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{inquiry.content}</td>
                        <td className="px-6 py-4 text-slate-500">{inquiry.date}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                              <button onClick={() => setViewingInquiry(inquiry)} className="text-slate-400 hover:text-[#003E7E] transition-colors p-2" title="자세히 보기">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteInquiry(inquiry.id)} className="text-slate-400 hover:text-red-600 transition-colors p-2" title="삭제">
                                <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {viewingInquiry && (
          <Modal isOpen={true} onClose={() => setViewingInquiry(null)} title="문의 내용 상세">
              <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                          <div className="text-sm text-slate-500 mb-1">보낸 사람</div>
                          <div className="font-bold text-lg text-slate-900">{viewingInquiry.name}</div>
                      </div>
                      <div className="text-right">
                          <button 
                            onClick={() => toggleInquiryStatus(viewingInquiry.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${viewingInquiry.status === '대기' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}
                          >
                            {viewingInquiry.status}
                          </button>
                          <div className="text-xs text-slate-400 mt-2">{viewingInquiry.date}</div>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs font-bold text-slate-500 mb-1 flex items-center"><Phone className="w-3 h-3 mr-1"/> 연락처</div>
                          <div className="text-slate-800">{viewingInquiry.contact}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="text-xs font-bold text-slate-500 mb-1 flex items-center"><Mail className="w-3 h-3 mr-1"/> 이메일</div>
                          <div className="text-slate-800 truncate" title={viewingInquiry.email}>{viewingInquiry.email}</div>
                      </div>
                  </div>

                  <div>
                      <div className="text-sm font-bold text-slate-700 mb-2">문의 내용</div>
                      <div className="bg-white border border-slate-200 p-4 rounded-lg text-slate-600 leading-relaxed whitespace-pre-wrap min-h-[150px]">
                          {viewingInquiry.content}
                      </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                      <Button variant="ghost" onClick={() => deleteInquiry(viewingInquiry.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">삭제하기</Button>
                      <Button onClick={() => setViewingInquiry(null)}>닫기</Button>
                  </div>
              </div>
          </Modal>
      )}

      {/* Add/Edit Company Modal */}
      <Modal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)} title={editingId ? "기업 정보 수정" : "기업 추가"}>
          <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className={labelClass}>기업명 *</label>
                      <input type="text" className={inputClass} value={companyFormData.name} onChange={e => setCompanyFormData({...companyFormData, name: e.target.value})} placeholder="예: (주)한국기술" />
                  </div>
                  <div>
                      <label className={labelClass}>대표자 *</label>
                      <input type="text" className={inputClass} value={companyFormData.ceo} onChange={e => setCompanyFormData({...companyFormData, ceo: e.target.value})} placeholder="성명" />
                  </div>
              </div>
              
              <div>
                  <label className={labelClass}>한줄 소개</label>
                  <input type="text" className={inputClass} value={companyFormData.shortDesc || ''} onChange={e => setCompanyFormData({...companyFormData, shortDesc: e.target.value})} placeholder="기업을 소개하는 짧은 문구" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>로고 이미지</label>
                        <div className="flex items-center gap-2 mb-2">
                            <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200">
                                파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'company_logo')} accept="image/*" />
                            </label>
                            <input type="text" className={`${inputClass} text-xs py-2`} value={companyFormData.logo || ''} onChange={e => setCompanyFormData({...companyFormData, logo: e.target.value})} placeholder="URL 직접 입력" />
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center">
                            <HelpCircle className="w-3 h-3 mr-1" /> 권장: 500x500px (1:1 비율), PNG/JPG
                        </p>
                    </div>
                    <div>
                        <label className={labelClass}>배경 이미지</label>
                        <div className="flex items-center gap-2 mb-2">
                            <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200">
                                파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'company_bg')} accept="image/*" />
                            </label>
                            <input type="text" className={`${inputClass} text-xs py-2`} value={companyFormData.bgImage || ''} onChange={e => setCompanyFormData({...companyFormData, bgImage: e.target.value})} placeholder="URL 직접 입력" />
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center">
                            <HelpCircle className="w-3 h-3 mr-1" /> 권장: 1920x1080px (16:9 비율), 고해상도
                        </p>
                    </div>
                </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className={labelClass}>구분 *</label>
                      <select className={inputClass} value={companyFormData.category} onChange={e => setCompanyFormData({...companyFormData, category: e.target.value as any})}>
                          <option value="portfolio">투자기업</option>
                          <option value="subsidiary">자회사</option>
                      </select>
                  </div>
                  <div>
                      <label className={labelClass}>설립일</label>
                      <input type="date" className={inputClass} value={companyFormData.foundedDate} onChange={e => setCompanyFormData({...companyFormData, foundedDate: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className={labelClass}>주요사업 *</label>
                  <input type="text" className={inputClass} value={companyFormData.business} onChange={e => setCompanyFormData({...companyFormData, business: e.target.value})} placeholder="예: AI 기반 솔루션 개발" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className={labelClass}>입주호실</label>
                      <input type="text" className={inputClass} value={companyFormData.room} onChange={e => setCompanyFormData({...companyFormData, room: e.target.value})} placeholder="예: P동 301호" />
                  </div>
                  <div>
                      <label className={labelClass}>입주일</label>
                      <input type="date" className={inputClass} value={companyFormData.moveInDate} onChange={e => setCompanyFormData({...companyFormData, moveInDate: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className={labelClass}>홈페이지</label>
                  <input type="text" className={inputClass} value={companyFormData.homepage} onChange={e => setCompanyFormData({...companyFormData, homepage: e.target.value})} placeholder="https://" />
              </div>
              <div>
                  <label className={labelClass}>비고 / 상세소개</label>
                  <textarea rows={3} className={inputClass} value={companyFormData.note} onChange={e => setCompanyFormData({...companyFormData, note: e.target.value})} placeholder="기업에 대한 상세 설명을 입력하세요"></textarea>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <input type="checkbox" id="isTips" className="w-5 h-5 rounded border-gray-300 text-[#003E7E] focus:ring-[#003E7E]" checked={companyFormData.isTips} onChange={e => setCompanyFormData({...companyFormData, isTips: e.target.checked})} />
                  <label htmlFor="isTips" className="text-sm font-bold text-[#003E7E] cursor-pointer">TIPS 선정 기업</label>
              </div>
              <Button className="w-full mt-4" onClick={handleSaveCompany}>{editingId ? '수정하기' : '추가하기'}</Button>
          </div>
      </Modal>

      {/* Add/Edit Post Modal */}
      <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} title={editingId ? "게시글 수정" : "게시글 작성"}>
          <div className="space-y-5">
              <div>
                  <label className={labelClass}>카테고리 *</label>
                  <select className={inputClass} value={postFormData.category} onChange={e => setPostFormData({...postFormData, category: e.target.value as any})}>
                      {POST_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                  </select>
              </div>
              <div>
                  <label className={labelClass}>제목 *</label>
                  <input type="text" className={inputClass} value={postFormData.title} onChange={e => setPostFormData({...postFormData, title: e.target.value})} placeholder="제목을 입력하세요" />
              </div>
              <div>
                  <label className={labelClass}>작성자</label>
                  <input type="text" className={inputClass} value={postFormData.author} onChange={e => setPostFormData({...postFormData, author: e.target.value})} />
              </div>
              <div>
                  <label className={labelClass}>내용 *</label>
                  <textarea rows={8} className={inputClass} value={postFormData.content} onChange={e => setPostFormData({...postFormData, content: e.target.value})} placeholder="내용을 입력하세요"></textarea>
              </div>
              <div>
                  <label className={labelClass}>첨부파일</label>
                  <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-slate-100 text-slate-600 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors text-sm font-bold flex items-center shrink-0">
                          <Paperclip className="w-4 h-4 mr-2"/>
                          파일 선택
                          <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'post')} />
                      </label>
                      <div className="flex items-center gap-2 overflow-hidden">
                          <span className="text-sm text-slate-500 truncate">{postFormData.fileName || "선택된 파일 없음"}</span>
                          {postFormData.fileName && (
                              <button onClick={() => setPostFormData({...postFormData, fileName: ''})} className="text-red-500 hover:text-red-700">
                                  <XCircle className="w-4 h-4" />
                              </button>
                          )}
                      </div>
                  </div>
              </div>
              <Button className="w-full mt-4" onClick={handleSavePost}>{editingId ? '수정완료' : '작성완료'}</Button>
          </div>
      </Modal>

      {/* Add/Edit Popup Modal */}
      <Modal isOpen={isPopupModalOpen} onClose={() => setIsPopupModalOpen(false)} title={editingId ? "팝업 수정" : "팝업 추가"}>
          <div className="space-y-5">
              <div>
                  <label className={labelClass}>팝업 제목 *</label>
                  <input type="text" className={inputClass} value={popupFormData.title} onChange={e => setPopupFormData({...popupFormData, title: e.target.value})} placeholder="관리용 제목" />
              </div>
              <div>
                  <label className={labelClass}>이미지 URL</label>
                  <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 shrink-0">
                            파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'popup_img')} accept="image/*" />
                        </label>
                       <input type="text" className={inputClass} value={popupFormData.image || ''} onChange={e => setPopupFormData({...popupFormData, image: e.target.value})} placeholder="https://" />
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className={labelClass}>시작일</label>
                      <input type="date" className={inputClass} value={popupFormData.startDate} onChange={e => setPopupFormData({...popupFormData, startDate: e.target.value})} />
                  </div>
                  <div>
                      <label className={labelClass}>종료일</label>
                      <input type="date" className={inputClass} value={popupFormData.endDate} onChange={e => setPopupFormData({...popupFormData, endDate: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className={labelClass}>링크 (선택)</label>
                  <input type="text" className={inputClass} value={popupFormData.link} onChange={e => setPopupFormData({...popupFormData, link: e.target.value})} placeholder="클릭 시 이동할 URL" />
              </div>
              <div>
                  <label className={labelClass}>내용 (선택)</label>
                  <textarea rows={3} className={inputClass} value={popupFormData.content} onChange={e => setPopupFormData({...popupFormData, content: e.target.value})} placeholder="이미지가 없을 경우 표시될 텍스트"></textarea>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <input type="checkbox" id="popupVisible" className="w-5 h-5" checked={popupFormData.isVisible} onChange={e => setPopupFormData({...popupFormData, isVisible: e.target.checked})} />
                  <label htmlFor="popupVisible" className="font-bold text-slate-700 cursor-pointer">즉시 게시 (활성화)</label>
              </div>
              <Button className="w-full mt-4" onClick={handleSavePopup}>{editingId ? '수정완료' : '추가하기'}</Button>
          </div>
      </Modal>
    </div>
  );
};

// --- Layout Components ---

const Header = ({ activePage, activeSubPage, onNavigate, hasHero }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<PageId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = hasHero && !scrolled;

  if (activePage === 'admin') return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isTransparent
          ? 'bg-transparent py-4' 
          : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/40 border-b border-slate-200/60 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div 
            className="flex items-center cursor-pointer group gap-3.5"
            onClick={() => onNavigate('home')}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-colors duration-300 ${
              isTransparent 
                ? 'bg-white text-[#003E7E]' 
                : 'bg-[#003E7E] text-white shadow-blue-900/20 group-hover:bg-[#002952]'
            }`}>
              <Building className="w-6 h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`font-black text-xl leading-none tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-[#003E7E]'
              }`}>한국공학대학교</span>
              <span className={`text-[11px] font-bold tracking-[0.25em] mt-0.5 uppercase transition-colors duration-300 ${
                isTransparent ? 'text-blue-100' : 'text-slate-500'
              }`}>기술지주회사</span>
            </div>
          </div>

          <nav className="hidden md:flex h-full items-center gap-2">
            {MENU_STRUCTURE.map((item) => (
              <div 
                key={item.id}
                className="relative h-full flex items-center justify-center group/nav"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  className={`relative px-5 py-2.5 text-[16px] transition-all duration-300 rounded-md ${
                    activePage === item.id 
                      ? 'font-bold' 
                      : 'font-medium'
                  } ${
                    isTransparent 
                      ? (activePage === item.id ? 'text-white' : 'text-white/80 hover:text-white')
                      : (activePage === item.id ? 'text-[#003E7E]' : 'text-slate-600 hover:text-[#003E7E]')
                  }`}
                  onClick={() => onNavigate(item.id, item.subItems?.[0]?.id)}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activePage === item.id 
                      ? `opacity-100 scale-100 ${isTransparent ? 'bg-white' : 'bg-[#003E7E]'}` 
                      : `opacity-0 scale-0 group-hover/nav:opacity-100 group-hover/nav:scale-100 ${isTransparent ? 'bg-white' : 'bg-[#003E7E]'}`
                  }`}></span>
                </button>
                
                {item.subItems && hoveredMenu === item.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-3 w-64 z-50">
                    <div className="bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-lg border border-slate-100 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#003E7E]"></div>
                      <div className="py-2.5">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            className="relative block w-full text-left px-7 py-3.5 text-[15px] text-slate-500 hover:text-[#003E7E] hover:bg-slate-50 hover:font-bold transition-all duration-200 group/item"
                            onClick={() => onNavigate(item.id, sub.id)}
                          >
                            <span className="relative z-10">{sub.label}</span>
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#003E7E] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className={`h-5 w-px mx-5 transition-colors duration-300 ${isTransparent ? 'bg-white/30' : 'bg-slate-200'}`}></div>
            
            <a href="https://bi.tukorea.ac.kr" target="_blank" rel="noreferrer" className={`flex items-center px-4 py-2 rounded-full text-xs font-bold border transition-all uppercase tracking-wide group ${
              isTransparent 
                ? 'bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#003E7E]' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#003E7E] hover:text-[#003E7E]'
            }`}>
              창업보육센터 <ExternalLink className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          <button 
            className={`md:hidden p-2 transition-colors rounded-lg ${
              isTransparent 
                ? 'text-white hover:bg-white/10' 
                : 'text-slate-600 hover:text-[#003E7E] hover:bg-slate-50'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-2xl h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-5 duration-300 text-slate-900">
          <div className="px-5 py-6 space-y-6">
            {MENU_STRUCTURE.map((item) => (
              <div key={item.id} className="space-y-3">
                <button
                  className="w-full text-left font-black text-xl py-2 border-l-4 border-transparent hover:border-[#003E7E] pl-2 hover:pl-4 transition-all duration-300 flex items-center justify-between group"
                  onClick={() => {
                    onNavigate(item.id, item.subItems?.[0]?.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="group-hover:text-[#003E7E] transition-colors">{item.label}</span>
                  {item.subItems && <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-[#003E7E]" />}
                </button>
                {item.subItems && (
                  <div className="pl-4 grid grid-cols-2 gap-2">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        className="text-left text-sm text-slate-500 py-3 px-4 bg-slate-50 rounded-lg hover:bg-blue-50 hover:text-[#003E7E] hover:font-bold transition-all"
                        onClick={() => {
                          onNavigate(item.id, sub.id);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {sub.label}
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

const Footer = ({ onAdminLogin }: { onAdminLogin: () => void }) => {
  const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <footer className="bg-slate-900 text-slate-400 py-16 text-sm antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-12 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center gap-8 w-full md:w-auto">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6" />
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-bold text-lg leading-none">한국공학대학교</span>
                 <span className="text-slate-400 font-medium text-xs tracking-wider mt-1">기술지주회사</span>
               </div>
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-400 md:ml-8">
              <a href="#" className="hover:text-white transition-colors">개인정보취급방침</a>
              <a href="#" className="hover:text-white transition-colors">정보보호실천수칙</a>
              <a href="#" className="hover:text-white transition-colors">홈페이지운영지침</a>
            </div>
          </div>

          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button 
              onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
              className="w-full flex justify-between items-center border border-slate-700 rounded-lg px-4 py-3 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700 transition-all"
            >
              <span className="text-xs font-medium">TUKOREA 관련기관 링크</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFamilySiteOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFamilySiteOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-slate-800 border border-slate-700 shadow-2xl rounded-lg max-h-60 overflow-y-auto text-xs z-50">
                {familySites.map((site, idx) => (
                  <a key={idx} href="#" className="block px-4 py-3 hover:bg-slate-700 hover:text-white border-b border-slate-700/50 last:border-0 text-slate-400 transition-colors">
                    {site}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-500 leading-relaxed">
          <div className="space-y-2">
            <p className="font-bold text-slate-300 text-sm mb-2">한국공학대학교 기술지주회사</p>
            <p>경기도 시흥시 산기대학로 237 시흥비즈니스센터 7층</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span><strong className="text-slate-400">T.</strong> 031-8041-0965</span>
              <span><strong className="text-slate-400">F.</strong> 031-8041-0899</span>
              <span><strong className="text-slate-400">E.</strong> tuholdings@tukorea.ac.kr</span>
            </div>
          </div>
          <div className="md:text-right flex flex-col justify-end">
            <p className="text-slate-600 mb-2">Copyright© 2024 Tech University of Korea Holdings. All Rights Reserved.</p>
            <button onClick={onAdminLogin} className="self-end text-slate-700 hover:text-slate-500 transition-colors flex items-center gap-1 text-[10px]">
              <Lock className="w-3 h-3" /> 관리자 로그인
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ onNavigate, onCompanyClick, onPostClick, notices }: any) => {
    const stats = [
        { label: "운용자산", value: "113", unit: "억원" },
        { label: "투자조합", value: "6", unit: "개" },
        { label: "자회사", value: "16", unit: "개" },
        { label: "투자기업", value: "21", unit: "개" },
    ];

    return (
        <div className="flex flex-col w-full">
            <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/50 to-slate-900"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-blue-200 text-sm font-bold tracking-widest uppercase animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
                        Tech University of Korea Holdings
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
                        기술의 가치를 <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">비즈니스로 연결합니다</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
                        한국공학대학교 기술지주회사는 대학의 우수한 연구성과를 발굴하고<br className="hidden md:block"/> 
                        직접 사업화를 통해 기술창업 생태계를 선도합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
                        <Button size="lg" onClick={() => onNavigate('investment', 'fields')}>투자분야 보기</Button>
                        <Button variant="outline" size="lg" onClick={() => onNavigate('about', 'overview')}>회사소개</Button>
                    </div>
                </div>
                
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                    <ArrowDown className="w-6 h-6" />
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="text-4xl md:text-5xl font-black text-[#003E7E] mb-2">{stat.value}<span className="text-2xl ml-1 text-slate-400 font-bold">{stat.unit}</span></div>
                                <div className="text-slate-600 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionTitle title="주요 투자 분야" subtitle="Investment Focus" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "딥테크 (Deep Tech)", desc: "AI, 로봇, 반도체 등 고도의 기술력이 필요한 분야", icon: Target },
                            { title: "디지털 헬스케어", desc: "데이터 기반의 맞춤형 의료/건강관리 서비스", icon: CheckCircle2 },
                            { title: "친환경/에너지", desc: "탄소중립 실현을 위한 신재생 에너지 및 친환경 소재", icon: Sprout }
                        ].map((item, idx) => (
                            <Card key={idx} className="hover:-translate-y-2">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-[#003E7E] mb-6">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button variant="secondary" onClick={() => onNavigate('investment', 'fields')}>자세히 보기 <ArrowRight className="w-4 h-4 ml-2"/></Button>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                         <div>
                            <span className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase block mb-3">News & Notice</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">회사 소식</h2>
                         </div>
                         <button onClick={() => onNavigate('news', 'notice')} className="text-slate-500 font-bold hover:text-[#003E7E] flex items-center transition-colors">
                            전체보기 <ArrowRight className="w-4 h-4 ml-2" />
                         </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {notices.slice(0, 3).map((notice: Post) => (
                            <div key={notice.id} onClick={() => onPostClick(notice, '공지사항')} className="group cursor-pointer">
                                <div className="aspect-[4/3] bg-slate-100 rounded-2xl mb-6 relative overflow-hidden">
                                     <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                                         {notice.date}
                                     </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#003E7E] transition-colors line-clamp-2">{notice.title}</h3>
                                <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">{notice.content?.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const SubPageHeader = ({ title, parent, menuItems, activeSub, onSubNav }: any) => {
  return (
    <div className="bg-[#003E7E] pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <span className="text-blue-200 font-bold tracking-widest text-xs uppercase mb-4 block">{parent}</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tight">{title}</h1>
            {menuItems && (
                <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    {menuItems.map((item: any) => (
                        <button
                            key={item.id}
                            onClick={() => onSubNav(item.id)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                                activeSub === item.id 
                                ? 'bg-white text-[#003E7E] shadow-lg' 
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

const CompanyDetail = ({ company, onBack }: { company: Company, onBack: () => void }) => {
    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button onClick={onBack} className="flex items-center text-slate-500 hover:text-[#003E7E] font-bold mb-8 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
            </button>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="h-64 bg-slate-800 relative">
                     {company.bgImage ? (
                         <>
                            <img src={company.bgImage} alt="background" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                         </>
                     ) : (
                         <div className="absolute inset-0 bg-slate-800"></div>
                     )}
                     
                     <div className="absolute -bottom-10 left-10 flex items-end gap-6">
                         <div className="w-32 h-32 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                            {company.logo ? (
                                <img src={company.logo} alt="logo" className="w-full h-full object-contain p-2" />
                            ) : (
                                <Building className="w-12 h-12 text-slate-300" />
                            )}
                         </div>
                         <div className="mb-4 text-white">
                             <h1 className="text-4xl font-black mb-2 shadow-sm">{company.name}</h1>
                             <p className="text-lg opacity-90 font-medium">{company.shortDesc || company.business}</p>
                         </div>
                     </div>
                </div>
                <div className="pt-20 pb-10 px-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex gap-2 mb-3">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${company.category === 'subsidiary' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                    {company.category === 'subsidiary' ? 'subsidiary' : 'portfolio'}
                                </span>
                                {company.isTips && <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600">TIPS</span>}
                            </div>
                            <p className="text-xl text-slate-500 font-medium">{company.business}</p>
                        </div>
                        {company.homepage && (
                             <a href={company.homepage} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-slate-50 hover:bg-[#003E7E] hover:text-white rounded-full transition-all text-slate-400 border border-slate-100">
                                <ExternalLink className="w-5 h-5" />
                             </a>
                        )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-slate-100">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center"><User className="w-5 h-5 mr-2 text-[#003E7E]" /> 기업 정보</h3>
                            <div className="space-y-4">
                                <div className="flex border-b border-slate-50 pb-3">
                                    <span className="w-32 text-slate-500 font-medium text-sm">대표자</span>
                                    <span className="text-slate-900 font-bold">{company.ceo}</span>
                                </div>
                                <div className="flex border-b border-slate-50 pb-3">
                                    <span className="w-32 text-slate-500 font-medium text-sm">설립일</span>
                                    <span className="text-slate-900 font-bold">{company.foundedDate}</span>
                                </div>
                                <div className="flex border-b border-slate-50 pb-3">
                                    <span className="w-32 text-slate-500 font-medium text-sm">입주정보</span>
                                    <span className="text-slate-900 font-bold">{company.room} (입주: {company.moveInDate})</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-[#003E7E]" /> 기업 소개</h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {company.note === '-' ? `${company.name}은(는) ${company.business} 분야에서 혁신적인 솔루션을 제공하는 기업입니다.` : company.note}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AboutContent = ({ subPage }: { subPage: string }) => {
    if (subPage === 'history') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {HISTORY_DATA.map((yearItem, idx) => (
                         <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 group-[.is-active]:bg-[#003E7E] text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <div className="text-[10px] font-bold">{yearItem.year.slice(2)}</div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all">
                                <div className="text-2xl font-black text-[#003E7E] mb-4">{yearItem.year}</div>
                                <div className="space-y-4">
                                    {yearItem.events.map((event, eIdx) => (
                                        <div key={eIdx} className="flex gap-4">
                                            <div className="font-bold text-slate-400 w-12 shrink-0 pt-0.5">{event.month}월</div>
                                            <div>
                                                <div className="font-bold text-slate-800">{event.title}</div>
                                                <div className="text-sm text-slate-500 mt-1">{event.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (subPage === 'overview') {
        return (
            <div className="space-y-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">기술이 가치를 만나는 곳,<br/>한국공학대학교 기술지주회사</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        대학이 보유한 우수한 연구성과를 발굴하고, <br className="hidden md:block"/>
                        직접 사업화를 통해 기술창업 활성화와 국가 산업 발전에 기여합니다.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                     {[
                         { icon: Lightbulb, title: "기술발굴", desc: "대학 내 우수 연구성과 및 유망기술 발굴" },
                         { icon: Rocket, title: "직접사업화", desc: "자회사 설립 및 육성을 통한 기술 사업화" },
                         { icon: TrendingUp, title: "수익창출", desc: "기술사업화 수익의 연구개발 재투자 선순환" }
                     ].map((item, i) => (
                         <Card key={i} className="text-center h-full">
                             <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#003E7E]">
                                 <item.icon className="w-8 h-8" />
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                             <p className="text-slate-600">{item.desc}</p>
                         </Card>
                     ))}
                </div>
            </div>
        );
    }

    if (subPage === 'location') {
        return (
            <div className="space-y-12">
                <div className="bg-slate-100 rounded-3xl h-[400px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-200"></div>
                    <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg max-w-sm text-center">
                        <MapPin className="w-10 h-10 text-[#003E7E] mx-auto mb-4" />
                        <h3 className="font-bold text-xl text-slate-900 mb-2">본사 위치</h3>
                        <p className="text-slate-600 mb-4">경기도 시흥시 산기대학로 237 <br/>시흥비즈니스센터 7층</p>
                        <Button size="sm" onClick={() => window.open('https://map.kakao.com', '_blank')}>지도 보기</Button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

const InvestmentContent = ({ subPage }: { subPage: string }) => {
    if (subPage === 'process') {
         return (
             <div className="max-w-5xl mx-auto">
                 <div className="grid gap-8">
                     {[
                         { step: "01", title: "투자상담", desc: "사업계획서 접수 및 기초 상담" },
                         { step: "02", title: "IR 및 예비심사", desc: "기업 현황 파악 및 예비 투자심의위원회" },
                         { step: "03", title: "본심사", desc: "본 투자심의위원회 개최 및 투자 승인" },
                         { step: "04", title: "투자집행", desc: "계약 체결 및 납입" },
                         { step: "05", title: "사후관리", desc: "기업 성장 지원 및 모니터링" }
                     ].map((item, idx) => (
                         <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-[#003E7E] transition-colors">
                             <div className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors absolute right-4 bottom-[-10px] scale-150 z-0">{item.step}</div>
                             <div className="w-12 h-12 rounded-full bg-[#003E7E] text-white flex items-center justify-center font-bold text-lg relative z-10 shrink-0">
                                 {item.step}
                             </div>
                             <div className="relative z-10">
                                 <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                                 <p className="text-slate-500 font-medium">{item.desc}</p>
                             </div>
                             {idx !== 4 && <div className="absolute left-12 top-16 w-0.5 h-8 bg-slate-200 -ml-px hidden md:block"></div>}
                         </div>
                     ))}
                 </div>
             </div>
         );
    }
    
    if (subPage === 'tips') {
        return (
            <div className="space-y-12">
                <div className="bg-[#003E7E] rounded-3xl p-10 md:p-16 text-white text-center">
                    <h2 className="text-3xl font-black mb-6">TIPS 프로그램</h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        TIPS(Tech Incubator Program for Startup)는 세계시장을 선도할 기술아이템을 보유한 창업팀을 민간 주도로 선발하여 미래유망 창업기업을 집중 육성하는 프로그램입니다.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card title="운영사 컨소시엄">
                        <div className="flex flex-wrap gap-2">
                             {TIPS_COOP.map((partner, idx) => (
                                 <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold border border-slate-100">
                                     {partner}
                                 </span>
                             ))}
                        </div>
                    </Card>
                    <Card title="지원 혜택">
                        <ul className="space-y-4">
                            {[
                                "R&D 자금 최대 5억원 지원",
                                "창업사업화 자금 최대 1억원",
                                "해외마케팅 자금 최대 1억원",
                                "엔젤투자매칭펀드 연계 투자",
                                "보육공간 제공 및 멘토링"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center text-slate-600 font-medium">
                                    <CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        );
    }

    if (subPage === 'growth') {
        return (
            <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto mb-12">
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">TU-RN Up 프로그램</h2>
                     <p className="text-slate-600">한국공학대학교 기술지주회사만의 독창적인 스타트업 엑셀러레이팅 프로그램입니다.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "기술 고도화", desc: "대학 보유 특허 매칭 및 기술 이전 지원", icon: Settings },
                        { title: "시장 검증", desc: "BM 고도화 및 시장 실증(PoC) 지원", icon: SearchCheck },
                        { title: "투자 유치", desc: "데모데이 개최 및 후속 투자 연계", icon: Handshake }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-[#003E7E] rounded-full flex items-center justify-center mb-6">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (subPage === 'fields') {
         return (
             <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: TrendingUp, title: "IT/SW", desc: "인공지능, 빅데이터, 클라우드, 사물인터넷 등 4차 산업혁명 핵심 기술 분야" },
                        { icon: Target, title: "바이오/헬스케어", desc: "디지털 헬스케어, 의료기기, 바이오 소재 등 국민 건강 증진을 위한 혁신 기술" },
                        { icon: Briefcase, title: "제조/소재/부품", desc: "첨단 제조 공정, 신소재, 고기능성 부품 등 산업 경쟁력 강화를 위한 기반 기술" }
                    ].map((item, idx) => (
                        <Card key={idx} className="text-center p-12 h-full flex flex-col items-center hover:border-blue-200 group">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-[#003E7E] shadow-inner group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg tracking-tight">{item.desc}</p>
                        </Card>
                    ))}
                 </div>
                 
                 <div className="bg-slate-50 rounded-3xl p-6 md:p-12 border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <SectionTitle title="투자 조합 운용 현황" subtitle="Investment Funds" />
                        
                        {/* Desktop Table View (Visible on LG and larger) */}
                        <div className="hidden lg:block overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
                            <table className="min-w-full text-sm text-left border-collapse">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="px-8 py-6 font-bold border-b border-slate-200 w-[35%]">구분</th>
                                        <th className="px-6 py-6 font-bold border-b border-slate-200 text-center w-[15%]">소관부처</th>
                                        <th className="px-6 py-6 font-bold border-b border-slate-200 text-right w-[15%]">결성규모</th>
                                        <th className="px-6 py-6 font-bold border-b border-slate-200 text-center w-[10%]">진행현황</th>
                                        <th className="px-8 py-6 font-bold border-b border-slate-200 text-right w-[25%]">운용기간</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {FUNDS_DATA.map((fund, idx) => (
                                        <tr key={idx} className="group hover:bg-blue-50/30 transition-colors duration-200">
                                            <td className="px-8 py-6 align-middle">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003E7E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#003E7E] group-hover:text-white transition-all duration-300 shadow-sm">
                                                        <PieChart className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-slate-800 text-base tracking-tight group-hover:text-[#003E7E] transition-colors">{fund.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center align-middle">
                                                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                                                    {fund.agency.split('(')[0]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 align-middle text-right">
                                                <span className="font-extrabold text-[#003E7E] text-lg whitespace-nowrap">{fund.size}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center align-middle">
                                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100 shadow-sm whitespace-nowrap">
                                                    <span className="relative flex h-2 w-2">
                                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                    </span>
                                                    {fund.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-slate-500 text-right font-mono text-sm tracking-tight align-middle whitespace-nowrap">
                                                {fund.period}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile/Tablet Card View (Visible on smaller than LG) */}
                        <div className="lg:hidden space-y-4">
                            {FUNDS_DATA.map((fund, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
                                    
                                    <div className="flex justify-between items-start gap-4 relative z-10">
                                        <div className="flex items-center gap-3.5 w-full">
                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-white text-[#003E7E] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                                                <PieChart className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col flex-grow min-w-0">
                                                <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 pr-8 truncate">{fund.name}</h4>
                                                <span className="text-xs font-bold text-slate-400 truncate">{fund.agency}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">결성규모</span>
                                            <span className="text-xl font-black text-[#003E7E]">{fund.size}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 items-end">
                                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">상태</span>
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                                                <span className="relative flex h-1.5 w-1.5">
                                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                                </span>
                                                {fund.status}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-1 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">운용기간</span>
                                            <span className="text-sm font-mono text-slate-600 font-medium">{fund.period}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-right text-slate-500 font-bold mt-8 flex justify-end items-center text-sm">
                          <Briefcase className="w-4 h-4 mr-2 text-[#003E7E]" /> 총 <span className="text-[#003E7E] mx-1">6개</span> 투자조합 운용 중 / 총 <span className="text-[#003E7E] mx-1">113억원</span> 규모
                        </p>
                    </div>
                 </div>
             </div>
         )
     }

    return null;
}

const SubsidiaryContent = ({ subPage }: { subPage: string }) => {
    if (subPage === 'procedure') {
        return (
             <div className="max-w-4xl mx-auto">
                 <div className="relative border-l-2 border-slate-200 ml-6 md:ml-0 space-y-12 py-4">
                     {[
                         { title: "기술 발굴 및 매칭", desc: "대학 보유 유망 기술 탐색 및 예비 창업자 매칭" },
                         { title: "사업성 검토", desc: "기술가치평가 및 사업계획서 수립" },
                         { title: "이사회 승인", desc: "기술지주회사 이사회 심의 및 승인" },
                         { title: "법인 설립", desc: "자본금 납입 및 법인 등기 (산학협력단 현물출자)" },
                         { title: "자회사 편입", desc: "교육부 자회사 설립 인가 및 등록" }
                     ].map((item, idx) => (
                         <div key={idx} className="relative pl-12 md:pl-0">
                             <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white bg-[#003E7E] shadow-sm md:left-1/2 md:-ml-2.5"></div>
                             <div className={`md:flex items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-12`}>
                                 <div className="md:w-1/2"></div>
                                 <div className="md:w-1/2">
                                     <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                                          <div className="text-sm font-black text-[#3B82F6] mb-1 uppercase tracking-wider">Step 0{idx + 1}</div>
                                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                          <p className="text-slate-500 font-medium">{item.desc}</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        );
    }
    
    if (subPage === 'exit') {
        return (
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900">성공적인 투자 회수 사례</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        한국공학대학교 기술지주회사는 자회사의 성장을 지원하고, <br/>
                        적절한 시점에 M&A, IPO 등을 통해 수익을 실현합니다.
                    </p>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#003E7E] shadow-sm">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">주요 성과</h4>
                                <p className="text-sm text-slate-500">2024년 기준</p>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center text-slate-700 font-medium border-b border-blue-100 pb-2">
                                <span>투자 회수율</span>
                                <span className="font-bold text-[#003E7E]">185%</span>
                            </li>
                             <li className="flex justify-between items-center text-slate-700 font-medium">
                                <span>M&A 사례</span>
                                <span className="font-bold text-[#003E7E]">2건</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">연도별 회수 현황</h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-slate-100">
                        {[30, 45, 25, 60, 80].map((h, i) => (
                            <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group">
                                <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-[#003E7E] rounded-t-lg transition-all duration-1000"></div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}억</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 mt-4 px-4">
                        <span>2020</span>
                        <span>2021</span>
                        <span>2022</span>
                        <span>2023</span>
                        <span>2024</span>
                    </div>
                </div>
            </div>
        )
    }

    if (subPage === 'support') {
         return (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                     { title: "공간 지원", desc: "시흥비즈니스센터 및 교내 창업보육센터 입주 우대", icon: Building },
                     { title: "R&D 연계", desc: "대학 교수진과의 공동 연구 및 기술 지도 매칭", icon: Lightbulb },
                     { title: "정책 자금", desc: "정부 R&D 과제 및 정책 자금 수주 지원", icon: FileText },
                     { title: "네트워킹", desc: "가족회사 및 동문 기업과의 비즈니스 네트워킹", icon: Users },
                     { title: "홍보 마케팅", desc: "전시회 참가 및 언론 홍보 지원", icon: Presentation },
                     { title: "법률/특허", desc: "전문가 자문단(법무, 세무, 특허) 매칭 지원", icon: Gavel }
                 ].map((item, i) => (
                     <Card key={i} className="hover:border-blue-200 transition-colors">
                         <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 mb-4">
                             <item.icon className="w-6 h-6" />
                         </div>
                         <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                         <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                     </Card>
                 ))}
             </div>
         );
    }
    return null;
}

const ContactForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, contact, email, content });
        alert('문의가 접수되었습니다.');
        setName('');
        setContact('');
        setEmail('');
        setContent('');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[2rem] shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
        <SectionTitle title="문의하기" subtitle="Get in Touch" />
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">이름</label>
              <input value={name} onChange={e => setName(e.target.value)} required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="성함을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">연락처</label>
              <input value={contact} onChange={e => setContact(e.target.value)} required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="연락처를 입력하세요" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">이메일</label>
            <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="이메일 주소를 입력하세요" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">문의내용</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} required rows={6} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium resize-none" placeholder="문의하실 내용을 입력하세요"></textarea>
          </div>
          <div className="text-center pt-8">
            <Button size="xl" className="w-full md:w-auto min-w-[200px] shadow-lg hover:shadow-xl hover:-translate-y-1">문의하기</Button>
          </div>
        </form>
      </div>
    );
}

// --- App Component ---

const App = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [activeSubPage, setActiveSubPage] = useState<string | undefined>(undefined);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postType, setPostType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Data State
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [popups, setPopups] = useState<Popup[]>(INITIAL_POPUPS);

  // Filters
  const [portfolioSort, setPortfolioSort] = useState('name_asc');
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('all');

  const handleNavigate = (page: PageId, subPage?: string) => {
    setIsLoading(true);
    setActivePage(page);
    setActiveSubPage(subPage);
    setSelectedCompany(null);
    setSelectedPost(null);
    
    // Reset filters
    setPortfolioSort('name_asc');
    setPortfolioCategoryFilter('all');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleSubNavigate = (subPage: string) => {
    setIsLoading(true);
    setActiveSubPage(subPage);
    
    // Reset filters
    setPortfolioSort('name_asc');
    setPortfolioCategoryFilter('all');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 400);
  };

  const handleCompanyClick = (company: Company) => {
    setIsLoading(true);
    setTimeout(() => {
        setSelectedCompany(company);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsLoading(false);
    }, 300);
  };

  const handlePostClick = (post: Post, type: string) => {
    setIsLoading(true);
    setTimeout(() => {
        setSelectedPost(post);
        setPostType(type);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsLoading(false);
    }, 300);
  };

  const handleInquirySubmit = (data: any) => {
      const newInquiry: Inquiry = {
          id: Date.now(),
          ...data,
          date: new Date().toISOString().split('T')[0],
          status: '대기'
      };
      setInquiries([newInquiry, ...inquiries]);
  };

  const handlePopupClose = (id: number, doNotShowToday: boolean) => {
      setPopups(prev => prev.map(p => p.id === id ? {...p, isVisible: false} : p));
      if (doNotShowToday) {
          // Logic for localStorage/cookies would go here
          console.log(`Popup ${id} hidden for today`);
      }
  };

  // Logic to determine if current view has a hero section (dark background header)
  const hasHero = (activePage === 'home' || (activePage !== 'contact' && activePage !== 'admin' && !selectedPost && !selectedCompany));

  const renderContent = () => {
    if (activePage === 'admin') {
      return (
        <AdminPage 
          companies={companies} setCompanies={setCompanies}
          posts={posts} setPosts={setPosts}
          inquiries={inquiries} setInquiries={setInquiries}
          popups={popups} setPopups={setPopups}
          onLogout={() => handleNavigate('home')}
        />
      );
    }

    if (isLoading && selectedCompany === null && selectedPost === null && activePage === 'home') {
       return <HomeSkeleton />;
    }

    if (selectedPost) {
       if (isLoading) return <SkeletonLoader />;
       return (
         <div className="py-24 px-4 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
            <PostDetail 
                post={selectedPost} 
                type={postType} 
                onBack={() => setSelectedPost(null)} 
                onPostClick={(post) => handlePostClick(post, postType)}
                allPosts={posts.filter(p => p.category === selectedPost.category)}
            />
         </div>
       );
    }

    if (selectedCompany) {
      if (isLoading) return <SkeletonLoader />; 
      return (
        <div className="py-24 px-4 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
           <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompany(null)} />
        </div>
      );
    }

    if (activePage === 'home') {
      return (
        <>
            <PopupOverlay popups={popups} onClose={handlePopupClose} />
            <HomePage onNavigate={handleNavigate} onCompanyClick={handleCompanyClick} onPostClick={handlePostClick} notices={posts.filter(p => p.category === 'notice')} />
        </>
      );
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
        <div className="max-w-7xl mx-auto px-4 py-24 min-h-[600px]">
           {isLoading ? <SkeletonLoader /> : renderSubPageContent()}
        </div>
      </div>
    );
  };

  const renderSubPageContent = () => {
     // Portfolio Logic
     if (activePage === 'portfolio') {
        let baseCompanies = [];
        if (activeSubPage === 'subsidiaries') baseCompanies = companies.filter(c => c.category === 'subsidiary');
        else if (activeSubPage === 'tips_reco') baseCompanies = companies.filter(c => c.isTips);
        else baseCompanies = companies; // all_portfolio

        // Apply Category Filter
        let filteredCompanies = baseCompanies;
        if ((activeSubPage === 'all_portfolio' || activeSubPage === 'tips_reco') && portfolioCategoryFilter !== 'all') {
             filteredCompanies = filteredCompanies.filter(c => c.category === portfolioCategoryFilter);
        }

        // Apply Sorting
        filteredCompanies.sort((a, b) => {
            if (portfolioSort === 'name_asc') return a.name.localeCompare(b.name, 'ko');
            if (portfolioSort === 'name_desc') return b.name.localeCompare(a.name, 'ko');
            if (portfolioSort === 'date_newest') return new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime();
            if (portfolioSort === 'date_oldest') return new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime();
            return 0;
        });

        return (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-slate-200 gap-4">
               <div className="text-slate-500 font-medium">총 <strong className="text-[#003E7E] text-lg">{filteredCompanies.length}</strong>개의 기업이 있습니다.</div>
               
               <div className="flex gap-3 flex-wrap justify-end">
                  {activeSubPage !== 'subsidiaries' && (
                      <div className="relative">
                          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <select 
                              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] bg-white appearance-none cursor-pointer hover:border-[#003E7E] transition-colors"
                              value={portfolioCategoryFilter}
                              onChange={(e) => setPortfolioCategoryFilter(e.target.value)}
                          >
                              <option value="all">전체 기업</option>
                              <option value="subsidiary">자회사</option>
                              <option value="portfolio">투자기업</option>
                          </select>
                      </div>
                  )}

                  <div className="relative">
                      <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <select 
                          className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] bg-white appearance-none cursor-pointer hover:border-[#003E7E] transition-colors"
                          value={portfolioSort}
                          onChange={(e) => setPortfolioSort(e.target.value)}
                      >
                          <option value="name_asc">가나다순</option>
                          <option value="name_desc">가나다역순</option>
                          <option value="date_newest">최신 설립일순</option>
                          <option value="date_oldest">오래된 설립일순</option>
                      </select>
                  </div>
               </div>
            </div>
            
            {filteredCompanies.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredCompanies.map(company => (
                    <div 
                      key={company.id} 
                      onClick={() => handleCompanyClick(company)}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 transition-all cursor-pointer group"
                    >
                      <div className="aspect-video bg-slate-50 rounded-xl mb-5 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors relative overflow-hidden">
                        {company.logo ? (
                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-4" />
                        ) : (
                            <Building className="w-10 h-10 text-slate-300 group-hover:text-[#003E7E]" />
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2 truncate group-hover:text-[#003E7E] transition-colors tracking-tight">{company.name}</h4>
                      <p className="text-xs text-slate-500 truncate font-medium mb-4">{company.shortDesc || company.business}</p>
                      <div className="flex gap-2 flex-wrap mb-2">
                        {company.isTips && <span className="text-[10px] font-bold text-[#003E7E] bg-blue-50 px-2 py-1 rounded-full border border-blue-100">TIPS</span>}
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">설립일: {company.foundedDate}</div>
                    </div>
                  ))}
                </div>
            ) : (
                <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                    조건에 맞는 기업이 없습니다.
                </div>
            )}
          </div>
        );
     }

     // Investment Fields
     if (activePage === 'investment' && activeSubPage === 'fields') {
         return (
             <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: TrendingUp, title: "IT/SW", desc: "인공지능, 빅데이터, 클라우드, 사물인터넷 등 4차 산업혁명 핵심 기술 분야" },
                        { icon: Target, title: "바이오/헬스케어", desc: "디지털 헬스케어, 의료기기, 바이오 소재 등 국민 건강 증진을 위한 혁신 기술" },
                        { icon: Briefcase, title: "제조/소재/부품", desc: "첨단 제조 공정, 신소재, 고기능성 부품 등 산업 경쟁력 강화를 위한 기반 기술" }
                    ].map((item, idx) => (
                        <Card key={idx} className="text-center p-12 h-full flex flex-col items-center hover:border-blue-200 group">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-[#003E7E] shadow-inner group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg tracking-tight">{item.desc}</p>
                        </Card>
                    ))}
                 </div>
                 
                 <div className="bg-slate-50 rounded-3xl p-6 md:p-12 border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <SectionTitle title="투자 조합 운용 현황" subtitle="Investment Funds" />
                        
                        {/* Desktop Table View (Visible on LG and larger) */}
                        <div className="hidden lg:block overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
                            <table className="min-w-full text-sm text-left border-collapse">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="px-8 py-6 font-bold border-b border-slate-200 w-[35%]">구분</th>
                                        <th className="px-6 py-6 font-bold border-b border-slate-200 text-center w-[15%]">소관부처</th>
                                        <th className="px-6 py-6 font-bold border-b border-slate-200 text-right w-[15%]">결성규모</th>
                                        <th className="px-6 py-6 font-bold border-b border-slate-200 text-center w-[10%]">진행현황</th>
                                        <th className="px-8 py-6 font-bold border-b border-slate-200 text-right w-[25%]">운용기간</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {FUNDS_DATA.map((fund, idx) => (
                                        <tr key={idx} className="group hover:bg-blue-50/30 transition-colors duration-200">
                                            <td className="px-8 py-6 align-middle">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003E7E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#003E7E] group-hover:text-white transition-all duration-300 shadow-sm">
                                                        <PieChart className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-slate-800 text-base tracking-tight group-hover:text-[#003E7E] transition-colors">{fund.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center align-middle">
                                                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                                                    {fund.agency.split('(')[0]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 align-middle text-right">
                                                <span className="font-extrabold text-[#003E7E] text-lg whitespace-nowrap">{fund.size}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center align-middle">
                                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100 shadow-sm whitespace-nowrap">
                                                    <span className="relative flex h-2 w-2">
                                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                    </span>
                                                    {fund.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-slate-500 text-right font-mono text-sm tracking-tight align-middle whitespace-nowrap">
                                                {fund.period}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile/Tablet Card View (Visible on smaller than LG) */}
                        <div className="lg:hidden space-y-4">
                            {FUNDS_DATA.map((fund, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
                                    
                                    <div className="flex justify-between items-start gap-4 relative z-10">
                                        <div className="flex items-center gap-3.5 w-full">
                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-white text-[#003E7E] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                                                <PieChart className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col flex-grow min-w-0">
                                                <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 pr-8 truncate">{fund.name}</h4>
                                                <span className="text-xs font-bold text-slate-400 truncate">{fund.agency}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">결성규모</span>
                                            <span className="text-xl font-black text-[#003E7E]">{fund.size}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 items-end">
                                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">상태</span>
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                                                <span className="relative flex h-1.5 w-1.5">
                                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                                </span>
                                                {fund.status}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-1 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">운용기간</span>
                                            <span className="text-sm font-mono text-slate-600 font-medium">{fund.period}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-right text-slate-500 font-bold mt-8 flex justify-end items-center text-sm">
                          <Briefcase className="w-4 h-4 mr-2 text-[#003E7E]" /> 총 <span className="text-[#003E7E] mx-1">6개</span> 투자조합 운용 중 / 총 <span className="text-[#003E7E] mx-1">113억원</span> 규모
                        </p>
                    </div>
                 </div>
             </div>
         )
     }

     // News - Common Logic
     const getFilteredPosts = (cat: string) => posts.filter(p => p.category === cat);

     // News - Notice
     if (activePage === 'news' && activeSubPage === 'notice') {
         const noticePosts = getFilteredPosts('notice');
         return (
             <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{noticePosts.length}</span>건</span>
                    <div className="flex gap-3">
                        <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                        <Button size="sm">검색</Button>
                    </div>
                 </div>
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                    {noticePosts.map((notice) => (
                        <div key={notice.id} onClick={() => handlePostClick(notice, '공지사항')} className="flex flex-col md:flex-row md:items-center p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                             <div className="w-20 text-center text-slate-400 text-sm font-bold mb-2 md:mb-0 bg-slate-100 rounded py-1 mr-6">No.{notice.id}</div>
                             <div className="flex-grow">
                                 <h4 className="text-slate-800 font-bold text-lg group-hover:text-[#003E7E] transition-colors flex items-center gap-3 tracking-tight">
                                     {notice.title}
                                     {notice.isNew && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] border border-red-100 rounded-full font-bold">NEW</span>}
                                 </h4>
                             </div>
                             <div className="text-slate-400 text-sm w-32 text-center mt-2 md:mt-0 font-medium">{notice.date}</div>
                        </div>
                    ))}
                 </div>
             </div>
         )
     }

     // News - Press (New View)
     if (activePage === 'news' && activeSubPage === 'press') {
         const pressPosts = getFilteredPosts('press');
         return (
             <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{pressPosts.length}</span>건</span>
                    <div className="flex gap-3">
                        <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                        <Button size="sm">검색</Button>
                    </div>
                 </div>
                 <div className="grid gap-6">
                    {pressPosts.map((post) => (
                        <div key={post.id} onClick={() => handlePostClick(post, '보도소식')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                             <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-[#003E7E] text-xs font-bold rounded-full">PRESS</span>
                                <span className="text-slate-400 text-sm">{post.date}</span>
                             </div>
                             <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#003E7E] transition-colors line-clamp-1">{post.title}</h4>
                             <p className="text-slate-600 line-clamp-2 text-sm">{post.content?.slice(0, 150)}...</p>
                        </div>
                    ))}
                    {pressPosts.length === 0 && <div className="text-center py-20 text-slate-400">등록된 보도자료가 없습니다.</div>}
                 </div>
             </div>
         )
     }

     // News - Resources
     if (activePage === 'news' && activeSubPage === 'resources') {
        const resourcePosts = getFilteredPosts('resources');
        return (
             <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{resourcePosts.length}</span>건</span>
                    <div className="flex gap-3">
                        <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                        <Button size="sm">검색</Button>
                    </div>
                 </div>
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                    {resourcePosts.map((resource, idx) => (
                      <div key={resource.id} onClick={() => handlePostClick(resource, '자료실')} className={`p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors cursor-pointer ${idx !== resourcePosts.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-slate-500 flex-shrink-0 border border-slate-200 uppercase">
                          {resource.fileType || 'FILE'}
                        </div>
                        <div className="flex-grow min-w-0">
                           <h4 className="text-slate-800 font-bold text-lg mb-2 hover:text-[#003E7E] transition-colors tracking-tight">{resource.title}</h4>
                           <div className="flex items-center text-sm text-slate-400 gap-4">
                             <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {resource.date}</span>
                             <span className="flex items-center"><User className="w-3 h-3 mr-1"/> {resource.author}</span>
                           </div>
                        </div>
                        <Download className="w-5 h-5 text-slate-300 hover:text-[#003E7E]" />
                      </div>
                    ))}
                 </div>
             </div>
         )
     }

     // News - FAQ
     if (activePage === 'news' && activeSubPage === 'faq') {
         const faqPosts = getFilteredPosts('faq');
         return (
             <div className="space-y-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
                     <p className="text-slate-600">궁금하신 점을 빠르게 확인해보세요.</p>
                 </div>
                 <div className="space-y-4">
                    {faqPosts.map((post) => (
                       <details key={post.id} className="group bg-white rounded-2xl border border-slate-200 open:border-[#003E7E] transition-all duration-300 shadow-sm open:shadow-md">
                          <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none text-slate-800 text-lg">
                             <div className="flex items-start gap-4">
                                 <span className="text-[#003E7E] font-black mt-0.5">Q.</span>
                                 <span className="group-hover:text-[#003E7E] transition-colors">{post.title}</span>
                             </div>
                             <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                          </summary>
                          <div className="px-6 pb-8 pt-2 text-slate-600 leading-relaxed border-t border-slate-100 mx-6 mt-2 flex gap-4">
                              <span className="font-black text-slate-300">A.</span>
                              <div className="whitespace-pre-wrap">{post.content}</div>
                          </div>
                       </details>
                    ))}
                    {faqPosts.length === 0 && <div className="text-center py-20 text-slate-400">등록된 FAQ가 없습니다.</div>}
                 </div>
             </div>
         )
     }

     // About - History
     if (activePage === 'about' && activeSubPage === 'history') {
        return <AboutContent subPage="history" />;
     }

     // About - Overview/Location
     if (activePage === 'about' && (activeSubPage === 'overview' || activeSubPage === 'location')) {
        return <AboutContent subPage={activeSubPage} />;
     }
     
     // Other About subpages fallback
     if (activePage === 'about') {
         return <div className="py-32 text-center text-slate-400 font-light text-lg">준비중인 페이지입니다. ({activeSubPage})</div>;
     }

     // Investment - Process/Growth/Tips
     if (activePage === 'investment' && ['process', 'growth', 'tips'].includes(activeSubPage!)) {
        return <InvestmentContent subPage={activeSubPage!} />;
     }

     // Subsidiary
     if (activePage === 'subsidiary' && ['procedure', 'exit', 'support'].includes(activeSubPage!)) {
        return <SubsidiaryContent subPage={activeSubPage!} />;
     }
     
     // Contact
     if (activePage === 'contact') {
         return <ContactForm onSubmit={handleInquirySubmit} />;
     }

     // Default Empty State for any other unhandled pages
     return (
       <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-500">
         <div className="w-24 h-24 bg-slate-50 rounded-full mb-8 flex items-center justify-center text-slate-300 border border-slate-100">
            <FileText className="w-10 h-10" />
         </div>
         <h3 className="text-3xl font-bold text-slate-300 mb-4 tracking-tight">페이지 준비 중</h3>
         <p className="text-slate-500 max-w-md mx-auto text-lg tracking-tight">
            현재 페이지는 준비 중입니다. <br/>
            빠른 시일 내에 유용한 정보로 찾아뵙겠습니다.
         </p>
         <Button variant="outline" className="mt-10 text-slate-500 border-slate-300 hover:bg-slate-50 hover:text-slate-900" onClick={() => handleNavigate('home')}>홈으로 돌아가기</Button>
       </div>
     );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#003E7E] selection:text-white flex flex-col antialiased">
      <Header activePage={activePage} activeSubPage={activeSubPage} onNavigate={handleNavigate} hasHero={hasHero} />
      
      <main className={`flex-grow ${hasHero && activePage !== 'admin' ? '' : 'pt-20'}`}>
        {renderContent()}
      </main>

      {activePage !== 'admin' && (
        <>
          <QuickMenu onNavigate={handleNavigate} />
          <Footer onAdminLogin={() => handleNavigate('admin')} />
        </>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);