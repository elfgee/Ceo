import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "gap-1",
      underline: "w-full justify-start gap-0 bg-background"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ variant }), className)} {...props} />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-button px-3 py-1.5 text-sm font-medium text-secondaryForeground data-[state=active]:bg-zigbangOrange50 data-[state=active]:text-zigbangOrange600 data-[state=active]:shadow-sm",
        underline:
          "items-end rounded-none border-b border-transparent px-2.5 py-[11px] text-sm font-normal leading-5 text-mutedForeground data-[state=active]:-mb-px data-[state=active]:border-b-2 data-[state=active]:!border-foreground data-[state=active]:!text-foreground data-[state=active]:font-bold"
      },
      size: {
        "46": "h-[46px]",
        "42": "h-[42px]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TabsPrimitive.Trigger ref={ref} className={cn(tabsTriggerVariants({ variant, size }), className)} {...props} />
  )
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

