import React, { useEffect, useState } from 'react';
import WalletOverviewCard from '../../swap-market/WalletOverviewCard';
import { Card } from '@/components/ui/card';
import TokenDistributionPerChainChart from './TokenDistributionPerChainChart';
import TokenBreakdownChart from './TokenBreakdownChart';
import CollectionDetailsSection from './CollectionDetailsSection';
import SubDomainMintingSection from './subdomain/SubDomainMintingSection';
import { useQuery } from '@tanstack/react-query';
import { getAvailableCurrenciesApi } from '@/service/api';
import { SUI_CurrencyChainItem } from '@/types/global.types';
import { useGlobalStore } from '@/store/global-store';
import LoadingDataset from '../../shared/LoadingDataset';
import { useProfileStore } from '@/store/profile';
import { handleShowNotificationToast } from '@/lib/helpers';
import { Outlet } from 'react-router-dom';
import { generateRandomKey } from '@/lib/utils';

const ProfileWalletOverviewTabContent = () => {
  const [subnameMintSectionKey, setSubnameMintSectionKey] = useState(generateRandomKey(6));

  const [setAvailableCurrencies] = useGlobalStore(state => [state.setAvailableCurrencies]);
  const [totalWalletValue, totalNftsOwned, wallet] = useProfileStore(state => [state.overviewTab.totalWalletValue, state.overviewTab.totalNftsOwned, state.profile.wallet]);
  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: [`getAvailableCurrenciesApi`],
    queryFn: async () => {
      try {
        const response = await getAvailableCurrenciesApi();
        setAvailableCurrencies(response.data.data.coins as SUI_CurrencyChainItem[]);
        return response.data.data.coins;
      } catch (error: any) {
        handleShowNotificationToast(
          "error",
          `Request failed!`,
          `${error.message}`
        );

        throw error;
      }
    },
    retry: false
  });


  const handleSubnameMintSectionReload = () => {
    setSubnameMintSectionKey(generateRandomKey(6));
  };

  useEffect(() => {
    if (wallet && wallet.isConnected) {
      handleSubnameMintSectionReload();
    }

  }, [wallet]);

  return (
    <>
      {
        isSuccess &&
        <section className='space-y-4' >
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4' >
            <WalletOverviewCard cardType="totalwalletvalue" value={totalWalletValue} description="Total Wallet Value" />
            <WalletOverviewCard cardType="cryptostored" value={235.12} description="Crypto stored in the smart contract" />
            <WalletOverviewCard cardType="NFTs" value={totalNftsOwned} description="NFTs located in the smart contract" />
          </div>

          {/* Charts section */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2' >
            <Card className='border-none bg-card  dark:bg-su_secondary_bg p-4 lg:p-6 rounded-md'>
              <TokenDistributionPerChainChart />
            </Card>

            <Card className='border-none bg-card  dark:bg-su_secondary_bg p-4 lg:p-6 rounded-md'>
              <TokenBreakdownChart />
            </Card>
          </div>

          <CollectionDetailsSection />
          <SubDomainMintingSection key={subnameMintSectionKey} handleSubnameMintSectionReload={handleSubnameMintSectionReload} subnameMintSectionKey={subnameMintSectionKey} />

          {/* <Outlet /> */}
        </section>
      }

      {isLoading &&
        <div className='w-full h-[60vh] flex items-center justify-center' >
          <LoadingDataset
            isLoading={isLoading}
            title="Loading currencies data."
          />
        </div>
      }
    </>
  );
};

export default ProfileWalletOverviewTabContent;