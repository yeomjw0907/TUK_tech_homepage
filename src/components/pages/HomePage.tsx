import React from 'react';
import { ArrowRight, ArrowDown, ChevronRight, TrendingUp, Building2, Award, Target, Cpu, Microscope, Leaf, Factory, Newspaper } from 'lucide-react';
import { PageId, Post, Company } from '../../types';
import { Button } from '../common';

interface HomePageProps {
    onNavigate: (page: PageId, subPage?: string) => void;
    onCompanyClick: (company: Company) => void;
    onPostClick: (post: Post, type: string) => void;
    notices: Post[];
}

const stats = [
    { Icon: TrendingUp, value: "113", unit: "억+", label: "투자 조합 운용 규모" },
    { Icon: Building2, value: "16",  unit: "+",   label: "보유 자회사" },
    { Icon: Award,     value: "10",  unit: "+",   label: "TIPS 추천 기업" },
    { Icon: Target,    value: "30",  unit: "+",   label: "투자 포트폴리오" },
];

const fields = [
    { Icon: Cpu,        num: "01", title: "AI / SW",         desc: "인공지능, 빅데이터, 클라우드,\nSaaS 등 디지털 혁신 기술" },
    { Icon: Microscope, num: "02", title: "바이오 / 헬스케어", desc: "신약 개발, 의료기기,\n디지털 헬스케어 솔루션" },
    { Icon: Leaf,       num: "03", title: "친환경 / 에너지",   desc: "신재생 에너지, 탄소중립 기술,\n친환경 소재" },
    { Icon: Factory,    num: "04", title: "스마트 제조",        desc: "스마트 팩토리,\n산업용 IoT, 로봇 자동화" },
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onCompanyClick, onPostClick, notices }) => {
    return (
        <div>

            {/* ── 1. HERO ──────────────────────────────────────────────────── */}
            <section className="relative bg-slate-900 text-white min-h-screen flex flex-col justify-center overflow-hidden">
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                `}</style>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/hero_bg_abstract.png')] bg-cover bg-center opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 flex flex-col justify-center items-center flex-grow text-center">
                    <div className="mb-6 flex items-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                        <span className="bg-white/5 backdrop-blur-md text-blue-100 text-xs font-bold px-4 py-2 rounded-full border border-white/10 shadow-lg tracking-wider uppercase">
                            대학 기술사업화의 선도적 파트너
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                        Turning<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
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

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
                    <ArrowDown className="w-8 h-8" />
                </div>
            </section>

            {/* ── 2. STATS — dark navy band, large editorial numbers ─────── */}
            <section className="bg-[#001E4A]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
                        {stats.map((s, i) => (
                            <div key={i} className="group flex flex-col items-center text-center py-14 px-6 hover:bg-white/[0.03] transition-colors">
                                {/* Icon */}
                                <div className="w-9 h-9 rounded-lg bg-white/08 flex items-center justify-center mb-5 text-[#60AEFF]">
                                    <s.Icon className="w-4 h-4" />
                                </div>
                                {/* Number */}
                                <div className="leading-none mb-2">
                                    <span className="display-num text-5xl md:text-6xl text-white">{s.value}</span>
                                    <span className="display-num text-xl md:text-2xl text-[#60AEFF] ml-0.5">{s.unit}</span>
                                </div>
                                {/* Label */}
                                <p className="text-[0.7rem] text-white/35 font-bold tracking-widest uppercase">{s.label}</p>
                                {/* Hover accent */}
                                <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#003E7E] to-[#60AEFF] group-hover:w-10 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. INVESTMENT FIELDS — white bg, 4-col editorial cards ─── */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                        <div>
                            <span className="tag mb-4 inline-block">Investment Focus</span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1A2840] tracking-tight leading-tight">
                                주요 투자분야
                            </h2>
                        </div>
                        <button
                            onClick={() => onNavigate('investment', 'fields')}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#003E7E] hover:gap-3 transition-all duration-200 self-start md:self-auto pb-1 border-b border-[#003E7E]/30 hover:border-[#003E7E]"
                        >
                            전체 투자분야 보기 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* 4-column cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {fields.map((f, i) => (
                            <div
                                key={i}
                                className="group relative bg-white rounded-2xl border border-[rgba(0,62,126,0.09)] p-7 overflow-hidden hover:border-[rgba(0,62,126,0.22)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[rgba(0,62,126,0.09)] transition-all duration-300 cursor-pointer"
                                onClick={() => onNavigate('investment', 'fields')}
                            >
                                {/* Top accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003E7E] to-[#0099D6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Ghost number */}
                                <span className="absolute bottom-4 right-5 display-num text-7xl text-[#F0F5FC] group-hover:text-[#EBF2FF] transition-colors leading-none select-none pointer-events-none">
                                    {f.num}
                                </span>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-[#EBF2FF] flex items-center justify-center mb-6 text-[#003E7E] group-hover:bg-[#003E7E] group-hover:text-white transition-all duration-300 relative z-10">
                                    <f.Icon className="w-5 h-5" />
                                </div>

                                {/* Text */}
                                <h3 className="text-[0.95rem] font-black text-[#1A2840] mb-2.5 relative z-10">{f.title}</h3>
                                <p className="text-[0.8rem] text-[#4B6080] leading-relaxed relative z-10 whitespace-pre-line">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. NEWS — light bg, 3-col asymmetric grid ───────────────── */}
            <section className="py-24 md:py-32 bg-[#F5F8FC]">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header */}
                    <div className="flex items-end justify-between mb-14">
                        <div>
                            <span className="tag mb-4 inline-block">News &amp; Notice</span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1A2840]">회사 소식</h2>
                        </div>
                        <button
                            onClick={() => onNavigate('news', 'notice')}
                            className="text-sm font-bold text-[#4B6080] hover:text-[#003E7E] flex items-center gap-1 transition-colors shrink-0 mb-1"
                        >
                            전체보기 <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Grid: large left + two stacked right */}
                    <div className="grid md:grid-cols-5 gap-5 items-start">

                        {/* Large card — 3/5 width */}
                        {notices[0] && (
                            <div
                                onClick={() => onPostClick(notices[0], '공지사항')}
                                className="md:col-span-3 group cursor-pointer bg-white rounded-2xl border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[rgba(0,62,126,0.08)]"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[16/7] bg-[#EBF2FF] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#D6E8FF] via-[#EBF2FF] to-[#F0F6FF] group-hover:scale-105 transition-transform duration-700" />
                                    {/* Decorative pattern */}
                                    <div className="absolute inset-0 grid-pattern opacity-30" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex items-center gap-3 opacity-20">
                                            <div className="w-16 h-16 rounded-2xl bg-[#003E7E] flex items-center justify-center">
                                                <Newspaper className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="absolute top-4 left-4 tag text-[0.6rem]">{notices[0].date}</span>
                                </div>
                                <div className="p-7">
                                    <h3 className="text-base font-black text-[#1A2840] mb-3 group-hover:text-[#003E7E] transition-colors line-clamp-2 leading-relaxed">
                                        {notices[0].title}
                                    </h3>
                                    <p className="text-sm text-[#4B6080] line-clamp-2 leading-relaxed mb-5">
                                        {notices[0].content?.slice(0, 100)}...
                                    </p>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#003E7E] group-hover:gap-2.5 transition-all duration-200">
                                        자세히 보기 <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Two smaller cards — 2/5 width */}
                        <div className="md:col-span-2 flex flex-col gap-5">
                            {notices.slice(1, 3).map((notice) => (
                                <div
                                    key={notice.id}
                                    onClick={() => onPostClick(notice, '공지사항')}
                                    className="group cursor-pointer bg-white rounded-2xl border border-[rgba(0,62,126,0.08)] hover:border-[rgba(0,62,126,0.20)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-[rgba(0,62,126,0.08)] flex"
                                >
                                    {/* Thumbnail strip */}
                                    <div className="w-24 shrink-0 bg-[#EBF2FF] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#D6E8FF] to-[#EBF2FF] group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Newspaper className="w-5 h-5 text-[#003E7E]/25" />
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="p-4 flex flex-col justify-center min-w-0">
                                        <span className="tag text-[0.6rem] mb-2 self-start">{notice.date}</span>
                                        <h3 className="text-sm font-black text-[#1A2840] line-clamp-2 leading-snug group-hover:text-[#003E7E] transition-colors">
                                            {notice.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
