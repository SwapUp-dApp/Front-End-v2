import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSwapMarketStore } from "@/store/swap-market";
import { useNavigate } from "react-router-dom";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { toast } from "sonner";
import ExitPageDialog from "@/components/custom/shared/ExitPageDialog";
import { generateRandomTradeId, getDefaultNftImageOnError, getLastCharacters } from "@/lib/utils";
import { SUI_OpenSwap, SUI_SwapToken, SUP_CancelSwap } from "@/types/swap-market.types";
import { Input } from "@/components/ui/input";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import FilterButton from "@/components/custom/shared/FilterButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import LoadingDataset from "@/components/custom/shared/LoadingDataset";
import { useCancelSwapOffer, useMyOpenSwapsList } from "@/service/queries/swap-market.query";
import { chainsDataset } from "@/constants/data";
import moment from "moment";
import { SUI_SwapCreation } from "@/types/global.types";
import { SUE_SWAP_MODE } from "@/constants/enums";
import { useProfileStore } from "@/store/profile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import OpenMarketCreatedFiltersDrawer from "@/components/custom/swap-market/open-market/OpenMarketCreatedFiltersDrawer";


const ManageOpenMarketSwaps = () => {
  const navigate = useNavigate();
  const [filtersApplied, setFiltersApplied] = useState(false);

  const { setOpenCreatedSwapsData, filteredCreatedSwaps, createdSwaps, createdSwapsFilters, setOpenCreatedSwapsBySearch } = useSwapMarketStore(state => state.openMarket);
  const wallet = useProfileStore(state => state.profile.wallet);

  const [swapCancel, setSwapCancel] = useState<SUI_SwapCreation>({ created: false, isLoading: false });
  const { mutateAsync: cancelSwapOffer } = useCancelSwapOffer();

  const handleShowWalletConnectionToast = () => {
    toast.custom(
      (id) => (
        <ToastLookCard
          variant="error"
          title="Connect to wallet!"
          description={"Please connect to wallet for this feature!"}
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


  const handleSwapCancel = async (swap: SUI_OpenSwap) => {
    try {

      setSwapCancel(prev => ({ ...prev, isLoading: true }));

      console.log(swapCancel.isLoading);

      if (swap.swap_mode === SUE_SWAP_MODE.OPEN) {
        const payload: SUP_CancelSwap = {
          swap_mode: swap.swap_mode,
          open_trade_id: swap.open_trade_id
        };
        const offerResult = await cancelSwapOffer(payload);
        // console.log(swap.id);
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
          setSwapCancel(prev => ({ ...prev, created: true }));
        }
      }

      if (swap.swap_mode === SUE_SWAP_MODE.PRIVATE) {
        const payload: SUP_CancelSwap = {
          swap_mode: swap.swap_mode,
          trade_id: swap.trade_id
        };
        const offerResult = await cancelSwapOffer(payload);
        console.log(swap.id);
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
          setSwapCancel(prev => ({ ...prev, created: true }));

        }

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

  const { isLoading, isError, error, data, isSuccess } = useMyOpenSwapsList(wallet.address);

  useEffect(() => {
    if (data?.data && isSuccess) {

      if (data.data.data.length > 0) {
        setOpenCreatedSwapsData(data.data.data as SUI_OpenSwap[], wallet);
      }
    }

    if (error && isError) {
      setOpenCreatedSwapsData([], wallet);
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
      createdSwapsFilters.offersFromCurrentChain === true ||
      createdSwapsFilters.offeredRarityRank ||
      (createdSwapsFilters.collection && createdSwapsFilters.rarityRank) ||
      (createdSwapsFilters.amountRangeFrom && createdSwapsFilters.amountRangeTo && createdSwapsFilters.currencies)
    ) {
      setFiltersApplied(true);
    } else {
      setFiltersApplied(false);
    }

  }, [
    createdSwapsFilters.offersFromCurrentChain,
    createdSwapsFilters.collection,
    createdSwapsFilters.rarityRank,
    createdSwapsFilters.offeredRarityRank,
    createdSwapsFilters.amountRangeFrom,
    createdSwapsFilters.amountRangeTo,
    createdSwapsFilters.currencies,

  ]);

  return (
    <div className="flex flex-col gap-4" >

      {/* Swaps Management Page - Title and Header */}
      <div className="flex flex-col lg:flex-row gap-3" >
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
        <div className=" w-full flex items-center justify-between">
          <h2 className="font-semibold text-1.5xl " >Manage Open Market Swaps</h2>
          <div className="flex items-center gap-2">
            <Input
              className="min-w-full-[10px] bg-su_enable_bg text-su_secondary !p-3.5 mr-1"
              placeholder="Search by NFT, trade ID, trading chain, etc..."
              onChange={handleFilteredCreatedSwapsBySearch}
              icon={
                <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 14.6154L11.2277 9.84231C11.9968 8.78544 12.4105 7.5117 12.4092 6.20462C12.4092 2.78346 9.62577 0 6.20462 0C2.78346 0 0 2.78346 0 6.20462C0 9.62577 2.78346 12.4092 6.20462 12.4092C7.5117 12.4105 8.78544 11.9968 9.84231 11.2277L14.6154 16L16 14.6154ZM6.20462 10.4496C5.36493 10.4497 4.54407 10.2008 3.84586 9.7343C3.14765 9.26784 2.60345 8.60481 2.28208 7.82905C1.96071 7.05329 1.8766 6.19965 2.0404 5.37609C2.2042 4.55253 2.60854 3.79604 3.20229 3.20229C3.79604 2.60854 4.55253 2.2042 5.37609 2.0404C6.19965 1.8766 7.05329 1.96071 7.82905 2.28208C8.60481 2.60345 9.26784 3.14765 9.7343 3.84586C10.2008 4.54407 10.4497 5.36493 10.4496 6.20462C10.4483 7.33005 10.0006 8.40902 9.20482 9.20482C8.40902 10.0006 7.33005 10.4483 6.20462 10.4496Z" fill="#868691" />
                </svg>
              }
            />
            <Button
              className="gradient-button"
              onClick={() => {
                wallet.isConnected ? navigate(`/swap-up/swap-market/open-swap/create/${generateRandomTradeId()}`) : handleShowWalletConnectionToast();
              }}
            >Create open swap</Button>
          </div>
        </div>
      </div>

      {/* Swaps Management Table */}
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
                <div className='-mt-3' >
                  <OpenMarketCreatedFiltersDrawer>
                    <FilterButton showTitleOnMobile filterApplied={filtersApplied} />
                  </OpenMarketCreatedFiltersDrawer></div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y">
            {
              filteredCreatedSwaps?.map(
                (swap) => {
                  const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];
                  return (

                    <TableRow key={swap.open_trade_id}>
                      <TableCell className="text-xs font-medium flex items-center gap-2">
                        <div className="flex items-center gap-1" >
                          {nftsImageMapper(swap.metadata.init.tokens)}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium pl-4">
                        <div className="w-auto flex justify-start" >  # {getLastCharacters(swap.open_trade_id, 7)}</div>
                      </TableCell>
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
                        <HoverCard>
                          <HoverCardTrigger className=" px-3 py-1.5 rounded-xs hover:bg-su_enable_bg cursor-pointer" >
                            <svg
                              className="w-1 cursor-pointer" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.00039 12.8C2.42474 12.8 2.8317 12.9686 3.13176 13.2686C3.43182 13.5687 3.60039 13.9757 3.60039 14.4C3.60039 14.8243 3.43182 15.2313 3.13176 15.5314C2.8317 15.8314 2.42474 16 2.00039 16C1.57604 16 1.16908 15.8314 0.86902 15.5314C0.568961 15.2313 0.400391 14.8243 0.400391 14.4C0.400391 13.9757 0.568961 13.5687 0.86902 13.2686C1.16908 12.9686 1.57604 12.8 2.00039 12.8ZM2.00039 6.4C2.42474 6.4 2.8317 6.56857 3.13176 6.86863C3.43182 7.16869 3.60039 7.57565 3.60039 8C3.60039 8.42435 3.43182 8.83131 3.13176 9.13137C2.8317 9.43143 2.42474 9.6 2.00039 9.6C1.57604 9.6 1.16908 9.43143 0.86902 9.13137C0.568961 8.83131 0.400391 8.42435 0.400391 8C0.400391 7.57565 0.568961 7.16869 0.86902 6.86863C1.16908 6.56857 1.57604 6.4 2.00039 6.4ZM2.00039 0C2.42474 0 2.8317 0.168571 3.13176 0.468629C3.43182 0.768687 3.60039 1.17565 3.60039 1.6C3.60039 2.02435 3.43182 2.43131 3.13176 2.73137C2.8317 3.03143 2.42474 3.2 2.00039 3.2C1.57604 3.2 1.16908 3.03143 0.86902 2.73137C0.568961 2.43131 0.400391 2.02435 0.400391 1.6C0.400391 1.17565 0.568961 0.768687 0.86902 0.468629C1.16908 0.168571 1.57604 0 2.00039 0Z" fill="#B6B6BD" />
                            </svg>
                          </HoverCardTrigger>
                          <HoverCardContent className="border-none bg-card  dark:bg-su_secondary_bg p-0 rounded-xs" >
                            <button
                              onClick={() =>
                                toast.info("Filter", {
                                  duration: 2000,
                                  description: "Open Swap Edit is under construction!",
                                  action: {
                                    label: "Close",
                                    onClick: () => console.log("Close"),
                                  },
                                  className: '!bg-gradient-primary border-none',
                                  descriptionClassName: '!text-white',
                                })
                              }

                              className="flex items-center  gap-2 py-1 px-1  rounded-sm hover:bg-su_active_bg"
                            >

                              <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 14.8538V17.5556C2 17.8045 2.19553 18 2.44438 18H5.14624C5.26178 18 5.37732 17.9556 5.45731 17.8667L15.1627 8.17022L11.8298 4.83734L2.13332 14.5338C2.04444 14.6227 2 14.7293 2 14.8538ZM17.7401 4.33963L15.6604 2.25991C15.5781 2.17752 15.4805 2.11216 15.373 2.06756C15.2654 2.02296 15.1502 2 15.0338 2C14.9174 2 14.8021 2.02296 14.6946 2.06756C14.5871 2.11216 14.4894 2.17752 14.4072 2.25991L12.7808 3.88636L16.1136 7.21924L17.7401 5.5928C17.8225 5.51057 17.8878 5.41291 17.9324 5.30539C17.977 5.19787 18 5.08261 18 4.96621C18 4.84981 17.977 4.73456 17.9324 4.62704C17.8878 4.51952 17.8225 4.42186 17.7401 4.33963Z" fill="#868691" />
                              </svg>

                              Edit
                            </button>
                            <button onClick={() => {
                              wallet.isConnected ? navigate(`/swap-up/my-swaps`) : handleShowWalletConnectionToast();
                            }} type="reset" className="flex items-center  gap-2 py-1 px-1  rounded-sm hover:bg-su_active_bg" >

                              <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8.3C9.42135 8.3 8.86639 8.53178 8.45722 8.94436C8.04805 9.35695 7.81818 9.91652 7.81818 10.5C7.81818 11.0835 8.04805 11.6431 8.45722 12.0556C8.86639 12.4682 9.42135 12.7 10 12.7C10.5787 12.7 11.1336 12.4682 11.5428 12.0556C11.9519 11.6431 12.1818 11.0835 12.1818 10.5C12.1818 9.91652 11.9519 9.35695 11.5428 8.94436C11.1336 8.53178 10.5787 8.3 10 8.3ZM10 14.1667C9.03558 14.1667 8.11065 13.7804 7.4287 13.0927C6.74675 12.4051 6.36364 11.4725 6.36364 10.5C6.36364 9.52754 6.74675 8.59491 7.4287 7.90728C8.11065 7.21964 9.03558 6.83333 10 6.83333C10.9644 6.83333 11.8893 7.21964 12.5713 7.90728C13.2532 8.59491 13.6364 9.52754 13.6364 10.5C13.6364 11.4725 13.2532 12.4051 12.5713 13.0927C11.8893 13.7804 10.9644 14.1667 10 14.1667ZM10 5C6.36364 5 3.25818 7.28067 2 10.5C3.25818 13.7193 6.36364 16 10 16C13.6364 16 16.7418 13.7193 18 10.5C16.7418 7.28067 13.6364 5 10 5Z" fill="#B6B6BD" />
                              </svg>

                              View Incoming Offers
                            </button>
                            <button onClick={async () => {
                              await handleSwapCancel(swap);
                            }} type="reset" className="flex items-center gap-2 py-1 px-1 rounded-sm hover:bg-su_active_bg" >
                              <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.2222 2H3.77778C3.30628 2 2.8541 2.1873 2.5207 2.5207C2.1873 2.8541 2 3.30628 2 3.77778V16.2222C2 16.6937 2.1873 17.1459 2.5207 17.4793C2.8541 17.8127 3.30628 18 3.77778 18H16.2222C16.6937 18 17.1459 17.8127 17.4793 17.4793C17.8127 17.1459 18 16.6937 18 16.2222V3.77778C18 3.30628 17.8127 2.8541 17.4793 2.5207C17.1459 2.1873 16.6937 2 16.2222 2ZM13.2 14.4444L10 11.2444L6.8 14.4444L5.55556 13.2L8.75556 10L5.55556 6.8L6.8 5.55556L10 8.75556L13.2 5.55556L14.4444 6.8L11.2444 10L14.4444 13.2L13.2 14.4444Z" fill="#FF7585" />
                              </svg>

                              Close
                            </button>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            }
          </TableBody>
        </Table>

        {
          (((filteredCreatedSwaps || []).length === 0)) &&
          <EmptyDataset
            title="No Results Found"
            description="We couldn't find any results matching your search query. <br/>  Please try again with a different keyword or refine your search criteria."
            showBackgroundPicture={false}
          />
        }

        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      <LoadingDataset
        isLoading={isLoading}
        title="Loading Open swaps created by you"
        description='open swap data is being loaded...'
      />

      {
        (!isLoading && ((createdSwaps || []).length === 0)) &&
        <EmptyDataset
          title="No Open Swaps Available"
          description="Check back later or create your own swap!"
        >
          <Button
            className="gradient-button"
            onClick={() => {
              wallet.isConnected ? navigate(`/swap-up/swap-market/open-market/open-room/${generateRandomTradeId()}`) : handleShowWalletConnectionToast();
            }}
          >Create open swap</Button>
        </EmptyDataset>
      }

    </div >
  );
};

export default ManageOpenMarketSwaps;