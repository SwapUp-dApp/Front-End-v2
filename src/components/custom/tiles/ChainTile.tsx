import { cn } from "@/lib/utils";

interface IProp {
  title: string;
  className?: string;
  imageSrc: string;
  showChainTitleOnMobileScreen?: boolean;
}

const ChainTile = ({ title, imageSrc, className, showChainTitleOnMobileScreen = false, ...props }: IProp) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm dark:bg-su_enable_bg p-2 lg:py-2 lg:px-3 rounded-xs capitalize",
        className
      )}
      {...props}
    >
      <img src={imageSrc} alt="" className="w-4 h-4 rounded-full birder border-white" />
      <span className={`${showChainTitleOnMobileScreen ? '' : 'hidden'} lg:block`}>
        {title}
      </span>
    </div>
  );
};

export default ChainTile;