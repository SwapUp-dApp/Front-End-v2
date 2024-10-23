import ProfileHeader from "@/components/custom/profile/ProfileHeader";
import CustomTabContainer from "@/components/custom/shared/CustomTabContainer";
import LoadingDataset from "@/components/custom/shared/LoadingDataset";
import { defaults } from "@/constants/defaults";
import { handleShowNotificationToast } from "@/lib/helpers";
import { getActiveTabFromPathname } from "@/lib/utils";
import { getUserByWalletIdApi } from "@/service/api";
import { useProfileStore } from "@/store/profile";
import { useSwapMarketStore } from "@/store/swap-market";
import { IProfile } from "@/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [wallet, setUserProfile] = useProfileStore(state => [state.profile.wallet, state.setUserProfile]);

  const handleResetData = () => {
    // resetRoom('privateMarket', 'privateRoom');
  };

  const { isLoading } = useQuery({
    queryKey: [`getUserByWalletIdApi-key${wallet.address}`],
    queryFn: async () => {
      try {
        if (wallet.address && wallet.isConnected) {
          const userResponse = await getUserByWalletIdApi(wallet.address);

          if (userResponse) {
            const { createdAt, description, title, images, tags, social_links, points, smartAccount } = userResponse.data.data;
            const latestProfile = useProfileStore.getState().profile;

            const userProfileDetails: IProfile = {
              ...latestProfile,
              avatar: images.avatar,
              coverImage: images.coverImage,
              joinDate: createdAt,
              details: {
                ...latestProfile.details,
                title: title,
                description: description,
                points: points,
                tags: tags,
                twitter: social_links.twitter,
                warpcast: social_links.warpcast,
                smartAccount
              }
            };

            setUserProfile(userProfileDetails);

            // console.log("user details: ", userProfileDetails);
          }
          return userResponse.data.data;
        }
        return null;

      } catch (error: any) {
        handleShowNotificationToast(
          'error',
          "unable to get user profile",
          error.message
        );

        throw error;
      }
    },
    retry: false,
    enabled: (wallet.address && wallet.isConnected) ? true : false
  });

  return (
    <>
      <section className="flex flex-col gap-4" >
        <LoadingDataset
          isLoading={isLoading}
          title="Loading user profile"
          description="User profile data is being loaded..."
        />

        {!isLoading &&
          <ProfileHeader
            resetData={handleResetData}
            existDescription="By leaving profile, your changes will not be saved"
            existTitle="Are you sure you want to exit your Profile page?"
          />
        }

        <CustomTabContainer >
          {
            defaults.profile.tabs.map(tab => {
              const activeTab = getActiveTabFromPathname(pathname);
              return (
                <button
                  key={tab.key}
                  onClick={() => navigate(tab.path)}
                  className={`relative flex bg-transparent ${activeTab === tab.key ? "text-su_primary" : "text-muted-foreground"} items-center gap-3 text-sm font-bold px-3 `}
                >
                  {tab.title}
                  <span className={`${activeTab === tab.key ? "absolute -bottom-1.5 lg:-bottom-3.5 left-0 border-b-2 border-su_primary w-full" : ""}`} ></span>
                </button>
              );
            })
          }
        </CustomTabContainer>

        <div className="w-full" >
          <Outlet />
        </div>
      </section >
    </>
  );
};

export default UserProfile;