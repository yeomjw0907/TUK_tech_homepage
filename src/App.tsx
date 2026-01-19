import React, { useState } from 'react';
import {
    ChevronDown, Download, Clock, User, Building,
    Filter, ArrowUpDown, PieChart, Briefcase, FileText
} from 'lucide-react';

// Types
import { PageId, Company, Post, Inquiry, Popup } from './types';

// Data
import { MENU_STRUCTURE, FUNDS_DATA } from './data/constants';
import { INITIAL_COMPANIES, INITIAL_POSTS, INITIAL_INQUIRIES, INITIAL_POPUPS } from './data/initialData';

// Components
import { Button, Card, SectionTitle, SkeletonLoader, HomeSkeleton } from './components/common';
import { Header, Footer, QuickMenu, SubPageHeader } from './components/layout';
import {
    HomePage, PostDetail, CompanyDetail, ContactForm,
    AboutContent, InvestmentContent, SubsidiaryContent
} from './components/pages';
import { AdminPage } from './components/admin';
import PopupOverlay from './components/PopupOverlay';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<PageId>('home');
    const [activeSubPage, setActiveSubPage] = useState<string | undefined>(undefined);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [postType, setPostType] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    // Data State
    const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
    const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
    const [popups, setPopups] = useState<Popup[]>(INITIAL_POPUPS);

    // Filters
    const [portfolioSort, setPortfolioSort] = useState('name_asc');
    const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('all');

    const handleNavigate = (page: PageId, subPage?: string) => {
        setIsLoading(true);
        setActivePage(page);
        setActiveSubPage(subPage);
        setSelectedCompany(null);
        setSelectedPost(null);

        setPortfolioSort('name_asc');
        setPortfolioCategoryFilter('all');

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 600);
    };

    const handleSubNavigate = (subPage: string) => {
        setIsLoading(true);
        setActiveSubPage(subPage);

        setPortfolioSort('name_asc');
        setPortfolioCategoryFilter('all');

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 400);
    };

    const handleCompanyClick = (company: Company) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedCompany(company);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsLoading(false);
        }, 300);
    };

    const handlePostClick = (post: Post, type: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedPost(post);
            setPostType(type);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsLoading(false);
        }, 300);
    };

    const handleInquirySubmit = (data: { name: string; contact: string; email: string; content: string }) => {
        const newInquiry: Inquiry = {
            id: Date.now(),
            ...data,
            date: new Date().toISOString().split('T')[0],
            status: '대기'
        };
        setInquiries([newInquiry, ...inquiries]);
    };

    const handlePopupClose = (id: number, doNotShowToday: boolean) => {
        setPopups(prev => prev.map(p => p.id === id ? { ...p, isVisible: false } : p));
        if (doNotShowToday) {
            console.log(`Popup ${id} hidden for today`);
        }
    };

    const hasHero = (activePage === 'home' || (activePage !== 'contact' && activePage !== 'admin' && !selectedPost && !selectedCompany));

    const renderContent = () => {
        if (activePage === 'admin') {
            return (
                <AdminPage
                    companies={companies} setCompanies={setCompanies}
                    posts={posts} setPosts={setPosts}
                    inquiries={inquiries} setInquiries={setInquiries}
                    popups={popups} setPopups={setPopups}
                    onLogout={() => handleNavigate('home')}
                />
            );
        }

        if (isLoading && selectedCompany === null && selectedPost === null && activePage === 'home') {
            return <HomeSkeleton />;
        }

        if (selectedPost) {
            if (isLoading) return <SkeletonLoader />;
            return (
                <div className="py-24 px-4 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
                    <PostDetail
                        post={selectedPost}
                        type={postType}
                        onBack={() => setSelectedPost(null)}
                        onPostClick={(post) => handlePostClick(post, postType)}
                        allPosts={posts.filter(p => p.category === selectedPost.category)}
                    />
                </div>
            );
        }

        if (selectedCompany) {
            if (isLoading) return <SkeletonLoader />;
            return (
                <div className="py-24 px-4 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
                    <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompany(null)} />
                </div>
            );
        }

        if (activePage === 'home') {
            return (
                <>
                    <PopupOverlay popups={popups} onClose={handlePopupClose} />
                    <HomePage onNavigate={handleNavigate} onCompanyClick={handleCompanyClick} onPostClick={handlePostClick} notices={posts.filter(p => p.category === 'notice')} />
                </>
            );
        }

        const menuItem = MENU_STRUCTURE.find(item => item.id === activePage);
        const subMenuItem = menuItem?.subItems?.find(s => s.id === activeSubPage);

        return (
            <div className="animate-in fade-in zoom-in-95 duration-300">
                <SubPageHeader
                    title={subMenuItem?.label || menuItem?.label}
                    parent={menuItem?.label}
                    menuItems={menuItem?.subItems}
                    activeSub={activeSubPage}
                    onSubNav={handleSubNavigate}
                />
                <div className="max-w-7xl mx-auto px-4 py-24 min-h-[600px]">
                    {isLoading ? <SkeletonLoader /> : renderSubPageContent()}
                </div>
            </div>
        );
    };

    const renderSubPageContent = () => {
        // Portfolio Logic
        if (activePage === 'portfolio') {
            let baseCompanies: Company[] = [];
            if (activeSubPage === 'subsidiaries') baseCompanies = companies.filter(c => c.category === 'subsidiary');
            else if (activeSubPage === 'tips_reco') baseCompanies = companies.filter(c => c.isTips);
            else baseCompanies = companies;

            let filteredCompanies = baseCompanies;
            if ((activeSubPage === 'all_portfolio' || activeSubPage === 'tips_reco') && portfolioCategoryFilter !== 'all') {
                filteredCompanies = filteredCompanies.filter(c => c.category === portfolioCategoryFilter);
            }

            filteredCompanies.sort((a, b) => {
                if (portfolioSort === 'name_asc') return a.name.localeCompare(b.name, 'ko');
                if (portfolioSort === 'name_desc') return b.name.localeCompare(a.name, 'ko');
                if (portfolioSort === 'date_newest') return new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime();
                if (portfolioSort === 'date_oldest') return new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime();
                return 0;
            });

            return (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-slate-200 gap-4">
                        <div className="text-slate-500 font-medium">총 <strong className="text-[#003E7E] text-lg">{filteredCompanies.length}</strong>개의 기업이 있습니다.</div>

                        <div className="flex gap-3 flex-wrap justify-end">
                            {activeSubPage !== 'subsidiaries' && (
                                <div className="relative">
                                    <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <select
                                        className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] bg-white appearance-none cursor-pointer hover:border-[#003E7E] transition-colors"
                                        value={portfolioCategoryFilter}
                                        onChange={(e) => setPortfolioCategoryFilter(e.target.value)}
                                    >
                                        <option value="all">전체 기업</option>
                                        <option value="subsidiary">자회사</option>
                                        <option value="portfolio">투자기업</option>
                                    </select>
                                </div>
                            )}

                            <div className="relative">
                                <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <select
                                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] bg-white appearance-none cursor-pointer hover:border-[#003E7E] transition-colors"
                                    value={portfolioSort}
                                    onChange={(e) => setPortfolioSort(e.target.value)}
                                >
                                    <option value="name_asc">가나다순</option>
                                    <option value="name_desc">가나다역순</option>
                                    <option value="date_newest">최신 설립일순</option>
                                    <option value="date_oldest">오래된 설립일순</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {filteredCompanies.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredCompanies.map(company => (
                                <div
                                    key={company.id}
                                    onClick={() => handleCompanyClick(company)}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 transition-all cursor-pointer group"
                                >
                                    <div className="aspect-video bg-slate-50 rounded-xl mb-5 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors relative overflow-hidden">
                                        {company.logo ? (
                                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <Building className="w-10 h-10 text-slate-300 group-hover:text-[#003E7E]" />
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-2 truncate group-hover:text-[#003E7E] transition-colors tracking-tight">{company.name}</h4>
                                    <p className="text-xs text-slate-500 truncate font-medium mb-4">{company.shortDesc || company.business}</p>
                                    <div className="flex gap-2 flex-wrap mb-2">
                                        {company.isTips && <span className="text-[10px] font-bold text-[#003E7E] bg-blue-50 px-2 py-1 rounded-full border border-blue-100">TIPS</span>}
                                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 text-right">설립일: {company.foundedDate}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                            조건에 맞는 기업이 없습니다.
                        </div>
                    )}
                </div>
            );
        }

        // Investment Fields
        if (activePage === 'investment' && activeSubPage === 'fields') {
            return (
                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <InvestmentFieldsSection onNavigate={handleNavigate} />
                    <FundsSection />
                </div>
            );
        }

        // News - Notice
        if (activePage === 'news' && activeSubPage === 'notice') {
            const noticePosts = posts.filter(p => p.category === 'notice');
            return (
                <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                        <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{noticePosts.length}</span>건</span>
                        <div className="flex gap-3">
                            <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                            <Button size="sm">검색</Button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                        {noticePosts.map((notice) => (
                            <div key={notice.id} onClick={() => handlePostClick(notice, '공지사항')} className="flex flex-col md:flex-row md:items-center p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="w-20 text-center text-slate-400 text-sm font-bold mb-2 md:mb-0 bg-slate-100 rounded py-1 mr-6">No.{notice.id}</div>
                                <div className="flex-grow">
                                    <h4 className="text-slate-800 font-bold text-lg group-hover:text-[#003E7E] transition-colors flex items-center gap-3 tracking-tight">
                                        {notice.title}
                                        {notice.isNew && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] border border-red-100 rounded-full font-bold">NEW</span>}
                                    </h4>
                                </div>
                                <div className="text-slate-400 text-sm w-32 text-center mt-2 md:mt-0 font-medium">{notice.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // News - Press
        if (activePage === 'news' && activeSubPage === 'press') {
            const pressPosts = posts.filter(p => p.category === 'press');
            return (
                <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                        <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{pressPosts.length}</span>건</span>
                        <div className="flex gap-3">
                            <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                            <Button size="sm">검색</Button>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        {pressPosts.map((post) => (
                            <div key={post.id} onClick={() => handlePostClick(post, '보도소식')} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-blue-50 text-[#003E7E] text-xs font-bold rounded-full">PRESS</span>
                                    <span className="text-slate-400 text-sm">{post.date}</span>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#003E7E] transition-colors line-clamp-1">{post.title}</h4>
                                <p className="text-slate-600 line-clamp-2 text-sm">{post.content?.slice(0, 150)}...</p>
                            </div>
                        ))}
                        {pressPosts.length === 0 && <div className="text-center py-20 text-slate-400">등록된 보도자료가 없습니다.</div>}
                    </div>
                </div>
            );
        }

        // News - Resources
        if (activePage === 'news' && activeSubPage === 'resources') {
            const resourcePosts = posts.filter(p => p.category === 'resources');
            return (
                <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex justify-between items-center pb-6 border-b border-slate-200">
                        <span className="text-slate-500 font-medium">총 <span className="text-[#003E7E] font-bold text-lg">{resourcePosts.length}</span>건</span>
                        <div className="flex gap-3">
                            <input type="text" placeholder="검색어 입력" className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003E7E] w-64 shadow-sm" />
                            <Button size="sm">검색</Button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                        {resourcePosts.map((resource, idx) => (
                            <div key={resource.id} onClick={() => handlePostClick(resource, '자료실')} className={`p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors cursor-pointer ${idx !== resourcePosts.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-slate-500 flex-shrink-0 border border-slate-200 uppercase">
                                    {resource.fileType || 'FILE'}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-slate-800 font-bold text-lg mb-2 hover:text-[#003E7E] transition-colors tracking-tight">{resource.title}</h4>
                                    <div className="flex items-center text-sm text-slate-400 gap-4">
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {resource.date}</span>
                                        <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {resource.author}</span>
                                    </div>
                                </div>
                                <Download className="w-5 h-5 text-slate-300 hover:text-[#003E7E]" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // News - FAQ
        if (activePage === 'news' && activeSubPage === 'faq') {
            const faqPosts = posts.filter(p => p.category === 'faq');
            return (
                <div className="space-y-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
                        <p className="text-slate-600">궁금하신 점을 빠르게 확인해보세요.</p>
                    </div>
                    <div className="space-y-4">
                        {faqPosts.map((post) => (
                            <details key={post.id} className="group bg-white rounded-2xl border border-slate-200 open:border-[#003E7E] transition-all duration-300 shadow-sm open:shadow-md">
                                <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none text-slate-800 text-lg">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[#003E7E] font-black mt-0.5">Q.</span>
                                        <span className="group-hover:text-[#003E7E] transition-colors">{post.title}</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                                </summary>
                                <div className="px-6 pb-8 pt-2 text-slate-600 leading-relaxed border-t border-slate-100 mx-6 mt-2 flex gap-4">
                                    <span className="font-black text-slate-300">A.</span>
                                    <div className="whitespace-pre-wrap">{post.content}</div>
                                </div>
                            </details>
                        ))}
                        {faqPosts.length === 0 && <div className="text-center py-20 text-slate-400">등록된 FAQ가 없습니다.</div>}
                    </div>
                </div>
            );
        }

        // About
        if (activePage === 'about' && ['history', 'overview', 'location', 'ceo', 'vision', 'org'].includes(activeSubPage!)) {
            return <AboutContent subPage={activeSubPage!} />;
        }

        if (activePage === 'about') {
            return <div className="py-32 text-center text-slate-400 font-light text-lg">준비중인 페이지입니다. ({activeSubPage})</div>;
        }

        // Investment
        if (activePage === 'investment' && ['process', 'growth', 'tips', 'fields', 'apply'].includes(activeSubPage!)) {
            return <InvestmentContent subPage={activeSubPage!} />;
        }

        // Subsidiary
        if (activePage === 'subsidiary' && ['procedure', 'exit', 'support'].includes(activeSubPage!)) {
            return <SubsidiaryContent subPage={activeSubPage!} />;
        }

        // Contact
        if (activePage === 'contact') {
            return <ContactForm onSubmit={handleInquirySubmit} />;
        }

        // Default Empty State
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-slate-50 rounded-full mb-8 flex items-center justify-center text-slate-300 border border-slate-100">
                    <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-300 mb-4 tracking-tight">페이지 준비 중</h3>
                <p className="text-slate-500 max-w-md mx-auto text-lg tracking-tight">
                    현재 페이지는 준비 중입니다. <br />
                    빠른 시일 내에 유용한 정보로 찾아뵙겠습니다.
                </p>
                <Button variant="outline" className="mt-10 text-slate-500 border-slate-300 hover:bg-slate-50 hover:text-slate-900" onClick={() => handleNavigate('home')}>홈으로 돌아가기</Button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#003E7E] selection:text-white flex flex-col antialiased">
            <Header activePage={activePage} activeSubPage={activeSubPage} onNavigate={handleNavigate} hasHero={hasHero} />

            <main className={`flex-grow ${hasHero && activePage !== 'admin' ? '' : 'pt-20'}`}>
                {renderContent()}
            </main>

            {activePage !== 'admin' && (
                <>
                    <QuickMenu onNavigate={handleNavigate} />
                    <Footer onAdminLogin={() => handleNavigate('admin')} />
                </>
            )}
        </div>
    );
};

// Helper Components for Investment Fields Page
const InvestmentFieldsSection: React.FC<{ onNavigate: (page: PageId, subPage?: string) => void }> = ({ onNavigate }) => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { icon: () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, title: "IT/SW", desc: "인공지능, 빅데이터, 클라우드, 사물인터넷 등 4차 산업혁명 핵심 기술 분야" },
                { icon: () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.086.517l-.426.213-.426-.213a6 6 0 00-3.086-.517l-2.387.477a2 2 0 00-1.022.547" /></svg>, title: "바이오/헬스케어", desc: "디지털 헬스케어, 의료기기, 바이오 소재 등 국민 건강 증진을 위한 혁신 기술" },
                { icon: () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, title: "제조/소재/부품", desc: "첨단 제조 공정, 신소재, 고기능성 부품 등 산업 경쟁력 강화를 위한 기반 기술" }
            ].map((item, idx) => (
                <Card key={idx} className="text-center p-12 h-full flex flex-col items-center hover:border-blue-200 group">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-[#003E7E] shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <item.icon />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg tracking-tight">{item.desc}</p>
                </Card>
            ))}
        </div>
    );
};

const FundsSection: React.FC = () => {
    return (
        <div className="bg-slate-50 rounded-3xl p-6 md:p-12 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
                <SectionTitle title="투자 조합 운용 현황" subtitle="Investment Funds" />

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
                    <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-8 py-6 font-bold border-b border-slate-200 w-[35%]">구분</th>
                                <th className="px-6 py-6 font-bold border-b border-slate-200 text-center w-[15%]">소관부처</th>
                                <th className="px-6 py-6 font-bold border-b border-slate-200 text-right w-[15%]">결성규모</th>
                                <th className="px-6 py-6 font-bold border-b border-slate-200 text-center w-[10%]">진행현황</th>
                                <th className="px-8 py-6 font-bold border-b border-slate-200 text-right w-[25%]">운용기간</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {FUNDS_DATA.map((fund, idx) => (
                                <tr key={idx} className="group hover:bg-blue-50/30 transition-colors duration-200">
                                    <td className="px-8 py-6 align-middle">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003E7E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#003E7E] group-hover:text-white transition-all duration-300 shadow-sm">
                                                <PieChart className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-800 text-base tracking-tight group-hover:text-[#003E7E] transition-colors">{fund.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center align-middle">
                                        <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                                            {fund.agency.split('(')[0]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 align-middle text-right">
                                        <span className="font-extrabold text-[#003E7E] text-lg whitespace-nowrap">{fund.size}</span>
                                    </td>
                                    <td className="px-6 py-6 text-center align-middle">
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100 shadow-sm whitespace-nowrap">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            {fund.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-slate-500 text-right font-mono text-sm tracking-tight align-middle whitespace-nowrap">
                                        {fund.period}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {FUNDS_DATA.map((fund, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="flex justify-between items-start gap-4 relative z-10">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-white text-[#003E7E] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                                        <PieChart className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 pr-8">{fund.name}</h4>
                                        <span className="text-xs font-bold text-slate-400">{fund.agency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">결성규모</span>
                                    <span className="text-xl font-black text-[#003E7E]">{fund.size}</span>
                                </div>
                                <div className="flex flex-col gap-1 items-end">
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">상태</span>
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                        </span>
                                        {fund.status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex flex-col gap-1 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">운용기간</span>
                                    <span className="text-sm font-mono text-slate-600 font-medium">{fund.period}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-right text-slate-500 font-bold mt-8 flex justify-end items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2 text-[#003E7E]" /> 총 <span className="text-[#003E7E] mx-1">6개</span> 투자조합 운용 중 / 총 <span className="text-[#003E7E] mx-1">113억원</span> 규모
                </p>
            </div>
        </div>
    );
};

export default App;
