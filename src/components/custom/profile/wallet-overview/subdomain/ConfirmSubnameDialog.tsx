import CustomAvatar from '@/components/custom/shared/CustomAvatar';
import CustomOutlineButton from '@/components/custom/shared/CustomOutlineButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Environment } from '@/config';
import { thirdwebCustomDarkTheme } from '@/constants/defaults';
import { showNotificationToast } from '@/lib/helpers';
import { handleMintNewOffchainSubname } from '@/lib/minting';
import { currentChain, thirdWebClient } from '@/lib/thirdWebClient';
import { getWalletProxy } from '@/lib/walletProxy';
import { getAvailableCurrenciesApi } from '@/service/api';
import { useGlobalStore } from '@/store/global-store';
import { useProfileStore } from '@/store/profile';
import { SUI_CurrencyChainItem } from '@/types/global.types';
import { ethers } from 'ethers';
import { useState } from 'react';
import { PreparedTransaction } from 'thirdweb';
import { useSendTransaction } from 'thirdweb/react';


interface IProp {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  handleNavigationOfSteps: (navigationMode: "NEXT" | "PREVIOUS") => void;
}

const ConfirmSubnameDialog = ({ handleNavigationOfSteps, open, setOpen }: IProp) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: sendTransaction } = useSendTransaction({
    payModal: {
      buyWithFiat: { testMode: true },
      buyWithCrypto: { testMode: true },
      theme: thirdwebCustomDarkTheme,
    },
  });

  const [name, action, subname, setTransactionHash, avatar, isPremium, title, wallet] = useProfileStore(state => [
    state.overviewTab.subdomainSection.createNewSubdomain.name,
    state.overviewTab.subdomainSection.createNewSubdomain.action,
    state.overviewTab.subdomainSection.createNewSubdomain.subname,
    state.overviewTab.subdomainSection.createNewSubdomain.setTransactionHash,
    state.profile.avatar,
    state.profile.isPremium,
    state.profile.details?.title,
    state.profile.wallet
  ]);


  const [availableCurrencies, setAvailableCurrencies] = useGlobalStore(state => [state.availableCurrencies, state.setAvailableCurrencies]);

  const refetchCurrenciesDataset = async () => {
    try {
      const response = await getAvailableCurrenciesApi();
      setAvailableCurrencies(response.data.data.coins as SUI_CurrencyChainItem[]);
    } catch (error) {
      throw error;
    }
  };

  const handleOpenWallet = async () => {
    try {
      setIsLoading(true);

      let allCurrencies = availableCurrencies;

      if (!availableCurrencies || availableCurrencies.length === 0) {
        await refetchCurrenciesDataset();
        allCurrencies = useGlobalStore.getState().availableCurrencies;
      }

      const foundCurrency = allCurrencies.find(currency => currency.symbol.toLowerCase() === 'eth');

      let transaction;

      if (foundCurrency) {
        const { NEW_SUBNAME_CHARGES, SWAPUP_TREASURY_WALLET } = Environment;

        const chargesByCurrentRate = NEW_SUBNAME_CHARGES / Number(foundCurrency.price);

        transaction = {
          chain: currentChain,
          to: SWAPUP_TREASURY_WALLET,
          value: ethers.parseEther(`${chargesByCurrentRate}`),
          client: thirdWebClient
        } as PreparedTransaction;
      }

      if (!transaction) {
        throw new Error("Unable to create transaction.");
      }

      // Send the transaction and wait for the receipt
      const txResult = await sendTransaction(transaction!);

      // Wait for the transaction to be mined
      const { provider } = await getWalletProxy().getEthersProviderAndSigner();
      const receipt = await provider.waitForTransaction(txResult.transactionHash, null, txResult.maxBlocksWaitTime);

      console.log("Receipt: ", receipt);

      const createdFullName = await handleMintNewOffchainSubname(subname, wallet.address as `0x${string}`);

      if (createdFullName) {
        showNotificationToast(
          "success",
          "Subname created Successfully",
          `Your fullname is: \n ${createdFullName}`
        );

        setTransactionHash(createdFullName);
        handleNavigationOfSteps("NEXT");
      }

    } catch (error: any) {
      showNotificationToast(
        "error",
        "Request failed!",
        `${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="w-[400px] p-4 space-y-4" >
        <div className="space-y-3" >
          {/* header */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-xl pt-3" >Create subname </h2>

              <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </DialogClose>
            </div>

            <p className="text-base font-medium text-secondary dark:text-su_secondary">Enter the name for your subdomain</p>
          </div>

          <div className='space-y-3' >

            <div className='border-[1.5px] border-su_enable_bg rounded-sm py-3.5 px-4 flex items-center justify-between text-xs lg:text-sm' >
              <p className='text-su_ternary' >Name</p>

              <span className='flex items-center gap-2 text-su_primary font-semibold' >
                {name}

                <img
                  className='h-7 w-7 object-cover'
                  src={"/assets/images/swapip-logo-black.png"}
                  alt=""
                />
              </span>
            </div>

            <div className='border-[1.5px] border-su_enable_bg rounded-sm py-3.5 px-4 flex items-center justify-between text-xs lg:text-sm' >
              <p className='text-su_ternary' >Action</p>

              <span className='flex items-center gap-2 text-su_primary font-semibold' >
                {action}
              </span>
            </div>

            <div className='border-[1.5px] border-su_enable_bg rounded-sm py-3.5 px-4 flex items-center justify-between text-xs lg:text-sm' >
              <p className='text-su_ternary' >Subname</p>

              <span className='flex items-center gap-2 text-su_primary font-semibold' >
                {subname}.{name}

                <CustomAvatar
                  imageSrc={avatar}
                  fallbackName={title || ''}
                  isPremium={isPremium}
                  sizeClasses="!w-7 !h-7"
                />
              </span>
            </div>
          </div>
        </div>


        <div className="w-full grid grid-cols-2 gap-4 py-2" >
          <CustomOutlineButton
            containerClasses="w-full h-full"
            onClick={() => { handleNavigationOfSteps('PREVIOUS'); }}
          >
            Back
          </CustomOutlineButton>

          <Button
            onClick={handleOpenWallet}
            isLoading={isLoading}
          >
            Open wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog >
  );
};

export default ConfirmSubnameDialog;  