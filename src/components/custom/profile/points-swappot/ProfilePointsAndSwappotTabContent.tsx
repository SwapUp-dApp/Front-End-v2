import React from 'react';
import ProfilePointsCard from './ProfilePointsCard';
import EmptyDataset from '../../shared/EmptyDataset';

const ProfilePointsAndSwappotTabContent = () => {
  return (
    <div className='space-y-4' >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4" >

        <ProfilePointsCard image="/assets/images/badge.png" title="Trades Created" description="Active trade Proposals you have created" points="50" />
        <ProfilePointsCard image="/assets/images/badge.png" title="Trades Completed" description="Successfully finalized trade transactions" points="50" />
        <ProfilePointsCard image="/assets/images/badge.png" title="Trades Shared" description="Trades you've shared publicly" points="50" />

      </div>
      <div className="flex gap-4 items-center">
        <h2 className="font-semibold text-1.5xl" >Swappot</h2>

        <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${'points' === 'points' ? 'bg-muted text-muted-foreground' : 'bg-muted'}`}>

        </span>
      </div>

      <EmptyDataset
        title="Swappot Functionality Coming Soon 🚀"
        description="Unlocks at 300 members. Stay tuned for exciting features!"
      >
      </EmptyDataset>
    </div >
  );
};

export default ProfilePointsAndSwappotTabContent;