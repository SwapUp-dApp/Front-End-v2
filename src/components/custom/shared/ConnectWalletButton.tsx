import { useSwapMarketStore } from "@/store/swap-market";
import { useEffect, useState } from "react";
import ThirdWebWalletConnect from "./ThirdWebWalletConnect";
import { useActiveAccount, useActiveWallet, useActiveWalletChain } from "thirdweb/react";
//import { resolveText, resolveAvatar, resolveName, resolveAddress } from "thirdweb/extensions/ens";


const ConnectWalletButton = () => {

  //const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, updateWalletStateInStore] = useSwapMarketStore(state => [state.wallet, state.updateWalletStateInStore]);
  const [profile, network] = useSwapMarketStore(state => [
          state.privateMarket.privateRoom.sender.profile,
          state.privateMarket.privateRoom.sender.network,
        ]);
  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  useEffect(() => {
    
    if (activeAccount) {
      wallet.address = activeAccount.address;
      wallet.isConnected = true;          
    } else {
      wallet.isConnected = false;
    }
    console.log(`wallet connection: ${wallet.isConnected} - ${wallet.address} connected to chain ${wallet.chainName}`);

    const reconnect = async () => {
      await updateWalletStateInStore(wallet);
    };
    reconnect();
     
  }, [activeAccount?.address]);
  
  useEffect(() => {
    if (activeChain) {
      wallet.chainName = "" + activeChain?.name
      wallet.chainId = String(activeChain?.id)
    }
    console.log(`wallet connection: ${wallet.isConnected} - ${wallet.address} connected to chain ${wallet.chainName}`);

    const reconnect = async () => {
      await updateWalletStateInStore(wallet);
    };
    reconnect();
  }, [activeChain?.id]);

  
  return (
    <>
      {activeAccount && (
      <label>{activeChain?.name}</label>
      )}
      <ThirdWebWalletConnect />
    </>    
  );
  
  
};

export default ConnectWalletButton;