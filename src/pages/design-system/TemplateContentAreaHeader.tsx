import * as React from "react";
import { ContentAreaHeader } from "@/app/templates/ContentAreaHeader";

const DEFAULT_TABS = [
  { value: "all", label: "전체" },
  { value: "active", label: "광고 중 100" },
  { value: "ended", label: "광고 종료 2" },
  { value: "report", label: "오류 제보 1" },
  { value: "reject", label: "검수 반려 1" }
];

export function TemplateContentAreaHeader() {
  const [activeTab, setActiveTab] = React.useState("all");

  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">ContentAreaHeader</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          콘텐츠 영역 상단 헤더 템플릿입니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Basic</h2>
          <div className="border border-border rounded-[6px] overflow-hidden bg-background">
            <ContentAreaHeader title="페이지 제목" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">With Badge & Actions</h2>
          <div className="border border-border rounded-[6px] overflow-hidden bg-background">
            <ContentAreaHeader
              title="페이지 제목"
              badgeLabel="NEW"
              secondaryActionLabel="취소"
              primaryActionLabel="저장"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">With Tabs</h2>
          <div className="border border-border rounded-[6px] overflow-hidden bg-background">
            <ContentAreaHeader
              title="페이지 제목"
              tabs={DEFAULT_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Full Featured</h2>
          <div className="border border-border rounded-[6px] overflow-hidden bg-background">
            <ContentAreaHeader
              title="페이지 제목"
              showLeadingIcon
              showTrailingIcon
              badgeLabel="badge"
              secondaryActionLabel="btn"
              primaryActionLabel="btn"
              tabs={DEFAULT_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              subText="부가 설명 텍스트입니다"
              linkLabel="링크 버튼"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
