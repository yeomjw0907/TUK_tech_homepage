// Type Definitions

export type PageId = 'home' | 'about' | 'investment' | 'subsidiary' | 'tech-transfer' | 'portfolio' | 'news' | 'contact' | 'admin';
export type SubPageId = string;
/** 내부 페이지가 아닌 메인탭(외부 링크)용 id */
export type ExternalMenuId = 'incubator';
export type MenuItemId = PageId | ExternalMenuId;

export interface MenuItem {
  id: MenuItemId;
  label: string;
  subItems?: { id: SubPageId; label: string }[];
  /** 있으면 내부 이동 대신 해당 URL로 연동 */
  href?: string;
}

export interface Company {
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
  logo?: string;
  bgImage?: string;
  shortDesc?: string;
}

export interface PostFile {
  name: string;
  type?: string;
  size?: number;
  url?: string; // 서버(Storage)에 업로드된 파일 주소
}

export interface Post {
  id: number;
  category: 'notice' | 'press' | 'resources' | 'faq';
  title: string;
  date: string;
  author?: string;
  views?: number;
  content?: string;
  isNew?: boolean;
  fileType?: string;
  fileName?: string; // 기존 호환성을 위해 유지
  fileUrl?: string;
  files?: PostFile[]; // 여러 파일 지원
  sortOrder?: number; // Q&A 등 노출 순서 (작을수록 위)
}

export type InquiryType = '일반 문의' | 'IR 접수' | '자회사 접수' | 'TIPS 문의' | '기술이전 문의';

export interface Inquiry {
  id: number;
  inquiryType?: InquiryType | string;
  name: string;
  contact: string;
  email: string;
  companyName?: string;
  content: string;
  date: string;
  status: '대기' | '완료';
  files?: PostFile[];
  privacyAgreed?: boolean;
}

export interface Popup {
  id: number;
  title: string;
  image?: string;
  content?: string;
  link?: string;
  startDate: string;
  endDate: string;
  isVisible: boolean;
}
