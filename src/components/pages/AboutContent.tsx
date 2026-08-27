import React from 'react';
import { Lightbulb, Rocket, TrendingUp, MapPin, Target, Building2, Users, Briefcase, Award, Star, Globe, Zap, UserCircle2 } from 'lucide-react';
import { Card, Button, SectionTitle } from '../common';
import { HISTORY_DATA, COMPANY_NAME, PROGRAM_TURN_UP, KEY_STATS } from '../../data/constants';

interface AboutContentProps {
    subPage: string;
}

const AboutContent: React.FC<AboutContentProps> = ({ subPage }) => {

    if (subPage === 'history') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy via-line-strong to-transparent" />

                    <div className="space-y-0">
                        {HISTORY_DATA.map((yearItem, idx) => (
                            <div key={idx} className="relative flex gap-8 pb-10">
                                {/* Dot */}
                                <div className="relative z-10 w-12 h-12 rounded-full bg-navy border-4 border-white shadow-card flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-white">{yearItem.year.slice(2)}</span>
                                </div>
                                {/* Content */}
                                <Card padding="sm" className="flex-1 -mt-1">
                                    <div className="display-num text-2xl text-navy mb-4">{yearItem.year}</div>
                                    <div className="space-y-3">
                                        {yearItem.events.map((event, eIdx) => (
                                            <div key={eIdx} className="flex gap-4 items-start">
                                                <span className="text-xs font-bold text-cyan-text w-8 shrink-0 pt-0.5">{event.month}월</span>
                                                <div>
                                                    <div className="text-sm font-bold text-ink">{event.title}</div>
                                                    {event.desc && <div className="text-xs text-ink-soft mt-0.5">{event.desc}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'overview') {
        return (
            <div className="space-y-16">
                {/* Top hero card */}
                <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-label uppercase text-white/70 mb-4">About</p>
                        <p className="text-white/80 text-body md:text-body-lg">
                            대학의 우수한 연구성과와 혁신적인 사업 아이디어를 발굴하여 기술기반 창업과 투자로 연결하고,
                            <br />
                            기업의 지속 가능한 성장을 지원합니다.
                        </p>
                    </div>
                </div>

                {/* 설립 목적 — 3 horizontal cards */}
                <div>
                    <h3 className="text-h3 text-ink mb-8">설립 목적</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            {
                                Icon: Lightbulb,
                                title: "산학협력기반 투자 활성화",
                                desc: "대학의 혁신 기술과 비즈니스 아이디어를 발굴하여 창업으로 연계하고, 교원·학생 창업은 물론 외부 창업기업에도 투자와 집중 보육을 제공"
                            },
                            {
                                Icon: Rocket,
                                title: "직접 기술 사업화 실행",
                                desc: "한국공학대학교가 보유한 우수한 기술을 활용하여 유망 스타트업을 대상으로 자회사 설립 또는 편입을 통한 직접 기술 사업화 실행"
                            },
                            {
                                Icon: TrendingUp,
                                title: "재투자 실현",
                                desc: "자회사의 성장을 통한 투자 수익으로 연구개발 및 연구역량 제고를 위한 재투자 실현"
                            }
                        ].map((item, i) => (
                            <Card key={i} padding="md">
                                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white mb-5">
                                    <item.Icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-h4 text-ink mb-3">{item.title}</h4>
                                <p className="text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 핵심 가치 — horizontal strip with numbered items */}
                <div className="bg-surface-alt rounded-2xl p-8 mb-16">
                    <h3 className="text-h4 text-ink mb-6">핵심 가치</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: "기술혁신", desc: "대학 원천기술의 지속적 발굴과 사업화 추진" },
                            { value: "상생협력", desc: "대학·기업·사회가 함께 성장하는 선순환 생태계" },
                            { value: "투명경영", desc: "신뢰 기반의 윤리적이고 투명한 경영 실천" },
                            { value: "지속성장", desc: "재투자를 통한 지속 가능한 혁신 성장 추구" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="display-num text-3xl text-navy/20 leading-none">0{i + 1}</span>
                                <div>
                                    <div className="font-bold text-ink text-sm mb-1">{item.value}</div>
                                    <div className="text-xs text-ink-soft">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick stats bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden">
                    {[
                        { v: "2011", l: "설립연도" },
                        { v: `${KEY_STATS.subsidiaries}+`, l: "자회사" },
                        { v: KEY_STATS.fundTotal, l: "운용규모" },
                        { v: "30+", l: "포트폴리오" }
                    ].map((s, i) => (
                        <div key={i} className="bg-white py-8 px-6 text-center">
                            <div className="display-num text-3xl md:text-4xl text-navy mb-1">{s.v}</div>
                            <div className="text-xs text-ink-soft font-bold">{s.l}</div>
                        </div>
                    ))}
                </div>

                {/* 핵심 기능 및 주요 사업 영역 */}
                <div className="space-y-12">
                    <SectionTitle title="핵심 기능 및 주요 사업 영역" subtitle="Business Areas" />

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: Building2,
                                title: "유망 벤처기업 발굴 및 육성",
                                desc: "대학의 우수한 연구성과와 사업 아이디어를 발굴하여 교원·학생 창업과 기술기반 벤처기업의 자회사 설립·편입을 지원하고, 기술사업화와 기업 성장을 촉진합니다.",
                                items: [
                                    "교원·학생 예비창업자 발굴",
                                    "대학기술 기반 자회사 설립",
                                    "외부 벤처기업 자회사 편입",
                                    "기술이전 및 사업모델 고도화",
                                    "후속투자 및 성장 연계",
                                ],
                            },
                            {
                                icon: Briefcase,
                                title: "투자조합 결성 및 운용",
                                desc: "대학의 기술사업화와 유망 창업기업의 성장을 지원하기 위해 개인투자조합과 벤처투자조합을 결성·운용하고, 초기투자부터 후속투자까지 연계합니다.",
                                items: [
                                    "개인투자조합 및 벤처투자조합 운용",
                                    "기술기반 창업기업 투자",
                                    "투자기업 성장관리",
                                    "TIPS 및 후속투자 연계",
                                ],
                            },
                            {
                                icon: Users,
                                title: "창업보육센터 운영",
                                desc: "제조 및 기술기반 창업기업의 안정적인 성장을 위해 입주공간과 사업화 지원, 멘토링, 네트워킹 등 단계별 창업보육 프로그램을 제공합니다.",
                                items: [
                                    "창업기업 입주공간 제공",
                                    "사업화 및 경영·기술 멘토링",
                                    "시제품 제작 및 IP 지원 연계",
                                    "투자 및 네트워킹 지원",
                                    "졸업기업 성장관리",
                                ],
                            },
                            {
                                icon: Award,
                                title: `${PROGRAM_TURN_UP} & TIPS 프로그램`,
                                desc: "대학의 기술과 산학협력 인프라를 활용하여 예비창업자와 벤처기업의 사업모델 수립, 자회사 설립·편입, 투자유치 및 Scale-up을 지원합니다.",
                                items: [
                                    `${PROGRAM_TURN_UP} 프로그램은 대학의 연구성과 또는 기업의 사업수요를 기반으로 기술이전, 공동 R&D, 사업모델 고도화와 자회사 설립·편입을 지원하는 독자적인 컴퍼니 빌딩 프로그램입니다. 이후 TIPS 추천, 후속투자, 전문 멘토링 및 네트워킹을 연계하여 기업의 지속적인 성장을 지원합니다.`,
                                ],
                            },
                        ].map((item, i) => (
                            <div key={i} className="group bg-white rounded-2xl border border-line hover:border-line-strong shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                                <div className="bg-surface-alt border-b border-line p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-navy text-white rounded-xl flex items-center justify-center">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <h4 className="text-h4 text-ink flex-grow">{item.title}</h4>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                                    <ul className="mt-4 space-y-2">
                                        {item.items.map((point) => (
                                            <li key={point} className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed">
                                                <span className="mt-0.5 text-navy font-bold shrink-0">▸</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'location') {
        return (
            <div className="space-y-12">
                <div className="bg-surface-alt rounded-2xl h-[400px] flex items-center justify-center relative overflow-hidden border border-line">
                    <Card padding="lg" hover={false} className="relative z-10 max-w-sm text-center">
                        <MapPin className="w-10 h-10 text-navy mx-auto mb-4" />
                        <h3 className="text-h4 text-ink mb-2">본사 위치</h3>
                        <p className="text-ink-soft mb-4">경기도 시흥시 산기대학로 237 <br />시흥비즈니스센터 7층</p>
                        <Button size="sm" onClick={() => window.open('https://map.kakao.com', '_blank')}>지도 보기</Button>
                    </Card>
                </div>
            </div>
        );
    }

    if (subPage === 'ceo') {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-navy border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-center items-center">
                            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6 border border-white/30">
                                <UserCircle2 className="w-16 h-16 text-white/80" />
                            </div>
                            <h3 className="text-h4 text-white">대표이사</h3>
                            <p className="text-white/80 font-medium">정인호</p>
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h2 className="text-h3 text-ink mb-6">CEO 인사말</h2>
                            <div className="space-y-4 text-ink-soft leading-relaxed">
                                <p>안녕하십니까,<br />{COMPANY_NAME} 대표이사 정인호입니다.</p>
                                <p>저희 기술지주회사는 한국공학대학교의 우수한 연구 성과를 발굴하고, 이를 성공적으로 사업화하여 대학과 사회가 함께 성장하는 선순환 구조를 만들어 나가고 있습니다.</p>
                                <p>급변하는 기술 환경 속에서 대학이 보유한 원천 기술은 그 어느 때보다 큰 가치를 지니고 있습니다. 저희는 이러한 기술들이 실제 산업 현장에서 꽃피울 수 있도록 투자, 보육, 네트워킹 등 전방위적인 지원을 아끼지 않겠습니다.</p>
                                <p>앞으로도 기술 기반 창업 생태계 활성화에 앞장서며, 대한민국 산업 발전에 기여하는 기술지주회사가 되겠습니다.</p>
                                <p className="font-bold text-ink pt-4">감사합니다.</p>
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
                <SectionTitle title="비전 & 미션" subtitle="Vision" />

                {/* Vision banner — solid navy */}
                <div className="bg-navy rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-10" />
                    <div className="relative z-10">
                        <h3 className="text-h3 text-white mb-6">
                            “대학의 기술이 산업의 가치가 되다”
                        </h3>
                        <p className="text-body md:text-body-lg text-white/80 max-w-2xl mx-auto">
                            대학이 보유한 우수한 기술을 창업과 투자로 연결하고, 혁신기업의 성장을 통해 연구와 산업이 함께 발전하는 기술사업화의 선순환 생태계를 만들어갑니다.
                        </p>
                    </div>
                </div>

                {/* 3 vision cards — white bg with border */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "대학기술 발굴", desc: "대학의 우수한 연구성과와 혁신기술을 발굴하여 사업화 가능성을 검토합니다.", Icon: Star },
                        { title: "기술사업화", desc: "기술이전, 자회사 설립 및 투자 연계를 통해 연구성과를 산업의 가치로 실현합니다.", Icon: Zap },
                        { title: "성장지원", desc: "투자, 보육, TIPS 연계를 통해 기업의 지속 가능한 성장을 지원합니다.", Icon: Globe }
                    ].map((item, i) => (
                        <Card key={i} padding="lg" className="text-center">
                            <div className="w-14 h-14 bg-surface-alt2 rounded-xl flex items-center justify-center mx-auto mb-4 text-navy">
                                <item.Icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-h4 text-ink mb-3">{item.title}</h4>
                            <p className="text-sm text-ink-soft">{item.desc}</p>
                        </Card>
                    ))}
                </div>

                {/* Mission — white boxes */}
                <div className="bg-surface-alt border border-line rounded-2xl p-12">
                    <p className="text-label uppercase text-cyan-text mb-6 text-center">Mission</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "기술사업화", desc: "대학의 연구성과를 발굴하고 기술이전, 자회사 설립 및 사업화를 지원합니다.", Icon: Target },
                            { title: "투자 및 자회사 육성", desc: "기술기반 창업기업에 투자하고 자회사의 지속 가능한 성장을 지원합니다.", Icon: Briefcase },
                            { title: "성장 플랫폼", desc: `${PROGRAM_TURN_UP}, 창업보육센터, TIPS 연계를 통해 기업의 Scale-up을 지원합니다.`, Icon: Rocket },
                        ].map((item) => (
                            <Card key={item.title} padding="lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white shrink-0">
                                        <item.Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-h4 text-ink">{item.title}</h4>
                                </div>
                                <p className="text-sm text-ink-soft">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (subPage === 'org') {
        const depts = [
            { num: "01", name: "경영지원본부", tasks: ["경영기획", "재무·회계", "인사·총무", "대외협력"], Icon: Briefcase },
            { num: "02", name: "기업투자본부", tasks: ["투자심사", "자회사 설립·편입", "투자조합 운용", "포트폴리오 관리", "Value-up 지원", "후속투자 지원", "TIPS 운영"], Icon: TrendingUp },
            { num: "03", name: "창업보육센터", tasks: ["입주기업 보육·관리", "창업 멘토링", "창업교육·네트워킹", "사업화 지원"], Icon: Users },
            { num: "04", name: "기술사업화본부", tasks: ["기술발굴", "기술평가", "기술이전", "지식재산(IP) 관리"], Icon: Lightbulb },
        ];

        return (
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-15" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <p className="text-label uppercase text-white/70 mb-4">Organization</p>
                        <p className="text-white/80 text-body md:text-body-lg">
                            기술사업화부터 투자, 창업보육까지 전주기 지원체계를 기반으로
                            <br />
                            대학의 연구성과를 산업적 가치로 연결합니다.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-line shadow-card px-4 py-10 md:px-8 md:py-12">
                    <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-2.5 bg-navy text-white rounded-xl px-8 py-3.5 font-bold text-base md:text-lg">
                            <UserCircle2 className="w-5 h-5 text-white/90" />
                            대표이사
                        </div>

                        <div className="w-px h-8 bg-line-strong" />

                        <div className="relative w-full">
                            <div className="hidden lg:block absolute top-0 left-[12.5%] right-[12.5%] h-px bg-line-strong" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                                {depts.map((dept) => (
                                    <div key={dept.name} className="flex flex-col items-center">
                                        <div className="w-px h-8 bg-line-strong" />
                                        <div className="w-full bg-white rounded-2xl border border-line shadow-card">
                                            <div className="flex items-center gap-3 px-4 py-4 border-b border-line">
                                                <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                                                    <dept.Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="display-num text-xs text-ink-faint leading-none mb-1">{dept.num}</div>
                                                    <h4 className="font-bold text-ink text-base leading-tight">{dept.name}</h4>
                                                </div>
                                            </div>
                                            <ul className="px-4 py-3 space-y-2.5">
                                                {dept.tasks.map((task) => (
                                                    <li key={task} className="flex items-center gap-2.5 text-caption text-ink-soft leading-snug">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-navy-light shrink-0" />
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AboutContent;
