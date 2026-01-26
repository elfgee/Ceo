# 전체 중개사무소 제한조치 현황

## 개요

허위광고OUT 메뉴의 첫 번째 서브메뉴로, 전체 중개사무소의 제한조치 현황을 조회하고 관리할 수 있는 페이지입니다.

## 목표

- 제한 조치된 중개사무소 현황을 한눈에 파악할 수 있도록 제공
- 제한 조치 유형별(활성 제한, 영구 제한) 현황을 빠르게 확인할 수 있도록 지원
- 제한 조치 내역을 시간순으로 확인하여 추이를 파악할 수 있도록 제공

## 사용자 스토리

### 주요 사용자
- CEO 사이트를 사용하는 중개사무소 대표 (회원)

### 사용자 시나리오
1. **현황 조회**: 제한 조치된 중개사무소의 전체 현황과 총 개수를 확인하고 싶다
2. **유형별 조회**: 활성 제한, 영구 제한 조치를 받은 중개사무소를 각각 확인하고 싶다
3. **필터링**: 특정 제한 조치 유형을 클릭하여 해당 유형의 중개사무소만 목록으로 보고 싶다
4. **상세 확인**: 특정 중개사무소의 제한 조치 내역(날짜, 위반 정책, 처리 내용)을 확인하고 싶다

## 비즈니스 규칙

### 제한 조치 유형
제한 조치는 총 2가지 유형이 있습니다:

- **활성 제한 (Active Restriction)**
  - 일시적인 제한 조치
  - 경고 1회, 경고 2회를 포함
  - 기간이 명확함 (시작일 ~ 종료일)
  - 디자인 시스템 컬러: Grey (Foreground)
  
- **영구 제한 (Permanent Restriction)**
  - 영구적인 제한 조치
  - 경고 3회 이상인 경우 영구 제한 조치를 받게 됨
  - 종료일 없음
  - 디자인 시스템 컬러: Red (Destructive)

### 제한 조치 처리 규칙
- 중개사무소가 위반 정책을 위반하면 경고 1회가 부여됨 (활성 제한)
- 경고 1회를 받은 중개사무소가 다시 위반하면 경고 2회가 부여됨 (활성 제한)
- 경고 2회를 받은 중개사무소가 다시 위반하면 영구 제한 조치가 부여됨 (영구 제한)

## 기능 요구사항

### 1. 상단 요약 정보
- [ ] 제한 조치된 중개사무소 총 개수 표시
- [ ] 리스팅한 기간 표시 (최근 1년 기준, yyyy-mm-dd 형식으로 표기)
  - 예: "최근 1년 기준 (2025-01-16 ~ 2026-01-16)"

### 2. 제한 조치 유형별 통계 및 필터
- [ ] 테이블 상단에 활성 제한, 영구 제한 조치를 받은 중개사무소 각각의 숫자 표시
  - 표시 형식: "활성 제한 45건", "영구 제한 50건"
- [ ] 각 숫자를 클릭하면 해당 조건의 중개사무소만 필터링되어 목록에 표시됨
- [ ] 기본 상태는 제한 조치된 중개사무소 전체 목록이 표시됨
- [ ] 필터가 적용된 상태에서는 해당 필터 텍스트 컬러가 Primary 색상으로 변경됨
  - 비활성: `color: var(--foreground)`
  - 활성: `color: var(--primary)`
- [ ] 필터 적용 시 해당 조건에 맞는 중개사무소가 없는 경우, 빈 상태 메시지를 표시
  - 빈 상태 메시지: "해당 조건에 맞는 제한 조치 내역이 없습니다."
  - 테이블 대신 빈 상태 메시지가 표시되고, 페이지네이션은 숨김 처리

### 3. 목록 조회
- [ ] 제한 조치된 중개사무소 목록을 테이블 형태로 표시
- [ ] 한 페이지에 10개까지 노출
- [ ] 페이지네이션 적용
- [ ] 정렬 순서는 최신순 (제한 조치 날짜 기준 내림차순)
- [ ] 테이블 상단에 "총 n건" 표시

### 4. 테이블 컬럼 구성
테이블은 다음 5개의 컬럼으로 구성됩니다:

1. **날짜**
   - 제한 조치가 적용된 날짜
   - 표기 형식: yyyy-mm-dd (예: 2026-01-16)
   - 폰트: `font-size: var(--font-size-sm)`, `color: var(--foreground)`

2. **중개사무소**
   - 중개사무소 이름과 대표자명을 함께 표시
   - 표기 형식: "중개사무소이름(대표:대표자명)"
   - 예: "직방부동산(대표:홍길동)"
   - 폰트: `font-size: var(--font-size-base)`, `font-weight: var(--font-weight-medium)`

3. **지역**
   - 중개사무소 소재지
   - 표기 형식: "시 구" 또는 "도 시 구" (공백으로 구분)
   - 예: "서울 강남구", "경기 성남시 분당구"
   - 폰트: `font-size: var(--font-size-sm)`, `color: var(--muted-foreground)`

4. **위반 정책**
   - 위반한 정책명 표시
   - "안심중개사규정" 또는 "안심광고관리규정" 또는 둘 다
   - 둘 다 위반한 경우: "안심중개사규정, 안심광고관리규정" 형식으로 표시
   - 폰트: `font-size: var(--font-size-sm)`, `color: var(--foreground)`

5. **처리**
   - 제한 조치 유형 표시
   - 값: "경고 1회", "경고 2회", "영구제한"
   - **스타일 (텍스트만, Badge 미사용):**
     - 경고 1회: `color: var(--foreground)`, `font-size: var(--font-size-sm)`
     - 경고 2회: `color: var(--foreground)`, `font-size: var(--font-size-sm)`
     - 영구제한: `color: var(--destructive)`, `font-size: var(--font-size-sm)`, `font-weight: var(--font-weight-semibold)`

### 5. 테이블 디자인 스펙

#### 테이블 헤더
```css
.table-header {
  background: var(--muted);
  color: var(--foreground);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-md);
  border-bottom: 1px solid var(--border);
}
```

#### 테이블 Row
```css
.table-row {
  background: var(--background);
  padding: var(--space-md);
  border-bottom: 1px solid var(--border);
  transition: background 150ms ease;
}

.table-row:hover {
  background: var(--grey-50);
}
```

#### 테이블 Cell
```css
.table-cell {
  padding: var(--space-md);
  vertical-align: middle;
}
```

### 6. 통계 섹션 레이아웃

상단 통계 정보는 다음과 같이 가로 나열로 배치됩니다:
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│  총 125건                                               │
│  최근 1년 기준 (2025-01-16 ~ 2026-01-16)               │
│                                                         │
│  [활성 제한 45건]    [영구 제한 50건]                  │
│  ↑ 클릭 가능한 필터 버튼 (텍스트만)                    │
│                                                         │
└────────────────────────────────────────────────────────┘
```

**필터 버튼 스타일:**
```css
/* 비활성 상태 (기본) */
.filter-button {
  color: var(--foreground);
  background: transparent;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  padding: var(--space-2) var(--space-3);
  border: none;
  transition: color 150ms ease;
}

.filter-button:hover {
  color: var(--primary);
}

/* 활성 상태 */
.filter-button--active {
  color: var(--primary);
  font-weight: var(--font-weight-semibold);
}
```

### 7. 빈 상태 (Empty State) 디자인

필터 결과가 없을 때 표시되는 빈 상태:
```html
<div class="empty-state">
  <p class="empty-state__message">
    해당 조건에 맞는 제한 조치 내역이 없습니다.
  </p>
  <button class="empty-state__action" onclick="clearFilter()">
    전체 목록 보기
  </button>
</div>
```

**스타일:**
```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-4);
  min-height: 320px;
}

.empty-state__message {
  color: var(--muted-foreground);
  font-size: var(--font-size-base);
  margin-bottom: var(--space-4);
}

.empty-state__action {
  /* Button ghost variant 스타일 */
  background: transparent;
  color: var(--foreground);
  border: none;
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: background 150ms ease;
}

.empty-state__action:hover {
  background: var(--accent);
}
```

### 8. 반응형 처리
- [ ] 모바일 해상도 390px 이하에서는 일부 컬럼을 미노출
- [ ] 390px 이하에서 표시되는 컬럼: 날짜, 중개사무소, 처리 (3개만)
- [ ] 390px 이하에서 미노출되는 컬럼: 지역, 위반 정책
- [ ] 390px 이하에서 테이블 가로 스크롤 없이 자연스럽게 컬럼 너비 조정

## UI/UX 요구사항

### 레이아웃
- 데스크톱: 사이드바 + 메인 컨텐츠 영역
- 모바일: 전체 화면 (사이드바는 햄버거 메뉴로 접근)

### 컴포넌트
- **Table**: 제한 조치 목록 표시 (zigbang-design-system.json의 Table 컴포넌트 사용)
- **Text Button**: 제한 조치 유형별 통계 숫자 표시 및 필터 버튼 역할
- **Pagination**: 페이지네이션 컴포넌트
- **Typography**: 총 개수, 기간, 총 n건 등 텍스트 표시
- **Empty State**: 필터 결과가 없을 때 표시할 빈 상태 메시지

### 디자인 토큰
- **색상**: zigbang-design-system.json의 colors 토큰만 사용
  - 활성 제한: `var(--foreground)` (Grey)
  - 영구제한: `var(--destructive)` (Red)
  - 필터 활성화: `var(--primary)` (Orange)
- **타이포그래피**: Pretendard, 정의된 fontSizes/fontWeights만 사용
- **간격**: spacing 토큰 사용
- **라운드**: radius 토큰 사용

### 날짜 표기 규칙
- 날짜 형식: yyyy-mm-dd (ISO 8601 형식, 한글 기준)
- 예: 2026-01-16
- 리스팅 기간 표시: "2025-01-16 ~ 2026-01-16" 형식

### 반응형
- 모바일 기준점: 768px
- 특수 반응형: 390px 이하에서 컬럼 일부 미노출
  - 390px 이하: 날짜, 중개사무소, 처리 컬럼만 표시
  - 390px 초과: 모든 컬럼 표시

## 데이터 요구사항

### 저장해야 할 정보
각 제한 조치 내역에는 다음 정보가 포함되어야 합니다:

- 제한 조치 날짜 (제한 조치가 적용된 날짜)
- 중개사무소 이름
- 중개사무소 대표자명
- 중개사무소 소재지 (시/도, 시, 구 정보)
- 위반 정책 (안심중개사규정, 안심광고관리규정 중 하나 또는 둘 다)
- 제한 조치 유형 (경고 1회, 경고 2회, 영구제한)
- 제한 조치 분류 (활성 제한 또는 영구 제한)

### 통계 정보
페이지 상단에 표시할 통계 정보:
- 제한 조치된 중개사무소 총 개수
- 활성 제한 조치를 받은 중개사무소 개수 (경고 1회 + 경고 2회)
- 영구 제한 조치를 받은 중개사무소 개수
- 리스팅 기간 (최근 1년 기준 시작일과 종료일)

### 정렬 및 페이지네이션
- 목록은 제한 조치 날짜 기준 최신순으로 정렬되어야 함
- 한 페이지에 10개씩 표시
- 전체 개수 정보 제공 필요

## 사용자 플로우

### 기본 조회 플로우
```mermaid
flowchart TD
    A[페이지 진입] --> B[전체 제한 조치 목록 표시]
    B --> C[상단 통계 정보 확인]
    C --> D[테이블에서 목록 확인]
    D --> E[페이지네이션으로 다음 페이지 이동]
```

### 필터링 플로우
```mermaid
flowchart TD
    A[활성 제한/영구 제한 건수 클릭] --> B{필터 적용}
    B -->|활성 제한 클릭| C[활성 제한 중개사무소만 표시<br/>경고 1회, 경고 2회 포함]
    B -->|영구 제한 클릭| D[영구 제한 중개사무소만 표시]
    C --> F{결과 존재?}
    D --> F
    F -->|있음| G[테이블에 목록 표시]
    F -->|없음| H[빈 상태 메시지 표시]
    G --> I[필터 텍스트 Primary 색상으로 변경]
    H --> I
    I --> J[필터 해제 시 전체 목록으로 복귀]
```

## 우선순위

### Phase 1 (MVP)
1. 상단 통계 정보 표시 (총 개수, 기간)
2. 제한 조치 유형별 통계 및 필터 기능
3. 목록 조회 (최신순 정렬, 페이지네이션)
4. 테이블 컬럼 표시 (날짜, 중개사무소, 지역, 위반 정책, 처리)
5. 반응형 처리 (390px 이하 컬럼 미노출)
6. 빈 상태 처리

### Phase 2 (향후 고려)
1. 검색 기능 (중개사무소명, 지역 검색)
2. 상세 정보 조회 (모달 또는 별도 페이지)
3. 엑셀 다운로드
4. 추가 필터링 옵션 (지역별, 위반 정책별)
5. 날짜 범위 선택 기능

## Success Criteria

이 기능 출시 후 달성하고자 하는 목표:

- 운영 관리자가 제한 조치 현황을 5분 이내에 파악할 수 있다
- 제한 조치 유형별 현황을 클릭 한 번으로 확인할 수 있다
- 모바일 환경에서도 핵심 정보(날짜, 중개사무소, 처리)를 빠르게 확인할 수 있다
- 영구제한 조치는 시각적으로 강조되어 즉시 인지 가능하다

## 예외 처리 및 엣지 케이스

### 필터 결과가 없는 경우
- 필터를 적용했을 때 해당 조건에 맞는 중개사무소가 없는 경우:
  - 테이블 대신 빈 상태 메시지를 표시
  - 빈 상태 메시지 문구: "해당 조건에 맞는 제한 조치 내역이 없습니다."
  - "전체 목록 보기" 버튼 제공 (필터 해제)
  - 페이지네이션은 숨김 처리
  - 상단 통계 정보(총 개수, 기간)는 그대로 유지
  - 필터 버튼은 활성화 상태(Primary 색상)로 유지

### 초기 로딩 상태
- 데이터를 불러오는 중일 때는 로딩 상태를 표시
  - 테이블 영역에 스켈레톤 UI 또는 로딩 인디케이터
- 로딩 완료 후 결과가 없으면 빈 상태 메시지 표시

### 데이터가 아예 없는 경우
- 최근 1년간 제한 조치 내역이 전혀 없는 경우:
  - 빈 상태 메시지: "최근 1년간 제한 조치 내역이 없습니다."
  - 필터 버튼 비활성화 (클릭 불가)

## 참고사항

- 날짜 표기는 ISO 8601 형식(yyyy-mm-dd)을 한글 기준으로 적용
- 영구제한은 Destructive 색상으로 강조하여 사용자에게 경각심 제공
- 활성 제한(경고 1회, 2회)은 Grey 색상으로 일반적인 정보 전달
- 리스팅 기간은 최근 1년 기준이며, 필요에 따라 기간 조정 가능
- 접근 권한 관리 필요 (일부 사용자만 접근 가능할 수 있음)
- 지역 표기는 공백으로 구분하여 표시 (예: "서울 강남구")
- 처리 컬럼은 Badge 컴포넌트를 사용하지 않고 텍스트만으로 표시

## 디자인 시스템 연계

### 사용할 토큰

**Colors:**
```css
--foreground          /* 기본 텍스트, 활성 제한 */
--muted-foreground    /* 보조 텍스트, 지역 정보 */
--destructive         /* 영구제한 */
--primary             /* 필터 활성화 상태 */
--background          /* 배경 */
--muted               /* 테이블 헤더 배경 */
--grey-50             /* Row hover 배경 */
--border              /* 테이블 테두리 */
--accent              /* 빈 상태 버튼 hover */
```

**Typography:**
```css
--font-family         /* Pretendard */
--font-size-base      /* 16px - 중개사무소명 */
--font-size-sm        /* 14px - 날짜, 지역, 위반 정책, 처리 */
--font-weight-medium  /* 500 - 중개사무소명 */
--font-weight-semibold /* 600 - 테이블 헤더, 영구제한 */
```

**Spacing:**
```css
--space-md            /* 16px - 테이블 cell padding */
--space-4             /* 16px - 빈 상태 간격 */
--space-12            /* 48px - 빈 상태 padding */
```

**Components:**
- Table (zigbang-design-system.json)
- Pagination (zigbang-design-system.json)

## 변경 이력

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-01-16 | Gina | 초안 작성 |
| 2026-01-16 | Gina | 상세 요구사항 반영 (제한 조치 유형, 테이블 컬럼, 필터링, 반응형 등) |
| 2026-01-16 | Gina | 사용자 정의 수정 반영, 지역 표기 형식 수정, 필터 빈 결과 처리 규칙 추가 |
| 2026-01-16 | Gina | 페이지당 항목 수 20개에서 10개로 변경 |
| 2026-01-26 | Gina | 디자인 시스템 연계 (Active/Permanent 유형 정리, 컬러 토큰 매핑, 처리 컬럼 텍스트만 사용, 필터 활성화 Primary 색상 적용, 테이블 디자인 스펙 추가, 통계 섹션 레이아웃 정의, 빈 상태 디자인 추가) |
```

---

## 🎯 다음 단계

### 1️⃣ PRD 파일 업데이트