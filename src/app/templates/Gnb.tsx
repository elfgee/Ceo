import * as React from "react";

import { Menu, ExternalLink } from "@/app/icons/lucide";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import { Separator } from "@/app/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { CHAT_GNB_LABEL } from "@/app/routes/nav";

const DEFAULT_ITEMS = ["홈", "광고관리", "상품소개", "허위광고OUT", "마이페이지", "채팅", "DS"] as const;

export type GnbMode = "auto" | "desktop" | "mobile";

export interface GnbProps {
  activeItem?: string;
  items?: string[];
  mode?: GnbMode;
  className?: string;
  /** 모바일 햄버거/데스크톱 "전체 메뉴" 클릭 */
  onMenuClick?: () => void;
  /** 전체메뉴 Sheet를 외부에서 제어하고 싶을 때(선택) */
  allMenuOpen?: boolean;
  onAllMenuOpenChange?: (open: boolean) => void;
  /** GNB 메뉴 선택 시 네비게이션(라우팅) */
  onSelectItem?: (label: string) => void;
  /** 모바일에서 1차(GNB)+2차(LNB) 메뉴를 한번에 보여주기 위한 모델(선택) */
  mobileMenuSections?: Array<{ label: string; to: string; items: Array<{ label: string; to: string }> }>;
  /** 2차(LNB) 메뉴 선택 시 네비게이션 */
  onSelectPath?: (to: string) => void;
  /** 현재 경로(선택 스타일용) */
  currentPathname?: string;
}

function Logo() {
  return (
    <div className="flex select-none items-center gap-2 text-foreground">
      <div className="flex items-center text-xl leading-normal">
        <span className="font-bold">직방</span>
        <span className="mx-1 font-normal text-grey-300">|</span>
        <span className="font-bold">호갱노노</span>
      </div>
      <span className="text-base font-medium">CEO</span>
    </div>
  );
}

function MenuItem({
  label,
  isActive,
  hasIcon,
  hasExternalLink,
  className,
  onClick
}: {
  label: string;
  isActive?: boolean;
  hasIcon?: boolean;
  hasExternalLink?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-14 items-center justify-center px-3 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[66px]",
        className
      )}
      onClick={onClick}
    >
      {hasIcon ? <Menu className="mr-1 h-5 w-5 text-foreground" /> : null}
      <span className={cn("leading-[18px] text-foreground", isActive ? "font-bold" : "font-normal")}>{label}</span>
      {hasExternalLink ? <ExternalLink className="ml-1 h-4 w-4 text-mutedForeground" /> : null}
    </button>
  );
}

export function Gnb({ activeItem = "광고관리(등록)", items, mode = "auto", className, onMenuClick }: GnbProps) {
  const menuItems = items ?? [...DEFAULT_ITEMS];

  // auto: <768px = mobile header, >=768px = desktop header (Tailwind md breakpoint)
  const showMobile = mode === "auto" || mode === "mobile";
  const showDesktop = mode === "auto" || mode === "desktop";

  const { allMenuOpen, onAllMenuOpenChange, onSelectItem, mobileMenuSections, onSelectPath, currentPathname } =
    arguments[0];
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = typeof allMenuOpen === "boolean" ? allMenuOpen : uncontrolledOpen;
  const setOpen = (next: boolean) => {
    onMenuClick?.();
    onAllMenuOpenChange?.(next);
    if (typeof allMenuOpen !== "boolean") setUncontrolledOpen(next);
  };

  const [accordionValue, setAccordionValue] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!open) return;
    if (!mobileMenuSections?.length) return;
    if (!currentPathname) return;

    const base = "/" + currentPathname.split("/").filter(Boolean)[0];
    const hasSection = mobileMenuSections.some((s: { to: string }) => s.to === base);
    if (hasSection) setAccordionValue(base);
  }, [open, mobileMenuSections, currentPathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header className={cn("w-full border-b border-border bg-background", className)}>
      {/* Mobile */}
      {showMobile ? (
        <div className={cn(mode === "mobile" ? "" : "md:hidden")}>
          <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-4">
            <Logo />
            <button
              type="button"
              className="p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Desktop */}
      {showDesktop ? (
        <div className={cn(mode === "desktop" ? "" : "hidden md:block")}>
          <div className="mx-auto flex h-[66px] max-w-[1920px] items-center justify-center px-[30px]">
            <div className="mr-auto">
              <Logo />
            </div>

            <nav className="flex items-center" aria-label="Global navigation">
              {menuItems.map((item) => (
                <MenuItem
                  key={item}
                  label={item}
                  isActive={item === activeItem}
                  hasExternalLink={item === CHAT_GNB_LABEL}
                  onClick={() => onSelectItem?.(item)}
                />
              ))}
              <MenuItem label="전체 메뉴" hasIcon onClick={() => setOpen(true)} />
            </nav>
          </div>
        </div>
      ) : null}
      </header>

      <SheetContent side="right" className="flex h-full flex-col">
        <SheetHeader>
          <SheetTitle>전체 메뉴</SheetTitle>
          <SheetDescription>메뉴를 선택하세요.</SheetDescription>
        </SheetHeader>

        <div className="px-6">
          <Separator />
        </div>

        <nav className="flex-1 overflow-auto p-2" aria-label="All menu">
          {/* 모바일(섹션 페이지)에서는 1차+2차를 한 번에 노출 */}
          {mobileMenuSections?.length ? (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={accordionValue}
              onValueChange={(v) => setAccordionValue(v || undefined)}
            >
              {mobileMenuSections.map((sec: { label: string; to: string; items: Array<{ label: string; to: string }> }) => {
                const isSectionActive = currentPathname?.startsWith(sec.to);
                return (
                  <AccordionItem key={sec.to} value={sec.to}>
                    <AccordionTrigger className={cn("px-2", isSectionActive && "text-foreground")}>
                      <span className={cn("text-sm font-semibold", isSectionActive ? "text-foreground" : "text-foreground")}>
                        {sec.label}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <div className="grid gap-1 px-1">
                        {sec.items.map((it: { label: string; to: string }) => {
                          const isActive = currentPathname === it.to;
                          return (
                            <SheetClose asChild key={it.to}>
                              <button
                                type="button"
                                className={cn(
                                  "flex w-full items-center rounded-button px-3 py-2 text-sm font-semibold transition-colors",
                                  isActive ? "bg-grey-100 text-zigbangOrange600" : "text-grey-500 hover:bg-grey-200"
                                )}
                                onClick={() => {
                                  onSelectPath?.(it.to);
                                  setOpen(false);
                                }}
                              >
                                {it.label}
                              </button>
                            </SheetClose>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            // 기본(홈/템플릿 등): 기존처럼 1차(GNB)만 노출
            menuItems.map((item) => (
              <SheetClose asChild key={item}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center rounded-button px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    item === activeItem && "bg-muted"
                  )}
                  onClick={() => {
                    onSelectItem?.(item);
                    setOpen(false);
                  }}
                >
                  <span>{item}</span>
                  {item === CHAT_GNB_LABEL && <ExternalLink className="ml-1 h-4 w-4 text-mutedForeground" />}
                </button>
              </SheetClose>
            ))
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function GnbTemplate() {
  return (
    <div className="flex w-full flex-col gap-10 bg-canvas-100 p-8">
      <section className="grid gap-2">
        <h3 className="text-sm font-medium text-mutedForeground">Variant 1: Desktop (Default Active)</h3>
        <div className="overflow-hidden rounded-card border border-border bg-background">
          <Gnb mode="desktop" activeItem="광고관리(등록)" />
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="text-sm font-medium text-mutedForeground">Variant 2: Desktop (Home Active)</h3>
        <div className="overflow-hidden rounded-card border border-border bg-background">
          <Gnb mode="desktop" activeItem="홈" />
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="text-sm font-medium text-mutedForeground">Variant 3: Mobile View (&lt;768px)</h3>
        <div className="mx-auto w-full max-w-[375px] overflow-hidden rounded-card border border-border bg-background sm:mx-0">
          <Gnb mode="mobile" />
        </div>
      </section>
    </div>
  );
}

