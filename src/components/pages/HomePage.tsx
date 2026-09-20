import React from 'react';
import {
    ArrowRight, Cpu, Microscope, Factory, Layers, Newspaper,
    TrendingUp, Building2, Users, Target, ChevronDown, Search, Lightbulb,
} from 'lucide-react';
import { PageId, Post, Company } from '../../types';
import { Button, Card, SectionTitle, Badge } from '../common';
import { KEY_STATS, TECH_TRANSFER_LINKS } from '../../data/constants';
import { formatDate } from '../../utils/format';

interface HomePageProps {
    onNavigate: (page: PageId, subPage?: string) => void;
    onCompanyClick: (company: Company) => void;
    onPostClick: (post: Post, type: string) => void;
    notices: Post[];
}

const stats = [
    { Icon: TrendingUp, value: KEY_STATS.fundTotal.replace(/억\+$/, ''), unit: "억+", label: "투자 조합 운용 규모" },
    { Icon: Building2,  value: KEY_STATS.subsidiaries, unit: "+", label: "보유 자회사" },
    { Icon: Users,      value: "10", unit: "+", label: "TIPS 추천 기업" },
    { Icon: Target,     value: "30", unit: "+", label: "투자 포트폴리오" },
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
            <section className="relative bg-navy-deep text-white min-h-[30rem] md:min-h-[min(36rem,calc(100dvh-13rem))] flex flex-col justify-end overflow-hidden">
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                `}</style>
                <div className="absolute inset-0">
                    <img
                        src="/hero_campus.png"
                        alt="한국공학대학교 캠퍼스"
                        className="h-full w-full object-cover object-[70%_center]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-6 md:pb-8">
                    <p className="text-label uppercase text-white/70 mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.05s' }}>
                        Turning University Tech Into Reality
                    </p>
                    <h1 className="text-display mb-5 max-w-xl animate-fade-in-up opacity-0" style={{ animationDelay: '0.15s' }}>
                        대학의 기술이<br /><span className="text-cyan-text">세상의 가능성</span>이 됩니다.
                    </h1>
                    <p className="text-body-lg text-white/80 max-w-xl mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
                        공공기술의 혁신적인 연구 성과를 발굴하고,<br className="hidden md:block" />
                        성공적인 사업화를 통해 더 나은 미래를 만듭니다.
                    </p>
                    <div className="flex flex-wrap gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.45s' }}>
                        <Button variant="inverse" size="md" onClick={() => onNavigate('investment', 'fields')}>
                            투자 분야 살펴보기 <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="inverse" size="md" onClick={() => onNavigate('subsidiary', 'intro')}>
                            자회사 살펴보기 <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="primary" size="md" onClick={() => onNavigate('contact')}>
                            신청하기 <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end gap-6 pr-16 lg:pr-24">
                            <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-y-6 py-4 md:py-6">
                                {stats.map((s, i) => (
                                    <div key={i} className="flex items-start gap-3 md:gap-4 px-2 md:px-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-cyan shrink-0">
                                            <s.Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="leading-none mb-1.5">
                                                <span className="display-num text-3xl md:text-4xl text-white">{s.value}</span>
                                                <span className="display-num text-lg md:text-xl text-white/80 ml-0.5">{s.unit}</span>
                                            </div>
                                            <p className="text-caption text-white/70 whitespace-nowrap">{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden lg:flex flex-col items-end justify-center border-l border-white/20 pl-6 py-4 mb-8 shrink-0">
                                <p className="text-label uppercase text-white/50 leading-relaxed text-right">
                                    Tech<br />People<br />Growth
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pb-3">
                        <ChevronDown className="w-5 h-5 text-white/40" aria-hidden />
                    </div>
                </div>
            </section>

            {/* ── 1b. TECHNOLOGY COMMERCIALIZATION ────────────────────────── */}
            <section className="pt-14 md:pt-16 pb-20 md:pb-28 bg-surface-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        <div className="lg:col-span-5">
                            <p className="text-label uppercase text-cyan-text mb-4">Technology Commercialization</p>
                            <h2 className="text-h2 text-ink mb-5">
                                대학의 우수기술을<br />
                                <span className="whitespace-nowrap">기업의 성장으로 <span className="text-navy">연결합니다.</span></span>
                            </h2>
                            <p className="text-body text-ink-soft">
                                한국공학대학교의 연구성과와 기술을 발굴하고,<br />
                                기업의 니즈에 맞는 최적의 기술을 제안합니다.
                            </p>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
                            <a
                                href={TECH_TRANSFER_LINKS.excellentTech}
                                target="_blank"
                                rel="noreferrer"
                                className="relative overflow-hidden rounded-2xl border border-line shadow-card min-h-[220px] p-7 flex flex-col group hover:border-line-strong hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
                            >
                                <img
                                    src="/home_excellent_tech.png"
                                    alt="연구실에서 기술을 연구하는 현미경"
                                    className="absolute inset-0 h-full w-full object-cover object-right group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center mb-6">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-h4 text-ink mb-2">우수기술 살펴보기</h3>
                                    <p className="text-caption text-ink-soft mb-6">
                                        한국공학대학교의 우수한 연구성과와<br />기술을 확인해보세요.
                                    </p>
                                    <ArrowRight className="w-4 h-4 text-navy mt-auto group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </a>

                            <a
                                href={TECH_TRANSFER_LINKS.findTech}
                                target="_blank"
                                rel="noreferrer"
                                className="relative overflow-hidden rounded-2xl border border-line shadow-card min-h-[220px] p-7 flex flex-col group hover:border-line-strong hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
                            >
                                <img
                                    src="/home_find_tech.png"
                                    alt="태블릿으로 맞춤 기술을 탐색하는 모습"
                                    className="absolute inset-0 h-full w-full object-cover object-right group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white from-40% via-white/80 to-white/20" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center mb-6">
                                        <Lightbulb className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-h4 text-ink mb-2">맞춤기술 찾기</h3>
                                    <p className="text-caption text-ink-soft mb-6">
                                        기업의 니즈에 맞는<br />최적의 기술을 탐색해보세요.
                                    </p>
                                    <ArrowRight className="w-4 h-4 text-navy mt-auto group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </a>
                        </div>
                    </div>

                    <p className="text-center text-label uppercase text-ink-faint mt-16 tracking-widest">
                        Technology × People × Tomorrow
                    </p>
                </div>
            </section>

            {/* ── 3. INVESTMENT FIELDS — white bg, 4-col editorial cards ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                                        {(notices[0].content?.replace(/<[^>]+>/g, '') || '').slice(0, 100)}...
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
