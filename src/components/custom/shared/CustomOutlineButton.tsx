import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactElement } from "react";
import LoadingIcon from "./LoadingIcon";

interface IProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  containerClasses?: string;
  children?: ReactElement | string;
  isLoading?: boolean;
  icon?: ReactElement;
}

const CustomOutlineButton = ({ className, children, containerClasses, isLoading = false, icon, ...props }: IProp) => {
  return (
    <button
      className={cn(
        `group bg-gradient-primary p-[2px] rounded-full disabled:text-su_disabled disabled:disabled-gradient cursor-pointer`,
        containerClasses
      )}
      {...props}
    >
      <div
        className={cn(
          `group-disabled:text-su_disabled w-full h-full rounded-full flex justify-center items-center gap-2 bg-background dark:bg-su_secondary_bg text-foreground font-semibold text-sm capitalize cursor-pointer`,
          className
        )}
      >
        {isLoading &&
          <LoadingIcon />
        }

        {icon &&
          icon
        }

        {children}
      </div>
    </button>
  );
};

export default CustomOutlineButton;