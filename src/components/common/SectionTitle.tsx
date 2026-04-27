import React from 'react';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    light?: boolean;
    align?: 'left' | 'center';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    light = false,
    align = 'center',
}) => (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
        {subtitle && (
            <span className={`mb-4 inline-block ${light ? 'bg-white/15 border-white/30 text-white' : ''} tag`}>
                {subtitle}
            </span>
        )}
        <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight mb-5 ${light ? 'text-white' : 'text-[#1A2840]'}`}>
            {title}
        </h2>
        <div className={`h-0.5 w-16 bg-gradient-to-r from-[#003E7E] to-[#0099D6] ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
);

export default SectionTitle;
