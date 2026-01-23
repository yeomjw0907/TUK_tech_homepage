import React, { useState } from 'react';
import { SectionTitle, Button } from '../common';
import { Award, Mail, Phone, FileText, CheckCircle } from 'lucide-react';

interface ContactFormProps {
    onSubmit: (data: { name: string; contact: string; email: string; content: string }) => void;
    subPage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, subPage = 'general' }) => {
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

    const isTips = subPage === 'tips';

    return (
        <div className="space-y-12">
            {/* 헤더 */}
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                    {isTips ? 'TIPS 지원하기' : '일반문의'}
                </h2>
                <p className="text-base md:text-lg text-slate-600">
                    {isTips 
                        ? 'TIPS 프로그램 지원을 위한 문의사항을 남겨주세요. 검토 후 연락드리겠습니다.'
                        : '궁금하신 사항을 남겨주시면 빠르게 답변드리겠습니다.'
                    }
                </p>
            </div>

            {/* TIPS 지원 안내 */}
            {isTips && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-10 border-2 border-indigo-200">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-black text-slate-900 mb-3">TIPS 프로그램 지원 안내</h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                    <span>세계시장을 선도할 기술아이템을 보유한 창업팀을 대상으로 합니다</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                    <span>스마트 제조, 바이오 헬스케어, 반도체 분야 등의 딥테크 기술 중심입니다</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                    <span>제출하신 내용을 검토한 후, 적합한 기업에 한해 상세 안내를 드립니다</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* 문의 폼 */}
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">이름</label>
                            <input 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                required 
                                type="text" 
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" 
                                placeholder="성함을 입력하세요" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">연락처</label>
                            <input 
                                value={contact} 
                                onChange={e => setContact(e.target.value)} 
                                required 
                                type="text" 
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" 
                                placeholder="연락처를 입력하세요" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">이메일</label>
                        <input 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            type="email" 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium" 
                            placeholder="이메일 주소를 입력하세요" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                            {isTips ? '지원 내용' : '문의내용'}
                        </label>
                        <textarea 
                            value={content} 
                            onChange={e => setContent(e.target.value)} 
                            required 
                            rows={6} 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003E7E] focus:bg-white focus:border-transparent outline-none transition-all font-medium resize-none" 
                            placeholder={isTips ? '기업 소개, 기술 내용, 지원 목적 등을 자세히 입력해주세요' : '문의하실 내용을 입력하세요'}
                        ></textarea>
                    </div>
                    <div className="text-center pt-6">
                        <Button size="xl" className="w-full md:w-auto min-w-[200px] shadow-lg hover:shadow-xl hover:-translate-y-1">
                            {isTips ? '지원하기' : '문의하기'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* 연락처 정보 */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#003E7E] text-white rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">이메일</h3>
                    </div>
                    <a href="mailto:tuholdings@tukorea.ac.kr" className="text-[#003E7E] font-medium hover:underline">
                        tuholdings@tukorea.ac.kr
                    </a>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#003E7E] text-white rounded-lg flex items-center justify-center">
                            <Phone className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">전화</h3>
                    </div>
                    <a href="tel:031-8041-0965" className="text-[#003E7E] font-medium hover:underline">
                        031-8041-0965
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
