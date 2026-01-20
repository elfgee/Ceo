import * as React from "react";

const RADIUS = [
  { name: "radius", value: "6px", var: "--radius" },
  { name: "radiusButton", value: "6px", var: "--radius-button" },
  { name: "radiusCard", value: "8px", var: "--radius-card" },
  { name: "radiusBadge", value: "9999px", var: "--radius-badge" }
];

export function FoundationSpacing() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Spacing & Radius</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          디자인 시스템의 Radius 토큰입니다.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold leading-7 text-foreground">Border Radius</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RADIUS.map((radius) => (
            <div key={radius.name} className="flex flex-col gap-3 p-4 border border-border rounded-[6px] bg-background">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium leading-5 text-foreground">{radius.name}</div>
                <div className="text-xs font-normal leading-4 text-mutedForeground font-mono">
                  var({radius.var}) = {radius.value}
                </div>
              </div>
              <div
                className="h-24 bg-primary"
                style={{ borderRadius: `var(${radius.var})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
