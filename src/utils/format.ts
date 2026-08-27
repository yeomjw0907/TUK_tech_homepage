/**
 * 표기 통일 유틸 — 화면에 날짜를 출력할 때는 반드시 formatDate()를 거친다.
 * 표준 표기: YYYY.MM.DD (예: 2025.01.20)
 */
export const formatDate = (raw: string | undefined | null): string => {
    if (!raw) return '';
    const trimmed = raw.trim();

    // 기간 표기("2018.10.~2028.10.")는 구분자만 통일해 그대로 반환
    if (trimmed.includes('~')) {
        return trimmed
            .split('~')
            .map((part) => formatDate(part))
            .join(' ~ ');
    }

    // 끝의 마침표 제거 후 구분자(-, ., /) 분해
    const parts = trimmed.replace(/\.$/, '').split(/[-./]/).filter(Boolean);
    if (parts.length < 2) return trimmed;

    const [rawYear, month, day] = parts;
    const year = rawYear.length === 2 ? `20${rawYear}` : rawYear; // "15.08.01" → 2015
    const mm = month.padStart(2, '0');
    if (!day) return `${year}.${mm}`;
    return `${year}.${mm}.${day.padStart(2, '0')}`;
};

/** 오늘 날짜를 표준 표기로 반환 (문의 접수 등 저장용은 ISO 유지, 표시용은 이 함수 사용) */
export const todayDisplay = (): string => formatDate(new Date().toISOString().split('T')[0]);
