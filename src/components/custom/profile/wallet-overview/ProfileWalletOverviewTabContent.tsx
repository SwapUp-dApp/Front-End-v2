import React from 'react';
import WalletOverviewCard from '../../swap-market/WalletOverviewCard';

const ProfileWalletOverviewTabContent = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4' >
      <WalletOverviewCard cardType="totalwalletvalue" Value="1685.69" description="Total Wallet Value" />
      <WalletOverviewCard cardType="cryptostored" Value="235.12" description="Crypto stored in the smart contract" />
      <WalletOverviewCard cardType="NFTs" Value="7" description="NFTs located in the smart contract" />
    </div>
  );
};

export default ProfileWalletOverviewTabContent;