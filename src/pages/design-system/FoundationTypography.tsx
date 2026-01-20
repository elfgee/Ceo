import * as React from "react";

const FONT_SIZES = [
  { name: "4xl", value: "36px", class: "text-4xl" },
  { name: "2xl", value: "24px", class: "text-2xl" },
  { name: "xl", value: "18px", class: "text-xl" },
  { name: "lg", value: "18px", class: "text-lg" },
  { name: "base", value: "16px", class: "text-base" },
  { name: "sm", value: "14px", class: "text-sm" },
  { name: "xs", value: "12px", class: "text-xs" }
];

const FONT_WEIGHTS = [
  { name: "normal", value: "400", class: "font-normal" },
  { name: "medium", value: "500", class: "font-medium" },
  { name: "semibold", value: "600", class: "font-semibold" },
  { name: "bold", value: "700", class: "font-bold" }
];

export function FoundationTypography() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Typography</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          디자인 시스템의 타이포그래피 토큰입니다. Font Family는 Pretendard를 사용합니다.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold leading-7 text-foreground">Font Sizes</h2>
        <div className="flex flex-col gap-3">
          {FONT_SIZES.map((size) => (
            <div key={size.name} className="flex items-center gap-4 p-4 border border-border rounded-[6px] bg-background">
              <div className="w-20 text-sm font-medium leading-5 text-mutedForeground">{size.name}</div>
              <div className="w-20 text-xs font-normal leading-4 text-mutedForeground font-mono">{size.value}</div>
              <div className={`flex-1 ${size.class} text-foreground`}>
                다람쥐 헌 쳇바퀴에 타고파
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold leading-7 text-foreground">Font Weights</h2>
        <div className="flex flex-col gap-3">
          {FONT_WEIGHTS.map((weight) => (
            <div key={weight.name} className="flex items-center gap-4 p-4 border border-border rounded-[6px] bg-background">
              <div className="w-20 text-sm font-medium leading-5 text-mutedForeground">{weight.name}</div>
              <div className="w-20 text-xs font-normal leading-4 text-mutedForeground font-mono">{weight.value}</div>
              <div className={`flex-1 text-base ${weight.class} text-foreground`}>
                다람쥐 헌 쳇바퀴에 타고파
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
