import React from 'react';
import { CheckCircle, Settings, SearchCheck, Handshake } from 'lucide-react';
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
                    <h2 className="text-3xl font-black text-slate-900 mb-4">투자 분야</h2>
                    <p className="text-lg text-slate-500">미래 성장 가능성이 높은 기술 기반 스타트업에 집중 투자합니다.</p>
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
                            <h3 className={`text-xl font-bold mb-3 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                            <p className={item.highlight ? 'text-blue-100' : 'text-slate-500'}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">투자 기준</h3>
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
                                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-600 text-sm">{item.desc}</p>
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
            <div className="space-y-12">
                <div className="bg-[#003E7E] rounded-3xl p-10 md:p-16 text-white text-center">
                    <h2 className="text-3xl font-black mb-6">TIPS 프로그램</h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        TIPS(Tech Incubator Program for Startup)는 세계시장을 선도할 기술아이템을 보유한 창업팀을 민간 주도로 선발하여 미래유망 창업기업을 집중 육성하는 프로그램입니다.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card title="운영사 컨소시엄">
                        <div className="flex flex-wrap gap-2">
                            {TIPS_COOP.map((partner, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-bold border border-slate-100">
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </Card>
                    <Card title="지원 혜택">
                        <ul className="space-y-4">
                            {[
                                "R&D 자금 최대 5억원 지원",
                                "창업사업화 자금 최대 1억원",
                                "해외마케팅 자금 최대 1억원",
                                "엔젤투자매칭펀드 연계 투자",
                                "보육공간 제공 및 멘토링"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center text-slate-600 font-medium">
                                    <CheckCircle className="w-5 h-5 text-[#003E7E] mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        );
    }

    if (subPage === 'growth') {
        return (
            <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">TU-RN Up 프로그램</h2>
                    <p className="text-slate-600">한국공학대학교 기술지주회사만의 독창적인 스타트업 엑셀러레이팅 프로그램입니다.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "기술 고도화", desc: "대학 보유 특허 매칭 및 기술 이전 지원", icon: Settings },
                        { title: "시장 검증", desc: "BM 고도화 및 시장 실증(PoC) 지원", icon: SearchCheck },
                        { title: "투자 유치", desc: "데모데이 개최 및 후속 투자 연계", icon: Handshake }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-[#003E7E] rounded-full flex items-center justify-center mb-6">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (subPage === 'apply') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">투자 신청</h2>
                    <p className="text-lg text-slate-500">혁신적인 기술을 보유한 스타트업의 투자 상담을 환영합니다.</p>
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
