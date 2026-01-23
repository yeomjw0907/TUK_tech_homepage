import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Code,
    AlignLeft, AlignCenter, AlignRight,
    Link as LinkIcon, Image as ImageIcon,
    Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder = '내용을 입력하세요...' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
            Color,
        ],
        content: content || '<p></p>',
        onUpdate: ({ editor }) => {
            try {
                const html = editor.getHTML();
                if (html && html !== '<p></p>') {
                    onChange(html);
                }
            } catch (error) {
                console.error('Editor update error:', error);
            }
        },
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] p-4',
            },
        },
        onCreate: ({ editor }) => {
            // 초기 content 설정
            if (content && content !== '<p></p>') {
                editor.commands.setContent(content);
            }
        },
    });

    // content가 외부에서 변경될 때 에디터 업데이트 (편집 모드에서만)
    useEffect(() => {
        if (!editor) return;
        
        const currentContent = editor.getHTML();
        // 빈 상태이거나 외부에서 content가 변경된 경우에만 업데이트
        if (content && (currentContent === '<p></p>' || currentContent === '')) {
            try {
                editor.commands.setContent(content);
            } catch (error) {
                console.error('Editor content set error:', error);
            }
        }
    }, [editor, content]);

    const addImage = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file || !editor) return;

            // 파일 크기 제한 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('이미지 크기는 5MB 이하여야 합니다.');
                return;
            }

            // Base64로 변환
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                if (base64) {
                    editor.chain().focus().setImage({ src: base64 }).run();
                }
            };
            reader.readAsDataURL(file);
        };
    }, [editor]);

    const setLink = useCallback(() => {
        if (!editor) return;
        
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('링크 URL을 입력하세요:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return (
            <div className="border border-slate-300 rounded-xl p-8 text-center text-slate-500 min-h-[400px] flex items-center justify-center bg-slate-50">
                <div>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003E7E] mx-auto mb-2"></div>
                    <p>에디터를 로드하는 중...</p>
                </div>
            </div>
        );
    }

    const MenuButton = ({ onClick, isActive, children, title }: { onClick: () => void; isActive?: boolean; children: React.ReactNode; title?: string }) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded-lg transition-colors ${
                isActive
                    ? 'bg-[#003E7E] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[#003E7E]'
            }`}
            title={title}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
            {/* 툴바 */}
            <div className="border-b border-slate-200 bg-slate-50 p-2 flex flex-wrap items-center gap-1">
                {/* 텍스트 스타일 */}
                <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        title="굵게"
                    >
                        <Bold className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        title="기울임"
                    >
                        <Italic className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        title="밑줄"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        title="취소선"
                    >
                        <Strikethrough className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* 제목 */}
                <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        title="제목 1"
                    >
                        <Heading1 className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        title="제목 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        title="제목 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* 리스트 */}
                <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        title="글머리 기호"
                    >
                        <List className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        title="번호 매기기"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* 정렬 */}
                <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        title="왼쪽 정렬"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        title="가운데 정렬"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        title="오른쪽 정렬"
                    >
                        <AlignRight className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* 기타 */}
                <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        title="인용구"
                    >
                        <Quote className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive('codeBlock')}
                        title="코드 블록"
                    >
                        <Code className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* 링크 & 이미지 */}
                <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                    <MenuButton
                        onClick={setLink}
                        isActive={editor.isActive('link')}
                        title="링크 삽입"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={addImage}
                        title="이미지 삽입"
                    >
                        <ImageIcon className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* 실행 취소/다시 실행 */}
                <div className="flex items-center gap-1">
                    <MenuButton
                        onClick={() => editor.chain().focus().undo().run()}
                        title="실행 취소"
                    >
                        <Undo className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().redo().run()}
                        title="다시 실행"
                    >
                        <Redo className="w-4 h-4" />
                    </MenuButton>
                </div>
            </div>

            {/* 에디터 영역 */}
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
