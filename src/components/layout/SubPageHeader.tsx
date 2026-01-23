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
        <div className="bg-[#003E7E] pt-32 pb-20 px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10 animate-in slide-in-from-bottom-5 fade-in duration-700">
                <span className="text-blue-200 font-bold tracking-widest text-xs uppercase mb-4 block">{parent}</span>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight">{title}</h1>
                {menuItems && (
                    <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSubNav(item.id)}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeSub === item.id
                                        ? 'bg-white text-[#003E7E] shadow-lg'
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
