import Footer from "@/components/custom/shared/Footer";
import Navbar from "@/components/custom/shared/Navbar";
import { navItemsData } from "@/constants/navigation";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store/profile";
import { defaults } from "@/constants/defaults";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { IProfile, IWallet, SUI_CreateNewUserPayload } from "@/types/profile.types";
import { getInitialProfile } from "@/store/profile/profile-helpers";
import { getWalletProxy } from "@/lib/walletProxy";
import { generateRandomKey, handleTwitterSharingProcessLocalstorageState, isValidWalletAddress } from "@/lib/utils";
import { showWalletConnectionToast } from "@/lib/helpers";
import { useGlobalStore } from "@/store/global-store";
import { createUserByWalletIdApi } from "@/service/api/user.service";
import SwapSharingOnSocialProcess from "@/components/custom/shared/swap-sharing-process/SwapSharingOnSocialProcess";

const MainLayout = () => {
  const [key, setKey] = useState(generateRandomKey(6));

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const [setProfileWallet, wallet, setUserProfile] = useProfileStore(state => [state.setProfileWallet, state.profile.wallet, state.setUserProfile]);
  const [startRecentSwapSharingProcess, setStartRecentSwapSharingProcess] = useGlobalStore(state => [state.startRecentSwapSharingProcess, state.setStartRecentSwapSharingProcess]);

  const walletConnectionExistsInLocalStorage = localStorage.getItem("thirdweb:active-wallet-id");

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

    const handleSetWalletInStoreAndCreatingNewUserInDB = async () => {
      await setProfileWallet(connectedWallet);

      if (isValidWalletAddress(connectedWallet.address)) {
        try {
          const payload: SUI_CreateNewUserPayload = {
            points: defaults.userSettings.newUser.points,
            tags: defaults.userSettings.newUser.tags,
            title: '',
            description: ''
          };

          const userResponse = await createUserByWalletIdApi(connectedWallet.address, payload);

          if (userResponse) {
            const { createdAt, description, title, images, tags, social_links, points, smartAccount } = userResponse.data.data;
            const latestProfile = useProfileStore.getState().profile;

            const userProfileDetails: IProfile = {
              ...latestProfile,
              avatar: images.avatar,
              coverImage: images.coverImage,
              joinDate: createdAt,
              details: {
                ...latestProfile.details,
                title: title,
                description: description,
                points: points,
                tags: tags,
                twitter: social_links.twitter,
                warpcast: social_links.warpcast,
                smartAccount
              }
            };

            setUserProfile(userProfileDetails);
          }

        } catch (error: any) {
          console.log(error.message);
        }

      }
    };

    handleSetWalletInStoreAndCreatingNewUserInDB();
  }, [activeAccount, activeChain]);


  useEffect(() => {
    if (wallet) {
      setKey(generateRandomKey(6));
    }

    if (pathname && !walletConnectionExistsInLocalStorage) {
      const currentRoute = navItemsData.find(item => pathname.includes(item.basePath));
      if (currentRoute?.protected) {
        showWalletConnectionToast("warning");
        navigate(defaults.fallback.route);
      }
    }
  }, [pathname, walletConnectionExistsInLocalStorage, wallet]);

  // For opening swap sharing dialog when user gets redirected after getting twitter auth code
  useEffect(() => {
    if (handleTwitterSharingProcessLocalstorageState('GET').started) {
      setStartRecentSwapSharingProcess(true);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen relative">
      <div>

        <div className="relative w-full px-4 py-1.5 bg-gradient-primary text-xs lg:text-center">
          We are currently in the testing phase and only support sepolia base transactions.  Follow our socials for updates on our Mainnet release.
        </div>

        <Navbar />

        <section className="su-px py-4" >
          <Outlet key={key} />
        </section>
      </div>
      <Footer />

      <SwapSharingOnSocialProcess
        startRecentSwapSharingProcess={startRecentSwapSharingProcess}
        setStartRecentSwapSharingProcess={setStartRecentSwapSharingProcess}
      />
    </div>
  );
};

export default MainLayout;