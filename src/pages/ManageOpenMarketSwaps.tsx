import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSwapMarketStore } from "@/store/swap-market";
import { useNavigate } from "react-router-dom";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { toast } from "sonner";
import ExitPageDialog from "@/components/custom/shared/ExitPageDialog";
import { generateRandomKey, generateRandomTradeId, getLastCharacters } from "@/lib/utils";
import { SUI_OpenSwap, SUP_CancelSwap } from "@/types/swap-market.types";
import { Input } from "@/components/ui/input";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import FilterButton from "@/components/custom/shared/FilterButton";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import LoadingDataset from "@/components/custom/shared/LoadingDataset";
import { useCancelSwapOffer } from "@/service/queries/swap-market.query";
import { chainsDataset } from "@/constants/data";
import moment from "moment";
import { SUI_SwapCreation } from "@/types/global.types";

import { useProfileStore } from "@/store/profile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { getMyOpenSwapListApi } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { getWalletProxy } from "@/lib/walletProxy";
import { mapSwapTokensHelper, showWalletConnectionToast } from "@/lib/helpers";
import OpenSwapListMobileCard from "@/components/custom/swap-market/open-market/OpenSwapListMobileCard";
import { IOpenMarketSwapFilters } from "@/types/swap-market-store.types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Schema_OpenMarketFiltersForm } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import OpenMarketSwapFilterDrawer from "@/components/custom/swap-market/open-market/OpenMarketSwapFilterDrawer";
import OpenMarketAppliedFiltersBar from "@/components/custom/swap-market/open-market/OpenMarketAppliedFiltersBar";
import OpenMarketListItemActionPopover from "@/components/custom/swap-market/open-market/OpenMarketListItemActionPopover";


const ManageOpenMarketSwaps = () => {
  const navigate = useNavigate();

  const {
    setOpenCreatedSwapsData,
    filteredCreatedSwaps,
    createdSwaps,
    createdSwapsFilters,
    setOpenCreatedSwapsBySearch,
    createdSwapsFiltersApplied,
    createdSwapsSearchApplied,
    resetAllCreatedSwaps,
    setOpenCreatedSwapsByFilters,
    createdSwapCollections,
  } = useSwapMarketStore(state => state.openMarket);


  const wallet = useProfileStore(state => state.profile.wallet);

  const [swapCancel, setSwapCancel] = useState<SUI_SwapCreation>({ created: false, isLoading: false });
  const { mutateAsync: cancelSwapOffer } = useCancelSwapOffer();

  const handleResetData = () => {
    toast.custom(
      (id) => (
        <ToastLookCard
          variant="info"
          title="Manage Open Swap Room Closed"
          description={"Swaps data deleted."}
          onClose={() => toast.dismiss(id)}
        />
      ),
      {
        duration: 3000,
        className: 'w-full !bg-transparent',
        position: "bottom-left",
      }
    );
  };

  const handleFilteredCreatedSwapsBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setOpenCreatedSwapsBySearch(value);
  };

  const handleSwapCancel = async (swap: SUI_OpenSwap) => {
    try {

      setSwapCancel(prev => ({ ...prev, isLoading: true }));

      // Cancel swap blockchain logic
      const { sign } = await getWalletProxy().getUserSignature(swap, "state.swapEncodedMsg");

      if (!sign) {
        throw new Error("Failed to obtain swap signature.");
      }

      const triggerCancelSwap = await getWalletProxy().createAndUpdateSwap(swap, "CANCEL-ORIGINAL-OPEN-SWAP");

      if (!triggerCancelSwap) {
        throw new Error("Cancel Swap failed due to blockchain error.");
      }

      const payload: SUP_CancelSwap = {
        swap_mode: swap.swap_mode,
        open_trade_id: swap.open_trade_id
      };

      const offerResult = await cancelSwapOffer(payload);

      if (offerResult) {
        toast.custom(
          (id) => (
            <ToastLookCard
              variant="success"
              title="Swap Closed Successfully"
              description={"You have successfully closed the swap"}
              onClose={() => toast.dismiss(id)}
            />
          ),
          {
            duration: 3000,
            className: 'w-full !bg-transparent',
            position: "bottom-left",
          }
        );

        navigate("/swap-up/my-swaps/history");
      }

    } catch (error: any) {
      toast.custom(
        (id) => (
          <ToastLookCard
            variant="error"
            title="Error"
            description={error.message}
            onClose={() => toast.dismiss(id)}
          />
        ),
        {
          duration: 5000,
          className: 'w-full !bg-transparent',
          position: "bottom-left",
        }
      );

      // console.log(error);
    } finally {
      setSwapCancel(prev => ({ ...prev, isLoading: false }));
    }
  };

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: [`getPrivateSwapPendingListApi`],
    queryFn: async () => {
      try {
        if (wallet.address && wallet.isConnected) {
          const response = await getMyOpenSwapListApi(wallet.address);
          await setOpenCreatedSwapsData(response.data.data as SUI_OpenSwap[], wallet);
          return response.data.data;
        }

        return null;
      } catch (error: any) {
        await setOpenCreatedSwapsData([], wallet);
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

        throw error;
      }
    },
    retry: false
  });

  // Open market created swaps filters logic
  const [formKey, setFormKey] = useState(generateRandomKey(6));

  const openMarketForm = useForm<z.infer<typeof Schema_OpenMarketFiltersForm>>({
    resolver: zodResolver(Schema_OpenMarketFiltersForm),
    defaultValues: {
      offersFromCurrentChain: false,
      preferredAsset: 'any',
      amountRangeFrom: '',
      amountRangeTo: '',
      currencies: undefined,
      offeredRarityRank: '',
      collection: '',
      rarityRank: ''
    }
  });

  const getFiltersObjectByFormValues = () => {
    const { offersFromCurrentChain, preferredAsset, amountRangeFrom, amountRangeTo, collection, currencies, offeredRarityRank, rarityRank } = openMarketForm.getValues();

    const newFilters: IOpenMarketSwapFilters = {
      offersFromCurrentChain: offersFromCurrentChain ? offersFromCurrentChain : false,
      offeredRarityRank: offeredRarityRank ? JSON.parse(offeredRarityRank) : undefined,
      preferredAsset,
      amountRangeFrom: amountRangeFrom ? Number(amountRangeFrom) : createdSwapsFilters.amountRangeFrom,
      amountRangeTo: amountRangeTo ? Number(amountRangeTo) : createdSwapsFilters.amountRangeTo,
      collection,
      currencies,
      rarityRank: rarityRank ? JSON.parse(rarityRank) : undefined
    };

    return (newFilters);
  };

  const handleResetAppliedFilters = (resetType: 'all' | 'currency' | 'nft' | 'current-chain' | 'offered-rarity-rank') => {

    switch (resetType) {
      case 'all':
        resetAllCreatedSwaps();
        openMarketForm.reset();
        break;

      case 'current-chain':
        openMarketForm.setValue("offersFromCurrentChain", undefined);
        setOpenCreatedSwapsByFilters(getFiltersObjectByFormValues());
        break;

      case 'nft':
        openMarketForm.setValue('preferredAsset', 'any');
        openMarketForm.setValue('collection', '');
        openMarketForm.setValue('rarityRank', '');
        setOpenCreatedSwapsByFilters(getFiltersObjectByFormValues());
        break;

      case 'offered-rarity-rank':
        openMarketForm.setValue('offeredRarityRank', '');
        setOpenCreatedSwapsByFilters(getFiltersObjectByFormValues());
        break;

      case 'currency':
        openMarketForm.setValue('preferredAsset', 'any');
        openMarketForm.setValue('amountRangeFrom', '');
        openMarketForm.setValue('amountRangeTo', '');
        openMarketForm.setValue('currencies', undefined);
        setOpenCreatedSwapsByFilters(getFiltersObjectByFormValues());
        break;
      default:
        break;
    }

    setFormKey(generateRandomKey(6));
  };

  return (
    <div className="flex flex-col gap-4" >

      {/*Desktop: Swaps Management Page - Title and Header */}
      <div className="flex items-center gap-3" >
        <ExitPageDialog
          title={"Close Open Market Swaps Management"}
          description={"Are you sure you want to go back to Swap Market?"}
          redirectPath={"/swap-up/swap-market"}
          resetData={handleResetData}
        >
          <span
            className="text-sm dark:text-su_secondary flex items-center gap-2 cursor-pointer py-2 px-3 hover:rounded-sm hover:bg-su_secondary_bg">
            <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0L7.0575 1.0575L2.8725 5.25H12V6.75H2.8725L7.0575 10.9425L6 12L0 6L6 0Z" fill="#B6B6BD" />
            </svg>

            Back
          </span>
        </ExitPageDialog>

        <div className="w-full flex items-center justify-between gap-2 lg:gap-0">
          <h2 className="font-semibold text-xl lg:text-1.5xl line-clamp-1">Manage Open Market Swaps</h2>
          <div className="flex items-center gap-2">

            <Input
              className="hidden lg:flex min-w-full-[10px] bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
              placeholder="Search by NFT, trade ID, trading chain, etc..."
              onChange={handleFilteredCreatedSwapsBySearch}
              icon={
                <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
                </svg>
              }
            />
            <Button
              className={`gradient-button rounded-full px-2 py-2 lg:px-5 lg:py-3 lg:rounded-md`}
              onClick={() => {
                wallet.isConnected ?
                  navigate(`/swap-up/swap-market/open-swap/create/${generateRandomTradeId()}`) :
                  showWalletConnectionToast();
              }}
            >
              <span className="hidden lg:block" >Create open swap</span>

              <svg className="lg:hidden w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.74764 0.996582V0.246582H5.24764V0.996582V5.24834H0.996094H0.246094V6.74834H0.996094H5.24764V11.0004V11.7504H6.74764V11.0004V6.74834H10.9999H11.7499V5.24834H10.9999H6.74764V0.996582Z" fill="white" />
              </svg>

            </Button>
          </div>
        </div>
      </div>

      {/*Mobile: Search and filter button */}
      <div className='w-full lg:w-1/3 flex lg:hidden items-center justify-between gap-2' >
        <Input
          className="w-full bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
          placeholder="Search by NFT, trade ID, wallet, etc..."
          onChange={handleFilteredCreatedSwapsBySearch}
          icon={
            <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
            </svg>
          }
        />

        <div className='lg:hidden' >
          <OpenMarketSwapFilterDrawer
            formKey={formKey}
            setFormKey={setFormKey}
            openMarketForm={openMarketForm}
            handleResetAppliedFilters={handleResetAppliedFilters}
            availableCollections={createdSwapCollections}
            filters={createdSwapsFilters}
            setOpenMarketSwapsByFilters={setOpenCreatedSwapsByFilters}
          >
            <FilterButton className='rounded-md' filterApplied={createdSwapsFiltersApplied} />
          </OpenMarketSwapFilterDrawer>
        </div>
      </div>

      {/*Mobile: Filler applied to open market data */}
      {createdSwapsFiltersApplied &&
        <OpenMarketAppliedFiltersBar
          className={`lg:hidden`}
          handleResetAppliedFilters={handleResetAppliedFilters}
          filters={createdSwapsFilters}
        />
      }

      {/*Desktop: Available open swaps datalist */}
      <div className="hidden lg:block" >
        <ScrollArea className="min-w-full" >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold align-top min-w-[100px]">Assets</TableHead>
                <TableHead className="font-semibold align-top px-4 min-w-[130px]" >Unique trade ID</TableHead>
                <TableHead className="font-semibold align-top px-4 min-w-[130px]" >Trading chain</TableHead>
                <TableHead className="font-semibold align-top px-4 min-w-[145px]" >Open swap date</TableHead>
                <TableHead className="font-semibold align-top px-4 min-w-[145px]" >Expiry date</TableHead>
                <TableHead className="font-semibold align-top px-4 line-clamp-1" ># of incoming offers</TableHead>
                <TableHead className="font-semibold align-top px-4" >Swap Preferences</TableHead>
                <TableHead className="pr-2" >
                  <div className='-mt-3'>
                    <OpenMarketSwapFilterDrawer
                      formKey={formKey}
                      setFormKey={setFormKey}
                      openMarketForm={openMarketForm}
                      handleResetAppliedFilters={handleResetAppliedFilters}
                      availableCollections={createdSwapCollections}
                      filters={createdSwapsFilters}
                      setOpenMarketSwapsByFilters={setOpenCreatedSwapsByFilters}
                    >
                      <FilterButton showTitleOnMobile filterApplied={createdSwapsFiltersApplied} />
                    </OpenMarketSwapFilterDrawer>
                  </div>

                </TableHead>
              </TableRow>
            </TableHeader>

            {/* For Filters Applied */}
            {createdSwapsFiltersApplied &&
              <TableRow>
                <TableCell colSpan={8} >
                  <OpenMarketAppliedFiltersBar
                    handleResetAppliedFilters={handleResetAppliedFilters}
                    filters={createdSwapsFilters}
                  />
                </TableCell>
              </TableRow>
            }

            <TableBody className="divide-y">
              {
                filteredCreatedSwaps?.map(
                  (swap) => {
                    const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];
                    return (

                      <TableRow key={swap.open_trade_id}>
                        <TableCell className="text-xs font-medium flex items-center gap-2">
                          <div className="flex items-center gap-1" >
                            {mapSwapTokensHelper(swap.metadata.init.tokens, 4)}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium pl-4">
                          <div className="w-auto flex justify-start" >  # {getLastCharacters(swap.open_trade_id, 7)}</div>
                        </TableCell>
                        <TableCell className="text-xs font-medium px-4 flex justify-start">
                          <span
                            onClick={async () => { await handleSwapCancel(swap); }}
                            className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize"
                          >
                            <img
                              className='w-4 h-4'
                              src={currentChain.iconUrl}
                              alt=""
                            />

                            {currentChain.name}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs font-medium px-4">{moment.utc(swap.created_at).format('MMM DD YYYY HH:mm A')}</TableCell>
                        <TableCell className="text-xs font-medium px-4">{moment.utc(swap.swap_preferences.expiration_date).format('MMM DD YYYY HH:mm A')}</TableCell>
                        <TableCell className="text-xs font-medium px-4">{swap.number_of_offers}</TableCell>
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
                        <TableCell className="text-xs font-medium flex pr-16 justify-end">
                          {
                            (swapCancel.isLoading) ?
                              <svg className="animate-spin duration-700 w-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C3.58236 0 0 3.58236 0 8C0 12.4176 3.58236 16 8 16V14.0004C6.81346 14.0002 5.65362 13.6483 4.66712 12.989C3.68061 12.3296 2.91176 11.3926 2.45777 10.2964C2.00377 9.20014 1.88503 7.99389 2.11655 6.83016C2.34807 5.66643 2.91946 4.59748 3.75847 3.75847C4.59748 2.91946 5.66643 2.34807 6.83016 2.11655C7.99389 1.88503 9.20014 2.00377 10.2964 2.45777C11.3926 2.91176 12.3296 3.68061 12.989 4.66712C13.6483 5.65362 14.0002 6.81346 14.0004 8H16C16 3.58236 12.4176 0 8 0Z" fill="white" />
                              </svg>
                              :
                              <OpenMarketListItemActionPopover
                                cardType="created"
                                handleSwapCancel={handleSwapCancel}
                                swap={swap}
                                handleNavigation={() => { }}
                              />
                          }
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              }
            </TableBody>
          </Table>

          {
            (((filteredCreatedSwaps || []).length === 0) && (createdSwapsFiltersApplied || createdSwapsSearchApplied)) &&
            <EmptyDataset
              title="No Results Found"
              description="We couldn't find any results matching your search query. <br/>  Please try again with a different keyword or refine your search criteria."
              showBackgroundPicture={false}
            />
          }

          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>

      {/*Mobile: Available open swaps datalist */}
      <div className='flex flex-col gap-3 lg:hidden' >
        {filteredCreatedSwaps?.map((swap, index) => (
          <OpenSwapListMobileCard
            key={index}
            swap={swap}
            handleNavigation={() => { }}
            cardType="created"
            handleSwapCancel={handleSwapCancel}
          />
        ))}

        {
          (((filteredCreatedSwaps || []).length === 0) && (createdSwapsFiltersApplied || createdSwapsSearchApplied)) &&
          <EmptyDataset
            title="No Results Found"
            description="We couldn't find any results matching your search query.  Please try again with a different keyword or refine your search criteria."
            showBackgroundPicture={false}
          />
        }
      </div>

      <LoadingDataset
        isLoading={isLoading}
        title="Loading Open swaps created by you"
        description='open swap data is being loaded...'
      />

      {
        ((isError || isSuccess) && ((createdSwaps || []).length === 0) && (!createdSwapsFiltersApplied && !createdSwapsSearchApplied)) &&
        <EmptyDataset
          title="No Open Swaps Available"
          description="Check back later or create your own swap!"
        >
          <Button
            className="gradient-button"
            onClick={() => {
              wallet.isConnected ? navigate(`/swap-up/swap-market/open-market/open-room/${generateRandomTradeId()}`) : showWalletConnectionToast();
            }}
          >Create open swap</Button>
        </EmptyDataset>
      }

    </div >
  );
};

export default ManageOpenMarketSwaps;