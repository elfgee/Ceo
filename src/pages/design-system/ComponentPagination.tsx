import * as React from "react";
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

export function ComponentPagination() {
  const [currentPage, setCurrentPage] = React.useState(2);
  const totalPages = 10;

  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">Pagination</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          페이지네이션 컴포넌트입니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Example</h2>
          <div className="flex justify-center p-6 border border-border rounded-[6px] bg-background">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>이전</span>
                  </PaginationPrevious>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  >
                    <span>다음</span>
                    <ChevronRight className="h-4 w-4" />
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </div>
    </div>
  );
}
