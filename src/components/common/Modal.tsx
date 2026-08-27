import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-card-hover w-full max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
                <div className="p-6 border-b border-line flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="font-bold text-lg text-ink">{title}</h3>
                    <button onClick={onClose} aria-label="닫기" className="text-ink-faint hover:text-ink transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
