import * as React from "react";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { ChevronDown, ChevronLeft, Plus } from "@/app/icons/lucide";
import { cn } from "@/lib/utils";

type ContentAreaTab = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ContentAreaHeaderProps = {
  title: string;
  className?: string;
  badgeLabel?: string;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  secondaryActionLabel?: string;
  primaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
  tabs?: ContentAreaTab[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  subText?: React.ReactNode;
  subTextPlacement?: "inline" | "bottom";
  linkLabel?: string;
  onLinkClick?: () => void;
};

const DEFAULT_TABS: ContentAreaTab[] = [
  { value: "tab-1", label: "label" },
  { value: "tab-2", label: "label" },
  { value: "tab-3", label: "label" },
  { value: "tab-4", label: "label" }
];

export function ContentAreaHeader({
  title,
  className,
  badgeLabel,
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  secondaryActionLabel,
  primaryActionLabel,
  onSecondaryAction,
  onPrimaryAction,
  tabs = [],
  activeTab,
  onTabChange,
  subText,
  subTextPlacement = "bottom",
  linkLabel,
  onLinkClick
}: ContentAreaHeaderProps) {
  const resolvedActiveTab = activeTab ?? tabs[0]?.value;
  const showActions = Boolean(secondaryActionLabel || primaryActionLabel);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full flex-col">
        <div className="flex h-[60px] w-full flex-col gap-2 bg-background px-5 pb-2 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:gap-1">
            <div className="flex min-w-0 items-center gap-1">
            {showLeadingIcon ? (
              <span className="flex h-7 w-7 items-center justify-center">
                {leadingIcon ?? <ChevronLeft className="h-7 w-7 text-foreground" />}
              </span>
            ) : null}
            <div className="min-w-0 text-lg font-bold leading-7 text-foreground">{title}</div>
            {showTrailingIcon ? (
              <span className="flex h-7 w-7 items-center justify-center">
                {trailingIcon ?? <ChevronDown className="h-7 w-7 text-foreground" />}
              </span>
            ) : null}
            {badgeLabel ? (
              <Badge variant="default">
                {badgeLabel}
              </Badge>
            ) : null}
            </div>
            {subTextPlacement === "inline" && subText ? (
              typeof subText === "string" ? (
                <span className="text-sm font-normal leading-5 text-mutedForeground">{subText}</span>
              ) : (
                <div className="text-sm font-normal leading-5 text-mutedForeground">{subText}</div>
              )
            ) : null}
          </div>
          {showActions ? (
            <div className="flex w-full flex-wrap items-center gap-2 pt-1 pb-4 md:w-auto md:justify-end md:pb-0 md:pt-0">
              {secondaryActionLabel ? (
                <Button variant="secondary" className="h-9 px-3 text-sm font-medium" onClick={onSecondaryAction}>
                  {secondaryActionLabel}
                </Button>
              ) : null}
              {primaryActionLabel ? (
                <Button className="h-9 px-3 text-sm font-medium" onClick={onPrimaryAction}>
                  <Plus className="h-4 w-4" />
                  <span>{primaryActionLabel}</span>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        {tabs.length ? (
          <Tabs value={resolvedActiveTab} onValueChange={onTabChange}>
            <TabsList variant="underline" className="w-full px-2.5">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  variant="underline"
                  size="46"
                  value={tab.value}
                  disabled={tab.disabled}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
              <span aria-hidden className="flex-1 self-end border-b border-border" />
            </TabsList>
          </Tabs>
        ) : null}

        {(subText || linkLabel) && subTextPlacement === "bottom" && (
          <div className="flex w-full flex-wrap items-center gap-3 bg-background px-5 py-3">
            {subText ? (
              typeof subText === "string" ? (
                <span className="text-sm font-normal leading-5 text-mutedForeground">{subText}</span>
              ) : (
                <div className="text-sm font-normal leading-5 text-mutedForeground">{subText}</div>
              )
            ) : null}
            {linkLabel ? (
              <Button variant="link" className="h-auto p-0 text-sm font-normal" onClick={onLinkClick}>
                {linkLabel}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export function ContentAreaHeaderTemplate() {
  return (
    <div className="flex w-full flex-col gap-6 bg-canvas-100 p-6">
      <section className="grid gap-2">
        <h3 className="text-sm font-medium text-mutedForeground">Contents Area Header</h3>
        <div className="overflow-hidden rounded-card bg-background">
          <ContentAreaHeader
            title="Title"
            showLeadingIcon
            showTrailingIcon
            badgeLabel="badge"
            secondaryActionLabel="btn"
            primaryActionLabel="btn"
            tabs={DEFAULT_TABS}
            subText="sub text"
            linkLabel="Button Label"
          />
        </div>
      </section>
    </div>
  );
}
