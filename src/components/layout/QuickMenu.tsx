import React from 'react';
import { Bell, Download, ExternalLink, MessageCircle } from 'lucide-react';
import { PageId } from '../../types';

interface QuickMenuProps {
    onNavigate: (page: PageId, subPage?: string) => void;
}

const QuickMenu: React.FC<QuickMenuProps> = ({ onNavigate }) => {
    const menuItems = [
        { icon: Bell, label: "공지사항", action: () => onNavigate('news', 'notice') },
        { icon: Download, label: "자료실", action: () => onNavigate('news', 'resources') },
        { icon: ExternalLink, label: "창업보육센터", action: () => window.open('https://bi.tukorea.ac.kr', '_blank') },
        { icon: MessageCircle, label: "지원하기", action: () => onNavigate('contact') },
    ];

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[100] hidden md:flex flex-col gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-popover transition-all">
            {menuItems.map((item, idx) => (
                <div key={idx} className="group relative flex items-center justify-center">
                    <button
                        onClick={item.action}
                        aria-label={item.label}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-ink-soft bg-white shadow-sm border border-line hover:bg-navy hover:text-white hover:border-navy hover:shadow-lg hover:scale-105 transition-all duration-300 relative z-20"
                    >
                        <item.icon className="w-5 h-5" />
                    </button>
                    <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-navy-deep text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-popover translate-x-2 group-hover:translate-x-0 z-10">
                        {item.label}
                        <div className="absolute top-1/2 right-[-4px] -mt-1 border-4 border-transparent border-l-navy-deep"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuickMenu;
