import { Card, CardContent } from "@/components/ui/card";
import CopyTile from "../../tiles/CopyTile";
import { SUI_OpenSwap, SUI_SwapToken } from "@/types/swap-market.types";
import { getLastCharacters } from "@/lib/utils";
import { chainsDataset } from "@/constants/data";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store/profile";
import { showWalletConnectionToast } from "@/lib/helpers";


interface IProp {
  swap: SUI_OpenSwap;
  swapTokensMapper: (swapTokens: SUI_SwapToken[], showMaxNumberOfTokensToShow: number) => (JSX.Element | undefined)[];
}

const CreatedSwapsCards = ({ swap, swapTokensMapper }: IProp) => {
  const navigate = useNavigate();
  const wallet = useProfileStore(state => state.profile.wallet);

  const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];

  return (
    <Card
      className=" border-none bg-card dark:bg-su_secondary_bg p-2 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => { wallet.isConnected ? navigate(`/swap-up/swap-market/open-market/manage-open-market`) : showWalletConnectionToast(); }}
    >
      <CardContent className={`p-0 flex flex-col 'gap-1'}`}>
        <div className="flex gap-1 items-center">
          <div className="flex items-center gap-1 p-1" >
            {swapTokensMapper(swap.metadata.init.tokens, 4)}
          </div>
        </div>
        <div className="flex items-center gap-1 p-1" >
          <CopyTile textToCopy={swap.open_trade_id} className="hidden lg:flex" >
            <span className="dark:text-su_primary font-semibold">#{getLastCharacters(swap.open_trade_id, 7)}</span>
          </CopyTile>
          <span className="w-auto flex items-center justify-center text-sm rounded-xs gap-2 py-1.5 px-2 bg-su_enable_bg capitalize" >
            <img
              className='w-4 h-4'
              src={currentChain.iconUrl}
              alt=""
            />
            {currentChain.name}
          </span>
        </div>

      </CardContent>
    </Card>
  );
};

export default CreatedSwapsCards;