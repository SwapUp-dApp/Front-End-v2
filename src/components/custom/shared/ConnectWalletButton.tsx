import { useEffect, useState } from "react";
import ThirdWebWalletConnect from "./ThirdWebWalletConnect";
import { useActiveAccount, useActiveWallet, useActiveWalletChain } from "thirdweb/react";
import { useProfileStore } from "@/store/profile";
import { getWalletProxy } from "@/lib/walletProxy";
//import { resolveText, resolveAvatar, resolveName, resolveAddress } from "thirdweb/extensions/ens";


const ConnectWalletButton = () => {

  const [profile, updateWalletInProfileState] = useProfileStore(state => [state.profile, state.updateWalletInProfileState]);
  
  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  useEffect(() => {
    
    if (activeAccount) {
      profile.wallet.address = activeAccount.address;
      profile.wallet.isConnected = true;
      getWalletProxy().setConnectedWalletAccount(activeAccount); 
    } else {
      profile.wallet.isConnected = false;
    }
    console.log(`wallet connection: ${profile.wallet.isConnected} - ${profile.wallet.address} connected to chain ${profile.wallet.network.name}`);

    const reconnect = async () => {
      await updateWalletInProfileState(profile.wallet);
    };
    reconnect();
     
  }, [activeAccount?.address]);
  
  useEffect(() => {
    if (activeChain) {
      profile.wallet.network.name = "" + activeChain?.name
      profile.wallet.network.id = String(activeChain?.id)
    }
    console.log(`wallet connection: ${profile.wallet.isConnected} - ${profile.wallet.address} connected to chain ${profile.wallet.network.name}`);

    const reconnect = async () => {
      await updateWalletInProfileState(profile.wallet);
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