import RoomFooterSide from "@/components/custom/swap_market/RoomFooterSide";
import RoomHeader from "@/components/custom/swap_market/RoomHeader";
import RoomLayoutCard from "@/components/custom/swap_market/RoomLayoutCard";
import SwapDetailsDialog from "@/components/custom/swap_market/SwapDetailsDialog";
import { Button } from "@/components/ui/button";
import { isValidTradeId, isValidWalletAddress } from "@/lib/utils";
import { useSwapMarketStore } from "@/store/swap-market";
import { SUI_SwapCreation } from "@/types/swapup.types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OpenSwapProposeRoom = () => {
  const wallet = useSwapMarketStore(state => state.wallet);
  const state = useSwapMarketStore(state => state.openMarket.openRoom);

  const [enableApproveButtonCriteria, setEnableApproveButtonCriteria] = useState(false);
  const [swapCreation, setSwapCreation] = useState<SUI_SwapCreation>({ isLoading: false, created: false });

  const { counterPartyWallet, tradeId } = useParams();
  const navigate = useNavigate();

  const handlePurposeOpenSwap = async () => {
  };

  const handleResetData = () => {
    console.log("This feature is under construction.");
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
    if ((counterPartyWallet && !isValidWalletAddress(counterPartyWallet)) || (tradeId && !isValidTradeId(tradeId))) {
      navigate(-1);
    }

    if (counterPartyWallet && tradeId) {
      // state.setValuesOnCreatingRoom(tradeId, counterPartyWallet);
    }
  }, [counterPartyWallet, tradeId]);

  return (
    <div className="space-y-4" >
      <RoomHeader
        title="Open Trade"
        tardeId={state.uniqueTradeId}
        resetData={handleResetData}
        existDescription="By leaving the room, you will close it for both parties."
        existTitle="Are you sure you want to exit the trade?"
      />

      <div className="grid lg:grid-cols-2 gap-4 mb-16 lg:mb-16" >
        <RoomLayoutCard layoutType={"sender"} roomKey="openRoom" />
        {counterPartyWallet &&
          <RoomLayoutCard layoutType={"receiver"} counterPartyWallet={counterPartyWallet} roomKey="openRoom" />}
      </div>

      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full min-h-[112px] lg:h-[104px] flex justify-between" >

        <div className="absolute -top-14 flex justify-center w-full" >
          {/* Swap Details Dialog */}
          <SwapDetailsDialog
            state={state}
            enableApproveButtonCriteria={enableApproveButtonCriteria}
            swapCreation={swapCreation}
            handleSwapCreation={handlePurposeOpenSwap}
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
        < RoomFooterSide roomKey="openRoom" layoutType="sender" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} />
        {/* Receiver Side */}
        < RoomFooterSide roomKey="openRoom" layoutType="receiver" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} />
      </footer >
    </div>
  );
};

export default OpenSwapProposeRoom;