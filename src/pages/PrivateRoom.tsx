import { useEffect, useState } from "react";
import RoomHeader from "@/components/custom/swap_market/RoomHeader";
import RoomLayoutCard from "@/components/custom/swap_market/RoomLayoutCard";
import { Button } from "@/components/ui/button";
import RoomFooterSide from "@/components/custom/swap_market/RoomFooterSide";
import { useSwapMarketStore } from "@/store/swap-market";
import { useNavigate, useParams } from "react-router-dom";
import { isValidTradeId, isValidWalletAddress } from "@/lib/utils";
import { getUserApproval, getUserSignature } from "@/lib/metamask";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { toast } from "sonner";
import { useCreatePrivateSwapOffer } from "@/service/queries/swap-market.query";
import { SUE_SWAP_OFFER_TYPE } from "@/constants/enums";
import SwapDetailsDialog from "@/components/custom/swap_market/SwapDetailsDialog";
import { SUI_SwapCreation } from "@/types/swapup.types";


const PrivateRoom = () => {
  const wallet = useSwapMarketStore(state => state.wallet);
  const state = useSwapMarketStore(state => state.privateMarket.privateRoom);

  const [enableApproveButtonCriteria, setEnableApproveButtonCriteria] = useState(false);
  const [swapCreation, setSwapCreation] = useState<SUI_SwapCreation>({ isLoading: false, created: false });

  const { counterPartyWallet, privateTradeId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: createSwapOffer } = useCreatePrivateSwapOffer();

  const handleCreatePrivatePartySwap = async () => {
    try {
      setSwapCreation(prev => ({ ...prev, isLoading: true }));

      await state.createPrivateMarketSwap(SUE_SWAP_OFFER_TYPE.PRIMARY);
      const createdSwap = useSwapMarketStore.getState().privateMarket.privateRoom.swap;

      if (!createdSwap) {
        throw new Error("Failed to create swap.");
      }

      const { sign, swapEncodedBytes } = await getUserSignature(createdSwap, state.swapEncodedMsg, wallet.signer);

      if (!sign) {
        throw new Error("Failed to obtain swap signature.");
      }

      await state.setSwapEncodedMsgAndSign(swapEncodedBytes, sign);

      const approval = await getUserApproval(createdSwap, true, wallet.signer);
      if (!approval) {
        throw new Error("User approval not granted.");
      }
      const updatedSwap = await useSwapMarketStore.getState().privateMarket.privateRoom.swap;

      // console.info("Updated swap: =======> \n", updatedSwap);

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
          navigate('/swap-up/swap-market');
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
    if ((state.sender.nftsSelectedForSwap.length && state.receiver.nftsSelectedForSwap.length) &&
      (state.sender.addedAmount && state.receiver.addedAmount)
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

    if (counterPartyWallet && privateTradeId) {
      state.setValuesOnCreatingRoom(privateTradeId, counterPartyWallet);
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

      <div className="grid lg:grid-cols-2 gap-4 mb-16 lg:mb-16" >
        <RoomLayoutCard layoutType={"sender"} roomKey="privateRoom" />
        {counterPartyWallet &&
          <RoomLayoutCard layoutType={"receiver"} counterPartyWallet={counterPartyWallet} roomKey="privateRoom" />}
      </div>


      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full min-h-[112px] lg:h-[104px] flex justify-between" >

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
        < RoomFooterSide roomKey="privateRoom" layoutType="sender" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} />
        {/* Receiver Side */}
        < RoomFooterSide roomKey="privateRoom" layoutType="receiver" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} />
      </footer >
    </div >
  );
};

export default PrivateRoom;