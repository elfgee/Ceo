import type { SideNavItem } from "@/app/templates/SideMenuBar";

export const CHAT_GNB_LABEL = "채팅" as const;

export const GNB_ROUTES = {
  "홈": "/",
  "광고관리": "/ads",
  "상품소개": "/products",
  "마이페이지": "/mypage",
  "허위광고OUT": "/fake-ads-out",
  [CHAT_GNB_LABEL]: "__external__"
} as const;

export type GnbLabel = keyof typeof GNB_ROUTES;

export function getGnbPath(label: string) {
  return (GNB_ROUTES as Record<string, string>)[label] ?? "/";
}

export function openChatInNewTab() {
  const url = import.meta.env.VITE_CHAT_URL as string | undefined;
  const chatUrl = url || "https://talk-ceo.zigbang.com";
  window.open(chatUrl, "_blank", "noopener,noreferrer");
}

// 요청된 IA 기준 LNB(2nd/3rd depth) 구성
export const LNB_BY_GNB: Record<string, { title: string; items: SideNavItem[] }> = {
  "/ads": {
    title: "광고관리",
    items: [
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
    ]
  },
  "/products": {
    title: "상품소개",
    items: [
      { id: "products-apartment", label: "아파트 광고", to: "/products/apartment" },
      { id: "products-oneroom", label: "원룸 광고", to: "/products/oneroom" },
      { id: "products-officetel", label: "오피스텔 광고", to: "/products/officetel" },
      { id: "products-villa", label: "빌라 광고", to: "/products/villa" }
    ]
  },
  "/mypage": {
    title: "마이페이지",
    items: [
      { id: "mypage-account", label: "회원/사업자 정보", to: "/mypage/account" },
      { id: "mypage-office", label: "중개사무소 프로필 관리", to: "/mypage/office" },
      { id: "mypage-contacts", label: "연락처 관리", to: "/mypage/contacts" },
      { id: "mypage-policy-violations", label: "정책 위반 내역", to: "/mypage/policy-violations" },
      { id: "mypage-usage", label: "상품 이용 현황", to: "/mypage/usage" },
      { id: "mypage-payments", label: "상품 결제", to: "/mypage/payments" },
      { id: "mypage-tax-invoices", label: "세금 계산서 발행 내역", to: "/mypage/tax-invoices" }
    ]
  },
  "/fake-ads-out": {
    title: "허위광고OUT",
    items: [
      { id: "fake-ads-out-restrictions", label: "전체 중개사무소 제한조치 현황", to: "/fake-ads-out/restrictions" },
      { id: "fake-ads-out-policy", label: "안심 운영 정책", to: "/fake-ads-out/policy" }
    ]
  },
  "/design-system": {
    title: "Design System",
    items: [
      {
        id: "ds-components",
        label: "Components",
        to: "/design-system/components",
        children: [
          { id: "ds-accordion", label: "Accordion", to: "/design-system/components/accordion" },
          { id: "ds-avatar", label: "Avatar", to: "/design-system/components/avatar" },
          { id: "ds-badge", label: "Badge", to: "/design-system/components/badge" },
          { id: "ds-breadcrumb", label: "Breadcrumb", to: "/design-system/components/breadcrumb" },
          { id: "ds-button", label: "Button", to: "/design-system/components/button" },
          { id: "ds-calendar", label: "Calendar", to: "/design-system/components/calendar" },
          { id: "ds-card", label: "Card", to: "/design-system/components/card" },
          { id: "ds-carousel", label: "Carousel", to: "/design-system/components/carousel" },
          { id: "ds-checkbox", label: "Checkbox", to: "/design-system/components/checkbox" },
          { id: "ds-dialog", label: "Dialog", to: "/design-system/components/dialog" },
          { id: "ds-drawer", label: "Drawer", to: "/design-system/components/drawer" },
          { id: "ds-form", label: "Form", to: "/design-system/components/form" },
          { id: "ds-input", label: "Input", to: "/design-system/components/input" },
          { id: "ds-label", label: "Label", to: "/design-system/components/label" },
          { id: "ds-pagination", label: "Pagination", to: "/design-system/components/pagination" },
          { id: "ds-popover", label: "Popover", to: "/design-system/components/popover" },
          { id: "ds-progress", label: "Progress", to: "/design-system/components/progress" },
          { id: "ds-radio-group", label: "RadioGroup", to: "/design-system/components/radio-group" },
          { id: "ds-scroll-area", label: "ScrollArea", to: "/design-system/components/scroll-area" },
          { id: "ds-select", label: "Select", to: "/design-system/components/select" },
          { id: "ds-separator", label: "Separator", to: "/design-system/components/separator" },
          { id: "ds-sheet", label: "Sheet", to: "/design-system/components/sheet" },
          { id: "ds-skeleton", label: "Skeleton", to: "/design-system/components/skeleton" },
          { id: "ds-slider", label: "Slider", to: "/design-system/components/slider" },
          { id: "ds-switch", label: "Switch", to: "/design-system/components/switch" },
          { id: "ds-table", label: "Table", to: "/design-system/components/table" },
          { id: "ds-tabs", label: "Tabs", to: "/design-system/components/tabs" },
          { id: "ds-tabs-underline", label: "Tabs Underline", to: "/design-system/components/tabs-underline" },
          { id: "ds-textarea", label: "Textarea", to: "/design-system/components/textarea" },
          { id: "ds-toast-sonnar", label: "Toast/Sonnar", to: "/design-system/components/alert" },
          { id: "ds-toggle", label: "Toggle", to: "/design-system/components/toggle" },
          { id: "ds-toggle-group", label: "ToggleGroup", to: "/design-system/components/toggle-group" },
          { id: "ds-tooltip", label: "Tooltip", to: "/design-system/components/tooltip" }
        ]
      },
      {
        id: "ds-foundation",
        label: "Foundation",
        to: "/design-system/foundation",
        children: [
          { id: "ds-colors", label: "Colors", to: "/design-system/foundation/colors" },
          { id: "ds-typography", label: "Typography", to: "/design-system/foundation/typography" },
          { id: "ds-spacing", label: "Spacing & Radius", to: "/design-system/foundation/spacing" }
        ]
      },
      {
        id: "ds-templates",
        label: "Templates",
        to: "/design-system/templates",
        children: [
          { id: "ds-content-area-header", label: "ContentAreaHeader", to: "/design-system/templates/content-area-header" },
          { id: "ds-gnb", label: "Gnb", to: "/design-system/templates/gnb" },
          { id: "ds-side-menu-bar", label: "SideMenuBar", to: "/design-system/templates/side-menu-bar" },
          { id: "ds-danji-item-card", label: "DanjiItemCard", to: "/design-system/templates/danji-item-card" }
        ]
      }
    ]
  }
};

export function getLnbConfig(pathname: string) {
  const base = "/" + pathname.split("/").filter(Boolean)[0];
  return LNB_BY_GNB[base] ?? null;
}

export type MobileMenuSection = {
  label: string; // 1st depth (GNB)
  to: string;
  items: Array<{ label: string; to: string }>; // 2nd depth only
};

export function getMobileMenuSections(): MobileMenuSection[] {
  const entries = Object.entries(GNB_ROUTES) as Array<[string, string]>;

  return entries
    .filter(([, to]) => to !== "/" && to !== "__external__")
    .map(([label, to]) => {
      const lnb = LNB_BY_GNB[to];
      const items =
        lnb?.items
          ?.map((i) => ({ label: i.label, to: i.to }))
          .filter((x): x is { label: string; to: string } => typeof x.to === "string" && x.to.length > 0) ?? [];

      return { label, to, items };
    });
}

