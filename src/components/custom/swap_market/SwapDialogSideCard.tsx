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

  const getConvertedAmount = (usdAmount: number | string, chainAmount: number | string) => {

    return Number(usdAmount) / Number(chainAmount);
  };

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
          <img
            className="w-4"
            src={data.addedAmount?.coin.iconUrl}
            alt=""
          />

          <p className="text-su_primary" >
            {data.addedAmount && getConvertedAmount(data.addedAmount.usdAmount, data.addedAmount.coin.price).toFixed(6)}
            {' '} {data.addedAmount?.coin.symbol} {' '}
            <span className="text-su_secondary" >
              / $ {data.addedAmount?.usdAmount}
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