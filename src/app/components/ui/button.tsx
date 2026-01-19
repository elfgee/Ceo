import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primaryForeground hover:bg-primary/90",
        destructive: "bg-destructive text-destructiveForeground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-muted text-foreground",
        secondary: "bg-secondary text-secondaryForeground hover:bg-secondary/80",
        ghost: "hover:bg-muted text-foreground",
        link: "text-primary underline underline-offset-4 hover:text-primary/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, type = "button", ...props }, ref) => {
    return <button ref={ref} type={type} className={cn(buttonVariants({ variant }), className)} {...props} />;
  }
);
Button.displayName = "Button";

