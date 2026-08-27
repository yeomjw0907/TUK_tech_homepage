import tseslint from 'typescript-eslint';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    ...tseslint.configs.recommended.map((c) => ({ ...c, files: ['src/**/*.{ts,tsx}', 'index.tsx'] })),
    {
        files: ['src/**/*.{ts,tsx}', 'index.tsx'],
        plugins: { tailwindcss },
        settings: {
            tailwindcss: { config: 'tailwind.config.js' },
        },
        rules: {
            /* 디자인 토큰 이탈 차단 — text-[#003E7E], p-[13px] 같은 임의값 금지 */
            'tailwindcss/no-arbitrary-value': 'error',
            'tailwindcss/no-contradicting-classname': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
