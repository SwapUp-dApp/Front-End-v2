import RoomHeader from "@/components/custom/swap_market/RoomHeader";
import RoomLayoutCard from "@/components/custom/swap_market/RoomLayoutCard";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { usePrivateRoomStore } from "@/store/private-room-store";
import { INFTItem } from "@/swapup-types";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import CopyTile from "@/components/custom/tiles/CopyTile";
import SwapDialogSideCard from "@/components/custom/swap_market/SwapDialogSideCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CustomOutlineButton from "@/components/custom/shared/CustomOutlineButton";
import StaySafeDialog from "@/components/custom/swap_market/StaySafeDialog";
import AvoidingFeeDialog from "@/components/custom/swap_market/AvoidingFeeDialog";

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
      <RoomHeader backClickNavigateTo="/" tardeId={state.uniqueTradeId} />
      <div className="grid lg:grid-cols-2 gap-4 mb-16 lg:mb-12" >
        <RoomLayoutCard layoutType={"sender"} />
        <RoomLayoutCard layoutType={"receiver"} />
      </div>


      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full h-[112px] lg:h-[104px] flex justify-between" >

        <div className="absolute -top-14 flex justify-center w-full" >

          {/* Swap Details Dialog */}
          <Dialog>
            <div className="relative" >
              <Button
                variant={"default"}
                type="submit"
                disabled={!enableApproveButtonCriteria}
              >
                Approve
              </Button>
              <DialogTrigger className="absolute w-full h-full top-0 left-0 bg-transparent" disabled={!enableApproveButtonCriteria}>
              </DialogTrigger>
            </div>

            <DialogContent className="max-h-[calc(100vh_-_100px)] p-0" >
              <ScrollArea className="p-3 pr-4" >
                <ScrollBar orientation="vertical" className="" />
                <div className="space-y-3" >

                  {/* header */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4 pt-2 w-full" >
                        <h2 className="font-semibold text-xl" >Swap Details</h2>

                        <div className="w-full flex justify-center lg:w-auto lg:justify-start" >
                          <CopyTile textToCopy={state.uniqueTradeId} >
                            Unique trade ID: <span className="dark:text-su_primary font-semibold">#{state.uniqueTradeId}</span>
                          </CopyTile>
                        </div>

                        <div className="w-full flex justify-center lg:w-auto lg:justify-start" >
                          <span className="flex items-center gap-2 text-xs text-su_secondary" >
                            Etherscan link:

                            <svg className="w-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M3.50268 6.06934C3.1801 6.06934 2.91464 6.33479 2.91464 6.65793L2.9152 10.3637C2.9152 10.6179 2.73039 10.8375 2.47669 10.8604C2.18884 10.8952 1.9581 10.9181 1.77329 10.9299C1.42719 10.9646 1.10405 10.7916 0.930994 10.4914C0.71202 10.1106 0.527208 9.71797 0.388879 9.30242C-0.879603 5.65379 1.05812 1.65961 4.7034 0.389449C8.34867 -0.880713 12.3395 1.05925 13.6085 4.70733C13.7239 5.03047 13.6662 5.37713 13.4584 5.64259C12.7662 6.54313 11.8892 7.29357 11.0357 7.91689V3.67966C11.0357 3.34476 10.7703 3.0793 10.4471 3.0793H9.45531C9.13216 3.0793 8.86671 3.35652 8.86671 3.67966V8.81687C8.86671 9.02521 8.75134 9.19826 8.56653 9.2789C8.32459 9.38251 8.0821 9.48668 8.0821 9.48668V5.18C8.0821 4.8451 7.80544 4.57964 7.4823 4.57964H6.49047C6.15613 4.57964 5.89067 4.85686 5.89067 5.18V9.82102C5.89067 10.0523 5.72882 10.2483 5.50985 10.306C5.348 10.3407 5.20967 10.3755 5.0943 10.4102V6.66969C5.0943 6.33479 4.81765 6.06934 4.4945 6.06934H3.50268ZM12.6613 11.1145C10.3893 14.2429 6.01706 14.9357 2.89093 12.6613C6.70926 12.1187 11.4276 10.3294 13.9763 6.50823L13.9779 6.53171C13.9886 6.68568 13.9993 6.8392 13.9993 6.99322C13.9993 8.4706 13.5266 9.91381 12.6613 11.1145Z" fill="white" />
                            </svg>
                          </span>
                        </div>

                      </div>

                      <DialogClose className="p-1 rounded-xs hover:bg-su_active_bg" >
                        <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </DialogClose>
                    </div>
                    <h2 className="text-sm font-semibold">Wallet and Asset Details</h2>
                  </div>

                  {/* side cards*/}
                  <div className="flex flex-col lg:flex-row items-center gap-4" >
                    <SwapDialogSideCard data={state.sender} />

                    <svg className="rotate-90 lg:rotate-0 w-3.5" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.72844 0L12 4.15863H0.238525V3.0368H9.21836L6.91377 0.793135L7.72844 0ZM11.7615 5.84137V6.9632H2.78164L5.08623 9.20687L4.27156 10L0 5.84137H11.7615Z" fill="#B6B6BD" />
                    </svg>

                    <SwapDialogSideCard data={state.receiver} />
                  </div>

                  {/* Fee section*/}
                  <div className="custom-border-card" >
                    <h2 className="text-xs lg:sm text-primary font-semibold" >Estimate fees:</h2>

                    <div className="text-xs lg:text-sm dark:text-su_secondary font-normal flex items-center justify-between" >
                      <p>Project royalties:</p>
                      <p className="text-text dark:text-su_primary" >5%</p>
                    </div>
                    <div className="text-xs lg:text-sm dark:text-su_secondary font-normal flex items-center justify-between" >
                      <p>Cryptocurrency trading fee:</p>
                      <p className="text-text dark:text-su_primary" >0.01 SOL</p>
                    </div>
                    <div className="text-xs lg:text-sm dark:text-su_secondary font-normal flex items-center justify-between" >
                      <p>SwapUp platform fees:</p>
                      <p className="text-text dark:text-su_primary" >2%</p>
                    </div>
                    <div className="text-xs lg:text-sm dark:text-su_secondary font-normal flex items-center justify-between" >
                      <p>Current Gas:</p>
                      <p className="text-text dark:text-su_primary" >50 GWEI / $100</p>
                    </div>

                    <div className="p-2 dark:bg-su_least_bg rounded-xs space-y-1" >

                      <div className="text-xs lg:text-sm dark:text-su_secondary font-normal flex items-center justify-between" >
                        <p className="text-text dark:text-su_primary" >Total fees:</p>

                        <div className="flex gap-2" >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.98798 8.73952C10.9377 8.65264 12.3941 8.31104 12.3941 7.90528C12.3941 7.49953 10.9387 7.15889 8.9883 7.07201V8.40081C8.9323 8.40593 8.62717 8.43121 8.02029 8.43121C7.51501 8.43121 7.14893 8.40961 7.02094 8.40081V7.07201C5.06686 7.15873 3.60798 7.49857 3.60798 7.90577C3.60798 8.31297 5.0667 8.65329 7.02094 8.73985V8.73825C7.14685 8.74481 7.50414 8.75921 8.01198 8.75921C8.64717 8.75921 8.93246 8.74304 8.98798 8.73952Z" fill="#53AE94" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 3.58192 12.4181 0 8 0C3.58144 0 0 3.58096 0 8C0 12.419 3.58208 16 8 16C12.4179 16 16 12.4181 16 8ZM8.98734 5.74401V6.93409C11.1953 7.03601 12.8558 7.47409 12.8558 7.99841C12.8558 8.52273 11.196 8.96049 8.98798 9.06241V12.8747H7.01998V9.06273C4.80878 8.96049 3.14478 8.52241 3.14478 7.99761C3.14478 7.47281 4.80798 7.03473 7.01998 6.93313V5.74401H4.29822V3.93073H11.7088V5.74401H8.98734Z" fill="#53AE94" />
                          </svg>

                          <p className="text-su_primary" >0.005 UDST / $ 0.0</p>
                        </div>
                      </div>

                      <p className="text-xs lg:text-sm dark:text-su_secondary" >
                        Interested in reducing fees?  {' '}
                        <AvoidingFeeDialog>
                          <span className="link-style" >View details</span>
                        </AvoidingFeeDialog>
                      </p>
                    </div>
                  </div>

                  {/* stay safe*/}
                  <div className="p-2 dark:bg-su_least_bg rounded-xs space-y-1" >

                    <h3 className="text-xs lg:text-sm text-text dark:text-su_primary font-normal" >
                      Stay Safe!
                    </h3>

                    <p className="text-xs lg:text-sm dark:text-su_secondary" >
                      Always use best practices when completing a trade. {' '}
                      <StaySafeDialog>
                        <span className="link-style" >View details</span>
                      </StaySafeDialog>
                    </p>
                  </div>

                  <div className="w-full flex justify-end items-center gap-3 py-2" >
                    <div className="relative" >
                      <CustomOutlineButton className="px-5 py-2.5">Cancel</CustomOutlineButton>
                      <DialogClose className="absolute w-full h-full top-0 left-0" ></DialogClose>
                    </div>
                    <Button variant={"default"}>Proceeds</Button>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

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