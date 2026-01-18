import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Building, ExternalLink } from 'lucide-react';
import { PageId } from '../../types';
import { MENU_STRUCTURE } from '../../data/constants';

interface HeaderProps {
    activePage: PageId;
    activeSubPage?: string;
    onNavigate: (page: PageId, subPage?: string) => void;
    hasHero: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePage, activeSubPage, onNavigate, hasHero }) => {
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-colors duration-300 ${isTransparent
                                ? 'bg-white text-[#003E7E]'
                                : 'bg-[#003E7E] text-white shadow-blue-900/20 group-hover:bg-[#002952]'
                            }`}>
                            <Building className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className={`font-black text-xl leading-none tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-[#003E7E]'
                                }`}>한국공학대학교</span>
                            <span className={`text-[11px] font-bold tracking-[0.25em] mt-0.5 uppercase transition-colors duration-300 ${isTransparent ? 'text-blue-100' : 'text-slate-500'
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

                        <a href="https://bi.tukorea.ac.kr" target="_blank" rel="noreferrer" className={`flex items-center px-4 py-2 rounded-full text-xs font-bold border transition-all uppercase tracking-wide group ${isTransparent
                                ? 'bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#003E7E]'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#003E7E] hover:text-[#003E7E]'
                            }`}>
                            창업보육센터 <ExternalLink className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </nav>

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

export default Header;
