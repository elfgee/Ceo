import * as React from "react";

import { AlertCircle } from "@/app/icons/lucide";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";

export type DanjiItemCardProps = {
  className?: string;
  imageSrc?: string;
  danjiName: string;
  priceLabel: string;
  specLeft: string;
  specRight: string;
  registeredAtLabel: string;
  needsCheck?: boolean;
  tagPrimary?: string;
  tagSecondary?: string;
  tagMemo?: string;
  onViewDetail?: () => void;
  onCloseItem?: () => void;
};

function CardImage({ src }: { src?: string }) {
  return (
    <div className="h-24 w-24 shrink-0 overflow-hidden rounded bg-muted">
      {src ? (
        <img alt="매물 이미지" className="h-full w-full object-cover" src={src} />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-mutedForeground">이미지</div>
      )}
    </div>
  );
}

export function DanjiItemCard({
  className,
  imageSrc,
  danjiName,
  priceLabel,
  specLeft,
  specRight,
  registeredAtLabel,
  needsCheck = false,
  tagPrimary = "즉시입주가능",
  tagSecondary = "실매물 확인중",
  tagMemo = "메모",
  onViewDetail,
  onCloseItem
}: DanjiItemCardProps) {
  return (
    <Card className={cn("w-full max-w-[510px]", className)}>
      <CardHeader className="p-5">
        <div className="flex items-start gap-4">
          <CardImage src={imageSrc} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2 w-[354px]">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="shrink-0 text-base font-bold leading-6 text-primary">N</span>
                  <span className="block min-w-0 flex-1 truncate text-sm leading-5 text-foreground">
                    {danjiName}
                  </span>
                </div>
                <div className="truncate text-base font-bold leading-6 text-foreground">{priceLabel}</div>
              </div>

              {needsCheck ? (
                <div className="ml-auto flex items-start">
                  <Badge
                    variant="destructive"
                    size="28"
                    shape="round"
                    className="shrink-0 justify-start gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs font-normal leading-4">확인 필요</span>
                  </Badge>
                </div>
              ) : null}
            </div>

            <div className="mt-1 w-full truncate text-sm leading-5 text-foreground">
              <span className="font-semibold">{specLeft}</span>
              <span className="mx-1 text-mutedForeground">|</span>
              <span className="font-semibold">{specRight}</span>
            </div>

            <div className="truncate text-sm font-normal leading-5 text-foreground">{registeredAtLabel}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 px-5 pb-5 pt-0">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" size="28" shape="round" className="border-transparent bg-popover text-primary">
            {tagPrimary}
          </Badge>
          <Badge variant="secondary" size="28" shape="round" className="truncate">
            <span className="max-w-24 truncate">{tagSecondary}</span>
          </Badge>
          {/* DS에는 ring의 배경 토큰이 없어서, 배경은 secondary로 두고 텍스트만 ring 사용 */}
          <Badge variant="secondary" size="28" shape="round" className="text-ring">
            <span className="max-w-24 truncate">{tagMemo}</span>
          </Badge>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onViewDetail}>
            매물 상세보기
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCloseItem}>
            매물 종료하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

