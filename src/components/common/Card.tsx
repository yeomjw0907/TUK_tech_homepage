import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    /** 카드 내부 여백 — 콘텐츠 밀도에 따라 선택 */
    padding?: 'sm' | 'md' | 'lg';
    /** hover 부양·보더 강조 효과 (기본 켜짐) */
    hover?: boolean;
}

const PADDINGS = {
    sm: 'p-6',
    md: 'p-7',
    lg: 'p-8',
};

const Card: React.FC<CardProps> = ({ title, children, className = '', padding = 'md', hover = true }) => (
    <div className={`
        relative rounded-2xl bg-white border border-line shadow-card transition-all duration-300 group
        ${hover ? 'hover:border-line-strong hover:-translate-y-1 hover:shadow-card-hover' : ''}
        ${PADDINGS[padding]} ${className}
    `}>
        {title && (
            <h3 className="text-base font-bold text-ink mb-6 pb-4 border-b border-line">
                {title}
            </h3>
        )}
        {children}
    </div>
);

export default Card;
