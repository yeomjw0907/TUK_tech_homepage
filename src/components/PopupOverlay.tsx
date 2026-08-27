import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Popup } from '../types';

interface PopupOverlayProps {
    popups: Popup[];
    onClose: (id: number, doNotShowToday: boolean) => void;
}

const PopupOverlay: React.FC<PopupOverlayProps> = ({ popups, onClose }) => {
    const activePopups = popups.filter(p => p.isVisible);
    if (activePopups.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center md:items-start md:justify-start md:p-10 gap-4 flex-wrap">
            {activePopups.map(popup => (
                <div key={popup.id} className="pointer-events-auto bg-white rounded-2xl shadow-popover border border-line-md overflow-hidden w-full max-w-[350px] animate-in zoom-in-95 duration-300 flex flex-col">
                    {/* Image Area - 1:1 Ratio & Clickable */}
                    <div className="relative aspect-square bg-surface-alt group cursor-pointer" onClick={() => popup.link && window.open(popup.link, '_blank')}>
                        {popup.image ? (
                            <img src={popup.image} alt={popup.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-ink-faint">
                                <ImageIcon className="w-12 h-12" />
                            </div>
                        )}
                        {/* Overlay hint if link exists */}
                        {popup.link && (
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-surface-alt p-3 flex justify-between items-center text-xs border-t border-line mt-auto">
                        <label className="flex items-center gap-2 cursor-pointer text-ink-soft hover:text-ink">
                            <input type="checkbox" className="rounded border-line-md" onChange={(e) => { if (e.target.checked) onClose(popup.id, true) }} />
                            오늘 하루 보지 않기
                        </label>
                        <button
                            onClick={() => onClose(popup.id, false)}
                            aria-label="팝업 닫기"
                            className="font-bold text-ink-soft hover:text-ink bg-white border border-line-md px-3 py-1 rounded-xl hover:bg-surface-alt transition-colors duration-300"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PopupOverlay;
