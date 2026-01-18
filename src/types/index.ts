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
  fileName?: string;
}

export interface Inquiry {
  id: number;
  name: string;
  contact: string;
  email: string;
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
