import React from 'react';
import { CheckCircle, Settings, SearchCheck, Handshake, Building2, TrendingUp, Users, Lightbulb, FileText, Briefcase, Target, Award, GraduationCap, ClipboardCheck, Link as LinkIcon, FileCheck, Rocket, Sparkles, ArrowRight, DollarSign, BarChart3, Building, Star, ExternalLink, Zap, Globe, Microscope, Network, HandshakeIcon } from 'lucide-react';
import { Card } from '../common';
import { TIPS_COOP } from '../../data/constants';

interface InvestmentContentProps {
    subPage: string;
}

const InvestmentContent: React.FC<InvestmentContentProps> = ({ subPage }) => {
    if (subPage === 'fields') {
        return (
            <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">투자 분야</h2>
                    <p className="text-base md:text-lg text-slate-500">미래 성장 가능성이 높은 기술 기반 스타트업에 집중 투자합니다.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: "🤖", title: "AI / SW", desc: "인공지능, 빅데이터, 클라우드, SaaS 등 디지털 혁신 기술", highlight: true },
                        { icon: "🧬", title: "바이오 / 헬스케어", desc: "신약 개발, 의료기기, 디지털 헬스케어 솔루션", highlight: false },
                        { icon: "🔋", title: "친환경 / 에너지", desc: "신재생 에너지, 탄소중립 기술, 친환경 소재", highlight: false },
                        { icon: "🏭", title: "스마트 제조", desc: "스마트 팩토리, 산업용 IoT, 로봇 자동화", highlight: false }
                    ].map((item, i) => (
                        <div key={i} className={`p-8 rounded-2xl border-2 transition-all hover:-translate-y-1 ${item.highlight ? 'bg-[#003E7E] text-white border-[#003E7E]' : 'bg-white border-slate-100 hover:border-[#003E7E]'}`}>
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className={`text-lg font-bold mb-3 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                            <p className={`text-sm ${item.highlight ? 'text-blue-100' : 'text-slate-500'}`}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 text-center">투자 기준</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "기술성", desc: "혁신적이고 차별화된 원천 기술 보유" },
                            { title: "시장성", desc: "명확한 타겟 시장과 성장 가능성" },
                            { title: "팀 역량", desc: "실행력 있는 창업팀과 전문성" }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 bg-[#003E7E] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    {i + 1}
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-base">{item.title}</h4>
                                <p className="text-xs md:text-sm text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'process') {
        return (
            <div className="max-w-5xl mx-auto">
                <div className="grid gap-8">
                    {[
                        { step: "01", title: "투자상담", desc: "사업계획서 접수 및 기초 상담" },
                        { step: "02", title: "IR 및 예비심사", desc: "기업 현황 파악 및 예비 투자심의위원회" },
                        { step: "03", title: "본심사", desc: "본 투자심의위원회 개최 및 투자 승인" },
                        { step: "04", title: "투자집행", desc: "계약 체결 및 납입" },
                        { step: "05", title: "사후관리", desc: "기업 성장 지원 및 모니터링" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-[#003E7E] transition-colors">
                            <div className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors absolute right-4 bottom-[-10px] scale-150 z-0">{item.step}</div>
                            <div className="w-12 h-12 rounded-full bg-[#003E7E] text-white flex items-center justify-center font-bold text-lg relative z-10 shrink-0">
                                {item.step}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-slate-500 font-medium">{item.desc}</p>
                            </div>
                            {idx !== 4 && <div className="absolute left-12 top-16 w-0.5 h-8 bg-slate-200 -ml-px hidden md:block"></div>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (subPage === 'tips') {
        return (
            <div className="space-y-20">
                {/* 헤더 */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003E7E] via-[#004a8f] to-indigo-700 rounded-3xl"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10 p-10 md:p-16 text-white text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                            <Award className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                            TIPS 프로그램
                        </h2>
                        <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium">
                            TIPS(Tech Incubator Program for Startup)는 세계시장을 선도할 기술아이템을 보유한 창업팀을 민간 주도로 선발하여 미래유망 창업기업을 집중 육성하는 프로그램입니다.
                        </p>
                    </div>
                </div>

                {/* 딥테크 분야 강조 */}
                <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border-2 border-slate-200">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">딥테크 기술 중심</h3>
                        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
                            스마트 제조, 바이오 헬스케어 및 반도체 분야 등의 딥테크 기술 중심으로 한국공학대학교에서 보유한 산학협력 인프라를 활용합니다
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: "스마트 제조", color: "from-blue-500 to-blue-600" },
                            { icon: Microscope, title: "바이오 헬스케어", color: "from-green-500 to-emerald-600" },
                            { icon: Settings, title: "반도체", color: "from-purple-500 to-indigo-600" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#003E7E] transition-all duration-300 text-center group">
                                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 운영사 컨소시엄 */}
                <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-[#003E7E] to-indigo-600 p-8 text-white">
                        <h3 className="text-xl md:text-2xl font-black flex items-center gap-3">
                            <Network className="w-6 h-6 md:w-8 md:h-8" />
                            운영사 컨소시엄
                        </h3>
                    </div>
                    <div className="p-8 md:p-10">
                        <div className="flex flex-wrap gap-3">
                            {TIPS_COOP.map((partner, idx) => (
                                <span key={idx} className="px-4 py-2.5 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 rounded-xl text-sm font-bold border-2 border-slate-200 hover:border-[#003E7E] hover:bg-blue-50 hover:text-[#003E7E] transition-all duration-300 shadow-sm hover:shadow-md">
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 프로그램 지원 내용 */}
                <div className="space-y-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">프로그램 지원 내용</h3>
                        <p className="text-base md:text-lg text-slate-600">TIPS 선정 기업을 위한 종합적인 성장 지원 프로그램</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: Briefcase,
                                title: "투자 및 성장지원",
                                desc: "당사 조합 투자 및 당사의 TIPS 컨소시움을 통한 성장지원 및 후속투자 연계, 글로벌 진출 등의 Scale Up 지원 가능",
                                color: "from-blue-500 to-indigo-600",
                                bgColor: "from-blue-50 to-indigo-50"
                            },
                            {
                                icon: Lightbulb,
                                title: "기술사업화 R&BD 연계",
                                desc: "당사의 투자 후 TIPS 프로그램 통한 기술사업화 R&BD 연계 가능",
                                color: "from-amber-500 to-orange-600",
                                bgColor: "from-amber-50 to-orange-50"
                            },
                            {
                                icon: Building,
                                title: "입주공간 제공",
                                desc: "당사의 창업보육센터 입주공간 제공",
                                color: "from-green-500 to-emerald-600",
                                bgColor: "from-green-50 to-emerald-50"
                            },
                            {
                                icon: Rocket,
                                title: "TU-RN Up 프로그램",
                                desc: "TU-RN Up 프로그램을 통한 멘토링 및 보육프로그램 제공, 정기 IR 및 네트워킹 등 성장 지원",
                                color: "from-purple-500 to-pink-600",
                                bgColor: "from-purple-50 to-pink-50",
                                subItems: [
                                    "내·외부 멘토링 전문가를 활용한 맞춤형 보육 프로그램 제공",
                                    "정기 IR DAY 및 기업간 교류회 활동을 통한 다양한 기관들과 네트워크 구축"
                                ]
                            }
                        ].map((item, idx) => (
                            <div key={idx} className={`group bg-gradient-to-br ${item.bgColor} rounded-3xl border-2 border-slate-200 hover:border-[#003E7E] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                                <div className="p-6 md:p-8">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-lg md:text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    {item.subItems && (
                                        <div className="ml-18 mt-4 space-y-2 pl-4 border-l-2 border-slate-300">
                                            {item.subItems.map((subItem, subIdx) => (
                                                <div key={subIdx} className="flex items-start gap-2 text-slate-700 text-sm">
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
                <div className="relative overflow-hidden bg-gradient-to-br from-[#003E7E] via-indigo-700 to-purple-700 rounded-3xl p-10 md:p-16 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 border border-white/30">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black mb-4">TIPS 창업기업 성과</h3>
                            <p className="text-sm md:text-base text-blue-100">2025년 11월 선정 기준</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                                        <Building className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-blue-100 mb-1 uppercase tracking-wide">TIPS 창업기업</div>
                                        <div className="text-3xl md:text-4xl font-black">총 9개사</div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-blue-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span>일반: <strong className="text-white">7개사</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span>딥테크: <strong className="text-white">1개사</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <span>글로벌: <strong className="text-white">1개사</strong></span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                                        <DollarSign className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-blue-100 mb-1 uppercase tracking-wide">운영사 투자금</div>
                                        <div className="text-3xl md:text-4xl font-black">18.92억원</div>
                                    </div>
                                </div>
                                <div className="text-blue-100">
                                    평균 <strong className="text-white text-xl">2.1억원</strong> 투자
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
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl -z-10"></div>
                    <div className="text-center max-w-4xl mx-auto py-12 px-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#003E7E] to-indigo-600 rounded-2xl mb-6 shadow-lg">
                            <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 bg-gradient-to-r from-[#003E7E] to-indigo-600 bg-clip-text text-transparent">
                            TU-RN Up 프로그램
                        </h2>
                        <p className="text-xl text-slate-700 leading-relaxed font-medium">
                            한국공학대학교 기술지주회사만의 독창적인 스타트업 엑셀러레이팅 프로그램으로, 
                            <br className="hidden md:block" />
                            예비창업자부터 성장기업까지 <span className="text-[#003E7E] font-bold">전주기 성장</span>을 지원합니다.
                        </p>
                    </div>
                </div>

                {/* TU-RN Up 프로그램 (일반) */}
                <div className="space-y-16">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#003E7E] via-[#004a8f] to-indigo-700 rounded-3xl p-10 md:p-16 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                                    <Rocket className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black">TU-RN Up 프로그램</h3>
                            </div>
                            <p className="text-base md:text-lg text-blue-100 font-medium leading-relaxed">
                                기술사업화를 통한 비즈니스 모델 구성부터 성장 지원까지
                            </p>
                        </div>
                    </div>

                    {/* 컴퍼니 빌더 */}
                    <div className="group bg-white rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-[#003E7E] transition-all duration-300 overflow-hidden">
                        <div className="relative bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 p-8 border-b-2 border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#003E7E] to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">컴퍼니 빌더</h4>
                                    <p className="text-xs md:text-sm text-slate-600 font-medium">Company Builder</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10 space-y-6">
                            <div className="space-y-5">
                                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 hover:border-[#003E7E] transition-colors">
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-[#003E7E]/10 rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-[#003E7E]" />
                                    </div>
                                    <h5 className="font-black text-slate-900 mb-4 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#003E7E] rounded-full"></span>
                                        대상
                                    </h5>
                                    <ul className="space-y-3 text-slate-700 pl-4">
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

                                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 hover:border-[#003E7E] transition-colors overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="relative">
                                        <div className="absolute top-4 right-4 w-12 h-12 bg-[#003E7E]/20 rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-[#003E7E]" />
                                        </div>
                                        <h5 className="font-black text-[#003E7E] mb-4 text-lg flex items-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            컴퍼니 빌더 지원 내용
                                        </h5>
                                        <ul className="space-y-3 text-slate-800 pl-4">
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="leading-relaxed">기업의 지속가능한 성장과 기술경쟁력 강화를 위한 <strong className="text-[#003E7E]">IP-R&D 전략 지원사업 연계 지원</strong></span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="leading-relaxed">기업 최종 수요를 기반으로 <strong className="text-[#003E7E]">기술이전, 공동 R&D</strong> 등 기술사업화 추진 방향 수립과 맞춤화된 비즈니스 모델 컨설팅 및 <strong className="text-[#003E7E]">BM 고도화 지원</strong></span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="leading-relaxed"><strong className="text-[#003E7E]">시제품 제작 지원</strong></span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="leading-relaxed"><strong className="text-[#003E7E]">경영 및 기술 전략 멘토링 지원</strong></span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#003E7E] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <span className="leading-relaxed"><strong className="text-[#003E7E]">Start-up 세미나 및 네트워킹 데이 개최</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 성장지원 프로그램 */}
                    <div className="group bg-white rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 overflow-hidden">
                        <div className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 border-b-2 border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">성장지원 프로그램</h4>
                                    <p className="text-xs md:text-sm text-slate-600 font-medium">Scale Up Program</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10 space-y-6">
                            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-500 transition-colors">
                                <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                    <Target className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h5 className="font-black text-slate-900 mb-4 text-lg flex items-center gap-2">
                                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                                    대상
                                </h5>
                                <p className="text-slate-700 leading-relaxed pl-4">
                                    기술력과 성장성을 갖춘 포트폴리오 기업들을 대상으로 기술 경쟁력 강화와 지속 성장 가능한 비즈니스 Scale Up 프로그램
                                </p>
                            </div>

                            <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-500 transition-colors overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative">
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                                        <Award className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h5 className="font-black text-indigo-700 mb-4 text-lg flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        성장지원 내용
                                    </h5>
                                    <ul className="space-y-3 text-slate-800 pl-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed"><strong className="text-indigo-700">TIPS 컨소시움과 협력 기관의 전문가</strong>로 구성된 경영, 기술, 자금조달 등 창업에서 IPO, 전주기 멘토 Pool(총 <strong className="text-indigo-700">37명의 멘토단</strong>)을 통해 실무적인 컨설팅과 맞춤형 멘토링 지원</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed"><strong className="text-indigo-700">TIPS 프로그램을 위한 사업계획서 작성 코칭</strong></span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed"><strong className="text-indigo-700">후속투자를 위한 사업계획서 작성 컨설팅</strong> 및 <strong className="text-indigo-700">VC 대상 Closed IR 참여 지원</strong></span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed"><strong className="text-indigo-700">Start-up 세미나 및 네트워킹 데이</strong> 등을 통하여 초기 창업팀의 대외 네트워킹 역량 강화</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TU-RN Up 프로그램 (대학 연계 프로그램) */}
                <div className="space-y-16 pt-12 border-t-4 border-slate-300">
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black">TU-RN Up 프로그램</h3>
                            </div>
                            <p className="text-base md:text-lg text-indigo-100 font-medium leading-relaxed">
                                대학 연계 프로그램
                            </p>
                            <p className="text-purple-100 text-lg mt-2">대학의 산학협력 네트워크를 활용한 맞춤형 기업 지원 프로그램</p>
                        </div>
                    </div>

                    {/* RISE 사업 - C-SET 프로그램 */}
                    <div className="group bg-white rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 overflow-hidden">
                        <div className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 border-b-2 border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <ClipboardCheck className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-black text-slate-900">RISE 사업 - C-SET 프로그램</h4>
                                        <p className="text-xs md:text-sm text-slate-600 font-medium">지역혁신중심 대학지원체계</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-base leading-relaxed mb-3">
                                    산학협력 전문가 Pool 구성에 따른 기업유형별·성장단계별 맞춤형 현장방문형 종합컨설팅 및 Biz-LINK 연계 지원 프로그램
                                </p>
                                <div className="inline-flex items-center gap-2 bg-yellow-50 border-2 border-yellow-300 rounded-xl px-4 py-2">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold text-yellow-800">가족회사 가입 기업 대상으로 진행되며 신규 가입 후 프로그램 참여 가능</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10 space-y-8">
                            {/* 현장방문형 종합컨설팅 */}
                            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 md:p-8 border-2 border-slate-200 hover:border-indigo-400 transition-colors">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-indigo-100/50 rounded-xl flex items-center justify-center">
                                    <FileCheck className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-lg">
                                        1
                                    </div>
                                    <h5 className="text-xl md:text-2xl font-black text-slate-900">현장방문형 종합컨설팅</h5>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-5">
                                    <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-indigo-400 transition-colors shadow-sm">
                                        <div className="text-xs font-black text-indigo-600 mb-2 uppercase tracking-wide">모집대상</div>
                                        <div className="text-slate-800 font-bold text-base">국내 소재 기업체</div>
                                        <div className="text-slate-600 text-sm mt-1">(서울, 경기, 인천)</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-indigo-400 transition-colors shadow-sm">
                                        <div className="text-xs font-black text-indigo-600 mb-2 uppercase tracking-wide">모집기간</div>
                                        <div className="text-slate-800 font-bold text-base">연 3회</div>
                                        <div className="text-slate-600 text-sm mt-1">(5~6월, 7~8월, 9~10월)</div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border-2 border-indigo-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-indigo-600" />
                                        <div className="text-sm font-black text-indigo-700 uppercase tracking-wide">지원내용</div>
                                    </div>
                                    <div className="text-slate-800 font-medium text-base">전문위원 2~3인 이내의 현장방문을 통한 <strong className="text-indigo-700">무료 종합컨설팅 1회</strong> 지원</div>
                                </div>
                            </div>

                            {/* Biz-LINK */}
                            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 md:p-8 border-2 border-slate-200 hover:border-indigo-400 transition-colors">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-indigo-100/50 rounded-xl flex items-center justify-center">
                                    <LinkIcon className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-lg">
                                        2
                                    </div>
                                    <h5 className="text-xl md:text-2xl font-black text-slate-900">Biz-LINK</h5>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-5">
                                    <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-indigo-400 transition-colors shadow-sm">
                                        <div className="text-xs font-black text-indigo-600 mb-2 uppercase tracking-wide">모집대상</div>
                                        <div className="text-slate-800 font-medium text-sm leading-relaxed">
                                            최근 3년 내 우리대학 산학협력 프로그램(기술개발과제, 산업자문, 연구과제, 기술지도, 기술이전) 참여 실적이 있는 기업
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-indigo-400 transition-colors shadow-sm">
                                        <div className="text-xs font-black text-indigo-600 mb-2 uppercase tracking-wide">신청기간</div>
                                        <div className="text-slate-800 font-bold text-base">상시 접수</div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border-2 border-indigo-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Award className="w-5 h-5 text-indigo-600" />
                                        <div className="text-sm font-black text-indigo-700 uppercase tracking-wide">지원내용</div>
                                    </div>
                                    <p className="text-slate-800 mb-4 font-medium">심사를 통해 기업을 선정하여 다음 항목을 예산 소진 시까지 지원 <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">(*VAT 포함)</span></p>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-5 h-5 text-indigo-600" />
                                                <span className="font-black text-indigo-700 text-sm">시제품 개발</span>
                                            </div>
                                            <div className="text-lg font-black text-slate-900">최대 500만원</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-5 h-5 text-indigo-600" />
                                                <span className="font-black text-indigo-700 text-sm">전시회 참가</span>
                                            </div>
                                            <div className="text-lg font-black text-slate-900">최대 200만원</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-5 h-5 text-indigo-600" />
                                                <span className="font-black text-indigo-700 text-sm">특허출원</span>
                                            </div>
                                            <div className="text-lg font-black text-slate-900">최대 200만원</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TLO혁신형 기업지원 */}
                    <div className="group bg-white rounded-3xl border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-purple-500 transition-all duration-300 overflow-hidden">
                        <div className="relative bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 p-8 border-b-2 border-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Lightbulb className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1">TLO혁신형 기업지원</h4>
                                    <p className="text-xs md:text-sm text-slate-600 font-medium">대학기술경영촉진사업</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 md:p-10">
                            <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-2xl p-6 md:p-8 border-2 border-purple-200 overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative">
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <ul className="space-y-4 text-slate-800 pl-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed text-base"><strong className="text-purple-700">특허에 대한 양적·질적 재구성</strong>을 통한 시장 경쟁력 확보를 위한 <strong className="text-purple-700">IP 재설계 지원</strong></span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="leading-relaxed text-base"><strong className="text-purple-700">시제품 제작 지원</strong></span>
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
        const portfolioCompanies = [
            '(주)링크솔루션',
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
            '㈜제이케이테크롤러지*',
            '스카일리*',
            '퀀텀매트릭스*',
            '액티부키',
            '큐티뮨바이오*',
            '어플라이드서멀',
            '크림',
            '에버트레져',
            '프로미엘*',
            '엘엠케이'
        ];

        return (
            <div className="space-y-20">
                {/* 헤더 */}
                <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">투자 포트폴리오</h2>
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                        혁신적인 기술을 보유한 기업들과 함께 성장하고 있습니다
                    </p>
                </div>

                {/* 포트폴리오 현황 */}
                <div className="bg-gradient-to-br from-[#003E7E] via-[#004a8f] to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-black mb-2">투자 포트폴리오 현황</h3>
                            <p className="text-sm md:text-base text-blue-100">2024년 기준</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Building,
                                    label: "현재 투자사 수",
                                    value: "21",
                                    unit: "개사",
                                    desc: "투자 중인 기업"
                                },
                                {
                                    icon: DollarSign,
                                    label: "총투자금액",
                                    value: "3,482,283,626",
                                    unit: "원",
                                    desc: "누적 투자 규모",
                                    format: (num: number) => {
                                        if (num >= 100000000) {
                                            return `${(num / 100000000).toFixed(2)}억원`;
                                        }
                                        return `${num.toLocaleString()}원`;
                                    }
                                },
                                {
                                    icon: BarChart3,
                                    label: "기업가치",
                                    value: "106,684,614,865",
                                    unit: "원",
                                    desc: "총 기업가치",
                                    format: (num: number) => {
                                        if (num >= 100000000) {
                                            return `${(num / 100000000).toFixed(2)}억원`;
                                        }
                                        return `${num.toLocaleString()}원`;
                                    }
                                }
                            ].map((item, idx) => {
                                const numValue = parseInt(item.value.replace(/,/g, ''));
                                const displayValue = item.format ? item.format(numValue) : `${item.value}${item.unit}`;
                                
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

                {/* 투자 기업 목록 */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">투자 기업 목록</h3>
                            <p className="text-sm md:text-base text-slate-600">총 {portfolioCompanies.length}개 기업</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>*는 TIPS 선정기업</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {portfolioCompanies.map((company, idx) => {
                            const isTips = company.includes('*');
                            const companyName = company.replace('*', '');
                            
                            return (
                                <div 
                                    key={idx}
                                    className="group bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-[#003E7E] hover:shadow-lg transition-all duration-300 cursor-pointer"
                                >
                                    <div className="aspect-square bg-slate-50 rounded-xl mb-4 flex items-center justify-center border border-slate-200 group-hover:bg-blue-50 transition-colors">
                                        <Building className="w-10 h-10 text-slate-300 group-hover:text-[#003E7E]" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#003E7E] transition-colors">
                                            {companyName}
                                        </h4>
                                        {isTips && (
                                            <span className="inline-block px-2 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold rounded border border-yellow-200">
                                                TIPS
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 대표 투자 회수 사례 */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">대표 투자 회수 사례</h3>
                        <p className="text-sm md:text-base text-slate-600">성공적인 투자 회수 사례를 소개합니다</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-2 border-green-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-green-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <Award className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1">㈜링크솔루션 투자 성공</h4>
                                    <p className="text-xs md:text-sm text-slate-600 font-medium">IPO 성공 사례</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                                    <div className="text-sm font-bold text-green-700 mb-2">투자 정보</div>
                                    <ul className="space-y-2 text-slate-700">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span><strong>2015년 8월</strong>, 7천만원 투자하여 자회사 편입</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span><strong>2025년 6월</strong> IPO 성공</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span>총 <strong>4차례 회수</strong>, 누적 수익률 <strong className="text-green-700">3,274%</strong> 달성</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                                    <div className="text-sm font-bold text-green-700 mb-2">사업 내용</div>
                                    <p className="text-slate-700 font-medium">3D 프린터 장비</p>
                                </div>
                            </div>

                            {/* 회수 현황 테이블 */}
                            <div className="bg-white rounded-xl border-2 border-green-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-green-50 border-b-2 border-green-200">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-black text-slate-900">자회사명</th>
                                                <th className="px-4 py-3 text-center font-black text-slate-900">편입일자</th>
                                                <th className="px-4 py-3 text-left font-black text-slate-900">사업내용</th>
                                                <th className="px-4 py-3 text-right font-black text-slate-900">투자금 (천원)</th>
                                                <th className="px-4 py-3 text-right font-black text-slate-900">회수원금 (천원)</th>
                                                <th className="px-4 py-3 text-center font-black text-slate-900">회수일자</th>
                                                <th className="px-4 py-3 text-right font-black text-slate-900">총 회수금 (천원)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-100 hover:bg-green-50/30 transition-colors">
                                                <td className="px-4 py-4 font-bold text-slate-900">㈜링크솔루션</td>
                                                <td className="px-4 py-4 text-center text-slate-700">15.08.01</td>
                                                <td className="px-4 py-4 text-slate-700">3D 프린터 장비</td>
                                                <td className="px-4 py-4 text-right font-bold text-slate-900">220,000</td>
                                                <td className="px-4 py-4 text-right font-bold text-green-700">216,000</td>
                                                <td className="px-4 py-4 text-center text-slate-700">20.08-25.09</td>
                                                <td className="px-4 py-4 text-right font-black text-green-700 text-lg">3,979,266</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'apply') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">투자 신청</h2>
                    <p className="text-base md:text-lg text-slate-500">혁신적인 기술을 보유한 스타트업의 투자 상담을 환영합니다.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                    <div className="space-y-8">
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="font-bold text-[#003E7E] mb-4">📋 투자 신청 전 확인사항</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-[#003E7E] mr-2 mt-0.5 shrink-0" />
                                    <span>기술 기반 스타트업 또는 예비 창업자</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-[#003E7E] mr-2 mt-0.5 shrink-0" />
                                    <span>혁신적인 기술 아이템 또는 원천 기술 보유</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-[#003E7E] mr-2 mt-0.5 shrink-0" />
                                    <span>시장 성장 가능성 및 사업화 계획 보유</span>
                                </li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 rounded-2xl p-6">
                                <h4 className="font-bold text-slate-900 mb-3">📧 이메일 상담</h4>
                                <p className="text-slate-600 text-sm mb-4">사업계획서를 첨부하여 이메일로 투자 상담을 신청하세요.</p>
                                <a href="mailto:tuholdings@tukorea.ac.kr" className="text-[#003E7E] font-bold hover:underline">
                                    tuholdings@tukorea.ac.kr
                                </a>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-6">
                                <h4 className="font-bold text-slate-900 mb-3">📞 전화 상담</h4>
                                <p className="text-slate-600 text-sm mb-4">투자사업팀으로 직접 연락하시면 빠른 상담이 가능합니다.</p>
                                <a href="tel:031-8041-0965" className="text-[#003E7E] font-bold hover:underline">
                                    031-8041-0965
                                </a>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-slate-500 text-sm">
                                또는 <a href="#contact" className="text-[#003E7E] font-bold hover:underline">문의하기</a> 페이지를 통해 온라인으로 상담을 신청하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default InvestmentContent;
