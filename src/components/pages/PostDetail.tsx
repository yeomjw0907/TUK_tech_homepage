import React from 'react';
import {
    ChevronLeft, ChevronRight, User, Clock, Eye,
    Paperclip, FileIcon, Download
} from 'lucide-react';
import { Post } from '../../types';
import { Badge } from '../common';
import { formatDate } from '../../utils/format';

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
                <button onClick={onBack} className="flex items-center text-ink-soft hover:text-navy font-bold transition-colors">
                    <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로
                </button>
                <span className="text-sm font-medium text-ink-faint">{type}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-line overflow-hidden">
                <div className="p-8 md:p-10 border-b border-line bg-surface-alt/30">
                    <h1 className="text-h1 text-ink mb-6">{post.title}</h1>
                    <div className="flex flex-wrap gap-y-2 text-sm text-ink-soft font-medium">
                        <div className="flex items-center mr-6">
                            <User className="w-4 h-4 mr-2 text-ink-faint" /> {post.author || '관리자'}
                        </div>
                        <div className="flex items-center mr-6">
                            <Clock className="w-4 h-4 mr-2 text-ink-faint" /> {formatDate(post.date)}
                        </div>
                        <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-2 text-ink-faint" /> {post.views?.toLocaleString() || 0}
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-10 min-h-[400px]">
                    <div
                        className="prose max-w-none text-ink-soft leading-8"
                        dangerouslySetInnerHTML={{ __html: post.content || '' }}
                    />
                </div>

                {((post.files && post.files.length > 0) || post.fileName || post.fileType) && (
                    <div className="bg-surface-alt p-6 md:p-8 border-t border-line">
                        <h4 className="font-bold text-ink mb-4 flex items-center">
                            <Paperclip className="w-4 h-4 mr-2 text-navy" />
                            첨부파일
                            {post.files && post.files.length > 1 && (
                                <span className="ml-2 text-sm font-normal text-ink-soft">
                                    ({post.files.length}개)
                                </span>
                            )}
                        </h4>
                        <div className="flex flex-col gap-2">
                            {/* 여러 파일 표시 */}
                            {post.files && post.files.length > 0 ? (
                                post.files.map((file, index) => (
                                    <a
                                        key={index}
                                        href={file.url || undefined}
                                        download={file.url ? file.name : undefined}
                                        target={file.url ? '_blank' : undefined}
                                        rel="noreferrer"
                                        onClick={(e) => { if (!file.url) { e.preventDefault(); alert('이 첨부파일은 서버에 업로드되지 않아 다운로드할 수 없습니다.'); } }}
                                        className="flex items-center p-3 bg-white border border-line rounded-xl hover:border-line-strong cursor-pointer transition-colors group"
                                    >
                                        <FileIcon className="w-5 h-5 text-ink-faint group-hover:text-navy mr-3 shrink-0" />
                                        <span className="text-sm font-medium text-ink-soft group-hover:text-ink flex-grow truncate">
                                            {file.name}
                                        </span>
                                        {file.type && (
                                            <Badge variant="neutral" className="mr-2 shrink-0">
                                                {file.type}
                                            </Badge>
                                        )}
                                        <Download className="w-4 h-4 text-ink-faint group-hover:text-navy shrink-0" />
                                    </a>
                                ))
                            ) : (
                                // 기존 단일 파일 호환성
                                <a
                                    href={post.fileUrl || (post.fileName ? `/files/${post.fileName}` : undefined)}
                                    download={post.fileName}
                                    className="flex items-center p-3 bg-white border border-line rounded-xl hover:border-line-strong cursor-pointer transition-colors group"
                                >
                                    <FileIcon className="w-5 h-5 text-ink-faint group-hover:text-navy mr-3" />
                                    <span className="text-sm font-medium text-ink-soft group-hover:text-ink flex-grow truncate">
                                        {post.fileName || `${post.title} 관련 첨부파일.${post.fileType?.toLowerCase() || 'pdf'}`}
                                    </span>
                                    <Download className="w-4 h-4 text-ink-faint group-hover:text-navy" />
                                </a>
                            )}
                        </div>
                    </div>
                )}

                <div className="border-t border-line flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-line">
                    <div
                        className={`flex-1 p-5 transition-colors flex items-center text-sm ${newerPost ? 'hover:bg-surface-alt cursor-pointer text-ink-soft' : 'text-ink-faint cursor-default'}`}
                        onClick={() => newerPost && onPostClick(newerPost)}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-bold mr-3">이전글</span>
                        <span className="truncate">{newerPost ? newerPost.title : '이전 게시글이 없습니다.'}</span>
                    </div>
                    <div
                        className={`flex-1 p-5 transition-colors flex items-center justify-end text-sm ${olderPost ? 'hover:bg-surface-alt cursor-pointer text-ink-soft' : 'text-ink-faint cursor-default'}`}
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
