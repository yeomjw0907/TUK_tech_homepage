// Type Definitions

export type PageId = 'home' | 'about' | 'investment' | 'subsidiary' | 'portfolio' | 'news' | 'contact' | 'admin';
export type SubPageId = string;

export interface MenuItem {
  id: PageId;
  label: string;
  subItems?: { id: SubPageId; label: string }[];
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
}

export type InquiryType = '일반 문의' | 'IR 접수' | 'TIPS 문의' | '기술사업화 문의';

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
