import { cn, getLastCharacters } from '@/lib/utils';
import CopyTile from '../tiles/CopyTile';

interface IProp {
  title: string;
  className?: string;
  tardeId: string;
  children?: any;
}

const CustomRoomHeader = ({ title, className, tardeId, children }: IProp) => {
  return (
    <header
      className={cn(
        'fixed w-full left-0 top-0 z-50 su-px bg-su_secondary_bg py-4 flex flex-col gap-4 lg:gap-2 border-b border-b-su_enable_bg',
        className
      )}
    >
      <div className='flex items-center justify-between' >
        <img
          src="/swapup.png"
          alt="SwapUp"
          className="w-16 lg:w-24 cursor-pointer"
        />

        <h2 className="font-semibold text-lg lg:text-1.5xl lg:pl-16">
          {title}
        </h2>

        <CopyTile textToCopy={tardeId} >
          <span className='hidden lg:block' >
            Unique trade ID:
          </span>
          <span className="dark:text-su_primary font-semibold">#{getLastCharacters(tardeId, 7)}</span>
        </CopyTile>
      </div>

      <div className='flex flex-col lg:flex-row gap-3 lg:gap-4' >
        {children}
      </div>
    </header>
  );
};

export default CustomRoomHeader;