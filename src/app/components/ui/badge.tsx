import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge border-0 px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primaryForeground",
        secondary: "bg-secondary text-secondaryForeground",
        destructive: "bg-destructive text-destructiveForeground",
        outline: "border border-border bg-background text-foreground"
      },
      size: {
        "28": "h-7 px-3"
      },
      shape: {
        round: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, shape }), className)} {...props} />;
}

