import Footer from "@/components/custom/shared/Footer";
import Navbar from "@/components/custom/shared/Navbar";
import { navItemsData } from "@/constants";
import { useSwapMarketStore } from "@/store/swap-market";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ToastLookCard from "@/components/custom/shared/ToastLookCard";
import { toast } from "sonner";
import { defaultFallbackRoute } from "@/routes";

const MainLayout = () => {
  const [wallet] = useSwapMarketStore(state => [state.wallet]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleShowWalletConnectionToast = () => {
    toast.custom(
      (id) => (
        <ToastLookCard
          variant="warning"
          title="Connect to wallet!"
          description={"Please connect to wallet for this feature!"}
          onClose={() => toast.dismiss(id)}
        />
      ),
      {
        duration: 3000,
        className: 'w-full !bg-transparent',
        position: "bottom-left",
      }
    );
  };

  useEffect(() => {

    if (pathname) {
      const currentRoute = navItemsData.find(item => item.path === pathname);
      if (currentRoute?.protected) {

        wallet.isConnected ?
          navigate(pathname)
          :
          (
            handleShowWalletConnectionToast(),
            navigate(defaultFallbackRoute)
          );

      }
    }



  }, [pathname, wallet.isConnected]);

  return (
    <>
      <Navbar />
      <section className="px-6 lg:px-10 py-4" >
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;