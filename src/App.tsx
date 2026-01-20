import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Gnb } from "@/app/templates/Gnb";
import { ContentAreaHeader } from "@/app/templates/ContentAreaHeader";
import { SideMenuBar } from "@/app/templates/SideMenuBar";
import { CHAT_GNB_LABEL, getGnbPath, getLnbConfig, getMobileMenuSections, openChatInNewTab } from "@/app/routes/nav";
import { useAuth } from "@/app/auth/auth";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { EmptyContent } from "@/pages/EmptyContent";
import { TownpickMessage } from "@/pages/TownpickMessage";
import { Restrictions } from "@/pages/Restrictions";

// Design System
import { FoundationColors } from "@/pages/design-system/FoundationColors";
import { FoundationTypography } from "@/pages/design-system/FoundationTypography";
import { FoundationSpacing } from "@/pages/design-system/FoundationSpacing";
import { ComponentButton } from "@/pages/design-system/ComponentButton";
import { ComponentPagination } from "@/pages/design-system/ComponentPagination";
import { ComponentTabs } from "@/pages/design-system/ComponentTabs";
import { ComponentTabsUnderline } from "@/pages/design-system/ComponentTabsUnderline";
import { ComponentPlaceholder } from "@/pages/design-system/ComponentPlaceholder";
import { TemplateContentAreaHeader } from "@/pages/design-system/TemplateContentAreaHeader";
import { TemplateGnb } from "@/pages/design-system/TemplateGnb";
import { TemplateSideMenuBar } from "@/pages/design-system/TemplateSideMenuBar";
import { TemplateDanjiItemCard } from "@/pages/design-system/TemplateDanjiItemCard";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* 네비게이션/레이아웃 확인용: 홈도 컨텐츠 비움 */}
        <Route index element={<EmptyContent />} />

        {/* Ads */}
        <Route path="ads" element={<SectionShell />}>
          <Route index element={<Navigate to="/ads/apartment" replace />} />
          <Route path="apartment" element={<EmptyContent />} />
          <Route path="apartment/items" element={<EmptyContent />} />
          <Route path="apartment/pro-danji" element={<EmptyContent />} />
          <Route path="oneroom" element={<EmptyContent />} />
          <Route path="officetel" element={<EmptyContent />} />
          <Route path="villa" element={<EmptyContent />} />
          <Route path="townpick" element={<EmptyContent />} />
        <Route path="townpick/message" element={<TownpickMessage />} />
          <Route path="townpick/history" element={<EmptyContent />} />
        </Route>

        {/* Products */}
        <Route path="products" element={<SectionShell />}>
          <Route index element={<Navigate to="/products/apartment" replace />} />
          <Route path="apartment" element={<EmptyContent />} />
          <Route path="oneroom" element={<EmptyContent />} />
          <Route path="officetel" element={<EmptyContent />} />
          <Route path="villa" element={<EmptyContent />} />
        </Route>

        {/* My page */}
        <Route path="mypage" element={<SectionShell />}>
          <Route index element={<Navigate to="/mypage/account" replace />} />
          <Route path="account" element={<EmptyContent />} />
          <Route path="office" element={<EmptyContent />} />
          <Route path="contacts" element={<EmptyContent />} />
          <Route path="policy-violations" element={<EmptyContent />} />
          <Route path="usage" element={<EmptyContent />} />
          <Route path="payments" element={<EmptyContent />} />
          <Route path="tax-invoices" element={<EmptyContent />} />
        </Route>

        {/* 허위광고OUT */}
        <Route path="fake-ads-out" element={<SectionShell />}>
          <Route index element={<Navigate to="/fake-ads-out/restrictions" replace />} />
          <Route path="restrictions" element={<Restrictions />} />
          <Route path="policy" element={<EmptyContent />} />
        </Route>

        {/* Design System */}
        <Route path="design-system" element={<SectionShell />}>
          <Route index element={<Navigate to="/design-system/foundation/colors" replace />} />
          
          {/* Foundation */}
          <Route path="foundation">
            <Route index element={<Navigate to="/design-system/foundation/colors" replace />} />
            <Route path="colors" element={<FoundationColors />} />
            <Route path="typography" element={<FoundationTypography />} />
            <Route path="spacing" element={<FoundationSpacing />} />
          </Route>

          {/* Components */}
          <Route path="components">
            <Route index element={<Navigate to="/design-system/components/button" replace />} />
            <Route path="sidebar" element={<Navigate to="/design-system/components" replace />} />
            <Route path="navigation-menu" element={<Navigate to="/design-system/components" replace />} />
            <Route path="context-menu" element={<Navigate to="/design-system/components" replace />} />
            <Route path="command" element={<Navigate to="/design-system/components" replace />} />
            <Route path="dropdown-menu" element={<Navigate to="/design-system/components" replace />} />
            <Route path="menubar" element={<Navigate to="/design-system/components" replace />} />
            <Route path="hover-card" element={<Navigate to="/design-system/components" replace />} />
            <Route path="accordion" element={<ComponentPlaceholder name="Accordion" />} />
            <Route path="alert" element={<ComponentPlaceholder name="Toast/Sonnar" />} />
            <Route path="avatar" element={<ComponentPlaceholder name="Avatar" />} />
            <Route path="badge" element={<ComponentPlaceholder name="Badge" />} />
            <Route path="breadcrumb" element={<ComponentPlaceholder name="Breadcrumb" />} />
            <Route path="button" element={<ComponentButton />} />
            <Route path="calendar" element={<ComponentPlaceholder name="Calendar" />} />
            <Route path="card" element={<ComponentPlaceholder name="Card" />} />
            <Route path="carousel" element={<ComponentPlaceholder name="Carousel" />} />
            <Route path="checkbox" element={<ComponentPlaceholder name="Checkbox" />} />
            <Route path="dialog" element={<ComponentPlaceholder name="Dialog" />} />
            <Route path="drawer" element={<ComponentPlaceholder name="Drawer" />} />
            <Route path="form" element={<ComponentPlaceholder name="Form" />} />
            <Route path="input" element={<ComponentPlaceholder name="Input" />} />
            <Route path="label" element={<ComponentPlaceholder name="Label" />} />
            <Route path="pagination" element={<ComponentPagination />} />
            <Route path="popover" element={<ComponentPlaceholder name="Popover" />} />
            <Route path="progress" element={<ComponentPlaceholder name="Progress" />} />
            <Route path="radio-group" element={<ComponentPlaceholder name="RadioGroup" />} />
            <Route path="scroll-area" element={<ComponentPlaceholder name="ScrollArea" />} />
            <Route path="select" element={<ComponentPlaceholder name="Select" />} />
            <Route path="separator" element={<ComponentPlaceholder name="Separator" />} />
            <Route path="sheet" element={<ComponentPlaceholder name="Sheet" />} />
            <Route path="skeleton" element={<ComponentPlaceholder name="Skeleton" />} />
            <Route path="slider" element={<ComponentPlaceholder name="Slider" />} />
            <Route path="switch" element={<ComponentPlaceholder name="Switch" />} />
            <Route path="table" element={<ComponentPlaceholder name="Table" />} />
            <Route path="tabs" element={<ComponentTabs />} />
            <Route path="tabs-underline" element={<ComponentTabsUnderline />} />
            <Route path="textarea" element={<ComponentPlaceholder name="Textarea" />} />
            <Route path="toggle" element={<ComponentPlaceholder name="Toggle" />} />
            <Route path="toggle-group" element={<ComponentPlaceholder name="ToggleGroup" />} />
            <Route path="tooltip" element={<ComponentPlaceholder name="Tooltip" />} />
          </Route>

          {/* Templates */}
          <Route path="templates">
            <Route index element={<Navigate to="/design-system/templates/content-area-header" replace />} />
            <Route path="content-area-header" element={<TemplateContentAreaHeader />} />
            <Route path="gnb" element={<TemplateGnb />} />
            <Route path="side-menu-bar" element={<TemplateSideMenuBar />} />
            <Route path="danji-item-card" element={<TemplateDanjiItemCard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function RootLayout() {
  return <Outlet />;
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const base = "/" + location.pathname.split("/").filter(Boolean)[0];
  const isSection = base === "/ads" || base === "/products" || base === "/mypage" || base === "/fake-ads-out";
  const mobileSections = isSection ? getMobileMenuSections() : undefined;

  // GNB active label 계산(간단히 base path로 역매핑)
  const activeGnb =
    Object.entries({
      "/": "홈",
      "/products": "상품소개",
      "/ads": "광고관리",
      "/mypage": "마이페이지",
      "/fake-ads-out": "허위광고OUT",
      "/design-system": "DS"
    }).find(([p]) => p === base)?.[1] ?? "홈";

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Gnb
        activeItem={activeGnb}
        onSelectItem={(label) => {
          if (label === CHAT_GNB_LABEL) {
            openChatInNewTab();
            return;
          }
          navigate(getGnbPath(label));
        }}
        onSelectPath={(to) => navigate(to)}
        mobileMenuSections={mobileSections}
        currentPathname={location.pathname}
        className="shrink-0"
      />
      <div className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

function HomeGate() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Dashboard /> : <Login />;
}

function getSelectedMenuLabel(pathname: string, lnb: ReturnType<typeof getLnbConfig>) {
  if (!lnb?.items?.length) return undefined;

  const candidates: Array<{ label: string; to?: string }> = [];
  lnb.items.forEach((item) => {
    candidates.push({ label: item.label, to: item.to });
    item.children?.forEach((child) => candidates.push({ label: child.label, to: child.to }));
  });

  const matches = candidates.filter((c) => c.to && (pathname === c.to || pathname.startsWith(c.to + "/")));
  if (!matches.length) return undefined;

  return matches.sort((a, b) => (b.to?.length ?? 0) - (a.to?.length ?? 0))[0]?.label;
}

function SectionShell() {
  const location = useLocation();
  const lnb = getLnbConfig(location.pathname);
  const selectedMenuLabel = getSelectedMenuLabel(location.pathname, lnb);

  return (
    <div className="h-full flex max-w-[1920px] mx-auto">
      {/* LNB는 데스크톱(>=768)까지 고정 폭, 컨텐츠만 가변 */}
      {lnb ? <SideMenuBar title={lnb.title} items={lnb.items} className="hidden md:flex shrink-0" /> : null}
      <main className="flex-1 min-w-0 min-h-0 h-full overflow-auto">
        <div className="w-full h-fit">
          <ContentAreaHeader title={selectedMenuLabel ?? lnb?.title ?? ""} />
          <div className="bg-background md:bg-canvas-100">
            <div className="w-full max-w-[1080px] mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

