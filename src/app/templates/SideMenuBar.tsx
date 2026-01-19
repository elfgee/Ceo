import * as React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/app/components/ui/sidebar";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import { ChevronRight, ExternalLink } from "@/app/icons/lucide";
import { Card, CardContent } from "@/app/components/ui/card";

export type SideNavItem = {
  id: string;
  label: string;
  to?: string;
  children?: SideNavItem[];
};

export type SideMenuBarProps = {
  title?: string;
  items: SideNavItem[];
  className?: string;
};

function L1({ label }: { label: string }) {
  return (
    <div className="flex h-12 items-center rounded px-3 text-base font-bold leading-6 text-grey-500">{label}</div>
  );
}

function L2Link({ item }: { item: SideNavItem }) {
  const location = useLocation();
  const hasChildren = !!item.children?.length;
  const firstChildTo = item.children?.find((child) => child.to)?.to;
  const linkTo = hasChildren ? firstChildTo : item.to;
  
  // 자식 중 하나가 active인지 확인
  const hasActiveChild = item.children?.some((child) => {
    if (!child.to) return false;
    return location.pathname === child.to || location.pathname.startsWith(child.to + "/");
  });

  // 2nd depth가 직접 active인지 확인 (정확히 일치하는 경우만)
  const isDirectlyActive = !hasChildren && item.to ? location.pathname === item.to : false;

  if (!linkTo) {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded px-2 pl-9 text-sm font-semibold leading-5 transition-colors",
          hasActiveChild ? "text-zigbangOrange600" : "text-grey-500"
        )}
      >
        {item.label}
      </div>
    );
  }

  return (
    <Link
      to={linkTo}
      className={cn(
        "flex h-10 items-center rounded px-2 pl-9 text-sm font-semibold leading-5 transition-colors",
        isDirectlyActive && !hasActiveChild
          ? "bg-grey-100 text-zigbangOrange600"
          : hasActiveChild
            ? "text-zigbangOrange600"
            : "text-grey-500 hover:bg-grey-200"
      )}
    >
      {item.label}
    </Link>
  );
}

function L3Link({ item }: { item: SideNavItem }) {
  if (!item.to) return null;
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          "flex h-10 items-center rounded px-2 pl-12 text-sm font-semibold leading-5 transition-colors",
          isActive ? "bg-grey-100 text-zigbangOrange600" : "text-grey-500 hover:bg-grey-200"
        )
      }
    >
      {item.label}
    </NavLink>
  );
}

export function SideMenuBar({ title = "LNB menu item", items, className }: SideMenuBarProps) {
  return (
    <Sidebar className={cn("h-full w-72 rounded-none border-0 border-r border-border flex flex-col", className)}>
      <SidebarHeader className="py-2 px-5 shrink-0 h-[60px] border-b-0">
        <L1 label={title} />
      </SidebarHeader>

      <SidebarContent className="p-0 flex-1 min-h-0 overflow-y-auto">
        <div className="grid gap-1 px-5">
          {items.map((item) => (
            <div key={item.id} className="grid gap-1">
              <L2Link item={item} />
              {item.children?.length ? (
                <div className="grid gap-1">
                  {item.children.map((c) => (
                    <L3Link key={c.id} item={c} />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="p-5 shrink-0 bg-background border-t border-border">
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-between">
            <span className="inline-flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              직방 서비스 바로가기
            </span>
            <ChevronRight className="h-4 w-4 text-mutedForeground" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span className="inline-flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              호갱노노 서비스 바로가기
            </span>
            <ChevronRight className="h-4 w-4 text-mutedForeground" />
          </Button>

          <Card className="bg-grey-50">
            <CardContent className="p-4">
              <div className="grid gap-1">
                <div className="text-sm font-normal leading-5 text-zigbangOrange600">상품 및 이용문의</div>
                <div className="text-xl font-bold leading-7 text-grey-800">1661-8734</div>
                <div className="text-sm font-normal leading-5 text-grey-800">
                  운영시간 : 09시 - 19시
                  <br />
                  점심시간 : 13시 - 14시 (공휴일 휴무)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

