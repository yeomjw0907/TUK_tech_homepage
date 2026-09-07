import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../common';
import { COMPANY_NAME } from '../../data/constants';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const ADMIN_AUTH_KEY = 'tuk_admin_auth';

/** Supabase 미설정(로컬 미리보기) 환경에서만 사용하는 임시 계정 */
const LOCAL_ADMIN_EMAIL = 'admin@gmail.com';
const LOCAL_ADMIN_PASSWORD = 'Admin123!';

interface AdminLoginProps {
    onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isSupabaseConfigured || !supabase) {
            if (email.trim() === LOCAL_ADMIN_EMAIL && password === LOCAL_ADMIN_PASSWORD) {
                sessionStorage.setItem(ADMIN_AUTH_KEY, '1');
                onSuccess();
                return;
            }
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            return;
        }

        setSubmitting(true);
        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });
            if (authError) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
                return;
            }
            sessionStorage.setItem(ADMIN_AUTH_KEY, '1');
            onSuccess();
        } catch {
            setError('로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = 'w-full px-4 py-3 border border-line-md rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all bg-white shadow-sm text-ink placeholder-ink-faint';

    return (
        <div className="min-h-screen bg-surface-alt flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-navy/20">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-h3 text-ink mb-2">관리자 로그인</h1>
                    <p className="text-sm text-ink-soft">{COMPANY_NAME}</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-line shadow-card p-8 space-y-5">
                    <div>
                        <label htmlFor="admin-email" className="block text-sm font-bold text-ink mb-1.5">이메일</label>
                        <input
                            id="admin-email"
                            type="email"
                            autoComplete="username"
                            className={inputClass}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="admin-password" className="block text-sm font-bold text-ink mb-1.5">비밀번호</label>
                        <input
                            id="admin-password"
                            type="password"
                            autoComplete="current-password"
                            className={inputClass}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
                    )}
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? '로그인 중...' : '로그인'}
                    </Button>
                    {!isSupabaseConfigured && (
                        <p className="text-xs text-ink-faint text-center">
                            서버가 연결되지 않아 로컬 미리보기 모드로 동작합니다.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
