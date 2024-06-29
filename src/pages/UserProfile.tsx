import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import WalletOverviewCard from "@/components/custom/swap-market/WalletOverviewCard";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import ProfileAssetsLayout from "@/components/custom/profile/ProfileAssetsLayout";
import { useSwapMarketStore } from "@/store/swap-market";
import ProfileHeader from "@/components/custom/profile/ProfileHeader";
import ProfilePointsCard from "@/components/custom/profile/ProfilePointsCard";
import { useProfileStore } from "@/store/profile";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"wallet-overview" | "assets" | "points">("assets");
  const wallet = useProfileStore(state => state.profile.wallet);

  const profile = useSwapMarketStore(state => state.privateMarket.privateRoom.sender.profile);

  //const myWalletAddress = "0xe6a28D675f38856ad383557C76dfdA2238961A49";

  const handleSwitchTab = (value: "wallet-overview" | "assets" | "points") => {
    setActiveTab(value);
  };

  //const testWalletAddress: string = "0xe6a28D675f38856ad383557C76dfdA2238961A49";

  const handleResetData = () => {
    // resetRoom('privateMarket', 'privateRoom');
  };

  return (
    <>
      <section className="flex flex-col gap-4" >
        <ProfileHeader
          walletAddress={wallet.address}
          resetData={handleResetData}
          existDescription="By leaving profile, your changes will not be saved"
          existTitle="Are you sure you want to exit your Profile page?"
          ensAddress={profile.ensAddress}
          joinData="Joined Sept 2023"
          profileImage={profile.avatar}
          avatarFallbackI="No Image"
        />

        {/* leaderboard */}


        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="border-b-2 border-su_enable_bg w-full justify-start rounded-none bg-transparent">
            <TabsTrigger value="wallet-overview" onClick={() => handleSwitchTab("wallet-overview")} >
              Wallet Overview

            </TabsTrigger>
            <TabsTrigger value="assets" onClick={() => handleSwitchTab("assets")}>
              Assets

            </TabsTrigger>
            <TabsTrigger value="points" onClick={() => handleSwitchTab("points")}>
              Points & Swappot

            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet-overview" className="w-full flex">
            {/* Wallet Overview Tiles */}
            <div className="flex flex-col lg:flex-row items-start gap-3" >

              <WalletOverviewCard cardType="totalwalletvalue" Value="1685.69" description="Total Wallet Value" />
              <WalletOverviewCard cardType="cryptostored" Value="235.12" description="Crypto stored in the smart contract" />
              <WalletOverviewCard cardType="NFTs" Value="7" description="NFTs located in the smart contract" />

            </div>

          </TabsContent>

          <TabsContent value="assets" className="w-full flex flex-col gap-4">
            <ProfileAssetsLayout layoutType={"sender"} walletAddress={wallet.address} />
          </TabsContent>

          <TabsContent value="points" className="w-full flex flex-col gap-4">

            {/* Points & Swappot  */}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4" >

              <ProfilePointsCard image="/assets/images/badge.png" title="Trades Created" description="Active trade Proposals you have created" points="50" />
              <ProfilePointsCard image="/assets/images/badge.png" title="Trades Completed" description="Successfully finalized trade transactions" points="50" />
              <ProfilePointsCard image="/assets/images/badge.png" title="Trades Shared" description="Trades you've shared publicly" points="50" />

            </div>
            <div className="flex gap-4 items-center">
              <h2 className="font-semibold text-1.5xl" >Swappot</h2>

              <span className={`bg-text font-semibold rounded-full py-0.5 px-3 text-xs ${activeTab === 'points' ? 'bg-muted text-muted-foreground' : 'bg-muted'}`}>

              </span>
            </div>

            <EmptyDataset
              title="Swappot Functionality Coming Soon 🚀"
              description="Unlocks at 300 members. Stay tuned for exciting features!"
            >
            </EmptyDataset>

          </TabsContent>


        </Tabs>

      </section >
    </>
  );
};

export default UserProfile;