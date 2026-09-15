import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_TEXT = 5000;
const MAX_CONTENT = 20000;

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

const row = (label: string, value: string) => `
  <tr>
    <th align="left" style="padding:8px 12px;background:#f4f6f8;border:1px solid #e5e7eb;width:140px;font-size:13px;color:#334155;">${escapeHtml(label)}</th>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:13px;color:#0f172a;white-space:pre-wrap;">${value}</td>
  </tr>
`;

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ ok: false }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        const payload = await req.json();
        const apiKey = Deno.env.get("RESEND_API_KEY")?.trim();
        if (!apiKey) {
            throw new Error("RESEND_API_KEY is not set");
        }

        const inquiryType = clip(payload.inquiryType, MAX_TEXT);
        const name = clip(payload.name, MAX_TEXT);
        const contact = clip(payload.contact, MAX_TEXT);
        const email = clip(payload.email, MAX_TEXT);
        const companyName = clip(payload.companyName, MAX_TEXT);
        const content = clip(payload.content, MAX_CONTENT);

        if (!inquiryType || !name || !contact || !email || !content) {
            throw new Error("invalid_payload");
        }

        const files = (payload.files ?? []).slice(0, 8);
        const fileHtml = files.length
            ? files.map((file: { name?: string; url?: string }) => {
                const fileName = escapeHtml(clip(file.name, 200) || "첨부파일");
                return file.url ? `<a href="${escapeHtml(file.url)}">${fileName}</a>` : fileName;
            }).join("<br/>")
            : "없음";

        const to = Deno.env.get("INQUIRY_NOTIFY_EMAIL")?.trim() || "tuholdings@tukorea.ac.kr";
        const from = Deno.env.get("RESEND_FROM")?.trim() || "한국공학대학교 기술지주회사 <noreply@namhyeondong.com>";

        const html = `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
            <p style="margin:0 0 16px;">홈페이지 문의/신청이 접수되었습니다.</p>
            <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px;">
              ${row("문의유형", escapeHtml(inquiryType))}
              ${row("이름", escapeHtml(name))}
              ${row("연락처", escapeHtml(contact))}
              ${row("이메일", escapeHtml(email))}
              ${row("기업명", escapeHtml(companyName || "-"))}
              ${row("문의내용", escapeHtml(content))}
              ${row("첨부파일", fileHtml)}
            </table>
          </div>
        `;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to: [to],
                reply_to: email,
                subject: `[홈페이지 문의] ${inquiryType} - ${name}`,
                html,
            }),
        });

        if (!res.ok) {
            const detail = await res.text();
            throw new Error(`resend_failed:${res.status}:${detail.slice(0, 300)}`);
        }

        return new Response(JSON.stringify({ ok: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("[notify-inquiry]", error instanceof Error ? error.message : error);
        return new Response(JSON.stringify({ ok: false }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
