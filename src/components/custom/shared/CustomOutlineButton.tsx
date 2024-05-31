import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactElement } from "react";

interface IProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  containerClasses?: string;
  children?: ReactElement | string;
}

const CustomOutlineButton = ({ className, children, containerClasses, ...props }: IProp) => {
  return (
    <button
      type="reset"
      className={cn(
        `group bg-gradient-primary p-[2px] rounded-full disabled:text-su_disabled disabled:disabled-gradient`,
        containerClasses
      )}
      {...props}
    >
      <div
        className={cn(
          `group-disabled:text-su_disabled w-full h-full rounded-full flex justify-center items-center bg-background dark:bg-su_secondary_bg text-foreground font-semibold text-sm capitalize`,
          className
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default CustomOutlineButton;