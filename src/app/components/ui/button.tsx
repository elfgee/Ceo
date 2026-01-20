import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primaryForeground hover:bg-zigbangOrange700",
        destructive: "bg-destructive text-destructiveForeground hover:bg-destructiveHover",
        outline: "border border-border bg-background text-foreground hover:bg-grey-100",
        secondary: "bg-secondary text-secondaryForeground hover:bg-grey-100",
        ghost: "text-foreground hover:bg-grey-100",
        link: "text-primary underline underline-offset-4 hover:text-zigbangOrange700"
      },
      size: {
        xsmall: "h-8 px-3 text-sm leading-5",
        small: "h-9 px-3 text-sm leading-5",
        default: "h-10 px-3 text-sm leading-5",
        large: "h-11 px-4 text-base leading-6",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  }
);
Button.displayName = "Button";

