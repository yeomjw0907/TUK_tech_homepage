import React from 'react';
import { ArrowRight, ArrowLeft, ExternalLink, Lightbulb, Search } from 'lucide-react';
import { Button, Card, SectionTitle } from '../common';
import { TECH_TRANSFER_LINKS } from '../../data/constants';

const TRANSFER_FORMS: { group: string; rows: { form: string; desc: string }[] }[] = [
    {
        group: '권리양도',
        rows: [
            { form: '매매', desc: '특허권 등 기술에 관한 권리를 대가를 받고 기술도입자에게 이전하는 방식' },
        ],
    },
    {
        group: '실시권 허여',
        rows: [
            { form: '전용실시권', desc: '정해진 범위에서 해당 기술을 독점적으로 실시할 수 있는 권리를 부여하는 방식' },
            { form: '통상실시권', desc: '정해진 범위에서 해당 기술을 비독점적으로 실시할 수 있는 권리를 부여하는 방식' },
        ],
    },
    {
        group: '기술자문 및 지도',
        rows: [
            { form: '기술지도', desc: '기술자문·기술지도 등을 통해 기술의 활용 및 사업화를 지원하는 방식' },
        ],
    },
    {
        group: '기타',
        rows: [
            { form: '공동연구 등', desc: '공동연구, 기술제휴, 생산제휴 등 다양한 협력방식을 통해 기술을 이전·활용하는 방식' },
        ],
    },
];

const ACTORS = [
    { id: 'inventor', label: '발명자', header: 'bg-navy text-white' },
    { id: 'tlo', label: 'TU KOREA 산학협력단', header: 'bg-navy-deep text-white' },
    { id: 'company', label: '기술이전도요기업', header: 'bg-navy-light text-white' },
] as const;

type FlowCell = { text: string; arrow?: 'right' | 'left' } | null;

const FLOW_PHASES: { num: string; title: string; rows: FlowCell[][] }[] = [
    {
        num: '1',
        title: '이전기술의 발굴 및 신청 접수',
        rows: [
            [null, { text: '기술이전기업 서치' }, { text: '기술수요 발생' }],
            [{ text: '기술이전기업 발굴 신청', arrow: 'right' }, null, null],
            [null, { text: '기술이전 신청 접수' }, { text: '기술이전 신청', arrow: 'left' }],
        ],
    },
    {
        num: '2',
        title: '기술이전계약체결',
        rows: [
            [{ text: '기술이전체결 협상', arrow: 'right' }, { text: '기술이전 합의' }, { text: '기술이전조건 협상' }],
            [null, { text: '기술이전 체결' }, null],
        ],
    },
    {
        num: '3',
        title: '후속지원 및 사후관리',
        rows: [
            [{ text: '기술이전 지도', arrow: 'right' }, { text: '기술이전 체결' }, { text: '기술이전 확인' }],
            [
                { text: '기술이전 결과보고' },
                { text: '이전기업 후속지원\nR&BD 기획지원\nPost-therapy' },
                { text: '전수기술 상용화' },
            ],
        ],
    },
];

const FlowBox: React.FC<{ text: string; arrow?: 'right' | 'left' }> = ({ text, arrow }) => (
    <div className="relative">
        <div className="bg-white rounded-xl border border-line-md px-4 py-3 text-sm text-ink text-center leading-relaxed min-h-12 flex items-center justify-center whitespace-pre-line">
            {text}
        </div>
        {arrow === 'right' && (
            <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 w-5 h-5 text-navy" aria-hidden />
        )}
        {arrow === 'left' && (
            <ArrowLeft className="hidden lg:block absolute top-1/2 -left-5 -translate-y-1/2 w-5 h-5 text-navy-light" aria-hidden />
        )}
    </div>
);

const TransferProcess: React.FC = () => (
    <div className="space-y-8">
        <div className="hidden lg:grid grid-cols-3 gap-8">
            {ACTORS.map((actor) => (
                <div
                    key={actor.id}
                    className={`${actor.header} rounded-xl py-3 px-4 text-center text-sm font-bold`}
                >
                    {actor.label}
                </div>
            ))}
        </div>

        {FLOW_PHASES.map((phase) => (
            <div key={phase.num} className="space-y-4">
                <h4 className="text-h4 text-ink flex items-center gap-3">
                    <span className="inline-flex w-8 h-8 rounded-xl bg-navy text-white text-sm items-center justify-center shrink-0">
                        {phase.num}
                    </span>
                    {phase.title}
                </h4>

                {/* Desktop swimlane */}
                <div className="hidden lg:block space-y-3">
                    {phase.rows.map((row, rowIdx) => (
                        <div key={rowIdx} className="grid grid-cols-3 gap-8 items-center">
                            {row.map((cell, colIdx) => (
                                <div key={colIdx}>
                                    {cell ? <FlowBox text={cell.text} arrow={cell.arrow} /> : <div />}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Mobile: actor-tagged steps */}
                <div className="lg:hidden space-y-3">
                    {phase.rows.flatMap((row, rowIdx) =>
                        row.map((cell, colIdx) =>
                            cell ? (
                                <div key={`${rowIdx}-${colIdx}`} className="flex items-start gap-3">
                                    <span className={`mt-0.5 shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold ${ACTORS[colIdx].header}`}>
                                        {ACTORS[colIdx].label}
                                    </span>
                                    <p className="text-sm text-ink leading-relaxed whitespace-pre-line pt-0.5">{cell.text}</p>
                                </div>
                            ) : null
                        )
                    )}
                </div>
            </div>
        ))}
    </div>
);

const TechTransferContent: React.FC = () => (
    <div className="space-y-20 max-w-5xl mx-auto">
        <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <p className="text-label uppercase text-white/70 mb-4">Technology Transfer</p>
                <h3 className="text-h3 text-white mb-6">기술의 가치를 발견하고, 사업화의 기회를 연결합니다.</h3>
                <p className="text-white/80 text-body md:text-body-lg">
                    한국공학대학교가 보유한 우수한 연구성과와 기술이 기업의 제품·서비스 개발 및 사업화로
                    이어질 수 있도록 기술이전 및 사업화를 지원합니다.
                </p>
            </div>
        </div>

        <section>
            <SectionTitle
                subtitle="Technology Transfer"
                title="기술이전이란"
                align="left"
                size="sm"
            />
            <p className="text-ink-soft leading-relaxed mb-6">
                <span className="text-navy font-bold">▸</span> 기술이전은 대학이 보유한 연구성과와 기술을 기업 등이 활용할 수 있도록 이전하는 것을 의미합니다.
            </p>
            <blockquote className="bg-surface-alt border border-line rounded-2xl p-6 md:p-8">
                <p className="text-ink leading-relaxed">
                    “기술이전”이란 양도, 실시권 허락, 기술지도, 공동연구, 합작투자 또는 인수·합병 등의 방법으로 기술이
                    기술보유자(해당 기술을 처분할 권한이 있는 자를 포함한다)로부터 그 외의 자에게 이전되는 것을 말한다.
                </p>
                <footer className="text-caption text-ink-faint mt-4">
                    「기술의 이전 및 사업화 촉진에 관한 법률」 제2조 제2호
                </footer>
            </blockquote>
        </section>

        <section>
            <SectionTitle
                subtitle="Commercialization"
                title="기술사업화란"
                align="left"
                size="sm"
            />
            <p className="text-ink-soft leading-relaxed mb-6">
                <span className="text-navy font-bold">▸</span> 기술사업화는 이전된 기술이나 연구성과를 실제 제품·서비스 및 사업으로 연결하여 새로운 가치를 창출하는 과정입니다.
            </p>
            <blockquote className="bg-surface-alt border border-line rounded-2xl p-6 md:p-8">
                <p className="text-ink leading-relaxed">
                    “기술사업화”란 기술을 이용하여 제품을 개발·생산 또는 판매하거나 그 과정의 관련 기술을 향상시키는 것을 말한다.
                </p>
                <footer className="text-caption text-ink-faint mt-4">
                    「기술의 이전 및 사업화 촉진에 관한 법률」 제2조 제3호
                </footer>
            </blockquote>
        </section>

        <section>
            <SectionTitle
                subtitle="Transfer Types"
                title="기술이전 형태"
                align="left"
                size="sm"
            />
            <div className="overflow-x-auto rounded-2xl border border-line shadow-card bg-white">
                <table className="w-full text-sm text-left">
                    <caption className="sr-only">기술이전 형태 구분</caption>
                    <thead className="bg-navy text-white">
                        <tr>
                            <th scope="col" className="px-5 py-4 font-bold w-36">구분</th>
                            <th scope="col" className="px-5 py-4 font-bold w-36">형태</th>
                            <th scope="col" className="px-5 py-4 font-bold">내용</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {TRANSFER_FORMS.map((group) =>
                            group.rows.map((row, idx) => (
                                <tr key={`${group.group}-${row.form}`} className="align-top">
                                    {idx === 0 && (
                                        <th
                                            scope="row"
                                            rowSpan={group.rows.length}
                                            className="px-5 py-4 font-bold text-ink bg-surface-alt whitespace-nowrap"
                                        >
                                            {group.group}
                                        </th>
                                    )}
                                    <td className="px-5 py-4 font-bold text-navy whitespace-nowrap">{row.form}</td>
                                    <td className="px-5 py-4 text-ink-soft leading-relaxed">{row.desc}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>

        <section>
            <SectionTitle
                subtitle="Process"
                title="기술이전 업무절차"
                align="left"
                size="sm"
            />
            <Card hover={false} padding="lg">
                <TransferProcess />
            </Card>
        </section>

        <section className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <p className="text-label uppercase text-white/70 mb-4">Find Technology</p>
                <h3 className="text-h3 text-white mb-4">기술을 찾고 계신가요?</h3>
                <p className="text-white/80 text-body mb-8">
                    한국공학대학교의 우수한 연구성과를 직접 확인하거나, 기업의 기술수요에 적합한 기술을 찾아보세요.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => window.open(TECH_TRANSFER_LINKS.excellentTech, '_blank', 'noopener,noreferrer')}
                    >
                        <Lightbulb className="w-5 h-5" />
                        우수기술 살펴보기
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="inverse"
                        size="lg"
                        onClick={() => window.open(TECH_TRANSFER_LINKS.findTech, '_blank', 'noopener,noreferrer')}
                    >
                        <Search className="w-5 h-5" />
                        맞춤기술 찾기
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    </div>
);

export default TechTransferContent;
