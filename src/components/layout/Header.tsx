import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { PageId, Post, Company } from '../../types';
import { MENU_STRUCTURE, COMPANY_NAME } from '../../data/constants';
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
                : 'bg-white/95 backdrop-blur-xl border-b border-line py-2 shadow-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 md:h-16">
                    <div
                        className="flex items-center cursor-pointer group gap-2"
                        onClick={() => onNavigate('home')}
                    >
                        <img
                            src={isTransparent ? '/logo_white.svg' : '/logo.svg'}
                            alt={COMPANY_NAME}
                            className="h-10 md:h-11 w-auto object-contain"
                        />
                    </div>

                    <nav className="hidden md:flex h-full items-center gap-1">
                        {MENU_STRUCTURE.map((item) => (
                            <div
                                key={item.id}
                                className="relative h-full flex items-center justify-center group/nav"
                                onMouseEnter={() => setHoveredMenu(item.id)}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <button
                                    className={`relative px-3 py-2 text-sm whitespace-nowrap transition-all duration-200 rounded-md ${
                                        isTransparent
                                            ? activePage === item.id
                                                ? 'font-bold text-white bg-white/15'
                                                : 'font-medium text-white hover:bg-white/10'
                                            : activePage === item.id
                                                ? 'font-bold text-navy bg-surface-alt2'
                                                : 'font-medium text-ink-soft hover:text-navy hover:bg-surface-alt'
                                    }`}
                                    onClick={() => onNavigate(item.id, item.subItems?.[0]?.id)}
                                >
                                    {item.label}
                                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-navy'} ${activePage === item.id
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-0 group-hover/nav:opacity-100 group-hover/nav:scale-100'
                                        }`}></span>
                                </button>

                                {item.subItems && hoveredMenu === item.id && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-3 w-64 z-50">
                                        <div className="bg-white border border-line shadow-popover rounded-xl overflow-hidden relative">
                                            <div className="h-0.5 bg-navy"></div>
                                            <div className="py-2.5">
                                                {item.subItems.map((sub) => (
                                                    <button
                                                        key={sub.id}
                                                        className="relative block w-full text-left px-6 py-3 text-sm text-ink-soft hover:text-navy hover:bg-surface-alt transition-all duration-200 group/item"
                                                        onClick={() => onNavigate(item.id, sub.id)}
                                                    >
                                                        <span className="relative z-10">{sub.label}</span>
                                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-navy opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="h-4 w-px mx-3 bg-line"></div>

                        {/* 글자 크기 조절 (데스크톱) */}
                        <div className="hidden md:block relative">
                            <button
                                onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
                                className={`p-2 rounded-xl transition-all ${isTransparent ? 'text-white hover:bg-white/10' : 'text-ink-soft hover:text-navy hover:bg-surface-alt'}`}
                                aria-label="글자 크기 조절"
                            >
                                <div className="flex items-center gap-0.5">
                                    <ZoomOut className="w-4 h-4" />
                                    <span className="text-xs font-bold min-w-[2rem] text-center">{fontSize}%</span>
                                    <ZoomIn className="w-4 h-4" />
                                </div>
                            </button>

                            {isFontSizeMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white border border-line rounded-xl shadow-popover p-3 min-w-[180px] z-50">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-line">
                                            <span className="text-xs font-bold text-ink">글자 크기</span>
                                            <button
                                                onClick={handleReset}
                                                className="text-xs text-ink-soft hover:text-navy font-medium"
                                            >
                                                초기화
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleZoomOut}
                                                disabled={fontSize <= 75}
                                                className="flex-1 px-3 py-2 rounded-xl bg-surface-alt hover:bg-surface-alt2 text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomOut className="w-4 h-4" />
                                                작게
                                            </button>
                                            <button
                                                onClick={handleZoomIn}
                                                disabled={fontSize >= 150}
                                                className="flex-1 px-3 py-2 rounded-xl bg-surface-alt hover:bg-surface-alt2 text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomIn className="w-4 h-4" />
                                                크게
                                            </button>
                                        </div>
                                        <div className="text-center pt-1">
                                            <span className="text-xs text-ink-soft">현재: {fontSize}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 검색 버튼 (데스크톱) */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`hidden md:block p-2 rounded-xl transition-all ${isTransparent ? 'text-white hover:bg-white/10' : 'text-ink-soft hover:text-navy hover:bg-surface-alt'}`}
                            aria-label="검색"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <a
                            href="https://bi.tukorea.ac.kr"
                            target="_blank"
                            rel="noreferrer"
                            className={`hidden md:flex items-center px-3 py-1.5 rounded-full text-xs font-bold border transition-all uppercase tracking-wide group whitespace-nowrap ${isTransparent
                                ? 'bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy'
                                : 'bg-surface-alt border-line-md text-ink-soft hover:border-line-strong hover:text-navy'
                                }`}
                        >
                            창업보육센터 <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </nav>

                    <div className="flex items-center gap-2">
                        {/* 글자 크기 조절 (모바일) */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
                                className={`p-2 transition-colors rounded-xl ${isTransparent ? 'text-white hover:bg-white/10' : 'text-ink-soft hover:text-navy hover:bg-surface-alt'}`}
                                aria-label="글자 크기 조절"
                            >
                                <div className="flex items-center gap-0.5">
                                    <ZoomOut className="w-4 h-4" />
                                    <span className="text-xs font-bold">{fontSize}%</span>
                                    <ZoomIn className="w-4 h-4" />
                                </div>
                            </button>

                            {isFontSizeMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white border border-line rounded-xl shadow-popover p-3 min-w-[160px] z-50">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-line">
                                            <span className="text-xs font-bold text-ink">글자 크기</span>
                                            <button
                                                onClick={handleReset}
                                                className="text-xs text-ink-soft hover:text-navy font-medium"
                                            >
                                                초기화
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleZoomOut}
                                                disabled={fontSize <= 75}
                                                className="flex-1 px-3 py-2 rounded-xl bg-surface-alt hover:bg-surface-alt2 text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomOut className="w-4 h-4" />
                                                작게
                                            </button>
                                            <button
                                                onClick={handleZoomIn}
                                                disabled={fontSize >= 150}
                                                className="flex-1 px-3 py-2 rounded-xl bg-surface-alt hover:bg-surface-alt2 text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-1"
                                            >
                                                <ZoomIn className="w-4 h-4" />
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
                            className={`md:hidden p-2 transition-colors rounded-xl ${isTransparent ? 'text-white hover:bg-white/10' : 'text-ink-soft hover:text-navy hover:bg-surface-alt'}`}
                            aria-label="검색"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            className={`md:hidden p-2 transition-colors rounded-xl ${isTransparent ? 'text-white hover:bg-white/10' : 'text-ink-soft hover:text-navy hover:bg-surface-alt'}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
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
                <div className="md:hidden bg-white border-t border-line absolute w-full shadow-popover h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="px-5 py-6 space-y-6">
                        {MENU_STRUCTURE.map((item) => (
                            <div key={item.id} className="space-y-3">
                                <button
                                    className="w-full text-left font-bold text-base py-3 border-l-2 border-transparent hover:border-navy pl-3 hover:pl-5 transition-all duration-300 flex items-center justify-between group text-ink hover:text-navy"
                                    onClick={() => {
                                        onNavigate(item.id, item.subItems?.[0]?.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <span>{item.label}</span>
                                    {item.subItems && <ChevronDown className="w-5 h-5 text-ink-faint group-hover:text-navy" />}
                                </button>
                                {item.subItems && (
                                    <div className="pl-4 grid grid-cols-2 gap-2">
                                        {item.subItems.map((sub) => (
                                            <button
                                                key={sub.id}
                                                className="text-left text-sm text-ink-soft py-3 px-4 bg-surface-alt rounded-xl hover:bg-surface-alt2 hover:text-navy transition-all"
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
