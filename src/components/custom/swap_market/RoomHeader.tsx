import CopyTile from "../tiles/CopyTile";
import { defaultFallbackRoute } from "@/routes";
import ExitPageDialog from "../shared/ExitPageDialog";
import { getLastCharacters } from "@/lib/utils";
import { SUI_SwapPreferences } from "@/types/swap-market.types";
import SwapParameterTile from "../tiles/SwapParameterTile";
import { availableCollections } from "@/constants/data";
import ChainTile from "../tiles/ChainTile";

interface IProp {
  backClickNavigateTo?: string;
  tardeId: string;
  resetData: () => void;
  title: string;
  existTitle: string;
  existDescription: string;
  swapPreferences?: SUI_SwapPreferences;
}

const RoomHeader = ({ backClickNavigateTo, tardeId, resetData, existDescription, existTitle, title, swapPreferences }: IProp) => {

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-4" >
      <div className="flex items-center justify-between lg:justify-start lg:gap-6" >
        <ExitPageDialog
          title={existTitle}
          description={existDescription}
          redirectPath={backClickNavigateTo ? backClickNavigateTo : defaultFallbackRoute}
          resetData={resetData}
        >
          <span
            className="text-sm dark:text-su_secondary flex items-center gap-2 cursor-pointer py-2 px-3 hover:rounded-sm hover:bg-su_secondary_bg">
            <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0L7.0575 1.0575L2.8725 5.25H12V6.75H2.8725L7.0575 10.9425L6 12L0 6L6 0Z" fill="#B6B6BD" />
            </svg>

            Back
          </span>
        </ExitPageDialog>

        <h2 className="font-semibold text-1.5xl">{title}</h2>

        <CopyTile textToCopy={tardeId} className="hidden lg:flex" >
          Unique trade ID: <span className="dark:text-su_primary font-semibold">#{getLastCharacters(tardeId, 7)}</span>
        </CopyTile>

        <button className="lg:hidden" >Details</button>
      </div>

      {
        swapPreferences &&
        <div className="flex items-center gap-2" >
          <p className="text-xs text-su_ternary font-normal" >Swap preferences:</p>

          {swapPreferences.preferred_asset.type === 'nft' &&
            <div className="flex items-center gap-2" >
              <SwapParameterTile
                title="Collection:"
                value={availableCollections.find(collection => collection.value === swapPreferences.preferred_asset.parameters.collection)?.label || ''}
              />

              <SwapParameterTile
                title="Rarity rank:"
                value={
                  <span className="flex items-center gap-2" >
                    <svg className="w-3 pb-0.5" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.7175 2.85714L6 0L4.2825 2.85714H7.7175ZM1.7175 7.14286L0 10H12L10.2825 7.14286H1.7175ZM9.855 6.42857L8.145 3.57143H3.855L2.145 6.42857H9.855Z" fill="white" />
                    </svg>

                    <>{swapPreferences.preferred_asset.parameters.rank?.from} - {swapPreferences.preferred_asset.parameters.rank?.to}</>
                  </span>
                }
              />
            </div>
          }

          {swapPreferences.preferred_asset.type === 'any' &&
            <div className="flex items-center gap-2" >

              <SwapParameterTile
                title="Any"
                valueClasses="uppercase"
              />
            </div>
          }

          {swapPreferences.preferred_asset.type === 'currency' &&
            <div className="flex items-center gap-2" >

              <SwapParameterTile
                title="Amount:"
                value={swapPreferences.preferred_asset.parameters.added_amount + " USD"}
                valueClasses="uppercase"
              />
              {
                (swapPreferences.preferred_asset.parameters.preferred_currency && swapPreferences.preferred_asset.parameters.preferred_currency.length > 0) &&

                <SwapParameterTile
                  title="Currencies:"
                  value={
                    <div className="flex items-center gap-2 flex-wrap" >
                      {
                        swapPreferences.preferred_asset.parameters.preferred_currency.map(currency => (
                          <ChainTile
                            key={currency.uuid}
                            imageSrc={currency.icon_url}
                            title={currency.name}
                          />
                        ))
                      }
                    </div>
                  }
                />
              }
            </div>
          }

        </div>
      }
    </div>
  );
};

export default RoomHeader;