import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import FilterButton from '../../shared/FilterButton';
import { cn, generateRandomTradeId, getDefaultNftImageOnError, getLastCharacters, getShortenWalletAddress } from '@/lib/utils';
import EmptyDataset from '../../shared/EmptyDataset';
import { SUI_OpenSwap, SUI_SwapToken } from '@/types/swap-market.types';
import { useSwapHistoryList } from '@/service/queries/swap-market.query';
import ToastLookCard from '../../shared/ToastLookCard';
import { chainsDataset } from '@/constants/data';
import moment from 'moment';
import LoadingDataset from '../../shared/LoadingDataset';
import CreatePrivateSwapDialog from "@/components/custom/swap-market/private-party/CreatePrivateSwapDialog";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

import { useProfileStore } from '@/store/profile';
import SwapHistoryDetailsDialog from './SwapHistoryDetailsDialog';
import { SUE_SWAP_MODE, SUE_SWAP_STATUS, SUE_SWAP_STATUS_TO_STRING } from '@/constants/enums';
import BadgeTile from '../../tiles/BadgeTile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { showWalletConnectionToast } from '@/lib/helpers';
import HistorySwapsFilterDrawer from './HistorySwapsFilterDrawer';
import { useMySwapStore } from '@/store/my-swaps';


const SwapHistoryTabContent = () => {
  const navigate = useNavigate();
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [setMySwapsData, filteredHistorySwaps] = useMySwapStore(state => [state.setMySwapsData, state.filteredHistorySwaps]);
  const wallet = useProfileStore(state => state.profile.wallet);
  const [historyFilters] = useMySwapStore(state => [state.historyFilters]);
  const { isLoading, isError, error, data, isSuccess } = useSwapHistoryList(wallet.address);

  useEffect(() => {
    if (data?.data && isSuccess) {

      if (data.data.data.length > 0) {
        setMySwapsData(data.data.data as SUI_OpenSwap[], 'history');
      }
    }

    if (error && isError) {
      toast.custom(
        (id) => (
          <ToastLookCard
            variant="error"
            title="Request failed!"
            description={error.message}
            onClose={() => toast.dismiss(id)}
          />
        ),
        {
          duration: 3000,
          className: 'w-full !bg-transparent',
          position: "bottom-left",
        }
      );
    }

  }, [isError, error, data, isSuccess]);

  useEffect(() => {
    if (
      historyFilters.offersFromCurrentChain === true ||
      historyFilters.requestedDate !== '' ||
      historyFilters.swapMode !== 'all' ||
      historyFilters.swapStatus !== 'all'
    ) {
      setFiltersApplied(true);
    } else {
      setFiltersApplied(false);
    }

  }, [historyFilters.offersFromCurrentChain, historyFilters.requestedDate, historyFilters.swapMode, historyFilters.swapStatus]);

  const nftsImageMapper = (nfts: SUI_SwapToken[], showMaxNumberOfNfts: number) => {
    return (
      nfts.map((nft, index) => {
        if (index < showMaxNumberOfNfts)
          return (
            <div className="relative w-8 h-8" key={nft.id}>
              <img
                className="w-full h-full object-cover rounded-xs border-[1.5px] border-white/20"
                src={nft.image_url}
                alt="nft"
                onError={getDefaultNftImageOnError}
              />

              {
                ((index === showMaxNumberOfNfts - 1) && nfts.length > showMaxNumberOfNfts) ?
                  <div className="absolute w-full h-full rounded-xs bg-black/50 top-0 flex justify-center items-center font-semibold" >
                    +{nfts.length - showMaxNumberOfNfts}
                  </div> : ''
              }
            </div>
          );
      })
    );
  };

  return (
    <div className="space-y-4 w-full">

      <ScrollArea className='min-w-full' >
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="align-top font-semibold min-w-[200px]">Assets</TableHead>
              <TableHead className="align-top font-semibold min-w-[150px] pl-8" >Unique trade ID</TableHead>
              <TableHead className="align-top font-semibold px-4 line-clamp-1 h-1" >Counter-party wallet address</TableHead>
              <TableHead className="align-top font-semibold px-4 min-w-[135px]" >Swap mode</TableHead>
              <TableHead className="align-top font-semibold px-4" >Trading chain</TableHead>
              <TableHead className="align-top font-semibold px-4 line-clamp-1 h-1" >Offer review date</TableHead>
              <TableHead className="align-top font-semibold px-4" >Status</TableHead>
              <TableHead className="w-[130px] pr-2 relative" >
                <div className="absolute top-2 left-4">
                  <HistorySwapsFilterDrawer>
                    <FilterButton
                      showTitleOnMobile
                      filterApplied={filtersApplied}
                    />
                  </HistorySwapsFilterDrawer>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y">
            {
              filteredHistorySwaps?.map((swap) => {
                const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];
                return (
                  <TableRow key={swap.trade_id}>
                    <TableCell className="text-xs font-medium flex items-center gap-2">

                      <div className='flex items-center gap-1'>
                        {nftsImageMapper(swap.metadata.init.tokens, 2)}
                      </div>

                      <svg className="w-4" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.72844 0L12 4.15863H0.238525V3.0368H9.21836L6.91377 0.793135L7.72844 0ZM11.7615 5.84137V6.9632H2.78164L5.08623 9.20687L4.27156 10L0 5.84137H11.7615Z" fill="#868691" />
                      </svg>

                      <div className="flex items-center gap-1" >
                        {nftsImageMapper(swap.metadata.accept.tokens, 2)}
                      </div>

                    </TableCell>

                    <TableCell className="text-xs font-medium pl-8">
                      <div className="w-auto flex justify-start" >  #
                        {getLastCharacters(swap.trade_id, 7)}</div>
                    </TableCell>

                    <TableCell className="text-xs font-medium px-4">
                      {
                        swap.init_address === wallet.address ?
                          <div className="w-auto flex justify-start" >{getShortenWalletAddress(swap.accept_address)}</div>
                          :
                          <div className="w-auto flex justify-start" >{getShortenWalletAddress(swap.init_address)}</div>
                      }
                    </TableCell>

                    <TableCell className="text-xs font-medium px-4">
                      {swap.swap_mode === SUE_SWAP_MODE.OPEN ? <BadgeTile>Open market</BadgeTile> : <BadgeTile>private market</BadgeTile>}
                    </TableCell>

                    <TableCell className="text-xs font-medium px-4 ">
                      <BadgeTile>
                        <img
                          className='w-3 h-3'
                          src={currentChain.iconUrl}
                          alt=""
                        />

                        {currentChain.name}
                      </BadgeTile>
                    </TableCell>

                    <TableCell className="text-xs font-medium px-4">{moment.utc(swap.updated_at).format('MMM Do, YYYY')}</TableCell>

                    <TableCell className="text-xs font-medium px-4 capitalize">
                      <div className="w-auto flex items-center gap-2" >
                        <span
                          className={cn(
                            "rounded-full w-1.5 h-1.5 ",
                            swap.status === SUE_SWAP_STATUS.COMPLETED && "bg-su_positive",
                            swap.status === SUE_SWAP_STATUS.DECLINED && "bg-su_positive",
                            swap.status === SUE_SWAP_STATUS.CANCELED && "bg-su_negative",
                          )}
                        >
                        </span>

                        <span className='capitalize' >
                          {SUE_SWAP_STATUS_TO_STRING[`value${swap.status!}`]}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className=" pb-10 text-xs font-medium pr-3 lg:pr-14">
                      <div className="flex justify-end">
                        <SwapHistoryDetailsDialog swap={swap}>
                          <svg className='w-4' viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3.3C7.42135 3.3 6.86639 3.53178 6.45722 3.94436C6.04805 4.35695 5.81818 4.91652 5.81818 5.5C5.81818 6.08348 6.04805 6.64306 6.45722 7.05564C6.86639 7.46822 7.42135 7.7 8 7.7C8.57865 7.7 9.13361 7.46822 9.54278 7.05564C9.95195 6.64306 10.1818 6.08348 10.1818 5.5C10.1818 4.91652 9.95195 4.35695 9.54278 3.94436C9.13361 3.53178 8.57865 3.3 8 3.3ZM8 9.16667C7.03558 9.16667 6.11065 8.78036 5.4287 8.09272C4.74675 7.40509 4.36364 6.47246 4.36364 5.5C4.36364 4.52754 4.74675 3.59491 5.4287 2.90728C6.11065 2.21964 7.03558 1.83333 8 1.83333C8.96442 1.83333 9.88935 2.21964 10.5713 2.90728C11.2532 3.59491 11.6364 4.52754 11.6364 5.5C11.6364 6.47246 11.2532 7.40509 10.5713 8.09272C9.88935 8.78036 8.96442 9.16667 8 9.16667ZM8 0C4.36364 0 1.25818 2.28067 0 5.5C1.25818 8.71933 4.36364 11 8 11C11.6364 11 14.7418 8.71933 16 5.5C14.7418 2.28067 11.6364 0 8 0Z" fill="#B6B6BD" />
                          </svg>
                        </SwapHistoryDetailsDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>

        {
          (((filteredHistorySwaps || []).length === 0) && filtersApplied) &&
          <EmptyDataset
            title="No Results Found"
            description="We couldn't find any results matching your search query. <br/>  Please try again with a different keyword or refine your search criteria."
            showBackgroundPicture={false}
          />
        }
        <ScrollBar orientation='horizontal' className='h-2' />
      </ScrollArea>


      <LoadingDataset
        isLoading={isLoading}
        title="Loading swaps history"
        description='swaps history data is being loaded...'
      />

      {
        (isSuccess && ((filteredHistorySwaps || []).length === 0) && !filtersApplied) &&
        <EmptyDataset
          title="No Pending Swaps Offers Yet"
          description="Your pending swap inbox is empty create your own swap!"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="gradient-button px-5 py-3 gap-4">
              Create Swap

              <svg className={`w-4 rotate-180`} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L6 2L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="dark:bg-su_least_bg rounded-md min-w-full px-6 py-4 mt-1 flex flex-col gap-2 z-50">

              <div
                className="relative text-sm flex items-center gap-4 cursor-pointer hover:bg-su_enable_bg py-2 px-4 rounded-md"
                onClick={() => {
                  wallet.isConnected ? navigate(`/swap-up/swap-market/open-swap/create/${generateRandomTradeId()}`) : showWalletConnectionToast();
                }}
              >
                <svg className="w-5" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C8.61884 0 9.21233 0.25431 9.64992 0.706984C10.0875 1.15966 10.3333 1.77362 10.3333 2.41379C10.3333 3.05397 10.0875 3.66793 9.64992 4.1206C9.21233 4.57328 8.61884 4.82759 8 4.82759C7.38116 4.82759 6.78767 4.57328 6.35008 4.1206C5.9125 3.66793 5.66667 3.05397 5.66667 2.41379C5.66667 1.77362 5.9125 1.15966 6.35008 0.706984C6.78767 0.25431 7.38116 0 8 0ZM3.33333 1.72414C3.70667 1.72414 4.05333 1.82759 4.35333 2.01379C4.25333 3 4.53333 3.97931 5.10667 4.74483C4.77333 5.4069 4.10667 5.86207 3.33333 5.86207C2.8029 5.86207 2.29419 5.64409 1.91912 5.25608C1.54405 4.86808 1.33333 4.34183 1.33333 3.7931C1.33333 3.24438 1.54405 2.71813 1.91912 2.33012C2.29419 1.94212 2.8029 1.72414 3.33333 1.72414ZM12.6667 1.72414C13.1971 1.72414 13.7058 1.94212 14.0809 2.33012C14.456 2.71813 14.6667 3.24438 14.6667 3.7931C14.6667 4.34183 14.456 4.86808 14.0809 5.25608C13.7058 5.64409 13.1971 5.86207 12.6667 5.86207C11.8933 5.86207 11.2267 5.4069 10.8933 4.74483C11.4743 3.96843 11.7441 2.99046 11.6467 2.01379C11.9467 1.82759 12.2933 1.72414 12.6667 1.72414ZM3.66667 8.7931C3.66667 7.36552 5.60667 6.2069 8 6.2069C10.3933 6.2069 12.3333 7.36552 12.3333 8.7931V10H3.66667V8.7931ZM0 10V8.96552C0 8.0069 1.26 7.2 2.96667 6.96552C2.57333 7.43448 2.33333 8.08276 2.33333 8.7931V10H0ZM16 10H13.6667V8.7931C13.6667 8.08276 13.4267 7.43448 13.0333 6.96552C14.74 7.2 16 8.0069 16 8.96552V10Z" fill="#B6B6BD" />
                </svg>
                Open Market
              </div>

              <div className="group relative" >
                <CreatePrivateSwapDialog>
                  <div className="relative text-sm flex items-center gap-4 cursor-pointer group-hover:bg-su_enable_bg py-2 px-4 rounded-md">
                    <svg className="w-5" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5.05556L5.45455 2.52778L8 0L10.5455 2.52778L8 5.05556ZM0 13V10.1111C0 9.70185 0.142545 9.3588 0.427636 9.08194C0.712727 8.80509 1.05503 8.66667 1.45455 8.66667H3.83636C4.07879 8.66667 4.30909 8.72685 4.52727 8.84722C4.74545 8.96759 4.92121 9.13009 5.05454 9.33472C5.40606 9.80417 5.83951 10.1713 6.35491 10.4361C6.8703 10.7009 7.41867 10.8333 8 10.8333C8.59394 10.8333 9.14861 10.7009 9.664 10.4361C10.1794 10.1713 10.6065 9.80417 10.9455 9.33472C11.103 9.13009 11.288 8.96759 11.5004 8.84722C11.7127 8.72685 11.9338 8.66667 12.1636 8.66667H14.5455C14.9576 8.66667 15.303 8.80509 15.5818 9.08194C15.8606 9.3588 16 9.70185 16 10.1111V13H10.9091V11.3569C10.4848 11.6579 10.0272 11.8866 9.536 12.0431C9.04485 12.1995 8.53285 12.2778 8 12.2778C7.47879 12.2778 6.9697 12.1966 6.47273 12.0344C5.97576 11.8721 5.51515 11.6403 5.09091 11.3389V13H0ZM2.18182 7.94444C1.57576 7.94444 1.06061 7.7338 0.636364 7.3125C0.212121 6.8912 0 6.37963 0 5.77778C0 5.16389 0.212121 4.64943 0.636364 4.23439C1.06061 3.81935 1.57576 3.61159 2.18182 3.61111C2.8 3.61111 3.3183 3.81887 3.73673 4.23439C4.15515 4.64991 4.36412 5.16437 4.36364 5.77778C4.36364 6.37963 4.15467 6.8912 3.73673 7.3125C3.31879 7.7338 2.80048 7.94444 2.18182 7.94444ZM13.8182 7.94444C13.2121 7.94444 12.697 7.7338 12.2727 7.3125C11.8485 6.8912 11.6364 6.37963 11.6364 5.77778C11.6364 5.16389 11.8485 4.64943 12.2727 4.23439C12.697 3.81935 13.2121 3.61159 13.8182 3.61111C14.4364 3.61111 14.9547 3.81887 15.3731 4.23439C15.7915 4.64991 16.0005 5.16437 16 5.77778C16 6.37963 15.791 6.8912 15.3731 7.3125C14.9552 7.7338 14.4368 7.94444 13.8182 7.94444Z" fill="#B6B6BD" />
                    </svg>
                    Private Party
                  </div>
                </CreatePrivateSwapDialog>

                <span
                  className={`${wallet.isConnected ? "hidden" : "absolute"} cursor-pointer top-0 left-0 w-full h-full bg-transparent rounded-full`}
                  onClick={() => showWalletConnectionToast()}
                ></span>

              </div>

            </DropdownMenuContent>
          </DropdownMenu>
          <span
            className={`${wallet.isConnected ? "hidden" : "absolute"} cursor-pointer top-0 left-0 w-full h-full bg-transparent rounded-full`}
            onClick={() => showWalletConnectionToast()}
          ></span>

        </EmptyDataset>
      }
    </div >
  );
};

export default SwapHistoryTabContent;