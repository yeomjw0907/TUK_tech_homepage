import React from 'react';
import { ArrowRight, ArrowDown, TrendingUp, Building2, Award, Target, Cpu, Microscope, Factory, Layers, Newspaper } from 'lucide-react';
import { PageId, Post, Company } from '../../types';
import { Button, Card, SectionTitle, Badge } from '../common';
import { KEY_STATS } from '../../data/constants';
import { formatDate } from '../../utils/format';

interface HomePageProps {
    onNavigate: (page: PageId, subPage?: string) => void;
    onCompanyClick: (company: Company) => void;
    onPostClick: (post: Post, type: string) => void;
    notices: Post[];
}

const stats = [
    { Icon: TrendingUp, value: KEY_STATS.fundTotal.replace(/억\+$/, ''), unit: "억+", label: "투자 조합 운용 규모" },
    { Icon: Building2, value: KEY_STATS.subsidiaries, unit: "+", label: "보유 자회사" },
    { Icon: Award,     value: "10",  unit: "+",   label: "TIPS 추천 기업" },
    { Icon: Target,    value: "30",  unit: "+",   label: "투자 포트폴리오" },
];

const fields = [
    { Icon: Cpu,        num: "01", title: "AI·ICT",           desc: "인공지능(AI), 빅데이터, 클라우드,\nIoT, SW 등 첨단 ICT 기술" },
    { Icon: Microscope, num: "02", title: "바이오·헬스케어",   desc: "디지털 헬스케어, 의료기기,\n바이오 소재 및 바이오테크" },
    { Icon: Factory,    num: "03", title: "스마트제조·반도체", desc: "스마트 제조, 반도체 공정·장비,\n첨단 제조기술" },
    { Icon: Layers,     num: "04", title: "첨단소재·부품",     desc: "신소재, 고기능성 부품 및\n소재 기술" },
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onCompanyClick, onPostClick, notices }) => {
    return (
        <div>

            {/* ── 1. HERO ──────────────────────────────────────────────────── */}
            <section className="relative bg-navy-deep text-white h-[calc(100svh-16rem)] min-h-[28rem] flex flex-col justify-center overflow-hidden">
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                `}</style>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/hero_bg_abstract.png')] bg-cover bg-center opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-navy-deep/20 to-navy-deep" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-light/20 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col justify-center items-center flex-grow text-center">
                    <div className="mb-6 flex items-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                        <span className="bg-white/5 backdrop-blur-md text-white/80 text-xs font-bold px-4 py-2 rounded-full border border-white/10 shadow-lg tracking-wider">
                            대학 기술사업화의 선도적 파트너
                        </span>
                    </div>

                    <h1 className="text-display mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                        Turning<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-surface-alt2 via-white to-surface-alt2">
                            University Tech
                        </span><br />
                        <span className="text-white/40">into Reality</span>
                    </h1>

                    <p className="text-body-lg text-white/70 max-w-2xl mb-10 animate-fade-in-up opacity-0 mx-auto" style={{ animationDelay: '0.3s' }}>
                        한국공학대학교의 <span className="text-white font-bold">혁신적인 연구 성과</span>를 발굴하고,<br className="hidden md:block" />
                        <span className="text-white font-bold">성공적인 사업화</span>를 통해 더 나은 미래를 만듭니다.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 items-center justify-center" style={{ animationDelay: '0.5s' }}>
                        <Button variant="primary" size="lg" onClick={() => onNavigate('investment', 'fields')}>
                            투자 분야 살펴보기 <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="inverse" size="lg" onClick={() => onNavigate('contact')}>
                            투자 상담 신청
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/20">
                    <ArrowDown className="w-6 h-6" />
                </div>
            </section>

            {/* ── 2. STATS — dark navy band, large editorial numbers ─────── */}
            <section className="bg-navy-deep">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
                        {stats.map((s, i) => (
                            <div key={i} className="group flex flex-col items-center text-center py-10 md:py-12 px-6 hover:bg-white/[0.03] transition-colors duration-300">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 text-cyan">
                                    <s.Icon className="w-6 h-6" />
                                </div>
                                {/* Number */}
                                <div className="leading-none mb-3">
                                    <span className="display-num text-5xl md:text-6xl text-white">{s.value}</span>
                                    <span className="display-num text-xl md:text-2xl text-cyan ml-0.5">{s.unit}</span>
                                </div>
                                {/* Label */}
                                <p className="text-sm md:text-base text-white/70 font-bold tracking-wide">{s.label}</p>
                                {/* Hover accent */}
                                <div className="mt-4 h-px w-0 bg-gradient-to-r from-navy to-cyan group-hover:w-10 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. INVESTMENT FIELDS — white bg, 4-col editorial cards ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <SectionTitle subtitle="Investment Focus" title="주요 투자분야" align="left" />
                        <button
                            onClick={() => onNavigate('investment', 'fields')}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:gap-2.5 transition-all duration-300 self-start shrink-0 mb-14 md:mb-16"
                        >
                            전체보기 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* 4-column cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {fields.map((f, i) => (
                            <div key={i} onClick={() => onNavigate('investment', 'fields')} className="cursor-pointer">
                                <Card padding="md" className="h-full overflow-hidden">
                                    {/* Top accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-navy to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Ghost number */}
                                    <span className="absolute bottom-4 right-5 display-num text-7xl text-surface-alt2 leading-none select-none pointer-events-none">
                                        {f.num}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-surface-alt2 flex items-center justify-center mb-6 text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 relative z-10">
                                        <f.Icon className="w-6 h-6" />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-h4 text-ink mb-2.5 relative z-10">{f.title}</h3>
                                    <p className="text-caption text-ink-soft relative z-10 whitespace-pre-line">{f.desc}</p>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. NEWS — light bg, 3-col asymmetric grid ───────────────── */}
            <section className="py-20 md:py-28 bg-surface-alt">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <SectionTitle subtitle="News & Notice" title="회사 소식" align="left" />
                        <button
                            onClick={() => onNavigate('news', 'notice')}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:gap-2.5 transition-all duration-300 self-start shrink-0 mb-14 md:mb-16"
                        >
                            전체보기 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Grid: large left + two stacked right */}
                    {notices.length > 0 ? (
                    <div className="grid md:grid-cols-5 gap-5 items-start">

                        {/* Large card — 3/5 width */}
                        {notices[0] && (
                            <div
                                onClick={() => onPostClick(notices[0], '공지사항')}
                                className="md:col-span-3 group cursor-pointer bg-white rounded-2xl border border-line hover:border-line-strong hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-card hover:shadow-card-hover"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[16/7] bg-surface-alt2 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-surface-alt2 to-surface-alt group-hover:scale-105 transition-transform duration-700" />
                                    {/* Decorative pattern */}
                                    <div className="absolute inset-0 grid-pattern opacity-30" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex items-center gap-3 opacity-20">
                                            <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center">
                                                <Newspaper className="w-7 h-7 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="neutral" className="absolute top-4 left-4">{formatDate(notices[0].date)}</Badge>
                                </div>
                                <div className="p-7">
                                    <h3 className="text-h4 text-ink mb-3 group-hover:text-navy transition-colors duration-300 line-clamp-2">
                                        {notices[0].title}
                                    </h3>
                                    <p className="text-caption text-ink-soft line-clamp-2 mb-5">
                                        {notices[0].content?.slice(0, 100)}...
                                    </p>
                                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-navy group-hover:gap-2.5 transition-all duration-300">
                                        자세히 보기 <ArrowRight className="w-4 h-4" />
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
                                    className="group cursor-pointer bg-white rounded-2xl border border-line hover:border-line-strong hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-card hover:shadow-card-hover flex"
                                >
                                    {/* Thumbnail strip */}
                                    <div className="w-24 shrink-0 bg-surface-alt2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-surface-alt2 to-surface-alt group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Newspaper className="w-5 h-5 text-navy/25" />
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="p-4 flex flex-col justify-center min-w-0">
                                        <span className="text-xs font-bold text-ink-faint mb-2 self-start">{formatDate(notice.date)}</span>
                                        <h3 className="text-sm font-bold text-ink line-clamp-2 leading-snug group-hover:text-navy transition-colors duration-300">
                                            {notice.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-dashed border-line-md py-20 text-center text-ink-faint">
                            등록된 공지사항이 없습니다.
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default HomePage;
