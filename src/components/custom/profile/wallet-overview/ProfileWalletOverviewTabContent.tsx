import React from 'react';
import WalletOverviewCard from '../../swap-market/WalletOverviewCard';
import { Card, CardContent } from '@/components/ui/card';
import TokenDistributionPerChainChart from './TokenDistributionPerChainChart';
import TokenBreakdownChart from './TokenBreakdownChart';

const ProfileWalletOverviewTabContent = () => {

  return (
    <section className='space-y-3' >
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4' >
        <WalletOverviewCard cardType="totalwalletvalue" Value="1685.69" description="Total Wallet Value" />
        <WalletOverviewCard cardType="cryptostored" Value="235.12" description="Crypto stored in the smart contract" />
        <WalletOverviewCard cardType="NFTs" Value="7" description="NFTs located in the smart contract" />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2' >
        <Card className='border-none bg-card  dark:bg-su_secondary_bg p-4 lg:p-6 rounded-md'>
          <TokenDistributionPerChainChart />
        </Card>

        <Card className='border-none bg-card  dark:bg-su_secondary_bg p-4 lg:p-6 rounded-md'>
          <TokenBreakdownChart />
        </Card>
      </div>
    </section>
  );
};

export default ProfileWalletOverviewTabContent;