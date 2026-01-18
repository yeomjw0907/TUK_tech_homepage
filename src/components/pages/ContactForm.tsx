import React, { useState } from 'react';
import { SectionTitle, Button } from '../common';

interface ContactFormProps {
    onSubmit: (data: { name: string; contact: string; email: string; content: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, contact, email, content });
        alert('문의가 접수되었습니다.');
        setName('');
        setContact('');
        setEmail('');
        setContent('');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[2rem] shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
            <SectionTitle title="문의하기" subtitle="Get in Touch" />
            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">이름</label>
                        <input value={name} onChange={e => setName(e.target.value)} required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="성함을 입력하세요" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">연락처</label>
                        <input value={contact} onChange={e => setContact(e.target.value)} required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="연락처를 입력하세요" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">이메일</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" placeholder="이메일 주소를 입력하세요" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">문의내용</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} required rows={6} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium resize-none" placeholder="문의하실 내용을 입력하세요"></textarea>
                </div>
                <div className="text-center pt-8">
                    <Button size="xl" className="w-full md:w-auto min-w-[200px] shadow-lg hover:shadow-xl hover:-translate-y-1">문의하기</Button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
