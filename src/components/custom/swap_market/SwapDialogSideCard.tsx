import { cn } from "@/lib/utils";
import CustomAvatar from "../shared/CustomAvatar";
import WalletAddressTile from "../tiles/WalletAddressTile";
import { INFTItem } from "@/swapup-types";
import ChainTile from "../tiles/ChainTile";
import { IPrivateRoomState } from "@/store/private-room-store/types";

interface IProp {
  className?: string;
  data: IPrivateRoomState;
}

const SwapDialogSideCard = ({ className, data, ...props }: IProp) => {

  const nftsImageMapper = (nfts: INFTItem[],) => (
    nfts.map((nft) => (
      <div
        className="group relative w-8 h-8 rounded-xs lg:w-12 lg:h-12 object-cover lg:rounded-sm border-[1.5px] border-white/20"
        key={nft.image}>
        <img className="w-full h-full object-cover rounded-xs lg:rounded-sm" src={nft.image} alt="nft" />
      </div>
    ))
  );

  return (
    <div
      className={cn(
        "custom-border-card space-y-2 w-full lg:w-auto",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1 lg:gap-2">
        <CustomAvatar
          imageSrc={data.profile.image}
          fallbackName={data.profile.title}
          sizeClasses="w-3 h-3 lg:w-6 lg:h-6"
          textSizeClasses="text-2xs lg:text-xs"
        />
        <h2 className="font-semibold text-xs lg:text-sm line-clamp-1 w-2/3 lg:w-auto">{data.profile.ensAddress}</h2>
      </div>

      <WalletAddressTile walletAddress={data.profile.walletAddress} className="text-2xs lg:text-xs">
        <ChainTile imageSrc={data.network.image} title={data.network.title} showChainTitleOnMobileScreen className="text-2xs lg:text-xs" />
      </WalletAddressTile>

      <div className="text-xs lg:text-sm text-su_secondary flex items-center justify-between" >
        <p>Added amount:</p>

        <div className="flex gap-2" >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.98798 8.73952C10.9377 8.65264 12.3941 8.31104 12.3941 7.90528C12.3941 7.49953 10.9387 7.15889 8.9883 7.07201V8.40081C8.9323 8.40593 8.62717 8.43121 8.02029 8.43121C7.51501 8.43121 7.14893 8.40961 7.02094 8.40081V7.07201C5.06686 7.15873 3.60798 7.49857 3.60798 7.90577C3.60798 8.31297 5.0667 8.65329 7.02094 8.73985V8.73825C7.14685 8.74481 7.50414 8.75921 8.01198 8.75921C8.64717 8.75921 8.93246 8.74304 8.98798 8.73952Z" fill="#53AE94" />
            <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 3.58192 12.4181 0 8 0C3.58144 0 0 3.58096 0 8C0 12.419 3.58208 16 8 16C12.4179 16 16 12.4181 16 8ZM8.98734 5.74401V6.93409C11.1953 7.03601 12.8558 7.47409 12.8558 7.99841C12.8558 8.52273 11.196 8.96049 8.98798 9.06241V12.8747H7.01998V9.06273C4.80878 8.96049 3.14478 8.52241 3.14478 7.99761C3.14478 7.47281 4.80798 7.03473 7.01998 6.93313V5.74401H4.29822V3.93073H11.7088V5.74401H8.98734Z" fill="#53AE94" />
          </svg>

          <p className="text-su_primary" >
            0.005 UDST {' '}
            <span className="text-su_secondary" >
              / $ 0.0
            </span>
          </p>
        </div>
      </div>

      <div className="text-xs lg:text-sm text-su_secondary space-y-1" >
        <p>NFT assets:</p>

        <div className="grid grid-cols-5 gap-2 lg:gap-3" >
          {nftsImageMapper(data.nftsSelectedForSwap)}
        </div>
      </div>
    </div>
  );
};

export default SwapDialogSideCard;