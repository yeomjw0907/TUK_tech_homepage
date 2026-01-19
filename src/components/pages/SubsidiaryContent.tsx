import React from 'react';
import { Building, Lightbulb, FileText, Users, Presentation, Gavel, Award } from 'lucide-react';
import { Card } from '../common';

interface SubsidiaryContentProps {
    subPage: string;
}

const SubsidiaryContent: React.FC<SubsidiaryContentProps> = ({ subPage }) => {
    if (subPage === 'procedure') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="relative border-l-2 border-slate-200 ml-6 md:ml-0 space-y-12 py-4">
                    {[
                        { title: "기술 발굴 및 매칭", desc: "대학 보유 유망 기술 탐색 및 예비 창업자 매칭" },
                        { title: "사업성 검토", desc: "기술가치평가 및 사업계획서 수립" },
                        { title: "이사회 승인", desc: "기술지주회사 이사회 심의 및 승인" },
                        { title: "법인 설립", desc: "자본금 납입 및 법인 등기 (산학협력단 현물출자)" },
                        { title: "자회사 편입", desc: "교육부 자회사 설립 인가 및 등록" }
                    ].map((item, idx) => (
                        <div key={idx} className="relative pl-12 md:pl-0">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white bg-[#003E7E] shadow-sm md:left-1/2 md:-ml-2.5"></div>
                            <div className={`md:flex items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-12`}>
                                <div className="md:w-1/2"></div>
                                <div className="md:w-1/2">
                                    <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                                        <div className="text-sm font-black text-[#3B82F6] mb-1 uppercase tracking-wider">Step 0{idx + 1}</div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (subPage === 'exit') {
        return (
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900">성공적인 투자 회수 사례</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
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
                    <h2 className="text-3xl font-black text-slate-900 mb-4">자회사 성장지원</h2>
                    <p className="text-lg text-slate-500">한국공학대학교 기술지주회사는 자회사의 지속적인 성장을 위해 다양한 지원 프로그램을 운영합니다.</p>
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
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default SubsidiaryContent;
