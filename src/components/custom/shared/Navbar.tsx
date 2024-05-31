import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, Drawer } from "@/components/ui/drawer";
import { navItemsData } from "@/constants";
import { getIsActiveNav } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

          <div className="flex items-center gap-4" >
            <div className="border-2 rounded-md py-2 px-4 flex items-center gap-4" >
              <span className="flex items-center gap-4">
                <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 8C11.0478 8 10.4543 8.24583 10.0168 8.68342C9.57917 9.121 9.33333 9.71449 9.33333 10.3333C9.33333 10.9522 9.57917 11.5457 10.0168 11.9832C10.4543 12.4208 11.0478 12.6667 11.6667 12.6667H16V16H0V4.66667H16V8H11.6667ZM12.3333 11.3333H11.6667C11.4015 11.3333 11.1471 11.228 10.9596 11.0404C10.772 10.8529 10.6667 10.5985 10.6667 10.3333C10.6667 10.0681 10.772 9.81376 10.9596 9.62623C11.1471 9.43869 11.4015 9.33333 11.6667 9.33333H12.3333C12.5985 9.33333 12.8529 9.43869 13.0404 9.62623C13.228 9.81376 13.3333 10.0681 13.3333 10.3333C13.3333 10.5985 13.228 10.8529 13.0404 11.0404C12.8529 11.228 12.5985 11.3333 12.3333 11.3333ZM10.6667 0L13.3333 3.33333H5.33333L10.6667 0Z" fill="#868691" />
                </svg>
                <p>0x1431F...23f83</p>
              </span>

              <span className="h-6 border-r-2"></span>

              <div className="flex items-center gap-4" >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 8.00002C16 12.4183 12.4183 16 8.00002 16C3.58173 16 0 12.4183 0 8.00002C0 3.58173 3.58173 0 8.00002 0C12.4183 0 16 3.58173 16 8.00002ZM5.17015 9.75853C5.09249 9.75844 5.01793 9.78899 4.96265 9.84353L3.54364 11.251C3.52304 11.2714 3.50898 11.2974 3.50326 11.3258C3.49755 11.3542 3.50043 11.3836 3.51154 11.4104C3.52266 11.4371 3.5415 11.4599 3.56566 11.4759C3.58981 11.4919 3.61818 11.5003 3.64714 11.5H10.8302C10.9079 11.5 10.9825 11.4693 11.0377 11.4145L12.4567 10.007C12.4773 9.98674 12.4915 9.96073 12.4972 9.93235C12.503 9.90396 12.5001 9.8745 12.489 9.84776C12.4778 9.82102 12.459 9.79823 12.4347 9.78233C12.4105 9.76642 12.3821 9.75813 12.3532 9.75853H5.17015ZM5.17015 4.50001C5.09249 4.49993 5.01793 4.53047 4.96265 4.58501L3.54364 5.99302C3.52321 6.0134 3.50931 6.03939 3.50369 6.06769C3.49807 6.09599 3.501 6.12532 3.51209 6.15196C3.52319 6.1786 3.54195 6.20133 3.566 6.21728C3.59004 6.23323 3.61829 6.24166 3.64714 6.24152H10.8302C10.9078 6.2416 10.9824 6.21106 11.0377 6.15652L12.4567 4.74901C12.5492 4.65701 12.4837 4.50001 12.3532 4.50001H5.17015ZM10.8302 7.11252C10.9078 7.11244 10.9824 7.14298 11.0377 7.19752L12.4567 8.60502C12.4773 8.62537 12.4913 8.65141 12.497 8.6798C12.5028 8.70819 12.4999 8.73763 12.4888 8.76437C12.4776 8.79111 12.4588 8.81393 12.4346 8.8299C12.4105 8.84587 12.3821 8.85427 12.3532 8.85402H5.17015C5.09265 8.85402 5.01764 8.82352 4.96265 8.76902L3.54364 7.36152C3.52304 7.34117 3.50898 7.31513 3.50326 7.28674C3.49755 7.25836 3.50043 7.22891 3.51154 7.20217C3.52266 7.17543 3.5415 7.15261 3.56566 7.13664C3.58981 7.12067 3.61818 7.11227 3.64714 7.11252H10.8302Z" fill="#66F9A1" />
                </svg>
                <p>Solana</p>
                <svg className="w-4 ml-2" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L6 6L2 2" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </div>

            </div>
            <Avatar className="w-10 h-10" >
              <AvatarImage src={'/src/assets/images/avatar.png'} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile navbar */}

      <div className="lg:hidden flex items-center gap-7" >

        <svg className=" lg:hidden w-4" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 16C7.53043 16 8.03914 15.7893 8.41421 15.4142C8.78929 15.0392 9 14.5305 9 14.0001H5C5 14.5305 5.21071 15.0392 5.58579 15.4142C5.96086 15.7893 6.46957 16 7 16ZM7.995 1.09981C8.00896 0.960776 7.99362 0.820356 7.94997 0.687611C7.90632 0.554865 7.83533 0.432741 7.74158 0.329115C7.64783 0.225489 7.5334 0.142662 7.40567 0.0859748C7.27794 0.0292879 7.13975 0 7 0C6.86026 0 6.72206 0.0292879 6.59433 0.0859748C6.4666 0.142662 6.35217 0.225489 6.25842 0.329115C6.16467 0.432741 6.09368 0.554865 6.05003 0.687611C6.00638 0.820356 5.99104 0.960776 6.005 1.09981C4.87455 1.32935 3.85823 1.94268 3.12831 2.83585C2.39839 3.72902 1.99977 4.84708 2 6.00055C2 7.09849 1.5 12.0002 0 13.0002H14C12.5 12.0002 12 7.09849 12 6.00055C12 3.58068 10.28 1.56079 7.995 1.09981Z" fill="white" />
        </svg>


        <Drawer direction="left" >
          <DrawerTrigger>
            <div className="relative w-10 h-10 rounded-full flex justify-center items-center bg-gradient-primary" >
              <span className="absolute w-9 h-9 rounded-full flex justify-center items-center bg-su_primary_bg" >
                <svg className="w-3" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.00015V4.33349H12V6.00015H0ZM0.000162601 1.66682V0.000152588H12.0002V1.66682H0.000162601Z" fill="white" />
                </svg>
              </span>
            </div>

          </DrawerTrigger>
          <DrawerContent className="h-screen w-3/4" >

            <DrawerHeader>
              <DrawerTitle className="flex justify-between" >
                <img src="/swapup.png" alt="SwapUp" className="w-24" />

                <DrawerClose>
                  <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </DrawerClose>
              </DrawerTitle>
            </DrawerHeader>

            <div className="mt-6 p-6 h-full flex flex-col justify-between" >
              <ol className="flex flex-col gap-8" >
                <li className="font-semibold" >Swap Market</li>
                <li className="font-semibold" >My Swaps</li>
                <li className="font-semibold" >Profile</li>
              </ol>

              <div className="flex items-center justify-between" >

                <svg className="w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 13.6H7.2V12H8.8V13.6ZM10.456 7.4L9.736 8.136C9.16 8.72 8.8 9.2 8.8 10.4H7.2V10C7.2 9.12 7.56 8.32 8.136 7.736L9.128 6.728C9.424 6.44 9.6 6.04 9.6 5.6C9.6 4.72 8.88 4 8 4C7.12 4 6.4 4.72 6.4 5.6H4.8C4.8 3.832 6.232 2.4 8 2.4C9.768 2.4 11.2 3.832 11.2 5.6C11.2 6.304 10.912 6.944 10.456 7.4Z" fill="white" />
                </svg>

                <Avatar className="w-10 h-10" >
                  <AvatarImage src={'/src/assets/images/avatar.png'} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

          </DrawerContent>
        </Drawer>

      </div>
    </div>
  );
};

export default Navbar;