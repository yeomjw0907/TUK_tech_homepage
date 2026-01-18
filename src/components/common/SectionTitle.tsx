import React from 'react';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
    <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
        {subtitle && (
            <span className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase block mb-3 animate-in slide-in-from-bottom-2 fade-in duration-500">
                {subtitle}
            </span>
        )}
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {title}
        </h2>
        <div className="w-16 h-1.5 bg-[#003E7E] mx-auto rounded-full"></div>
    </div>
);

export default SectionTitle;
