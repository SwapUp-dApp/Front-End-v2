import { Card, CardContent } from "@/components/ui/card";
import { ICreatedSwap } from "@/pages/SwapMarketPage";
import CopyTile from "../tiles/CopyTile";


interface IProp {
    swaps: ICreatedSwap;
  }

  const nftsImageMapperNew = (nfts: string[]) => {
    return (
      nfts.map((image, index) => {
        if (index < 5)
          return (
            <div className="relative w-8 h-8" key={image}>
              <img className="w-full h-full object-cover rounded-xs border-[1.5px] border-white/20" src={image} alt="nft" />
              {
                (index === 4) &&
                  nfts.length > 4 ?
                  <div className="absolute w-full h-full rounded-xs bg-black/50 top-0 flex justify-center items-center font-semibold" >
                    +{nfts.length - 4}
                  </div> : ''
              }
            </div>
          );
      })
    );
  };

const CreatedSwapsCards = ({ swaps }: IProp) => {

  return (
    <Card className=" border-none bg-card dark:bg-su_secondary_bg p-2" >
      <CardContent className={`p-0 flex flex-col 'gap-1'}`}>  
        <div className="flex gap-1 items-center">
          <div className="flex items-center gap-1 p-1" >
            {nftsImageMapperNew(swaps.assets.from)}
          </div>
          </div>
          <div className="flex items-center gap-1 p-1" >
            <CopyTile textToCopy={swaps.trade_id} className="hidden lg:flex" >
              <span className="dark:text-su_primary font-semibold">{swaps.trade_id}</span>
            </CopyTile>
            <span className="w-auto flex items-center justify-center text-sm rounded-xs gap-2 py-1.5 px-2 bg-su_enable_bg capitalize" >
              {swaps.trading_chain.icon} {swaps.trading_chain.title}
            </span>
          </div>
        
      </CardContent>
    </Card>
  );
};

export default CreatedSwapsCards;