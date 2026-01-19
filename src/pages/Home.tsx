import { useMemo, useState } from "react";
import { useViewport } from "../hooks/useViewport";
import { Badge } from "../app/components/ui/badge";
import { Button } from "../app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../app/components/ui/card";
import { Input } from "../app/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../app/components/ui/tabs";
import { DanjiItemCard } from "@/app/templates/DanjiItemCard";
import { Gnb } from "@/app/templates/Gnb";

export function Home() {
  const { width, isMobile } = useViewport();
  const [count, setCount] = useState(0);

  const layoutLabel = useMemo(() => (isMobile ? "Mobile (<768px)" : "Desktop (>=768px)"), [isMobile]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="text-base font-bold">Ceo</div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Badge variant="secondary">{layoutLabel}</Badge>
            <Badge variant="outline">width: {width}px</Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-4 px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>대표 템플릿: GNB</CardTitle>
            <CardDescription>모바일(&lt;768) / 데스크톱(≥768) 전환은 Tailwind `md` 기준으로 동작합니다.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden rounded-card border border-border p-0">
            <Gnb activeItem="광고관리(등록)" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>대표 템플릿: DanjiItemCard</CardTitle>
            <CardDescription>DS 토큰/컴포넌트만 사용하도록 정규화한 템플릿입니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-start">
            <DanjiItemCard
              danjiName="레미안옥수리버젠"
              priceLabel="전세 6억 5,000"
              specLeft="112㎡/59.1㎡"
              specRight="1301동 803호"
              registeredAtLabel="매물 등록일 : 24.09.23"
              needsCheck
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="grid gap-1">
              <CardTitle className="text-2xl">프로젝트 시작 준비 완료</CardTitle>
              <CardDescription>
                이 화면은 반응형 기본 규칙(768px)을 확인하기 위한 스타터 UI입니다. 이후 페이지/라우팅/디자인 시스템을
                얹어가면 됩니다.
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" size="28" shape="round">
                count: {count}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-2">
            <Button variant="default" onClick={() => setCount((v) => v + 1)}>
              카운트 +1
            </Button>
            <Button variant="outline" onClick={() => setCount(0)}>
              초기화
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>입력 / 탭 예시</CardTitle>
            <CardDescription>DS에 정의된 `Input`, `Tabs(UnderlineTab)` 컴포넌트 사용 예시입니다.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <div className="text-sm font-semibold">Input</div>
              <Input placeholder="입력하세요" />
            </div>

            <div className="grid gap-2">
              <div className="text-sm font-semibold">UnderlineTab</div>
              <Tabs defaultValue="tab1">
                <TabsList variant="underline">
                  <TabsTrigger variant="underline" size="46" value="tab1">
                    탭 1
                  </TabsTrigger>
                  <TabsTrigger variant="underline" size="46" value="tab2">
                    탭 2
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="text-sm text-mutedForeground">탭 1 내용</div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="text-sm text-mutedForeground">탭 2 내용</div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Desktop 레이아웃</CardTitle>
              <CardDescription>2컬럼 그리드가 기본이며, 768px 이상에서 적용됩니다.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mobile 레이아웃</CardTitle>
              <CardDescription>768px 미만에서 1컬럼으로 전환됩니다.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-mutedForeground">
          © {new Date().getFullYear()} Ceo
        </div>
      </footer>
    </div>
  );
}

