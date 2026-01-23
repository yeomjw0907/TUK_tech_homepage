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
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/hero_bg_abstract.png')] bg-cover bg-center opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 flex flex-col justify-center items-center flex-grow text-center">
                    <div className="mb-6 flex items-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                        <span className="bg-white/5 backdrop-blur-md text-blue-100 text-xs font-bold px-4 py-2 rounded-full border border-white/10 shadow-lg tracking-wider uppercase">
                            대학 기술사업화의 선도적 파트너
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                        Turning<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-300%">
                            University Tech
                        </span><br />
                        <span className="text-white/40">into Reality</span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed font-light tracking-wide animate-fade-in-up opacity-0 mx-auto" style={{ animationDelay: '0.3s' }}>
                        한국공학대학교의 <span className="text-white font-medium">혁신적인 연구 성과</span>를 발굴하고,<br className="hidden md:block" />
                        <span className="text-white font-medium">성공적인 사업화</span>를 통해 더 나은 미래를 만듭니다.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 items-center justify-center" style={{ animationDelay: '0.5s' }}>
                        <Button size="lg" className="bg-[#003E7E] hover:bg-[#002e5e] text-white shadow-xl shadow-blue-900/20 border-0" onClick={() => onNavigate('investment', 'fields')}>
                            투자 분야 살펴보기 <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm" onClick={() => onNavigate('contact')}>
                            투자 상담 신청
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/20 animate-bounce duration-[2000ms]">
                    <ArrowDown className="w-8 h-8" />
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
                                <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">{item.value}</div>
                                <div className="text-xs md:text-sm text-slate-500 font-bold tracking-tight">{item.label}</div>
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
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">주요 투자분야</h2>
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
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
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
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">회사 소식</h2>
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
                                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#003E7E] transition-colors line-clamp-2">{notice.title}</h3>
                                <p className="text-slate-500 line-clamp-2 text-xs md:text-sm leading-relaxed">{notice.content?.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
