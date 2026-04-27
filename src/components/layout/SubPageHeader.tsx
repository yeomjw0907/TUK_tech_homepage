import React from 'react';

interface SubMenuItem {
    id: string;
    label: string;
}

interface SubPageHeaderProps {
    title?: string;
    parent?: string;
    menuItems?: SubMenuItem[];
    activeSub?: string;
    onSubNav: (subPage: string) => void;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ title, parent, menuItems, activeSub, onSubNav }) => {
    return (
        <div className="pt-32 pb-14 px-4 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003E7E 0%, #001E4A 100%)' }}>
            {/* Subtle grid */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            {/* Orbs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 orb -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#0099D6]/10 orb -translate-y-1/2" style={{ animationDelay: '-5s' }} />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#001E4A]/50 to-transparent" />

            <div className="relative z-10 fade-up">
                {parent && (
                    <span className="mb-4 inline-block px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase border border-white/25 text-white/80 bg-white/10">
                        {parent}
                    </span>
                )}
                <h1 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight">{title}</h1>
                {menuItems && menuItems.length > 0 && (
                    <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSubNav(item.id)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    activeSub === item.id
                                        ? 'sub-tab-active'
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

export default SubPageHeader;
