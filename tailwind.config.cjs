/**
 * 디자인 토큰 — 이 파일이 사이트 전체 색·타이포·그림자의 단일 기준입니다.
 * 임의값 클래스(text-[#003E7E] 등)는 ESLint로 금지되며, 여기 정의된 토큰만 사용합니다.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
    content: ['./index.html', './index.tsx', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#003E7E', // 구조·제목·주요 버튼
                    hover: '#002D5C',
                    light: '#0055CC',
                    deep: '#001E4A',    // 다크 섹션 배경(히어로·통계밴드·푸터 공용)
                },
                cyan: {
                    DEFAULT: '#0099D6', // 아이콘·장식 전용 (흰 배경 위 본문 텍스트 금지: 대비 부족)
                    text: '#007AB8',    // 흰 배경 위 링크/텍스트용
                },
                gold: {
                    DEFAULT: '#C8A84A', // 성과 수치 하이라이트 전용
                    light: '#E8C870',
                },
                ink: {
                    DEFAULT: '#1A2840', // 제목·강조 본문
                    soft: '#4B6080',    // 일반 본문
                    faint: '#8A9BB5',   // 캡션·비활성
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    alt: '#F5F8FC',     // 옅은 섹션 배경
                    alt2: '#EBF2FF',    // 아이콘 박스·강조 배경
                },
                line: {
                    DEFAULT: 'rgba(0,62,126,0.08)',  // 카드 보더
                    md: 'rgba(0,62,126,0.14)',
                    strong: 'rgba(0,62,126,0.22)',   // 카드 hover 보더
                    accent: 'rgba(0,85,204,0.30)',
                },
                danger: '#DC2626',
                success: '#059669',
            },
            fontFamily: {
                sans: ['Pretendard', '-apple-system', 'system-ui', '"Malgun Gothic"', 'sans-serif'],
                display: ['"Bebas Neue"', 'sans-serif'], // 숫자 전용
            },
            /* 타입 스케일 8단계 — 반응형은 clamp로 내장, md: 분기 불필요 */
            fontSize: {
                display: ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
                h1: ['clamp(2rem, 3.5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
                h2: ['clamp(1.875rem, 3vw, 2.25rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
                h3: ['clamp(1.375rem, 2vw, 1.5rem)', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '700' }],
                h4: ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '700' }],
                'body-lg': ['1.125rem', { lineHeight: '1.7' }],
                body: ['1rem', { lineHeight: '1.7' }],
                caption: ['0.875rem', { lineHeight: '1.55' }],
                label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '700' }],
            },
            boxShadow: {
                card: '0 2px 12px rgba(0,62,126,0.07), 0 1px 3px rgba(0,62,126,0.05)',
                'card-hover': '0 8px 32px rgba(0,62,126,0.10), 0 2px 8px rgba(0,62,126,0.06)',
                popover: '0 20px 50px rgba(0,62,126,0.12)',
            },
        },
    },
    plugins: [],
};
