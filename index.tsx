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
  FileIcon, Paperclip
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

interface Post {
  id: number;
  title: string;
  date: string;
  author?: string;
  views?: number;
  content?: string;
  isNew?: boolean;
  type?: string; // For resources like PDF, HWP
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

const RECENT_NOTICES: Post[] = [
  { 
    id: 1, 
    title: '2025년도 예비창업패키지 모집 공고', 
    date: '2025.02.15', 
    isNew: true,
    views: 1240,
    author: '창업지원팀',
    content: `2025년도 예비창업패키지 예비창업자 모집 공고\n\n혁신적인 기술 창업 소재가 있는 예비창업자의 원활한 창업사업화를 위하여 사업화 자금, 창업교육, 멘토링 등을 지원하는 『2025년 예비창업패키지』에 참여할 예비창업자를 다음과 같이 모집합니다.\n\n1. 신청방법 및 대상\n□ 신청기간 : 2025.02.15 (목) ~ 2025.03.15 (목) 16:00 까지\n□ 신청방법 : K-Startup 누리집(www.k-startup.go.kr)을 통한 온라인 신청\n□ 신청대상 : 공고일 기준 '신청자 명의'의 사업자 등록(개인, 법인)이 없는 자\n\n2. 지원내용\n□ 사업화 자금 : 최대 1억원 (평균 50백만원)\n□ 창업프로그램 : BM 고도화, MVP 제작, 후속투자 연계 등\n\n자세한 내용은 첨부파일을 참조하시기 바랍니다.`
  },
  { 
    id: 2, 
    title: '제5회 한국공학대학교 창업경진대회 수상자 발표', 
    date: '2025.02.10', 
    isNew: false,
    views: 856,
    author: '운영지원팀',
    content: `제5회 한국공학대학교 창업경진대회에 참여해 주신 모든 분들께 감사드립니다.\n치열한 경쟁을 뚫고 선정된 최종 수상자를 발표합니다.\n\n[대상]\n- (주)퓨처리스텍 (대표: 홍길동)\n\n[최우수상]\n- 엘포톤 (대표: 김철수)\n\n수상하신 모든 분들 축하드리며, 시상식 일정은 개별 통보 예정입니다.\n감사합니다.`
  },
  { 
    id: 3, 
    title: '2025년 입주기업 상반기 모집 안내', 
    date: '2025.01.28', 
    isNew: false,
    views: 2105,
    author: '창업보육센터',
    content: `2025년 상반기 한국공학대학교 기술지주회사 입주기업을 모집합니다.\n\n1. 모집개요\n- 위치 : 시흥비즈니스센터 7층\n- 규모 : 5개 호실 내외\n- 대상 : 기술기반 예비창업자 및 창업 7년 이내 기업\n\n2. 입주혜택\n- 사무공간 임대료 감면\n- 회의실, 휴게실 등 공용공간 무상 제공\n- 전문가 멘토링 및 기술지도 지원\n- 정부지원사업 연계 지원\n\n관심있는 기업들의 많은 참여 바랍니다.`
  },
  { 
    id: 4, 
    title: '기술지주회사 개인투자조합 결성 총회 개최', 
    date: '2025.01.15', 
    isNew: false,
    views: 654,
    author: '투자팀',
    content: `한국공학대학교 기술지주회사 개인투자조합 결성 총회가 성공적으로 개최되었습니다.\n\n일시 : 2025.01.15(월) 14:00\n장소 : 산학협력단 대회의실\n\n이번 조합 결성을 통해 우수한 기술을 보유한 초기 창업기업에 대한 투자를 확대해 나갈 예정입니다.`
  },
];

const RECENT_RESOURCES: Post[] = [
  { 
    id: 1, 
    title: '2025년 정부지원사업 통합공고문', 
    date: '2025.01.05', 
    type: 'PDF', 
    views: 3421,
    author: '관리자',
    content: `2025년도 창업지원사업 통합공고문입니다.\n각 부처별 지원사업 일정을 확인하시고 미리 준비하시기 바랍니다.\n\n[첨부파일]\n- 2025년_창업지원사업_통합공고.pdf`
  },
  { 
    id: 2, 
    title: '사업계획서 작성 가이드라인 (표준양식)', 
    date: '2024.12.20', 
    type: 'HWP',
    views: 5620,
    author: '창업지원팀',
    content: `성공적인 자금조달을 위한 사업계획서 작성 가이드라인 및 표준양식입니다.\nPSST 방식에 따른 작성법이 상세히 안내되어 있으니 참고하시기 바랍니다.`
  },
  { 
    id: 3, 
    title: 'TIPS 프로그램 소개 자료', 
    date: '2024.12.15', 
    type: 'PPT',
    views: 1205,
    author: '투자팀',
    content: `TIPS(Tech Incubator Program for Startup) 프로그램 소개 자료입니다.\n운영사별 특징 및 지원 절차에 대한 내용이 포함되어 있습니다.`
  },
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

const PostDetail = ({ post, type, onBack, onPostClick }: { post: Post, type: string, onBack: () => void, onPostClick: (post: Post) => void }) => {
  // Determine collection and relative posts for navigation
  const collection = type === '공지사항' ? RECENT_NOTICES : (type === '자료실' ? RECENT_RESOURCES : []);
  const currentIndex = collection.findIndex(p => p.id === post.id);
  // Assuming array is sorted by date descending (Newest first)
  const newerPost = currentIndex > 0 ? collection[currentIndex - 1] : null; // "Previous" in list
  const olderPost = currentIndex < collection.length - 1 ? collection[currentIndex + 1] : null; // "Next" in list

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mb-8 flex items-center justify-between">
         <button onClick={onBack} className="flex items-center text-slate-500 hover:text-[#003E7E] font-bold transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
         </button>
         <span className="text-sm font-medium text-slate-400">{type}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
         {/* Header */}
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

         {/* Content */}
         <div className="p-8 md:p-10 min-h-[400px]">
            <div className="prose max-w-none text-slate-700 leading-8 whitespace-pre-wrap">
               {post.content}
            </div>
         </div>

         {/* Attachments (if any) */}
         <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center"><Paperclip className="w-4 h-4 mr-2 text-[#003E7E]" /> 첨부파일</h4>
            <div className="flex flex-col gap-2">
               <div className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-[#003E7E] cursor-pointer transition-colors group">
                  <FileIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003E7E] mr-3" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex-grow truncate">
                     {post.title} 관련 첨부파일.{post.type ? post.type.toLowerCase() : 'pdf'}
                  </span>
                  <Download className="w-4 h-4 text-slate-300 group-hover:text-[#003E7E]" />
               </div>
            </div>
         </div>

         {/* Nav Buttons */}
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
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-xl translate-x-2 group-hover:translate-x-0 z-10">
             {item.label}
             {/* Arrow */}
             <div className="absolute top-1/2 right-[-4px] -mt-1 border-4 border-transparent border-l-slate-900"></div>
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/40 border-b border-slate-200/60 py-1' 
          : 'bg-white border-b border-slate-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group gap-3.5"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-[#003E7E] text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:bg-[#002952] transition-colors duration-300">
              <Building className="w-6 h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[#003E7E] font-black text-xl leading-none tracking-tight">한국공학대학교</span>
              <span className="text-slate-500 text-[11px] font-bold tracking-[0.25em] mt-0.5 uppercase">기술지주회사</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex h-full items-center gap-2">
            {MENU_STRUCTURE.map((item) => (
              <div 
                key={item.id}
                className="relative h-full flex items-center justify-center group/nav"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  className={`relative px-5 py-2.5 text-[16px] transition-all duration-300 rounded-md group-hover/nav:text-[#003E7E] ${
                    activePage === item.id 
                      ? 'text-[#003E7E] font-bold' 
                      : 'text-slate-600 font-medium'
                  }`}
                  onClick={() => onNavigate(item.id, item.subItems?.[0]?.id)}
                >
                  {item.label}
                  {/* Active Indicator */}
                  <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#003E7E] transition-all duration-300 ${
                    activePage === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover/nav:opacity-100 group-hover/nav:scale-100'
                  }`}></span>
                </button>
                
                {/* Improved Dropdown */}
                {item.subItems && hoveredMenu === item.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-3 w-64 z-50">
                    <div className="bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-lg border border-slate-100 overflow-hidden relative">
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#003E7E]"></div>
                      
                      <div className="py-2.5">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            className="relative block w-full text-left px-7 py-3.5 text-[15px] text-slate-500 hover:text-[#003E7E] hover:bg-slate-50 hover:font-bold transition-all duration-200 group/item"
                            onClick={() => onNavigate(item.id, sub.id)}
                          >
                            <span className="relative z-10">{sub.label}</span>
                            {/* Left Active Indicator on Hover */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#003E7E] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-5 w-px bg-slate-200 mx-5"></div>
            
            <a href="https://bi.tukorea.ac.kr" target="_blank" rel="noreferrer" className="flex items-center px-4 py-2 rounded-full text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:border-[#003E7E] hover:text-[#003E7E] transition-all uppercase tracking-wide group">
              창업보육센터 <ExternalLink className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-[#003E7E] transition-colors rounded-lg hover:bg-slate-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-2xl h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-5 duration-300">
          <div className="px-5 py-6 space-y-6">
            {MENU_STRUCTURE.map((item) => (
              <div key={item.id} className="space-y-3">
                <button
                  className="w-full text-left font-black text-xl text-slate-900 py-2 border-l-4 border-transparent hover:border-[#003E7E] pl-2 hover:pl-4 transition-all duration-300 flex items-center justify-between group"
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
    <footer className="bg-slate-900 text-slate-400 py-16 text-sm antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo, Links, Family Site */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-12 border-b border-slate-800">
          
          {/* Logo & Links Group */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 w-full md:w-auto">
            {/* Logo */}
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6" />
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-bold text-lg leading-none">한국공학대학교</span>
                 <span className="text-slate-400 font-medium text-xs tracking-wider mt-1">기술지주회사</span>
               </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-400 md:ml-8">
              <a href="#" className="hover:text-white transition-colors">개인정보취급방침</a>
              <a href="#" className="hover:text-white transition-colors">정보보호실천수칙</a>
              <a href="#" className="hover:text-white transition-colors">홈페이지운영지침</a>
            </div>
          </div>

          {/* Family Site Dropdown */}
          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button 
              onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
              className="w-full flex justify-between items-center border border-slate-700 rounded-lg px-4 py-3 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700 transition-all"
            >
              <span className="text-xs font-medium">TUKOREA 관련기관 링크</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isFamilySiteOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Content */}
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

        {/* Bottom Row: Info */}
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
            <p className="text-slate-600">Copyright© 2024 Tech University of Korea Holdings. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const SubPageHeader = ({ title, parent, menuItems, activeSub, onSubNav }: any) => (
  <div className="bg-white">
    <div className="relative bg-[#003E7E] py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#003E7E] via-transparent to-transparent opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="text-blue-200/90 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">{parent}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">{title}</h1>
      </div>
    </div>
    
    {menuItems && (
      <div className="border-b border-slate-200 sticky top-20 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar space-x-8 md:justify-center">
            {menuItems.map((item: any) => (
              <button
                key={item.id}
                className={`whitespace-nowrap py-4 text-sm font-bold border-b-2 transition-all duration-200 relative group ${
                  activeSub === item.id 
                    ? 'border-[#003E7E] text-[#003E7E]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => onSubNav(item.id)}
              >
                {item.label}
                <span className={`absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#003E7E] transform origin-left transition-transform duration-300 ${activeSub === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const AboutContent = ({ subPage }: { subPage: string }) => {
  if (subPage === 'overview') {
    return (
      <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Card title="설립 목적" className="border-t-4 border-t-[#003E7E] bg-gradient-to-b from-white to-slate-50/50">
          <ul className="space-y-6 text-slate-700">
            {[
              "대학의 혁신 기술과 비즈니스 아이디어를 발굴하여 창업으로 연계하고, 교원·학생 창업은 물론 외부 창업기업에도 투자와 집중 보육을 제공하는 산학협력기반 투자 활성화",
              "한국공학대학교가 보유한 우수한 기술을 활용하여 유망 스타트업을 대상으로 자회사 설립 또는 편입을 통한 직접 기술 사업화 실행",
              "자회사의 성장을 통한 투자 수익으로 연구개발 및 연구역량 제고를 위한 재투자 실현"
            ].map((text, idx) => (
              <li key={idx} className="flex items-start group">
                <CheckCircle2 className="w-6 h-6 text-[#003E7E] mt-0.5 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed text-lg tracking-tight">{text}</span>
              </li>
            ))}
          </ul>
        </Card>
        
        <div>
           <h3 className="text-2xl font-bold text-slate-900 mb-10 text-center tracking-tight">핵심 기능 및 사업 영역</h3>
           <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "벤처기업 발굴 및 육성", desc: "기술사업화 투자를 위한 유망 기업 발굴 및 집중 보육" },
                { title: "투자조합 운용", desc: "개인투자조합 및 벤처투자조합 결성과 운용을 통한 자금 지원" },
                { title: "창업보육센터 운영", desc: "인큐베이팅 & 액셀러레이팅 프로그램 운영" },
                { title: "TU-RN Up / TIPS", desc: "독자적인 컴퍼니 빌딩 프로그램 및 TIPS 운영사로서의 역할 수행" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#003E7E] group-hover:bg-[#003E7E] group-hover:text-white transition-colors">
                     {idx === 0 && <Binoculars className="w-6 h-6" />}
                     {idx === 1 && <LineChart className="w-6 h-6" />}
                     {idx === 2 && <Building className="w-6 h-6" />}
                     {idx === 3 && <Rocket className="w-6 h-6" />}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xl mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed tracking-tight">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }
  if (subPage === 'history') {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SectionTitle title="연혁" subtitle="History" />
        
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-1/2 md:translate-x-[-1px] space-y-16 pb-10">
           {HISTORY_DATA.map((yearData, idx) => (
             <div key={idx} className="relative group">
                {/* Year Marker */}
                <div className="absolute -left-[35px] top-0 w-16 h-16 rounded-full bg-white text-[#003E7E] flex items-center justify-center font-black text-xl shadow-lg z-10 border-4 border-slate-100 group-hover:border-[#003E7E] group-hover:bg-[#003E7E] group-hover:text-white transition-all duration-300">
                  {yearData.year}
                </div>
                
                <div className="pt-20 md:pt-4">
                  {yearData.events.map((event, eIdx) => (
                    <div key={eIdx} className={`relative flex items-center mb-10 last:mb-0 ${eIdx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                       {/* Connector Dot */}
                       <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-[5px] w-3 h-3 rounded-full bg-slate-300 z-0 ring-4 ring-white"></div>

                       {/* Content Card */}
                       <div className={`ml-8 md:ml-0 md:w-1/2 ${eIdx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">
                             {/* Arrow */}
                             <div className={`absolute top-6 w-4 h-4 bg-white border-t border-r border-slate-100 transform rotate-45 ${eIdx % 2 === 0 ? 'left-[-9px] border-r-0 border-t-0 border-l border-b' : 'right-[-9px] md:left-auto md:right-[-9px] md:border-r md:border-t md:border-l-0 md:border-b-0 left-[-9px] border-r-0 border-t-0 border-l border-b md:rotate-45 rotate-45'}`}></div>

                             <div className="flex items-center text-[#003E7E] font-bold mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{yearData.year}.{event.month}</span>
                             </div>
                             <h4 className="font-bold text-slate-900 text-lg mb-1 tracking-tight">{event.title}</h4>
                             <p className="text-sm text-slate-500 font-medium tracking-tight">{event.desc}</p>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }
  if (subPage === 'location') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-slate-100 h-[500px] rounded-3xl flex items-center justify-center text-slate-500 border border-slate-200 shadow-inner">
           {/* Replace with actual map embed if available */}
           <div className="text-center">
             <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
             <p className="font-bold text-lg text-slate-400 tracking-tight">지도 API 영역</p>
             <p className="text-sm text-slate-400">네이버/카카오/구글 지도 연동</p>
           </div>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <h3 className="font-extrabold text-3xl text-slate-900 tracking-tight">㈜한국공학대학교 기술지주회사</h3>
            <p className="text-slate-600 flex items-center text-lg tracking-tight"><MapPin className="w-5 h-5 mr-3 text-[#003E7E]" /> 경기도 시흥시 산기대학로 237 시흥비즈니스센터 7층</p>
          </div>
          <div className="flex flex-col gap-3 min-w-[280px]">
             <a href="tel:031-8041-0965" className="flex items-center px-6 py-4 bg-slate-50 rounded-xl hover:bg-[#003E7E] hover:text-white transition-all duration-300 text-slate-700 font-bold shadow-sm group">
               <Phone className="w-5 h-5 mr-4 text-[#003E7E] group-hover:text-white transition-colors" /> 031-8041-0965
             </a>
             <a href="mailto:tuholdings@tukorea.ac.kr" className="flex items-center px-6 py-4 bg-slate-50 rounded-xl hover:bg-[#003E7E] hover:text-white transition-all duration-300 text-slate-700 font-bold shadow-sm group">
               <Mail className="w-5 h-5 mr-4 text-[#003E7E] group-hover:text-white transition-colors" /> tuholdings@tukorea.ac.kr
             </a>
          </div>
        </div>
      </div>
    );
  }
  return <div className="py-32 text-center text-slate-400 font-light text-lg">준비중인 페이지입니다. ({subPage})</div>;
};

const InvestmentContent = ({ subPage }: { subPage: string }) => {
  if (subPage === 'process') {
    const processSteps = [
      { step: 1, title: 'TU-RN Up IR', icon: Presentation, desc: '기업 발굴 및 발표' },
      { step: 2, title: '기업실사(DD)', icon: SearchCheck, desc: '재무 및 기술 실사' },
      { step: 3, title: '투자심의위원회', icon: Gavel, desc: '투자의사 결정' },
      { step: 4, title: '투자 계약', icon: FileSignature, desc: '계약 체결 및 납입' },
      { step: 5, title: 'TIPS 추천', icon: Rocket, desc: 'TIPS 프로그램 연계' },
    ];

    return (
      <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SectionTitle title="투자 프로세스" subtitle="Investment Process" />
        
        {/* Horizontal Step Process Flowchart */}
        <div className="relative pt-12 pb-12">
            {/* Desktop Connector Line - Progress Bar Style */}
            <div className="hidden md:block absolute top-[98px] left-[10%] right-[10%] h-2 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full w-full bg-slate-200/50"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {processSteps.map((item, index) => (
                    <div key={index} className="flex flex-col items-center group relative">
                        {/* Step Number Badge */}
                        <div className="absolute -top-4 bg-white border-2 border-slate-100 text-slate-400 text-xs font-bold px-3 py-1 rounded-full z-20 group-hover:bg-[#003E7E] group-hover:text-white group-hover:border-[#003E7E] transition-all duration-300 shadow-sm">
                           STEP 0{item.step}
                        </div>
                        
                        {/* Icon Circle */}
                        <div className="w-28 h-28 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center text-slate-400 shadow-md group-hover:border-[#003E7E] group-hover:text-[#003E7E] group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 mb-6 relative z-10">
                           <item.icon className="w-10 h-10" />
                        </div>

                        {/* Text Content */}
                        <div className="text-center bg-white p-6 rounded-2xl border border-transparent shadow-sm hover:shadow-md group-hover:border-slate-100 transition-all w-full">
                           <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">{item.title}</h3>
                           <p className="text-sm text-slate-500 leading-relaxed tracking-tight">{item.desc}</p>
                        </div>
                        
                        {/* Mobile Arrow (Vertical flow) */}
                        {index < processSteps.length - 1 && (
                             <div className="md:hidden my-4 text-slate-300">
                                <ArrowDown className="w-6 h-6 animate-bounce" />
                             </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-20 bg-gradient-to-br from-[#003E7E] to-[#1e40af] p-12 rounded-3xl shadow-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-10 border-b border-white/10 pb-6">
             <h3 className="text-3xl font-bold tracking-tight">투자 포트폴리오 현황</h3>
             <span className="text-blue-200 font-medium">2024년 기준</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-colors">
              <p className="text-blue-200 font-medium mb-3">현재 투자사 수</p>
              <p className="text-5xl font-extrabold text-white tracking-tight">21<span className="text-2xl ml-1 text-blue-200 font-bold">개사</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-colors">
              <p className="text-blue-200 font-medium mb-3">총 투자금액</p>
              <p className="text-5xl font-extrabold text-white tracking-tight">34.8<span className="text-2xl ml-1 text-blue-200 font-bold">억원</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-colors">
              <p className="text-blue-200 font-medium mb-3">기업가치</p>
              <p className="text-5xl font-extrabold text-white tracking-tight">1,066<span className="text-2xl ml-1 text-blue-200 font-bold">억원</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (subPage === 'fields') {
    return (
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
         <SectionTitle title="투자 조합 운용 현황" subtitle="Investment Funds" />
         
         <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
                { icon: TrendingUp, title: "IT/SW", desc: "인공지능, 빅데이터, 클라우드, 사물인터넷 등 4차 산업혁명 핵심 기술 분야" },
                { icon: Target, title: "바이오/헬스케어", desc: "디지털 헬스케어, 의료기기, 바이오 소재 등 국민 건강 증진을 위한 혁신 기술" },
                { icon: Briefcase, title: "제조/소재/부품", desc: "첨단 제조 공정, 신소재, 고기능성 부품 등 산업 경쟁력 강화를 위한 기반 기술" }
            ].map((item, idx) => (
                <Card key={idx} className="text-center p-12 h-full flex flex-col items-center hover:border-blue-200">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-[#003E7E] shadow-inner">
                        <item.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg tracking-tight">{item.desc}</p>
                </Card>
            ))}
         </div>

         <div className="overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-100">
           <table className="min-w-full text-sm text-left">
             <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
               <tr>
                 <th className="px-8 py-5">구분</th>
                 <th className="px-8 py-5 hidden md:table-cell">소관부처(전담기관)</th>
                 <th className="px-8 py-5">결성규모</th>
                 <th className="px-8 py-5 text-center">진행현황</th>
                 <th className="px-8 py-5 hidden md:table-cell text-right">운용기간</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {FUNDS_DATA.map((fund, idx) => (
                 <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                   <td className="px-8 py-5 font-bold text-slate-900 text-base tracking-tight">{fund.name}</td>
                   <td className="px-8 py-5 text-slate-600 hidden md:table-cell">{fund.agency}</td>
                   <td className="px-8 py-5 font-bold text-[#003E7E]">{fund.size}</td>
                   <td className="px-8 py-5 text-center">
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 shadow-sm">
                       {fund.status}
                     </span>
                   </td>
                   <td className="px-8 py-5 text-slate-400 hidden md:table-cell text-right font-mono text-xs">{fund.period}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         <p className="text-right text-slate-500 font-bold mt-4 flex justify-end items-center text-sm">
           <Briefcase className="w-4 h-4 mr-2 text-[#003E7E]" /> 총 6개 투자조합 운용 중 / 총 113억원 규모
         </p>
      </div>
    );
  }
  if (subPage === 'growth') {
    return (
      <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SectionTitle title="TU-RN Up 프로그램" subtitle="Growth Support" />
        
        <div className="grid lg:grid-cols-2 gap-10">
          <Card title="컴퍼니 빌더 (Company Builder)" className="h-full bg-gradient-to-br from-white to-blue-50/30">
             <p className="text-slate-600 mb-8 leading-relaxed text-lg tracking-tight">
               교내 창업역량을 갖춘 예비창업자(학생 및 교원)를 대상으로 기술사업화를 통한 비즈니스 모델 구성, 자회사 설립을 함께 진행하고,
               신사업 발굴이나 기존 사업의 성장에 필요한 벤처기업을 대상으로 체계적인 성장을 유도합니다.
             </p>
             <h4 className="font-bold text-slate-900 mb-6 flex items-center text-xl tracking-tight"><Target className="w-6 h-6 mr-3 text-[#003E7E]"/> 지원 내용</h4>
             <ul className="space-y-4 text-slate-700 font-medium tracking-tight">
               <li className="flex items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm"><div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 mr-4 flex-shrink-0"></div>IP-R&D 전략 지원사업 연계 지원</li>
               <li className="flex items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm"><div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 mr-4 flex-shrink-0"></div>맞춤화된 비즈니스 모델 컨설팅 및 BM 고도화</li>
               <li className="flex items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm"><div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 mr-4 flex-shrink-0"></div>시작품 제작 지원 및 경영/기술 전략 멘토링</li>
               <li className="flex items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm"><div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 mr-4 flex-shrink-0"></div>Start-up 세미나 및 네트워킹 데이 개최</li>
             </ul>
          </Card>

          <Card title="성장지원 및 멘토링" className="h-full">
            <p className="text-slate-600 mb-8 leading-relaxed text-lg tracking-tight">
              기술력과 성장성을 갖춘 포트폴리오 기업들을 대상으로 하는 비즈니스 Scale Up 프로그램입니다.
              TIPS 컨소시움과 협력 기관의 전문가로 구성된 멘토 Pool(총 37명)을 활용합니다.
            </p>
            <div className="grid gap-6">
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                  <h5 className="font-bold text-[#003E7E] mb-3 flex items-center text-lg tracking-tight"><Users className="w-5 h-5 mr-3"/> 멘토링 & 컨설팅</h5>
                  <p className="text-slate-600 tracking-tight">창업에서 IPO까지 전주기 멘토링, 사업계획서 작성 코칭</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                  <h5 className="font-bold text-[#003E7E] mb-3 flex items-center text-lg tracking-tight"><TrendingUp className="w-5 h-5 mr-3"/> 투자 유치 지원</h5>
                  <p className="text-slate-600 tracking-tight">후속투자를 위한 IR 컨설팅 및 VC 대상 Closed IR 참여</p>
               </div>
            </div>
          </Card>
        </div>

        <div className="bg-[#003E7E] rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4 relative z-10 tracking-tight">RISE 사업 연계 <span className="text-base font-normal text-blue-200 ml-2">(지역혁신중심 대학지원체계)</span></h3>
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h5 className="font-bold text-white text-xl mb-3 flex items-center tracking-tight"><SearchCheck className="w-6 h-6 mr-3 text-blue-300"/> 1. 현장방문형 종합컨설팅</h5>
              <p className="text-blue-100 leading-relaxed mb-4 tracking-tight">전문위원 현장방문을 통한 무료 종합컨설팅 (연 3회 모집)</p>
              <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-200 border border-white/10">대상: 수도권 소재 기업체</span>
            </div>
            <div>
              <h5 className="font-bold text-white text-xl mb-3 flex items-center tracking-tight"><LineChart className="w-6 h-6 mr-3 text-blue-300"/> 2. Biz-LINK</h5>
              <p className="text-blue-100 leading-relaxed mb-4 tracking-tight">시제품 개발, 전시회 참가, 특허출원 등 지원</p>
              <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-200 border border-white/10">대상: 산학협력 이력 보유 기업</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (subPage === 'tips') {
    return (
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SectionTitle title="TIPS 프로그램" subtitle="Tech Incubator Program for Startup" />
        <Card className="bg-white">
          <div className="prose max-w-none text-slate-600 mb-12">
            <p className="leading-relaxed text-xl font-light tracking-tight">
              <strong className="text-[#003E7E]">스마트 제조, 바이오 헬스케어 및 반도체 분야</strong> 등의 딥테크 기술 중심으로 한국공학대학교의 산학협력 인프라를 활용하여
              TIPS 프로그램을 통한 기술사업화 R&BD 연계, 입주공간 제공, 후속투자 연계 등을 지원합니다.
            </p>
          </div>
          
          <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center tracking-tight"><Award className="w-7 h-7 mr-3 text-[#003E7E]"/> 주요 성과</h4>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
             <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 border border-blue-100 shadow-sm">
               <p className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-sm">TIPS 창업기업</p>
               <p className="text-6xl font-black text-[#003E7E] mb-4 tracking-tight">총 9<span className="text-3xl ml-2 text-slate-400 font-bold">개사</span></p>
               <div className="flex gap-2">
                 <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-slate-600 shadow-sm border border-slate-100">일반 7</span>
                 <span className="bg-[#003E7E] px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm">딥테크 1</span>
                 <span className="bg-blue-400 px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm">글로벌 1</span>
               </div>
             </div>
             <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 border border-blue-100 shadow-sm">
               <p className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-sm">운영사 투자금</p>
               <p className="text-6xl font-black text-[#003E7E] mb-4 tracking-tight">18.9<span className="text-3xl ml-2 text-slate-400 font-bold">억원</span></p>
               <p className="text-slate-500 font-medium tracking-tight">기업당 평균 2.1억원 투자</p>
             </div>
          </div>

          <h4 className="font-bold text-2xl text-slate-900 mb-6 tracking-tight">협력기관</h4>
          <div className="flex flex-wrap gap-3">
            {TIPS_COOP.map((coop, idx) => (
              <span key={idx} className="bg-white border border-slate-200 text-slate-600 px-5 py-3 rounded-xl text-sm font-bold hover:border-[#003E7E] hover:text-[#003E7E] hover:shadow-md transition-all cursor-default">
                {coop}
              </span>
            ))}
          </div>
        </Card>
      </div>
    );
  }
  return <div className="py-32 text-center text-slate-400 font-light text-lg">준비중인 페이지입니다.</div>;
};

const SubsidiaryContent = ({ subPage }: { subPage: string }) => {
  if (subPage === 'procedure') {
    return (
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SectionTitle title="자회사 설립절차" subtitle="Establishment Procedure" />
        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-slate-200 ml-6 md:ml-8 space-y-12">
            {[
              { step: 1, title: '기술발굴 및 사업타당성 검토', desc: '대학 보유 기술 중 사업화 유망 기술 발굴 및 시장성/기술성 분석' },
              { step: 2, title: '자회사 설립 심의', desc: '경영위원회 및 이사회 심의를 통한 자회사 설립 승인' },
              { step: 3, title: '산학협력단 기술출자', desc: '기술가치평가를 통한 기술 현물 출자 (지분 20% 이상 확보)' },
              { step: 4, title: '법인 설립 등기', desc: '현금/현물 출자를 통한 법인 설립 및 사업자 등록' },
              { step: 5, title: '연구소기업 등록', desc: '연구개발특구진흥재단 연구소기업 등록 (세제 혜택 등)' }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                <span className="absolute -left-[11px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white border-4 border-[#003E7E]"></span>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <span className="text-[#003E7E] font-bold text-sm mb-1 block">STEP 0{item.step}</span>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (subPage === 'support') {
      return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SectionTitle title="자회사 성장지원" subtitle="Growth Support" />
            <div className="grid md:grid-cols-2 gap-8">
                <Card title="공간 지원">
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> 교내 입주 공간 제공 (BI센터 등)</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> 회의실 및 공용 장비 활용 지원</li>
                    </ul>
                </Card>
                <Card title="사업화 자금 지원">
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> 초기 사업화 자금(시작품 제작 등) 지원</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> R&BD 기획 및 과제 수주 지원</li>
                    </ul>
                </Card>
                <Card title="경영/기술 컨설팅">
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> 세무, 회계, 법률 전문가 멘토링</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> 비즈니스 모델(BM) 고도화 컨설팅</li>
                    </ul>
                </Card>
                <Card title="투자 유치 지원">
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> TIPS 프로그램 연계</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" /> VC 대상 IR 피칭 기회 제공</li>
                    </ul>
                </Card>
            </div>
        </div>
      );
  }
  if (subPage === 'exit') {
    return (
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SectionTitle title="자회사 투자회수 현황" subtitle="Investment Exit" />
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden p-10 text-center">
             <div className="mb-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#003E7E]">
                    <Handshake className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">투자 회수 전략 (Exit Strategy)</h3>
                <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    자회사의 성장 단계에 맞춰 IPO(기업공개) 또는 M&A(인수합병) 등 다양한 회수 전략을 수립하여
                    투자 수익을 극대화하고, 이를 연구개발에 재투자하는 선순환 구조를 구축하고 있습니다.
                </p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">IPO (기업공개)</h4>
                    <p className="text-sm text-slate-500">코스닥/코넥스 상장을 통한 지분 매각</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">M&A (인수합병)</h4>
                    <p className="text-sm text-slate-500">대기업 및 중견기업에 지분 매각</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2">구주 매각</h4>
                    <p className="text-sm text-slate-500">후속 투자 유치 시 일부 지분 매각</p>
                </div>
             </div>
        </div>
      </div>
    );
  }
  return <div className="py-32 text-center text-slate-400 font-light text-lg">준비중인 페이지입니다. ({subPage})</div>;
};

const CompanyDetail = ({ company, onBack }: { company: Company, onBack: () => void }) => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-4 mb-12">
         <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft className="w-6 h-6 text-slate-600" /></button>
         <h2 className="text-3xl font-bold text-slate-900 tracking-tight">기업 상세 안내</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-0 bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
         {/* Left: Image Area */}
         <div className="md:col-span-1 bg-slate-50 p-10 flex items-center justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-slate-100">
           <div className="w-full aspect-[4/3] bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm border border-slate-200/50">
              {/* Placeholder for company logo */}
              <div className="text-center">
                <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <span className="text-slate-900 font-bold text-xl">{company.name}</span>
              </div>
           </div>
         </div>

         {/* Right: Info Table */}
         <div className="md:col-span-2">
            <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-center">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                   {company.name} 
                </h3>
                {company.isTips && <span className="text-xs font-bold text-[#003E7E] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">TIPS 선정기업</span>}
            </div>
            <div className="text-sm">
               <div className="grid grid-cols-4 border-b border-slate-50">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">대표자명</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">{company.ceo}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-50">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">설립일</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">{company.foundedDate}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-50">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">주요사업</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">{company.business}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-50">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">사용호실</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">{company.room}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-50">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">입주일자</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">{company.moveInDate}</div>
               </div>
               <div className="grid grid-cols-4 border-b border-slate-50">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">홈페이지</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">
                    <a href={company.homepage} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">{company.homepage}</a>
                  </div>
               </div>
               <div className="grid grid-cols-4">
                  <div className="col-span-1 bg-slate-50/50 p-5 font-bold text-slate-600 flex items-center">비고</div>
                  <div className="col-span-3 p-5 text-slate-800 font-medium">{company.note}</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

const HomePage = ({ onNavigate, onCompanyClick, onPostClick }: any) => {
  const recentCompanies = COMPANY_DB.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[#003E7E] text-white overflow-hidden min-h-[600px] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_#1e40af,_#003E7E,_#0f172a)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
        
        {/* Animated Shapes */}
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full pt-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-blue-100 text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              한국공학대학교 기술지주회사
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              기술의 가치를 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">비즈니스로 연결합니다</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 tracking-tight">
              대학의 우수 기술을 발굴하고 체계적인 엑셀러레이팅을 통해
              여러분의 아이디어가 유니콘 기업으로 성장하도록 돕겠습니다.
            </p>
            <div className="flex flex-wrap gap-5 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button size="xl" onClick={() => onNavigate('about', 'overview')} className="shadow-blue-900/50">회사소개 자세히 보기</Button>
              <Button size="xl" variant="outline" onClick={() => onNavigate('investment', 'process')}>
                투자 문의 <ChevronRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Info Section */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Recent Companies */}
            <div className="lg:col-span-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                 <div>
                    <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-1 block">New Family</span>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">최신 입주/투자 기업</h3>
                 </div>
                 <button onClick={() => onNavigate('portfolio', 'all_portfolio')} className="text-sm font-bold text-slate-500 hover:text-[#003E7E] flex items-center transition-colors">더보기 <ChevronRight className="w-4 h-4 ml-1" /></button>
               </div>
               <div className="grid md:grid-cols-4 gap-6">
                 {recentCompanies.map(company => (
                   <div 
                      key={company.id} 
                      onClick={() => onCompanyClick(company)}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 transition-all cursor-pointer group"
                   >
                      <div className="aspect-video bg-slate-50 rounded-xl mb-4 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                        <Building className="w-8 h-8 text-slate-300 group-hover:text-[#003E7E]" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1 truncate tracking-tight">{company.name}</h4>
                      <p className="text-xs text-slate-500 truncate font-medium">{company.business}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Notices */}
            <div className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
                 <h3 className="text-2xl font-bold text-slate-900 tracking-tight">공지사항</h3>
                 <button onClick={() => onNavigate('news', 'notice')} className="text-sm font-bold text-slate-500 hover:text-[#003E7E] flex items-center transition-colors">더보기 <ChevronRight className="w-4 h-4 ml-1" /></button>
               </div>
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                  {RECENT_NOTICES.map(notice => (
                    <div key={notice.id} className="p-6 flex items-start gap-5 hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => onPostClick(notice, '공지사항')}>
                      <div className="flex-grow">
                         <h4 className="text-slate-800 font-bold mb-1.5 line-clamp-1 flex items-center gap-2 group-hover:text-[#003E7E] transition-colors text-lg tracking-tight">
                           {notice.isNew && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm"></span>}
                           {notice.title}
                         </h4>
                         <p className="text-sm text-slate-400 font-medium">{notice.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#003E7E] transition-colors" />
                    </div>
                  ))}
               </div>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
               <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
                 <h3 className="text-2xl font-bold text-slate-900 tracking-tight">자료실</h3>
                 <button onClick={() => onNavigate('news', 'resources')} className="text-sm font-bold text-slate-500 hover:text-[#003E7E] flex items-center transition-colors">더보기 <ChevronRight className="w-4 h-4 ml-1" /></button>
               </div>
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                  {RECENT_RESOURCES.map((resource, idx) => (
                    <div key={resource.id} className={`p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${idx !== RECENT_RESOURCES.length - 1 ? 'border-b border-slate-50' : ''}`} onClick={() => onPostClick(resource, '자료실')}>
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-500 flex-shrink-0 border border-slate-100">
                        {resource.type}
                      </div>
                      <div className="flex-grow min-w-0">
                         <h4 className="text-slate-800 font-bold text-sm line-clamp-2 leading-snug mb-1 hover:text-[#003E7E] transition-colors tracking-tight">{resource.title}</h4>
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
      <div className="bg-[#0f172a] py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-color filter blur-3xl opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-10 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">기술사업화의 <span className="text-blue-400">파트너</span>가 되어드립니다</h2>
            <p className="text-slate-400 text-xl font-light tracking-tight">한국공학대학교 기술지주회사가 여러분의 성공적인 비즈니스를 지원합니다.</p>
          </div>
          <Button variant="primary" size="xl" className="flex items-center shadow-blue-900/50" onClick={() => onNavigate('contact')}>
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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postType, setPostType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (page: PageId, subPage?: string) => {
    setIsLoading(true);
    setActivePage(page);
    setActiveSubPage(subPage);
    setSelectedCompany(null);
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleSubNavigate = (subPage: string) => {
    setIsLoading(true);
    setActiveSubPage(subPage);
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

  const renderContent = () => {
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
      return <HomePage onNavigate={handleNavigate} onCompanyClick={handleCompanyClick} onPostClick={handlePostClick} />;
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
        let companies = [];
        if (activeSubPage === 'subsidiaries') companies = COMPANY_DB.filter(c => c.category === 'subsidiary');
        else if (activeSubPage === 'tips_reco') companies = COMPANY_DB.filter(c => c.isTips);
        else companies = COMPANY_DB; // all_portfolio

        return (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-200">
               <div className="text-slate-500 font-medium">총 <strong className="text-[#003E7E] text-lg">{companies.length}</strong>개의 기업이 있습니다.</div>
               <div className="flex gap-2">
                  {/* Filter buttons could go here */}
               </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companies.map(company => (
                <div 
                  key={company.id} 
                  onClick={() => handleCompanyClick(company)}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 transition-all cursor-pointer group"
                >
                  <div className="aspect-video bg-slate-50 rounded-xl mb-5 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    <Building className="w-10 h-10 text-slate-300 group-hover:text-[#003E7E]" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2 truncate group-hover:text-[#003E7E] transition-colors tracking-tight">{company.name}</h4>
                  <p className="text-xs text-slate-500 truncate font-medium mb-4">{company.business}</p>
                  <div className="flex gap-2 flex-wrap">
                    {company.isTips && <span className="text-[10px] font-bold text-[#003E7E] bg-blue-50 px-2 py-1 rounded-full border border-blue-100">TIPS</span>}
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</span>
                  </div>
                </div>
              ))}
            </div>
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
                        <Card key={idx} className="text-center p-12 h-full flex flex-col items-center hover:border-blue-200">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-[#003E7E] shadow-inner">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg tracking-tight">{item.desc}</p>
                        </Card>
                    ))}
                 </div>
                 
                 <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200">
                    <SectionTitle title="투자 조합 운용 현황" subtitle="Investment Funds" />
                    <div className="overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-100">
                      <table className="min-w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-xs">
                          <tr>
                            <th className="px-8 py-5">구분</th>
                            <th className="px-8 py-5 hidden md:table-cell">소관부처(전담기관)</th>
                            <th className="px-8 py-5">결성규모</th>
                            <th className="px-8 py-5 text-center">진행현황</th>
                            <th className="px-8 py-5 hidden md:table-cell text-right">운용기간</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {FUNDS_DATA.map((fund, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                              <td className="px-8 py-5 font-bold text-slate-900 text-base tracking-tight">{fund.name}</td>
                              <td className="px-8 py-5 text-slate-600 hidden md:table-cell">{fund.agency}</td>
                              <td className="px-8 py-5 font-bold text-[#003E7E]">{fund.size}</td>
                              <td className="px-8 py-5 text-center">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 shadow-sm">
                                  {fund.status}
                                </span>
                              </td>
                              <td className="px-8 py-5 text-slate-400 hidden md:table-cell text-right font-mono text-xs">{fund.period}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-right text-slate-500 font-bold mt-4 flex justify-end items-center text-sm">
                      <Briefcase className="w-4 h-4 mr-2 text-[#003E7E]" /> 총 6개 투자조합 운용 중 / 총 113억원 규모
                    </p>
                 </div>
             </div>
         )
     }

     // News - Notice
     if (activePage === 'news' && activeSubPage === 'notice') {
         return (
             <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{RECENT_NOTICES.length}</span>건</span>
                    <div className="flex gap-3">
                        <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                        <Button size="sm">검색</Button>
                    </div>
                 </div>
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                    {RECENT_NOTICES.map((notice) => (
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

     // News - Resources
     if (activePage === 'news' && activeSubPage === 'resources') {
        return (
             <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{RECENT_RESOURCES.length}</span>건</span>
                    <div className="flex gap-3">
                        <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                        <Button size="sm">검색</Button>
                    </div>
                 </div>
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                    {RECENT_RESOURCES.map((resource, idx) => (
                      <div key={resource.id} onClick={() => handlePostClick(resource, '자료실')} className={`p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors cursor-pointer ${idx !== RECENT_RESOURCES.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-slate-500 flex-shrink-0 border border-slate-200">
                          {resource.type}
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

     // About - History
     if (activePage === 'about' && activeSubPage === 'history') {
        return <AboutContent subPage="history" />;
     }

     // About - Overview/Location (Already handled in AboutContent, but need to be sure)
     if (activePage === 'about' && (activeSubPage === 'overview' || activeSubPage === 'location')) {
        return <AboutContent subPage={activeSubPage} />;
     }
     
     // Other About subpages fallback
     if (activePage === 'about') {
         // This fallback catches 'ceo', 'vision', 'org' until implemented
         return <div className="py-32 text-center text-slate-400 font-light text-lg">준비중인 페이지입니다. ({activeSubPage})</div>;
     }

     // Investment - Process/Growth/Tips (Already handled in InvestmentContent, need wrapper)
     if (activePage === 'investment' && ['process', 'growth', 'tips'].includes(activeSubPage!)) {
        return <InvestmentContent subPage={activeSubPage!} />;
     }

     // Subsidiary (Already handled in SubsidiaryContent, need wrapper)
     if (activePage === 'subsidiary' && ['procedure', 'exit', 'support'].includes(activeSubPage!)) {
        return <SubsidiaryContent subPage={activeSubPage!} />;
     }
     
     // Contact
     if (activePage === 'contact') {
         return (
             <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[2rem] shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
                <SectionTitle title="문의하기" subtitle="Get in Touch" />
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">이름</label>
                      <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="성함을 입력하세요" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">연락처</label>
                      <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="연락처를 입력하세요" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">이메일</label>
                    <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="이메일 주소를 입력하세요" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">문의내용</label>
                    <textarea rows={6} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium resize-none" placeholder="문의하실 내용을 입력하세요"></textarea>
                  </div>
                  <div className="text-center pt-8">
                    <Button size="xl" className="w-full md:w-auto min-w-[200px] shadow-lg hover:shadow-xl hover:-translate-y-1">문의하기</Button>
                  </div>
                </form>
              </div>
         )
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