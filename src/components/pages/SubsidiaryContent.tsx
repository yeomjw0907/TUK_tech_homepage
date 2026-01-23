import React from 'react';
import { Building, Lightbulb, FileText, Users, Presentation, Gavel, Award, ArrowRight, Target, CheckCircle, Rocket, TrendingUp, Briefcase, Sparkles, DollarSign, BarChart3 } from 'lucide-react';
import { Card } from '../common';

interface SubsidiaryContentProps {
    subPage: string;
}

const SubsidiaryContent: React.FC<SubsidiaryContentProps> = ({ subPage }) => {
    if (subPage === 'procedure') {
        return (
            <div className="space-y-20">
                {/* 헤더 */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">자회사 설립/편입 절차</h2>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                        예비창업자부터 벤처기업까지, 단계별 투자 프로세스를 통해 성장을 지원합니다
                    </p>
                </div>

                {/* 자회사 현황 */}
                <div className="bg-gradient-to-br from-[#003E7E] via-[#004a8f] to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-black mb-2">자회사 현황</h3>
                            <p className="text-sm md:text-base text-blue-100">2024년 기준</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Building,
                                    label: "현재 자회사수",
                                    value: "16개사",
                                    desc: "운영 중인 자회사"
                                },
                                {
                                    icon: DollarSign,
                                    label: "총투자금액",
                                    value: "311,223,011",
                                    unit: "원",
                                    desc: "누적 투자 규모",
                                    format: (num: number) => {
                                        if (num >= 100000000) {
                                            return `${(num / 100000000).toFixed(2)}억원`;
                                        } else if (num >= 10000) {
                                            return `${(num / 10000).toFixed(0)}만원`;
                                        }
                                        return `${num.toLocaleString()}원`;
                                    }
                                },
                                {
                                    icon: BarChart3,
                                    label: "기업가치",
                                    value: "1,814,103,011",
                                    unit: "원",
                                    desc: "총 기업가치",
                                    format: (num: number) => {
                                        if (num >= 100000000) {
                                            return `${(num / 100000000).toFixed(2)}억원`;
                                        } else if (num >= 10000) {
                                            return `${(num / 10000).toFixed(0)}만원`;
                                        }
                                        return `${num.toLocaleString()}원`;
                                    }
                                }
                            ].map((item, idx) => {
                                const displayValue = item.format 
                                    ? item.format(parseInt(item.value.replace(/,/g, '')))
                                    : item.value;
                                
                                return (
                                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                        <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-xl mb-4">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-blue-100 font-bold mb-2">{item.label}</div>
                                            <div className="text-xl md:text-2xl font-black mb-1 break-words">
                                                {displayValue}
                                            </div>
                                            <div className="text-xs text-blue-200 mt-1">{item.desc}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 자회사 투자 프로세스 */}
                <div className="space-y-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">자회사 투자 프로세스</h3>
                        <p className="text-base md:text-lg text-slate-500">대상에 따라 차별화된 투자 프로세스를 제공합니다</p>
                    </div>

                    {/* 예비창업자 프로세스 */}
                    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
                        <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-8 border-b-2 border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Target className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1">예비창업자</h4>
                                    <p className="text-xs md:text-sm text-slate-600 font-medium">Pre-Startup Process</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {[
                                    { step: "발굴 공모", desc: "TU-RN Up 창업 공모", icon: Briefcase },
                                    { step: "선정", desc: "심사 및 선정", icon: CheckCircle },
                                    { step: "투자 및 설립", desc: "자회사 투자 및 설립", icon: Building },
                                    { step: "Company Building", desc: "Company Building & Incubating (TU-RN Up 프로그램)", icon: Rocket },
                                    { step: "후속 투자", desc: "성장 단계별 후속 투자", icon: TrendingUp },
                                    { step: "TIPS 추천", desc: "TIPS 프로그램 추천", icon: Award }
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex flex-col items-center group">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 flex items-center justify-center mb-3 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
                                                <item.icon className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <div className="text-center max-w-[140px]">
                                                <div className="font-black text-slate-900 text-sm mb-1">{item.step}</div>
                                                <div className="text-xs text-slate-600 leading-tight">{item.desc}</div>
                                            </div>
                                        </div>
                                        {idx < 5 && (
                                            <ArrowRight className="w-6 h-6 text-slate-400 shrink-0 hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 벤처기업 프로세스 */}
                    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
                        <div className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 p-8 border-b-2 border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1">벤처기업</h4>
                                    <p className="text-xs md:text-sm text-slate-600 font-medium">Venture Company Process</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {[
                                    { step: "기업 발굴", desc: "유망 벤처기업 발굴", icon: Briefcase },
                                    { step: "요건 검토", desc: "자회사 편입 요건 검토", icon: CheckCircle },
                                    { step: "투자 및 편입", desc: "자회사 투자 및 편입", icon: Building },
                                    { step: "기술이전", desc: "기술이전 및 기술사업화 협업", icon: Lightbulb },
                                    { step: "Scale Up", desc: "Scale Up (TU-RN Up 프로그램)", icon: TrendingUp },
                                    { step: "TIPS 추천", desc: "TIPS 프로그램 추천", icon: Award }
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex flex-col items-center group">
                                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 flex items-center justify-center mb-3 group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
                                                <item.icon className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <div className="text-center max-w-[140px]">
                                                <div className="font-black text-slate-900 text-sm mb-1">{item.step}</div>
                                                <div className="text-xs text-slate-600 leading-tight">{item.desc}</div>
                                            </div>
                                        </div>
                                        {idx < 5 && (
                                            <ArrowRight className="w-6 h-6 text-slate-400 shrink-0 hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 자회사 지원사항 */}
                <div className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">자회사 지원사항</h3>
                        <p className="text-base md:text-lg text-slate-500">자회사의 성장을 위한 다양한 지원 프로그램을 제공합니다</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="group bg-white rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all duration-300 overflow-hidden">
                            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b-2 border-slate-200">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Building className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 mb-1">창업보육센터</h4>
                                        <p className="text-xs md:text-sm text-slate-600 font-medium">Business Incubating (BI) 프로그램</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-700 leading-relaxed">
                                    창업보육센터를 통한 입주 지원 및 인큐베이팅 서비스를 제공하여 초기 창업 기업의 안정적인 성장을 지원합니다.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 overflow-hidden">
                            <div className="relative bg-gradient-to-r from-indigo-50 to-purple-50 p-8 border-b-2 border-slate-200">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 mb-1">TU-RN Up & TIPS</h4>
                                        <p className="text-xs md:text-sm text-slate-600 font-medium">성장 지원 프로그램</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                        <span><strong className="text-indigo-700">TU-RN Up 프로그램</strong>: Company Building 및 Scale Up 지원</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                        <span><strong className="text-indigo-700">TIPS 프로그램</strong>: 기술아이템 보유 창업팀 집중 육성</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'exit') {
        return (
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">성공적인 투자 회수 사례</h2>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                        한국공학대학교 기술지주회사는 자회사의 성장을 지원하고, <br />
                        적절한 시점에 M&A, IPO 등을 통해 수익을 실현합니다.
                    </p>
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#003E7E] shadow-sm">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">주요 성과</h4>
                                <p className="text-sm text-slate-500">2024년 기준</p>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center text-slate-700 font-medium border-b border-blue-100 pb-2">
                                <span>투자 회수율</span>
                                <span className="font-bold text-[#003E7E]">185%</span>
                            </li>
                            <li className="flex justify-between items-center text-slate-700 font-medium">
                                <span>M&A 사례</span>
                                <span className="font-bold text-[#003E7E]">2건</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">연도별 회수 현황</h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-slate-100">
                        {[30, 45, 25, 60, 80].map((h, i) => (
                            <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group">
                                <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-[#003E7E] rounded-t-lg transition-all duration-1000"></div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}억</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 mt-4 px-4">
                        <span>2020</span>
                        <span>2021</span>
                        <span>2022</span>
                        <span>2023</span>
                        <span>2024</span>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'support') {
        return (
            <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">자회사 성장지원</h2>
                    <p className="text-base md:text-lg text-slate-500">한국공학대학교 기술지주회사는 자회사의 지속적인 성장을 위해 다양한 지원 프로그램을 운영합니다.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "공간 지원", desc: "시흥비즈니스센터 및 교내 창업보육센터 입주 우대", icon: Building, color: "bg-blue-50 text-blue-600" },
                        { title: "R&D 연계", desc: "대학 교수진과의 공동 연구 및 기술 지도 매칭", icon: Lightbulb, color: "bg-amber-50 text-amber-600" },
                        { title: "정책 자금", desc: "정부 R&D 과제 및 정책 자금 수주 지원", icon: FileText, color: "bg-green-50 text-green-600" },
                        { title: "네트워킹", desc: "가족회사 및 동문 기업과의 비즈니스 네트워킹", icon: Users, color: "bg-purple-50 text-purple-600" },
                        { title: "홍보 마케팅", desc: "전시회 참가 및 언론 홍보 지원", icon: Presentation, color: "bg-rose-50 text-rose-600" },
                        { title: "법률/특허", desc: "전문가 자문단(법무, 세무, 특허) 매칭 지원", icon: Gavel, color: "bg-slate-100 text-slate-600" }
                    ].map((item, i) => (
                        <Card key={i} className="hover:border-blue-200 hover:-translate-y-1 transition-all">
                            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-5`}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default SubsidiaryContent;
