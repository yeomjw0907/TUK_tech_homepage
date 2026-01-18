import React from 'react';
import {
    ArrowRight, ArrowDown, TrendingUp, Users, Award,
    Target, Briefcase, CheckCircle2, Sprout
} from 'lucide-react';
import { PageId, Post, Company } from '../../types';
import { Button, Card } from '../common';

interface HomePageProps {
    onNavigate: (page: PageId, subPage?: string) => void;
    onCompanyClick: (company: Company) => void;
    onPostClick: (post: Post, type: string) => void;
    notices: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onCompanyClick, onPostClick, notices }) => {
    return (
        <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-24 flex flex-col justify-center flex-grow">
                    <div className="mb-10 flex items-center">
                        <span className="bg-white/10 backdrop-blur-sm text-blue-200 text-xs font-bold px-4 py-2 rounded-full border border-white/20">
                            대학 기술사업화의 선도적 파트너
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[0.9] tracking-tight">
                        Turning<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                            University Tech
                        </span><br />
                        <span className="text-white/60">into Reality</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-16 leading-relaxed font-medium tracking-tight">
                        한국공학대학교의 혁신적인 연구 성과를 발굴하고, <br className="hidden md:block" />
                        성공적인 사업화를 통해 함께 성장합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <Button size="xl" onClick={() => onNavigate('investment', 'fields')}>
                            투자 분야 살펴보기 <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button variant="outline" size="xl" onClick={() => onNavigate('contact')}>
                            투자 상담 신청
                        </Button>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 animate-bounce">
                    <ArrowDown className="w-7 h-7" />
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { icon: TrendingUp, value: "113억+", label: "투자 조합 운용 규모" },
                            { icon: Users, value: "16+", label: "보유 자회사" },
                            { icon: Award, value: "10+", label: "TIPS 추천 기업" },
                            { icon: Target, value: "30+", label: "투자 포트폴리오" },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-[#003E7E] group-hover:scale-110 group-hover:bg-[#003E7E] group-hover:text-white transition-all duration-300">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">{item.value}</div>
                                <div className="text-sm text-slate-500 font-bold tracking-tight">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Fields Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase block mb-3">Investment Focus</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">주요 투자분야</h2>
                        <div className="w-16 h-1.5 bg-[#003E7E] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "IT/SW", desc: "AI, 빅데이터, 클라우드 등 디지털 혁신 기술", icon: Briefcase },
                            { title: "바이오/소재", desc: "고부가가치 첨단 소재 및 바이오 기술", icon: Target },
                            { title: "디지털 헬스케어", desc: "데이터 기반의 맞춤형 의료/건강관리 서비스", icon: CheckCircle2 },
                            { title: "친환경/에너지", desc: "탄소중립 실현을 위한 신재생 에너지 및 친환경 소재", icon: Sprout }
                        ].map((item, idx) => (
                            <Card key={idx} className="hover:-translate-y-2">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-[#003E7E] mb-6">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button variant="secondary" onClick={() => onNavigate('investment', 'fields')}>자세히 보기 <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-[#3B82F6] font-bold tracking-widest text-xs uppercase block mb-3">News & Notice</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">회사 소식</h2>
                        </div>
                        <button onClick={() => onNavigate('news', 'notice')} className="text-slate-500 font-bold hover:text-[#003E7E] flex items-center transition-colors">
                            전체보기 <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {notices.slice(0, 3).map((notice) => (
                            <div key={notice.id} onClick={() => onPostClick(notice, '공지사항')} className="group cursor-pointer">
                                <div className="aspect-[4/3] bg-slate-100 rounded-2xl mb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                                        {notice.date}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#003E7E] transition-colors line-clamp-2">{notice.title}</h3>
                                <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">{notice.content?.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
