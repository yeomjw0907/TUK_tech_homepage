import React from 'react';
import { ChevronLeft, Building, ExternalLink, User, FileText } from 'lucide-react';
import { Company } from '../../types';

interface CompanyDetailProps {
    company: Company;
    onBack: () => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack }) => {
    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button onClick={onBack} className="flex items-center text-slate-500 hover:text-[#003E7E] font-bold mb-8 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
            </button>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="h-64 bg-slate-800 relative">
                    {company.bgImage ? (
                        <>
                            <img src={company.bgImage} alt="background" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-slate-800"></div>
                    )}

                    <div className="absolute -bottom-10 left-10 flex items-end gap-6">
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                            {company.logo ? (
                                <img src={company.logo} alt="logo" className="w-full h-full object-contain p-2" />
                            ) : (
                                <Building className="w-12 h-12 text-slate-300" />
                            )}
                        </div>
                        <div className="mb-4 text-white">
                            <h1 className="text-2xl md:text-3xl font-black mb-2 shadow-sm">{company.name}</h1>
                            <p className="text-base md:text-lg opacity-90 font-medium">{company.shortDesc || company.business}</p>
                        </div>
                    </div>
                </div>
                <div className="pt-20 pb-10 px-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex gap-2 mb-3">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${company.category === 'subsidiary' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                    {company.category === 'subsidiary' ? 'subsidiary' : 'portfolio'}
                                </span>
                                {company.isTips && <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600">TIPS</span>}
                            </div>
                            <p className="text-base md:text-lg text-slate-500 font-medium">{company.business}</p>
                        </div>
                        {company.homepage && (
                            <a href={company.homepage} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-slate-50 hover:bg-[#003E7E] hover:text-white rounded-full transition-all text-slate-400 border border-slate-100">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-slate-100">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center"><User className="w-5 h-5 mr-2 text-[#003E7E]" /> 기업 정보</h3>
                            <div className="space-y-4">
                                <div className="flex border-b border-slate-50 pb-3">
                                    <span className="w-32 text-slate-500 font-medium text-sm">대표자</span>
                                    <span className="text-slate-900 font-bold">{company.ceo}</span>
                                </div>
                                <div className="flex border-b border-slate-50 pb-3">
                                    <span className="w-32 text-slate-500 font-medium text-sm">설립일</span>
                                    <span className="text-slate-900 font-bold">{company.foundedDate}</span>
                                </div>
                                <div className="flex border-b border-slate-50 pb-3">
                                    <span className="w-32 text-slate-500 font-medium text-sm">입주정보</span>
                                    <span className="text-slate-900 font-bold">{company.room} (입주: {company.moveInDate})</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-[#003E7E]" /> 기업 소개</h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {company.note === '-' ? `${company.name}은(는) ${company.business} 분야에서 혁신적인 솔루션을 제공하는 기업입니다.` : company.note}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
