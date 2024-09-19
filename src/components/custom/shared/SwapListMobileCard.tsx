import React from 'react';
import { SUI_OpenSwap, SUI_Swap } from '@/types/swap-market.types';
import { cn, getLastCharacters } from '@/lib/utils';
import { chainsDataset } from '@/constants/data';
import { mapSwapTokensHelper } from '@/lib/helpers';
import moment from 'moment';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import CopyTile from '../tiles/CopyTile';
import ChainTile from '../tiles/ChainTile';
import BadgeTile from '../tiles/BadgeTile';
import { useProfileStore } from '@/store/profile';
import { SUE_SWAP_MODE, SUE_SWAP_MODE_TO_STRING, SUE_SWAP_OFFER_TYPE_TO_STRING, SUE_SWAP_STATUS, SUE_SWAP_STATUS_TO_STRING } from '@/constants/enums';

interface IProp {
  swap: SUI_OpenSwap | SUI_Swap;
  swapCardType: 'private-party' | 'pending' | 'history';
}

const SwapListMobileCard = ({ swap, swapCardType = "pending" }: IProp) => {
  const [wallet] = useProfileStore(state => [state.profile.wallet]);
  const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];

  return (
    <section className='bg-su_secondary_bg rounded-lg space-y-5 py-3' >
      <aside className='flex flex-col gap-3 px-2.5'>
        {/* header */}
        <div className='flex items-center justify-between' >
          <div className='flex items-center gap-2'>
            <CopyTile
              textToCopy={swap.trade_id}
              className="flex text-xs lg:text-2xs !bg-transparent"
            >
              <span className="dark:text-su_primary">#{getLastCharacters(swap.trade_id, 7)}</span>
            </CopyTile>

            <div className='flex items-center gap-1' >
              <ChainTile
                imageSrc={currentChain.iconUrl}
                title={currentChain.name}
                className='rounded-full bg-su_active_bg'
                showChainTitleOnMobileScreen={false}
              />

              {
                (swap.init_address === wallet.address) ?
                  <BadgeTile className='normal-case text-2xs' >
                    <svg className="w-2.5" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3.17647V7.94118C12 8.52353 11.46 9 10.8 9H1.2C0.54 9 -2.88495e-08 8.52353 0 7.94118L2.36042e-07 3.17647C2.64891e-07 2.59412 0.54 2.11765 1.2 2.11765H2.4V3.17647L1.2 3.17647L1.2 7.94118H10.8V3.17647H9.6V2.11765H10.8C11.46 2.11765 12 2.59412 12 3.17647Z" fill="white" />
                      <path d="M3.846 3.39353L3 2.64706L6 0L9 2.64706L8.154 3.39353L6.6 2.02765L6.6 7.14706H5.4L5.4 2.02765L3.846 3.39353Z" fill="white" />
                    </svg>

                    Sent
                  </BadgeTile>

                  :
                  <BadgeTile className='normal-case text-2xs' >
                    <svg className="w-3" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3.17647V7.94118C12 8.52353 11.46 9 10.8 9H1.2C0.54 9 -2.88495e-08 8.52353 0 7.94118L2.36042e-07 3.17647C2.64891e-07 2.59412 0.54 2.11765 1.2 2.11765H2.4V3.17647L1.2 3.17647L1.2 7.94118H10.8V3.17647H9.6V2.11765H10.8C11.46 2.11765 12 2.59412 12 3.17647Z" fill="white" />
                      <path d="M3.846 3.75353L3 4.5L6 7.14706L9 4.5L8.154 3.75353L6.6 5.11941L6.6 4.62827e-08L5.4 0L5.4 5.11941L3.846 3.75353Z" fill="white" />
                    </svg>

                    Received
                  </BadgeTile>
              }

              {swapCardType !== 'private-party' &&
                <BadgeTile className='normal-case text-2xs gap-1' >
                  <span className='capitalize' >{SUE_SWAP_MODE_TO_STRING[`value${swap.swap_mode}`]}</span>
                  {(swap.swap_mode === SUE_SWAP_MODE.OPEN) ? "market" : "party"}
                </BadgeTile>
              }
            </div>
          </div>


          <Popover>
            <PopoverTrigger className='px-3 py-1.5 rounded-xs hover:bg-su_enable_bg cursor-pointer' >
              <svg
                className="w-1 cursor-pointer" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00039 12.8C2.42474 12.8 2.8317 12.9686 3.13176 13.2686C3.43182 13.5687 3.60039 13.9757 3.60039 14.4C3.60039 14.8243 3.43182 15.2313 3.13176 15.5314C2.8317 15.8314 2.42474 16 2.00039 16C1.57604 16 1.16908 15.8314 0.86902 15.5314C0.568961 15.2313 0.400391 14.8243 0.400391 14.4C0.400391 13.9757 0.568961 13.5687 0.86902 13.2686C1.16908 12.9686 1.57604 12.8 2.00039 12.8ZM2.00039 6.4C2.42474 6.4 2.8317 6.56857 3.13176 6.86863C3.43182 7.16869 3.60039 7.57565 3.60039 8C3.60039 8.42435 3.43182 8.83131 3.13176 9.13137C2.8317 9.43143 2.42474 9.6 2.00039 9.6C1.57604 9.6 1.16908 9.43143 0.86902 9.13137C0.568961 8.83131 0.400391 8.42435 0.400391 8C0.400391 7.57565 0.568961 7.16869 0.86902 6.86863C1.16908 6.56857 1.57604 6.4 2.00039 6.4ZM2.00039 0C2.42474 0 2.8317 0.168571 3.13176 0.468629C3.43182 0.768687 3.60039 1.17565 3.60039 1.6C3.60039 2.02435 3.43182 2.43131 3.13176 2.73137C2.8317 3.03143 2.42474 3.2 2.00039 3.2C1.57604 3.2 1.16908 3.03143 0.86902 2.73137C0.568961 2.43131 0.400391 2.02435 0.400391 1.6C0.400391 1.17565 0.568961 0.768687 0.86902 0.468629C1.16908 0.168571 1.57604 0 2.00039 0Z" fill="#B6B6BD" />
              </svg>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className="w-60 p-3 bg-card rounded-md mr-10"
            >
              <button
                // onClick={() => { handleNavigation(swap); }}
                className="action-hover-card-item"
              >
                <svg className='w-8' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.7284 11L22 15.1586H10.2385V14.0368H19.2184L16.9138 11.7931L17.7284 11ZM21.7615 16.8414V17.9632H12.7816L15.0862 20.2069L14.2716 21L10 16.8414H21.7615Z" fill="white" />
                </svg>

                Propose offer
              </button>
            </PopoverContent>
          </Popover>

        </div>

        <div className='flex items-center gap-2' >
          <div className='flex items-center gap-1.5' >
            {mapSwapTokensHelper(swap.metadata.init.tokens, 4)}
          </div>

          <svg className='w-2.5' viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.72844 0L12 4.15863H0.238525V3.0368H9.21836L6.91377 0.793135L7.72844 0ZM11.7615 5.84137V6.9632H2.78164L5.08623 9.20687L4.27156 10L0 5.84137H11.7615Z" fill="#868691" />
          </svg>

          <div className='flex items-center gap-1.5' >
            {mapSwapTokensHelper(swap.metadata.accept.tokens, 4)}
          </div>
        </div>
      </aside>

      <div className='w-full border-b border-b-white/20' ></div>

      <aside className='flex flex-col gap-3 px-2.5'>
        <div className={`grid gap-2 ${swapCardType === 'private-party' ? "grid-cols-4" : "grid-cols-3"}`} >

          <div className={`${swapCardType === 'private-party' ? "col-span-2" : "col-span-1"} space-y-1`} >
            <h3 className='text-2xs text-su_secondary' >Owner`s wallet</h3>

            <CopyTile
              textToCopy={swap.init_address}
              className="flex !bg-transparent p-0"
            >
              <span className="dark:text-su_primary line-clamp-1 text-xs font-semibold w-3/5">{swap.init_address}</span>
            </CopyTile>
          </div>

          {/* Created Date or offer review date */}
          <div className={`${swapCardType === 'private-party' ? "col-span-2" : "col-span-1"} space-y-1`} >
            <h3 className='text-2xs text-su_secondary' >
              {swapCardType !== 'history' ? "Creation date" : "Offer review date"}
            </h3>
            <span className="dark:text-su_primary text-xs font-semibold w-3/4">
              {swapCardType !== 'history' ?
                moment.utc(swap.updated_at).format('MMM DD, YYYY')
                :
                moment.utc(swap.created_at).format('MMM DD, YYYY')
              }
            </span>
          </div>

          {/* type or status */}
          {swapCardType !== "private-party" &&
            <div className='space-y-1' >
              <h3 className='text-2xs text-su_secondary' >
                {swapCardType === 'pending' && 'Type'}
                {swapCardType === 'history' && 'Status'}
              </h3>
              <span className="dark:text-su_primary text-xs font-semibold w-3/4 capitalize">
                {swapCardType === 'pending' &&
                  SUE_SWAP_OFFER_TYPE_TO_STRING[`value${swap.offer_type}`] + " offer"
                }

                {swapCardType === 'history' &&
                  <div className="w-auto flex items-center gap-2" >
                    <span
                      className={cn(
                        "rounded-full w-1.5 h-1.5 ",
                        swap.status === SUE_SWAP_STATUS.COMPLETED && "bg-su_positive",
                        swap.status === SUE_SWAP_STATUS.DECLINED && "bg-su_negative",
                        swap.status === SUE_SWAP_STATUS.CANCELED && "bg-su_negative",
                        swap.status === SUE_SWAP_STATUS.PENDING && "bg-su_info",
                      )}
                    >
                    </span>

                    <span className='capitalize' >
                      {SUE_SWAP_STATUS_TO_STRING[`value${swap.status!}`]}
                    </span>
                  </div>
                }
              </span>
            </div>
          }

        </div>
      </aside>
    </section >
  );
};

export default SwapListMobileCard;