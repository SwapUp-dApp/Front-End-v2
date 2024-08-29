import ProfileHeader from "@/components/custom/profile/ProfileHeader";
import CustomTabContainer from "@/components/custom/shared/CustomTabContainer";
import { defaults } from "@/constants/defaults";
import { getActiveTabFromPathname } from "@/lib/utils";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleResetData = () => {
    // resetRoom('privateMarket', 'privateRoom');
  };

  return (
    <>
      <section className="flex flex-col gap-4" >
        <ProfileHeader
          resetData={handleResetData}
          existDescription="By leaving profile, your changes will not be saved"
          existTitle="Are you sure you want to exit your Profile page?"
        />

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
                  <span className={`${activeTab === tab.key ? "absolute -bottom-3.5 left-0 border-b-2 border-su_primary w-full" : ""}`} ></span>
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