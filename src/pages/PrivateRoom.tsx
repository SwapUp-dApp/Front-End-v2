import RoomHeader from "@/components/custom/swap_market/RoomHeader";
import RoomLayoutCard from "@/components/custom/swap_market/RoomLayoutCard";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { usePrivateRoomStore } from "@/store/private-room-store";
import { INFTItem } from "@/swapup-types";
import { useEffect, useState } from "react";

const PrivateRoom = () => {
  const state = usePrivateRoomStore(state => state);
  const [enableApproveButtonCriteria, setEnableApproveButtonCriteria] = useState(false);

  const removeSelectedNftById = (paramId: string, key: "sender" | "receiver") => {
    const filteredNfts = state[key].nftsSelectedForSwap.filter(nft => nft.id !== paramId);
    state[key].setSelectedNftsForSwap([...filteredNfts]);
  };

  const removeAllSelectedNft = (key: "sender" | "receiver") => {
    state[key].setSelectedNftsForSwap([]);
    setEnableApproveButtonCriteria(false);
  };

  const nftsImageMapper = (nfts: INFTItem[], lengthToShowParam: number, paramKey: "sender" | "receiver") => {
    const lengthToShow = lengthToShowParam - 1;
    return (
      nfts.map((nft, index) => {
        if (index < lengthToShow || (index === lengthToShow && nfts.length > lengthToShow))
          return (
            <div
              className="group relative w-8 h-8 rounded-xs lg:w-12 lg:h-12 object-cover lg:rounded-sm border-[1.5px] border-white/20"
              key={nft.image}>
              <img className="w-full h-full object-cover rounded-xs lg:rounded-sm" src={nft.image} alt="nft" />
              {
                (index === lengthToShow) && nfts.length > lengthToShowParam ?
                  <div className="absolute w-full h-full rounded-xs lg:rounded-sm bg-black/50 top-0 left-0 flex justify-center items-center font-semibold text-xs lg:text-sm" >
                    +{nfts.length - lengthToShowParam}
                  </div> : ''
              }

              <div className="hidden group-hover:absolute group-hover:flex w-full h-full rounded-xs lg:rounded-sm bg-black/50 top-0 left-0 justify-end items-start font-semibold text-xs lg:text-sm p-1" >

                <span
                  className="rounded-full p-1 bg-white/30 relative cursor-pointer"
                  onClick={() => removeSelectedNftById(nft.id, paramKey)}
                >
                  <svg className="w-2" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.47177 1.58877L8.00207 1.05842L6.94137 -0.00219727L6.41106 0.528155L4.00006 2.93935L1.58906 0.528155L1.05875 -0.00219727L-0.00195312 1.05842L0.528355 1.58877L2.93944 4.00006L0.528356 6.41135L-0.00195312 6.9417L1.05875 8.00231L1.58906 7.47196L4.00006 5.06076L6.41106 7.47196L6.94137 8.00231L8.00207 6.9417L7.47176 6.41135L5.06068 4.00006L7.47177 1.58877Z" fill="white" />
                  </svg>
                </span>
              </div>
            </div>
          );
      })
    );
  };

  useEffect(() => {
    if (state.sender.nftsSelectedForSwap.length && state.receiver.nftsSelectedForSwap.length) {
      setEnableApproveButtonCriteria(true);
    } else {
      setEnableApproveButtonCriteria(false);
    }

  }, [state.sender.nftsSelectedForSwap, state.receiver.nftsSelectedForSwap]);

  return (
    <div className="flex flex-col gap-4" >
      <RoomHeader backClickNavigateTo="/" tardeId="#46Aic2o" />
      <div className="grid lg:grid-cols-2 gap-4 mb-12" >
        <RoomLayoutCard layoutType={"sender"} />
        <RoomLayoutCard layoutType={"receiver"} />
      </div>


      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full h-[112px] lg:h-[104px] flex justify-between" >

        <div className="absolute -top-14 flex justify-center w-full" >
          <Button
            variant={"default"}
            type="submit"
            disabled={!enableApproveButtonCriteria}
          >
            Approve
          </Button>
        </div>

        {/* Sender Side */}
        <aside className="space-y-2.5 lg:space-y-2 w-1/2 p-4 border border-su_disabled"  >
          <div className="flex justify-between items-center text-su_secondary " >
            <h2 className="dark:text-white text-xs">You offer:</h2>

            {
              state.sender.nftsSelectedForSwap.length > 0 &&
              <span
                className="flex items-center gap-1 lg:gap-2 text-2xs lg:text-xs font-semibold cursor-pointer"
                onClick={() => removeAllSelectedNft("sender")}
              >
                <svg className="w-2 lg:w-3" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 12C4.96667 12 3.63067 11.4918 2.492 10.4753C1.35333 9.45889 0.700444 8.18933 0.533333 6.66667H1.9C2.05556 7.82222 2.56956 8.77778 3.442 9.53333C4.31444 10.2889 5.33378 10.6667 6.5 10.6667C7.8 10.6667 8.90289 10.214 9.80867 9.30867C10.7144 8.40333 11.1671 7.30045 11.1667 6C11.1662 4.69956 10.7136 3.59689 9.80867 2.692C8.90378 1.78711 7.80089 1.33422 6.5 1.33333C5.73333 1.33333 5.01667 1.51111 4.35 1.86667C3.68333 2.22222 3.12222 2.71111 2.66667 3.33333H4.5V4.66667H0.5V0.666667H1.83333V2.23333C2.4 1.52222 3.09178 0.972222 3.90867 0.583333C4.72556 0.194444 5.58933 0 6.5 0C7.33333 0 8.114 0.158445 8.842 0.475333C9.57 0.792222 10.2033 1.21978 10.742 1.758C11.2807 2.29622 11.7084 2.92956 12.0253 3.658C12.3422 4.38645 12.5004 5.16711 12.5 6C12.4996 6.83289 12.3413 7.61356 12.0253 8.342C11.7093 9.07045 11.2816 9.70378 10.742 10.242C10.2024 10.7802 9.56911 11.208 8.842 11.5253C8.11489 11.8427 7.33422 12.0009 6.5 12Z" fill="#B6B6BD" />
                </svg>

                Clear assets
              </span>
            }
          </div>

          <div className="flex items-center justify-between" >
            {
              !(state.sender.nftsSelectedForSwap.length > 0) &&
              <p className="text-xs text-su_secondary" >Awaiting asset selection. You can choose up to 20 assets.</p>
            }

            {
              state.sender.nftsSelectedForSwap.length > 0 &&
              <>
                <div className="hidden lg:flex items-center gap-1.5 lg:gap-2" >
                  {nftsImageMapper(state.sender.nftsSelectedForSwap, 6, 'sender')}
                </div>

                <div className="lg:hidden flex items-center gap-1.5 lg:gap-2" >
                  {nftsImageMapper(state.sender.nftsSelectedForSwap, 4, 'sender')}
                </div>
              </>
            }

            <div className="hidden lg:flex items-center justify-between py-2 px-3 rounded-md bg-su_enable_bg ring-offset-su_active_bg focus-within:ring-1 focus-within:ring-su_active_bg focus-within:ring-offset-1" >

              <div className="flex items-center gap-2" >
                <svg className="w-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9294 5.71425C11.9294 8.87042 9.37083 11.429 6.21469 11.429C3.05856 11.429 0.5 8.87042 0.5 5.71425C0.5 2.55809 3.05856 -0.000488281 6.21469 -0.000488281C9.37083 -0.000488281 11.9294 2.55809 11.9294 5.71425ZM8.99618 11.9817C8.12045 12.3703 7.17301 12.5711 6.21493 12.5711C5.98634 12.5711 5.75775 12.5597 5.53259 12.5379C5.90083 13.3962 6.47376 14.1512 7.20127 14.7368C7.92877 15.3224 8.78869 15.7208 9.70581 15.8972C10.6229 16.0736 11.5693 16.0226 12.4621 15.7486C13.3549 15.4747 14.167 14.9861 14.8274 14.3256C15.4877 13.6652 15.9762 12.853 16.25 11.9601C16.5238 11.0673 16.5747 10.1209 16.3982 9.2038C16.2216 8.28671 15.8231 7.42684 15.2374 6.69942C14.6516 5.97199 13.8966 5.39917 13.0383 5.03106C13.1336 5.98439 13.0281 6.94712 12.7286 7.85719C12.4291 8.76726 11.9422 9.60448 11.2994 10.3149C10.6565 11.0252 9.87191 11.593 8.99618 11.9817Z" fill="#868691" />
                </svg>
                <input
                  type="text"
                  className="w-[100px] placeholder:text-su_secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
                  placeholder="Enter amount" />
              </div>

              <Select>
                <SelectTrigger className="bg-transparent border-none flex items-center gap-2">
                  <SelectValue className="uppercase" placeholder={
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/ethereum.svg'} alt="" />
                      Eth
                    </span>
                  } />
                </SelectTrigger>

                <SelectContent className="bg-su_primary_bg border-none right-0" >
                  <SelectItem className="hover:bg-su_active_bg" value="eth">
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/ethereum.svg'} alt="" />

                      Eth
                    </span>
                  </SelectItem>
                  <SelectItem className="hover:bg-su_active_bg" value="sol">
                    <span className=" flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/solana.svg'} alt="" />

                      Sol
                    </span>
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>
          </div>


          <button className="flex lg:hidden items-center gap-2 font-semibold text-xs" >
            <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.74862 0.996582V0.246582H5.24862V0.996582V5.24834H0.99707H0.24707V6.74834H0.99707H5.24862V11.0004V11.7504H6.74862V11.0004V6.74834H11.0009H11.7509V5.24834H11.0009H6.74862V0.996582Z" fill="white" />
            </svg>

            Add Currency
          </button>
        </aside>

        {/* Receiver Side */}
        <aside className="space-y-2.5 lg:space-y-2 w-1/2 p-4 border border-su_disabled"  >
          <div className="flex justify-between items-center text-su_secondary " >
            <h2 className="dark:text-white text-xs">You receive:</h2>

            {
              state.receiver.nftsSelectedForSwap.length > 0 &&
              <span
                className="flex items-center gap-1 lg:gap-2 text-2xs lg:text-xs font-semibold cursor-pointer"
                onClick={() => removeAllSelectedNft("receiver")}
              >
                <svg className="w-2 lg:w-3" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 12C4.96667 12 3.63067 11.4918 2.492 10.4753C1.35333 9.45889 0.700444 8.18933 0.533333 6.66667H1.9C2.05556 7.82222 2.56956 8.77778 3.442 9.53333C4.31444 10.2889 5.33378 10.6667 6.5 10.6667C7.8 10.6667 8.90289 10.214 9.80867 9.30867C10.7144 8.40333 11.1671 7.30045 11.1667 6C11.1662 4.69956 10.7136 3.59689 9.80867 2.692C8.90378 1.78711 7.80089 1.33422 6.5 1.33333C5.73333 1.33333 5.01667 1.51111 4.35 1.86667C3.68333 2.22222 3.12222 2.71111 2.66667 3.33333H4.5V4.66667H0.5V0.666667H1.83333V2.23333C2.4 1.52222 3.09178 0.972222 3.90867 0.583333C4.72556 0.194444 5.58933 0 6.5 0C7.33333 0 8.114 0.158445 8.842 0.475333C9.57 0.792222 10.2033 1.21978 10.742 1.758C11.2807 2.29622 11.7084 2.92956 12.0253 3.658C12.3422 4.38645 12.5004 5.16711 12.5 6C12.4996 6.83289 12.3413 7.61356 12.0253 8.342C11.7093 9.07045 11.2816 9.70378 10.742 10.242C10.2024 10.7802 9.56911 11.208 8.842 11.5253C8.11489 11.8427 7.33422 12.0009 6.5 12Z" fill="#B6B6BD" />
                </svg>

                Clear assets
              </span>
            }
          </div>

          <div className="flex items-center justify-between" >
            {
              !(state.receiver.nftsSelectedForSwap.length > 0) &&
              <p className="text-xs text-su_secondary" >Awaiting asset selection. You can choose up to 20 assets.</p>
            }

            {
              state.receiver.nftsSelectedForSwap.length > 0 &&
              <>
                <div className="hidden lg:flex items-center gap-1.5 lg:gap-2" >
                  {nftsImageMapper(state.receiver.nftsSelectedForSwap, 6, 'receiver')}
                </div>

                <div className="lg:hidden flex items-center gap-1.5 lg:gap-2" >
                  {nftsImageMapper(state.receiver.nftsSelectedForSwap, 4, 'receiver')}
                </div>
              </>
            }

            <div className="hidden lg:flex items-center justify-between py-2 px-3 rounded-md bg-su_enable_bg ring-offset-su_active_bg focus-within:ring-1 focus-within:ring-su_active_bg focus-within:ring-offset-1" >

              <div className="flex items-center gap-2" >
                <svg className="w-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9294 5.71425C11.9294 8.87042 9.37083 11.429 6.21469 11.429C3.05856 11.429 0.5 8.87042 0.5 5.71425C0.5 2.55809 3.05856 -0.000488281 6.21469 -0.000488281C9.37083 -0.000488281 11.9294 2.55809 11.9294 5.71425ZM8.99618 11.9817C8.12045 12.3703 7.17301 12.5711 6.21493 12.5711C5.98634 12.5711 5.75775 12.5597 5.53259 12.5379C5.90083 13.3962 6.47376 14.1512 7.20127 14.7368C7.92877 15.3224 8.78869 15.7208 9.70581 15.8972C10.6229 16.0736 11.5693 16.0226 12.4621 15.7486C13.3549 15.4747 14.167 14.9861 14.8274 14.3256C15.4877 13.6652 15.9762 12.853 16.25 11.9601C16.5238 11.0673 16.5747 10.1209 16.3982 9.2038C16.2216 8.28671 15.8231 7.42684 15.2374 6.69942C14.6516 5.97199 13.8966 5.39917 13.0383 5.03106C13.1336 5.98439 13.0281 6.94712 12.7286 7.85719C12.4291 8.76726 11.9422 9.60448 11.2994 10.3149C10.6565 11.0252 9.87191 11.593 8.99618 11.9817Z" fill="#868691" />
                </svg>
                <input
                  type="text"
                  className="w-[100px] placeholder:text-su_secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
                  placeholder="Enter amount" />
              </div>

              <Select >
                <SelectTrigger className="bg-transparent border-none flex items-center gap-2">
                  <SelectValue className="uppercase" placeholder={
                    <span className="flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/ethereum.svg'} alt="" />
                      Eth
                    </span>
                  } />
                </SelectTrigger>
                <SelectContent className="border-none" >
                  <SelectItem className="" value="eth">
                    <span className="flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/ethereum.svg'} alt="" />

                      Eth
                    </span>
                  </SelectItem>
                  <SelectItem className="" value="sol">
                    <span className="flex items-center gap-2" >
                      <img className="w-4 h-4 rounded-full" src={'src/assets/svgs/solana.svg'} alt="" />

                      Sol
                    </span>
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>
          </div>
          {/* add button for mobile */}
          <button className="flex lg:hidden items-center gap-2 font-semibold text-xs" >
            <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.74862 0.996582V0.246582H5.24862V0.996582V5.24834H0.99707H0.24707V6.74834H0.99707H5.24862V11.0004V11.7504H6.74862V11.0004V6.74834H11.0009H11.7509V5.24834H11.0009H6.74862V0.996582Z" fill="white" />
            </svg>

            Add Currency
          </button>
        </aside>
      </footer>
    </div >
  );
};

export default PrivateRoom;