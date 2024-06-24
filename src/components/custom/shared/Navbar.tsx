import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, Drawer } from "@/components/ui/drawer";
import { navItemsData } from "@/constants";
import { getIsActiveNav, getNetworkImageById, getShortenWalletAddress } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConnectWalletButton from "./ConnectWalletButton";
import { useSwapMarketStore } from "@/store/swap-market";
import CustomAvatar from "./CustomAvatar";


const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const [connectWallet, wallet] = useSwapMarketStore(state => [state.connectWallet, state.wallet]);

  const handleConnectionToWallet = async () => {
    setIsConnecting(true);
    await connectWallet();

    setIsConnecting(false);
  };


  useEffect(() => {
    if (!wallet.isConnected) {
      handleConnectionToWallet();
    }

    // Set up event listeners for wallet and network changes
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          await handleConnectionToWallet();
        }
      };

      const handleChainChanged = async () => {
        await handleConnectionToWallet();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup listeners on component unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet.isConnected]);



  return (
    <div className="w-full p-4 flex justify-between lg:justify-start lg:gap-16" >
      <img onClick={() => navigate('/swap-up/swap-market')} src="/swapup.png" alt="SwapUp" className="w-24 cursor-pointer" />

      {/* Desktop navbar */}
      <div className="w-full hidden lg:flex items-center justify-between">
        <ol className="flex gap-4 items-center" >
          {
            navItemsData.map(navItem => (
              <Link to={navItem.path} key={navItem.key}>
                <li className={`nav-link font-semibold text-sm ${getIsActiveNav(navItem.path, pathname) ? "active" : ""}`} >{navItem.title}</li>
              </Link>
            ))
          }
        </ol>

        <div className="flex items-center gap-4" >
          <span className="flex items-center gap-4">
            <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 13.6H7.2V12H8.8V13.6ZM10.456 7.4L9.736 8.136C9.16 8.72 8.8 9.2 8.8 10.4H7.2V10C7.2 9.12 7.56 8.32 8.136 7.736L9.128 6.728C9.424 6.44 9.6 6.04 9.6 5.6C9.6 4.72 8.88 4 8 4C7.12 4 6.4 4.72 6.4 5.6H4.8C4.8 3.832 6.232 2.4 8 2.4C9.768 2.4 11.2 3.832 11.2 5.6C11.2 6.304 10.912 6.944 10.456 7.4Z" fill="white" />
            </svg>

            <svg className="w-4" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 16C7.53043 16 8.03914 15.7893 8.41421 15.4142C8.78929 15.0392 9 14.5305 9 14.0001H5C5 14.5305 5.21071 15.0392 5.58579 15.4142C5.96086 15.7893 6.46957 16 7 16ZM7.995 1.09981C8.00896 0.960776 7.99362 0.820356 7.94997 0.687611C7.90632 0.554865 7.83533 0.432741 7.74158 0.329115C7.64783 0.225489 7.5334 0.142662 7.40567 0.0859748C7.27794 0.0292879 7.13975 0 7 0C6.86026 0 6.72206 0.0292879 6.59433 0.0859748C6.4666 0.142662 6.35217 0.225489 6.25842 0.329115C6.16467 0.432741 6.09368 0.554865 6.05003 0.687611C6.00638 0.820356 5.99104 0.960776 6.005 1.09981C4.87455 1.32935 3.85823 1.94268 3.12831 2.83585C2.39839 3.72902 1.99977 4.84708 2 6.00055C2 7.09849 1.5 12.0002 0 13.0002H14C12.5 12.0002 12 7.09849 12 6.00055C12 3.58068 10.28 1.56079 7.995 1.09981Z" fill="white" />
            </svg>
          </span>
          {
            !wallet.isConnected ?
              <ConnectWalletButton
                onClick={handleConnectionToWallet}
                isLoading={isConnecting}
              /> :
              <div className="flex items-center gap-4" >
                <div className="border-2 rounded-md py-2 px-4 flex items-center gap-4" >
                  <span className="flex items-center gap-4">
                    <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6667 8C11.0478 8 10.4543 8.24583 10.0168 8.68342C9.57917 9.121 9.33333 9.71449 9.33333 10.3333C9.33333 10.9522 9.57917 11.5457 10.0168 11.9832C10.4543 12.4208 11.0478 12.6667 11.6667 12.6667H16V16H0V4.66667H16V8H11.6667ZM12.3333 11.3333H11.6667C11.4015 11.3333 11.1471 11.228 10.9596 11.0404C10.772 10.8529 10.6667 10.5985 10.6667 10.3333C10.6667 10.0681 10.772 9.81376 10.9596 9.62623C11.1471 9.43869 11.4015 9.33333 11.6667 9.33333H12.3333C12.5985 9.33333 12.8529 9.43869 13.0404 9.62623C13.228 9.81376 13.3333 10.0681 13.3333 10.3333C13.3333 10.5985 13.228 10.8529 13.0404 11.0404C12.8529 11.228 12.5985 11.3333 12.3333 11.3333ZM10.6667 0L13.3333 3.33333H5.33333L10.6667 0Z" fill="#868691" />
                    </svg>
                    <p>{getShortenWalletAddress(wallet.address)}</p>
                  </span>

                  <span className="h-6 border-r-2"></span>

                  <div className="flex items-center gap-4" >
                    <img
                      className="w-4 h-4 rounded-full object-cover"
                      src={getNetworkImageById(wallet.network.id)}
                      alt=""
                    />

                    <p className="capitalize" >{wallet.network.title}</p>
                    <svg className="w-4 ml-2" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L6 6L2 2" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </div>

                </div>
                <CustomAvatar
                  imageSrc={wallet.image}
                  fallbackName={wallet.title}
                />
              </div>
          }

        </div>
      </div>

      {/* Mobile navbar */}

      <div className="lg:hidden flex items-center gap-7" >

        <svg className=" lg:hidden w-4" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 16C7.53043 16 8.03914 15.7893 8.41421 15.4142C8.78929 15.0392 9 14.5305 9 14.0001H5C5 14.5305 5.21071 15.0392 5.58579 15.4142C5.96086 15.7893 6.46957 16 7 16ZM7.995 1.09981C8.00896 0.960776 7.99362 0.820356 7.94997 0.687611C7.90632 0.554865 7.83533 0.432741 7.74158 0.329115C7.64783 0.225489 7.5334 0.142662 7.40567 0.0859748C7.27794 0.0292879 7.13975 0 7 0C6.86026 0 6.72206 0.0292879 6.59433 0.0859748C6.4666 0.142662 6.35217 0.225489 6.25842 0.329115C6.16467 0.432741 6.09368 0.554865 6.05003 0.687611C6.00638 0.820356 5.99104 0.960776 6.005 1.09981C4.87455 1.32935 3.85823 1.94268 3.12831 2.83585C2.39839 3.72902 1.99977 4.84708 2 6.00055C2 7.09849 1.5 12.0002 0 13.0002H14C12.5 12.0002 12 7.09849 12 6.00055C12 3.58068 10.28 1.56079 7.995 1.09981Z" fill="white" />
        </svg>


        <Drawer direction="left" open={isOpen} onClose={() => setIsOpen(false)} >
          <DrawerTrigger onClick={() => setIsOpen(true)}>
            <div className="relative w-10 h-10 rounded-full flex justify-center items-center bg-gradient-primary" >
              <span className="absolute w-9 h-9 rounded-full flex justify-center items-center bg-su_primary_bg" >
                <svg className="w-3" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.00015V4.33349H12V6.00015H0ZM0.000162601 1.66682V0.000152588H12.0002V1.66682H0.000162601Z" fill="white" />
                </svg>
              </span>
            </div>

          </DrawerTrigger>

          <DrawerContent className="h-screen w-3/4 !bg-su_least_bg" >

            <DrawerHeader>
              <DrawerTitle className="flex justify-between" >
                <img src="/swapup.png" alt="SwapUp" className="w-24" />

                <DrawerClose onClick={() => setIsOpen(false)}>
                  <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </DrawerClose>
              </DrawerTitle>
            </DrawerHeader>

            <div className="mt-6 p-6 h-full flex flex-col justify-between" >
              <ol className="flex flex-col gap-8" >
                {
                  navItemsData.map(navItem => (
                    <Link to={navItem.path} key={navItem.key}>
                      <li className={`nav-link font-semibold text-sm ${getIsActiveNav(navItem.path, pathname) ? "active" : ""}`} >{navItem.title}</li>
                    </Link>
                  ))
                }
              </ol>

              <div className="flex items-center justify-between" >

                <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 13.6H7.2V12H8.8V13.6ZM10.456 7.4L9.736 8.136C9.16 8.72 8.8 9.2 8.8 10.4H7.2V10C7.2 9.12 7.56 8.32 8.136 7.736L9.128 6.728C9.424 6.44 9.6 6.04 9.6 5.6C9.6 4.72 8.88 4 8 4C7.12 4 6.4 4.72 6.4 5.6H4.8C4.8 3.832 6.232 2.4 8 2.4C9.768 2.4 11.2 3.832 11.2 5.6C11.2 6.304 10.912 6.944 10.456 7.4Z" fill="white" />
                </svg>

                <CustomAvatar
                  imageSrc={wallet.image}
                  fallbackName={wallet.title}
                />
              </div>
            </div>

          </DrawerContent>
        </Drawer>

      </div>
    </div>
  );
};

export default Navbar;