import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { sendInquiryEmail } from './api/_lib/sendInquiryEmail';

function inquiryEmailPlugin(env: Record<string, string>): Plugin {
    return {
        name: 'inquiry-email-api',
        configureServer(server) {
            server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
                const url = req.url?.split('?')[0];
                if (url !== '/api/notify-inquiry') {
                    next();
                    return;
                }

                if (req.method === 'OPTIONS') {
                    res.statusCode = 204;
                    res.end();
                    return;
                }

                if (req.method !== 'POST') {
                    res.statusCode = 405;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ ok: false }));
                    return;
                }

                try {
                    const chunks: Buffer[] = [];
                    for await (const chunk of req) {
                        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                    }
                    const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                    await sendInquiryEmail(payload, env);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ ok: true }));
                } catch (error) {
                    console.error('[notify-inquiry]', error instanceof Error ? error.message : error);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ ok: false }));
                }
            });
        },
    };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: Number(process.env.PORT) || 3000,
        host: 'localhost',
      },
      plugins: [inquiryEmailPlugin(env), react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // SPA 라우팅을 위한 fallback 설정
      build: {
        rollupOptions: {
          output: {
            manualChunks: undefined
          }
        }
      }
    };
});
