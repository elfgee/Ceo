import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function ComponentTabsUnderline() {
  const [underline42Tab, setUnderline42Tab] = React.useState("underline-42-1");
  const [underline42LongTab, setUnderline42LongTab] = React.useState("u42-long-1");
  const [underline46LongTab, setUnderline46LongTab] = React.useState("u46-long-1");
  const [tab42State, setTab42State] = React.useState("selected");
  const [tab46State, setTab46State] = React.useState("selected");

  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Tabs - Underline</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">Underline 탭 시각적 예시입니다.</p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">상태별 예시</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-normal leading-5 text-mutedForeground">Tab button 42</span>
              <Tabs value={tab42State} onValueChange={setTab42State}>
                <TabsList variant="underline" className="w-full px-2.5">
                  <TabsTrigger
                    value="selected"
                    variant="underline"
                    size="42"
                    className="data-[state=inactive]:!border-transparent"
                  >
                    label
                  </TabsTrigger>
                  <TabsTrigger
                    value="unselected"
                    variant="underline"
                    size="42"
                    className="data-[state=inactive]:!border-transparent"
                  >
                    label
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-normal leading-5 text-mutedForeground">Tab button 46</span>
              <Tabs value={tab46State} onValueChange={setTab46State}>
                <TabsList variant="underline" className="w-full px-2.5">
                  <TabsTrigger
                    value="selected"
                    variant="underline"
                    size="46"
                    className="text-base data-[state=inactive]:!border-transparent"
                  >
                    label
                  </TabsTrigger>
                  <TabsTrigger
                    value="unselected"
                    variant="underline"
                    size="46"
                    className="text-base data-[state=inactive]:!border-transparent"
                  >
                    label
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Underline 42 (Long)</h2>
          <Tabs value={underline42LongTab} onValueChange={setUnderline42LongTab}>
            <TabsList variant="underline" className="w-full px-2.5">
              {Array.from({ length: 9 }, (_, i) => {
                const value = `u42-long-${i + 1}`;
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    variant="underline"
                    size="42"
                    className="data-[state=inactive]:!border-transparent"
                  >
                    label
                  </TabsTrigger>
                );
              })}
              <span aria-hidden className="flex-1 self-end border-b border-border" />
            </TabsList>
          </Tabs>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Underline 46 (Long)</h2>
          <Tabs value={underline46LongTab} onValueChange={setUnderline46LongTab}>
            <TabsList variant="underline" className="w-full px-2.5">
              {Array.from({ length: 9 }, (_, i) => {
                const value = `u46-long-${i + 1}`;
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    variant="underline"
                    size="46"
                    className="data-[state=inactive]:!border-transparent"
                  >
                    Label
                  </TabsTrigger>
                );
              })}
              <span aria-hidden className="flex-1 self-end border-b border-border" />
            </TabsList>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
