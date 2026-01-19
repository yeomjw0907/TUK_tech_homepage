import React from 'react';
import { Lightbulb, Rocket, TrendingUp, MapPin } from 'lucide-react';
import { Card, Button } from '../common';
import { HISTORY_DATA } from '../../data/constants';

interface AboutContentProps {
    subPage: string;
}

const AboutContent: React.FC<AboutContentProps> = ({ subPage }) => {
    if (subPage === 'history') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {HISTORY_DATA.map((yearItem, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 group-[.is-active]:bg-[#003E7E] text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <div className="text-[10px] font-bold">{yearItem.year.slice(2)}</div>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all">
                                <div className="text-2xl font-black text-[#003E7E] mb-4">{yearItem.year}</div>
                                <div className="space-y-4">
                                    {yearItem.events.map((event, eIdx) => (
                                        <div key={eIdx} className="flex gap-4">
                                            <div className="font-bold text-slate-400 w-12 shrink-0 pt-0.5">{event.month}월</div>
                                            <div>
                                                <div className="font-bold text-slate-800">{event.title}</div>
                                                <div className="text-sm text-slate-500 mt-1">{event.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (subPage === 'overview') {
        return (
            <div className="space-y-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex flex-col items-center gap-4">
                        <span>기술이 가치를 만나는 곳,</span>
                        <img src="/logo.svg" alt="한국공학대학교 기술지주회사" className="h-16 w-auto object-contain mt-2" />
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        대학이 보유한 우수한 연구성과를 발굴하고, <br className="hidden md:block" />
                        직접 사업화를 통해 기술창업 활성화와 국가 산업 발전에 기여합니다.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Lightbulb, title: "기술발굴", desc: "대학 내 우수 연구성과 및 유망기술 발굴" },
                        { icon: Rocket, title: "직접사업화", desc: "자회사 설립 및 육성을 통한 기술 사업화" },
                        { icon: TrendingUp, title: "수익창출", desc: "기술사업화 수익의 연구개발 재투자 선순환" }
                    ].map((item, i) => (
                        <Card key={i} className="text-center h-full">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#003E7E]">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-600">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (subPage === 'location') {
        return (
            <div className="space-y-12">
                <div className="bg-slate-100 rounded-3xl h-[400px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-200"></div>
                    <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg max-w-sm text-center">
                        <MapPin className="w-10 h-10 text-[#003E7E] mx-auto mb-4" />
                        <h3 className="font-bold text-xl text-slate-900 mb-2">본사 위치</h3>
                        <p className="text-slate-600 mb-4">경기도 시흥시 산기대학로 237 <br />시흥비즈니스센터 7층</p>
                        <Button size="sm" onClick={() => window.open('https://map.kakao.com', '_blank')}>지도 보기</Button>
                    </div>
                </div>
            </div>
        );
    }
    if (subPage === 'ceo') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-gradient-to-br from-[#003E7E] to-[#002e5e] p-8 flex flex-col justify-center items-center text-white">
                            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6">
                                <div className="text-5xl">👨‍💼</div>
                            </div>
                            <h3 className="text-xl font-bold">대표이사</h3>
                            <p className="text-blue-200 font-medium">김 성 호</p>
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">CEO 인사말</h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>안녕하십니까,<br />한국공학대학교 기술지주회사 대표이사 김성호입니다.</p>
                                <p>저희 기술지주회사는 한국공학대학교의 우수한 연구 성과를 발굴하고, 이를 성공적으로 사업화하여 대학과 사회가 함께 성장하는 선순환 구조를 만들어 나가고 있습니다.</p>
                                <p>급변하는 기술 환경 속에서 대학이 보유한 원천 기술은 그 어느 때보다 큰 가치를 지니고 있습니다. 저희는 이러한 기술들이 실제 산업 현장에서 꽃피울 수 있도록 투자, 보육, 네트워킹 등 전방위적인 지원을 아끼지 않겠습니다.</p>
                                <p>앞으로도 기술 기반 창업 생태계 활성화에 앞장서며, 대한민국 산업 발전에 기여하는 기술지주회사가 되겠습니다.</p>
                                <p className="font-bold text-slate-800 pt-4">감사합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'vision') {
        return (
            <div className="space-y-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">비전 & 미션</h2>
                    <p className="text-lg text-slate-500">대학 기술의 가치를 극대화하고, 지속 가능한 혁신 생태계를 구축합니다.</p>
                </div>

                <div className="bg-gradient-to-br from-[#003E7E] to-[#002e5e] rounded-3xl p-12 md:p-16 text-center text-white">
                    <p className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-4">VISION</p>
                    <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                        "기술이 가치를 만나는 곳,<br />함께 성장하는 미래"
                    </h3>
                    <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        대학의 혁신적인 연구 성과를 사업화하여 기술 창업 생태계를 활성화하고,<br className="hidden md:block" />
                        대학-기업-사회가 상생하는 선순환 구조를 만들어 갑니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "기술 발굴", desc: "대학 연구실의 우수 기술을 적극 발굴하고 사업화 가능성을 검증합니다.", icon: "🔬" },
                        { title: "가치 창출", desc: "기술 기반 창업을 통해 새로운 시장과 일자리를 창출합니다.", icon: "💡" },
                        { title: "상생 성장", desc: "투자 수익을 연구개발에 재투자하여 지속적인 혁신을 추구합니다.", icon: "🤝" }
                    ].map((item, i) => (
                        <Card key={i} className="text-center h-full">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                            <p className="text-slate-600">{item.desc}</p>
                        </Card>
                    ))}
                </div>

                <div className="bg-slate-50 rounded-3xl p-12">
                    <p className="text-[#003E7E] font-bold uppercase tracking-widest text-sm mb-4 text-center">MISSION</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-900 mb-3">기술사업화 전문기관</h4>
                            <p className="text-slate-600">대학 보유 기술의 사업화를 위한 전문적인 투자, 보육, 컨설팅 서비스를 제공합니다.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-100">
                            <h4 className="font-bold text-lg text-slate-900 mb-3">창업 생태계 허브</h4>
                            <p className="text-slate-600">예비 창업자, 스타트업, 투자자를 연결하는 네트워크 플랫폼 역할을 수행합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'org') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">조직도</h2>
                    <p className="text-slate-500">효율적인 기술사업화를 위한 전문 조직 체계</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                    <div className="flex flex-col items-center">
                        {/* 대표이사 */}
                        <div className="bg-[#003E7E] text-white px-8 py-4 rounded-xl font-bold text-lg mb-2">
                            대표이사
                        </div>
                        <div className="w-0.5 h-8 bg-slate-200"></div>

                        {/* 부서들 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {[
                                { name: "경영지원팀", tasks: ["경영기획", "재무회계", "인사총무"] },
                                { name: "투자사업팀", tasks: ["투자심사", "펀드운용", "사후관리"] },
                                { name: "창업보육팀", tasks: ["입주기업관리", "멘토링", "네트워킹"] }
                            ].map((dept, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-0.5 h-8 bg-slate-200 mx-auto"></div>
                                    <div className="bg-blue-50 border-2 border-[#003E7E] text-[#003E7E] px-6 py-3 rounded-xl font-bold mb-4">
                                        {dept.name}
                                    </div>
                                    <ul className="space-y-2">
                                        {dept.tasks.map((task, j) => (
                                            <li key={j} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium">
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AboutContent;
