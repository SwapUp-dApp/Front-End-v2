import { useEffect, useState } from "react";
import RoomHeader from "@/components/custom/swap-market/RoomHeader";
import RoomLayoutCard from "@/components/custom/swap-market/RoomLayoutCard";
import { Button } from "@/components/ui/button";
import RoomFooterSide from "@/components/custom/swap-market/RoomFooterSide";
import { useSwapMarketStore } from "@/store/swap-market";
import { useNavigate, useParams } from "react-router-dom";
import { isValidTradeId, isValidWalletAddress } from "@/lib/utils";
import { getWalletProxy } from "@/lib/walletProxy";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { toast } from "sonner";
import { useCreatePrivateSwapOffer } from "@/service/queries/swap-market.query";
import { SUE_SWAP_OFFER_TYPE } from "@/constants/enums";
import SwapDetailsDialog from "@/components/custom/swap-market/SwapDetailsDialog";
import { SUI_CurrencyChainItem, SUI_SwapCreation } from "@/types/global.types";
import { useProfileStore } from "@/store/profile";
import LoadingDataset from "@/components/custom/shared/LoadingDataset";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCurrenciesApi } from "@/service/api";
import { useGlobalStore } from "@/store/global-store";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";

const PrivateRoom = () => {

  const state = useSwapMarketStore(state => state.privateMarket.privateRoom);
  const [wallet, profile] = useProfileStore(state => [state.profile.wallet, state.profile]);
  const [filteredAvailableCurrencies, setAvailableCurrencies] = useGlobalStore(state => [state.filteredAvailableCurrencies, state.setAvailableCurrencies]);

  const [enableApproveButtonCriteria, setEnableApproveButtonCriteria] = useState(false);
  const [swapCreation, setSwapCreation] = useState<SUI_SwapCreation>({ isLoading: false, created: false });

  const { counterPartyWallet, privateTradeId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: createSwapOffer } = useCreatePrivateSwapOffer();

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: [`getAvailableCurrenciesApi`],
    queryFn: async () => {
      try {
        const response = await getAvailableCurrenciesApi();
        setAvailableCurrencies(response.data.data.coins as SUI_CurrencyChainItem[]);
        return response.data.data.coins;
      } catch (error: any) {
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

  const handleCreatePrivatePartySwap = async () => {
    try {
      setSwapCreation(prev => ({ ...prev, isLoading: true }));

      await state.createPrivateMarketSwap(SUE_SWAP_OFFER_TYPE.PRIMARY, wallet.address);
      const createdSwap = useSwapMarketStore.getState().privateMarket.privateRoom.swap;

      if (!createdSwap) {
        throw new Error("Failed to create swap.");
      }

      const { sign, swapEncodedBytes } = await getWalletProxy().getUserSignature(createdSwap, state.swapEncodedMsg);

      if (!sign) {
        throw new Error("Failed to obtain swap signature.");
      }

      await state.setSwapEncodedMsgAndSign(swapEncodedBytes, sign);

      const approval = await getWalletProxy().getUserApproval(createdSwap, true);
      if (!approval) {
        throw new Error("User approval not granted.");
      }
      const updatedSwap = await useSwapMarketStore.getState().privateMarket.privateRoom.swap;

      // Create a record in the blockchain for this.
      const blockchainRes = await getWalletProxy().createAndUpdateSwap(updatedSwap!, "CREATE");
      if (!blockchainRes) {
        throw new Error("Failed with blockchain error.");
      }

      const offerResult = await createSwapOffer(updatedSwap!);
      if (offerResult) {
        toast.custom(
          (id) => (
            <ToastLookCard
              variant="success"
              title="Offer Sent Successfully"
              description={"You will receive a notification upon your counterparty's response."}
              onClose={() => toast.dismiss(id)}
            />
          ),
          {
            duration: 3000,
            className: 'w-full !bg-transparent',
            position: "bottom-left",
          }
        );
        setSwapCreation(prev => ({ ...prev, created: true }));
        state.resetPrivateRoom();
        setTimeout(() => {
          navigate(-1);
        }, 3000);
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
      setSwapCreation(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleResetData = () => {
    state.resetPrivateRoom();
    toast.custom(
      (id) => (
        <ToastLookCard
          variant="info"
          title="Private party room reset!"
          description={"Room data deleted for both parties."}
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

  useEffect(() => {
    if (
      (state.sender.nftsSelectedForSwap.length || state.sender.addedAmount?.amount) &&
      (state.receiver.nftsSelectedForSwap.length || state.receiver.addedAmount?.amount)
    ) {
      setEnableApproveButtonCriteria(true);
    } else {
      setEnableApproveButtonCriteria(false);
    }

  }, [state.sender.nftsSelectedForSwap, state.receiver.nftsSelectedForSwap, state.sender.addedAmount, state.receiver.addedAmount]);

  useEffect(() => {
    if ((counterPartyWallet && !isValidWalletAddress(counterPartyWallet)) || (privateTradeId && !isValidTradeId(privateTradeId))) {
      navigate(-1);
    }

    const handleSetValuesOnCreatingPrivateRoom = async () => {
      state.resetPrivateRoom();
      await state.setValuesOnCreatingPrivateRoom(privateTradeId!, counterPartyWallet!, profile);
    };

    if (counterPartyWallet && privateTradeId && profile) {
      handleSetValuesOnCreatingPrivateRoom();
    }
  }, [counterPartyWallet, privateTradeId]);

  return (
    <div className="space-y-4" >
      <RoomHeader
        title="Private Room"
        tardeId={state.uniqueTradeId}
        resetData={handleResetData}
        existDescription="By leaving the room, you will close it for both parties."
        existTitle="Are you sure you want to exit the trade?"
      />

      <div className="grid lg:grid-cols-2 gap-4 !mb-36 lg:!mb-32" >
        {
          state.sender.profile.wallet.address ?
            <RoomLayoutCard
              layoutType={"sender"}
              roomKey="privateRoom"
              senderWallet={state.sender.profile.wallet.address}
            />
            :
            <div className="rounded-sm border-none w-full h-full flex items-center justify-center dark:bg-su_secondary_bg p-2 lg:p-6" >
              <LoadingDataset
                isLoading={!state.sender.profile.wallet.address}
                title="Loading wallet connected wallet information"
              />
            </div>
        }

        {state.receiver.profile.wallet.address ?
          <RoomLayoutCard
            layoutType={"receiver"}
            counterPartyWallet={state.receiver.profile.wallet.address}
            roomKey="privateRoom"
          />
          :
          <div className="rounded-sm border-none w-full h-full flex items-center justify-center dark:bg-su_secondary_bg p-2 lg:p-6" >
            <LoadingDataset
              isLoading={!state.receiver.profile.wallet.address}
              title="Loading wallet counter party wallet information"
            />
          </div>
        }


      </div>


      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full min-h-[112px] lg:h-[104px] flex justify-between" >

        <h2 className="trade-summary" >Trade Offer Summary:</h2>

        <div className="absolute -top-14 flex justify-center w-full" >
          {/* Swap Details Dialog */}
          <SwapDetailsDialog
            state={state}
            enableApproveButtonCriteria={enableApproveButtonCriteria}
            swapCreation={swapCreation}
            handleSwapCreation={handleCreatePrivatePartySwap}
          >
            <Button
              variant={"default"}
              type="submit"
              disabled={!enableApproveButtonCriteria}
            >
              Approve
            </Button>
          </SwapDetailsDialog>
        </div >

        {/* Sender Side */}
        {
          isSuccess ?
            <RoomFooterSide roomKey="privateRoom" layoutType="sender" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} availableCurrencies={filteredAvailableCurrencies} />
            :
            <div className="flex justify-center items-center w-1/2 border border-su_disabled" >
              <LoadingDataset
                isLoading={isLoading}
                title="Loading currencies data."
              />
              {isError &&
                <p className="text-xs md:text-sm">Unable to get currencies.</p>
              }
            </div>
        }

        {/* Receiver Side */}

        {
          isSuccess ?
            <RoomFooterSide roomKey="privateRoom" layoutType="receiver" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} availableCurrencies={filteredAvailableCurrencies} />
            :
            <div className="flex justify-center items-center w-1/2 border border-su_disabled" >
              <LoadingDataset
                isLoading={isLoading}
                title="Loading currencies data."
              />
              {isError &&
                <p className="text-xs md:text-sm">Unable to get currencies.</p>
              }
            </div>
        }
      </footer >
    </div >
  );

};

export default PrivateRoom;