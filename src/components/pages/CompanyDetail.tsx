import React from 'react';
import { ChevronLeft, Building, ExternalLink, User, FileText } from 'lucide-react';
import { Company } from '../../types';
import { Badge } from '../common';
import { formatDate } from '../../utils/format';

interface CompanyDetailProps {
    company: Company;
    onBack: () => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack }) => {
    const getDetailLogoSrc = (logo?: string) => {
        if (!logo) return '';
        // If explicit filename is already provided, use it as-is.
        if (/\.[a-zA-Z0-9]+($|\?)/.test(logo)) return logo;
        return `${logo}2.svg`;
    };

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button onClick={onBack} className="flex items-center text-ink-soft hover:text-navy font-bold mb-8 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
            </button>
            <div className="bg-white rounded-2xl shadow-card border border-line overflow-hidden">
                <div className="h-64 bg-navy-deep relative">
                    {company.bgImage ? (
                        <>
                            <img src={company.bgImage} alt="background" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-navy-deep"></div>
                    )}

                    <div className="absolute -bottom-10 left-10 flex items-end gap-6">
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                            {company.logo ? (
                                <img src={getDetailLogoSrc(company.logo)} alt="logo" className="w-full h-full object-contain p-2 bg-white" />
                            ) : (
                                <Building className="w-12 h-12 text-ink-faint" />
                            )}
                        </div>
                        <div className="mb-4 text-white">
                            <h1 className="text-h1 mb-2">{company.name}</h1>
                            <p className="text-base md:text-lg opacity-90 font-medium">{company.shortDesc || company.business}</p>
                        </div>
                    </div>
                </div>
                <div className="pt-20 pb-10 px-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex gap-2 mb-3">
                                <Badge variant="navy">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</Badge>
                                {company.isTips && <Badge variant="gold">TIPS</Badge>}
                            </div>
                            <p className="text-base md:text-lg text-ink-soft font-medium">{company.business}</p>
                        </div>
                        {company.homepage && (
                            <a href={company.homepage} target="_blank" rel="noreferrer" aria-label="기업 홈페이지 방문" className="flex items-center justify-center w-12 h-12 bg-surface-alt hover:bg-navy hover:text-white rounded-full transition-all text-ink-faint border border-line">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-line">
                        <div>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center"><User className="w-5 h-5 mr-2 text-navy" /> 기업 정보</h3>
                            <div className="space-y-4">
                                <div className="flex border-b border-line pb-3">
                                    <span className="w-32 text-ink-soft font-medium text-sm">대표자</span>
                                    <span className="text-ink font-bold">{company.ceo}</span>
                                </div>
                                <div className="flex border-b border-line pb-3">
                                    <span className="w-32 text-ink-soft font-medium text-sm">설립일</span>
                                    <span className="text-ink font-bold">{formatDate(company.foundedDate)}</span>
                                </div>
                                <div className="flex border-b border-line pb-3">
                                    <span className="w-32 text-ink-soft font-medium text-sm">입주정보</span>
                                    <span className="text-ink font-bold">{company.room} (입주: {formatDate(company.moveInDate)})</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-navy" /> 기업 소개</h3>
                            <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
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
