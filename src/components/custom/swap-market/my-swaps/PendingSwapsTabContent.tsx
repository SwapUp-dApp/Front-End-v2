import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import FilterButton from '../../shared/FilterButton';
import { generateRandomTradeId, getDefaultNftImageOnError, getLastCharacters, getShortenWalletAddress } from '@/lib/utils';
import EmptyDataset from '../../shared/EmptyDataset';
import { SUI_OpenSwap, SUI_SwapToken, SUI_Swap, SUP_CompleteSwap, SUP_CancelSwap } from '@/types/swap-market.types';
import { useCancelSwapOffer, useCompletePrivateSwapOffer, useRejectSwapOffer } from '@/service/queries/swap-market.query';
import ToastLookCard from '../../shared/ToastLookCard';
import { chainsDataset } from '@/constants/data';
import moment from 'moment';
import LoadingDataset from '../../shared/LoadingDataset';
import { useSwapMarketStore } from '@/store/swap-market';
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import CreatePrivateSwapDialog from "@/components/custom/swap-market/private-party/CreatePrivateSwapDialog";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { getWalletProxy } from '@/lib/walletProxy';
import { SUI_SwapCreation } from "@/types/global.types";
import { useCompleteOpenSwapOffer } from "@/service/queries/swap-market.query";

import { SUE_SWAP_MODE, SUE_SWAP_OFFER_TYPE } from '@/constants/enums';
import { useProfileStore } from '@/store/profile';
import BadgeTile from '../../tiles/BadgeTile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { showWalletConnectionToast } from '@/lib/helpers';
import PendingSwapsFilterDrawer from './PendingSwapsFilterDrawer';
import { useMySwapStore } from '@/store/my-swaps';
import { useQuery } from '@tanstack/react-query';
import { getPendingSwapListApi } from '@/service/api';


const PendingSwapsTabContent = () => {
  const navigate = useNavigate();

  const wallet = useProfileStore(state => state.profile.wallet);
  const state = useSwapMarketStore(state => state.privateMarket.privateRoom);
  const [pendingSwapsSearchApplied, pendingSwapsFiltersApplied] = useMySwapStore(state => [state.pendingSwapsFiltersApplied, state.pendingSwapsSearchApplied]);
  const [setMySwapsData, filteredPendingSwaps, pendingSwaps] = useMySwapStore(state => [state.setMySwapsData, state.filteredPendingSwaps, state.pendingSwaps]);

  const [swapAcceptance, setSwapAcceptance] = useState<SUI_SwapCreation>({ created: false, isLoading: false });
  const [swapRejection, setSwapRejection] = useState<SUI_SwapCreation>({ created: false, isLoading: false });
  const [swapCancel, setSwapCancel] = useState<SUI_SwapCreation>({ created: false, isLoading: false });

  const { mutateAsync: completeOpenSwapOffer } = useCompleteOpenSwapOffer();
  const { mutateAsync: completePrivateSwapOffer } = useCompletePrivateSwapOffer();
  const { mutateAsync: rejectSwapOffer } = useRejectSwapOffer();
  const { mutateAsync: cancelSwapOffer } = useCancelSwapOffer();

  const handleSwapAccept = async (swap: SUI_Swap) => {
    try {

      setSwapAcceptance(prev => ({ ...prev, isLoading: true }));

      const { sign } = await getWalletProxy().getUserSignature(swap, state.swapEncodedMsg);

      if (!sign) {
        throw new Error("Failed to obtain swap signature.");
      }

      // setAcceptSwap(prev => ({ ...prev, accept_sign: sign }));
      //temp fix
      swap.accept_sign = sign;

      const approval = await getWalletProxy().getUserApproval(swap, true);

      if (!approval) {
        throw new Error("User approval not granted.");
      }

      const triggerTranfer = await getWalletProxy().createAndUpdateSwap(swap, "ACCEPT");
      console.log(swapAcceptance.isLoading);

      if (!triggerTranfer) {
        throw new Error("Swap Failed");
      }

      const payload: SUP_CompleteSwap = {
        ...swap,
        status: triggerTranfer.status,
        tx: triggerTranfer.hash,
        notes: triggerTranfer.notes,
        timestamp: triggerTranfer.timeStamp,
      };

      //calling actual api 
      if (swap.swap_mode === SUE_SWAP_MODE.OPEN) {
        const offerResult = await completeOpenSwapOffer(payload);

        if (offerResult) {
          toast.custom(
            (id) => (
              <ToastLookCard
                variant="success"
                title="Open Swap Completed Successfully"
                description={"You will receive a notification on metamask about the transaction."}
                onClose={() => toast.dismiss(id)}
              />
            ),
            {
              duration: 3000,
              className: 'w-full !bg-transparent',
              position: "bottom-left",
            }
          );
          setSwapAcceptance(prev => ({ ...prev, created: true }));


        }

      }

      //calling actual api 
      if (swap.swap_mode === SUE_SWAP_MODE.PRIVATE) {
        const offerResult = await completePrivateSwapOffer(payload);

        if (offerResult) {
          toast.custom(
            (id) => (
              <ToastLookCard
                variant="success"
                title="Private Swap Completed Successfully"
                description={"You will receive a notification on metamask about the transaction."}
                onClose={() => toast.dismiss(id)}
              />
            ),
            {
              duration: 3000,
              className: 'w-full !bg-transparent',
              position: "bottom-left",
            }
          );
          setSwapAcceptance(prev => ({ ...prev, created: true }));


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
      setSwapAcceptance(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSwapReject = async (swap: SUI_Swap) => {
    try {

      setSwapRejection(prev => ({ ...prev, isLoading: true }));

      console.log(swapRejection.isLoading);

      if (swap.id) {
        const offerResult = await rejectSwapOffer(Number(swap.id));
        console.log(swap.id);
        if (offerResult) {
          toast.custom(
            (id) => (
              <ToastLookCard
                variant="success"
                title="Swap Rejected Successfully"
                description={"You have successfully rejected the swap offer"}
                onClose={() => toast.dismiss(id)}
              />
            ),
            {
              duration: 3000,
              className: 'w-full !bg-transparent',
              position: "bottom-left",
            }
          );
          setSwapRejection(prev => ({ ...prev, created: true }));


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
      setSwapRejection(prev => ({ ...prev, isLoading: false }));
    }
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

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: [`getPendingSwapListApi`],
    queryFn: async () => {
      try {
        if (wallet.address) {
          const response = await getPendingSwapListApi(wallet.address);
          await setMySwapsData(response.data.data as SUI_OpenSwap[], 'pending');
          return response.data.data;
        }

        return null;
      } catch (error: any) {
        await setMySwapsData([], 'pending');
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
    <div className="space-y-4">


      <ScrollArea className='min-w-full' >
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="align-top font-semibold min-w-[200px]">Assets</TableHead>
              <TableHead className="align-top font-semibold min-w-[150px] pl-4" >Unique trade ID</TableHead>
              <TableHead className="align-top font-semibold px-4" >Status</TableHead>
              <TableHead className="align-top font-semibold px-4 min-w-[135px]" >Swap mode</TableHead>
              <TableHead className="align-top font-semibold px-4 min-w-[130px] line-clamp-1 h-1" >Counter-party wallet address</TableHead>
              <TableHead className="align-top font-semibold px-4 min-w-[150px]" >Trading chain</TableHead>
              <TableHead className="align-top font-semibold px-4 min-w-[130px]" >Request date</TableHead>
              <TableHead className="align-top font-semibold px-4 min-w-[150px]" >Type</TableHead>
              <TableHead className="min-w-[130px] pr-2 relative" >
                <div className="absolute top-2 left-4">
                  <PendingSwapsFilterDrawer> <FilterButton showTitleOnMobile filterApplied={pendingSwapsFiltersApplied} /> </PendingSwapsFilterDrawer>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y">
            {
              filteredPendingSwaps?.map((swap) => {
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
                    <TableCell className="text-xs font-medium pl-4">
                      # {swap.swap_mode === 0 ? getLastCharacters(swap.open_trade_id, 7) : getLastCharacters(swap.trade_id, 7)}
                    </TableCell>

                    <TableCell className="text-xs font-medium px-4">
                      {
                        (swap.init_address === wallet.address) ?
                          <BadgeTile>
                            <svg className="w-3" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3.17647V7.94118C12 8.52353 11.46 9 10.8 9H1.2C0.54 9 -2.88495e-08 8.52353 0 7.94118L2.36042e-07 3.17647C2.64891e-07 2.59412 0.54 2.11765 1.2 2.11765H2.4V3.17647L1.2 3.17647L1.2 7.94118H10.8V3.17647H9.6V2.11765H10.8C11.46 2.11765 12 2.59412 12 3.17647Z" fill="white" />
                              <path d="M3.846 3.39353L3 2.64706L6 0L9 2.64706L8.154 3.39353L6.6 2.02765L6.6 7.14706H5.4L5.4 2.02765L3.846 3.39353Z" fill="white" />
                            </svg>

                            Sent
                          </BadgeTile>

                          :
                          <BadgeTile>
                            <svg className="w-3" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3.17647V7.94118C12 8.52353 11.46 9 10.8 9H1.2C0.54 9 -2.88495e-08 8.52353 0 7.94118L2.36042e-07 3.17647C2.64891e-07 2.59412 0.54 2.11765 1.2 2.11765H2.4V3.17647L1.2 3.17647L1.2 7.94118H10.8V3.17647H9.6V2.11765H10.8C11.46 2.11765 12 2.59412 12 3.17647Z" fill="white" />
                              <path d="M3.846 3.75353L3 4.5L6 7.14706L9 4.5L8.154 3.75353L6.6 5.11941L6.6 4.62827e-08L5.4 0L5.4 5.11941L3.846 3.75353Z" fill="white" />
                            </svg>

                            Received
                          </BadgeTile>

                      }
                    </TableCell>

                    <TableCell className="text-xs font-medium px-4">
                      {swap.swap_mode === SUE_SWAP_MODE.OPEN ? <BadgeTile>Open market</BadgeTile> : <BadgeTile>private market</BadgeTile>}
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
                      {swap.offer_type === SUE_SWAP_OFFER_TYPE.PRIMARY ? <BadgeTile>Primary offer</BadgeTile> : <BadgeTile>Counter offer</BadgeTile>}
                    </TableCell>

                    <TableCell className="text-xs font-medium flex pr-8 justify-end">
                      {
                        (swapCancel.isLoading || swapRejection.isLoading || swapAcceptance.isLoading) ?
                          <svg className="animate-spin duration-700 w-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0C3.58236 0 0 3.58236 0 8C0 12.4176 3.58236 16 8 16V14.0004C6.81346 14.0002 5.65362 13.6483 4.66712 12.989C3.68061 12.3296 2.91176 11.3926 2.45777 10.2964C2.00377 9.20014 1.88503 7.99389 2.11655 6.83016C2.34807 5.66643 2.91946 4.59748 3.75847 3.75847C4.59748 2.91946 5.66643 2.34807 6.83016 2.11655C7.99389 1.88503 9.20014 2.00377 10.2964 2.45777C11.3926 2.91176 12.3296 3.68061 12.989 4.66712C13.6483 5.65362 14.0002 6.81346 14.0004 8H16C16 3.58236 12.4176 0 8 0Z" fill="white" />
                          </svg>
                          :
                          <HoverCard openDelay={100} >
                            <HoverCardTrigger className=" px-3 py-1.5 rounded-xs hover:bg-su_enable_bg cursor-pointer" >
                              <svg
                                className="w-1 cursor-pointer" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00039 12.8C2.42474 12.8 2.8317 12.9686 3.13176 13.2686C3.43182 13.5687 3.60039 13.9757 3.60039 14.4C3.60039 14.8243 3.43182 15.2313 3.13176 15.5314C2.8317 15.8314 2.42474 16 2.00039 16C1.57604 16 1.16908 15.8314 0.86902 15.5314C0.568961 15.2313 0.400391 14.8243 0.400391 14.4C0.400391 13.9757 0.568961 13.5687 0.86902 13.2686C1.16908 12.9686 1.57604 12.8 2.00039 12.8ZM2.00039 6.4C2.42474 6.4 2.8317 6.56857 3.13176 6.86863C3.43182 7.16869 3.60039 7.57565 3.60039 8C3.60039 8.42435 3.43182 8.83131 3.13176 9.13137C2.8317 9.43143 2.42474 9.6 2.00039 9.6C1.57604 9.6 1.16908 9.43143 0.86902 9.13137C0.568961 8.83131 0.400391 8.42435 0.400391 8C0.400391 7.57565 0.568961 7.16869 0.86902 6.86863C1.16908 6.56857 1.57604 6.4 2.00039 6.4ZM2.00039 0C2.42474 0 2.8317 0.168571 3.13176 0.468629C3.43182 0.768687 3.60039 1.17565 3.60039 1.6C3.60039 2.02435 3.43182 2.43131 3.13176 2.73137C2.8317 3.03143 2.42474 3.2 2.00039 3.2C1.57604 3.2 1.16908 3.03143 0.86902 2.73137C0.568961 2.43131 0.400391 2.02435 0.400391 1.6C0.400391 1.17565 0.568961 0.768687 0.86902 0.468629C1.16908 0.168571 1.57604 0 2.00039 0Z" fill="#B6B6BD" />
                              </svg>
                            </HoverCardTrigger>

                            <HoverCardContent
                              align='start'
                              className="w-52 px-2 py-3 bg-card dark:bg-su_secondary_bg rounded-xs mr-10 flex flex-col gap-1"
                            >
                              <button
                                onClick={() => { navigate(`/swap-up/swap-market/view-swap/${swap.trade_id}/?swapMode=${swap.swap_mode}`); }}
                                className="action-hover-card-item"
                              >
                                <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 8.3C9.42135 8.3 8.86639 8.53178 8.45722 8.94436C8.04805 9.35695 7.81818 9.91652 7.81818 10.5C7.81818 11.0835 8.04805 11.6431 8.45722 12.0556C8.86639 12.4682 9.42135 12.7 10 12.7C10.5787 12.7 11.1336 12.4682 11.5428 12.0556C11.9519 11.6431 12.1818 11.0835 12.1818 10.5C12.1818 9.91652 11.9519 9.35695 11.5428 8.94436C11.1336 8.53178 10.5787 8.3 10 8.3ZM10 14.1667C9.03558 14.1667 8.11065 13.7804 7.4287 13.0927C6.74675 12.4051 6.36364 11.4725 6.36364 10.5C6.36364 9.52754 6.74675 8.59491 7.4287 7.90728C8.11065 7.21964 9.03558 6.83333 10 6.83333C10.9644 6.83333 11.8893 7.21964 12.5713 7.90728C13.2532 8.59491 13.6364 9.52754 13.6364 10.5C13.6364 11.4725 13.2532 12.4051 12.5713 13.0927C11.8893 13.7804 10.9644 14.1667 10 14.1667ZM10 5C6.36364 5 3.25818 7.28067 2 10.5C3.25818 13.7193 6.36364 16 10 16C13.6364 16 16.7418 13.7193 18 10.5C16.7418 7.28067 13.6364 5 10 5Z" fill="#B6B6BD" />
                                </svg>

                                View Offer
                              </button>

                              {
                                swap.init_address === wallet.address &&

                                <button
                                  onClick={async () => { await handleSwapCancel(swap); }}
                                  className="action-hover-card-item"
                                >
                                  <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.2222 2H3.77778C3.30628 2 2.8541 2.1873 2.5207 2.5207C2.1873 2.8541 2 3.30628 2 3.77778V16.2222C2 16.6937 2.1873 17.1459 2.5207 17.4793C2.8541 17.8127 3.30628 18 3.77778 18H16.2222C16.6937 18 17.1459 17.8127 17.4793 17.4793C17.8127 17.1459 18 16.6937 18 16.2222V3.77778C18 3.30628 17.8127 2.8541 17.4793 2.5207C17.1459 2.1873 16.6937 2 16.2222 2ZM13.2 14.4444L10 11.2444L6.8 14.4444L5.55556 13.2L8.75556 10L5.55556 6.8L6.8 5.55556L10 8.75556L13.2 5.55556L14.4444 6.8L11.2444 10L14.4444 13.2L13.2 14.4444Z" fill="#FF7585" />
                                  </svg>

                                  Close
                                </button>
                              }


                              {
                                (swap.init_address !== wallet.address && swap.offer_type === SUE_SWAP_OFFER_TYPE.PRIMARY) &&

                                <button
                                  onClick={() => { navigate(`/swap-up/swap-market/counter-offer/${swap.trade_id}/?swapMode=${swap.swap_mode}`); }}
                                  className="action-hover-card-item"
                                >

                                  <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.381 10.9091C17.8667 10.9091 18.2714 11.0727 18.5143 11.4C18.8381 11.7273 19 12.1364 19 12.5455L12.5238 15L6.85714 13.3636V6H8.39524L14.3048 8.20909C14.7095 8.37273 14.9524 8.7 14.9524 9.10909C14.9524 9.35455 14.8714 9.6 14.7095 9.76364C14.5476 9.92727 14.3048 10.0909 13.981 10.0909H11.7143L10.3381 9.51818L10.0952 10.2545L11.7143 10.9091H17.381ZM2 6H5.2381V15H2V6Z" fill="#868691" />
                                  </svg>

                                  Counter Offer
                                </button>
                              }

                              {
                                swap.init_address !== wallet.address &&

                                <div className='flex flex-col gap-1' >
                                  <button
                                    onClick={async () => { await handleSwapAccept(swap); }}
                                    className="action-hover-card-item"
                                  >
                                    <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16.2222 2H3.77778C3.30628 2 2.8541 2.1873 2.5207 2.5207C2.1873 2.8541 2 3.30628 2 3.77778V16.2222C2 16.6937 2.1873 17.1459 2.5207 17.4793C2.8541 17.8127 3.30628 18 3.77778 18H16.2222C16.6937 18 17.1459 17.8127 17.4793 17.4793C17.8127 17.1459 18 16.6937 18 16.2222V3.77778C18 3.30628 17.8127 2.8541 17.4793 2.5207C17.1459 2.1873 16.6937 2 16.2222 2ZM8.22222 14.4444L3.77778 10L5.03111 8.74667L8.22222 11.9289L14.9689 5.18222L16.2222 6.44444L8.22222 14.4444Z" fill="#75FFC1" />
                                    </svg>

                                    Accept
                                  </button>

                                  <button
                                    onClick={async () => { await handleSwapReject(swap); }}
                                    className="action-hover-card-item"
                                  >

                                    <svg className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16.2222 2H3.77778C3.30628 2 2.8541 2.1873 2.5207 2.5207C2.1873 2.8541 2 3.30628 2 3.77778V16.2222C2 16.6937 2.1873 17.1459 2.5207 17.4793C2.8541 17.8127 3.30628 18 3.77778 18H16.2222C16.6937 18 17.1459 17.8127 17.4793 17.4793C17.8127 17.1459 18 16.6937 18 16.2222V3.77778C18 3.30628 17.8127 2.8541 17.4793 2.5207C17.1459 2.1873 16.6937 2 16.2222 2ZM13.2 14.4444L10 11.2444L6.8 14.4444L5.55556 13.2L8.75556 10L5.55556 6.8L6.8 5.55556L10 8.75556L13.2 5.55556L14.4444 6.8L11.2444 10L14.4444 13.2L13.2 14.4444Z" fill="#FF7585" />
                                    </svg>

                                    Reject
                                  </button>
                                </div>
                              }

                            </HoverCardContent>
                          </HoverCard>

                      }
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>

        {
          (((filteredPendingSwaps || []).length === 0) && (pendingSwapsFiltersApplied || pendingSwapsSearchApplied)) &&
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
        title="Loading pending swaps"
        description='pending swaps data is being loaded...'
      />

      {
        ((isSuccess || isError) && ((pendingSwaps || []).length === 0) && (!pendingSwapsSearchApplied && !pendingSwapsFiltersApplied)) &&
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

export default PendingSwapsTabContent;