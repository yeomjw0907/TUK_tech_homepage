import React from 'react';
import { Building2, DollarSign, TrendingUp, Award, Building, BarChart3, Lightbulb, ArrowRight, Target, Rocket, Briefcase, Scale, CheckCircle } from 'lucide-react';
import { Card, SectionTitle } from '../common';
import { COMPANY_NAME, COMPANY_NAME_LEGAL, PROGRAM_TURN_UP, KEY_STATS } from '../../data/constants';

interface SubsidiaryContentProps {
    subPage: string;
}

const SubsidiaryContent: React.FC<SubsidiaryContentProps> = ({ subPage }) => {
    if (subPage === 'intro') {
        return (
            <div className="max-w-5xl mx-auto space-y-16">
                <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-label uppercase text-white/70 mb-4">Subsidiary</p>
                        <p className="text-white/80 text-body md:text-body-lg">
                            대학의 우수한 기술을 기반으로 기술사업화를 추진하기 위해
                            <br className="hidden md:block" />
                            {COMPANY_NAME_LEGAL}가 설립하거나 편입한 기업입니다.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-h3 text-ink mb-8 text-center">자회사 요건</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                Icon: Lightbulb,
                                title: "대학 기술 활용",
                                desc: "대학이 보유한 기술을 현물출자 또는 기술이전을 통해 활용",
                            },
                            {
                                Icon: Scale,
                                title: "지분 요건",
                                desc: "기술지주회사가 「산업교육진흥 및 산학연협력촉진에 관한 법률」에서 정한 지분을 보유",
                            },
                            {
                                Icon: TrendingUp,
                                title: "성장 가능성",
                                desc: "기술력과 사업성을 바탕으로 지속적인 성장 가능성을 보유한 기업",
                            },
                        ].map((item) => (
                            <Card key={item.title} padding="md">
                                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white mb-5">
                                    <item.Icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-h4 text-ink mb-3 flex items-start gap-2">
                                    <span className="text-navy">▸</span>
                                    {item.title}
                                </h4>
                                <p className="text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'procedure') {
        return (
            <div className="space-y-20">
                <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10">
                        <div className="max-w-3xl mx-auto text-center mb-10">
                            <p className="text-label uppercase text-white/70 mb-4">Procedure</p>
                            <p className="text-white/80 text-body md:text-body-lg">
                                예비창업자와 기술기반 기업의 특성에 맞는
                                <br className="hidden md:block" />
                                자회사 설립·편입 및 성장지원 절차를 제공합니다.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { Icon: Building2, value: `${KEY_STATS.subsidiaries}개사`, label: "보유 자회사" },
                                { Icon: DollarSign, value: KEY_STATS.cumulativeInvestment, label: "누적투자금액" },
                                { Icon: Award, value: "2개사", label: "TIPS 추천" },
                                { Icon: TrendingUp, value: "3,274%", label: "대표 EXIT", sub: "누적수익률" },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3 text-white">
                                        <s.Icon className="w-5 h-5" />
                                    </div>
                                    <div className="display-num text-3xl md:text-4xl text-white mb-1">{s.value}</div>
                                    <div className="text-xs text-white/60 font-bold">{s.label}</div>
                                    {'sub' in s && s.sub && (
                                        <div className="text-xs text-white/45 font-medium mt-0.5">{s.sub}</div>
                                    )}
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
                            value: `${KEY_STATS.subsidiaries}개사`,
                            desc: "운영 중인 자회사",
                        },
                        {
                            Icon: DollarSign,
                            label: "총투자금액",
                            value: KEY_STATS.cumulativeInvestment,
                            desc: `누적 투자 규모 (${KEY_STATS.baseDate})`,
                        },
                        {
                            Icon: BarChart3,
                            label: "기업가치",
                            value: "18.14억원",
                            desc: "총 기업가치",
                        }
                    ].map((item, idx) => (
                        <Card key={idx} padding="sm">
                            <div className="bg-surface-alt2 rounded-xl w-12 h-12 flex items-center justify-center text-navy mb-4">
                                <item.Icon className="w-6 h-6" />
                            </div>
                            <div className="text-sm text-ink-soft font-bold mb-2">{item.label}</div>
                            <div className="display-num text-2xl text-navy mb-1 break-words">{item.value}</div>
                            <div className="text-xs text-ink-faint mt-1">{item.desc}</div>
                        </Card>
                    ))}
                </div>

                {/* 자회사 투자 프로세스 */}
                <div className="space-y-16">
                    <SectionTitle
                        subtitle="Investment Process"
                        title="자회사 투자 프로세스"
                        description="대상에 따라 차별화된 투자 프로세스를 제공합니다"
                        align="center"
                    />

                    {/* 예비창업자 프로세스 */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <div className="bg-surface-alt border-b border-line p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-navy text-white rounded-xl flex items-center justify-center">
                                    <Target className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-h3 text-ink mb-1">예비창업자</h4>
                                    <p className="text-xs md:text-sm text-ink-soft font-medium">Pre-Startup Process</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {[
                                    { step: "발굴 공모", desc: `${PROGRAM_TURN_UP} 창업 공모`, Icon: Briefcase },
                                    { step: "선정", desc: "심사 및 선정", Icon: CheckCircle },
                                    { step: "투자 및 설립", desc: "자회사 투자 및 설립", Icon: Building },
                                    { step: "Company Building", desc: `Company Building & Incubating (${PROGRAM_TURN_UP} 프로그램)`, Icon: Rocket },
                                    { step: "후속 투자", desc: "성장 단계별 후속 투자", Icon: TrendingUp },
                                    { step: "TIPS 추천", desc: "TIPS 프로그램 추천", Icon: Award }
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex flex-col items-center group">
                                            <div className="bg-surface-alt2 rounded-xl w-12 h-12 flex items-center justify-center text-navy mb-3 group-hover:bg-navy group-hover:text-white transition-all duration-300 shadow-card border border-line">
                                                <item.Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-center max-w-[140px]">
                                                <div className="font-bold text-ink text-sm mb-1">{item.step}</div>
                                                <div className="text-xs text-ink-soft leading-tight">{item.desc}</div>
                                            </div>
                                        </div>
                                        {idx < 5 && (
                                            <ArrowRight className="w-6 h-6 text-ink-faint shrink-0 hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 벤처기업 프로세스 */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <div className="bg-surface-alt border-b border-line p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-navy text-white rounded-xl flex items-center justify-center">
                                    <Rocket className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-h3 text-ink mb-1">벤처기업</h4>
                                    <p className="text-xs md:text-sm text-ink-soft font-medium">Venture Company Process</p>
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
                                    { step: "Scale Up", desc: `Scale Up (${PROGRAM_TURN_UP} 프로그램)`, Icon: TrendingUp },
                                    { step: "TIPS 추천", desc: "TIPS 프로그램 추천", Icon: Award }
                                ].map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex flex-col items-center group">
                                            <div className="bg-surface-alt2 rounded-xl w-12 h-12 flex items-center justify-center text-navy mb-3 group-hover:bg-navy group-hover:text-white transition-all duration-300 shadow-card border border-line">
                                                <item.Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-center max-w-[140px]">
                                                <div className="font-bold text-ink text-sm mb-1">{item.step}</div>
                                                <div className="text-xs text-ink-soft leading-tight">{item.desc}</div>
                                            </div>
                                        </div>
                                        {idx < 5 && (
                                            <ArrowRight className="w-6 h-6 text-ink-faint shrink-0 hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
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
                    <h2 className="text-h2 text-ink">성공적인 투자 회수 사례</h2>
                    <p className="text-body md:text-body-lg text-ink-soft">
                        {COMPANY_NAME}는 자회사의 성장을 지원하고, <br />
                        적절한 시점에 M&A, IPO 등을 통해 수익을 실현합니다.
                    </p>
                    <div className="bg-surface-alt2 p-6 rounded-2xl border border-line-md">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-white">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-h4 text-ink">주요 성과</h4>
                                <p className="text-sm text-ink-soft">{KEY_STATS.baseDate}</p>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center text-ink-soft font-medium border-b border-line-md pb-2">
                                <span>투자 회수율</span>
                                <span className="display-num text-navy text-lg">185%</span>
                            </li>
                            <li className="flex justify-between items-center text-ink-soft font-medium">
                                <span>M&A 사례</span>
                                <span className="display-num text-navy text-lg">2건</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Card padding="lg" hover={false}>
                    <h3 className="text-h3 text-ink mb-6">연도별 회수 현황</h3>
                    <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-line">
                        {[30, 45, 25, 60, 80].map((h, i) => (
                            <div key={i} className="w-full bg-surface-alt2 rounded-t-xl relative group">
                                <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-navy rounded-t-xl transition-all duration-1000" />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-navy opacity-0 group-hover:opacity-100 transition-opacity">{h}억</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-ink-faint mt-4 px-4">
                        <span>2020</span>
                        <span>2021</span>
                        <span>2022</span>
                        <span>2023</span>
                        <span>2024</span>
                    </div>
                </Card>
            </div>
        );
    }

    if (subPage === 'support') {
        return (
            <div className="space-y-12">
                <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-label uppercase text-white/70 mb-4">Support</p>
                        <p className="text-white/80 text-body md:text-body-lg">
                            자회사의 성장 단계에 맞춘 투자, 보육, 기술사업화 및 사업화 지원 프로그램을 제공합니다.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            Icon: Building,
                            title: "창업보육센터",
                            desc: "입주공간 제공과 맞춤형 보육 프로그램을 통해 기업의 안정적인 성장을 지원합니다.",
                        },
                        {
                            Icon: Rocket,
                            title: `${PROGRAM_TURN_UP} 프로그램`,
                            desc: "기술사업화와 기업 성장을 위한 Company Building 및 Scale-up 프로그램을 제공합니다.",
                        },
                        {
                            Icon: Award,
                            title: "TIPS 프로그램 연계",
                            desc: "TIPS 추천으로 연구개발(R&D) 연계를 통해 기술창업기업의 성장을 지원합니다.",
                        },
                    ].map((item) => (
                        <Card key={item.title} padding="md">
                            <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white mb-5">
                                <item.Icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-h4 text-ink mb-3">{item.title}</h4>
                            <p className="text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default SubsidiaryContent;
