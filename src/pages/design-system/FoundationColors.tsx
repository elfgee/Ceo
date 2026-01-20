import * as React from "react";

const COMPONENT_COLOR_GROUPS = {
  "Primary": ["primary", "primaryHover", "primaryForeground"],
  "Secondary": ["secondary", "secondaryHover", "secondaryForeground"],
  "UI": ["border", "inputBorder", "inputBackground", "ring"],
  "Canvas": ["canvas-50", "canvas-100"],
  "Semantic": []
};

const SEMANTIC_GROUPS = [
  {
    title: "Text basic",
    tokens: ["background", "foreground"],
    columns: 2
  },
  {
    title: "Text muted",
    tokens: ["muted", "mutedForeground"],
    columns: 2
  },
  {
    title: "Accent",
    tokens: ["accent", "accentForeground"],
    columns: 2
  },
  {
    title: "Destructive",
    tokens: ["destructive", "destructiveHover", "destructiveForeground"],
    columns: 3
  }
];

const BASE_COLOR_GROUPS = {
  "Grey": ["grey-50", "grey-100", "grey-200", "grey-300", "grey-400", "grey-500", "grey-600", "grey-700", "grey-800", "grey-900"],
  "Slate": ["slate-50", "slate-100", "slate-200", "slate-300", "slate-400", "slate-500", "slate-600", "slate-700", "slate-800", "slate-900"],
  "Neutral": ["neutral-50", "neutral-100", "neutral-200", "neutral-300", "neutral-400", "neutral-500", "neutral-600", "neutral-700", "neutral-800", "neutral-900"],
  "Red": ["red-50", "red-100", "red-200", "red-300", "red-400", "red-500", "red-600", "red-700", "red-800", "red-900"],
  "Blue": ["blue-50", "blue-100", "blue-200", "blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800", "blue-900"],
  "Zigbang Orange": ["zigbangOrange50", "zigbangOrange100", "zigbangOrange200", "zigbangOrange300", "zigbangOrange400", "zigbangOrange500", "zigbangOrange600", "zigbangOrange700", "zigbangOrange800", "zigbangOrange900"],
  "Zigbang Navy": ["zigbangNavy50", "zigbangNavy100", "zigbangNavy200", "zigbangNavy300", "zigbangNavy400", "zigbangNavy500", "zigbangNavy600"],
  "Zigbang Sub Brand": ["zigbangAptPro", "zigbangZikim"]
};

const toCssVarName = (token: string) =>
  `--${token
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase()}`;

export function FoundationColors() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Colors</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          디자인 시스템의 컬러 토큰입니다. CSS 변수로 정의되어 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold leading-7 text-foreground">Component Colors</h2>
        {Object.entries(COMPONENT_COLOR_GROUPS).map(([category, tokens]) => (
          <div key={category} className="flex flex-col gap-4">
            <h3 className="text-base font-bold leading-6 text-foreground">{category}</h3>
            {category === "Semantic" ? (
              <div className="flex flex-col gap-6">
                {SEMANTIC_GROUPS.map((group) => (
                  <div key={group.title} className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold leading-5 text-foreground">{group.title}</h4>
                    <div className={`grid gap-4 ${group.columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                      {group.tokens.map((token) => (
                        <div key={token} className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
                          <div
                            className="h-20 rounded-[4px] border border-border"
                            style={{ backgroundColor: `var(${toCssVarName(token)})` }}
                          />
                          <div className="flex flex-col gap-1">
                            <div className="text-sm font-medium leading-5 text-foreground">{token}</div>
                            <div className="text-xs font-normal leading-4 text-mutedForeground font-mono">
                              var({toCssVarName(token)})
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tokens.map((token) => (
                  <div key={token} className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
                    <div
                      className="h-20 rounded-[4px] border border-border"
                      style={{ backgroundColor: `var(${toCssVarName(token)})` }}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium leading-5 text-foreground">{token}</div>
                      <div className="text-xs font-normal leading-4 text-mutedForeground font-mono">
                        var({toCssVarName(token)})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold leading-7 text-foreground">Base Colors</h2>
        {Object.entries(BASE_COLOR_GROUPS).map(([category, tokens]) => (
          <div key={category} className="flex flex-col gap-4">
            <h3 className="text-base font-bold leading-6 text-foreground">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tokens.map((token) => (
                <div key={token} className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
                  <div
                    className="h-20 rounded-[4px] border border-border"
                    style={{ backgroundColor: `var(${toCssVarName(token)})` }}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium leading-5 text-foreground">{token}</div>
                    <div className="text-xs font-normal leading-4 text-mutedForeground font-mono">
                      var({toCssVarName(token)})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
