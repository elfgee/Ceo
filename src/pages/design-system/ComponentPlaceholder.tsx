import * as React from "react";
import { type DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
import { Info } from "@/app/icons/lucide";
import { Calendar } from "@/app/components/ui/calendar";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/app/components/ui/command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/app/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/app/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/app/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/components/ui/hover-card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/app/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/app/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Progress } from "@/app/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem } from "@/app/components/ui/sidebar";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Slider } from "@/app/components/ui/slider";
import { Switch } from "@/app/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Textarea } from "@/app/components/ui/textarea";
import { Toggle } from "@/app/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { cn } from "@/lib/utils";

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  Accordion: "접고 펼칠 수 있는 아코디언 컴포넌트입니다.",
  "Toast/Sonnar": "중요한 메시지를 안내하는 토스트 컴포넌트입니다.",
  Avatar: "사용자 프로필 이미지를 표시하는 컴포넌트입니다.",
  Badge: "상태/라벨을 표시하는 배지 컴포넌트입니다.",
  Breadcrumb: "현재 위치를 표시하는 경로 탐색 컴포넌트입니다.",
  Calendar: "날짜를 선택하는 캘린더 컴포넌트입니다.",
  Card: "콘텐츠를 구획하는 카드 컴포넌트입니다.",
  Carousel: "이미지/콘텐츠를 순환하는 캐러셀 컴포넌트입니다.",
  Checkbox: "선택 상태를 표시하는 체크박스 컴포넌트입니다.",
  Command: "검색 가능한 명령 팔레트 컴포넌트입니다.",
  ContextMenu: "우클릭 메뉴를 제공하는 컨텍스트 메뉴입니다.",
  Dialog: "모달 대화 상자 컴포넌트입니다.",
  Drawer: "하단에서 올라오는 드로어 컴포넌트입니다.",
  DropdownMenu: "드롭다운 메뉴 컴포넌트입니다.",
  Form: "입력 폼 구성을 위한 컴포넌트입니다.",
  HoverCard: "호버 시 상세 정보를 보여주는 카드입니다.",
  Input: "텍스트 입력 필드 컴포넌트입니다.",
  Label: "폼 레이블 컴포넌트입니다.",
  Menubar: "메뉴바 컴포넌트입니다.",
  NavigationMenu: "네비게이션 메뉴 컴포넌트입니다.",
  Popover: "클릭 시 나타나는 팝오버 컴포넌트입니다.",
  Progress: "진행 상태를 표시하는 프로그레스 바입니다.",
  RadioGroup: "라디오 버튼 그룹 컴포넌트입니다.",
  ScrollArea: "스크롤 영역 컴포넌트입니다.",
  Select: "드롭다운 선택 컴포넌트입니다.",
  Separator: "구분선을 표시하는 컴포넌트입니다.",
  Sheet: "사이드 시트 컴포넌트입니다.",
  Sidebar: "사이드바 레이아웃 컴포넌트입니다.",
  Skeleton: "로딩 상태를 나타내는 스켈레톤입니다.",
  Slider: "값 범위를 조절하는 슬라이더 컴포넌트입니다.",
  Switch: "온/오프 상태를 전환하는 스위치 컴포넌트입니다.",
  Table: "데이터 테이블 컴포넌트입니다.",
  Textarea: "여러 줄 입력을 위한 텍스트 영역입니다.",
  Toggle: "토글 버튼 컴포넌트입니다.",
  ToggleGroup: "토글 버튼 그룹 컴포넌트입니다.",
  Tooltip: "호버 시 설명을 보여주는 툴팁입니다."
};

type ExampleSectionProps = {
  title: string;
  children: React.ReactNode;
  containerClassName?: string;
};

function ExampleSection({ title, children, containerClassName }: ExampleSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold leading-7 text-foreground">{title}</h2>
      <div
        className={cn(
          "flex flex-wrap items-center gap-4 p-6 border border-border rounded-[6px] bg-background",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

function ExampleFallback() {
  return (
    <div className="flex items-center justify-center p-12 border border-border rounded-[6px] bg-background">
      <p className="text-sm font-normal leading-5 text-mutedForeground">컴포넌트 예제가 추가될 예정입니다.</p>
    </div>
  );
}

export function ComponentPlaceholder({ name }: { name: string }) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>({
    from: new Date(2024, 2, 2),
    to: new Date(2024, 2, 15)
  });
  const form = useForm<{ email: string }>({
    defaultValues: { email: "" }
  });

  const renderExamples = () => {
    switch (name) {
      case "Accordion":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>서비스 이용 안내</AccordionTrigger>
                  <AccordionContent>계정 정보를 최신으로 유지해 주세요.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>결제 관련 문의</AccordionTrigger>
                  <AccordionContent>결제 영수증은 마이페이지에서 확인할 수 있습니다.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </ExampleSection>
          </div>
        );
      case "Toast/Sonnar":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="Toast 스타일" containerClassName="flex-col items-stretch">
              <Alert className="flex items-center gap-3 w-[420px] max-w-[420px] min-w-[320px]">
                <Info className="h-5 w-5 text-foreground" />
                <div className="flex-1">
                  <AlertTitle>Toast headline</AlertTitle>
                </div>
                <Button variant="outline" className="h-8 px-3 text-sm font-medium">
                  Button Label
                </Button>
              </Alert>
              <Alert className="flex items-start gap-3 w-[420px] max-w-[420px] min-w-[320px]">
                <div className="flex-1">
                  <AlertTitle>Toast headline</AlertTitle>
                  <AlertDescription className="break-words">Toast body copy</AlertDescription>
                </div>
                <Button variant="outline" className="h-8 px-3 text-sm font-medium">
                  Button Label
                </Button>
              </Alert>
            </ExampleSection>
          </div>
        );
      case "Avatar":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Avatar>
                <AvatarFallback>HK</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback>직방</AvatarFallback>
              </Avatar>
            </ExampleSection>
          </div>
        );
      case "Badge":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="Variants">
              <Badge variant="default">기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="destructive">경고</Badge>
              <Badge variant="outline">아웃라인</Badge>
              <Badge variant="default" size="28" shape="round">
                28/Round
              </Badge>
            </ExampleSection>
          </div>
        );
      case "Breadcrumb":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-start">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">홈</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">설정</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>프로필</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ExampleSection>
          </div>
        );
      case "Calendar":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기간 선택" containerClassName="flex-col items-center gap-6">
              <Calendar
                mode="range"
                numberOfMonths={2}
                defaultMonth={selectedRange?.from}
                selected={selectedRange}
                onSelect={setSelectedRange}
                className="rounded-[6px] border border-border bg-background"
                classNames={{
                  months: "flex flex-col gap-4 md:flex-row md:gap-6"
                }}
              />
            </ExampleSection>
            <ExampleSection title="연/월 선택" containerClassName="flex-col items-center gap-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                captionLayout="dropdown"
                className="rounded-[6px] border border-border bg-background"
              />
            </ExampleSection>
            <ExampleSection title="일자 선택" containerClassName="flex-col items-center gap-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-[6px] border border-border bg-background"
              />
            </ExampleSection>
          </div>
        );
      case "Card":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <div>
                    <CardTitle>광고 요약</CardTitle>
                    <CardDescription>최근 7일 성과</CardDescription>
                  </div>
                  <CardAction>
                    <Button variant="outline">보기</Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="text-sm text-mutedForeground">
                  클릭률이 지난주 대비 12% 상승했습니다.
                </CardContent>
                <CardFooter className="justify-end">
                  <Button>자세히</Button>
                </CardFooter>
              </Card>
            </ExampleSection>
          </div>
        );
      case "Carousel":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <div className="w-full max-w-md">
                <Carousel>
                  <CarouselContent>
                    {["슬라이드 1", "슬라이드 2", "슬라이드 3"].map((label) => (
                      <CarouselItem key={label}>
                        <div className="flex h-32 items-center justify-center rounded-card border border-border bg-muted text-sm font-semibold text-foreground">
                          {label}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </ExampleSection>
          </div>
        );
      case "Checkbox":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-start">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Checkbox defaultChecked />
                광고 동의
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Checkbox />
                마케팅 수신 동의
              </label>
            </ExampleSection>
          </div>
        );
      case "Command":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <Command className="w-full max-w-sm">
                <CommandInput placeholder="항목 검색" />
                <CommandList>
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup heading="메뉴">
                    <CommandItem>
                      대시보드
                      <CommandShortcut>⌘D</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      광고 관리
                      <CommandShortcut>⌘A</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="설정">
                    <CommandItem>계정 정보</CommandItem>
                    <CommandItem>알림</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </ExampleSection>
          </div>
        );
      case "ContextMenu":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-32 w-56 items-center justify-center rounded-card border border-border bg-background text-sm text-mutedForeground">
                  우클릭 해주세요
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>열기</ContextMenuItem>
                  <ContextMenuItem>복사</ContextMenuItem>
                  <ContextMenuItem>삭제</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </ExampleSection>
          </div>
        );
      case "Dialog":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>다이얼로그 열기</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>광고 설정</DialogTitle>
                    <DialogDescription>설정을 저장하면 바로 적용됩니다.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">취소</Button>
                    </DialogClose>
                    <Button>저장</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ExampleSection>
          </div>
        );
      case "Drawer":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">드로어 열기</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>필터</DrawerTitle>
                    <DrawerDescription>조건을 선택한 후 적용하세요.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="secondary">닫기</Button>
                    </DrawerClose>
                    <Button>적용</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </ExampleSection>
          </div>
        );
      case "DropdownMenu":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">메뉴 열기</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>수정</DropdownMenuItem>
                  <DropdownMenuItem>복제</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>삭제</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ExampleSection>
          </div>
        );
      case "Form":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(() => {})}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormDescription>알림 수신에 사용됩니다.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">저장</Button>
                </form>
              </Form>
            </ExampleSection>
          </div>
        );
      case "HoverCard":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline">정보 보기</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">광고 상태</span>
                    <span className="text-sm text-mutedForeground">현재 노출이 정상적으로 진행 중입니다.</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </ExampleSection>
          </div>
        );
      case "Input":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <Input placeholder="입력하세요" />
              <Input placeholder="비활성화" disabled />
              <div className="flex w-full flex-col gap-1">
                <Input placeholder="오류 상태" aria-invalid="true" />
                <p className="text-xs leading-4 text-destructive">필수 입력 항목입니다.</p>
              </div>
            </ExampleSection>
          </div>
        );
      case "Label":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <div className="flex flex-col gap-2">
                <Label htmlFor="label-example">연락처</Label>
                <Input id="label-example" placeholder="010-0000-0000" />
              </div>
            </ExampleSection>
          </div>
        );
      case "Menubar":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>파일</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>새로 만들기</MenubarItem>
                    <MenubarItem>열기</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>닫기</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>보기</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>확대</MenubarItem>
                    <MenubarItem>축소</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </ExampleSection>
          </div>
        );
      case "NavigationMenu":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <NavigationMenu className="w-full max-w-md">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>서비스</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-64 gap-2 p-3">
                        <NavigationMenuLink className="rounded-button px-3 py-2 text-sm hover:bg-muted" href="#">
                          광고 관리
                        </NavigationMenuLink>
                        <NavigationMenuLink className="rounded-button px-3 py-2 text-sm hover:bg-muted" href="#">
                          상품 소개
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="rounded-button px-3 py-2 text-sm font-semibold hover:bg-muted" href="#">
                      고객센터
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </ExampleSection>
          </div>
        );
      case "Popover":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">팝오버 열기</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">팝오버 제목</span>
                    <span className="text-sm text-mutedForeground">간단한 설명 문구를 표시합니다.</span>
                  </div>
                </PopoverContent>
              </Popover>
            </ExampleSection>
          </div>
        );
      case "Progress":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <Progress value={35} />
              <Progress value={70} />
            </ExampleSection>
          </div>
        );
      case "RadioGroup":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-start">
              <RadioGroup defaultValue="option-1">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <RadioGroupItem value="option-1" />
                  기본 옵션
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <RadioGroupItem value="option-2" />
                  보조 옵션
                </label>
              </RadioGroup>
            </ExampleSection>
          </div>
        );
      case "ScrollArea":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <ScrollArea className="h-40 w-64 rounded-card border border-border bg-background">
                <div className="flex flex-col gap-2 p-4 text-sm text-mutedForeground">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={`scroll-item-${i}`}>스크롤 항목 {i + 1}</div>
                  ))}
                </div>
              </ScrollArea>
            </ExampleSection>
          </div>
        );
      case "Select":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-start">
              <Select defaultValue="option-1">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">아파트</SelectItem>
                  <SelectItem value="oneroom">원룸</SelectItem>
                  <SelectItem value="officetel">오피스텔</SelectItem>
                </SelectContent>
              </Select>
            </ExampleSection>
            <ExampleSection title="검색" containerClassName="justify-start">
              <Select mode="search">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="danji-101">래미안</SelectItem>
                  <SelectItem value="danji-102">자이</SelectItem>
                  <SelectItem value="danji-103">힐스테이트</SelectItem>
                  <SelectItem value="danji-104">더샵</SelectItem>
                  <SelectItem value="danji-105">푸르지오</SelectItem>
                </SelectContent>
              </Select>
            </ExampleSection>
            <ExampleSection title="멀티 선택" containerClassName="justify-start">
              <Select mode="multiple">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seoul">서울</SelectItem>
                  <SelectItem value="gyeonggi">경기</SelectItem>
                  <SelectItem value="incheon">인천</SelectItem>
                  <SelectItem value="busan">부산</SelectItem>
                  <SelectItem value="daegu">대구</SelectItem>
                  <SelectItem value="gwangju">광주</SelectItem>
                  <SelectItem value="daejeon">대전</SelectItem>
                  <SelectItem value="ulsan">울산</SelectItem>
                  <SelectItem value="sejong">세종</SelectItem>
                </SelectContent>
              </Select>
            </ExampleSection>
          </div>
        );
      case "Separator":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <div className="text-sm text-foreground">구분선 위</div>
              <Separator />
              <div className="text-sm text-foreground">구분선 아래</div>
              <Separator orientation="vertical" className="h-10" />
            </ExampleSection>
          </div>
        );
      case "Sheet":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">시트 열기</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>알림 설정</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 text-sm text-mutedForeground">알림을 받을 채널을 선택하세요.</div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="secondary">닫기</Button>
                    </SheetClose>
                    <Button>저장</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </ExampleSection>
          </div>
        );
      case "Sidebar":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="justify-center">
              <div className="w-full max-w-xs">
                <Sidebar>
                  <SidebarHeader>
                    <div className="text-sm font-semibold text-foreground">메뉴</div>
                  </SidebarHeader>
                  <SidebarContent>
                    <div className="flex flex-col gap-1">
                      <SidebarItem href="#">대시보드</SidebarItem>
                      <SidebarItem href="#">광고 관리</SidebarItem>
                      <SidebarItem href="#">상품 소개</SidebarItem>
                    </div>
                  </SidebarContent>
                  <SidebarFooter>
                    <Button variant="secondary" className="w-full">로그아웃</Button>
                  </SidebarFooter>
                </Sidebar>
              </div>
            </ExampleSection>
          </div>
        );
      case "Skeleton":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-badge" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-24 w-full rounded-card" />
            </ExampleSection>
          </div>
        );
      case "Slider":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <Slider defaultValue={[40]} max={100} step={10} />
              <Slider defaultValue={[70]} max={100} step={5} />
            </ExampleSection>
          </div>
        );
      case "Switch":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-start">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Switch defaultChecked />
                알림 받기
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Switch />
                야간 모드
              </label>
            </ExampleSection>
          </div>
        );
      case "Table":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>매물</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>노출</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>강남구 아파트</TableCell>
                    <TableCell>운영 중</TableCell>
                    <TableCell>활성</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>서초구 오피스텔</TableCell>
                    <TableCell>대기</TableCell>
                    <TableCell>비활성</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ExampleSection>
          </div>
        );
      case "Textarea":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본" containerClassName="flex-col items-stretch">
              <Textarea placeholder="내용을 입력하세요" />
            </ExampleSection>
          </div>
        );
      case "Toggle":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <Toggle defaultPressed>선택됨</Toggle>
              <Toggle>선택 안 됨</Toggle>
            </ExampleSection>
          </div>
        );
      case "ToggleGroup":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <ToggleGroup type="single" defaultValue="grid">
                <ToggleGroupItem value="grid">그리드</ToggleGroupItem>
                <ToggleGroupItem value="list">리스트</ToggleGroupItem>
              </ToggleGroup>
            </ExampleSection>
          </div>
        );
      case "Tooltip":
        return (
          <div className="flex flex-col gap-6">
            <ExampleSection title="기본">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">툴팁 보기</Button>
                  </TooltipTrigger>
                  <TooltipContent>설명 텍스트를 표시합니다.</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ExampleSection>
          </div>
        );
      default:
        return <ExampleFallback />;
    }
  };

  const description = COMPONENT_DESCRIPTIONS[name] ?? `${name} 컴포넌트 문서 페이지입니다.`;

  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">{name}</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">{description}</p>
      </div>

      {renderExamples()}
    </div>
  );
}
