import CustomAvatar from '@/components/custom/shared/CustomAvatar';
import CustomOutlineButton from '@/components/custom/shared/CustomOutlineButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Environment } from '@/config';
import { defaults, thirdwebCustomDarkTheme } from '@/constants/defaults';
import { handleShowNotificationToast } from '@/lib/helpers';
import { handleMintNewOffchainSubname } from '@/lib/minting';
import { currentChain, thirdWebClient } from '@/lib/thirdWebClient';
import { getWalletProxy } from '@/lib/walletProxy';
import { getAvailableCurrenciesApi } from '@/service/api';
import { useGlobalStore } from '@/store/global-store';
import { useProfileStore } from '@/store/profile';
import { SUI_CurrencyChainItem } from '@/types/global.types';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { getBuyWithCryptoHistory, NATIVE_TOKEN_ADDRESS, PreparedTransaction, ZERO_ADDRESS } from 'thirdweb';
import { PayEmbed, PaymentInfo, useSendTransaction } from 'thirdweb/react';


interface IProp {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  handleNavigationOfSteps: (navigationMode: "NEXT" | "PREVIOUS") => void;
}

const ConfirmSubnameDialog = ({ handleNavigationOfSteps, open, setOpen }: IProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPaymentSection, setOpenPaymentSection] = useState(false);

  const [chargesInWei, setChargesInWei] = useState<bigint | null>(null);
  const [chargesInEth, setChargesInEth] = useState('');

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

      const createdFullName = await handleMintNewOffchainSubname(subname, wallet.address as `0x${string}`);

      if (createdFullName) {
        handleShowNotificationToast(
          "success",
          "Subname created Successfully",
          `Your fullname is: \n ${createdFullName}`
        );

        setTransactionHash(createdFullName);
        handleNavigationOfSteps("NEXT");
      }

    } catch (error: any) {
      handleShowNotificationToast(
        "error",
        "Request failed!",
        `${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    let allCurrencies = availableCurrencies;

    const getCurrencies = async () => {
      await refetchCurrenciesDataset();
      allCurrencies = useGlobalStore.getState().availableCurrencies;
    };

    if (!availableCurrencies || availableCurrencies.length === 0) {
      getCurrencies();
    }

    if (allCurrencies) {
      const foundCurrency = allCurrencies.find(currency => currency.symbol.toLowerCase() === 'eth');
      if (foundCurrency) {
        const convertedChargesInEth = Environment.NEW_SUBNAME_CHARGES / Number(foundCurrency.price);
        const convertedChargesInWei = ethers.parseUnits(convertedChargesInEth.toString(), 'ether');

        setChargesInEth(String(convertedChargesInEth));
        setChargesInWei(convertedChargesInWei);
      }
    }


  }, [availableCurrencies]);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="w-[400px] p-4" >
        {/* subname detail section */}
        {!openPaymentSection &&
          <div className=' space-y-4' >
            <div className="space-y-3" >
              {/* header */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="font-bold text-xl pt-3" >Confirm Details</h2>

                  <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </DialogClose>
                </div>

                <p className="text-base font-medium text-secondary dark:text-su_secondary">Double check these details before <br /> confirming in your wallet.</p>
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
                onClick={() => setOpenPaymentSection(true)}
                isLoading={isLoading}
              >
                Open wallet
              </Button>
            </div>
          </div>
        }


        {/* Payment section */}
        {openPaymentSection &&

          <div className=' space-y-4' >
            <section className="space-y-3" >
              {/* header */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="font-bold text-xl pt-3">Pay to your subname</h2>

                  <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </DialogClose>
                </div>

                <p className="text-base font-medium text-secondary dark:text-su_secondary">You can pay with Crypto or credit / debit card.</p>
              </div>

              <PayEmbed
                theme={thirdwebCustomDarkTheme}
                client={thirdWebClient}
                payOptions={{
                  prefillBuy: {
                    amount: chargesInEth,
                    chain: currentChain,
                    allowEdits: {
                      amount: true,
                      token: true,
                      chain: false,
                    },
                    // token: {
                    //   address: ZERO_ADDRESS,
                    //   name: "Base Sepolia Eth",
                    //   symbol: 'ETH',
                    //   icon: ''
                    // }
                  },
                  buyWithCrypto: {
                    testMode: true,
                    // prefillSource: {
                    //   chain: currentChain,
                    //   allowEdits: {
                    //     chain: false,
                    //     token: true
                    //   },
                    // },
                  },
                  buyWithFiat: {
                    testMode: true,
                  },
                  paymentInfo: {
                    amount: chargesInEth,
                    chain: currentChain,
                    sellerAddress: Environment.SWAPUP_TREASURY_WALLET,
                    amountWei: chargesInWei!,
                  },
                  onPurchaseSuccess: async (tx) => {
                    console.log("payment transaction: ", tx);
                    await handleOpenWallet();
                  }
                }}

              />
            </section>

            {/* <div className="w-full grid grid-cols-2 gap-4 py-2" >
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
            </div> */}
          </div>
        }
      </DialogContent>
    </Dialog >
  );
};

export default ConfirmSubnameDialog;  