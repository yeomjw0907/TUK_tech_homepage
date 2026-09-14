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
        <div className="pt-32 pb-14 px-4 text-center relative overflow-hidden bg-navy-deep">
            <img
                src="/page-banner.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[80%_70%] pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/10 via-transparent to-navy-deep/20" />

            <div className="relative z-10 fade-up">
                {parent && (
                    <span className="mb-4 inline-block px-3 py-1 rounded-full text-label uppercase border border-white/25 text-white/80 bg-white/10">
                        {parent}
                    </span>
                )}
                <h1 className="text-h1 text-white mb-8">{title}</h1>
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
