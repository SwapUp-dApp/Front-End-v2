import { cn } from '@/lib/utils';
import React from 'react';

interface IProp {
  from: string | Number;
  to: string | Number;
  className?: string;
  icon?: any;
}

const RarityRankTile = ({ from, to, className, icon }: IProp) => {
  return (
    <span
      className={cn(
        "flex gap-2 items-center capitalize text-su_primary font-semibold text-xs lg:text-sm",
        className
      )}
    >
      {icon ?
        icon :
        <svg className="w-2" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.33236 6.08366H9.99902C9.99902 3.71949 7.70319 2.64116 5.83236 2.39283V0.666992H4.16569V2.39283C2.29486 2.64116 -0.000976562 3.71949 -0.000976562 6.08366C-0.000976562 8.33866 2.22069 9.51116 4.16569 9.77533V13.917C2.95902 13.7078 1.66569 13.0637 1.66569 11.917H-0.000976562C-0.000976562 14.0745 2.01986 15.3495 4.16569 15.6137V17.3337H5.83236V15.6087C7.70319 15.3603 9.99902 14.2812 9.99902 11.917C9.99902 9.55282 7.70319 8.47449 5.83236 8.22616V4.08366C6.94069 4.28283 8.33236 4.86783 8.33236 6.08366ZM1.66569 6.08366C1.66569 4.86783 3.05736 4.28283 4.16569 4.08366V8.08283C3.02319 7.87199 1.66569 7.24783 1.66569 6.08366ZM8.33236 11.917C8.33236 13.1328 6.94069 13.7178 5.83236 13.917V9.91699C6.94069 10.1162 8.33236 10.7012 8.33236 11.917Z" fill="#868691" />
        </svg>
      }

      <>{from} - {to}</>
    </span>
  );
};

export default RarityRankTile;