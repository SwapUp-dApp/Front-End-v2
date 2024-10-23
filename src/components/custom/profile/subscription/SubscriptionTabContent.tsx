import { Button } from '@/components/ui/button';
import { Environment } from '@/config';
import { defaults } from '@/constants/defaults';
import { SUE_PURCHASE_TYPE } from '@/constants/enums';
import { handleShowNotificationToast } from '@/lib/helpers';
import { paymentChain, thirdWebClient } from '@/lib/thirdWebClient';
import { getAvailableCurrenciesApi, transferSubscriptionTokensToUserApi } from '@/service/api';
import { useGlobalStore } from '@/store/global-store';
import { useProfileStore } from '@/store/profile';
import { SUI_CurrencyChainItem } from '@/types/global.types';
import { SUI_PurchaseData } from '@/types/payments.types';
import { SUI_TransferSubscriptionTokensToUserPayload } from '@/types/profile.types';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { PayEmbed } from 'thirdweb/react';


const SubscriptionTabContent = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [openPaymentSection, setOpenPaymentSection] = useState(false);

  const [chargesInWei, setChargesInWei] = useState<bigint | null>(null);
  const [chargesInEth, setChargesInEth] = useState('');

  const [wallet, profile] = useProfileStore(state => [state.profile.wallet, state.profile]);
  const [availableCurrencies, setAvailableCurrencies] = useGlobalStore(state => [state.availableCurrencies, state.setAvailableCurrencies]);

  const handleSubscriptionTokenTransfer = async () => {
    try {
      setIsLoading(true);

      if (profile.details?.smartAccount) {

        const payload: SUI_TransferSubscriptionTokensToUserPayload = {
          amountToTransfer: 10,
          tokenAddress: Environment.SUBSCRIPTION_TOKEN_ADDRESS,
          transferToAddress: profile.details?.smartAccount,
        };

        const response = await transferSubscriptionTokensToUserApi(payload);

        if (response) {
          handleShowNotificationToast(
            "success",
            `Subscribed successfully`,
            `You will receive a subscription tokens in your smart account. \n ${response.data.message || response.data}`
          );
        }

      } else {
        throw new Error(`${wallet.address} user doest not have smart account!`);
      }

    } catch (error: any) {
      handleShowNotificationToast(
        "error",
        `Request failed!`,
        `${error.message}`
      );
    }
  };

  const refetchCurrenciesDataset = async () => {
    try {
      const response = await getAvailableCurrenciesApi();
      setAvailableCurrencies(response.data.data.coins as SUI_CurrencyChainItem[]);
    } catch (error) {
      throw error;
    }
  };


  useEffect(() => {
    if (openPaymentSection) {

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
          const convertedChargesInEth = parseFloat((Environment.SUBSCRIPTION_CHARGES / Number(foundCurrency.price)).toFixed(18));
          const convertedChargesInWei = ethers.parseUnits(convertedChargesInEth.toString(), 'ether');

          setChargesInEth(String(convertedChargesInEth.toFixed(8)));
          setChargesInWei(convertedChargesInWei);
          setChargesInWei(convertedChargesInWei);
        }
      }
    }
  }, [availableCurrencies, openPaymentSection]);

  return (
    <div className="w-full min-h-60 flex items-center justify-center" >
      {!openPaymentSection &&
        <Button onClick={() => { setOpenPaymentSection(true); }} >Get Subscription</Button>
      }


      {openPaymentSection &&
        <PayEmbed
          theme={defaults.thirdweb.getCustomTheme()}
          client={thirdWebClient}

          payOptions={{
            ...defaults.thirdweb.getCustomPaymentOptions(false, 'Subscription'),

            purchaseData: {
              purchaseType: SUE_PURCHASE_TYPE.SUBSCRIPTION,
              details: {
                subscription: {
                  ownerAddress: wallet.address,
                  smartAccount: profile.details?.smartAccount || '',
                  tokenAddress: Environment.SUBSCRIPTION_TOKEN_ADDRESS,
                  tokenAmount: 10,
                  message: `${wallet.address} user paid for subscription (10 subscription tokens must be transferred to his ${profile.details?.smartAccount} smart wallet)`
                }
              },
              paymentTriggeredFrom: {
                environmentId: Environment.ENVIRONMENT_ID,
                environmentKey: Environment.ENVIRONMENT_KEY
              }
            } as SUI_PurchaseData,

            onPurchaseSuccess: (tx) => {
              handleSubscriptionTokenTransfer();
              console.log("payment transaction: ", tx);
            },

            mode: 'direct_payment',

            // This 'paymentInfo' is for 'Payment mode: direct_payment' only
            paymentInfo: {
              amount: chargesInEth,
              chain: paymentChain,
              sellerAddress: Environment.SWAPUP_TREASURY_WALLET,
              amountWei: (chargesInWei ? chargesInWei.toString() : "0") as unknown as bigint,
            },
          }}
        />}

    </div>
  );
};

export default SubscriptionTabContent;