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

