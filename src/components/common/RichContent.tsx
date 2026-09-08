import React from 'react';

interface RichContentProps {
    content?: string | null;
    className?: string;
}

const looksLikeHtml = (value: string) => /<\/?[a-z][^>]*>/i.test(value);

/**
 * 편집기(Tiptap)로 저장된 HTML 본문을 홈페이지에 표시한다.
 * - HTML이면 그대로 렌더링하고 .rich-content 공통 스타일(문단 여백·제목·목록 등)을 적용한다.
 * - 태그가 없는 예전 순수 텍스트 본문은 줄바꿈을 살려 그대로 보여준다.
 */
const RichContent: React.FC<RichContentProps> = ({ content, className = '' }) => {
    const value = content || '';
    if (!looksLikeHtml(value)) {
        return <div className={`rich-content whitespace-pre-wrap ${className}`}>{value}</div>;
    }
    return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{ __html: value }} />;
};

export default RichContent;
