import * as React from "react";
import { Gnb } from "@/app/templates/Gnb";

export function TemplateGnb() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Gnb (Global Navigation Bar)</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          전역 네비게이션 바 템플릿입니다. 데스크톱과 모바일 모드를 지원합니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Desktop Mode (Default Active)</h2>
          <div className="overflow-hidden rounded-[6px] border border-border bg-background">
            <Gnb mode="desktop" activeItem="광고관리" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Desktop Mode (Home Active)</h2>
          <div className="overflow-hidden rounded-[6px] border border-border bg-background">
            <Gnb mode="desktop" activeItem="홈" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Mobile Mode (&lt;768px)</h2>
          <p className="text-sm font-normal leading-5 text-mutedForeground">
            모바일 환경 시뮬레이션 (375px 너비)
          </p>
          <div className="mx-auto w-full max-w-[375px] overflow-hidden rounded-[6px] border-2 border-grey-300 bg-background shadow-lg">
            <Gnb mode="mobile" activeItem="광고관리" />
            <div className="h-40 bg-canvas-100 flex items-center justify-center">
              <p className="text-sm text-mutedForeground">모바일 콘텐츠 영역</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Features</h2>
          <div className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
              <li>반응형 디자인: 768px 기준으로 데스크톱/모바일 전환</li>
              <li>활성 메뉴 표시: activeItem prop으로 현재 활성 메뉴 표시</li>
              <li>전체 메뉴: Sheet 컴포넌트로 구현된 전체 메뉴 모달</li>
              <li>외부 링크 표시: 채팅 메뉴는 외부 링크 아이콘 표시</li>
              <li>모바일 메뉴: 햄버거 아이콘으로 전체 메뉴 열기</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
