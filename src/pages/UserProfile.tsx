import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import ProfileHeader from "@/components/custom/swap_market/ProfileHeader";
import ProfilePointsCard from "@/components/custom/swap_market/ProfilePointsCard";
import WalletOverviewCard from "@/components/custom/swap_market/WalletOverviewCard";
import EmptyDataset from "@/components/custom/shared/EmptyDataset";
import ProfileAssetsLayout from "@/components/custom/swap_market/ProfileAssetsLayout";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState<"wallet-overview" | "assets"| "points">("assets");

    const myWalletAddress = "0xe6a28D675f38856ad383557C76dfdA2238961A49";

    const handleSwitchTab = (value: "wallet-overview" | "assets") => {
      setActiveTab(value);
    };
  

 



    const handleResetData = () => {
     // resetRoom('privateMarket', 'privateRoom');
    };
    
    return (
      <>
        <section className="flex flex-col gap-4" >
        <ProfileHeader
        walletAddress={myWalletAddress}
        resetData={handleResetData}
        existDescription="By leaving profile, your changes will not be saved"
        existTitle="Are you sure you want to exit your Profile page?"
        ensaddress="maria.swapup.eth"
        joindate="Joined Sept 2023"
      />
  
          {/* leaderboard */}
  
  
          <div className="overflow-x-scroll lg:overflow-hidden" >
            <Tabs defaultValue="swap-history" className="w-full">
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
  
              <TabsContent value="wallet-overview" className="w-full flex justify-center">
                {/* Wallet Overview Tiles */}
                <div className="flex flex-col lg:flex-row items-center gap-3" >
           
                  <WalletOverviewCard cardType="totalwalletvalue" Value="1685.69" TitleDesc="Total Wallet Value" />
                  <WalletOverviewCard cardType="cryptostored" Value="235.12" TitleDesc="Crypto stored in the smart contract" />
                  <WalletOverviewCard cardType="NFTs" Value="7" TitleDesc="NFTs located in the smart contract" />
                    
                </div>
  
              </TabsContent>
  
              <TabsContent value="assets" className="w-full flex flex-col gap-4">
  
                {/* Assets Loader */}
                <div className="grid lg:grid-cols-2 gap-4 mb-16 lg:mb-16" >
                <ProfileAssetsLayout layoutType={"sender"}  walletAddress={myWalletAddress}/>        
                </div>
                
  
              </TabsContent>

                <TabsContent value="points" className="w-full flex flex-col gap-4">

                {/* Points & Swappot  */}

                <div className="flex flex-col lg:flex-row items-center gap-3" >
           
                  <ProfilePointsCard cardType="tradescreated" Title="Trades Created" TitleDesc="Active trade Proposals you have created" Points="50" />
                  <ProfilePointsCard cardType="tradescreated" Title="Trades Completed" TitleDesc="Successfully finalized trade transactions" Points="50"/>
                  <ProfilePointsCard cardType="tradescreated" Title="Trades Shared" TitleDesc="Trades you've shared publicly" Points="50"/>
                
               </div>
               <div className="flex gap-4 items-center">
                <h2 className="font-semibold text-1.5xl" >Swappot</h2>
             
                </div>

                <EmptyDataset
                  title="Swappot Functionality Coming Soon 🚀"
                  description="Unlocks at 300 members. Stay tuned for exciting features!"
                >
                  </EmptyDataset>

                </TabsContent>


            </Tabs>
          </div>
        </section >
      </>
    );
  };
  
  export default UserProfile;