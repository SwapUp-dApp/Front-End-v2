import { cn } from "@/lib/utils";
import { usePrivateRoomStore } from "@/store/private-room-store";

interface IProp {
  className?: string;
  topRated?: boolean;
}

const NftCard = ({ className, topRated = true, ...props }: IProp) => {
  const activeGridView = usePrivateRoomStore(state => state.activeGridView);
  return (
    <div
      className={cn(
        `${activeGridView === "detailed" ? "h-[196px]" : "h-[100px]"} bg-su_enable_bg rounded-md cursor-pointer relative`,
        className
      )}
      {...props}
    >
      <div className={`relative ${activeGridView === "detailed" ? "h-[132px] rounded-tl-md rounded-tr-md" : "h-full rounded-md"}`}>
        <img src={'/src/assets/nfts/card-nft-1.png'} alt="" className={`h-full w-full object-cover ${activeGridView === "detailed" ? "rounded-tl-md rounded-tr-md" : "rounded-md"}`} />

        <div className="group" >
          <span className={`absolute top-2 ${activeGridView === "detailed" ? "right-3" : "right-1"} w-7 h-7 flex justify-center items-center rounded-full bg-transparent hover:bg-su_active_bg`} >
            <svg className="w-1 " viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.00078 9.6C2.31904 9.6 2.62427 9.72643 2.84931 9.95147C3.07435 10.1765 3.20078 10.4817 3.20078 10.8C3.20078 11.1183 3.07435 11.4235 2.84931 11.6485C2.62427 11.8736 2.31904 12 2.00078 12C1.68252 12 1.3773 11.8736 1.15225 11.6485C0.927209 11.4235 0.800781 11.1183 0.800781 10.8C0.800781 10.4817 0.927209 10.1765 1.15225 9.95147C1.3773 9.72643 1.68252 9.6 2.00078 9.6ZM2.00078 4.8C2.31904 4.8 2.62427 4.92643 2.84931 5.15147C3.07435 5.37652 3.20078 5.68174 3.20078 6C3.20078 6.31826 3.07435 6.62348 2.84931 6.84853C2.62427 7.07357 2.31904 7.2 2.00078 7.2C1.68252 7.2 1.3773 7.07357 1.15225 6.84853C0.927209 6.62348 0.800781 6.31826 0.800781 6C0.800781 5.68174 0.927209 5.37652 1.15225 5.15147C1.3773 4.92643 1.68252 4.8 2.00078 4.8ZM2.00078 0C2.31904 0 2.62427 0.126428 2.84931 0.351472C3.07435 0.576515 3.20078 0.88174 3.20078 1.2C3.20078 1.51826 3.07435 1.82348 2.84931 2.04853C2.62427 2.27357 2.31904 2.4 2.00078 2.4C1.68252 2.4 1.3773 2.27357 1.15225 2.04853C0.927209 1.82348 0.800781 1.51826 0.800781 1.2C0.800781 0.88174 0.927209 0.576515 1.15225 0.351472C1.3773 0.126428 1.68252 0 2.00078 0Z" fill="white" />
            </svg>
          </span>


          <div className={`hidden group-hover:flex absolute p-2 rounded-sm bg-white text-black flex-col gap-1 ${activeGridView === "detailed" ? "-bottom-8 left-2 text-sm" : "-bottom-6 z-10 text-3xs"} font-semibold`} >
            <p>Top 0.1%</p>
            <div>
              <p className="leading-tight">Rarity rank: 20 / 2000</p>
              <p className={`text-su_disabled font-normal leading-none ${activeGridView === "detailed" ? "text-xs" : "text-4xs"}`} >(7 items share this rank)</p>
            </div>
          </div>
        </div>

      </div>
      {
        activeGridView === "detailed" &&
        <div className="p-3 flex flex-col gap-2" >
          <div className="flex items-center justify-between" >
            <p className="text-sm font-semibold capitalize">Normilady #1982</p>

            {topRated &&
              <svg className="w-4" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.83666 6.06934C3.51408 6.06934 3.24863 6.33479 3.24863 6.65793L3.24919 10.3637C3.24919 10.6179 3.06437 10.8375 2.81068 10.8604C2.52282 10.8952 2.29208 10.9181 2.10727 10.9299C1.76117 10.9646 1.43803 10.7916 1.26498 10.4914C1.046 10.1106 0.861192 9.71797 0.722863 9.30242C-0.545618 5.65379 1.39211 1.65961 5.03738 0.389449C8.68266 -0.880713 12.6735 1.05925 13.9425 4.70733C14.0579 5.03047 14.0002 5.37713 13.7924 5.64259C13.1002 6.54313 12.2232 7.29357 11.3697 7.91689V3.67966C11.3697 3.34476 11.1043 3.0793 10.7811 3.0793H9.78929C9.46615 3.0793 9.20069 3.35652 9.20069 3.67966V8.81687C9.20069 9.02521 9.08532 9.19826 8.90051 9.2789C8.65858 9.38251 8.41608 9.48668 8.41608 9.48668V5.18C8.41608 4.8451 8.13942 4.57964 7.81628 4.57964H6.82446C6.49012 4.57964 6.22466 4.85686 6.22466 5.18V9.82102C6.22466 10.0523 6.06281 10.2483 5.84383 10.306C5.68198 10.3407 5.54365 10.3755 5.42829 10.4102V6.66969C5.42829 6.33479 5.15163 6.06934 4.82849 6.06934H3.83666ZM12.9953 11.1145C10.7232 14.2429 6.35104 14.9357 3.22492 12.6613C7.04324 12.1187 11.7615 10.3294 14.3103 6.50823L14.3119 6.53171C14.3226 6.68568 14.3332 6.8392 14.3332 6.99322C14.3332 8.4706 13.8606 9.91381 12.9953 11.1145Z" fill="#B6B6BD" />
              </svg>
            }
          </div>

          <div className="flex items-center justify-between" >

            <div className="flex items-center gap-2" >
              <img src={'src/assets/svgs/ethereum.svg'} alt="" className="w-4 h-4 rounded-full" />

              <p className="text-xs text-su_secondary uppercase">0,1678 ETH</p>
            </div>

            <div className="flex items-center gap-2" >
              <svg className="w-4" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.05148 2.85714L6.33398 0L4.61648 2.85714H8.05148ZM2.05148 7.14286L0.333984 10H12.334L10.6165 7.14286H2.05148ZM10.189 6.42857L8.47898 3.57143H4.18898L2.47898 6.42857H10.189Z" fill="#FFC175" />
              </svg>
              <p className="text-xs text-su_secondary">10</p>
            </div>
          </div>
        </div>
      }


    </div>



  );
};

export default NftCard;