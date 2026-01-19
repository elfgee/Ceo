import * as React from "react";

import { cn } from "../../lib/utils";

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}

export const PaginationContent = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a">;

export function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "min-w-[40px] min-h-[40px] px-4 py-2 rounded-[6px] flex justify-center items-center text-sm font-medium leading-5 transition-colors",
        isActive
          ? "bg-background border border-input text-secondaryForeground"
          : "text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-2", className)}
      {...props}
    />
  );
}

export function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-2", className)}
      {...props}
    />
  );
}

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden
      className={cn("flex h-10 w-10 items-center justify-center", className)}
      {...props}
    >
      <span className="relative block h-6 w-6">
        <span className="absolute left-[3px] top-[10px] h-1 w-1 rounded-full bg-foreground" />
        <span className="absolute left-[10px] top-[10px] h-1 w-1 rounded-full bg-foreground" />
        <span className="absolute left-[17px] top-[10px] h-1 w-1 rounded-full bg-foreground" />
      </span>
    </span>
  );
}

