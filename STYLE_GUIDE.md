# 디자인 스타일 가이드 (v2)

모든 화면 코드는 이 문서를 따른다. 토큰은 `tailwind.config.js`가 단일 기준이며,
임의값 클래스(`text-[#003E7E]`, `p-[13px]` 등)는 ESLint `no-arbitrary-value` 룰로 금지된다.

## 1. 색상 — hex 금지, 토큰 클래스만 사용

| 기존 (금지) | 대체 토큰 |
|---|---|
| `text-[#003E7E]`, `bg-[#003E7E]` | `text-navy`, `bg-navy` |
| `hover:bg-[#002D5C]` / `#002e5e` / `#002d5c` | `hover:bg-navy-hover` |
| `#0055CC` | `navy-light` |
| 다크 배경 `#001E4A` / `#00255A` / `#001D45` / `bg-slate-900`(히어로) | `bg-navy-deep` (전부 통일) |
| `#0099D6` | `cyan` (아이콘·장식 전용) — 흰 배경 위 텍스트는 `text-cyan-text` |
| `#C8A84A` / `#E8C870` | `gold` / `gold-light` — **성과 수치 강조 전용** |
| `text-[#1A2840]` | `text-ink` |
| `text-[#4B6080]` | `text-ink-soft` |
| `text-[#8A9BB5]`, `text-slate-400`, Footer의 `#5A78A0`/`#7A95B8`/`#3A567A` | `text-ink-faint` (다크 배경 위는 `text-white/60` 계열) |
| `bg-[#F5F8FC]` | `bg-surface-alt` |
| `bg-[#EBF2FF]` | `bg-surface-alt2` |
| `#F0F5FB` / `#F0F5FC` / `#F0F6FF` / `#D6E8FF` (고스트 넘버·장식) | `text-surface-alt2` 또는 `bg-surface-alt2` 로 통일 |
| `border-[rgba(0,62,126,0.08)]` | `border-line` |
| `border-[rgba(0,62,126,0.14~0.20)]`, hover 보더 | `border-line-md`, `hover:border-line-strong` |
| **`slate-*` 전체** (`text-slate-600`, `bg-slate-50`, `border-slate-100` 등) | 위 토큰으로 의미 매핑: 본문 `ink-soft`, 캡션 `ink-faint`, 배경 `surface-alt`, 보더 `line` |
| `blue-50`/`blue-100`(뱃지·hover 배경) | `surface-alt2` 또는 Badge 컴포넌트 |

- 조직도 고아 팔레트(`#B7C9DE` `#E4EAF2` `#EEF2F7` `#7AA7D4` `#2F6FB5` `rgba(16,42,80,*)`)도 위 토큰으로 근사 치환 (`line`, `ink-faint`, `navy-light` 등).
- 그림자: `shadow-card` / `hover:shadow-card-hover` / 팝오버 `shadow-popover`. 임의 그림자 값 금지.

## 2. 타이포그래피 — 8단계 스케일

| 용도 | 클래스 | 비고 |
|---|---|---|
| 히어로 대형 | `text-display` | clamp 내장, `md:` 분기 불필요 |
| 페이지 제목(서브헤더) | `text-h1` | |
| 섹션 제목 | `text-h2` | **반드시 `SectionTitle` 컴포넌트로** |
| 하위 섹션·카드그룹 제목 | `text-h3` | `SectionTitle size="sm"` 또는 h3 직접 |
| 카드 제목 | `text-h4` | |
| 리드문 | `text-body-lg` | |
| 본문 | `text-body` (또는 생략) | |
| 캡션·메타 | `text-caption` | |
| 오버라인(eyebrow) | `text-label uppercase` | |

- **굵기**: 제목은 토큰에 700 내장 → `font-black`/`font-extrabold`/`font-bold` 중복 지정 금지. 제목 외 강조는 `font-bold`만 사용.
- 기존 `text-3xl md:text-4xl font-black ...` → `text-h2`로 치환. `text-5xl md:text-6xl` 등 초대형도 `text-h2`(섹션) 또는 `text-display`(히어로만)로 정규화.
- 임의 크기(`text-[0.95rem]`, `text-[11px]`, `text-[9px]` 등) 금지 → 가장 가까운 스케일(`text-base`, `text-xs` 등)로.
- `text-[10px]`/`text-[0.6rem]`/`text-[0.65rem]` 오버라인류 → `text-label` 또는 `text-xs`.
- 숫자 디스플레이는 `.display-num` 유지 (Bebas Neue).

## 3. 섹션 헤더 패턴 (단일 규격)

```tsx
<SectionTitle
    subtitle="Investment Focus"   // 영문 Title Case, uppercase는 CSS가 처리
    title="투자 분야"              // 한글
    description="딥테크 4개 분야에 집중 투자합니다"  // 선택
    align="center"                // 홈 섹션 center, 서브페이지 본문 left 권장
/>
```
- 인라인 eyebrow(`uppercase tracking-widest` 직접 조합), `.tag` 클래스 사용 금지 → SectionTitle 또는 Badge로.
- eyebrow 표기는 **영문 Title Case** 소스로 통일 ("VISION", "vision" 금지 → "Vision").

## 4. 컴포넌트

- **버튼**: 반드시 `<Button variant size>`. `className`으로 색·배경·그림자 덮어쓰기 금지(폭·마진 조정만 허용). 다크 배경 위는 `variant="inverse"`.
  - 텍스트 링크형 CTA(화살표 동반)는 예외적으로 인라인 허용하되 단일 패턴:
    `inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:gap-2.5 transition-all` + `<ArrowRight className="w-4 h-4" />`
- **카드**: 반드시 `<Card padding="sm|md|lg">`. hover는 컴포넌트 내장(-translate-y-1, shadow-card-hover) — 개별 카드에서 다른 부양값 금지.
- **뱃지**: 반드시 `<Badge variant="navy|gold|neutral|danger">`. TIPS → `gold`, 자회사/투자기업/운용중 → `navy`, NEW → `danger`, 파일형식 → `neutral`.
  - 뱃지 라벨은 한글 기본, 고유명사(TIPS/NEW)만 영문. `'subsidiary'` 영문 소문자 노출 금지 → '자회사'/'투자기업'.
- **모달**: `<Modal>` 사용. 오버레이 재구현 금지 (SearchModal은 구조 특성상 자체 유지하되 토큰만 적용).

## 5. 레이아웃

- 섹션 세로 패딩: `py-20 md:py-28` (홈·서브 공통). 빈 상태는 `py-20`.
- 콘텐츠 폭 2종: **텍스트형 `max-w-4xl mx-auto`**, **그리드형 제한 없음(부모 max-w-7xl)**. 3xl/5xl 등 다른 폭 금지.
- radius: 카드·모달 `rounded-2xl`, 아이콘 박스 `rounded-xl`, 뱃지 `rounded-full`, 인풋 `rounded-xl`. `rounded-3xl`/`rounded-lg` 박스 금지(기존 것도 교체).
- 아이콘 박스: `w-12 h-12 rounded-xl` + 아이콘 `w-6 h-6` (50% 비율). 큰 박스 `w-14`+`w-7`.
- hover: 카드 부양은 Card 내장만. 아이콘 색 반전은 `group-hover:bg-navy group-hover:text-white`로 통일. scale은 이미지에만 `group-hover:scale-105`.
- transition: `duration-300` 기본 (버튼 등 소형 인터랙션도 300 통일).

## 6. 문구·표기

- 회사명: `COMPANY_NAME`("한국공학대학교 기술지주회사") / 법적표기 `COMPANY_NAME_LEGAL`. 하드코딩 금지.
- 프로그램명: `PROGRAM_TURN_UP`("TU-RN Up"). "TU-RN UP", "TU RN-UP" 금지.
- 날짜: 화면 출력은 전부 `formatDate()` (YYYY.MM.DD). 기간은 "YYYY.MM ~ YYYY.MM".
- CTA 문구 2종: 개별 항목 → **"자세히 보기"**, 목록/전체 이동 → **"전체보기"**. ("더 알아보기", "더보기", "…살펴보기" 금지. "목록으로"는 상세→목록 복귀용으로 유지)
- 통계 수치: `KEY_STATS` 상수 사용, 기업 수는 가능하면 `companies.filter(...).length`로 산출. 기준일은 `KEY_STATS.baseDate`.
- 유효하지 않은 클래스 금지: `bg-white/08`(→`bg-white/10`), `ml-18`(→`ml-16` 등), `scrollbar-hide`(→`hide-scrollbar`).

## 7. 접근성

- 흰 배경 위 본문 텍스트에 `cyan` 원색 금지 (`cyan-text` 사용).
- 아이콘 전용 버튼에는 `aria-label` 필수.
- 이미지 `alt` 필수.
