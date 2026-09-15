import type { IncomingMessage, ServerResponse } from 'http';
import { sendInquiryEmail, type InquiryNotifyPayload } from './_lib/sendInquiryEmail';

type NodeReq = IncomingMessage & { body?: InquiryNotifyPayload };

const json = (res: ServerResponse, status: number, body: Record<string, unknown>) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
};

const readJson = async (req: NodeReq): Promise<InquiryNotifyPayload> => {
    if (req.body && typeof req.body === 'object') {
        return req.body;
    }

    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const raw = Buffer.concat(chunks).toString('utf8');
    if (!raw) {
        throw new Error('empty_body');
    }
    return JSON.parse(raw) as InquiryNotifyPayload;
};

export default async function handler(req: NodeReq, res: ServerResponse) {
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method !== 'POST') {
        json(res, 405, { ok: false, error: 'method_not_allowed' });
        return;
    }

    try {
        const payload = await readJson(req);
        await sendInquiryEmail(payload);
        json(res, 200, { ok: true });
    } catch (error) {
        console.error('[notify-inquiry]', error instanceof Error ? error.message : error);
        json(res, 500, { ok: false });
    }
}
