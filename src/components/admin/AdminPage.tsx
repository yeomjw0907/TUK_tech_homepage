import React, { useState } from 'react';
import {
    Building, Bell, Layers, Inbox, LayoutDashboard,
    Settings, Home, LogOut, Plus, Trash2, Edit, Eye,
    Paperclip, HelpCircle, XCircle, Image as ImageIcon,
    Phone, Mail
} from 'lucide-react';
import { Company, Post, Inquiry, Popup } from '../../types';
import { Button, Modal } from '../common';

interface AdminPageProps {
    companies: Company[];
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    inquiries: Inquiry[];
    setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
    popups: Popup[];
    setPopups: React.Dispatch<React.SetStateAction<Popup[]>>;
    onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({
    companies, setCompanies,
    posts, setPosts,
    inquiries, setInquiries,
    popups, setPopups,
    onLogout
}) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Modals state
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);

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
        title: '', author: '관리자', content: '', category: 'notice', fileName: ''
    });

    const [popupFormData, setPopupFormData] = useState<Partial<Popup>>({
        title: '', image: '', content: '', link: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isVisible: true
    });

    const TABS = [
        { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
        { id: 'companies', label: '자회사/기업 관리', icon: Building },
        { id: 'posts', label: '게시글(회사소식) 관리', icon: Bell },
        { id: 'popups', label: '팝업 관리', icon: Layers },
        { id: 'inquiries', label: '문의하기 관리', icon: Inbox },
    ];

    const POST_CATEGORIES = [
        { id: 'all', label: '전체' },
        { id: 'notice', label: '공지사항' },
        { id: 'press', label: '보도소식' },
        { id: 'resources', label: '자료실' },
        { id: 'faq', label: 'FAQ' },
    ];

    // --- Handlers ---
    const deleteCompany = (id: string) => setCompanies(companies.filter(c => c.id !== id));
    const deletePost = (id: number) => setPosts(posts.filter(n => n.id !== id));
    const deleteInquiry = (id: number) => {
        setInquiries(inquiries.filter(i => i.id !== id));
        if (viewingInquiry?.id === id) setViewingInquiry(null);
    };
    const deletePopup = (id: number) => setPopups(popups.filter(p => p.id !== id));

    const toggleInquiryStatus = (id: number) => {
        const updatedInquiries = inquiries.map(i => i.id === id ? { ...i, status: i.status === '대기' ? '완료' : '대기' } as Inquiry : i);
        setInquiries(updatedInquiries);
        if (viewingInquiry && viewingInquiry.id === id) {
            setViewingInquiry(updatedInquiries.find(i => i.id === id) || null);
        }
    };

    const togglePopupVisibility = (id: number) => {
        setPopups(popups.map(p => p.id === id ? { ...p, isVisible: !p.isVisible } : p));
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

    const handleSaveCompany = () => {
        if (!companyFormData.name) return alert("기업명을 입력해주세요");

        if (editingId) {
            setCompanies(companies.map(c => c.id === editingId ? { ...c, ...companyFormData } as Company : c));
        } else {
            const newId = Date.now().toString();
            const newCompany = { ...companyFormData, id: newId } as Company;
            setCompanies([newCompany, ...companies]);
        }
        setIsCompanyModalOpen(false);
    };

    // Post Handlers
    const openPostModal = (post?: Post) => {
        if (post) {
            setEditingId(post.id);
            setPostFormData(post);
        } else {
            setEditingId(null);
            setPostFormData({ title: '', author: '관리자', content: '', category: 'notice', fileName: '' });
        }
        setIsPostModalOpen(true);
    };

    const handleSavePost = () => {
        if (!postFormData.title) return alert("제목을 입력해주세요");

        if (editingId) {
            setPosts(posts.map(p => p.id === editingId ? { ...p, ...postFormData } as Post : p));
        } else {
            const newId = Date.now();
            const newPost = {
                ...postFormData,
                id: newId,
                date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
                isNew: true,
                views: 0
            } as Post;
            setPosts([newPost, ...posts]);
        }
        setIsPostModalOpen(false);
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
    }

    const handleSavePopup = () => {
        if (!popupFormData.title) return alert("제목을 입력해주세요");

        if (editingId) {
            setPopups(popups.map(p => p.id === editingId ? { ...p, ...popupFormData } as Popup : p));
        } else {
            const newId = Date.now();
            setPopups([...popups, { ...popupFormData, id: newId } as Popup]);
        }
        setIsPopupModalOpen(false);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'post' | 'company_logo' | 'company_bg' | 'popup_img') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (type === 'post') setPostFormData({ ...postFormData, fileName: file.name });
            if (type === 'company_logo') setCompanyFormData({ ...companyFormData, logo: URL.createObjectURL(file) });
            if (type === 'company_bg') setCompanyFormData({ ...companyFormData, bgImage: URL.createObjectURL(file) });
            if (type === 'popup_img') setPopupFormData({ ...popupFormData, image: URL.createObjectURL(file) });
        }
    };

    const getFilteredPosts = () => {
        if (postCategoryFilter === 'all') return posts;
        return posts.filter(p => p.category === postCategoryFilter);
    };

    const inputClass = "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-transparent outline-none transition-all bg-white shadow-sm text-slate-800 placeholder-slate-400";
    const labelClass = "block text-sm font-bold text-slate-800 mb-1.5";

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#003E7E] text-white flex flex-col fixed h-full shadow-xl z-20">
                <div className="p-6 border-b border-blue-900">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5" /> 관리자 페이지
                    </h2>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    <button
                        onClick={() => onLogout()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-white/10 hover:text-white transition-colors mb-4 border border-white/10"
                    >
                        <Home className="w-5 h-5" />
                        홈으로 이동
                    </button>

                    <div className="h-px bg-blue-800 my-2 mx-2"></div>

                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-white/10 font-bold text-white' : 'text-blue-200 hover:bg-white/5 hover:text-white'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-blue-900">
                    <button onClick={() => onLogout()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-900 hover:bg-blue-950 rounded-lg text-sm font-bold transition-colors">
                        <LogOut className="w-4 h-4" /> 로그아웃
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-64 p-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-8 border-b border-slate-200 pb-4">
                    {TABS.find(t => t.id === activeTab)?.label}
                </h1>

                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-500">등록된 기업</h3>
                                <Building className="w-6 h-6 text-[#003E7E]" />
                            </div>
                            <div className="text-3xl font-black text-slate-900">{companies.length}개</div>
                            <div className="text-xs text-slate-400 mt-2">자회사 및 투자기업 포함</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-500">총 게시글</h3>
                                <Bell className="w-6 h-6 text-[#003E7E]" />
                            </div>
                            <div className="text-3xl font-black text-slate-900">{posts.length}개</div>
                            <div className="text-xs text-slate-400 mt-2">공지, 보도, 자료, FAQ 포함</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-500">진행중인 팝업</h3>
                                <Layers className="w-6 h-6 text-[#003E7E]" />
                            </div>
                            <div className="text-3xl font-black text-slate-900">{popups.filter(p => p.isVisible).length}건</div>
                            <div className="text-xs text-slate-400 mt-2">홈페이지 노출 중</div>
                        </div>
                    </div>
                )}

                {activeTab === 'companies' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-700">기업 목록</h3>
                            <Button size="sm" onClick={() => openCompanyModal()}><Plus className="w-4 h-4 mr-1" /> 기업 추가</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">기업명</th>
                                        <th className="px-6 py-4">대표자</th>
                                        <th className="px-6 py-4">구분</th>
                                        <th className="px-6 py-4">설립일</th>
                                        <th className="px-6 py-4 text-center">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {companies.map((company) => (
                                        <tr key={company.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 font-bold text-slate-800">{company.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{company.ceo}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${company.category === 'subsidiary' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {company.category === 'subsidiary' ? '자회사' : '투자기업'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{company.foundedDate}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openCompanyModal(company)} className="text-slate-400 hover:text-[#003E7E] transition-colors p-2">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => deleteCompany(company.id)} className="text-slate-400 hover:text-red-600 transition-colors p-2">
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

                {activeTab === 'posts' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
                            <h3 className="font-bold text-slate-700 flex items-center">게시글 목록 <span className="ml-2 text-xs font-normal text-slate-500">({getFilteredPosts().length})</span></h3>
                            <div className="flex items-center gap-3">
                                <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                                    {POST_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setPostCategoryFilter(cat.id)}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${postCategoryFilter === cat.id ? 'bg-[#003E7E] text-white shadow-sm' : 'text-slate-500 hover:text-[#003E7E] hover:bg-slate-50'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                                <Button size="sm" onClick={() => openPostModal()}><Plus className="w-4 h-4 mr-1" /> 글쓰기</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 w-20">구분</th>
                                        <th className="px-6 py-4">제목</th>
                                        <th className="px-6 py-4">작성자</th>
                                        <th className="px-6 py-4">작성일</th>
                                        <th className="px-6 py-4 text-center">첨부</th>
                                        <th className="px-6 py-4 text-center">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {getFilteredPosts().map((post) => (
                                        <tr key={post.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                    {POST_CATEGORIES.find(c => c.id === post.category)?.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-800 max-w-xs truncate">{post.title}</td>
                                            <td className="px-6 py-4 text-slate-600">{post.author}</td>
                                            <td className="px-6 py-4 text-slate-500">{post.date}</td>
                                            <td className="px-6 py-4 text-center">
                                                {(post.fileName || post.fileType) && <Paperclip className="w-4 h-4 text-slate-400 mx-auto" />}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openPostModal(post)} className="text-slate-400 hover:text-[#003E7E] transition-colors p-2">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => deletePost(post.id)} className="text-slate-400 hover:text-red-600 transition-colors p-2">
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

                {activeTab === 'popups' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-700">팝업 관리</h3>
                            <Button size="sm" onClick={() => openPopupModal()}><Plus className="w-4 h-4 mr-1" /> 팝업 추가</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {popups.map((popup) => (
                                <div key={popup.id} className={`border rounded-xl overflow-hidden relative group ${popup.isVisible ? 'border-blue-200 shadow-sm' : 'border-slate-200 opacity-70'}`}>
                                    <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden">
                                        {popup.image ? (
                                            <img src={popup.image} alt={popup.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-slate-900 truncate pr-2">{popup.title}</h4>
                                            <button onClick={() => togglePopupVisibility(popup.id)} className={`shrink-0 w-8 h-5 rounded-full relative transition-colors ${popup.isVisible ? 'bg-[#003E7E]' : 'bg-slate-300'}`}>
                                                <span className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${popup.isVisible ? 'left-4' : 'left-1'}`}></span>
                                            </button>
                                        </div>
                                        <div className="text-xs text-slate-500 space-y-1">
                                            <div>{popup.startDate} ~ {popup.endDate}</div>
                                            <div className="truncate">{popup.link || '링크 없음'}</div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                                            <button onClick={() => openPopupModal(popup)} className="text-slate-400 hover:text-[#003E7E] text-xs font-bold flex items-center">
                                                <Edit className="w-3 h-3 mr-1" /> 수정
                                            </button>
                                            <button onClick={() => deletePopup(popup.id)} className="text-slate-400 hover:text-red-600 text-xs font-bold flex items-center ml-2">
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
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="font-bold text-slate-700">문의 내역</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 w-20">상태</th>
                                        <th className="px-6 py-4">이름 (연락처)</th>
                                        <th className="px-6 py-4">내용</th>
                                        <th className="px-6 py-4">작성일</th>
                                        <th className="px-6 py-4 text-center">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {inquiries.map((inquiry) => (
                                        <tr key={inquiry.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleInquiryStatus(inquiry.id)}
                                                    className={`px-2 py-1 rounded text-xs font-bold border ${inquiry.status === '대기' ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'} transition-colors`}
                                                >
                                                    {inquiry.status}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-slate-800">
                                                <div className="font-bold">{inquiry.name}</div>
                                                <div className="text-xs text-slate-400">{inquiry.contact}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{inquiry.content}</td>
                                            <td className="px-6 py-4 text-slate-500">{inquiry.date}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => setViewingInquiry(inquiry)} className="text-slate-400 hover:text-[#003E7E] transition-colors p-2" title="자세히 보기">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => deleteInquiry(inquiry.id)} className="text-slate-400 hover:text-red-600 transition-colors p-2" title="삭제">
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
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <div>
                                <div className="text-sm text-slate-500 mb-1">보낸 사람</div>
                                <div className="font-bold text-lg text-slate-900">{viewingInquiry.name}</div>
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={() => toggleInquiryStatus(viewingInquiry.id)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${viewingInquiry.status === '대기' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}
                                >
                                    {viewingInquiry.status}
                                </button>
                                <div className="text-xs text-slate-400 mt-2">{viewingInquiry.date}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center"><Phone className="w-3 h-3 mr-1" /> 연락처</div>
                                <div className="text-slate-800">{viewingInquiry.contact}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center"><Mail className="w-3 h-3 mr-1" /> 이메일</div>
                                <div className="text-slate-800 truncate" title={viewingInquiry.email}>{viewingInquiry.email}</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-bold text-slate-700 mb-2">문의 내용</div>
                            <div className="bg-white border border-slate-200 p-4 rounded-lg text-slate-600 leading-relaxed whitespace-pre-wrap min-h-[150px]">
                                {viewingInquiry.content}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
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
                                <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200">
                                    파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'company_logo')} accept="image/*" />
                                </label>
                                <input type="text" className={`${inputClass} text-xs py-2`} value={companyFormData.logo || ''} onChange={e => setCompanyFormData({ ...companyFormData, logo: e.target.value })} placeholder="URL 직접 입력" />
                            </div>
                            <p className="text-[11px] text-slate-500 flex items-center">
                                <HelpCircle className="w-3 h-3 mr-1" /> 권장: 500x500px (1:1 비율), PNG/JPG
                            </p>
                        </div>
                        <div>
                            <label className={labelClass}>배경 이미지</label>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200">
                                    파일선택 <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'company_bg')} accept="image/*" />
                                </label>
                                <input type="text" className={`${inputClass} text-xs py-2`} value={companyFormData.bgImage || ''} onChange={e => setCompanyFormData({ ...companyFormData, bgImage: e.target.value })} placeholder="URL 직접 입력" />
                            </div>
                            <p className="text-[11px] text-slate-500 flex items-center">
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
                    <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <input type="checkbox" id="isTips" className="w-5 h-5 rounded border-gray-300 text-[#003E7E] focus:ring-[#003E7E]" checked={companyFormData.isTips} onChange={e => setCompanyFormData({ ...companyFormData, isTips: e.target.checked })} />
                        <label htmlFor="isTips" className="text-sm font-bold text-[#003E7E] cursor-pointer">TIPS 선정 기업</label>
                    </div>
                    <Button className="w-full mt-4" onClick={handleSaveCompany}>{editingId ? '수정하기' : '추가하기'}</Button>
                </div>
            </Modal>

            {/* Add/Edit Post Modal */}
            <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} title={editingId ? "게시글 수정" : "게시글 작성"}>
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>카테고리 *</label>
                        <select className={inputClass} value={postFormData.category} onChange={e => setPostFormData({ ...postFormData, category: e.target.value as 'notice' | 'press' | 'resources' | 'faq' })}>
                            {POST_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>제목 *</label>
                        <input type="text" className={inputClass} value={postFormData.title} onChange={e => setPostFormData({ ...postFormData, title: e.target.value })} placeholder="제목을 입력하세요" />
                    </div>
                    <div>
                        <label className={labelClass}>작성자</label>
                        <input type="text" className={inputClass} value={postFormData.author} onChange={e => setPostFormData({ ...postFormData, author: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>내용 *</label>
                        <textarea rows={8} className={inputClass} value={postFormData.content} onChange={e => setPostFormData({ ...postFormData, content: e.target.value })} placeholder="내용을 입력하세요"></textarea>
                    </div>
                    <div>
                        <label className={labelClass}>첨부파일</label>
                        <div className="flex items-center gap-3">
                            <label className="cursor-pointer bg-slate-100 text-slate-600 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors text-sm font-bold flex items-center shrink-0">
                                <Paperclip className="w-4 h-4 mr-2" />
                                파일 선택
                                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'post')} />
                            </label>
                            <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-sm text-slate-500 truncate">{postFormData.fileName || "선택된 파일 없음"}</span>
                                {postFormData.fileName && (
                                    <button onClick={() => setPostFormData({ ...postFormData, fileName: '' })} className="text-red-500 hover:text-red-700">
                                        <XCircle className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-4" onClick={handleSavePost}>{editingId ? '수정완료' : '작성완료'}</Button>
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
                            <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 shrink-0">
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
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                        <input type="checkbox" id="popupVisible" className="w-5 h-5" checked={popupFormData.isVisible} onChange={e => setPopupFormData({ ...popupFormData, isVisible: e.target.checked })} />
                        <label htmlFor="popupVisible" className="font-bold text-slate-700 cursor-pointer">즉시 게시 (활성화)</label>
                    </div>
                    <Button className="w-full mt-4" onClick={handleSavePopup}>{editingId ? '수정완료' : '추가하기'}</Button>
                </div>
            </Modal>
        </div>
    );
};

export default AdminPage;
