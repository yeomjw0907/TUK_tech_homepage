import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', glow = false }) => (
    <div className={`
        relative rounded-2xl border transition-all duration-300 group
        bg-white border-[rgba(0,62,126,0.08)]
        hover:border-[rgba(0,62,126,0.20)] hover:-translate-y-1
        card-shadow hover:card-shadow-lg shadow-sm hover:shadow-md
        p-8 ${className}
    `}>
        {/* top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#003E7E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
        {title && (
            <h3 className="text-base font-bold text-[#1A2840] mb-6 pb-4 border-b border-[rgba(0,62,126,0.07)]">
                {title}
            </h3>
        )}
        {children}
    </div>
);

export default Card;
