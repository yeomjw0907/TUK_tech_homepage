import React from 'react';
import { CheckCircle, Settings, SearchCheck, Handshake, Building2, TrendingUp, Users, Lightbulb, FileText, Briefcase, Target, Award, GraduationCap, ClipboardCheck, Link as LinkIcon, FileCheck, Rocket, Sparkles, ArrowRight, DollarSign, BarChart3, Building, Star, ExternalLink, Zap, Globe, Microscope, Network, Cpu, Layers, Factory, ChevronRight, MessageSquare, CheckSquare, LineChart, Mail, Phone, MapPin } from 'lucide-react';
import { Card, SectionTitle } from '../common';
import { TIPS_COOP } from '../../data/constants';
import { PageId } from '../../types';

interface InvestmentContentProps {
    subPage: string;
    onNavigate?: (page: PageId, subPage?: string) => void;
}

const InvestmentContent: React.FC<InvestmentContentProps> = ({ subPage, onNavigate }) => {
    if (subPage === 'fields') {
        const fields = [
            { num: "01", Icon: Cpu, title: "AI·ICT", desc: "인공지능(AI), 빅데이터, 클라우드, IoT, SW 등 디지털 혁신을 선도하는 첨단 ICT 기술 분야" },
            { num: "02", Icon: Microscope, title: "바이오·헬스케어", desc: "디지털 헬스케어, 의료기기, 바이오 소재 및 바이오테크 분야의 혁신 기술" },
            { num: "03", Icon: Factory, title: "스마트제조·반도체", desc: "스마트 제조, 반도체 공정·장비, 첨단 제조기술 등 미래 제조산업을 선도하는 핵심 기술 분야" },
            { num: "04", Icon: Layers, title: "첨단소재·부품", desc: "신소재, 고기능성 부품 및 소재 기술을 기반으로 산업 경쟁력을 높이는 핵심 기술 분야" }
        ];

        const criteria = [
            { title: "기술성", desc: "혁신적이고 차별화된 원천 기술 보유" },
            { title: "시장성", desc: "명확한 타겟 시장과 성장 가능성" },
            { title: "팀 역량", desc: "실행력 있는 창업팀과 전문성" }
        ];

        return (
            <div>
                <div className="bg-[#003E7E] rounded-3xl p-10 md:p-14 mb-10 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-white/70 font-bold uppercase tracking-widest text-sm mb-4">Investment</p>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed">
                            한국공학대학교의 연구역량과 기술 경쟁력을 기반으로
                            <br />
                            미래 성장 가능성이 높은 딥테크 분야를 중심으로 투자합니다.
                        </p>
                    </div>
                </div>

                {/* 4 Field Cards 2x2 */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {fields.map((field) => (
                        <div key={field.num} className="bg-white rounded-2xl border border-[rgba(0,62,126,0.08)] p-8 hover:border-[rgba(0,62,126,0.20)] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[rgba(0,62,126,0.08)] group relative overflow-hidden">
                            <span className="absolute top-6 right-6 display-num text-6xl text-[#F0F5FB] group-hover:text-[#EBF2FF] transition-colors leading-none select-none">{field.num}</span>
                            <div className="w-14 h-14 rounded-2xl bg-[#003E7E] flex items-center justify-center mb-6 text-white relative z-10 group-hover:bg-[#0055CC] transition-colors">
                                <field.Icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-black text-[#1A2840] mb-3 relative z-10">{field.title}</h3>
                            <p className="text-sm text-[#4B6080] leading-relaxed relative z-10">{field.desc}</p>
                            <div className="mt-6 pt-4 border-t border-[rgba(0,62,126,0.06)] flex items-center gap-1 text-xs font-bold text-[#003E7E] group-hover:gap-2 transition-all">
                                더 알아보기 <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Investment Criteria */}
                <div className="bg-[#F5F8FC] rounded-2xl p-8">
                    <h3 className="text-sm font-black text-[#1A2840] uppercase tracking-widest mb-6">투자 기준</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {criteria.map((c, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-[#003E7E] text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">{i + 1}</div>
                                <div>
                                    <div className="font-black text-[#1A2840] mb-1 text-sm">{c.title}</div>
                                    <div className="text-xs text-[#4B6080] leading-relaxed">{c.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'process') {
        const steps = [
            { num: "01", Icon: MessageSquare, title: "투자상담", desc: "사업계획서 접수 및 기초 상담" },
            { num: "02", Icon: BarChart3, title: "IR 및 예비심사", desc: "기업 현황 파악 및 예비 투자심의위원회" },
            { num: "03", Icon: CheckSquare, title: "본심사", desc: "본 투자심의위원회 개최 및 투자 승인" },
            { num: "04", Icon: DollarSign, title: "투자집행", desc: "계약 체결 및 납입" },
            { num: "05", Icon: LineChart, title: "사후관리", desc: "기업 성장 지원 및 모니터링" }
        ];

        return (
            <div className="max-w-4xl mx-auto space-y-0">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                        {/* Left: step indicator + vertical line */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#003E7E] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md shadow-[rgba(0,62,126,0.20)] group-hover:bg-[#0055CC] transition-colors z-10">
                                {step.num}
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="w-0.5 h-12 bg-gradient-to-b from-[rgba(0,62,126,0.30)] to-transparent mt-1" />
                            )}
                        </div>
                        {/* Right: content card */}
                        <div className="flex-1 pb-8">
                            <div className="bg-white rounded-2xl border border-[rgba(0,62,126,0.08)] p-6 hover:border-[rgba(0,62,126,0.20)] transition-all hover:shadow-md hover:shadow-[rgba(0,62,126,0.08)] group-hover:-translate-y-0.5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-[#EBF2FF] flex items-center justify-center text-[#003E7E]">
                                        <step.Icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-base font-black text-[#1A2840]">{step.title}</h3>
                                </div>
                                <p className="text-sm text-[#4B6080] leading-relaxed ml-11">{step.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (subPage === 'tips') {
        return (
            <div className="space-y-20">
                {/* 헤더 */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#003E7E] rounded-3xl"></div>
                    <div className="relative z-10 p-10 md:p-16 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                            <Award className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-white">
                            TIPS 프로그램
                        </h2>
                        <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                            한국공학대학교기술지주㈜는 TIPS 운영사로서 유망 기술창업기업을 발굴하고 투자, 보육, 연구개발(R&D) 연계를 통해 기업의 성장을 지원합니다.
                        </p>
                        <p className="mt-6 text-xs md:text-sm text-white/55 max-w-3xl mx-auto leading-relaxed">
                            ※ TIPS (Tech Incubator Program for Startup) : 민간 투자와 정부의 연구개발(R&D)을 연계하여 기술창업기업의 성장을 지원하는 프로그램
                        </p>
                    </div>
                </div>

                {/* 딥테크 분야 강조 */}
                <div className="bg-[#F5F8FC] rounded-3xl p-8 md:p-12 border border-[rgba(0,62,126,0.08)]">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-4">딥테크 기술 중심</h3>
                        <p className="text-base md:text-lg text-[#4B6080] max-w-3xl mx-auto leading-relaxed">
                            TIPS 프로그램을 통해 스마트 제조, 바이오·헬스케어, 반도체 등 딥테크 분야의 기술창업기업을 발굴하고, 한국공학대학교의 산학협력 인프라를 기반으로 기술사업화와 성장을 지원합니다.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { Icon: Factory, title: "스마트 제조", desc: "AI·로봇·스마트팩토리 기반 제조 혁신 기술" },
                            { Icon: Microscope, title: "바이오·헬스케어", desc: "의료기기, 디지털 헬스케어 및 바이오 혁신 기술" },
                            { Icon: Cpu, title: "반도체", desc: "시스템반도체, 공정·장비 및 첨단 반도체 기술" }
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl p-6 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] shadow-sm transition-all duration-300 text-center group">
                                <div className="w-16 h-16 bg-[#003E7E] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0055CC] transition-colors duration-300">
                                    <item.Icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-black text-[#1A2840] mb-2">{item.title}</h4>
                                <p className="text-sm text-[#4B6080] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 운영사 컨소시엄 */}
                <div className="bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm overflow-hidden">
                    <div className="bg-[#003E7E] border-b border-[rgba(0,62,126,0.20)] p-8">
                        <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                            <Network className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                            운영사 컨소시엄
                        </h3>
                    </div>
                    <div className="p-8 md:p-10">
                        <div className="flex flex-wrap gap-3">
                            {TIPS_COOP.map((partner, idx) => (
                                <span key={idx} className="bg-[#EBF2FF] border border-[rgba(0,62,126,0.15)] text-[#003E7E] text-xs font-bold px-3 py-1.5 rounded-lg hover:border-[rgba(0,62,126,0.30)] transition-all duration-300">
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 프로그램 지원 내용 */}
                <div className="space-y-8">
                    <SectionTitle title="프로그램 지원 내용" subtitle="지원 내용" />

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: Briefcase,
                                title: "투자 및 성장지원",
                                desc: "당사 조합 투자 및 당사의 TIPS 컨소시움을 통한 성장지원 및 후속투자 연계, 글로벌 진출 등의 Scale Up 지원 가능",
                                borderColor: "border-[rgba(0,62,126,0.08)]",
                                subItems: undefined
                            },
                            {
                                icon: Lightbulb,
                                title: "기술사업화 R&BD 연계",
                                desc: "당사의 투자 후 TIPS 프로그램 통한 기술사업화 R&BD 연계 가능",
                                borderColor: "border-[rgba(200,168,74,0.20)]",
                                subItems: undefined
                            },
                            {
                                icon: Building,
                                title: "입주공간 제공",
                                desc: "당사의 창업보육센터 입주공간 제공",
                                borderColor: "border-[rgba(0,62,126,0.08)]",
                                subItems: undefined
                            },
                            {
                                icon: Rocket,
                                title: "TU-RN Up 프로그램",
                                desc: "TU-RN Up 프로그램을 통한 멘토링 및 보육프로그램 제공, 정기 IR 및 네트워킹 등 성장 지원",
                                borderColor: "border-[rgba(0,62,126,0.08)]",
                                subItems: [
                                    "내·외부 멘토링 전문가를 활용한 맞춤형 보육 프로그램 제공",
                                    "정기 IR DAY 및 기업간 교류회 활동을 통한 다양한 기관들과 네트워크 구축"
                                ]
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`group bg-white rounded-3xl border ${item.borderColor} hover:border-[rgba(0,62,126,0.25)] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}>
                                <div className="p-6 md:p-8">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-[#003E7E] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#0055CC] transition-colors duration-300">
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-lg md:text-xl font-black text-[#1A2840] mb-2">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-[#4B6080] leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    {item.subItems && (
                                        <div className="ml-18 mt-4 space-y-2 pl-4 border-l-2 border-[rgba(0,62,126,0.08)]">
                                            {item.subItems.map((subItem, subIdx) => (
                                                <div key={subIdx} className="flex items-start gap-2 text-[#4B6080] text-sm">
                                                    <span className="text-[#003E7E] font-black mt-0.5">{subIdx + 1}.</span>
                                                    <span>{subItem}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TIPS 창업기업 성과 */}
                <div className="relative overflow-hidden bg-[#003E7E] rounded-3xl p-10 md:p-16">
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 border border-white/30">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black mb-4 text-white">TIPS 창업기업 성과</h3>
                            <p className="text-sm md:text-base text-white/70">2025년 11월 선정 기준</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 border border-[rgba(0,62,126,0.12)] shadow-md hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-[#EBF2FF] rounded-2xl flex items-center justify-center border border-[rgba(0,62,126,0.15)]">
                                        <Building className="w-8 h-8 text-[#003E7E]" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-[#4B6080] mb-1 uppercase tracking-wide">TIPS 창업기업</div>
                                        <div className="display-num text-3xl md:text-4xl font-black text-[#003E7E]">총 9개사</div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-[#4B6080]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#003E7E] rounded-full"></div>
                                        <span>일반: <strong className="text-[#1A2840]">7개사</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#003E7E] rounded-full"></div>
                                        <span>딥테크: <strong className="text-[#1A2840]">1개사</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#003E7E] rounded-full"></div>
                                        <span>글로벌: <strong className="text-[#1A2840]">1개사</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-[rgba(0,62,126,0.12)] shadow-md hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-[#EBF2FF] rounded-2xl flex items-center justify-center border border-[rgba(0,62,126,0.15)]">
                                        <DollarSign className="w-8 h-8 text-[#003E7E]" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-[#4B6080] mb-1 uppercase tracking-wide">운영사 투자금</div>
                                        <div className="display-num text-3xl md:text-4xl font-black text-[#003E7E]">18.92억원</div>
                                    </div>
                                </div>
                                <div className="text-[#4B6080]">
                                    평균 <strong className="text-[#1A2840] text-xl">2.1억원</strong> 투자
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'growth') {
        return (
            <div className="space-y-20">
                {/* 헤더 */}
                <div className="relative">
                    <div className="absolute inset-0 bg-[#EBF2FF] rounded-3xl -z-10 border border-[rgba(0,62,126,0.10)]"></div>
                    <div className="text-center max-w-4xl mx-auto py-12 px-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#003E7E] rounded-2xl mb-6">
                            <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-[#1A2840] mb-6 gradient-text">
                            TU-RN Up 프로그램
                        </h2>
                        <p className="text-xl text-[#4B6080] leading-relaxed font-medium">
                            한국공학대학교 기술지주회사만의 독창적인 스타트업 엑셀러레이팅 프로그램으로,
                            <br className="hidden md:block" />
                            예비창업자부터 성장기업까지 <span className="text-[#003E7E] font-bold">전주기 성장</span>을 지원합니다.
                        </p>
                    </div>
                </div>

                {/* TU-RN Up 프로그램 (일반) */}
                <div className="space-y-16">
                    <div className="relative overflow-hidden bg-[#003E7E] rounded-3xl p-10 md:p-16">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                                    <Rocket className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white">TU-RN Up 프로그램</h3>
                            </div>
                            <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed">
                                기술사업화를 통한 비즈니스 모델 구성부터 성장 지원까지
                            </p>
                        </div>
                    </div>

                    {/* 컴퍼니 빌더 */}
                    <div className="group bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="relative bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center group-hover:bg-[#0055CC] transition-colors duration-300">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-1">컴퍼니 빌더</h4>
                                    <p className="text-xs md:text-sm text-[#4B6080] font-medium">Company Builder</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10 space-y-6">
                            <div className="space-y-5">
                                <div className="relative bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-[#003E7E]" />
                                    </div>
                                    <h5 className="font-black text-[#1A2840] mb-4 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#003E7E] rounded-full"></span>
                                        대상
                                    </h5>
                                    <ul className="space-y-3 text-[#4B6080] pl-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed">교내 창업역량을 갖춘 예비창업자(학생 및 교원)를 대상으로 기술사업화를 통한 비즈니스 모델 구성, 자회사 설립을 함께 진행</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed">신사업 발굴이나 기존 사업의 성장에 필요한 벤처기업을 대상으로 기술사업화 촉진에 필요한 기술이전 및 사업모델 고도화, 자회사 편입을 함께 진행</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="relative bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors overflow-hidden">
                                    <div className="relative">
                                        <div className="absolute top-4 right-4 w-12 h-12 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-[#003E7E]" />
                                        </div>
                                        <h5 className="font-black text-[#003E7E] mb-4 text-lg flex items-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            컴퍼니 빌더 지원 내용
                                        </h5>
                                        <ul className="space-y-3 text-[#4B6080] pl-4">
                                            {[
                                                <>기업의 지속가능한 성장과 기술경쟁력 강화를 위한 <strong className="text-[#003E7E]">IP-R&D 전략 지원사업 연계 지원</strong></>,
                                                <>기업 최종 수요를 기반으로 <strong className="text-[#003E7E]">기술이전, 공동 R&D</strong> 등 기술사업화 추진 방향 수립과 맞춤화된 비즈니스 모델 컨설팅 및 <strong className="text-[#003E7E]">BM 고도화 지원</strong></>,
                                                <><strong className="text-[#003E7E]">시제품 제작 지원</strong></>,
                                                <><strong className="text-[#003E7E]">경영 및 기술 전략 멘토링 지원</strong></>,
                                                <><strong className="text-[#003E7E]">Start-up 세미나 및 네트워킹 데이 개최</strong></>
                                            ].map((content, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </div>
                                                    <span className="leading-relaxed">{content}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 성장지원 프로그램 */}
                    <div className="group bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="relative bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center group-hover:bg-[#0055CC] transition-colors duration-300">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-1">성장지원 프로그램</h4>
                                    <p className="text-xs md:text-sm text-[#4B6080] font-medium">Scale Up Program</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10 space-y-6">
                            <div className="relative bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                <div className="absolute top-4 right-4 w-12 h-12 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                    <Target className="w-6 h-6 text-[#003E7E]" />
                                </div>
                                <h5 className="font-black text-[#1A2840] mb-4 text-lg flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#003E7E] rounded-full"></span>
                                    대상
                                </h5>
                                <p className="text-[#4B6080] leading-relaxed pl-4">
                                    기술력과 성장성을 갖춘 포트폴리오 기업들을 대상으로 기술 경쟁력 강화와 지속 성장 가능한 비즈니스 Scale Up 프로그램
                                </p>
                            </div>

                            <div className="relative bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors overflow-hidden">
                                <div className="relative">
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                        <Award className="w-6 h-6 text-[#003E7E]" />
                                    </div>
                                    <h5 className="font-black text-[#003E7E] mb-4 text-lg flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        성장지원 내용
                                    </h5>
                                    <ul className="space-y-3 text-[#4B6080] pl-4">
                                        {[
                                            <><strong className="text-[#003E7E]">TIPS 컨소시움과 협력 기관의 전문가</strong>로 구성된 경영, 기술, 자금조달 등 창업에서 IPO, 전주기 멘토 Pool(총 <strong className="text-[#003E7E]">37명의 멘토단</strong>)을 통해 실무적인 컨설팅과 맞춤형 멘토링 지원</>,
                                            <><strong className="text-[#003E7E]">TIPS 프로그램을 위한 사업계획서 작성 코칭</strong></>,
                                            <><strong className="text-[#003E7E]">후속투자를 위한 사업계획서 작성 컨설팅</strong> 및 <strong className="text-[#003E7E]">VC 대상 Closed IR 참여 지원</strong></>,
                                            <><strong className="text-[#003E7E]">Start-up 세미나 및 네트워킹 데이</strong> 등을 통하여 초기 창업팀의 대외 네트워킹 역량 강화</>
                                        ].map((content, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="leading-relaxed">{content}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TU-RN Up 프로그램 (대학 연계 프로그램) */}
                <div className="space-y-16 pt-12 border-t border-[rgba(0,62,126,0.08)]">
                    <div className="relative overflow-hidden bg-[#003E7E] rounded-3xl p-10 md:p-16">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                    <GraduationCap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white">TU-RN Up 프로그램</h3>
                            </div>
                            <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed">
                                대학 연계 프로그램
                            </p>
                            <p className="text-white/70 text-lg mt-2">대학의 산학협력 네트워크를 활용한 맞춤형 기업 지원 프로그램</p>
                        </div>
                    </div>

                    {/* RISE 사업 - C-SET 프로그램 */}
                    <div className="group bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="relative bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center group-hover:bg-[#0055CC] transition-colors duration-300">
                                        <ClipboardCheck className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-black text-[#1A2840]">RISE 사업 - C-SET 프로그램</h4>
                                        <p className="text-xs md:text-sm text-[#4B6080] font-medium">지역혁신중심 대학지원체계</p>
                                    </div>
                                </div>
                                <p className="text-[#4B6080] text-base leading-relaxed mb-3">
                                    산학협력 전문가 Pool 구성에 따른 기업유형별·성장단계별 맞춤형 현장방문형 종합컨설팅 및 Biz-LINK 연계 지원 프로그램
                                </p>
                                <div className="inline-flex items-center gap-2 bg-[rgba(200,168,74,0.08)] border border-[rgba(200,168,74,0.25)] rounded-xl px-4 py-2">
                                    <span className="w-2 h-2 bg-[#C8A84A] rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold text-[#C8A84A]">가족회사 가입 기업 대상으로 진행되며 신규 가입 후 프로그램 참여 가능</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10 space-y-8">
                            {/* 현장방문형 종합컨설팅 */}
                            <div className="relative bg-[#F5F8FC] rounded-2xl p-6 md:p-8 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                    <FileCheck className="w-8 h-8 text-[#003E7E]" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-[#003E7E] text-white rounded-xl flex items-center justify-center font-black text-lg">
                                        1
                                    </div>
                                    <h5 className="text-xl md:text-2xl font-black text-[#1A2840]">현장방문형 종합컨설팅</h5>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-5">
                                    <div className="bg-white rounded-xl p-5 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                        <div className="text-xs font-black text-[#003E7E] mb-2 uppercase tracking-wide">모집대상</div>
                                        <div className="text-[#1A2840] font-bold text-base">국내 소재 기업체</div>
                                        <div className="text-[#4B6080] text-sm mt-1">(서울, 경기, 인천)</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                        <div className="text-xs font-black text-[#003E7E] mb-2 uppercase tracking-wide">모집기간</div>
                                        <div className="text-[#1A2840] font-bold text-base">연 3회</div>
                                        <div className="text-[#4B6080] text-sm mt-1">(5~6월, 7~8월, 9~10월)</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-5 border border-[rgba(0,62,126,0.08)]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-[#003E7E]" />
                                        <div className="text-sm font-black text-[#003E7E] uppercase tracking-wide">지원내용</div>
                                    </div>
                                    <div className="text-[#4B6080] font-medium text-base">전문위원 2~3인 이내의 현장방문을 통한 <strong className="text-[#1A2840]">무료 종합컨설팅 1회</strong> 지원</div>
                                </div>
                            </div>

                            {/* Biz-LINK */}
                            <div className="relative bg-[#F5F8FC] rounded-2xl p-6 md:p-8 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                    <LinkIcon className="w-8 h-8 text-[#003E7E]" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-[#003E7E] text-white rounded-xl flex items-center justify-center font-black text-lg">
                                        2
                                    </div>
                                    <h5 className="text-xl md:text-2xl font-black text-[#1A2840]">Biz-LINK</h5>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-5">
                                    <div className="bg-white rounded-xl p-5 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                        <div className="text-xs font-black text-[#003E7E] mb-2 uppercase tracking-wide">모집대상</div>
                                        <div className="text-[#4B6080] font-medium text-sm leading-relaxed">
                                            최근 3년 내 우리대학 산학협력 프로그램(기술개발과제, 산업자문, 연구과제, 기술지도, 기술이전) 참여 실적이 있는 기업
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] transition-colors">
                                        <div className="text-xs font-black text-[#003E7E] mb-2 uppercase tracking-wide">신청기간</div>
                                        <div className="text-[#1A2840] font-bold text-base">상시 접수</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-5 border border-[rgba(0,62,126,0.08)]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Award className="w-5 h-5 text-[#003E7E]" />
                                        <div className="text-sm font-black text-[#003E7E] uppercase tracking-wide">지원내용</div>
                                    </div>
                                    <p className="text-[#4B6080] mb-4 font-medium">심사를 통해 기업을 선정하여 다음 항목을 예산 소진 시까지 지원 <span className="text-xs bg-[rgba(200,168,74,0.10)] text-[#C8A84A] border border-[rgba(200,168,74,0.25)] px-2 py-1 rounded font-bold">(*VAT 포함)</span></p>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        {[
                                            { label: "시제품 개발", amount: "최대 500만원" },
                                            { label: "전시회 참가", amount: "최대 200만원" },
                                            { label: "특허출원", amount: "최대 200만원" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-[#F5F8FC] rounded-lg p-4 border border-[rgba(0,62,126,0.08)]">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle className="w-5 h-5 text-[#003E7E]" />
                                                    <span className="font-black text-[#003E7E] text-sm">{item.label}</span>
                                                </div>
                                                <div className="display-num text-lg font-black text-[#1A2840]">{item.amount}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TLO혁신형 기업지원 */}
                    <div className="group bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] shadow-sm hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="relative bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)] p-8">
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center group-hover:bg-[#0055CC] transition-colors duration-300">
                                    <Lightbulb className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-[#1A2840] mb-1">TLO혁신형 기업지원</h4>
                                    <p className="text-xs md:text-sm text-[#4B6080] font-medium">대학기술경영촉진사업</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10">
                            <div className="relative bg-[#F5F8FC] rounded-2xl p-6 md:p-8 border border-[rgba(0,62,126,0.08)] overflow-hidden">
                                <div className="relative">
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-[#EBF2FF] rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-[#003E7E]" />
                                    </div>
                                    <ul className="space-y-4 text-[#4B6080] pl-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed text-base"><strong className="text-[#003E7E]">특허에 대한 양적·질적 재구성</strong>을 통한 시장 경쟁력 확보를 위한 <strong className="text-[#003E7E]">IP 재설계 지원</strong></span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed text-base"><strong className="text-[#003E7E]">시제품 제작 지원</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'portfolio') {
        const goToCompanies = (sub?: string) => onNavigate?.('portfolio', sub || 'all_portfolio');
        const portfolioCompanies = [
            '(주)링크솔루션',
            '(주)인터루얼',
            '엘포톤*',
            '기억*',
            '와첸',
            '네이앤컴퍼니',
            '유쾌한프로젝트',
            '메디앤리서치',
            '이안나노텍',
            '셀바크이노베이션*',
            '이트렌코텍*',
            '쉘피아',
            '㈜제이케이테크놀로지*',
            '스카일리*',
            '퀀텀매트릭스*',
            '액티부키',
            '큐티뮨바이오*',
            '어플라이드서멀',
            '크림',
            '에버트레져',
            '프로미엘*',
            '엘엠케이',
            '㈜메이즈'
        ];

        return (
            <div className="space-y-16">
                <div className="bg-[#003E7E] rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-white/70 font-bold uppercase tracking-widest text-sm mb-4">Portfolio</p>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed">
                            기술력과 성장 가능성을 갖춘 유망기업에 투자하고 Value-up과 후속투자를 통해
                            <br className="hidden md:block" />
                            지속적인 성장을 지원하고 있습니다.
                        </p>
                    </div>
                </div>

                <div className="bg-white border border-[rgba(0,62,126,0.08)] rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h3 className="text-xl md:text-2xl font-black mb-2 text-[#1A2840]">투자 포트폴리오 현황</h3>
                        <p className="text-sm md:text-base text-[#4B6080]">2026년 기준</p>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        {[
                            {
                                Icon: Building,
                                label: "포트폴리오",
                                display: "27개사",
                                desc: "기업리스트 보기",
                                onClick: () => goToCompanies('all_portfolio'),
                            },
                            {
                                Icon: DollarSign,
                                label: "누적투자금",
                                display: "41.70억원",
                                desc: "누적 투자 규모",
                            },
                            {
                                Icon: BarChart3,
                                label: "기업가치",
                                display: "1,066.85억원",
                                desc: "총 기업가치",
                            },
                            {
                                Icon: Award,
                                label: "TIPS 선정",
                                display: "12개사",
                                desc: "선정기업 보기",
                                onClick: () => goToCompanies('tips_reco'),
                            },
                        ].map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={item.onClick}
                                disabled={!item.onClick}
                                className={`bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)] text-left transition-all duration-300 ${
                                    item.onClick
                                        ? 'cursor-pointer hover:border-[rgba(0,62,126,0.20)] hover:-translate-y-0.5'
                                        : 'cursor-default'
                                }`}
                            >
                                <div className="flex items-center justify-center w-14 h-14 bg-[#EBF2FF] rounded-xl mb-4">
                                    <item.Icon className="w-7 h-7 text-[#003E7E]" />
                                </div>
                                <div className="text-sm text-[#4B6080] font-bold mb-2">{item.label}</div>
                                <div className="display-num text-[#003E7E] text-xl md:text-2xl font-black mb-1">{item.display}</div>
                                <div className="text-xs text-[#8A9BB5] mt-1 flex items-center gap-1">
                                    {item.desc}
                                    {item.onClick && <ChevronRight className="w-3.5 h-3.5" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-2">대표 EXIT 사례</h3>
                        <p className="text-sm md:text-base text-[#4B6080]">㈜링크솔루션</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-[rgba(0,62,126,0.08)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 bg-[#003E7E] text-white rounded-2xl flex items-center justify-center">
                                <Award className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-xl md:text-2xl font-black text-[#1A2840] mb-1">㈜링크솔루션</h4>
                                <p className="text-xs md:text-sm text-[#4B6080] font-medium">누적 수익률 3,274%</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-[#F5F8FC] rounded-xl p-6 border border-[rgba(0,62,126,0.08)]">
                                <div className="text-sm font-bold text-[#003E7E] mb-2">투자 정보</div>
                                <ul className="space-y-2 text-[#4B6080]">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#003E7E]" />
                                        <span><strong className="text-[#1A2840]">2015년 8월</strong>, 7천만원 투자하여 자회사 편입</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#003E7E]" />
                                        <span><strong className="text-[#1A2840]">2025년 6월</strong> IPO 성공</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#003E7E]" />
                                        <span>총 <strong className="text-[#1A2840]">4차례 회수</strong>, 누적 수익률 <strong className="text-[#003E7E]">3,274%</strong> 달성</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-[#F5F8FC] rounded-xl p-6 border border-[rgba(0,62,126,0.08)]">
                                <div className="text-sm font-bold text-[#003E7E] mb-2">사업 내용</div>
                                <p className="text-[#4B6080] font-medium">3D 프린터 장비</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-[rgba(0,62,126,0.08)] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#F5F8FC] border-b border-[rgba(0,62,126,0.08)]">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-black text-[#1A2840]">자회사명</th>
                                            <th className="px-4 py-3 text-center font-black text-[#1A2840]">편입일자</th>
                                            <th className="px-4 py-3 text-left font-black text-[#1A2840]">사업내용</th>
                                            <th className="px-4 py-3 text-right font-black text-[#1A2840]">투자금 (천원)</th>
                                            <th className="px-4 py-3 text-right font-black text-[#1A2840]">회수원금 (천원)</th>
                                            <th className="px-4 py-3 text-center font-black text-[#1A2840]">회수일자</th>
                                            <th className="px-4 py-3 text-right font-black text-[#1A2840]">총 회수금 (천원)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4 py-4 font-bold text-[#1A2840]">㈜링크솔루션</td>
                                            <td className="px-4 py-4 text-center text-[#4B6080]">15.08.01</td>
                                            <td className="px-4 py-4 text-[#4B6080]">3D 프린터 장비</td>
                                            <td className="px-4 py-4 text-right font-bold text-[#1A2840]">220,000</td>
                                            <td className="px-4 py-4 text-right font-bold text-[#003E7E]">216,000</td>
                                            <td className="px-4 py-4 text-center text-[#4B6080]">20.08-25.09</td>
                                            <td className="px-4 py-4 text-right font-black text-[#003E7E] text-lg">3,979,266</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <button
                            type="button"
                            onClick={() => goToCompanies('all_portfolio')}
                            className="text-left group"
                        >
                            <h3 className="text-2xl md:text-3xl font-black text-[#1A2840] mb-2 inline-flex items-center gap-2 group-hover:text-[#003E7E] transition-colors">
                                기업소개 <ArrowRight className="w-5 h-5" />
                            </h3>
                            <p className="text-sm md:text-base text-[#4B6080]">총 {portfolioCompanies.length}개 기업</p>
                        </button>
                        <div className="flex items-center gap-2 text-sm text-[#4B6080]">
                            <Star className="w-4 h-4 text-[#C8A84A]" />
                            <span>*는 TIPS 선정기업</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {portfolioCompanies.map((company) => {
                            const isTips = company.includes('*');
                            const companyName = company.replace('*', '');

                            return (
                                <button
                                    key={company}
                                    type="button"
                                    onClick={() => goToCompanies('all_portfolio')}
                                    className="group bg-white rounded-2xl border border-[rgba(0,62,126,0.08)] shadow-sm p-6 hover:border-[rgba(0,62,126,0.20)] hover:shadow-md transition-all duration-300 text-left"
                                >
                                    <div className="aspect-square bg-[#F5F8FC] rounded-xl mb-4 flex items-center justify-center border border-[rgba(0,62,126,0.08)] group-hover:bg-[#EBF2FF] transition-colors">
                                        <Building className="w-10 h-10 text-[#8A9BB5] group-hover:text-[#003E7E] transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-bold text-[#1A2840] text-sm mb-1 group-hover:text-[#0055CC] transition-colors">
                                            {companyName}
                                        </h4>
                                        {isTips && (
                                            <span className="inline-block px-2 py-0.5 bg-[rgba(200,168,74,0.10)] text-[#C8A84A] text-[10px] font-bold rounded border border-[rgba(200,168,74,0.25)]">
                                                TIPS
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'apply') {
        return (
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="bg-[#003E7E] rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-white/70 font-bold uppercase tracking-widest text-sm mb-4">IR</p>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed">
                            IR 검토를 희망하는 기업은 IR 자료(사업계획서)를 제출해 주세요.
                            <br className="hidden md:block" />
                            접수된 자료는 기업투자본부의 검토 절차를 거쳐 개별 안내 드립니다.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-[rgba(0,62,126,0.08)] p-8 md:p-12">
                    <div className="space-y-8">
                        <div className="bg-[#EBF2FF] rounded-2xl p-6 border border-[rgba(0,62,126,0.15)]">
                            <h3 className="font-bold text-[#003E7E] mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                IR 접수 전 확인사항
                            </h3>
                            <ul className="space-y-2 text-[#4B6080]">
                                {[
                                    "기술기반 창업기업 또는 예비창업자",
                                    "차별화된 기술 또는 사업화 가능한 핵심기술 보유",
                                    "시장성과 성장 가능성을 갖춘 사업모델(BM) 보유",
                                ].map((item) => (
                                    <li key={item} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-[#003E7E] mr-2 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)]">
                                <h4 className="font-bold text-[#1A2840] mb-3 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-[#003E7E]" />
                                    이메일 접수
                                </h4>
                                <p className="text-[#4B6080] text-sm mb-4">IR 자료(사업계획서)를 첨부하여 이메일로 제출해 주세요. 접수된 자료는 검토 후 순차적으로 회신 드립니다.</p>
                                <a href="mailto:tuholdings@tukorea.ac.kr" className="text-[#0055CC] font-bold hover:underline">
                                    tuholdings@tukorea.ac.kr
                                </a>
                            </div>
                            <div className="bg-[#F5F8FC] rounded-2xl p-6 border border-[rgba(0,62,126,0.08)]">
                                <h4 className="font-bold text-[#1A2840] mb-3 flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-[#003E7E]" />
                                    전화 문의
                                </h4>
                                <p className="text-[#4B6080] text-sm mb-4">IR 접수 및 투자 검토 관련 문의는 투자사업팀으로 연락해 주세요.</p>
                                <a href="tel:031-8041-0965" className="text-[#0055CC] font-bold hover:underline">
                                    031-8041-0965
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default InvestmentContent;
