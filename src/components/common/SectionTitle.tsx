import React from 'react';

interface SectionTitleProps {
    title: string;
    /** 영문 오버라인(eyebrow) — Title Case로 넘기면 대문자로 렌더됨. 예: "Investment Focus" */
    subtitle?: string;
    /** 제목 아래 1줄 리드문 */
    description?: string;
    /** 다크(네이비) 배경 위에서 사용 */
    light?: boolean;
    align?: 'left' | 'center';
    /** lg = 페이지 대표 섹션(h2), sm = 하위 섹션(h3) */
    size?: 'lg' | 'sm';
}

/**
 * 모든 섹션 헤더의 단일 규격: 영문 오버라인 → 한글 제목 → 리드문 → 포인트 라인.
 * 인라인 h2/h3 스타일링 대신 반드시 이 컴포넌트를 사용한다.
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    description,
    light = false,
    align = 'center',
    size = 'lg',
}) => (
    <div className={`mb-14 md:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
        {subtitle && (
            <p className={`text-label uppercase mb-4 ${light ? 'text-white/70' : 'text-cyan-text'}`}>
                {subtitle}
            </p>
        )}
        {size === 'lg' ? (
            <h2 className={`text-h2 mb-5 ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        ) : (
            <h3 className={`text-h3 mb-4 ${light ? 'text-white' : 'text-ink'}`}>{title}</h3>
        )}
        {description && (
            <p className={`text-body-lg mb-5 ${light ? 'text-white/80' : 'text-ink-soft'}`}>
                {description}
            </p>
        )}
        <div className={`h-0.5 w-16 bg-gradient-to-r from-navy to-cyan ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
);

export default SectionTitle;
