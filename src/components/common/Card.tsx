import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 p-8 transition-all duration-300 hover:-translate-y-1 ${className}`}>
        {title && <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">{title}</h3>}
        {children}
    </div>
);

export default Card;
