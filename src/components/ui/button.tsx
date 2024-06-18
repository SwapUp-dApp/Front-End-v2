import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "gradient-button",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "rounded-full",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-3",
        sm: "rounded-md px-3",
        lg: "rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  children: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          isLoading && "cursor-wait flex items-center gap-2",
          buttonVariants({
            variant, size, className
          }))}
        ref={ref}
        {...props}
      >
        {isLoading &&
          <svg className="animate-spin duration-700 w-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.58236 0 0 3.58236 0 8C0 12.4176 3.58236 16 8 16V14.0004C6.81346 14.0002 5.65362 13.6483 4.66712 12.989C3.68061 12.3296 2.91176 11.3926 2.45777 10.2964C2.00377 9.20014 1.88503 7.99389 2.11655 6.83016C2.34807 5.66643 2.91946 4.59748 3.75847 3.75847C4.59748 2.91946 5.66643 2.34807 6.83016 2.11655C7.99389 1.88503 9.20014 2.00377 10.2964 2.45777C11.3926 2.91176 12.3296 3.68061 12.989 4.66712C13.6483 5.65362 14.0002 6.81346 14.0004 8H16C16 3.58236 12.4176 0 8 0Z" fill="white" />
          </svg>

        }
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
