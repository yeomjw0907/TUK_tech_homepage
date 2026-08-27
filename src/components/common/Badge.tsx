import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    /**
     * navy    — 분류·상태 기본 (자회사/투자기업/운용중 등)
     * gold    — 성과·선정 하이라이트 (TIPS 등)
     * neutral — 보조 정보 (파일 형식, 카테고리 등)
     * danger  — 알림 (NEW 등)
     */
    variant?: 'navy' | 'gold' | 'neutral' | 'danger';
    className?: string;
}

const VARIANTS = {
    navy:    'bg-navy-light/5 text-navy border-navy-light/20',
    gold:    'bg-gold/10 text-gold border-gold/25',
    neutral: 'bg-surface-alt text-ink-soft border-line-md',
    danger:  'bg-danger/5 text-danger border-danger/20',
};

/**
 * 모든 뱃지/태그의 단일 규격. 모양(rounded-full)·크기(text-xs)는 고정이며 색만 variant로 고른다.
 * 라벨 언어는 한글을 기본으로 하고, 고유명사(TIPS, NEW 등)만 영문을 허용한다.
 */
const Badge: React.FC<BadgeProps> = ({ children, variant = 'navy', className = '' }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-bold whitespace-nowrap ${VARIANTS[variant]} ${className}`}>
        {children}
    </span>
);

export default Badge;
