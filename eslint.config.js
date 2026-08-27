import tseslint from 'typescript-eslint';

/**
 * 디자인 토큰 이탈 차단 커스텀 룰.
 * (eslint-plugin-tailwindcss는 한글 경로에서 tailwindcss 리졸브에 실패해 자체 구현으로 대체)
 *
 * 차단 대상 — STYLE_GUIDE.md 정책:
 *  1. 색상 임의값:  text-[#...], bg-[#...], border-[rgba(...)], from-[#...] 등
 *  2. 타이포 임의값: text-[13px], text-[0.95rem] 등
 *  3. 그림자 임의값: shadow-[...]
 *  4. 금지 팔레트:  slate-*, blue-*, indigo-*, yellow-*, emerald-*, gray-* (토큰 우회)
 *  5. font-black / font-extrabold (제목 굵기는 타입 스케일 토큰에 내장)
 * 레이아웃 치수 임의값(max-h-[90vh], w-[35%], min-h-[calc(...)])은 허용.
 */
const BANNED_PATTERNS = [
    { re: /(?:text|bg|border|from|to|via|ring|fill|stroke|divide|outline|decoration|accent|caret|shadow)-\[(?:#|rgb|hsl)[^\]]*\]/, msg: '색상 임의값 금지 — tailwind.config.cjs의 토큰(navy/ink/surface/line 등)을 사용하세요.' },
    { re: /text-\[[\d.]+(?:px|rem|em)\]/, msg: '폰트 크기 임의값 금지 — 타입 스케일 토큰(text-h2/body/caption 등)을 사용하세요.' },
    { re: /shadow-\[[^\]]*\]/, msg: '그림자 임의값 금지 — shadow-card/card-hover/popover 토큰을 사용하세요.' },
    { re: /(?:^|[\s:"'`])(?:text|bg|border|divide|ring|from|to|via)-(?:slate|blue|indigo|yellow|emerald|gray|zinc|neutral|stone)-\d/, msg: '기본 팔레트 우회 금지 — 시맨틱 토큰(ink/surface/line/navy 등)을 사용하세요.' },
    { re: /(?:^|[\s:"'`])font-(?:black|extrabold)(?:$|[\s"'`])/, msg: 'font-black/extrabold 금지 — 제목 굵기는 타입 스케일 토큰에 내장되어 있습니다.' },
];

const designTokens = {
    rules: {
        'no-off-token-classes': {
            meta: {
                type: 'problem',
                docs: { description: '디자인 토큰 외 색상/타이포/그림자 클래스 사용 금지' },
                schema: [],
            },
            create(context) {
                const check = (node, value) => {
                    if (typeof value !== 'string') return;
                    for (const { re, msg } of BANNED_PATTERNS) {
                        const m = value.match(re);
                        if (m) {
                            context.report({ node, message: `"${m[0].trim()}" — ${msg}` });
                        }
                    }
                };
                return {
                    Literal(node) { check(node, node.value); },
                    TemplateElement(node) { check(node, node.value.cooked); },
                };
            },
        },
    },
};

export default [
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    ...tseslint.configs.recommended.map((c) => ({ ...c, files: ['src/**/*.{ts,tsx}', 'index.tsx'] })),
    {
        files: ['src/**/*.{ts,tsx}', 'index.tsx'],
        plugins: { 'design-tokens': designTokens },
        rules: {
            'design-tokens/no-off-token-classes': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
