import { useSwapMarketStore } from "@/store/swap-market";
import { useEffect, useState } from "react";
import ThirdWebWalletConnect from "./ThirdWebWalletConnect";

const ConnectWalletButton = () => {

  //const [isConnecting, setIsConnecting] = useState(false);
  const [connectWallet, wallet] = useSwapMarketStore(state => [state.connectWallet, state.wallet]);
  const [profile, network] = useSwapMarketStore(state => [
          state.privateMarket.privateRoom.sender.profile,
          state.privateMarket.privateRoom.sender.network,
        ]);

  const handleConnectionToWallet = async () => {
    //setIsConnecting(true);
    await connectWallet();
    //setIsConnecting(false);
  };


  useEffect(() => {
    if (!wallet.isConnected) {
      const reconnect = async () => {
        await handleConnectionToWallet();
      };
      reconnect();
    }
  }, [wallet.isConnected]);


  if(!wallet.isConnected) {
    return (
      <ThirdWebWalletConnect />      
    );
  }
  
};

export default ConnectWalletButton;