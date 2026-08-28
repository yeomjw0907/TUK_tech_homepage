import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
    ChevronDown, Download, Clock, User, Building,
    ArrowUpDown, FileText
} from 'lucide-react';

// Types
import { PageId, Company, Post, Inquiry, Popup } from './types';

// Data
import { MENU_STRUCTURE, FUNDS_DATA, KEY_STATS } from './data/constants';
import { INITIAL_COMPANIES, INITIAL_POSTS, INITIAL_INQUIRIES, INITIAL_POPUPS } from './data/initialData';

// Utils
import { formatDate } from './utils/format';

// Components
import { Button, Badge, SectionTitle, SkeletonLoader, HomeSkeleton } from './components/common';
import { Header, Footer, QuickMenu, SubPageHeader } from './components/layout';
import {
    HomePage, PostDetail, CompanyDetail, ContactForm,
    AboutContent, InvestmentContent, SubsidiaryContent
} from './components/pages';
import { AdminPage } from './components/admin';
import PopupOverlay from './components/PopupOverlay';

const App: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const getListLogoSrc = (logo?: string) => {
        if (!logo) return '';
        // If explicit filename is already provided, use it as-is.
        if (/\.[a-zA-Z0-9]+($|\?)/.test(logo)) return logo;
        return `${logo}1.svg`;
    };
    
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

    // URL에서 상태 복원
    useEffect(() => {
        const path = location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        
        if (pathParts.length === 0) {
            // 홈
            setActivePage('home');
            setActiveSubPage(undefined);
            setSelectedPost(null);
            setSelectedCompany(null);
        } else if (pathParts[0] === 'post' && pathParts[1]) {
            // /post/:id - 게시글 상세
            const postId = parseInt(pathParts[1]);
            const post = posts.find(p => p.id === postId);
            if (post) {
                const typeMap: Record<string, string> = {
                    'notice': '공지사항',
                    'press': '언론보도',
                    'resources': '자료실',
                    'faq': 'Q&A'
                };
                setSelectedPost(post);
                setPostType(typeMap[post.category] || '공지사항');
                setActivePage('news');
                setActiveSubPage(post.category === 'notice' ? 'notice' : 
                                post.category === 'press' ? 'press' :
                                post.category === 'resources' ? 'resources' : 'faq');
            }
        } else if (pathParts[0] === 'company' && pathParts[1]) {
            // /company/:id - 기업 상세
            const companyId = pathParts[1];
            const company = companies.find(c => c.id === companyId);
            if (company) {
                setSelectedCompany(company);
                setActivePage('portfolio');
                setActiveSubPage(company.category === 'subsidiary' ? 'subsidiaries' : 'investees');
            }
        } else {
            // 일반 페이지
            const page = pathParts[0] as PageId;
            const subPage = pathParts[1];
            
            if (['home', 'about', 'investment', 'subsidiary', 'portfolio', 'news', 'contact', 'admin'].includes(page)) {
                setActivePage(page);
                setActiveSubPage(subPage);
                setSelectedPost(null);
                setSelectedCompany(null);
            }
        }
    }, [location.pathname, posts, companies]);

    const handleNavigate = (page: PageId, subPage?: string) => {
        setIsLoading(true);
        setActivePage(page);
        
        // 서브페이지가 지정되지 않았고, 메뉴에 서브아이템이 있으면 첫 번째 서브아이템을 기본값으로 설정
        if (!subPage) {
            const menuItem = MENU_STRUCTURE.find(item => item.id === page);
            if (menuItem?.subItems && menuItem.subItems.length > 0) {
                subPage = menuItem.subItems[0].id;
            }
        }
        
        setActiveSubPage(subPage);
        setSelectedCompany(null);
        setSelectedPost(null);

        setPortfolioSort('name_asc');

        // URL 업데이트
        if (page === 'home') {
            navigate('/');
        } else if (subPage) {
            navigate(`/${page}/${subPage}`);
        } else {
            navigate(`/${page}`);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 600);
    };

    const handleSubNavigate = (subPage: string) => {
        setIsLoading(true);
        setActiveSubPage(subPage);

        setPortfolioSort('name_asc');

        // URL 업데이트
        if (activePage === 'home') {
            navigate('/');
        } else {
            navigate(`/${activePage}/${subPage}`);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 400);
    };

    const handleCompanyClick = (company: Company) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedCompany(company);
            navigate(`/company/${company.id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsLoading(false);
        }, 300);
    };

    const handlePostClick = (post: Post, type: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setSelectedPost(post);
            setPostType(type);
            navigate(`/post/${post.id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsLoading(false);
        }, 300);
    };

    const handleInquirySubmit = (data: { inquiryType: string; name: string; contact: string; email: string; companyName: string; content: string }) => {
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
                <div className="py-24 px-4 bg-surface-alt animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
                    <PostDetail
                        post={selectedPost}
                        type={postType}
                        onBack={() => {
                            setSelectedPost(null);
                            const category = selectedPost.category;
                            if (category === 'notice') navigate('/news/notice');
                            else if (category === 'press') navigate('/news/press');
                            else if (category === 'resources') navigate('/news/resources');
                            else if (category === 'faq') navigate('/news/faq');
                            else navigate('/news/notice');
                        }}
                        onPostClick={(post) => handlePostClick(post, postType)}
                        allPosts={posts.filter(p => p.category === selectedPost.category)}
                    />
                </div>
            );
        }

        if (selectedCompany) {
            if (isLoading) return <SkeletonLoader />;
            return (
                <div className="py-24 px-4 bg-surface-alt animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
                    <CompanyDetail
                        company={selectedCompany} 
                        onBack={() => {
                            setSelectedCompany(null);
                            if (selectedCompany.category === 'subsidiary') {
                                navigate('/portfolio/subsidiaries');
                            } else {
                                navigate('/portfolio/investees');
                            }
                        }} 
                    />
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
                    parent={menuItem?.subItems && menuItem.subItems.length > 0 ? menuItem.label : undefined}
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
            else if (activeSubPage === 'investees') baseCompanies = companies.filter(c => c.category === 'portfolio');
            else if (activeSubPage === 'tips_reco') baseCompanies = companies.filter(c => c.isTips);
            else baseCompanies = companies;

            const filteredCompanies = [...baseCompanies];

            filteredCompanies.sort((a, b) => {
                if (portfolioSort === 'name_asc') return a.name.localeCompare(b.name, 'ko');
                if (portfolioSort === 'name_desc') return b.name.localeCompare(a.name, 'ko');
                if (portfolioSort === 'date_newest') return new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime();
                if (portfolioSort === 'date_oldest') return new Date(a.foundedDate).getTime() - new Date(b.foundedDate).getTime();
                return 0;
            });

            return (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-line gap-4">
                        <div className="text-ink-soft font-medium">총 <strong className="text-navy text-lg">{filteredCompanies.length}</strong>개의 기업이 있습니다.</div>

                        <div className="flex gap-3 flex-wrap justify-end">
                            <div className="relative">
                                <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
                                <select
                                    className="pl-9 pr-4 py-2 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy bg-white appearance-none cursor-pointer hover:border-line-strong transition-colors"
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
                                    className="bg-white p-6 rounded-2xl shadow-card border border-line hover:shadow-card-hover hover:-translate-y-1 hover:border-line-strong transition-all cursor-pointer group"
                                >
                                    <div className="aspect-video bg-white rounded-xl mb-5 flex items-center justify-center border border-line transition-colors relative overflow-hidden">
                                        {company.logo ? (
                                            <img src={getListLogoSrc(company.logo)} alt={company.name} className="w-full h-full object-contain p-4 bg-white" />
                                        ) : (
                                            <Building className="w-10 h-10 text-ink-faint group-hover:text-navy" />
                                        )}
                                    </div>
                                    <h4 className="font-bold text-ink text-lg mb-2 truncate group-hover:text-navy transition-colors tracking-tight">{company.name}</h4>
                                    <p className="text-xs text-ink-soft truncate font-medium mb-4">{company.shortDesc || company.business}</p>
                                    <div className="flex gap-2 flex-wrap mb-2">
                                        {company.isTips && <Badge variant="gold">TIPS</Badge>}
                                        <Badge variant="navy">{company.category === 'subsidiary' ? '자회사' : '투자기업'}</Badge>
                                    </div>
                                    <div className="text-xs text-ink-faint text-right">설립일: {formatDate(company.foundedDate)}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-ink-soft bg-surface-alt rounded-2xl border border-line border-dashed">
                            조건에 맞는 기업이 없습니다.
                        </div>
                    )}
                </div>
            );
        }

        // Investment Fields — 분야 소개는 InvestmentContent에 위임하고, 조합 운용 현황 표만 이어서 노출
        if (activePage === 'investment' && activeSubPage === 'fields') {
            return (
                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <InvestmentContent subPage="fields" onNavigate={handleNavigate} />
                    <FundsSection />
                </div>
            );
        }

        // News - Notice
        if (activePage === 'news' && activeSubPage === 'notice') {
            const noticePosts = posts.filter(p => p.category === 'notice');
            return (
                <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex justify-between items-center pb-6 border-b border-line">
                        <span className="text-ink-soft font-medium">총 <span className="text-navy font-bold text-lg">{noticePosts.length}</span>건</span>
                        <SearchBar />
                    </div>
                    <div className="bg-white rounded-2xl shadow-card border border-line divide-y divide-line overflow-hidden">
                        {noticePosts.map((notice) => (
                            <div key={notice.id} onClick={() => handlePostClick(notice, '공지사항')} className="flex flex-col md:flex-row md:items-center p-6 hover:bg-surface-alt transition-colors cursor-pointer group">
                                <div className="w-20 text-center text-ink-faint text-sm font-bold mb-2 md:mb-0 bg-surface-alt rounded py-1 mr-6">No.{notice.id}</div>
                                <div className="flex-grow">
                                    <h4 className="text-ink font-bold text-lg group-hover:text-navy transition-colors flex items-center gap-3 tracking-tight">
                                        {notice.title}
                                        {notice.isNew && <Badge variant="danger">NEW</Badge>}
                                    </h4>
                                </div>
                                <div className="text-ink-faint text-sm w-32 text-center mt-2 md:mt-0 font-medium">{formatDate(notice.date)}</div>
                            </div>
                        ))}
                        {noticePosts.length === 0 && (
                            <div className="text-center py-20 text-ink-faint">등록된 공지사항이 없습니다.</div>
                        )}
                    </div>
                </div>
            );
        }

        // News - Press
        if (activePage === 'news' && activeSubPage === 'press') {
            const pressPosts = posts.filter(p => p.category === 'press');
            return (
                <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex justify-between items-center pb-6 border-b border-line">
                        <span className="text-ink-soft font-medium">총 <span className="text-navy font-bold text-lg">{pressPosts.length}</span>건</span>
                        <SearchBar />
                    </div>
                    <div className="grid gap-6">
                        {pressPosts.map((post) => (
                            <div key={post.id} onClick={() => handlePostClick(post, '언론보도')} className="bg-white p-6 rounded-2xl border border-line shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer group">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge variant="neutral">PRESS</Badge>
                                    <span className="text-ink-faint text-sm">{formatDate(post.date)}</span>
                                </div>
                                <h4 className="text-xl font-bold text-ink mb-3 group-hover:text-navy transition-colors line-clamp-1">{post.title}</h4>
                                <p className="text-ink-soft line-clamp-2 text-sm">{post.content?.slice(0, 150)}...</p>
                            </div>
                        ))}
                        {pressPosts.length === 0 && <div className="text-center py-20 text-ink-faint">등록된 보도자료가 없습니다.</div>}
                    </div>
                </div>
            );
        }

        // News - Resources
        if (activePage === 'news' && activeSubPage === 'resources') {
            const resourcePosts = posts.filter(p => p.category === 'resources');
            return (
                <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex justify-between items-center pb-6 border-b border-line">
                        <span className="text-ink-soft font-medium">총 <span className="text-navy font-bold text-lg">{resourcePosts.length}</span>건</span>
                        <SearchBar />
                    </div>
                    <div className="bg-white rounded-2xl shadow-card border border-line">
                        {resourcePosts.map((resource, idx) => {
                            const downloadUrl = resource.fileUrl || (resource.fileName ? `/files/${resource.fileName}` : undefined);
                            return (
                            <a
                                key={resource.id}
                                href={downloadUrl}
                                download={resource.fileName}
                                onClick={(e) => {
                                    if (!downloadUrl) {
                                        e.preventDefault();
                                        handlePostClick(resource, '자료실');
                                    }
                                }}
                                className={`flex p-6 items-center gap-6 hover:bg-surface-alt transition-colors cursor-pointer ${idx !== resourcePosts.length - 1 ? 'border-b border-line' : ''}`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-surface-alt flex items-center justify-center text-sm font-bold text-ink-soft flex-shrink-0 border border-line uppercase">
                                    {resource.fileType || 'FILE'}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-ink font-bold text-lg mb-2 hover:text-navy transition-colors tracking-tight">{resource.title}</h4>
                                    <div className="flex items-center text-sm text-ink-faint gap-4">
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {formatDate(resource.date)}</span>
                                        <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {resource.author}</span>
                                    </div>
                                </div>
                                <Download className="w-5 h-5 text-ink-faint hover:text-navy" />
                            </a>
                            );
                        })}
                        {resourcePosts.length === 0 && (
                            <div className="text-center py-20 text-ink-faint">등록된 자료가 없습니다.</div>
                        )}
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
                        <h2 className="text-h2 text-ink mb-4">Q&A</h2>
                        <p className="text-ink-soft">궁금하신 점을 빠르게 확인해보세요.</p>
                    </div>
                    <div className="space-y-4">
                        {faqPosts.map((post) => (
                            <details key={post.id} className="group bg-white rounded-2xl border border-line-md open:border-navy transition-all duration-300 shadow-card open:shadow-card-hover">
                                <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none text-ink text-lg">
                                    <div className="flex items-start gap-4">
                                        <span className="text-navy font-bold mt-0.5">Q.</span>
                                        <span className="group-hover:text-navy transition-colors">{post.title}</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-ink-faint group-open:rotate-180 transition-transform shrink-0 ml-4" />
                                </summary>
                                <div className="px-6 pb-8 pt-2 text-ink-soft leading-relaxed border-t border-line mx-6 mt-2 flex gap-4">
                                    <span className="font-bold text-ink-faint">A.</span>
                                    <div className="whitespace-pre-wrap">{post.content}</div>
                                </div>
                            </details>
                        ))}
                        {faqPosts.length === 0 && <div className="text-center py-20 text-ink-faint">등록된 Q&A가 없습니다.</div>}
                    </div>
                </div>
            );
        }

        // About
        if (activePage === 'about' && ['history', 'overview', 'location', 'ceo', 'vision', 'org'].includes(activeSubPage!)) {
            return <AboutContent subPage={activeSubPage!} />;
        }

        if (activePage === 'about') {
            return <div className="py-20 text-center text-ink-faint font-light text-lg">준비중인 페이지입니다. ({activeSubPage})</div>;
        }

        // Investment
        if (activePage === 'investment' && ['process', 'growth', 'tips', 'fields', 'portfolio', 'apply'].includes(activeSubPage!)) {
            return <InvestmentContent subPage={activeSubPage!} onNavigate={handleNavigate} />;
        }

        // Subsidiary
        if (activePage === 'subsidiary' && ['intro', 'procedure', 'exit', 'support'].includes(activeSubPage!)) {
            return <SubsidiaryContent subPage={activeSubPage!} />;
        }

        // Contact
        if (activePage === 'contact') {
            return <ContactForm onSubmit={handleInquirySubmit} />;
        }

        // Default Empty State
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-surface-alt rounded-full mb-8 flex items-center justify-center text-ink-faint border border-line">
                    <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-h2 text-ink-faint mb-4">페이지 준비 중</h3>
                <p className="text-ink-soft max-w-md mx-auto text-lg tracking-tight">
                    현재 페이지는 준비 중입니다. <br />
                    빠른 시일 내에 유용한 정보로 찾아뵙겠습니다.
                </p>
                <Button variant="outline" className="mt-10" onClick={() => handleNavigate('home')}>홈으로 돌아가기</Button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white font-sans text-ink selection:bg-navy selection:text-white flex flex-col antialiased">
            <Header 
                activePage={activePage} 
                activeSubPage={activeSubPage} 
                onNavigate={handleNavigate} 
                hasHero={hasHero}
                posts={posts}
                companies={companies}
                onPostClick={handlePostClick}
                onCompanyClick={handleCompanyClick}
            />

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

// 게시판 목록 공통 검색 인풋+버튼
const SearchBar: React.FC = () => (
    <div className="flex gap-3">
        <input type="text" placeholder="검색어 입력" className="border border-line rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy w-64 shadow-sm" />
        <Button size="sm">검색</Button>
    </div>
);

const FundsSection: React.FC = () => {
    return (
        <div className="bg-surface-alt rounded-2xl p-6 md:p-12 border border-line relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-surface-alt2/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
                <SectionTitle title="투자 조합 운용 현황" subtitle="Investment Funds" />

                <div className="bg-white rounded-2xl shadow-card border border-line px-8 py-10 text-center">
                    <p className="text-body-lg text-ink tracking-tight">
                        총 <span className="text-navy font-bold">{FUNDS_DATA.length}개</span> 투자조합 운용 중 AUM <span className="text-navy font-bold">{KEY_STATS.fundTotal.replace('+', '')}원</span> 규모
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
