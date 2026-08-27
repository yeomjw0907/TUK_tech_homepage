import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Building, ArrowRight } from 'lucide-react';
import { Post, Company } from '../../types';
import Badge from './Badge';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    posts: Post[];
    companies: Company[];
    onPostClick: (post: Post, type: string) => void;
    onCompanyClick: (company: Company) => void;
    onNavigate?: (page: string, subPage?: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
    isOpen, 
    onClose, 
    posts, 
    companies,
    onPostClick,
    onCompanyClick,
    onNavigate
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{
        posts: Post[];
        companies: Company[];
    }>({ posts: [], companies: [] });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults({ posts: [], companies: [] });
            return;
        }

        const query = searchQuery.toLowerCase();
        
        // 게시글 검색
        const matchedPosts = posts.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.content?.toLowerCase().includes(query) ||
            post.author?.toLowerCase().includes(query)
        );

        // 기업 검색
        const matchedCompanies = companies.filter(company =>
            company.name.toLowerCase().includes(query) ||
            company.business.toLowerCase().includes(query) ||
            company.ceo.toLowerCase().includes(query)
        );

        setSearchResults({
            posts: matchedPosts.slice(0, 5), // 최대 5개
            companies: matchedCompanies.slice(0, 5) // 최대 5개
        });
    }, [searchQuery, posts, companies]);

    const handlePostClick = (post: Post) => {
        // FAQ 항목은 FAQ 페이지로 이동
        if (post.category === 'faq' && onNavigate) {
            onNavigate('news', 'faq');
            onClose();
            setSearchQuery('');
            return;
        }
        
        const typeMap: Record<string, string> = {
            'notice': '공지사항',
            'press': '언론보도',
            'resources': '자료실',
            'faq': 'Q&A'
        };
        onPostClick(post, typeMap[post.category] || '공지사항');
        onClose();
        setSearchQuery('');
    };

    const handleCompanyClick = (company: Company) => {
        onCompanyClick(company);
        onClose();
        setSearchQuery('');
    };

    if (!isOpen) return null;

    const totalResults = searchResults.posts.length + searchResults.companies.length;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-popover w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 검색 입력 */}
                <div className="p-6 border-b border-line">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink-faint" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="검색어를 입력하세요..."
                                className="w-full pl-12 pr-4 py-3 bg-surface-alt border border-line-md rounded-xl focus:ring-2 focus:ring-navy focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="검색 닫기"
                            className="p-2 text-ink-faint hover:text-ink-soft transition-colors rounded-xl hover:bg-surface-alt"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 검색 결과 */}
                <div className="overflow-y-auto max-h-[60vh]">
                    {!searchQuery.trim() ? (
                        <div className="p-12 text-center text-ink-faint">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">검색어를 입력하세요</p>
                        </div>
                    ) : totalResults === 0 ? (
                        <div className="p-12 text-center text-ink-faint">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">검색 결과가 없습니다</p>
                            <p className="text-xs mt-2 text-ink-faint">다른 검색어를 시도해보세요</p>
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            {/* 게시글 결과 */}
                            {searchResults.posts.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="w-4 h-4 text-navy" />
                                        <h3 className="text-sm font-bold text-ink">게시글 ({searchResults.posts.length})</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {searchResults.posts.map((post) => (
                                            <button
                                                key={post.id}
                                                onClick={() => handlePostClick(post)}
                                                className="w-full text-left p-4 bg-surface-alt hover:bg-surface-alt2 rounded-xl border border-line hover:border-line-strong transition-all group"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Badge variant="neutral">
                                                                {post.category === 'notice' ? '공지사항' :
                                                                 post.category === 'press' ? '언론보도' :
                                                                 post.category === 'resources' ? '자료실' : 'Q&A'}
                                                            </Badge>
                                                            <span className="text-xs text-ink-faint">{post.date}</span>
                                                        </div>
                                                        <h4 className="font-bold text-ink group-hover:text-navy transition-colors line-clamp-1">
                                                            {post.title}
                                                        </h4>
                                                        {post.content && (
                                                            <p className="text-sm text-ink-soft mt-1 line-clamp-2">
                                                                {post.content}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-navy transition-colors shrink-0 mt-1" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 기업 결과 */}
                            {searchResults.companies.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Building className="w-4 h-4 text-navy" />
                                        <h3 className="text-sm font-bold text-ink">기업 ({searchResults.companies.length})</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {searchResults.companies.map((company) => (
                                            <button
                                                key={company.id}
                                                onClick={() => handleCompanyClick(company)}
                                                className="w-full text-left p-4 bg-surface-alt hover:bg-surface-alt2 rounded-xl border border-line hover:border-line-strong transition-all group"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Badge variant="navy">
                                                                {company.category === 'subsidiary' ? '자회사' : '투자기업'}
                                                            </Badge>
                                                            {company.isTips && (
                                                                <Badge variant="gold">
                                                                    TIPS
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <h4 className="font-bold text-ink group-hover:text-navy transition-colors">
                                                            {company.name}
                                                        </h4>
                                                        <p className="text-sm text-ink-soft mt-1 line-clamp-1">
                                                            {company.business}
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-navy transition-colors shrink-0 mt-1" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
