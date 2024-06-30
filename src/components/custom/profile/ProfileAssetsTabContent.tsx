import React from 'react';
import ProfileAssetsLayout from './ProfileAssetsLayout';
import { useProfileStore } from '@/store/profile';

const ProfileAssetsTabContent = () => {

  const wallet = useProfileStore(state => state.profile.wallet);

  return (
    <div className='space-y-4'>
      <ProfileAssetsLayout layoutType='sender' walletAddress={wallet.address} />
    </div>
  );
};

export default ProfileAssetsTabContent;