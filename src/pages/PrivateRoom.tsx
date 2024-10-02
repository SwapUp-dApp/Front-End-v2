import { useEffect, useState } from "react";
import RoomLayoutCard from "@/components/custom/swap-market/RoomLayoutCard";
import { Button } from "@/components/ui/button";
import { useSwapMarketStore } from "@/store/swap-market";
import { useNavigate, useParams } from "react-router-dom";
import { isValidTradeId, isValidWalletAddress } from "@/lib/utils";
import { getWalletProxy } from "@/lib/walletProxy";
import { useCreatePrivateSwapOffer } from "@/service/queries/swap-market.query";
import { SUE_SWAP_OFFER_TYPE } from "@/constants/enums";
import SwapDetailsDialog from "@/components/custom/swap-market/SwapDetailsDialog";
import { SUI_CurrencyChainItem, SUI_SwapCreation } from "@/types/global.types";
import { useProfileStore } from "@/store/profile";
import LoadingDataset from "@/components/custom/shared/LoadingDataset";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCurrenciesApi } from "@/service/api";
import { useGlobalStore } from "@/store/global-store";
import { handleShowNotificationToast } from "@/lib/helpers";
import CustomRoomHeader from "@/components/custom/swap-market/CustomRoomHeader";
import RoomHeaderSide from "@/components/custom/swap-market/RoomHeaderSide";
import ExitPageDialog from "@/components/custom/shared/ExitPageDialog";

const PrivateRoom = () => {

  const state = useSwapMarketStore(state => state.privateMarket.privateRoom);
  const [wallet, profile] = useProfileStore(state => [state.profile.wallet, state.profile]);
  const [filteredAvailableCurrencies, setAvailableCurrencies] = useGlobalStore(state => [state.filteredAvailableCurrencies, state.setAvailableCurrencies]);

  const [enableApproveButtonCriteria, setEnableApproveButtonCriteria] = useState(false);
  const [swapCreation, setSwapCreation] = useState<SUI_SwapCreation>({ isLoading: false, created: false });

  const { counterPartyWallet, privateTradeId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: createSwapOffer } = useCreatePrivateSwapOffer();

  const { isSuccess } = useQuery({
    queryKey: [`getAvailableCurrenciesApi`],
    queryFn: async () => {
      try {
        const response = await getAvailableCurrenciesApi();
        setAvailableCurrencies(response.data.data.coins as SUI_CurrencyChainItem[]);
        return response.data.data.coins;
      } catch (error: any) {
        handleShowNotificationToast(
          "error",
          `Request failed!`,
          `${error.message}`
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
        handleShowNotificationToast(
          "success",
          `Offer sent successfully`,
          `You will receive a notification upon your counterparty's response.`
        );

        setSwapCreation(prev => ({ ...prev, created: true }));
        state.resetPrivateRoom();
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }

    } catch (error: any) {
      handleShowNotificationToast(
        "error",
        `Request failed!`,
        `${error.message}`
      );
    } finally {
      setSwapCreation(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleResetData = () => {
    state.resetPrivateRoom();

    handleShowNotificationToast(
      "info",
      `Private party room reset!`,
      `Room data deleted for both parties.`
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
    <div className="min-h-screen w-full space-y-4 absolute top-0 left-0 su-px bg-su_primary_bg pt-60 lg:pt-36" >
      <CustomRoomHeader
        title="Private Room for"
        tardeId={state.uniqueTradeId}
      >
        <RoomHeaderSide
          layoutType="sender"
          roomKey="privateRoom"
          senderWallet={state.sender.profile.wallet.address}
        />

        <svg className="rotate-90 lg:rotate-0 mx-auto w-8 lg:w-16" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.91992" y="1.57617" width="38" height="38" rx="19" stroke="url(#paint0_linear_1_6150)" strokeWidth="2" />
          <path d="M23.5126 12.5762L29.9199 19.23H12.2777V17.435H25.7475L22.2906 13.8452L23.5126 12.5762ZM29.5621 21.9224V23.7173H16.0924L19.5493 27.3072L18.3273 28.5762L11.9199 21.9224H29.5621Z" fill="#7586FF" />
          <defs>
            <linearGradient id="paint0_linear_1_6150" x1="40.9199" y1="8.17617" x2="-1.41297" y2="19.2907" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51C0FF" />
              <stop offset="1" stopColor="#9452FF" />
            </linearGradient>
          </defs>
        </svg>

        <RoomHeaderSide
          layoutType="receiver"
          roomKey="privateRoom"
          counterPartyWallet={state.receiver.profile.wallet.address}
        />

      </CustomRoomHeader>

      <div className="grid lg:grid-cols-2 gap-4 !mb-32" >
        {
          (state.sender.profile.wallet.address && isSuccess) ?
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

        {(state.receiver.profile.wallet.address && isSuccess) ?
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


      <footer className="absolute left-0 bottom-0 flex items-center justify-between su-px py-2.5 w-full z-50 bg-su_secondary_bg border-t border-t-su_enable_bg" >

        <ExitPageDialog
          title={"Are you sure you want to exit the trade?"}
          description={"By leaving the room, you will close it for both parties."}
          redirectPath={null}
          resetData={handleResetData}
        >
          <Button variant={'outline'} >
            Close Room
          </Button>
        </ExitPageDialog>

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
            Confirm Trade
          </Button>
        </SwapDetailsDialog>
      </footer >
    </div >
  );

};

export default PrivateRoom;