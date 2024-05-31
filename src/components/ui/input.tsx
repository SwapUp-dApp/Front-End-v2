import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className={cn(
        "flex items-center gap-3 rounded-md text-xs lg:text-sm ring-offset-su_active_bg focus-within:ring-1 focus-within:ring-su_active_bg focus-within:ring-offset-1",
        error && "ring-2 ring-su_negative focus-within:ring-1 focus-within:ring-su_negative",
        className,
      )}>
        {icon}
        <input
          type={type}
          className={cn(
            "w-full placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent",
          )

          }
          ref={ref}
          {...props}
        />
      </div>

    );
  }
);
Input.displayName = "Input";

export { Input };
