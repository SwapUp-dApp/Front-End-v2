import { cn, getDefaultNftImageOnError } from "@/lib/utils";

import { IPrivateRoomsLayoutSide } from "@/types/swap-market-store.types";
import { SUI_NFTItem } from "@/types/global.types";
import { SUI_OpenSwap, SUI_SwapToken } from "@/types/swap-market.types";
import { chainsDataset } from "@/constants/data";
import CustomAvatar from "../../shared/CustomAvatar";
import ChainTile from "../../tiles/ChainTile";
import WalletAddressTile from "../../tiles/WalletAddressTile";

interface IProp {
  className?: string;
  swap: SUI_OpenSwap;
  side: "sender" | "receiver";
}

const SwapHistoryDialogSideCard = ({ className, swap, side, ...props }: IProp) => {

  const nftsImageMapper = (nfts: SUI_SwapToken[],) => (
    nfts.map((nft) => (
      <div
        className="group relative w-8 h-8 rounded-xs lg:w-12 lg:h-12 object-cover lg:rounded-sm border-[1.5px] border-white/20"
        key={nft.id}>
        <img
          className="w-full h-full object-cover rounded-xs lg:rounded-sm"
          src={nft.image_url}
          onError={getDefaultNftImageOnError}
          alt="nft"
        />
      </div>
    ))
  );

  const getConvertedAmount = (usdAmount: number | string, chainAmount: number | string) => {
    return Number(usdAmount) / Number(chainAmount);
  };

  const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];
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
          imageSrc={""}
          fallbackName={side}
          sizeClasses="w-4 h-4 lg:w-6 lg:h-6"
          textSizeClasses="text-2xs lg:text-xs"
        />
        <h2 className="font-semibold text-xs lg:text-sm line-clamp-1 w-2/3 lg:w-auto">{side === "sender" ? "sender.swapup.eth" : "receiver.swapup.eth"}</h2>
      </div>

      <WalletAddressTile walletAddress={side === "sender" ? swap.init_address : swap.accept_address} className="text-2xs lg:text-xs">
        <div className="flex items-center gap-2" >
          <ChainTile imageSrc={currentChain.iconUrl} title={currentChain.name} showChainTitleOnMobileScreen className="text-2xs lg:text-xs" />

        </div>
      </WalletAddressTile>

      <div className="text-xs lg:text-sm text-su_secondary flex items-center justify-between" >
        <p>Added amount:</p>

        <div className="flex gap-2" >
          <img
            className="w-4"
            src={currentChain.iconUrl}
            alt=""
          />

          <p className="text-su_primary" >
            {/* {swap.addedAmount && getConvertedAmount(data.addedAmount.usdAmount, data.addedAmount.coin.price).toFixed(6)}
            {' '} {data.addedAmount?.coin.symbol} {' '} */}
            0.00 ETH
            <span className="text-su_secondary" >
              /$ 0.00
              {/* {data.addedAmount?.usdAmount} */}
            </span>
          </p>
        </div>
      </div>

      <div className="text-xs lg:text-sm text-su_secondary space-y-1" >
        <p>NFT assets:</p>

        <div className="grid grid-cols-5 gap-2 lg:gap-3" >
          {nftsImageMapper(side === "sender" ? swap.metadata.init.tokens : swap.metadata.accept.tokens)}
        </div>
      </div>
    </div>
  );
};

export default SwapHistoryDialogSideCard;