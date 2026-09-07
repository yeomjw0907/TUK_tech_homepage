import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase 연결 설정.
 * - 우선순위: Vite 환경변수(VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) → 아래 기본값
 * - anon key는 공개용 키이며, 모든 쓰기 권한은 DB의 RLS 정책(관리자 로그인 필요)으로 보호된다.
 */
const DEFAULT_URL = '';
const DEFAULT_ANON_KEY = '';

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || DEFAULT_URL;
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || DEFAULT_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
    ? createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } })
    : null;

/** 업로드 파일이 저장되는 공개 버킷 이름 */
export const STORAGE_BUCKET = 'uploads';
