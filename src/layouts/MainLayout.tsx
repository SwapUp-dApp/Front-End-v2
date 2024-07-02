import Footer from "@/components/custom/shared/Footer";
import Navbar from "@/components/custom/shared/Navbar";
import { navItemsData } from "@/constants";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profile";
import { defaults } from "@/constants/defaults";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { IWallet } from "@/types/profile.types";
import { getInitialProfile } from "@/store/profile/profile-helpers";
import { getWalletProxy } from "@/lib/walletProxy";
import { generateRandomKey } from "@/lib/utils";

const MainLayout = () => {
  const [key, setKey] = useState(generateRandomKey(6));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const [setProfileWallet, wallet] = useProfileStore(state => [state.setProfileWallet, state.profile.wallet]);

  const handleShowWalletConnectionToast = () => {
    toast.custom(
      (id) => (
        <ToastLookCard
          variant="warning"
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

  useEffect(() => {

    if (pathname && wallet.isConnected) {
      const currentRoute = navItemsData.find(item => item.path === pathname);
      if (currentRoute?.protected) {
        // console.log("Inside the layout,", wallet);
        wallet.isConnected ?
          navigate(pathname)
          :
          (
            handleShowWalletConnectionToast(),
            navigate(defaults.fallback.route)
          );

      }
    }

  }, [pathname, wallet.isConnected]);


  useEffect(() => {
    let connectedWallet: IWallet = {
      ...getInitialProfile('sender').wallet
    };

    if (activeAccount && activeChain) {
      getWalletProxy().setConnectedWalletAccount(activeAccount);

      connectedWallet.address = activeAccount.address;
      connectedWallet.isConnected = true;
      connectedWallet.network = {
        iconUrl: activeChain.icon?.url ? activeChain.icon.url : connectedWallet.network.iconUrl,
        id: String(activeChain.id) || connectedWallet.network.id,
        name: activeChain.name || connectedWallet.network.name,
        symbol: activeChain.nativeCurrency?.symbol || connectedWallet.network.symbol
      };
    }

    setProfileWallet(connectedWallet);
  }, [activeAccount, activeChain]);


  useEffect(() => {
    if (wallet) {
      // console.log("Connected Wallet: ", wallet);
      setKey(generateRandomKey(6));
    }
  }, [wallet]);

  return (
    <div className="flex flex-col justify-between min-h-screen " >
      <div>
        <Navbar />
        <section className="px-6 lg:px-10 py-4" >
          <Outlet key={key} />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;