import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { PageId, Post, Company } from '../../types';
import { MENU_STRUCTURE } from '../../data/constants';
import SearchModal from '../common/SearchModal';

interface HeaderProps {
    activePage: PageId;
    activeSubPage?: string;
    onNavigate: (page: PageId, subPage?: string) => void;
    hasHero: boolean;
    posts?: Post[];
    companies?: Company[];
    onPostClick?: (post: Post, type: string) => void;
    onCompanyClick?: (company: Company) => void;
}

const Header: React.FC<HeaderProps> = ({ 
    activePage, 
    activeSubPage, 
    onNavigate, 
    hasHero,
    posts = [],
    companies = [],
    onPostClick,
    onCompanyClick
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<PageId | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [isFontSizeMenuOpen, setIsFontSizeMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // 외부 클릭 시 글자 크기 메뉴 닫기
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isFontSizeMenuOpen && !target.closest('[aria-label="글자 크기 조절"]') && !target.closest('.absolute.top-full')) {
                setIsFontSizeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isFontSizeMenuOpen]);

    useEffect(() => {
        // localStorage에서 저장된 폰트 크기 불러오기
        const savedFontSize = localStorage.getItem('pageFontSize');
        if (savedFontSize) {
            const size = parseInt(savedFontSize);
            setFontSize(size);
            applyFontSize(size);
        }
    }, []);

    const applyFontSize = (size: number) => {
        const root = document.documentElement;
        root.style.fontSize = `${size}%`;
        localStorage.setItem('pageFontSize', size.toString());
    };

    const handleZoomIn = () => {
        const newSize = Math.min(fontSize + 10, 150);
        setFontSize(newSize);
        applyFontSize(newSize);
    };

    const handleZoomOut = () => {
        const newSize = Math.max(fontSize - 10, 75);
        setFontSize(newSize);
        applyFontSize(newSize);
    };

    const handleReset = () => {
        const defaultSize = 100;
        setFontSize(defaultSize);
        applyFontSize(defaultSize);
        setIsFontSizeMenuOpen(false);
    };

    const isTransparent = hasHero && !scrolled;

    if (activePage === 'admin') return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isTransparent
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
                        <img
                            src={isTransparent ? "/logo_white.svg" : "/logo.svg"}
                            alt="한국공학대학교 기술지주회사"
                            className="h-12 w-auto object-contain"
                        />
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
                                    className={`relative px-5 py-2.5 text-[16px] transition-all duration-300 rounded-md ${activePage === item.id
                                        ? 'font-bold'
                                        : 'font-medium'
                                        } ${isTransparent
                                            ? (activePage === item.id ? 'text-white' : 'text-white/80 hover:text-white')
                                            : (activePage === item.id ? 'text-[#003E7E]' : 'text-slate-600 hover:text-[#003E7E]')
                                        }`}
                                    onClick={() => onNavigate(item.id, item.subItems?.[0]?.id)}
                                >
                                    {item.label}
                                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${activePage === item.id
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

                        {/* 글자 크기 조절 (데스크톱) */}
                        <div className="hidden md:block relative">
                            <button
                                onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
                                className={`p-2.5 rounded-lg transition-all ${isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-slate-600 hover:text-[#003E7E] hover:bg-slate-50'
                                }`}
                                aria-label="글자 크기 조절"
                            >
                                <div className="flex items-center gap-1">
                                    <ZoomOut className="w-4 h-4" />
                                    <span className="text-xs font-bold min-w-[2.5rem] text-center">{fontSize}%</span>
                                    <ZoomIn className="w-4 h-4" />
                                </div>
                            </button>
                            
                            {isFontSizeMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-3 min-w-[180px] z-50">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                                            <span className="text-xs font-bold text-slate-700">글자 크기</span>
                                            <button
                                                onClick={handleReset}
                                                className="text-xs text-slate-500 hover:text-[#003E7E] font-medium"
                                            >
                                                초기화
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleZoomOut}
                                                disabled={fontSize <= 75}
                                                className="flex-1 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomOut className="w-4 h-4" />
                                                작게
                                            </button>
                                            <button
                                                onClick={handleZoomIn}
                                                disabled={fontSize >= 150}
                                                className="flex-1 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomIn className="w-4 h-4" />
                                                크게
                                            </button>
                                        </div>
                                        <div className="text-center pt-1">
                                            <span className="text-xs text-slate-500">현재: {fontSize}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 검색 버튼 (데스크톱) */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`hidden md:block p-2.5 rounded-lg transition-all ${isTransparent
                                ? 'text-white hover:bg-white/10'
                                : 'text-slate-600 hover:text-[#003E7E] hover:bg-slate-50'
                            }`}
                            aria-label="검색"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <a href="https://bi.tukorea.ac.kr" target="_blank" rel="noreferrer" className={`hidden md:flex items-center px-4 py-2 rounded-full text-xs font-bold border transition-all uppercase tracking-wide group ${isTransparent
                            ? 'bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#003E7E]'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#003E7E] hover:text-[#003E7E]'
                            }`}>
                            창업보육센터 <ExternalLink className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </nav>

                    <div className="flex items-center gap-2">
                        {/* 글자 크기 조절 (모바일) */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
                                className={`p-2 transition-colors rounded-lg ${isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-slate-600 hover:text-[#003E7E] hover:bg-slate-50'
                                }`}
                                aria-label="글자 크기 조절"
                            >
                                <div className="flex items-center gap-0.5">
                                    <ZoomOut className="w-4 h-4" />
                                    <span className="text-[10px] font-bold">{fontSize}%</span>
                                    <ZoomIn className="w-4 h-4" />
                                </div>
                            </button>
                            
                            {isFontSizeMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-3 min-w-[160px] z-50">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                                            <span className="text-xs font-bold text-slate-700">글자 크기</span>
                                            <button
                                                onClick={handleReset}
                                                className="text-xs text-slate-500 hover:text-[#003E7E] font-medium"
                                            >
                                                초기화
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleZoomOut}
                                                disabled={fontSize <= 75}
                                                className="flex-1 px-2 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomOut className="w-3 h-3" />
                                                작게
                                            </button>
                                            <button
                                                onClick={handleZoomIn}
                                                disabled={fontSize >= 150}
                                                className="flex-1 px-2 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomIn className="w-3 h-3" />
                                                크게
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 검색 버튼 (모바일) */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`md:hidden p-2 transition-colors rounded-lg ${isTransparent
                                ? 'text-white hover:bg-white/10'
                                : 'text-slate-600 hover:text-[#003E7E] hover:bg-slate-50'
                            }`}
                            aria-label="검색"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                        
                        <button
                            className={`md:hidden p-2 transition-colors rounded-lg ${isTransparent
                                ? 'text-white hover:bg-white/10'
                                : 'text-slate-600 hover:text-[#003E7E] hover:bg-slate-50'
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 검색 모달 */}
            {onPostClick && onCompanyClick && (
                <SearchModal
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    posts={posts}
                    companies={companies}
                    onPostClick={onPostClick}
                    onCompanyClick={onCompanyClick}
                    onNavigate={onNavigate}
                />
            )}

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-2xl h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-5 duration-300 text-slate-900">
                    <div className="px-5 py-6 space-y-6">
                        {MENU_STRUCTURE.map((item) => (
                            <div key={item.id} className="space-y-3">
                                <button
                                    className="w-full text-left font-black text-lg py-2 border-l-4 border-transparent hover:border-[#003E7E] pl-2 hover:pl-4 transition-all duration-300 flex items-center justify-between group"
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

export default Header;
