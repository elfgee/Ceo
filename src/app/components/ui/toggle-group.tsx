import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center rounded-button border border-border px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primaryForeground data-[state=on]:border-transparent",
  {
    variants: {
      variant: {
        default: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export const ToggleGroup = ToggleGroupPrimitive.Root;

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleGroupItemVariants> {}

export const ToggleGroupItem = React.forwardRef<React.ElementRef<typeof ToggleGroupPrimitive.Item>, ToggleGroupItemProps>(
  ({ className, variant, ...props }, ref) => (
    <ToggleGroupPrimitive.Item ref={ref} className={cn(toggleGroupItemVariants({ variant }), className)} {...props} />
  )
);
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

