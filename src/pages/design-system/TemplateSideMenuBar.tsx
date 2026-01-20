import * as React from "react";
import { SideMenuBar } from "@/app/templates/SideMenuBar";
import type { SideNavItem } from "@/app/templates/SideMenuBar";

// Demo를 위한 custom wrapper - 실제 Link 대신 스타일만 적용
function DemoSideMenuBar() {
  const [activePath, setActivePath] = React.useState("/ads/apartment/items");

  const demoItems: SideNavItem[] = [
    {
      id: "ads-apartment",
      label: "아파트",
      to: "/ads/apartment",
      children: [
        { id: "ads-apartment-items", label: "아파트 광고 매물", to: "/ads/apartment/items" },
        { id: "ads-apartment-pro-danji", label: "아파트 프로 단지", to: "/ads/apartment/pro-danji" }
      ]
    },
    { id: "ads-oneroom", label: "원룸", to: "/ads/oneroom" },
    { id: "ads-officetel", label: "오피스텔", to: "/ads/officetel" },
    { id: "ads-villa", label: "빌라", to: "/ads/villa" },
    {
      id: "ads-townpick",
      label: "동네픽",
      to: "/ads/townpick",
      children: [
        { id: "ads-townpick-message", label: "동네픽 메시지 작성", to: "/ads/townpick/message" },
        { id: "ads-townpick-history", label: "동네픽 발송 이력", to: "/ads/townpick/history" }
      ]
    }
  ];

  const isActive = (path: string) => activePath === path;
  const hasActiveChild = (children?: SideNavItem[]) => {
    return children?.some((child) => child.to && activePath === child.to);
  };

  return (
    <div className="h-full w-72 rounded-none border-0 border-r border-border flex flex-col bg-background">
      <div className="py-2 px-5 shrink-0 h-[60px] border-b-0">
        <div className="flex h-12 items-center rounded px-3 text-base font-bold leading-6 text-grey-500">광고관리</div>
      </div>

      <div className="p-0 flex-1 min-h-0 overflow-y-auto">
        <div className="grid gap-1 px-5">
          {demoItems.map((item) => {
            const itemHasActiveChild = hasActiveChild(item.children);
            const isDirectlyActive = !item.children && item.to ? isActive(item.to) : false;

            return (
              <div key={item.id} className="grid gap-1">
                <button
                  type="button"
                  onClick={() => item.to && setActivePath(item.to)}
                  className={`flex h-10 items-center rounded px-2 pl-9 text-sm font-semibold leading-5 transition-colors text-left ${
                    isDirectlyActive && !itemHasActiveChild
                      ? "bg-grey-100 text-zigbangOrange600"
                      : itemHasActiveChild
                        ? "text-zigbangOrange600"
                        : "text-grey-500 hover:bg-grey-200"
                  }`}
                >
                  {item.label}
                </button>
                {item.children?.length ? (
                  <div className="grid gap-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => child.to && setActivePath(child.to)}
                        className={`flex h-10 items-center rounded px-2 pl-12 text-sm font-semibold leading-5 transition-colors text-left ${
                          child.to && isActive(child.to)
                            ? "bg-grey-100 text-zigbangOrange600"
                            : "text-grey-500 hover:bg-grey-200"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5 shrink-0 bg-background border-t border-border">
        <div className="text-xs text-mutedForeground text-center">Footer 영역 (생략)</div>
      </div>
    </div>
  );
}

const SAMPLE_ITEMS: SideNavItem[] = [
  {
    id: "ads-apartment",
    label: "아파트",
    to: "/ads/apartment",
    children: [
      { id: "ads-apartment-items", label: "아파트 광고 매물", to: "/ads/apartment/items" },
      { id: "ads-apartment-pro-danji", label: "아파트 프로 단지", to: "/ads/apartment/pro-danji" }
    ]
  },
  { id: "ads-oneroom", label: "원룸", to: "/ads/oneroom" },
  { id: "ads-officetel", label: "오피스텔", to: "/ads/officetel" },
  { id: "ads-villa", label: "빌라", to: "/ads/villa" },
  {
    id: "ads-townpick",
    label: "동네픽",
    to: "/ads/townpick",
    children: [
      { id: "ads-townpick-message", label: "동네픽 메시지 작성", to: "/ads/townpick/message" },
      { id: "ads-townpick-history", label: "동네픽 발송 이력", to: "/ads/townpick/history" }
    ]
  }
];

export function TemplateSideMenuBar() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">SideMenuBar (LNB)</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          로컬 네비게이션 바(LNB) 템플릿입니다. 2depth, 3depth 메뉴를 지원합니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Interactive Example</h2>
          <p className="text-sm font-normal leading-5 text-mutedForeground">
            기본 선택: <span className="font-semibold text-foreground">아파트 광고 매물</span>
          </p>
          <div className="overflow-hidden rounded-[6px] border border-border bg-background">
            <div className="flex h-[600px]">
              <DemoSideMenuBar />
              <div className="flex-1 flex items-center justify-center p-8 bg-canvas-100">
                <div className="text-center">
                  <p className="text-sm text-mutedForeground mb-2">메인 콘텐츠 영역</p>
                  <p className="text-xs text-mutedForeground">좌측 메뉴를 클릭하면 상태가 변경됩니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Actual Component</h2>
          <p className="text-sm font-normal leading-5 text-mutedForeground">
            실제 라우터와 연동된 SideMenuBar 컴포넌트 (현재 페이지 기준)
          </p>
          <div className="overflow-hidden rounded-[6px] border border-border bg-background">
            <div className="flex h-[600px]">
              <SideMenuBar title="광고관리" items={SAMPLE_ITEMS} />
              <div className="flex-1 flex items-center justify-center p-8 bg-canvas-100">
                <div className="text-center">
                  <p className="text-sm text-mutedForeground mb-2">메인 콘텐츠 영역</p>
                  <p className="text-xs text-mutedForeground">실제 라우터 연동 버전</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Menu States</h2>
          <div className="flex flex-col gap-3 p-6 border border-border rounded-[6px] bg-background">
            <div className="grid gap-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">2nd Depth (L2) States</h3>
              
              <div className="flex flex-col gap-2">
                <div className="text-xs text-mutedForeground mb-1">Default:</div>
                <div className="flex h-10 items-center rounded px-2 pl-9 text-sm font-semibold leading-5 text-grey-500">
                  원룸
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-mutedForeground mb-1">Hover:</div>
                <div className="flex h-10 items-center rounded px-2 pl-9 text-sm font-semibold leading-5 text-grey-500 bg-grey-200">
                  원룸
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-mutedForeground mb-1">Has Active Child:</div>
                <div className="flex h-10 items-center rounded px-2 pl-9 text-sm font-semibold leading-5 text-zigbangOrange600">
                  아파트
                </div>
              </div>
            </div>

            <div className="my-2 border-t border-border" />

            <div className="grid gap-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">3rd Depth (L3) States</h3>
              
              <div className="flex flex-col gap-2">
                <div className="text-xs text-mutedForeground mb-1">Default:</div>
                <div className="flex h-10 items-center rounded px-2 pl-12 text-sm font-semibold leading-5 text-grey-500">
                  아파트 프로 단지
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-mutedForeground mb-1">Hover:</div>
                <div className="flex h-10 items-center rounded px-2 pl-12 text-sm font-semibold leading-5 text-grey-500 bg-grey-200">
                  아파트 프로 단지
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-mutedForeground mb-1">Selected (Active):</div>
                <div className="flex h-10 items-center rounded px-2 pl-12 text-sm font-semibold leading-5 bg-grey-100 text-zigbangOrange600">
                  아파트 광고 매물
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Features</h2>
          <div className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
              <li>고정 너비 288px (w-72)</li>
              <li>2depth/3depth 메뉴 구조 지원</li>
              <li>활성 메뉴 자동 표시 (React Router NavLink 활용)</li>
              <li>스크롤 가능한 메뉴 영역</li>
              <li>하단 Footer: 외부 링크 버튼 + 고객센터 정보 카드</li>
              <li>부모 메뉴가 자식 메뉴의 활성 상태를 반영</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Menu Hierarchy</h2>
          <div className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
            <div className="text-sm text-foreground">
              <div className="font-bold mb-2">구조:</div>
              <div className="ml-4">
                <div className="font-semibold text-grey-500">L1 (Header): 섹션 제목</div>
                <div className="ml-4">
                  <div className="font-semibold text-grey-500">L2: 2depth 메뉴 (부모)</div>
                  <div className="ml-4">
                    <div className="text-grey-500">L3: 3depth 메뉴 (자식)</div>
                    <div className="text-grey-500">L3: 3depth 메뉴 (자식)</div>
                  </div>
                  <div className="font-semibold text-grey-500">L2: 2depth 메뉴 (단독)</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
