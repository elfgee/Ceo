import * as React from "react";
import { Button } from "@/app/components/ui/button";
import { Plus } from "@/app/icons/lucide";

export function ComponentButton() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Button</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          클릭 가능한 버튼 컴포넌트입니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Variants</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 border border-border rounded-[6px] bg-background">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">With Icons</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 border border-border rounded-[6px] bg-background">
            <Button>
              <Plus className="h-4 w-4" />
              <span>With Icon</span>
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              <span>Outline</span>
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Disabled</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 border border-border rounded-[6px] bg-background">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
