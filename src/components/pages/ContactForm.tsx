import React, { useState } from 'react';
import { Button } from '../common';
import { Mail, Phone } from 'lucide-react';
import { INQUIRY_TYPES } from '../../data/constants';
import { InquiryType } from '../../types';

interface ContactFormProps {
    onSubmit: (data: {
        inquiryType: InquiryType;
        name: string;
        contact: string;
        email: string;
        companyName: string;
        content: string;
    }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const [inquiryType, setInquiryType] = useState<InquiryType | ''>('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inquiryType) return;
        onSubmit({ inquiryType, name, contact, email, companyName, content });
        alert('문의가 접수되었습니다.');
        setInquiryType('');
        setName('');
        setContact('');
        setEmail('');
        setCompanyName('');
        setContent('');
    };

    const inputClass =
        'w-full px-5 py-4 bg-surface-alt border border-line-md rounded-xl focus:ring-2 focus:ring-navy focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium';

    return (
        <div className="space-y-12">
            <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-15" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <p className="text-label uppercase text-white/70 mb-4">Contact</p>
                    <p className="text-white/80 text-body-lg">
                        문의유형을 선택하고 내용을 남겨주시면
                        <br className="hidden md:block" />
                        검토 후 개별 안내드립니다.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-card border border-line">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-ink mb-3">문의유형</label>
                        <select
                            value={inquiryType}
                            onChange={e => setInquiryType(e.target.value as InquiryType)}
                            required
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option value="" disabled>
                                문의유형을 선택하세요
                            </option>
                            {INQUIRY_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">이름</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                type="text"
                                className={inputClass}
                                placeholder="성함을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">연락처</label>
                            <input
                                value={contact}
                                onChange={e => setContact(e.target.value)}
                                required
                                type="text"
                                className={inputClass}
                                placeholder="연락처를 입력하세요"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">이메일</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                type="email"
                                className={inputClass}
                                placeholder="이메일 주소를 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">기업명</label>
                            <input
                                value={companyName}
                                onChange={e => setCompanyName(e.target.value)}
                                required
                                type="text"
                                className={inputClass}
                                placeholder="기업명을 입력하세요"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-ink mb-3">문의내용</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            rows={6}
                            className={`${inputClass} resize-none`}
                            placeholder="문의하실 내용을 입력하세요"
                        />
                    </div>

                    <div className="text-center pt-6">
                        <Button variant="primary" size="xl" className="w-full md:w-auto">
                            지원하기
                        </Button>
                    </div>
                </form>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                <div className="bg-surface-alt rounded-2xl p-6 border border-line">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-h4 text-ink">이메일</h3>
                    </div>
                    <a href="mailto:tuholdings@tukorea.ac.kr" className="text-navy font-medium hover:underline">
                        tuholdings@tukorea.ac.kr
                    </a>
                </div>
                <div className="bg-surface-alt rounded-2xl p-6 border border-line">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-h4 text-ink">전화</h3>
                    </div>
                    <a href="tel:031-8041-0965" className="text-navy font-medium hover:underline">
                        031-8041-0965
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
