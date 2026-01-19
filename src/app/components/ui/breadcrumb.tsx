import * as React from "react";

import { cn } from "../../lib/utils";

export function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" {...props} />;
}

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentProps<"ol">>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1 text-sm text-mutedForeground", className)}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center gap-1", className)} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(({ className, ...props }, ref) => (
  <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn("text-foreground", className)} {...props} />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span role="presentation" aria-hidden="true" className={cn("px-1 text-mutedForeground", className)} {...props}>
      /
    </span>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span role="presentation" aria-hidden="true" className={cn("px-1 text-mutedForeground", className)} {...props}>
      …
    </span>
  );
}

