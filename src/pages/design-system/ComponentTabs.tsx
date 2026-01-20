import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

const DEFAULT_TABS = [
  { value: "account", label: "Account" },
  { value: "password-1", label: "Password" },
  { value: "password-2", label: "Password" },
  { value: "password-3", label: "Password" },
  { value: "password-4", label: "Password" }
];

export function ComponentTabs() {
  const [defaultTab, setDefaultTab] = React.useState("account");
  const [triggerTab, setTriggerTab] = React.useState("trigger-on");

  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Tabs</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">탭 컴포넌트의 시각적 예시입니다.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full max-w-[640px] rounded-card border border-border bg-background p-4">
          <Tabs value={defaultTab} onValueChange={setDefaultTab}>
            <TabsList>
              {DEFAULT_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="w-full max-w-[360px] rounded-card border border-border bg-background p-4">
          <Tabs value={triggerTab} onValueChange={setTriggerTab}>
            <TabsList>
              <TabsTrigger value="trigger-on">Tab Label</TabsTrigger>
              <TabsTrigger value="trigger-off">Tab Label</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
