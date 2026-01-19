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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/app/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "@/app/icons/lucide";

type RestrictionType = "warning-1" | "warning-2" | "permanent";

interface Restriction {
  id: string;
  date: string; // yyyy-mm-dd
  officeName: string;
  representativeName: string;
  region: string; // "시 구" or "도 시 구"
  violationPolicies: string[]; // ["안심중개사규정", "안심광고관리규정"]
  action: RestrictionType;
}

// Mock data - 35개 항목
const generateMockRestrictions = (): Restriction[] => {
  const offices = [
    { name: "직방부동산", rep: "홍길동", region: "서울 강남구" },
    { name: "호갱노노부동산", rep: "김철수", region: "경기 성남시 분당구" },
    { name: "부동산중개", rep: "이영희", region: "서울 서초구" },
    { name: "신뢰부동산", rep: "박민수", region: "서울 송파구" },
    { name: "우리부동산", rep: "최지영", region: "경기 수원시 영통구" },
    { name: "한국부동산", rep: "정대현", region: "서울 강동구" },
    { name: "프리미엄부동산", rep: "윤서연", region: "서울 마포구" },
    { name: "스마트부동산", rep: "장현우", region: "경기 고양시 일산동구" },
    { name: "글로벌부동산", rep: "오수진", region: "서울 영등포구" },
    { name: "프로부동산", rep: "한동욱", region: "서울 노원구" },
    { name: "베스트부동산", rep: "강미영", region: "경기 용인시 기흥구" },
    { name: "골드부동산", rep: "임태호", region: "서울 강서구" },
    { name: "플러스부동산", rep: "신혜진", region: "서울 종로구" },
    { name: "파워부동산", rep: "조성민", region: "경기 성남시 수정구" },
    { name: "엘리트부동산", rep: "배지은", region: "서울 중구" }
  ];

  const policies = [
    ["안심중개사규정"],
    ["안심광고관리규정"],
    ["안심중개사규정", "안심광고관리규정"]
  ];

  const actions: RestrictionType[] = ["warning-1", "warning-2", "permanent"];

  const restrictions: Restriction[] = [];
  const today = new Date();

  for (let i = 0; i < 35; i++) {
    const office = offices[i % offices.length];
    const daysAgo = i;
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    
    restrictions.push({
      id: String(i + 1),
      date: formattedDate,
      officeName: office.name,
      representativeName: office.rep,
      region: office.region,
      violationPolicies: policies[i % policies.length],
      action: actions[i % actions.length]
    });
  }

  return restrictions;
};

const mockRestrictions: Restriction[] = generateMockRestrictions();

const getDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  
  return {
    start: formatDate(startDate),
    end: formatDate(endDate)
  };
};

const getActionLabel = (action: RestrictionType): string => {
  switch (action) {
    case "warning-1":
      return "경고1회";
    case "warning-2":
      return "경고2회";
    case "permanent":
      return "영구제한";
  }
};

const getStatistics = (restrictions: Restriction[]) => {
  // 중개사무소 수 (중복 제거)
  const uniqueOffices = new Set(restrictions.map((r) => r.officeName));
  const totalOffices = uniqueOffices.size;
  
  // 전체 조치 건수 (중복 포함)
  const totalActions = restrictions.length;
  
  // 유형별 조치 건수
  const warning1 = restrictions.filter((r) => r.action === "warning-1").length;
  const warning2 = restrictions.filter((r) => r.action === "warning-2").length;
  const permanent = restrictions.filter((r) => r.action === "permanent").length;
  
  return { totalOffices, totalActions, warning1, warning2, permanent };
};

export function Restrictions() {
  const [filter, setFilter] = React.useState<RestrictionType | "all">("all");
  const [currentPage, setCurrentPage] = React.useState(1);
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
  const filteredStatistics = getStatistics(filteredData);
  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  
  return (
    <div className="flex flex-col gap-[30px] py-5 px-5">
      {/* 상단 요약 정보 카드 */}
      <div className="py-5 md:p-5 bg-transparent md:bg-background rounded-[6px] md:rounded-[6px] flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-base font-bold leading-6 text-foreground">제한 조치된 중개사무소 </span>
            <span className="text-base font-bold leading-6 text-primary">총 {statistics.totalOffices}곳</span>
          </div>
          <div className="flex-1 md:h-5 text-left md:text-right text-sm font-normal leading-5 text-mutedForeground">
            최근 1년 기준 ({dateRange.start}~{dateRange.end})
          </div>
        </div>
        
        {/* 제한 조치 유형별 통계 및 필터 */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "flex-1 px-4 py-3 bg-grey-50 rounded-[8px] border border-border flex flex-col gap-1 items-start transition-colors",
              filter === "all" && "outline outline-1 outline-offset-[-1px] outline-primary"
            )}
          >
            <div className="text-base font-semibold leading-6 text-secondaryForeground">전체</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFilter("all");
              }}
              className="text-xl font-semibold leading-7 text-secondaryForeground underline cursor-pointer"
            >
              {statistics.totalActions}건
            </button>
          </button>
          <button
            type="button"
            onClick={() => setFilter("warning-1")}
            className={cn(
              "flex-1 px-4 py-3 bg-grey-50 rounded-[8px] border border-border flex flex-col gap-1 items-start transition-colors",
              filter === "warning-1" && "outline outline-1 outline-offset-[-1px] outline-primary"
            )}
          >
            <div className="text-base font-semibold leading-6 text-secondaryForeground">경고 1회</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFilter("warning-1");
              }}
              className="text-xl font-semibold leading-7 text-secondaryForeground underline cursor-pointer"
            >
              {statistics.warning1}건
            </button>
          </button>
          <button
            type="button"
            onClick={() => setFilter("warning-2")}
            className={cn(
              "flex-1 px-4 py-3 bg-grey-50 rounded-[8px] border border-border flex flex-col gap-1 items-start transition-colors",
              filter === "warning-2" && "outline outline-1 outline-offset-[-1px] outline-primary"
            )}
          >
            <div className="text-base font-semibold leading-6 text-secondaryForeground">경고 2회</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFilter("warning-2");
              }}
              className="text-xl font-semibold leading-7 text-secondaryForeground underline cursor-pointer"
            >
              {statistics.warning2}건
            </button>
          </button>
          <button
            type="button"
            onClick={() => setFilter("permanent")}
            className={cn(
              "flex-1 px-4 py-3 bg-grey-50 rounded-[8px] border border-border flex flex-col gap-1 items-start transition-colors",
              filter === "permanent" && "outline outline-1 outline-offset-[-1px] outline-primary"
            )}
          >
            <div className="text-base font-semibold leading-6 text-secondaryForeground">영구 제한</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFilter("permanent");
              }}
              className="text-xl font-semibold leading-7 text-secondaryForeground underline cursor-pointer"
            >
              {statistics.permanent}건
            </button>
          </button>
        </div>
      </div>
      
      {/* 테이블 영역 */}
      {paginatedData.length > 0 ? (
        <div className="p-0 md:p-5 bg-transparent md:bg-background rounded-[4px] flex flex-col gap-2">
          <div className="flex justify-end items-center gap-[10px] h-10 px-0">
            <div className="text-sm font-normal leading-5 text-foreground">총 {filteredData.length}건</div>
            <div className="flex-1 h-5" />
          </div>
          
          <div className="rounded-[6px] border-x-0 md:border-x border-t border-b md:border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-0">
                  <TableHead className="hidden min-[390px]:table-cell min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    날짜
                  </TableHead>
                  <TableHead className="min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    중개사무소
                  </TableHead>
                  <TableHead className="hidden min-[390px]:table-cell min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
                    지역
                  </TableHead>
                  <TableHead className="hidden min-[390px]:table-cell min-h-[48px] px-0 md:px-4 text-sm font-bold leading-5 text-foreground">
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
                    <TableCell className="hidden min-[390px]:table-cell py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {item.date}
                    </TableCell>
                    <TableCell className="py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {item.officeName}(대표: {item.representativeName})
                    </TableCell>
                    <TableCell className="hidden min-[390px]:table-cell py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
                      {item.region}
                    </TableCell>
                    <TableCell className="hidden min-[390px]:table-cell py-4 px-0 md:px-4 text-sm font-normal leading-5 text-foreground">
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
            <div className="flex justify-center items-start gap-1">
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
                          ? "bg-background border border-input text-secondaryForeground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
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
