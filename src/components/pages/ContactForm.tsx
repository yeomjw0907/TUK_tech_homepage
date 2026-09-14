import React, { useState } from 'react';
import { Button } from '../common';
import { Mail, Phone, CheckCircle, Paperclip, X } from 'lucide-react';
import {
    INQUIRY_APPLICATION_TYPES,
    INQUIRY_NOTICES,
    INQUIRY_TYPES,
    PRIVACY_CONSENT_NOTICE,
} from '../../data/constants';
import { InquiryType } from '../../types';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 5;
const ACCEPTED_FILES = '.pdf,.doc,.docx,.ppt,.pptx,.hwp,.hwpx,.xls,.xlsx,.zip,.jpg,.jpeg,.png';

const isApplicationType = (type: InquiryType | '') =>
    (INQUIRY_APPLICATION_TYPES as readonly string[]).includes(type);

interface ContactFormProps {
    onSubmit: (data: {
        inquiryType: InquiryType;
        name: string;
        contact: string;
        email: string;
        companyName: string;
        content: string;
        files: File[];
        privacyAgreed: boolean;
    }) => Promise<void> | void;
    initialInquiryType?: InquiryType;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialInquiryType }) => {
    const [inquiryType, setInquiryType] = useState<InquiryType | ''>(initialInquiryType ?? '');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [fileError, setFileError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const notice = inquiryType && inquiryType in INQUIRY_NOTICES
        ? INQUIRY_NOTICES[inquiryType as keyof typeof INQUIRY_NOTICES]
        : undefined;
    const showApplicationExtras = isApplicationType(inquiryType);

    const resetForm = () => {
        setInquiryType('');
        setName('');
        setContact('');
        setEmail('');
        setCompanyName('');
        setContent('');
        setFiles([]);
        setPrivacyAgreed(false);
        setFileError('');
    };

    const handleTypeChange = (type: InquiryType) => {
        setInquiryType(type);
        setFiles([]);
        setPrivacyAgreed(false);
        setFileError('');
    };

    const handleFiles = (list: FileList | null) => {
        if (!list) return;
        const next = [...files];
        for (const file of Array.from(list)) {
            if (file.size > MAX_FILE_BYTES) {
                setFileError(`파일당 최대 10MB까지 첨부할 수 있습니다. (${file.name})`);
                return;
            }
            if (next.length >= MAX_FILES) {
                setFileError(`첨부파일은 최대 ${MAX_FILES}개까지 가능합니다.`);
                return;
            }
            next.push(file);
        }
        setFileError('');
        setFiles(next);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inquiryType) return;
        if (showApplicationExtras && files.length === 0) {
            setFileError('IR·자회사 접수는 관련 자료를 첨부해 주세요.');
            return;
        }
        if (showApplicationExtras && !privacyAgreed) {
            alert('개인정보 수집 및 이용에 동의해 주세요.');
            return;
        }
        setSubmitting(true);
        try {
            await onSubmit({
                inquiryType,
                name,
                contact,
                email,
                companyName,
                content,
                files: showApplicationExtras ? files : [],
                privacyAgreed: showApplicationExtras ? privacyAgreed : false,
            });
            alert('문의가 접수되었습니다.');
            resetForm();
        } catch {
            alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        'w-full px-5 py-4 bg-surface-alt border border-line-md rounded-xl focus:ring-2 focus:ring-navy focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium';

    return (
        <div className="space-y-12">
            <div className="bg-navy rounded-2xl p-10 md:p-14 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-15" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <p className="text-label uppercase text-white/70 mb-4">Contact</p>
                    <p className="text-white/80 text-body-lg">
                        문의유형을 선택하고 내용을 남겨주시면
                        <br className="hidden md:block" />
                        검토 후 개별 안내 드립니다.
                    </p>
                    <p className="mt-4 text-white/70 text-body">
                        ({INQUIRY_TYPES.join(' / ')})
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-card border border-line">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-ink mb-3">문의유형</label>
                        <select
                            value={inquiryType}
                            onChange={e => handleTypeChange(e.target.value as InquiryType)}
                            required
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option value="" disabled>
                                문의유형을 선택하세요
                            </option>
                            {INQUIRY_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">이름</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                type="text"
                                className={inputClass}
                                placeholder="성함을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">연락처</label>
                            <input
                                value={contact}
                                onChange={e => setContact(e.target.value)}
                                required
                                type="text"
                                className={inputClass}
                                placeholder="연락처를 입력하세요"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">이메일</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                type="email"
                                className={inputClass}
                                placeholder="이메일 주소를 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-ink mb-3">기업명</label>
                            <input
                                value={companyName}
                                onChange={e => setCompanyName(e.target.value)}
                                required
                                type="text"
                                className={inputClass}
                                placeholder="기업명을 입력하세요"
                            />
                        </div>
                    </div>

                    {notice && (
                        <div className="bg-surface-alt2 rounded-2xl p-6 border border-line-md">
                            <h3 className="text-h4 text-navy mb-4">{notice.title}</h3>
                            <ul className="space-y-2 text-ink-soft">
                                {notice.items.map((item) => (
                                    <li key={item} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-navy mr-2 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-ink mb-3">문의내용</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            rows={6}
                            className={`${inputClass} resize-none`}
                            placeholder="문의하실 내용을 입력하세요"
                        />
                    </div>

                    {showApplicationExtras && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-ink mb-3">첨부파일</label>
                                <p className="text-caption text-ink-soft mb-3">
                                    사업계획서 등 관련 자료를 첨부해 주세요. (최대 {MAX_FILES}개, 파일당 10MB)
                                </p>
                                <label className="cursor-pointer inline-flex items-center gap-2 bg-surface-alt text-ink-soft px-4 py-3 rounded-xl border border-line hover:bg-surface-alt2 transition-colors text-sm font-bold">
                                    <Paperclip className="w-4 h-4" />
                                    파일 선택
                                    <input
                                        type="file"
                                        className="hidden"
                                        multiple
                                        accept={ACCEPTED_FILES}
                                        onChange={e => {
                                            handleFiles(e.target.files);
                                            e.target.value = '';
                                        }}
                                    />
                                </label>
                                {files.length > 0 && (
                                    <ul className="mt-4 space-y-2">
                                        {files.map((file, index) => (
                                            <li
                                                key={`${file.name}-${index}`}
                                                className="flex items-center justify-between gap-3 bg-surface-alt border border-line rounded-xl px-4 py-3"
                                            >
                                                <span className="text-sm text-ink truncate">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                                    className="text-ink-faint hover:text-navy shrink-0"
                                                    aria-label={`${file.name} 삭제`}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {fileError && <p className="mt-2 text-caption text-danger">{fileError}</p>}
                            </div>

                            <div className="border border-navy/40 rounded-2xl p-6">
                                <h3 className="text-h4 text-ink mb-4">{PRIVACY_CONSENT_NOTICE.title}</h3>
                                <div className="bg-surface-alt rounded-xl p-4 space-y-2 text-caption text-ink-soft mb-4">
                                    {PRIVACY_CONSENT_NOTICE.body.map((row) => (
                                        <p key={row.label}>
                                            <strong className="text-ink">{row.label}</strong>
                                            {' '}{row.text}
                                        </p>
                                    ))}
                                </div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={privacyAgreed}
                                        onChange={e => setPrivacyAgreed(e.target.checked)}
                                        required
                                        className="mt-1 w-4 h-4 accent-navy"
                                    />
                                    <span className="text-sm text-ink">
                                        개인정보 수집 및 이용에 동의합니다. <span className="text-danger">(필수)</span>
                                    </span>
                                </label>
                            </div>
                        </>
                    )}

                    <div className="text-center pt-6">
                        <Button variant="primary" size="xl" className="w-full md:w-auto" disabled={submitting}>
                            {submitting ? '접수 중...' : '문의/신청'}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                <div className="bg-surface-alt rounded-2xl p-6 border border-line">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-h4 text-ink">이메일문의</h3>
                    </div>
                    <a href="mailto:tuholdings@tukorea.ac.kr" className="text-navy font-medium hover:underline">
                        tuholdings@tukorea.ac.kr
                    </a>
                </div>
                <div className="bg-surface-alt rounded-2xl p-6 border border-line">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-h4 text-ink">전화문의</h3>
                    </div>
                    <a href="tel:031-8041-0965" className="text-navy font-medium hover:underline">
                        031-8041-0965
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
