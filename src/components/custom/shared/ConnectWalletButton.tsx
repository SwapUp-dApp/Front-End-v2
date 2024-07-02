import ThirdWebWalletConnect from "./ThirdWebWalletConnect";
import { useProfileStore } from "@/store/profile";
//import { resolveText, resolveAvatar, resolveName, resolveAddress } from "thirdweb/extensions/ens";


const ConnectWalletButton = () => {

  const wallet = useProfileStore(state => state.profile.wallet);

  return (
    <>
      {wallet.network.name &&
        <label>{wallet.network.name}</label>
      }
      <ThirdWebWalletConnect />
    </>
  );


};

export default ConnectWalletButton;