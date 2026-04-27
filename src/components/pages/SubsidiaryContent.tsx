import React from 'react';
import { Building2, DollarSign, TrendingUp, Award, CheckCircle2, FileText, Building, Users, BarChart3, Lightbulb, Globe, Shield, ArrowRight, Target, Rocket, Briefcase, CheckCircle } from 'lucide-react';
import { Card, SectionTitle } from '../common';

interface SubsidiaryContentProps {
    subPage: string;
}

const SubsidiaryContent: React.FC<SubsidiaryContentProps> = ({ subPage }) => {
    if (subPage === 'procedure') {
        return (
            <div className="space-y-20">
                {/* 헤더 */}
                <SectionTitle title="자회사 설립/편입 절차" subtitle="Procedure" />

                {/* Stats banner — navy with grid pattern */}
                <div className="bg-[#003E7E] rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { Icon: Building2, value: "16+", label: "보유 자회사" },
                                { Icon: DollarSign, value: "313억", label: "총 투자금액" },
                                { Icon: TrendingUp, value: "2025", label: "기준 연도" },
                                { Icon: Award, value: "10+", label: "TIPS 추천" },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3 text-white">
                                        <s.Icon className="w-5 h-5" />
                                    </div>
                                    <div className="display-num text-4xl text-white mb-1 font-black">{s.value}</div>
                                    <div className="text-xs text-white/60 font-bold">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 자회사 현황 detail cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            Icon: Building,
                            label: "현재 자회사수",
                            value: "16개사",
                            desc: "운영 중인 자회사",
                            format: null
                        },
                        {
                            Icon: DollarSign,
                            label: "총투자금액",
                            value: "313,453,011",
                            desc: "누적 투자 규모 (2025년 기준)",
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
                            Icon: BarChart3,
                            label: "기업가치",
                            value: "1,814,103,011",
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
                            <div key={idx} className="bg-white border border-[rgba(0,62,126,0.08)] rounded-2xl p-6 hover:border-[rgba(0,62,126,0.20)] shadow-sm hover:shadow-md transition-all">
                                <div className="bg-[#EBF2FF] rounded-xl w-12 h-12 flex items-center justify-center text-[#003E7E] mb-4">
                                    <item.Icon className="w-6 h-6" />
                                </div>
                                <div className="text-sm text-[#4B6080] font-bold mb-2">{item.label}</div>
                                <div className="display-num text-2xl font-black text-[#003E7E] mb-1 break-words">{displayValue}</div>
                                <div className="text-xs text-[#8A9BB5] mt-1">{item.desc}</div>
                            </div>
                        );
                    })}
                </div>

                {/* 자회사 투자 프로세스 */}
                <div className="space-y-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-4">자회사 투자 프로세스</h3>
                        <p className="text-base md:text-lg text-[#4B6080]">대상에 따라 차별화된 투자 프로세스를 제공합니다</p>
                    </div>

                    {/* 예비창업자 프로세스 */}
                    <div className="bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm overflow-hidden">
                        <div className="bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center">
                                    <Target className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-[#1A2840] mb-1">예비창업자</h4>
                                    <p className="text-xs md:text-sm text-[#4B6080] font-medium">Pre-Startup Process</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {[
                                    { step: "발굴 공모", desc: "TU-RN Up 창업 공모", Icon: Briefcase },
                                    { step: "선정", desc: "심사 및 선정", Icon: CheckCircle },
                                    { step: "투자 및 설립", desc: "자회사 투자 및 설립", Icon: Building },
                                    { step: "Company Building", desc: "Company Building & Incubating (TU-RN Up 프로그램)", Icon: Rocket },
                                    { step: "후속 투자", desc: "성장 단계별 후속 투자", Icon: TrendingUp },
                                    { step: "TIPS 추천", desc: "TIPS 프로그램 추천", Icon: Award }
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex flex-col items-center group">
                                            <div className="bg-[#EBF2FF] rounded-xl w-12 h-12 flex items-center justify-center text-[#003E7E] mb-3 group-hover:bg-[#003E7E] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm border border-[rgba(0,62,126,0.10)]">
                                                <item.Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-center max-w-[140px]">
                                                <div className="font-black text-[#1A2840] text-sm mb-1">{item.step}</div>
                                                <div className="text-xs text-[#4B6080] leading-tight">{item.desc}</div>
                                            </div>
                                        </div>
                                        {idx < 5 && (
                                            <ArrowRight className="w-6 h-6 text-[#8A9BB5] shrink-0 hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 벤처기업 프로세스 */}
                    <div className="bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm overflow-hidden">
                        <div className="bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-[#1A2840] mb-1">벤처기업</h4>
                                    <p className="text-xs md:text-sm text-[#4B6080] font-medium">Venture Company Process</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {[
                                    { step: "기업 발굴", desc: "유망 벤처기업 발굴", Icon: Briefcase },
                                    { step: "요건 검토", desc: "자회사 편입 요건 검토", Icon: CheckCircle },
                                    { step: "투자 및 편입", desc: "자회사 투자 및 편입", Icon: Building },
                                    { step: "기술이전", desc: "기술이전 및 기술사업화 협업", Icon: Lightbulb },
                                    { step: "Scale Up", desc: "Scale Up (TU-RN Up 프로그램)", Icon: TrendingUp },
                                    { step: "TIPS 추천", desc: "TIPS 프로그램 추천", Icon: Award }
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex flex-col items-center group">
                                            <div className="bg-[#EBF2FF] rounded-xl w-12 h-12 flex items-center justify-center text-[#003E7E] mb-3 group-hover:bg-[#003E7E] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm border border-[rgba(0,62,126,0.10)]">
                                                <item.Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-center max-w-[140px]">
                                                <div className="font-black text-[#1A2840] text-sm mb-1">{item.step}</div>
                                                <div className="text-xs text-[#4B6080] leading-tight">{item.desc}</div>
                                            </div>
                                        </div>
                                        {idx < 5 && (
                                            <ArrowRight className="w-6 h-6 text-[#8A9BB5] shrink-0 hidden md:block" />
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
                        <h3 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-4">자회사 지원사항</h3>
                        <p className="text-base md:text-lg text-[#4B6080]">자회사의 성장을 위한 다양한 지원 프로그램을 제공합니다</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="group bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 overflow-hidden">
                            <div className="bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Building className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-[#1A2840] mb-1">창업보육센터</h4>
                                        <p className="text-xs md:text-sm text-[#4B6080] font-medium">Business Incubating (BI) 프로그램</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-[#4B6080] leading-relaxed">
                                    창업보육센터를 통한 입주 지원 및 인큐베이팅 서비스를 제공하여 초기 창업 기업의 안정적인 성장을 지원합니다.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 overflow-hidden">
                            <div className="bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Award className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-[#1A2840] mb-1">TU-RN Up & TIPS</h4>
                                        <p className="text-xs md:text-sm text-[#4B6080] font-medium">성장 지원 프로그램</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3 text-[#4B6080]">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#003E7E] shrink-0 mt-0.5" />
                                        <span><strong className="text-[#003E7E]">TU-RN Up 프로그램</strong>: Company Building 및 Scale Up 지원</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#003E7E] shrink-0 mt-0.5" />
                                        <span><strong className="text-[#003E7E]">TIPS 프로그램</strong>: 기술아이템 보유 창업팀 집중 육성</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-[#1A2840]">성공적인 투자 회수 사례</h2>
                    <p className="text-base md:text-lg text-[#4B6080] leading-relaxed">
                        한국공학대학교 기술지주회사는 자회사의 성장을 지원하고, <br />
                        적절한 시점에 M&A, IPO 등을 통해 수익을 실현합니다.
                    </p>
                    <div className="bg-[#EBF2FF] p-6 rounded-2xl border border-[rgba(0,62,126,0.15)]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-[#003E7E] rounded-xl flex items-center justify-center text-white">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-black text-[#1A2840]">주요 성과</h4>
                                <p className="text-sm text-[#4B6080]">2025년 기준</p>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center text-[#4B6080] font-medium border-b border-[rgba(0,62,126,0.15)] pb-2">
                                <span>투자 회수율</span>
                                <span className="display-num font-black text-[#003E7E] text-lg">185%</span>
                            </li>
                            <li className="flex justify-between items-center text-[#4B6080] font-medium">
                                <span>M&A 사례</span>
                                <span className="display-num font-black text-[#003E7E] text-lg">2건</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm">
                    <h3 className="text-xl font-black text-[#1A2840] mb-6">연도별 회수 현황</h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-[rgba(0,62,126,0.08)]">
                        {[30, 45, 25, 60, 80].map((h, i) => (
                            <div key={i} className="w-full bg-[#EBF2FF] rounded-t-lg relative group">
                                <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-[#003E7E] rounded-t-lg transition-all duration-1000" />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-[#003E7E] opacity-0 group-hover:opacity-100 transition-opacity">{h}억</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-[#8A9BB5] mt-4 px-4">
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
                <SectionTitle title="자회사 성장지원" subtitle="Support" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "공간 지원",
                            desc: "시흥비즈니스센터 및 교내 창업보육센터 입주 우대",
                            Icon: Building2,
                            iconBg: "bg-[#003E7E]",
                            iconColor: "text-white"
                        },
                        {
                            title: "R&D 연계",
                            desc: "대학 교수진과의 공동 연구 및 기술 지도 매칭",
                            Icon: Lightbulb,
                            iconBg: "bg-[#003E7E]",
                            iconColor: "text-white"
                        },
                        {
                            title: "정책 자금",
                            desc: "정부 R&D 과제 및 정책 자금 수주 지원",
                            Icon: FileText,
                            iconBg: "bg-[#003E7E]",
                            iconColor: "text-white"
                        },
                        {
                            title: "네트워킹",
                            desc: "가족회사 및 동문 기업과의 비즈니스 네트워킹",
                            Icon: Users,
                            iconBg: "bg-[#003E7E]",
                            iconColor: "text-white"
                        },
                        {
                            title: "홍보 마케팅",
                            desc: "전시회 참가 및 언론 홍보 지원",
                            Icon: Globe,
                            iconBg: "bg-[#003E7E]",
                            iconColor: "text-white"
                        },
                        {
                            title: "법률/특허",
                            desc: "전문가 자문단(법무, 세무, 특허) 매칭 지원",
                            Icon: Shield,
                            iconBg: "bg-[#003E7E]",
                            iconColor: "text-white"
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-[rgba(0,62,126,0.08)] rounded-2xl p-6 hover:border-[rgba(0,62,126,0.20)] hover:-translate-y-1 transition-all shadow-sm hover:shadow-md">
                            <div className={`w-14 h-14 ${item.iconBg} ${item.iconColor} rounded-2xl flex items-center justify-center mb-5`}>
                                <item.Icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-[#1A2840] mb-3">{item.title}</h3>
                            <p className="text-sm text-[#4B6080] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default SubsidiaryContent;
