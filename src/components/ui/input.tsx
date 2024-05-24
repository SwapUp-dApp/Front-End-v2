import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className={cn(
        "flex items-center rounded-md  bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}>
        {icon}
        <input
          type={type}
          className="w-full placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent ml-[-4rem]"
          ref={ref}
          style={{ paddingLeft: icon ? "5rem" : "1rem" }}
          {...props}
        />
      </div>

    );
  }
);
Input.displayName = "Input";

export { Input };
