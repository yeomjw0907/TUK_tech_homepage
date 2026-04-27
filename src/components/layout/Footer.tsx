import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Lock } from 'lucide-react';

interface FooterProps {
    onAdminLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLogin }) => {
    const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFamilySiteOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const familySites = [
        "한국공학대학교", "일반대학원", "산업기술경영대학원", "지식기반기술에너지대학원",
        "생활관", "대학일자리센터", "학생상담센터", "학보사", "공학교육혁신센터",
        "산학협력단", "일학습병행사업단", "교수학습개발센터", "ITP(산업기술최고경영자과정)",
        "커뮤니케이션교육센터", "도서관", "평생교육원", "현장실습업무지원시스템",
        "창업보육센터", "가족회사종합지원센터", "EH사업화센터", "공용장비지원센터", "LINC+ 사업단"
    ];

    return (
        <footer className="bg-[#00255A] text-[#8AA5C8] py-16 text-sm antialiased relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-12 border-b border-[rgba(255,255,255,0.08)]">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 w-full md:w-auto">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo_white.svg"
                                alt="한국공학대학교 기술지주회사"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <div className="flex flex-wrap gap-6 md:ml-8">
                            <a href="#" className="text-xs font-bold text-[#5A78A0] hover:text-[#8AA5C8] transition-colors">개인정보취급방침</a>
                            <a href="#" className="text-xs font-bold text-[#5A78A0] hover:text-[#8AA5C8] transition-colors">정보보호실천수칙</a>
                            <a href="#" className="text-xs font-bold text-[#5A78A0] hover:text-[#8AA5C8] transition-colors">홈페이지운영지침</a>
                        </div>
                    </div>

                    <div className="relative w-full md:w-64" ref={dropdownRef}>
                        <button
                            onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
                            className="w-full flex justify-between items-center border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 bg-[rgba(255,255,255,0.04)] text-[#8AA5C8] hover:border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.07)] transition-all"
                        >
                            <span className="text-xs font-medium">TUKOREA 관련기관 링크</span>
                            <ChevronDown className={`w-4 h-4 text-[#8AA5C8] transition-transform ${isFamilySiteOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isFamilySiteOpen && (
                            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#001D45] border border-[rgba(255,255,255,0.07)] shadow-2xl rounded-xl max-h-60 overflow-y-auto text-xs z-50">
                                {familySites.map((site, idx) => (
                                    <a key={idx} href="#" className="block px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] hover:text-white border-b border-[rgba(255,255,255,0.04)] last:border-0 text-[#8AA5C8] transition-colors">
                                        {site}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-xs leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-white text-sm mb-3">한국공학대학교 기술지주회사</p>
                        <p className="text-[#5A78A0]">경기도 시흥시 산기대학로 237 시흥비즈니스센터 7층</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                            <span className="text-[#5A78A0]"><strong className="text-[#7A95B8]">T.</strong> 031-8041-0965</span>
                            <span className="text-[#5A78A0]"><strong className="text-[#7A95B8]">F.</strong> 031-8041-0899</span>
                            <span className="text-[#5A78A0]"><strong className="text-[#7A95B8]">E.</strong> tuholdings@tukorea.ac.kr</span>
                        </div>
                    </div>
                    <div className="md:text-right flex flex-col justify-end">
                        <p className="text-[#3A567A] mb-2">Copyright© 2025 Tech University of Korea Holdings. All Rights Reserved.</p>
                        <button onClick={onAdminLogin} className="text-[#3A567A] hover:text-[#5A78A0] transition-colors flex items-center gap-1 text-[10px] self-end">
                            <Lock className="w-3 h-3" /> 관리자 로그인
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
