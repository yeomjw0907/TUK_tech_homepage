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
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">기술이 가치를 만나는 곳,<br />한국공학대학교 기술지주회사</h2>
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

    return null;
};

export default AboutContent;
