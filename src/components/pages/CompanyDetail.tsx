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

    const shortDesc = (company.shortDesc || '').trim();
    const intro = (company.note || '').trim();
    const hasIntro = intro !== '' && intro !== '-';
    const homepage = (company.homepage || '').trim();
    const homepageHref = homepage && !/^https?:\/\//i.test(homepage) ? `https://${homepage}` : homepage;

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button onClick={onBack} className="flex items-center text-ink-soft hover:text-navy font-bold mb-8 transition-colors">
                <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
            </button>
            <div className="bg-white rounded-2xl shadow-card border border-line overflow-hidden">
                {/* 상단 배너: 기업명·한줄소개는 배너 안(어두운 배경 위)에 두고, 로고만 아래로 살짝 걸치도록 배치 */}
                <div className="h-64 bg-navy-deep relative">
                    {company.bgImage ? (
                        <>
                            <img src={company.bgImage} alt="background" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-navy-deep"></div>
                    )}

                    <div className="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 flex items-end gap-6">
                        <div className="w-32 h-32 shrink-0 translate-y-10 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                            {company.logo ? (
                                <img src={getDetailLogoSrc(company.logo)} alt="logo" className="w-full h-full object-contain p-2 bg-white" />
                            ) : (
                                <Building className="w-12 h-12 text-ink-faint" />
                            )}
                        </div>
                        <div className="pb-6 text-white min-w-0">
                            <h1 className="text-h1 mb-2 break-keep">{company.name}</h1>
                            {shortDesc && <p className="text-base md:text-lg opacity-90 font-medium break-keep">{shortDesc}</p>}
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-10 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                        <div className="flex gap-2">
                            <Badge variant="navy">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</Badge>
                            {company.isTips && <Badge variant="gold">TIPS</Badge>}
                        </div>
                        {homepage && (
                            <a
                                href={homepageHref}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${company.name} 홈페이지 방문`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-alt hover:bg-navy hover:text-white rounded-full transition-all text-ink font-bold text-sm border border-line self-start md:self-auto"
                            >
                                <ExternalLink className="w-4 h-4" /> 홈페이지
                            </a>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mt-4 pt-10 border-t border-line">
                        <div>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center"><User className="w-5 h-5 mr-2 text-navy" /> 기업 정보</h3>
                            <div className="space-y-4">
                                <div className="flex border-b border-line pb-3">
                                    <span className="w-24 shrink-0 text-ink-soft font-medium text-sm">대표자</span>
                                    <span className="text-ink font-bold">{company.ceo || '-'}</span>
                                </div>
                                <div className="flex border-b border-line pb-3">
                                    <span className="w-24 shrink-0 text-ink-soft font-medium text-sm">설립일</span>
                                    <span className="text-ink font-bold">{formatDate(company.foundedDate) || '-'}</span>
                                </div>
                                <div className="flex border-b border-line pb-3">
                                    <span className="w-24 shrink-0 text-ink-soft font-medium text-sm">주요사업</span>
                                    <span className="text-ink font-bold break-keep">{company.business || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-navy" /> 기업 소개</h3>
                            <p className="text-ink-soft leading-relaxed whitespace-pre-wrap break-keep">
                                {hasIntro
                                    ? intro
                                    : `${company.name}은(는) ${company.business || '해당'} 분야에서 혁신적인 솔루션을 제공하는 기업입니다.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
