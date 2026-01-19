# Ceo

React(+TypeScript) + Vite 기반의 반응형 웹 프로젝트입니다.

이 프로젝트의 UI/UX는 **반드시** `zigbang-design-system.json`을 단일 기준으로 사용합니다. (Cursor Rule 적용)

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드/프리뷰

```bash
npm run build
npm run preview
```

## 스타일/디자인 시스템 (Zigbang DS)

- **Tailwind CSS v4** 기반으로 구성됩니다.
- DS 토큰은 `src/styles/global.css`의 CSS 변수로 매핑되어 있으며, Tailwind에서도 해당 토큰 이름으로 사용합니다.
  - 예: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-primaryForeground`
- 컴포넌트는 DS에 정의된 경로를 따릅니다.
  - 예: `src/app/components/ui/button.tsx`, `src/app/components/ui/card.tsx`, `src/app/components/ui/badge.tsx`

### 절대 금지 (요약)

- `zigbang-design-system.json`에 없는 **색상/폰트/라운드**를 새로 만들지 않기
- `components[]`에 없는 컴포넌트를 새로 만들지 않기
- 각 컴포넌트의 `variants[].props` 밖의 variant/props 조합을 만들지 않기

## 아이콘 (Lucide)

- 아이콘 라이브러리: **Lucide** (`lucide-react`)
- 권장 import 경로: `src/app/icons/lucide.ts`
- 색상은 DS 토큰 컬러만 사용:
  - 예: `<Search className="h-4 w-4 text-foreground" />`

## 컬러 토큰 (Figma 기준 보강)

- Figma의 Zigbang Orange 컬러 스케일(50~900)을 `zigbang-design-system.json.colors`에 추가했습니다.
  - Tailwind 사용 예: `bg-zigbangOrange600`, `text-zigbangOrange700`

## 추가 토큰 (Canvas / Grey)

- `canvas-50`, `canvas-100` 토큰을 추가했습니다.
  - 사용 예: `bg-canvas-50`
- Tailwind 기본 Gray 팔레트 값으로 `grey-50~900` 토큰을 추가했습니다.
  - 사용 예: `text-grey-700`, `bg-grey-50`
  - 기준: Tailwind Colors 문서([Tailwind v3 Colors](https://v3.tailwindcss.com/docs/colors?utm_source=openai))

## 반응형 규칙 (기본)

- **모바일 기준점**: width `768px`
- `>= 768px`: 데스크톱 레이아웃
- `< 768px`: 모바일 레이아웃

해당 규칙은 Tailwind의 기본 브레이크포인트(`md = 768px`)를 사용합니다.
예: `grid-cols-1 md:grid-cols-2`

## 기본 폴더 구조

```
.
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ vercel.json
└─ src
   ├─ main.tsx
   ├─ App.tsx
   ├─ pages
   │  └─ Home.tsx
   ├─ components
   ├─ hooks
   │  └─ useViewport.ts
   ├─ lib
   └─ styles
      └─ global.css
```

## Vercel 배포 (GitHub 연동)

1. GitHub의 `elfgee/Ceo` 저장소에서 **기본 브랜치가 `master`**인지 확인합니다.
2. Vercel에서 **New Project** → GitHub 저장소 `elfgee/Ceo`를 Import 합니다.
3. Framework Preset은 **Vite**를 선택합니다.
4. 아래 설정을 확인합니다.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Deploy를 누르면, 이후 **master 브랜치 push마다 자동 배포**됩니다.

> SPA 라우팅 대응을 위해 `vercel.json`에 rewrite 규칙이 포함되어 있습니다.

## GitHub 첫 푸시 (master만 사용)

로컬에서 다음을 실행하면 `master` 브랜치로 최초 푸시가 됩니다.

```bash
git init
git branch -M master
git remote add origin git@github.com:elfgee/Ceo.git
git add .
git commit -m "chore: bootstrap vite + react"
git push -u origin master
```

