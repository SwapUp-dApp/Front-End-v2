import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import FilterButton from '../../shared/FilterButton';
import { Button } from '@/components/ui/button';
import EmptyDataset from '../../shared/EmptyDataset';
import { generateRandomTradeId, getDefaultNftImageOnError, getLastCharacters, getShortenWalletAddress } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { SUI_OpenSwap, SUI_SwapToken } from '@/types/swap-market.types';
import CreatedSwapsCards from './CreatedSwapsCards';
import { useOpenSwapsPendingList } from '@/service/queries/swap-market.query';
import ToastLookCard from '../../shared/ToastLookCard';
import { chainsDataset } from '@/constants/data';
import moment from 'moment';
import LoadingDataset from '../../shared/LoadingDataset';
import { useSwapMarketStore } from '@/store/swap-market';
import { useProfileStore } from '@/store/profile';
import { showWalletConnectionToast } from '@/lib/helpers';
import OpenMarketSwapFilterDrawer from './OpenMarketSwapFilterDrawer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const OpenMarketTabContent = () => {
  const { setOpenSwapsData, createdSwaps, availableOpenSwaps, filteredAvailableOpenSwaps, setOpenMarketAvailableSwapsBySearch, openMarketSwapsFilters, availableOpenSwapsFiltersApplied, availableOpenSwapsSearchApplied } = useSwapMarketStore(state => state.openMarket);
  const wallet = useProfileStore(state => state.profile.wallet);
  const navigate = useNavigate();


  const handleFilterAvailableSwapsBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setOpenMarketAvailableSwapsBySearch(value);
  };

  const { isLoading, isError, error, data, isSuccess } = useOpenSwapsPendingList();

  useEffect(() => {
    if (data?.data && isSuccess) {

      if (data.data.data.length > 0) {
        setOpenSwapsData(data.data.data as SUI_OpenSwap[], wallet);
      }
    }

    if (error && isError) {
      setOpenSwapsData([], wallet);
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

  const nftsImageMapper = (nfts: SUI_SwapToken[]) => {
    return (
      nfts.map((nft, index) => {
        if (index < 3)
          return (
            <div className="relative w-8 h-8" key={nft.id}>
              <img
                className="w-full h-full object-cover rounded-xs border-[1.5px] border-white/20"
                src={nft.image_url}
                alt="nft"
                onError={getDefaultNftImageOnError}
              />

              {
                (index === 2) &&
                  nfts.length > 3 ?
                  <div className="absolute w-full h-full rounded-xs bg-black/50 top-0 flex justify-center items-center font-semibold" >
                    +{nfts.length - 3}
                  </div> : ''
              }
            </div>
          );
      })
    );
  };

  return (
    <div className="space-y-4 w-full">

      <div className="flex items-center justify-between" >
        <div className="flex items-center justify-between gap-4" >
          <h2 className="text-1.5xl font-medium" >Created</h2>
          <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${(createdSwaps || []).length > 0 ? 'bg-white text-su_primary_bg' : 'bg-muted'}`}>
            {(createdSwaps || []).length}
          </span>
        </div>

        {
          (createdSwaps || []).length > 0 &&
          <div
            className="flex items-center justify-between gap-4 py-2 px-3 rounded-sm cursor-pointer hover:bg-su_enable_bg"
            onClick={() => { wallet.isConnected ? navigate(`/swap-up/swap-market/open-market/manage-open-market`) : showWalletConnectionToast(); }}
          >
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.35821 12L4.1194 10.08C3.99005 10.03 3.86826 9.97 3.75403 9.9C3.6398 9.83 3.52776 9.755 3.41791 9.675L1.64179 10.425L0 7.575L1.53731 6.405C1.52736 6.335 1.52239 6.2676 1.52239 6.2028V5.7978C1.52239 5.7326 1.52736 5.665 1.53731 5.595L0 4.425L1.64179 1.575L3.41791 2.325C3.52736 2.245 3.64179 2.17 3.76119 2.1C3.8806 2.03 4 1.97 4.1194 1.92L4.35821 0H7.64179L7.8806 1.92C8.00995 1.97 8.13194 2.03 8.24657 2.1C8.36119 2.17 8.47304 2.245 8.58209 2.325L10.3582 1.575L12 4.425L10.4627 5.595C10.4726 5.665 10.4776 5.7326 10.4776 5.7978V6.2022C10.4776 6.2674 10.4677 6.335 10.4478 6.405L11.9851 7.575L10.3433 10.425L8.58209 9.675C8.47264 9.755 8.35821 9.83 8.23881 9.9C8.1194 9.97 8 10.03 7.8806 10.08L7.64179 12H4.35821ZM6.02985 8.1C6.60697 8.1 7.0995 7.895 7.50746 7.485C7.91542 7.075 8.1194 6.58 8.1194 6C8.1194 5.42 7.91542 4.925 7.50746 4.515C7.0995 4.105 6.60697 3.9 6.02985 3.9C5.44279 3.9 4.94766 4.105 4.54448 4.515C4.14129 4.925 3.9399 5.42 3.9403 6C3.9407 6.58 4.14229 7.075 4.54507 7.485C4.94786 7.895 5.44279 8.1 6.02985 8.1Z" fill="white" />
            </svg>
            Manage
          </div>
        }
      </div>

      <ScrollArea className='w-full' >
        <div className="flex items-center gap-3 p-2" >
          {createdSwaps &&
            createdSwaps.map(swap => (
              <CreatedSwapsCards key={swap.open_trade_id} swap={swap} />
            ))
          }
        </div>
        <ScrollBar orientation='horizontal' className='h-2' />
      </ScrollArea>

      {/* Filter Data and Title */}
      <div className="flex items-center justify-between" >
        <div className="flex items-center justify-between gap-4" >
          <h2 className="text-1.5xl font-medium" >Available</h2>
          <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${(filteredAvailableOpenSwaps || []).length > 0 ? 'bg-white text-su_primary_bg' : 'bg-muted'}`}>
            {filteredAvailableOpenSwaps?.length || 0}
          </span>
        </div>

        <Input
          className="w-1/3 bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
          placeholder="Search by NFT, trade ID, wallet, etc..."
          onChange={handleFilterAvailableSwapsBySearch}
          icon={
            <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
            </svg>
          }
        />
      </div>

      <ScrollArea className='w-full' >
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="align-top font-semibold min-w-[150px]">Assets</TableHead>
              <TableHead className="align-top font-semibold" >Unique trade ID</TableHead>
              <TableHead className="align-top font-semibold" >Owner's wallet</TableHead>
              <TableHead className="align-top font-semibold" >Trading chain</TableHead>
              <TableHead className="align-top font-semibold" >Open swap date</TableHead>
              <TableHead className="align-top font-semibold" >Expiry date</TableHead>
              <TableHead className="align-top font-semibold " >Swap Preferences</TableHead>
              <TableHead className="pr-2" >
                <div className='-mt-3' ><OpenMarketSwapFilterDrawer><FilterButton showTitleOnMobile filterApplied={availableOpenSwapsFiltersApplied} /></OpenMarketSwapFilterDrawer></div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y">
            {
              filteredAvailableOpenSwaps?.map((swap) => {
                const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];
                return (
                  <TableRow key={swap.open_trade_id}>
                    <TableCell className="text-xs font-medium flex items-center gap-2">
                      <div className="flex items-center gap-1" >
                        {nftsImageMapper(swap.metadata.init.tokens)}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium pl-4">#{getLastCharacters(swap.open_trade_id, 7)}</TableCell>
                    <TableCell className="text-xs font-medium px-4">{getShortenWalletAddress(swap.init_address)}</TableCell>
                    <TableCell className="text-xs font-medium px-4 flex justify-start">
                      <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                        <img
                          className='w-4 h-4'
                          src={currentChain.iconUrl}
                          alt=""
                        />

                        {currentChain.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-medium px-4">{moment.utc(swap.created_at).format('MMM DD, YYYY')}</TableCell>
                    <TableCell className="text-xs font-medium px-4">{moment.utc(swap.swap_preferences.expiration_date).local().format('MMM DD, YYYY')}</TableCell>
                    <TableCell className="text-xs font-medium px-4 capitalize">

                      {
                        swap.swap_preferences.preferred_asset.type === "any" &&
                        <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                          Any
                        </span>
                      }

                      {
                        swap.swap_preferences.preferred_asset.type === "nft" &&
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                            {swap.swap_preferences.preferred_asset.parameters.collection}
                          </span>
                          /
                          <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                            {swap.swap_preferences.preferred_asset.parameters.rank?.from} - {swap.swap_preferences.preferred_asset.parameters.rank?.to}
                          </span>
                        </div>
                      }

                      {swap.swap_preferences.preferred_asset.type === "currency" &&
                        <div className="flex items-center gap-1">
                          <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                            {swap.swap_preferences.preferred_asset.parameters.added_amount} USD
                          </span>

                        </div>
                      }
                    </TableCell>
                    <TableCell className="text-xs font-medium flex pr-8 justify-end">
                      <svg
                        onClick={() => { navigate(`/swap-up/swap-market/open-swap/propose/${swap.open_trade_id}/${generateRandomTradeId()}`); }}

                        className="w-12 h-6 cursor-pointer"
                        viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="30" height="30" rx="15" stroke="url(#paint0_linear_2344_40905)" strokeWidth="2" />
                        <path d="M17.7284 11L22 15.1586H10.2385V14.0368H19.2184L16.9138 11.7931L17.7284 11ZM21.7615 16.8414V17.9632H12.7816L15.0862 20.2069L14.2716 21L10 16.8414H21.7615Z" fill="white" />
                        <defs>
                          <linearGradient id="paint0_linear_2344_40905" x1="32" y1="6.08" x2="-1.86631" y2="14.9716" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#51C0FF" />
                            <stop offset="1" stopColor="#9452FF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>

        {
          (((filteredAvailableOpenSwaps || []).length === 0) && (availableOpenSwapsFiltersApplied || availableOpenSwapsSearchApplied)) &&
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
        title="Loading open swaps"
        description='Open swaps data is being loaded...'
      />

      {
        (isSuccess && ((availableOpenSwaps || []).length === 0) && !availableOpenSwapsFiltersApplied && !availableOpenSwapsSearchApplied) &&
        <EmptyDataset
          title="No Open Swaps Available"
          description="Check back later or create your own swap!"
        >
          <Button
            className="gradient-button"
            onClick={() => {
              wallet.isConnected ?
                navigate(`/swap-up/swap-market/open-swap/create/${generateRandomTradeId()}`)
                : showWalletConnectionToast();
            }}
          >
            Create open swap
          </Button>
        </EmptyDataset>
      }

    </div >
  );
};

export default OpenMarketTabContent;