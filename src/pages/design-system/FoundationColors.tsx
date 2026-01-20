import * as React from "react";

const COLORS = {
  "Canvas": ["canvas-50", "canvas-100"],
  "Grey": ["grey-50", "grey-100", "grey-200", "grey-300", "grey-400", "grey-500", "grey-600", "grey-700", "grey-800", "grey-900"],
  "Primary": ["primary", "primaryForeground"],
  "Secondary": ["secondary", "secondaryForeground"],
  "Zigbang Orange": ["zigbangOrange50", "zigbangOrange100", "zigbangOrange200", "zigbangOrange300", "zigbangOrange400", "zigbangOrange500", "zigbangOrange600", "zigbangOrange700", "zigbangOrange800", "zigbangOrange900"],
  "Semantic": ["destructive", "destructiveForeground", "background", "foreground", "card", "cardForeground", "popover", "popoverForeground", "muted", "mutedForeground", "accent", "accentForeground"],
  "UI": ["border", "input", "inputBackground", "ring"]
};

export function FoundationColors() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Colors</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          디자인 시스템의 컬러 토큰입니다. CSS 변수로 정의되어 있습니다.
        </p>
      </div>

      {Object.entries(COLORS).map(([category, tokens]) => (
        <div key={category} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tokens.map((token) => (
              <div key={token} className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
                <div
                  className="h-20 rounded-[4px] border border-border"
                  style={{ backgroundColor: `var(--${token})` }}
                />
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium leading-5 text-foreground">{token}</div>
                  <div className="text-xs font-normal leading-4 text-mutedForeground font-mono">
                    var(--{token})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
