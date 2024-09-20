import { cn } from "@/lib/utils";

interface IProp {
  title: string;
  className?: string;
  titleClassName?: string;
  imageSrc: string;
  showChainTitleOnMobileScreen?: boolean;
}

const ChainTile = ({ title, imageSrc, className, showChainTitleOnMobileScreen = false, titleClassName, ...props }: IProp) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm dark:bg-su_enable_bg p-1.5 rounded-xs capitalize",
        className
      )}
      {...props}
    >
      <img src={imageSrc} alt="" className="w-4 h-4 rounded-full" />
      <span
        className={cn(
          `${showChainTitleOnMobileScreen ? '' : '  !hidden'} line-clamp-1`,
          titleClassName
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default ChainTile;