import { supabase } from './supabase';

export async function notifyInquiryByEmail(payload: {
    inquiryType: string;
    name: string;
    contact: string;
    email: string;
    companyName?: string;
    content: string;
    files?: { name: string; url?: string }[];
}) {
    try {
        const res = await fetch('/api/notify-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (res.ok) return;
    } catch {
        // 로컬 API가 없거나 운영 환경변수가 없으면 Supabase 함수로 보낸다.
    }

    if (!supabase) {
        throw new Error('inquiry_email_failed');
    }

    const { error } = await supabase.functions.invoke('notify-inquiry', { body: payload });
    if (error) {
        throw new Error(error.message || 'inquiry_email_failed');
    }
}
