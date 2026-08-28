import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../common';
import { COMPANY_NAME } from '../../data/constants';

export const ADMIN_AUTH_KEY = 'tuk_admin_auth';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin123!';

interface AdminLoginProps {
    onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem(ADMIN_AUTH_KEY, '1');
            setError('');
            onSuccess();
            return;
        }
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
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
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            placeholder="이메일을 입력하세요"
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
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-danger bg-danger/5 border border-danger/20 rounded-xl px-4 py-3" role="alert">
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="w-full">로그인</Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
