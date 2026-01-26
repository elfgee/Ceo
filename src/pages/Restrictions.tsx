import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/app/components/ui/table";
import { Card, CardContent } from "@/app/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/components/ui/hover-card";
import { ChevronLeft, ChevronRight } from "@/app/icons/lucide";
import type { RestrictionType } from "./restrictionsData";
import {
  currentUserOfficeId,
  formatOfficeLabel,
  getActionLabel,
  getDateRange,
  getMyLatestRestriction,
  getStatistics,
  mockRestrictions
} from "./restrictionsData";

export function Restrictions() {
  const [filter, setFilter] = React.useState<RestrictionType | "all">("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError] = React.useState(false);
  const itemsPerPage = 10;
  
  const dateRange = getDateRange();
  
  // 필터링된 데이터
  const filteredData = React.useMemo(() => {
    if (filter === "all") {
      return mockRestrictions;
    }
    return mockRestrictions.filter((r) => r.action === filter);
  }, [filter]);
  
  // 페이지네이션
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  const statistics = getStatistics(mockRestrictions);
  const myLatestRestriction = React.useMemo(() => getMyLatestRestriction(mockRestrictions, currentUserOfficeId), []);
  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);
  
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 px-5">
        <div className="text-base font-semibold leading-6 text-foreground">데이터를 불러오지 못했어요.</div>
        <div className="text-sm font-normal leading-5 text-mutedForeground">
          잠시 후 다시 시도하거나 홈으로 이동해 주세요.
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-9 rounded-button border border-inputBorder px-4 text-sm font-medium text-foreground hover:bg-muted"
          >
            페이지 새로고침
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="h-9 rounded-button border border-inputBorder px-4 text-sm font-medium text-foreground hover:bg-muted"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[30px] py-5 px-5">

      {/* 상단 요약 정보 카드 */}
      <div className="py-5 md:p-5 bg-transparent md:bg-background rounded-[6px] md:rounded-[6px] flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-base font-bold leading-6 text-foreground">제한 조치된 중개사무소</span>
            <span className="text-base font-bold leading-6 text-primary">총 {statistics.totalOffices}곳</span>
          </div>
          <div className="flex-1 md:h-5 text-left md:text-right text-sm font-normal leading-5 text-mutedForeground">
            최근 1년 기준 ({dateRange.start} ~ {dateRange.end})
          </div>
        </div>
        
        {/* 제한 조치 유형별 통계 및 필터 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-colors hover:bg-muted">
                  <CardContent className="p-4">
                    <div className="text-base font-semibold leading-6 text-foreground">전체</div>
                    <div
                      className={cn(
                        "text-xl font-semibold leading-7 text-foreground",
                        filter === "all" && "text-primary"
                      )}
                    >
                      {statistics.warning1 + statistics.warning2 + statistics.permanent}건
                    </div>
                  </CardContent>
                </Card>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm leading-5">
              전체 제한 조치 목록을 보여줍니다.
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                onClick={() => setFilter(filter === "warning-1" ? "all" : "warning-1")}
                className="flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-colors hover:bg-muted">
                  <CardContent className="p-4">
                    <div className="text-base font-semibold leading-6 text-foreground">경고 1회</div>
                    <div
                      className={cn(
                        "text-xl font-semibold leading-7 text-foreground",
                        filter === "warning-1" && "text-primary"
                      )}
                    >
                      {statistics.warning1}건
                    </div>
                  </CardContent>
                </Card>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm leading-5">
              경고 1회 조치만 필터링합니다.
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                onClick={() => setFilter(filter === "warning-2" ? "all" : "warning-2")}
                className="flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-colors hover:bg-muted">
                  <CardContent className="p-4">
                    <div className="text-base font-semibold leading-6 text-foreground">경고 2회</div>
                    <div
                      className={cn(
                        "text-xl font-semibold leading-7 text-foreground",
                        filter === "warning-2" && "text-primary"
                      )}
                    >
                      {statistics.warning2}건
                    </div>
                  </CardContent>
                </Card>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm leading-5">
              경고 2회 조치만 필터링합니다.
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                onClick={() => setFilter(filter === "permanent" ? "all" : "permanent")}
                className="flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-colors hover:bg-muted">
                  <CardContent className="p-4">
                    <div className="text-base font-semibold leading-6 text-foreground">영구제한</div>
                    <div
                      className={cn(
                        "text-xl font-semibold leading-7 text-foreground",
                        filter === "permanent" && "text-primary"
                      )}
                    >
                      {statistics.permanent}건
                    </div>
                  </CardContent>
                </Card>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm leading-5">
              영구제한 조치만 필터링합니다.
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      {/* 테이블 영역 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-sm font-normal leading-5 text-mutedForeground">
            로딩 중입니다...
          </div>
        </div>
      ) : paginatedData.length > 0 ? (
        <div className="p-0 md:p-5 bg-transparent md:bg-background rounded-[4px] flex flex-col gap-2">
          <div className="flex justify-end items-center gap-[10px] h-10 px-0">
            <div className="text-sm font-normal leading-5 text-foreground">총 {filteredData.length}건</div>
            <div className="flex-1 h-5" />
          </div>
          
          <div className="rounded-[6px] border-x-0 md:border-x border-t border-b md:border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-0">
                  <TableHead className="min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    날짜
                  </TableHead>
                  <TableHead className="min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    중개사무소
                  </TableHead>
                  <TableHead className="hidden min-[391px]:table-cell min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    지역
                  </TableHead>
                  <TableHead className="hidden min-[391px]:table-cell min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    위반 정책
                  </TableHead>
                  <TableHead className="min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    처리
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.id} className="border-0 border-b border-border">
                    <TableCell className="py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {item.date}
                    </TableCell>
                    <TableCell className="py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {formatOfficeLabel(item)}
                    </TableCell>
                    <TableCell className="hidden min-[391px]:table-cell py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {item.region}
                    </TableCell>
                    <TableCell className="hidden min-[391px]:table-cell py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {item.violationPolicies.join(", ")}
                    </TableCell>
                    <TableCell className="py-4 px-0 md:px-4">
                      <span
                        className={cn(
                          "text-sm font-normal leading-5",
                          item.action === "permanent" ? "text-destructive" : "text-foreground"
                        )}
                      >
                        {getActionLabel(item.action)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="table-pagination flex justify-center items-start gap-1">
              <button
                type="button"
                onClick={() => {
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                disabled={currentPage === 1}
                className={cn(
                  "min-w-[40px] min-h-[40px] px-4 py-2 rounded-[6px] flex justify-center items-center gap-2 text-sm font-medium leading-5 text-foreground transition-colors",
                  currentPage === 1
                    ? "opacity-50 pointer-events-none"
                    : "hover:bg-muted"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>이전</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "min-w-[40px] min-h-[40px] px-4 py-2 rounded-[6px] flex justify-center items-center text-sm font-medium leading-5 transition-colors",
                        currentPage === page
                          ? "bg-background border border-inputBorder text-secondaryForeground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <div key={page} className="w-10 h-10 flex justify-center items-center">
                      <span className="text-sm text-foreground">…</span>
                    </div>
                  );
                }
                return null;
              })}

              <button
                type="button"
                onClick={() => {
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
                className={cn(
                  "min-w-[40px] min-h-[40px] px-4 py-2 rounded-[6px] flex justify-center items-center gap-2 text-sm font-medium leading-5 text-foreground transition-colors",
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : "hover:bg-muted"
                )}
              >
                <span>다음</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-sm font-normal leading-5 text-mutedForeground">
            해당 조건에 맞는 제한 조치 내역이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
}
