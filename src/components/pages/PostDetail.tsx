import React from 'react';
import {
    ChevronLeft, ChevronRight, User, Clock, Eye,
    Paperclip, FileIcon, Download
} from 'lucide-react';
import { Post } from '../../types';

interface PostDetailProps {
    post: Post;
    type: string;
    onBack: () => void;
    onPostClick: (post: Post) => void;
    allPosts: Post[];
}

const PostDetail: React.FC<PostDetailProps> = ({ post, type, onBack, onPostClick, allPosts }) => {
    const currentIndex = allPosts.findIndex(p => p.id === post.id);
    const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-8 flex items-center justify-between">
                <button onClick={onBack} className="flex items-center text-slate-500 hover:text-[#003E7E] font-bold transition-colors">
                    <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
                </button>
                <span className="text-sm font-medium text-slate-400">{type}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/30">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{post.title}</h1>
                    <div className="flex flex-wrap gap-y-2 text-sm text-slate-500 font-medium">
                        <div className="flex items-center mr-6">
                            <User className="w-4 h-4 mr-2 text-slate-400" /> {post.author || '관리자'}
                        </div>
                        <div className="flex items-center mr-6">
                            <Clock className="w-4 h-4 mr-2 text-slate-400" /> {post.date}
                        </div>
                        <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-2 text-slate-400" /> {post.views?.toLocaleString() || 0}
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-10 min-h-[400px]">
                    <div className="prose max-w-none text-slate-700 leading-8 whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>

                {((post.files && post.files.length > 0) || post.fileName || post.fileType) && (
                    <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                            <Paperclip className="w-4 h-4 mr-2 text-[#003E7E]" /> 
                            첨부파일
                            {post.files && post.files.length > 1 && (
                                <span className="ml-2 text-sm font-normal text-slate-500">
                                    ({post.files.length}개)
                                </span>
                            )}
                        </h4>
                        <div className="flex flex-col gap-2">
                            {/* 여러 파일 표시 */}
                            {post.files && post.files.length > 0 ? (
                                post.files.map((file, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-[#003E7E] cursor-pointer transition-colors group"
                                    >
                                        <FileIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003E7E] mr-3 shrink-0" />
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex-grow truncate">
                                            {file.name}
                                        </span>
                                        {file.type && (
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100 mr-2 shrink-0">
                                                {file.type}
                                            </span>
                                        )}
                                        <Download className="w-4 h-4 text-slate-300 group-hover:text-[#003E7E] shrink-0" />
                                    </div>
                                ))
                            ) : (
                                // 기존 단일 파일 호환성
                                <div className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-[#003E7E] cursor-pointer transition-colors group">
                                    <FileIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003E7E] mr-3" />
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex-grow truncate">
                                        {post.fileName || `${post.title} 관련 첨부파일.${post.fileType?.toLowerCase() || 'pdf'}`}
                                    </span>
                                    <Download className="w-4 h-4 text-slate-300 group-hover:text-[#003E7E]" />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="border-t border-slate-100 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div
                        className={`flex-1 p-5 transition-colors flex items-center text-sm ${newerPost ? 'hover:bg-slate-50 cursor-pointer text-slate-600' : 'text-slate-300 cursor-default'}`}
                        onClick={() => newerPost && onPostClick(newerPost)}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-bold mr-3">이전글</span>
                        <span className="truncate">{newerPost ? newerPost.title : '이전 게시글이 없습니다.'}</span>
                    </div>
                    <div
                        className={`flex-1 p-5 transition-colors flex items-center justify-end text-sm ${olderPost ? 'hover:bg-slate-50 cursor-pointer text-slate-600' : 'text-slate-300 cursor-default'}`}
                        onClick={() => olderPost && onPostClick(olderPost)}
                    >
                        <span className="truncate text-right">{olderPost ? olderPost.title : '다음 게시글이 없습니다.'}</span>
                        <span className="font-bold ml-3">다음글</span>
                        <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
