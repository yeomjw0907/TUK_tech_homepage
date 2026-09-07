import React, { useState, useEffect, lazy, Suspense, Component, ReactNode } from 'react';
import {
    Building, Bell, Layers, Inbox, LayoutDashboard,
    Settings, Home, LogOut, Plus, Trash2, Edit, Eye,
    Paperclip, HelpCircle, XCircle, Image as ImageIcon,
    Phone, Mail, ArrowLeft, AlertTriangle, UploadCloud, RefreshCw
} from 'lucide-react';
import { Company, Post, Inquiry, Popup, PostFile } from '../../types';
import { Button, Modal } from '../common';
import { todayDisplay } from '../../utils/format';
import { loadState } from '../../utils/storage';
import { INITIAL_POSTS, INITIAL_COMPANIES } from '../../data/initialData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import AdminLogin, { ADMIN_AUTH_KEY } from './AdminLogin';

const RichTextEditor = lazy(() => import('../common/RichTextEditor'));

// 에러 바운더리 컴포넌트
class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('RichTextEditor Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export interface AdminActions {
    mode: 'supabase' | 'local';
    refresh: () => Promise<void>;
    savePost: (data: Partial<Post>, id?: number) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
    saveCompany: (data: Partial<Company>, id?: string) => Promise<void>;
    deleteCompany: (id: string) => Promise<void>;
    savePopup: (data: Partial<Popup>, id?: number) => Promise<void>;
    deletePopup: (id: number) => Promise<void>;
    updateInquiryStatus: (id: number, status: Inquiry['status']) => Promise<void>;
    deleteInquiry: (id: number) => Promise<void>;
    uploadFile: (file: File, folder: string) => Promise<PostFile & { url: string }>;
    importPosts: (items: Post[]) => Promise<void>;
    importCompanies: (items: Company[]) => Promise<void>;
}

interface AdminPageProps {
    companies: Company[];
    posts: Post[];
    inquiries: Inquiry[];
    popups: Popup[];
    actions: AdminActions;
    onLogout: () => void;
}

/** 이 브라우저의 localStorage(예전 저장 방식)에만 남아 있고 서버에는 없는 데이터를 찾는다. */
const findUnsyncedLocalData = (posts: Post[], companies: Company[]) => {
    const seedPostIds = new Set(INITIAL_POSTS.map(p => p.id));
    const seedCompanyIds = new Set(INITIAL_COMPANIES.map(c => c.id));
    const serverPostIds = new Set(posts.map(p => p.id));
    const serverCompanyIds = new Set(companies.map(c => c.id));
    const serverPostTitles = new Set(posts.map(p => `${p.category}|${p.title}`));
    const serverCompanyNames = new Set(companies.map(c => c.name));

    const localPosts = loadState<Post[]>('posts', []).filter(p =>
        !seedPostIds.has(p.id) && !serverPostIds.has(p.id) && !serverPostTitles.has(`${p.category}|${p.title}`)
    );
    const localCompanies = loadState<Company[]>('companies', []).filter(c =>
        !seedCompanyIds.has(c.id) && !serverCompanyIds.has(c.id) && !serverCompanyNames.has(c.name)
    );
    return { localPosts, localCompanies };
};

const AdminPage: React.FC<AdminPageProps> = ({
    companies, posts, inquiries, popups, actions, onLogout
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => typeof window !== 'undefined' && sessionStorage.getItem(ADMIN_AUTH_KEY) === '1'
    );
    const [activeTab, setActiveTab] = useState('dashboard');
    const [busy, setBusy] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Supabase 세션 확인 — 세션이 만료되었으면 로그인 화면으로 돌려보낸다.
    useEffect(() => {
        if (!isSupabaseConfigured || !supabase) return;
        let cancelled = false;
        supabase.auth.getSession().then(({ data }) => {
            if (cancelled) return;
            const loggedIn = Boolean(data.session);
            setIsAuthenticated(loggedIn);
            if (loggedIn) sessionStorage.setItem(ADMIN_AUTH_KEY, '1');
            else sessionStorage.removeItem(ADMIN_AUTH_KEY);
        });
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            if (cancelled) return;
            if (!session) {
                sessionStorage.removeItem(ADMIN_AUTH_KEY);
                setIsAuthenticated(false);
            }
        });
        return () => { cancelled = true; sub.subscription.unsubscribe(); };
    }, []);

    // 로그인 직후 관리자만 볼 수 있는 데이터(문의 내역)를 다시 불러온다.
    useEffect(() => {
        if (isAuthenticated) actions.refresh().catch(() => undefined);
    }, [isAuthenticated]);

    // Modals state
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);

    // Post editor mode: 'list' | 'edit' | null
    const [postEditorMode, setPostEditorMode] = useState<'list' | 'edit' | null>(null);

    // State for viewing inquiry detail
    const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);

    // Editing state
    const [editingId, setEditingId] = useState<string | number | null>(null);

    // Filter state for posts
    const [postCategoryFilter, setPostCategoryFilter] = useState('all');

    // Form states
    const [companyFormData, setCompanyFormData] = useState<Partial<Company>>({
        name: '', ceo: '', category: 'portfolio', business: '', foundedDate: '',
        room: '', moveInDate: '', homepage: '', note: '', isTips: false,
        logo: '', bgImage: '', shortDesc: ''
    });

    const [postFormData, setPostFormData] = useState<Partial<Post>>({
        title: '', author: '관리자', content: '', category: 'notice', files: []
    });

    const [popupFormData, setPopupFormData] = useState<Partial<Popup>>({
        title: '', image: '', content: '', link: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isVisible: true
    });

    // 서버 미반영 로컬 데이터 (예전 저장 방식에서 남은 것)
    const [unsynced, setUnsynced] = useState<{ localPosts: Post[]; localCompanies: Company[] }>({ localPosts: [], localCompanies: [] });
    useEffect(() => {
        if (actions.mode !== 'supabase') return;
        setUnsynced(findUnsyncedLocalData(posts, companies));
    }, [posts, companies, actions.mode]);

    const TABS = [
        { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
        { id: 'companies', label: '자회사/기업 관리', icon: Building },
        { id: 'posts', label: '게시글(회사소식) 관리', icon: Bell },
        { id: 'popups', label: '팝업 관리', icon: Layers },
        { id: 'inquiries', label: '지원하기 관리', icon: Inbox },
    ];

    const POST_CATEGORIES = [
        { id: 'all', label: '전체' },
        { id: 'notice', label: '공지사항' },
        { id: 'press', label: '언론보도' },
        { id: 'resources', label: '자료실' },
        { id: 'faq', label: 'Q&A' },
    ];

    /** 서버 작업 공통 래퍼 — 실패 시 알림 */
    const run = async (label: string, fn: () => Promise<void>): Promise<boolean> => {
        setBusy(true);
        try {
            await fn();
            return true;
        } catch (err) {
            console.error(err);
            alert(`${label}에 실패했습니다.\n${err instanceof Error ? err.message : String(err)}`);
            return false;
        } finally {
            setBusy(false);
        }
    };

    // --- Handlers ---
    const deleteCompany = (id: string) => {
        if (!confirm('이 기업을 삭제하시겠습니까?')) return;
        run('기업 삭제', () => actions.deleteCompany(id));
    };
    const deletePost = (id: number) => {
        if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
        run('게시글 삭제', () => actions.deletePost(id));
    };
    const deleteInquiry = (id: number) => {
        if (!confirm('이 문의를 삭제하시겠습니까?')) return;
        run('문의 삭제', async () => {
            await actions.deleteInquiry(id);
            if (viewingInquiry?.id === id) setViewingInquiry(null);
        });
    };
    const deletePopup = (id: number) => {
        if (!confirm('이 팝업을 삭제하시겠습니까?')) return;
        run('팝업 삭제', () => actions.deletePopup(id));
    };

    const toggleInquiryStatus = (id: number) => {
        const target = inquiries.find(i => i.id === id);
        if (!target) return;
        const next: Inquiry['status'] = target.status === '대기' ? '완료' : '대기';
        run('문의 상태 변경', async () => {
            await actions.updateInquiryStatus(id, next);
            if (viewingInquiry && viewingInquiry.id === id) setViewingInquiry({ ...viewingInquiry, status: next });
        });
    };

    const togglePopupVisibility = (id: number) => {
        const target = popups.find(p => p.id === id);
        if (!target) return;
        run('팝업 상태 변경', () => actions.savePopup({ isVisible: !target.isVisible }, id));
    };

    // Company Handlers
    const openCompanyModal = (company?: Company) => {
        if (company) {
            setEditingId(company.id);
            setCompanyFormData(company);
        } else {
            setEditingId(null);
            setCompanyFormData({
                name: '', ceo: '', category: 'portfolio', business: '',
                foundedDate: new Date().toISOString().split('T')[0],
                room: '', moveInDate: '', homepage: '', note: '', isTips: false,
                logo: '', bgImage: '', shortDesc: ''
            });
        }
        setIsCompanyModalOpen(true);
    };

    const makeCompanyId = (name: string) => {
        const base = name.replace(/\s/g, '-').replace(/[()*㈜]/g, '').replace(/[^\w가-힣-]/g, '');
        const taken = new Set(companies.map(c => c.id));
        let id = base || `company-${Date.now()}`;
        let n = 2;
        while (taken.has(id)) id = `${base}-${n++}`;
        return id;
    };

    const handleSaveCompany = async () => {
        if (!companyFormData.name?.trim()) return alert('기업명을 입력해주세요');
        const ok = await run('기업 저장', async () => {
            if (editingId) {
                await actions.saveCompany(companyFormData, String(editingId));
            } else {
                await actions.saveCompany({
                    ...companyFormData,
                    id: makeCompanyId(companyFormData.name!.trim()),
                    name: companyFormData.name!.trim(),
                });
            }
        });
        if (ok) setIsCompanyModalOpen(false);
    };

    // Post Handlers
    const openPostEditor = (post?: Post) => {
        if (post) {
            setEditingId(post.id);
            // 기존 fileName을 files 배열로 변환 (호환성)
            const files = post.files && post.files.length > 0
                ? post.files
                : (post.fileName ? [{ name: post.fileName, type: post.fileType, url: post.fileUrl }] : []);
            setPostFormData({ ...post, files });
        } else {
            setEditingId(null);
            setPostFormData({ title: '', author: '관리자', content: '', category: 'notice', files: [] });
        }
        setPostEditorMode('edit');
    };

    const closePostEditor = () => {
        setPostEditorMode('list');
        setEditingId(null);
        setPostFormData({ title: '', author: '관리자', content: '', category: 'notice', files: [] });
    };

    const handleSavePost = async () => {
        if (!postFormData.title?.trim()) return alert('제목을 입력해주세요');
        if (uploading) return alert('첨부파일 업로드가 끝난 뒤 저장해주세요.');

        const files = postFormData.files || [];
        const first = files[0];
        // files 배열을 기반으로 저장 (기존 fileName/fileUrl은 호환성을 위해 첫 번째 파일로 설정)
        const saveData: Partial<Post> = {
            ...postFormData,
            title: postFormData.title.trim(),
            files,
            fileName: first?.name,
            fileType: first?.type,
            fileUrl: first?.url,
        };

        const ok = await run('게시글 저장', async () => {
            if (editingId) {
                await actions.savePost(saveData, Number(editingId));
            } else {
                await actions.savePost({
                    ...saveData,
                    date: todayDisplay(),
                    isNew: true,
                    views: 0,
                });
            }
        });
        if (ok) closePostEditor();
    };

    // Popup Handlers
    const openPopupModal = (popup?: Popup) => {
        if (popup) {
            setEditingId(popup.id);
            setPopupFormData(popup);
        } else {
            setEditingId(null);
            setPopupFormData({
                title: '', image: '', content: '', link: '',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                isVisible: true
            });
        }
        setIsPopupModalOpen(true);
    };

    const handleSavePopup = async () => {
        if (!popupFormData.title?.trim()) return alert('제목을 입력해주세요');
        if (popupFormData.startDate && popupFormData.endDate && popupFormData.startDate > popupFormData.endDate) {
            return alert('종료일은 시작일보다 빠를 수 없습니다.');
        }
        const ok = await run('팝업 저장', async () => {
            if (editingId) await actions.savePopup(popupFormData, Number(editingId));
            else await actions.savePopup(popupFormData);
        });
        if (ok) setIsPopupModalOpen(false);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'post' | 'company_logo' | 'company_bg' | 'popup_img') => {
        const fileList = e.target.files ? Array.from(e.target.files) : [];
        // 파일 입력 초기화 (같은 파일 다시 선택 가능하도록)
        e.target.value = '';
        if (fileList.length === 0) return;

        setUploading(true);
        try {
            if (type === 'post') {
                const uploaded: PostFile[] = [];
                for (const file of fileList) {
                    uploaded.push(await actions.uploadFile(file, 'posts'));
                }
                setPostFormData(prev => ({ ...prev, files: [...(prev.files || []), ...uploaded] }));
            } else if (type === 'company_logo') {
                const { url } = await actions.uploadFile(fileList[0], 'companies/logo');
                setCompanyFormData(prev => ({ ...prev, logo: url }));
            } else if (type === 'company_bg') {
                const { url } = await actions.uploadFile(fileList[0], 'companies/bg');
                setCompanyFormData(prev => ({ ...prev, bgImage: url }));
            } else if (type === 'popup_img') {
                const { url } = await actions.uploadFile(fileList[0], 'popups');
                setPopupFormData(prev => ({ ...prev, image: url }));
            }
        } catch (err) {
            console.error(err);
            alert(`파일 업로드에 실패했습니다.\n${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setUploading(false);
        }
    };

    const removeFile = (index: number) => {
        const currentFiles = postFormData.files || [];
        setPostFormData({ ...postFormData, files: currentFiles.filter((_, i) => i !== index) });
    };

    const getFilteredPosts = () => {
        if (postCategoryFilter === 'all') return posts;
        return posts.filter(p => p.category === postCategoryFilter);
    };

    const handleImportLocal = async () => {
        const { localPosts, localCompanies } = unsynced;
        if (localPosts.length === 0 && localCompanies.length === 0) return;
        if (!confirm(`이 브라우저에만 저장되어 있던 게시글 ${localPosts.length}건, 기업 ${localCompanies.length}건을 서버로 옮길까요?`)) return;
        const ok = await run('로컬 데이터 가져오기', async () => {
            if (localPosts.length > 0) await actions.importPosts(localPosts);
            if (localCompanies.length > 0) await actions.importCompanies(localCompanies);
        });
        if (ok) alert('서버로 옮겼습니다. 이제 모든 방문자에게 표시됩니다.');
    };

    const handleLogout = async () => {
        sessionStorage.removeItem(ADMIN_AUTH_KEY);
        if (isSupabaseConfigured && supabase) {
            await supabase.auth.signOut().catch(() => undefined);
        }
        setIsAuthenticated(false);
        onLogout();
    };

    if (!isAuthenticated) {
        return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
    }

    const inputClass = "w-full px-4 py-3 border border-line-md rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all bg-white shadow-sm text-ink placeholder-ink-faint";
    const labelClass = "block text-sm font-bold text-ink mb-1.5";

    return (
        <div className="min-h-screen bg-surface-alt flex">
            {/* Sidebar */}
            <div className="w-64 bg-navy text-white flex flex-col fixed h-full shadow-xl z-20">
                <div className="p-6 border-b border-navy-hover">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5" /> 관리자 페이지
                    </h2>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors mb-4 border border-white/10"
                    >
                        <Home className="w-5 h-5" />
                        홈으로 이동
                    </button>

                    <div className="h-px bg-white/10 my-2 mx-2"></div>

                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-white/10 font-bold text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-navy-hover">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy-hover hover:bg-navy-deep rounded-lg text-sm font-bold transition-colors">
                        <LogOut className="w-4 h-4" /> 로그아웃
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-64 p-8">
                <div className="flex items-center justify-between mb-8 border-b border-line pb-4">
                    <h1 className="text-2xl font-bold text-ink">
                        {TABS.find(t => t.id === activeTab)?.label}
                    </h1>
                    <div className="flex items-center gap-3 text-xs text-ink-soft">
                        {busy && <span className="font-bold text-navy">저장 중...</span>}
                        <button
                            onClick={() => run('새로고침', actions.refresh)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-line bg-white hover:bg-surface-alt transition-colors"
                            title="서버에서 다시 불러오기"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${busy ? 'animate-spin' : ''}`} /> 새로고침
                        </button>
                    </div>
                </div>

                {actions.mode === 'local' && (
                    <div className="mb-6 flex items-start gap-3 bg-gold/10 border border-gold/40 text-ink rounded-xl p-4 text-sm">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                            <div className="font-bold">서버(Supabase)가 연결되지 않았습니다.</div>
                            <div className="mt-1">지금 저장하는 내용은 이 브라우저에만 남고 다른 방문자에게는 표시되지 않습니다. 환경변수 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY를 설정해주세요.</div>
                        </div>
                    </div>
                )}

                {activeTab === 'dashboard' && (unsynced.localPosts.length > 0 || unsynced.localCompanies.length > 0) && (
                    <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 bg-surface-alt border border-line-accent text-ink rounded-xl p-5">
                        <UploadCloud className="w-6 h-6 shrink-0" />
                        <div className="flex-grow text-sm">
                            <div className="font-bold">서버에 반영되지 않은 데이터가 이 브라우저에 남아 있습니다.</div>
                            <div className="mt-1">
                                게시글 {unsynced.localPosts.length}건, 기업 {unsynced.localCompanies.length}건 — 예전 방식(브라우저 저장)으로 작성되어 다른 방문자에게 보이지 않던 항목입니다.
                            </div>
                            {unsynced.localPosts.length > 0 && (
                                <ul className="mt-2 list-disc list-inside text-xs text-ink-soft space-y-0.5">
                                    {unsynced.localPosts.slice(0, 5).map(p => <li key={p.id}>[{POST_CATEGORIES.find(c => c.id === p.category)?.label}] {p.title}</li>)}
                                    {unsynced.localPosts.length > 5 && <li>외 {unsynced.localPosts.length - 5}건</li>}
                                </ul>
                            )}
                        </div>
                        <Button size="sm" onClick={handleImportLocal} disabled={busy}>서버로 옮기기</Button>
                    </div>
                )}

                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-line">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-ink-soft">등록된 기업</h3>
                                <Building className="w-6 h-6 text-navy" />
                            </div>
                            <div className="text-3xl font-bold text-ink">{companies.length}개</div>
                            <div className="text-xs text-ink-faint mt-2">자회사 및 투자기업 포함</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-line">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-ink-soft">총 게시글</h3>
                                <Bell className="w-6 h-6 text-navy" />
                            </div>
                            <div className="text-3xl font-bold text-ink">{posts.length}개</div>
                            <div className="text-xs text-ink-faint mt-2">공지, 보도, 자료, Q&A 포함</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-line">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-ink-soft">진행중인 팝업</h3>
                                <Layers className="w-6 h-6 text-navy" />
                            </div>
                            <div className="text-3xl font-bold text-ink">{popups.filter(p => p.isVisible).length}건</div>
                            <div className="text-xs text-ink-faint mt-2">홈페이지 노출 중</div>
                        </div>
                    </div>
                )}

                {activeTab === 'companies' && (
                    <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
                        <div className="p-4 border-b border-line flex justify-between items-center bg-surface-alt">
                            <h3 className="font-bold text-ink">기업 목록</h3>
                            <Button size="sm" onClick={() => openCompanyModal()}><Plus className="w-4 h-4 mr-1" /> 기업 추가</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-surface-alt text-ink-soft font-bold border-b border-line">
                                    <tr>
                                        <th className="px-6 py-4">기업명</th>
                                        <th className="px-6 py-4">대표자</th>
                                        <th className="px-6 py-4">구분</th>
                                        <th className="px-6 py-4">설립일</th>
                                        <th className="px-6 py-4 text-center">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-line">
                                    {companies.length === 0 && (
                                        <tr><td colSpan={5} className="px-6 py-12 text-center text-ink-faint">등록된 기업이 없습니다.</td></tr>
                                    )}
                                    {companies.map((company) => (
                                        <tr key={company.id} className="hover:bg-surface-alt">
                                            <td className="px-6 py-4 font-bold text-ink">{company.name}{company.isTips && <span className="ml-2 text-label px-1.5 py-0.5 rounded bg-gold/15 text-ink align-middle">TIPS</span>}</td>
                                            <td className="px-6 py-4 text-ink-soft">{company.ceo}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${company.category === 'subsidiary' ? 'bg-surface-alt2 text-navy' : 'bg-surface-alt text-ink-soft'}`}>
                                                    {company.category === 'subsidiary' ? '자회사' : '투자기업'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-ink-soft">{company.foundedDate}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openCompanyModal(company)} className="text-ink-faint hover:text-navy transition-colors p-2">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => deleteCompany(company.id)} className="text-ink-faint hover:text-red-600 transition-colors p-2">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'posts' && postEditorMode !== 'edit' && (
                    <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
                        <div className="p-4 border-b border-line flex flex-col md:flex-row justify-between items-center bg-surface-alt gap-4">
                            <h3 className="font-bold text-ink flex items-center">게시글 목록 <span className="ml-2 text-xs font-normal text-ink-soft">({getFilteredPosts().length})</span></h3>
                            <div className="flex items-center gap-3">
                                <div className="flex bg-white rounded-lg border border-line p-1">
                                    {POST_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setPostCategoryFilter(cat.id)}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${postCategoryFilter === cat.id ? 'bg-navy text-white shadow-sm' : 'text-ink-soft hover:text-navy hover:bg-surface-alt'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                                <Button size="sm" onClick={() => openPostEditor()}><Plus className="w-4 h-4 mr-1" /> 글쓰기</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-surface-alt text-ink-soft font-bold border-b border-line">
                                    <tr>
                                        <th className="px-6 py-4 w-20">구분</th>
                                        <th className="px-6 py-4">제목</th>
                                        <th className="px-6 py-4">작성자</th>
                                        <th className="px-6 py-4">작성일</th>
                                        <th className="px-6 py-4 text-center">첨부</th>
                                        <th className="px-6 py-4 text-center">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-line">
                                    {getFilteredPosts().map((post) => (
                                        <tr key={post.id} className="hover:bg-surface-alt">
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded text-xs font-bold bg-surface-alt text-ink-soft border border-line">
                                                    {POST_CATEGORIES.find(c => c.id === post.category)?.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-ink max-w-xs truncate">{post.title}</td>
                                            <td className="px-6 py-4 text-ink-soft">{post.author}</td>
                                            <td className="px-6 py-4 text-ink-soft">{post.date}</td>
                                            <td className="px-6 py-4 text-center">
                                                {(post.fileName || post.fileType || (post.files && post.files.length > 0)) && (
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Paperclip className="w-4 h-4 text-ink-faint" />
                                                        {post.files && post.files.length > 1 && (
                                                            <span className="text-xs text-ink-soft font-bold">
                                                                {post.files.length}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openPostEditor(post)} className="text-ink-faint hover:text-navy transition-colors p-2">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => deletePost(post.id)} className="text-ink-faint hover:text-red-600 transition-colors p-2">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Post Editor Full Page */}
                {activeTab === 'posts' && postEditorMode === 'edit' && (
                    <div className="bg-white rounded-xl shadow-sm border border-line min-h-[calc(100vh-200px)] flex flex-col">
                        {/* Editor Header */}
                        <div className="p-6 border-b border-line bg-surface-alt flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={closePostEditor}
                                    className="text-ink-soft hover:text-ink transition-colors p-2 hover:bg-white rounded-lg flex items-center gap-2"
                                    title="목록으로 돌아가기"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="text-sm font-bold">목록으로</span>
                                </button>
                                <h3 className="font-bold text-xl text-ink">
                                    {editingId ? '게시글 수정' : '게시글 작성'}
                                </h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" onClick={closePostEditor} className="text-ink-soft hover:text-ink">
                                    취소
                                </Button>
                                <Button onClick={handleSavePost} disabled={busy || uploading} className="bg-navy hover:bg-navy-hover">
                                    {busy ? '저장 중...' : editingId ? '수정완료' : '작성완료'}
                                </Button>
                            </div>
                        </div>

                        {/* Editor Content */}
                        <div className="flex-grow p-8 overflow-y-auto">
                            <div className="max-w-4xl mx-auto space-y-6">
                                {/* Category Selection */}
                                <div>
                                    <label className={labelClass}>카테고리 *</label>
                                    <select 
                                        className={inputClass} 
                                        value={postFormData.category} 
                                        onChange={e => setPostFormData({ ...postFormData, category: e.target.value as 'notice' | 'press' | 'resources' | 'faq' })}
                                    >
                                        {POST_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className={labelClass}>제목 *</label>
                                    <input 
                                        type="text" 
                                        className={`${inputClass} text-2xl font-bold`} 
                                        value={postFormData.title} 
                                        onChange={e => setPostFormData({ ...postFormData, title: e.target.value })} 
                                        placeholder="제목을 입력하세요" 
                                    />
                                </div>

                                {/* Author */}
                                <div>
                                    <label className={labelClass}>작성자</label>
                                    <input 
                                        type="text" 
                                        className={inputClass} 
                                        value={postFormData.author} 
                                        onChange={e => setPostFormData({ ...postFormData, author: e.target.value })} 
                                        placeholder="작성자명"
                                    />
                                </div>

                                {/* Content Editor */}
                                <div>
                                    <label className={labelClass}>내용 *</label>
                                    <Suspense fallback={
                                        <div className="border border-line-md rounded-xl p-8 text-center text-ink-soft min-h-[400px] flex items-center justify-center bg-surface-alt">
                                            <div>
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy mx-auto mb-2"></div>
                                                <p>에디터를 로드하는 중...</p>
                                            </div>
                                        </div>
                                    }>
                                        <ErrorBoundary fallback={
                                            <div className="border border-red-300 rounded-xl p-8 text-center text-red-500 min-h-[400px] flex items-center justify-center bg-red-50">
                                                <div>
                                                    <p className="font-bold mb-2">에디터 로드 오류</p>
                                                    <p className="text-sm">페이지를 새로고침해주세요.</p>
                                                </div>
                                            </div>
                                        }>
                                            <RichTextEditor
                                                content={postFormData.content || ''}
                                                onChange={(content) => setPostFormData({ ...postFormData, content })}
                                                placeholder="내용을 입력하세요. 서식, 이미지, 링크 등을 사용할 수 있습니다."
                                            />
                                        </ErrorBoundary>
                                    </Suspense>
                                </div>

                                {/* File Attachment */}
                                <div className="border-t border-line pt-6">
                                    <label className={labelClass}>첨부파일</label>
                                    <div className="space-y-4">
                                        <label className="cursor-pointer inline-flex items-center gap-2 bg-surface-alt text-ink-soft px-4 py-3 rounded-lg border border-line hover:bg-surface-alt2 transition-colors text-sm font-bold">
                                            <Paperclip className="w-4 h-4" />
                                            파일 선택 (여러 개 선택 가능)
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                onChange={(e) => handleFileChange(e, 'post')} 
                                                multiple
                                            />
                                        </label>
                                        
                                        {/* 파일 목록 */}
                                        {postFormData.files && postFormData.files.length > 0 && (
                                            <div className="bg-surface-alt rounded-lg border border-line p-4 space-y-2">
                                                <div className="text-xs font-bold text-ink-soft mb-2">
                                                    첨부된 파일 ({postFormData.files.length}개)
                                                </div>
                                                {postFormData.files.map((file, index) => (
                                                    <div 
                                                        key={index}
                                                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-line hover:border-line-md transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3 flex-grow min-w-0">
                                                            <Paperclip className="w-4 h-4 text-ink-faint shrink-0" />
                                                            <div className="flex-grow min-w-0">
                                                                <div className="text-sm font-medium text-ink truncate">
                                                                    {file.name}
                                                                </div>
                                                                {file.size && (
                                                                    <div className="text-xs text-ink-faint mt-0.5">
                                                                        {(file.size / 1024).toFixed(1)} KB
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {file.type && (
                                                                <span className="px-2 py-0.5 bg-surface-alt2 text-navy text-xs font-bold rounded border border-line shrink-0">
                                                                    {file.type}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="ml-3 text-ink-faint hover:text-red-600 transition-colors p-1 shrink-0"
                                                            title="파일 제거"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {uploading && (
                                            <div className="text-sm text-navy font-bold flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy"></div>
                                                파일 업로드 중...
                                            </div>
                                        )}
                                        {!uploading && (!postFormData.files || postFormData.files.length === 0) && (
                                            <div className="text-sm text-ink-faint italic">
                                                첨부된 파일이 없습니다.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'popups' && (
                    <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
                        <div className="p-4 border-b border-line flex justify-between items-center bg-surface-alt">
                            <h3 className="font-bold text-ink">팝업 관리</h3>
                            <Button size="sm" onClick={() => openPopupModal()}><Plus className="w-4 h-4 mr-1" /> 팝업 추가</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {popups.map((popup) => (
                                <div key={popup.id} className={`border rounded-xl overflow-hidden relative group ${popup.isVisible ? 'border-line-accent shadow-sm' : 'border-line opacity-70'}`}>
                                    <div className="h-32 bg-surface-alt flex items-center justify-center overflow-hidden">
                                        {popup.image ? (
                                            <img src={popup.image} alt={popup.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-ink-faint" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-ink truncate pr-2">{popup.title}</h4>
                                            <button onClick={() => togglePopupVisibility(popup.id)} className={`shrink-0 w-8 h-5 rounded-full relative transition-colors ${popup.isVisible ? 'bg-navy' : 'bg-ink-faint'}`}>
                                                <span className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${popup.isVisible ? 'left-4' : 'left-1'}`}></span>
                                            </button>
                                        </div>
                                        <div className="text-xs text-ink-soft space-y-1">
                                            <div>{popup.startDate} ~ {popup.endDate}</div>
                                            <div className="truncate">{popup.link || '링크 없음'}</div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-line">
                                            <button onClick={() => openPopupModal(popup)} className="text-ink-faint hover:text-navy text-xs font-bold flex items-center">
                                                <Edit className="w-3 h-3 mr-1" /> 수정
                                            </button>
                                            <button onClick={() => deletePopup(popup.id)} className="text-ink-faint hover:text-red-600 text-xs font-bold flex items-center ml-2">
                                                <Trash2 className="w-3 h-3 mr-1" /> 삭제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'inquiries' && (
                    <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
                        <div className="p-4 border-b border-line bg-surface-alt">
                            <h3 className="font-bold text-ink">문의 내역</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-surface-alt text-ink-soft font-bold border-b border-line">
                                    <tr>
                                        <th className="px-6 py-4 w-20">상태</th>
                                        <th className="px-6 py-4">문의유형</th>
                                        <th className="px-6 py-4">이름 (연락처)</th>
                                        <th className="px-6 py-4">기업명</th>
                                        <th className="px-6 py-4">내용</th>
                                        <th className="px-6 py-4">작성일</th>
                                        <th className="px-6 py-4 text-center">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-line">
                                    {inquiries.length === 0 && (
                                        <tr><td colSpan={7} className="px-6 py-12 text-center text-ink-faint">접수된 문의가 없습니다.</td></tr>
                                    )}
                                    {inquiries.map((inquiry) => (
                                        <tr key={inquiry.id} className="hover:bg-surface-alt">
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleInquiryStatus(inquiry.id)}
                                                    className={`px-2 py-1 rounded text-xs font-bold border ${inquiry.status === '대기' ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'} transition-colors`}
                                                >
                                                    {inquiry.status}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-ink-soft">{inquiry.inquiryType || '-'}</td>
                                            <td className="px-6 py-4 text-ink">
                                                <div className="font-bold">{inquiry.name}</div>
                                                <div className="text-xs text-ink-faint">{inquiry.contact}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-ink-soft">{inquiry.companyName || '-'}</td>
                                            <td className="px-6 py-4 text-ink-soft max-w-xs truncate">{inquiry.content}</td>
                                            <td className="px-6 py-4 text-ink-soft">{inquiry.date}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => setViewingInquiry(inquiry)} className="text-ink-faint hover:text-navy transition-colors p-2" title="자세히 보기">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => deleteInquiry(inquiry.id)} className="text-ink-faint hover:text-red-600 transition-colors p-2" title="삭제">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Inquiry Detail Modal */}
            {viewingInquiry && (
                <Modal isOpen={true} onClose={() => setViewingInquiry(null)} title="문의 내용 상세">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-line">
                            <div>
                                <div className="text-sm text-ink-soft mb-1">보낸 사람</div>
                                <div className="font-bold text-lg text-ink">{viewingInquiry.name}</div>
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={() => toggleInquiryStatus(viewingInquiry.id)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${viewingInquiry.status === '대기' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}
                                >
                                    {viewingInquiry.status}
                                </button>
                                <div className="text-xs text-ink-faint mt-2">{viewingInquiry.date}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surface-alt p-4 rounded-lg">
                                <div className="text-xs font-bold text-ink-soft mb-1">문의유형</div>
                                <div className="text-ink">{viewingInquiry.inquiryType || '-'}</div>
                            </div>
                            <div className="bg-surface-alt p-4 rounded-lg">
                                <div className="text-xs font-bold text-ink-soft mb-1">기업명</div>
                                <div className="text-ink">{viewingInquiry.companyName || '-'}</div>
                            </div>
                            <div className="bg-surface-alt p-4 rounded-lg">
                                <div className="text-xs font-bold text-ink-soft mb-1 flex items-center"><Phone className="w-3 h-3 mr-1" /> 연락처</div>
                                <div className="text-ink">{viewingInquiry.contact}</div>
                            </div>
                            <div className="bg-surface-alt p-4 rounded-lg">
                                <div className="text-xs font-bold text-ink-soft mb-1 flex items-center"><Mail className="w-3 h-3 mr-1" /> 이메일</div>
                                <div className="text-ink truncate" title={viewingInquiry.email}>{viewingInquiry.email}</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-bold text-ink mb-2">문의 내용</div>
                            <div className="bg-white border border-line p-4 rounded-lg text-ink-soft leading-relaxed whitespace-pre-wrap min-h-[150px]">
                                {viewingInquiry.content}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-line">
                            <Button variant="ghost" onClick={() => deleteInquiry(viewingInquiry.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">삭제하기</Button>
                            <Button onClick={() => setViewingInquiry(null)}>닫기</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Add/Edit Company Modal */}
            <Modal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)} title={editingId ? "기업 정보 수정" : "기업 추가"}>
                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>기업명 *</label>
                            <input type="text" className={inputClass} value={companyFormData.name} onChange={e => setCompanyFormData({ ...companyFormData, name: e.target.value })} placeholder="예: (주)한국기술" />
                        </div>
                        <div>
                            <label className={labelClass}>대표자 *</label>
                            <input type="text" className={inputClass} value={companyFormData.ceo} onChange={e => setCompanyFormData({ ...companyFormData, ceo: e.target.value })} placeholder="성명" />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>한줄 소개</label>
                        <input type="text" className={inputClass} value={companyFormData.shortDesc || ''} onChange={e => setCompanyFormData({ ...companyFormData, shortDesc: e.target.value })} placeholder="기업을 소개하는 짧은 문구" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>로고 이미지</label>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="cursor-pointer bg-surface-alt px-3 py-2 rounded border border-line text-xs font-bold text-ink-soft hover:bg-surface-alt2">
                                    파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'company_logo')} accept="image/*" />
                                </label>
                                <input type="text" className={`${inputClass} text-xs py-2`} value={companyFormData.logo || ''} onChange={e => setCompanyFormData({ ...companyFormData, logo: e.target.value })} placeholder="URL 직접 입력" />
                            </div>
                            <p className="text-xs text-ink-soft flex items-center">
                                <HelpCircle className="w-3 h-3 mr-1" /> 권장: 500x500px (1:1 비율), PNG/JPG/SVG. 파일 선택 시 서버에 업로드됩니다.
                            </p>
                        </div>
                        <div>
                            <label className={labelClass}>배경 이미지</label>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="cursor-pointer bg-surface-alt px-3 py-2 rounded border border-line text-xs font-bold text-ink-soft hover:bg-surface-alt2">
                                    파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'company_bg')} accept="image/*" />
                                </label>
                                <input type="text" className={`${inputClass} text-xs py-2`} value={companyFormData.bgImage || ''} onChange={e => setCompanyFormData({ ...companyFormData, bgImage: e.target.value })} placeholder="URL 직접 입력" />
                            </div>
                            <p className="text-xs text-ink-soft flex items-center">
                                <HelpCircle className="w-3 h-3 mr-1" /> 권장: 1920x1080px (16:9 비율), 고해상도
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>구분 *</label>
                            <select className={inputClass} value={companyFormData.category} onChange={e => setCompanyFormData({ ...companyFormData, category: e.target.value as 'subsidiary' | 'portfolio' })}>
                                <option value="portfolio">투자기업</option>
                                <option value="subsidiary">자회사</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>설립일</label>
                            <input type="date" className={inputClass} value={companyFormData.foundedDate} onChange={e => setCompanyFormData({ ...companyFormData, foundedDate: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>주요사업 *</label>
                        <input type="text" className={inputClass} value={companyFormData.business} onChange={e => setCompanyFormData({ ...companyFormData, business: e.target.value })} placeholder="예: AI 기반 솔루션 개발" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>입주호실</label>
                            <input type="text" className={inputClass} value={companyFormData.room} onChange={e => setCompanyFormData({ ...companyFormData, room: e.target.value })} placeholder="예: P동 301호" />
                        </div>
                        <div>
                            <label className={labelClass}>입주일</label>
                            <input type="date" className={inputClass} value={companyFormData.moveInDate} onChange={e => setCompanyFormData({ ...companyFormData, moveInDate: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>홈페이지</label>
                        <input type="text" className={inputClass} value={companyFormData.homepage} onChange={e => setCompanyFormData({ ...companyFormData, homepage: e.target.value })} placeholder="https://" />
                    </div>
                    <div>
                        <label className={labelClass}>비고 / 상세소개</label>
                        <textarea rows={3} className={inputClass} value={companyFormData.note} onChange={e => setCompanyFormData({ ...companyFormData, note: e.target.value })} placeholder="기업에 대한 상세 설명을 입력하세요"></textarea>
                    </div>
                    <div className="flex items-center gap-2 bg-surface-alt2 p-3 rounded-lg border border-line">
                        <input type="checkbox" id="isTips" className="w-5 h-5 rounded border-line-md text-navy focus:ring-navy" checked={companyFormData.isTips} onChange={e => setCompanyFormData({ ...companyFormData, isTips: e.target.checked })} />
                        <label htmlFor="isTips" className="text-sm font-bold text-navy cursor-pointer">TIPS 선정 기업</label>
                    </div>
                    <Button className="w-full mt-4" onClick={handleSaveCompany} disabled={busy || uploading}>{busy ? '저장 중...' : editingId ? '수정하기' : '추가하기'}</Button>
                </div>
            </Modal>


            {/* Add/Edit Popup Modal */}
            <Modal isOpen={isPopupModalOpen} onClose={() => setIsPopupModalOpen(false)} title={editingId ? "팝업 수정" : "팝업 추가"}>
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>팝업 제목 *</label>
                        <input type="text" className={inputClass} value={popupFormData.title} onChange={e => setPopupFormData({ ...popupFormData, title: e.target.value })} placeholder="관리용 제목" />
                    </div>
                    <div>
                        <label className={labelClass}>이미지 URL</label>
                        <div className="flex items-center gap-2">
                            <label className="cursor-pointer bg-surface-alt px-3 py-2 rounded border border-line text-xs font-bold text-ink-soft hover:bg-surface-alt2 shrink-0">
                                파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'popup_img')} accept="image/*" />
                            </label>
                            <input type="text" className={inputClass} value={popupFormData.image || ''} onChange={e => setPopupFormData({ ...popupFormData, image: e.target.value })} placeholder="https://" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>시작일</label>
                            <input type="date" className={inputClass} value={popupFormData.startDate} onChange={e => setPopupFormData({ ...popupFormData, startDate: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>종료일</label>
                            <input type="date" className={inputClass} value={popupFormData.endDate} onChange={e => setPopupFormData({ ...popupFormData, endDate: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>링크 (선택)</label>
                        <input type="text" className={inputClass} value={popupFormData.link} onChange={e => setPopupFormData({ ...popupFormData, link: e.target.value })} placeholder="클릭 시 이동할 URL" />
                    </div>
                    <div>
                        <label className={labelClass}>내용 (선택)</label>
                        <textarea rows={3} className={inputClass} value={popupFormData.content} onChange={e => setPopupFormData({ ...popupFormData, content: e.target.value })} placeholder="이미지가 없을 경우 표시될 텍스트"></textarea>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-surface-alt rounded-lg">
                        <input type="checkbox" id="popupVisible" className="w-5 h-5" checked={popupFormData.isVisible} onChange={e => setPopupFormData({ ...popupFormData, isVisible: e.target.checked })} />
                        <label htmlFor="popupVisible" className="font-bold text-ink cursor-pointer">즉시 게시 (활성화)</label>
                    </div>
                    <Button className="w-full mt-4" onClick={handleSavePopup} disabled={busy || uploading}>{busy ? '저장 중...' : editingId ? '수정완료' : '추가하기'}</Button>
                </div>
            </Modal>
        </div>
    );
};

export default AdminPage;
