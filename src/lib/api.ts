import { Company, Post, Inquiry, Popup, PostFile } from '../types';
import { INITIAL_COMPANIES, INITIAL_POSTS, INITIAL_POPUPS } from '../data/initialData';
import { loadState, saveState } from '../utils/storage';
import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from './supabase';

/**
 * 데이터 접근 계층.
 * - Supabase가 설정되어 있으면 서버 DB를 사용한다 (모든 방문자에게 동일한 데이터).
 * - 설정이 없으면 기존 방식(localStorage)으로 동작한다 (개발/미리보기용).
 */

export interface UploadedFile extends PostFile {
    url: string;
}

export interface SiteData {
    companies: Company[];
    posts: Post[];
    inquiries: Inquiry[];
    popups: Popup[];
}

// ───────────────────────── row ↔ model 변환 ─────────────────────────

type PostRow = {
    id: number; category: Post['category']; title: string; date: string; author: string | null;
    views: number | null; content: string | null; is_new: boolean | null;
    file_type: string | null; file_name: string | null; file_url: string | null; files: PostFile[] | null;
};
type CompanyRow = {
    id: string; name: string; ceo: string | null; founded_date: string | null; business: string | null;
    room: string | null; move_in_date: string | null; homepage: string | null; note: string | null;
    is_tips: boolean | null; category: Company['category']; logo: string | null; bg_image: string | null;
    short_desc: string | null; sort_order: number | null;
};
type InquiryRow = {
    id: number; inquiry_type: string | null; name: string; contact: string; email: string;
    company_name: string | null; content: string; date: string; status: Inquiry['status'];
};
type PopupRow = {
    id: number; title: string; image: string | null; content: string | null; link: string | null;
    start_date: string; end_date: string; is_visible: boolean;
};

const nz = <T,>(v: T | null | undefined, fallback: T): T => (v === null || v === undefined ? fallback : v);

const postFromRow = (r: PostRow): Post => ({
    id: r.id, category: r.category, title: r.title, date: r.date,
    author: nz(r.author, '관리자'), views: nz(r.views, 0), content: nz(r.content, ''),
    isNew: nz(r.is_new, false),
    fileType: r.file_type ?? undefined, fileName: r.file_name ?? undefined, fileUrl: r.file_url ?? undefined,
    files: nz(r.files, []),
});
const postToRow = (p: Partial<Post>): Partial<PostRow> => ({
    ...(p.category !== undefined && { category: p.category }),
    ...(p.title !== undefined && { title: p.title }),
    ...(p.date !== undefined && { date: p.date }),
    ...(p.author !== undefined && { author: p.author }),
    ...(p.views !== undefined && { views: p.views }),
    ...(p.content !== undefined && { content: p.content }),
    ...(p.isNew !== undefined && { is_new: p.isNew }),
    ...('fileType' in p && { file_type: p.fileType ?? null }),
    ...('fileName' in p && { file_name: p.fileName ?? null }),
    ...('fileUrl' in p && { file_url: p.fileUrl ?? null }),
    ...(p.files !== undefined && { files: p.files }),
});

const companyFromRow = (r: CompanyRow): Company => ({
    id: r.id, name: r.name, ceo: nz(r.ceo, ''), foundedDate: nz(r.founded_date, ''), business: nz(r.business, ''),
    room: nz(r.room, ''), moveInDate: nz(r.move_in_date, ''), homepage: nz(r.homepage, ''), note: nz(r.note, ''),
    isTips: nz(r.is_tips, false), category: r.category,
    logo: r.logo ?? undefined, bgImage: r.bg_image ?? undefined, shortDesc: r.short_desc ?? undefined,
});
const companyToRow = (c: Partial<Company>): Partial<CompanyRow> => ({
    ...(c.id !== undefined && { id: c.id }),
    ...(c.name !== undefined && { name: c.name }),
    ...(c.ceo !== undefined && { ceo: c.ceo }),
    ...(c.foundedDate !== undefined && { founded_date: c.foundedDate || null }),
    ...(c.business !== undefined && { business: c.business }),
    ...(c.room !== undefined && { room: c.room }),
    ...(c.moveInDate !== undefined && { move_in_date: c.moveInDate || null }),
    ...(c.homepage !== undefined && { homepage: c.homepage }),
    ...(c.note !== undefined && { note: c.note }),
    ...(c.isTips !== undefined && { is_tips: c.isTips }),
    ...(c.category !== undefined && { category: c.category }),
    ...('logo' in c && { logo: c.logo || null }),
    ...('bgImage' in c && { bg_image: c.bgImage || null }),
    ...('shortDesc' in c && { short_desc: c.shortDesc || null }),
});

const inquiryFromRow = (r: InquiryRow): Inquiry => ({
    id: r.id, inquiryType: r.inquiry_type ?? undefined, name: r.name, contact: r.contact, email: r.email,
    companyName: r.company_name ?? undefined, content: r.content, date: r.date, status: r.status,
});

const popupFromRow = (r: PopupRow): Popup => ({
    id: r.id, title: r.title, image: r.image ?? undefined, content: r.content ?? undefined,
    link: r.link ?? undefined, startDate: r.start_date, endDate: r.end_date, isVisible: r.is_visible,
});
const popupToRow = (p: Partial<Popup>): Partial<PopupRow> => ({
    ...(p.title !== undefined && { title: p.title }),
    ...('image' in p && { image: p.image || null }),
    ...('content' in p && { content: p.content || null }),
    ...('link' in p && { link: p.link || null }),
    ...(p.startDate !== undefined && { start_date: p.startDate }),
    ...(p.endDate !== undefined && { end_date: p.endDate }),
    ...(p.isVisible !== undefined && { is_visible: p.isVisible }),
});

// ───────────────────────── 백엔드 인터페이스 ─────────────────────────

export interface Backend {
    readonly mode: 'supabase' | 'local';
    fetchAll(): Promise<SiteData>;

    createPost(data: Omit<Post, 'id'>): Promise<Post>;
    updatePost(id: number, data: Partial<Post>): Promise<void>;
    deletePost(id: number): Promise<void>;
    incrementViews(id: number): Promise<void>;

    createCompany(data: Company): Promise<Company>;
    updateCompany(id: string, data: Partial<Company>): Promise<void>;
    deleteCompany(id: string): Promise<void>;

    createInquiry(data: Omit<Inquiry, 'id'>): Promise<void>;
    updateInquiryStatus(id: number, status: Inquiry['status']): Promise<void>;
    deleteInquiry(id: number): Promise<void>;

    createPopup(data: Omit<Popup, 'id'>): Promise<Popup>;
    updatePopup(id: number, data: Partial<Popup>): Promise<void>;
    deletePopup(id: number): Promise<void>;

    uploadFile(file: File, folder: string): Promise<UploadedFile>;
}

const fail = (context: string, error: { message: string } | null) => {
    if (error) throw new Error(`${context}: ${error.message}`);
};

// ───────────────────────── Supabase 백엔드 ─────────────────────────

const createSupabaseBackend = (): Backend => {
    const db = supabase!;
    return {
        mode: 'supabase',

        async fetchAll() {
            const [posts, companies, popups] = await Promise.all([
                db.from('posts').select('*').order('date', { ascending: false }).order('id', { ascending: false }),
                db.from('companies').select('*').order('sort_order', { ascending: true }).order('name', { ascending: true }),
                db.from('popups').select('*').order('id', { ascending: true }),
            ]);
            fail('게시글 조회', posts.error);
            fail('기업 조회', companies.error);
            fail('팝업 조회', popups.error);

            // 문의 내역은 관리자만 조회 가능(RLS). 비로그인 상태면 빈 목록이 온다.
            const inquiries = await db.from('inquiries').select('*').order('id', { ascending: false });
            return {
                posts: (posts.data as PostRow[]).map(postFromRow),
                companies: (companies.data as CompanyRow[]).map(companyFromRow),
                popups: (popups.data as PopupRow[]).map(popupFromRow),
                inquiries: inquiries.error ? [] : (inquiries.data as InquiryRow[]).map(inquiryFromRow),
            };
        },

        async createPost(data) {
            const { data: row, error } = await db.from('posts').insert(postToRow(data)).select('*').single();
            fail('게시글 저장', error);
            return postFromRow(row as PostRow);
        },
        async updatePost(id, data) {
            const { error } = await db.from('posts').update(postToRow(data)).eq('id', id);
            fail('게시글 수정', error);
        },
        async deletePost(id) {
            const { error } = await db.from('posts').delete().eq('id', id);
            fail('게시글 삭제', error);
        },
        async incrementViews(id) {
            await db.rpc('increment_post_views', { post_id: id });
        },

        async createCompany(data) {
            const { data: row, error } = await db.from('companies').insert(companyToRow(data)).select('*').single();
            fail('기업 저장', error);
            return companyFromRow(row as CompanyRow);
        },
        async updateCompany(id, data) {
            const payload = companyToRow(data);
            delete payload.id;
            const { error } = await db.from('companies').update(payload).eq('id', id);
            fail('기업 수정', error);
        },
        async deleteCompany(id) {
            const { error } = await db.from('companies').delete().eq('id', id);
            fail('기업 삭제', error);
        },

        async createInquiry(data) {
            const { error } = await db.from('inquiries').insert({
                inquiry_type: data.inquiryType ?? null, name: data.name, contact: data.contact, email: data.email,
                company_name: data.companyName || null, content: data.content, date: data.date, status: data.status,
            });
            fail('문의 접수', error);
        },
        async updateInquiryStatus(id, status) {
            const { error } = await db.from('inquiries').update({ status }).eq('id', id);
            fail('문의 상태 변경', error);
        },
        async deleteInquiry(id) {
            const { error } = await db.from('inquiries').delete().eq('id', id);
            fail('문의 삭제', error);
        },

        async createPopup(data) {
            const { data: row, error } = await db.from('popups').insert(popupToRow(data)).select('*').single();
            fail('팝업 저장', error);
            return popupFromRow(row as PopupRow);
        },
        async updatePopup(id, data) {
            const { error } = await db.from('popups').update(popupToRow(data)).eq('id', id);
            fail('팝업 수정', error);
        },
        async deletePopup(id) {
            const { error } = await db.from('popups').delete().eq('id', id);
            fail('팝업 삭제', error);
        },

        async uploadFile(file, folder) {
            const ext = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : '';
            const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext ? '.' + ext : ''}`;
            const path = `${folder}/${safeName}`;
            const { error } = await db.storage.from(STORAGE_BUCKET).upload(path, file, {
                cacheControl: '3600', upsert: false, contentType: file.type || undefined,
            });
            fail('파일 업로드', error);
            const { data } = db.storage.from(STORAGE_BUCKET).getPublicUrl(path);
            return {
                name: file.name,
                type: ext ? ext.toUpperCase() : (file.type || 'FILE'),
                size: file.size,
                url: data.publicUrl,
            };
        },
    };
};

// ───────────────────────── localStorage 백엔드 (fallback) ─────────────────────────

const createLocalBackend = (): Backend => {
    const read = (): SiteData => ({
        companies: loadState('companies', INITIAL_COMPANIES),
        posts: loadState('posts', INITIAL_POSTS),
        inquiries: loadState('inquiries', []),
        popups: loadState('popups', INITIAL_POPUPS),
    });
    const write = <K extends keyof SiteData>(key: K, value: SiteData[K]) => saveState(key, value);

    return {
        mode: 'local',
        async fetchAll() { return read(); },

        async createPost(data) {
            const post = { ...data, id: Date.now() } as Post;
            write('posts', [post, ...read().posts]);
            return post;
        },
        async updatePost(id, data) {
            write('posts', read().posts.map(p => (p.id === id ? { ...p, ...data } : p)));
        },
        async deletePost(id) { write('posts', read().posts.filter(p => p.id !== id)); },
        async incrementViews(id) {
            write('posts', read().posts.map(p => (p.id === id ? { ...p, views: (p.views || 0) + 1 } : p)));
        },

        async createCompany(data) {
            write('companies', [data, ...read().companies]);
            return data;
        },
        async updateCompany(id, data) {
            write('companies', read().companies.map(c => (c.id === id ? { ...c, ...data } : c)));
        },
        async deleteCompany(id) { write('companies', read().companies.filter(c => c.id !== id)); },

        async createInquiry(data) {
            write('inquiries', [{ ...data, id: Date.now() } as Inquiry, ...read().inquiries]);
        },
        async updateInquiryStatus(id, status) {
            write('inquiries', read().inquiries.map(i => (i.id === id ? { ...i, status } : i)));
        },
        async deleteInquiry(id) { write('inquiries', read().inquiries.filter(i => i.id !== id)); },

        async createPopup(data) {
            const popup = { ...data, id: Date.now() } as Popup;
            write('popups', [...read().popups, popup]);
            return popup;
        },
        async updatePopup(id, data) {
            write('popups', read().popups.map(p => (p.id === id ? { ...p, ...data } : p)));
        },
        async deletePopup(id) { write('popups', read().popups.filter(p => p.id !== id)); },

        async uploadFile(file) {
            // 서버가 없으므로 브라우저 메모리 URL을 사용한다 (새로고침 시 사라짐).
            const ext = file.name.includes('.') ? file.name.split('.').pop()!.toUpperCase() : '';
            return { name: file.name, type: ext || file.type || 'FILE', size: file.size, url: URL.createObjectURL(file) };
        },
    };
};

export const backend: Backend = isSupabaseConfigured ? createSupabaseBackend() : createLocalBackend();
