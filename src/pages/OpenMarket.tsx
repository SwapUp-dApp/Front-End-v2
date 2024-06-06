import { useEffect, useState } from "react";
import * as React from "react"

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CopyTile from "@/components/custom/tiles/CopyTile";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CustomOutlineButton from "@/components/custom/shared/CustomOutlineButton";
import StaySafeDialog from "@/components/custom/swap_market/StaySafeDialog";
import AvoidingFeeDialog from "@/components/custom/swap_market/AvoidingFeeDialog";

import { useSwapMarketStore } from "@/store/swap-market";
import OpenMarketRoomFooter from "@/components/custom/swap_market/OpenMarketRoomFooter";
import OpenMarketSwapDialogSideCard from "@/components/custom/swap_market/OpenMarketSwapDialogSideCard";
import OpenMarketHeader from "@/components/custom/swap_market/OpenMarketHeader";
import OpenMarketRoomLayoutCard from "@/components/custom/swap_market/OpenMarketRoomLayoutCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface IProp {
  children: any;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => void;
  removeAllFilters: () => void;
  collections: [] | string[];
}

const OpenMarket = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 1),
  });

  const state = useSwapMarketStore(state => state.openMarket.openRoom);
  const [enableApproveButtonCriteria, setEnableApproveButtonCriteria] = useState(false);

  useEffect(() => {
    if ((state.sender.nftsSelectedForSwap.length) && (state.sender.addedAmount)) {
      setEnableApproveButtonCriteria(true);      
    } else {
      setEnableApproveButtonCriteria(false);     
    }
  }, [state.sender.nftsSelectedForSwap, state.sender.addedAmount]);



  return (
    <div className="flex flex-col gap-4" >
      <OpenMarketHeader tradeId={state.uniqueTradeId} />

      <div className="grid lg:grid-cols-2 gap-4 mb-16 lg:mb-16" >
        <OpenMarketRoomLayoutCard layoutType={"sender"} />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-none flex flex-col gap-4 dark:bg-su_secondary_bg p-2 lg:p-6" >

      <div className="font-semibold text-sm lg:text-lg w-2/3 lg:w-auto">
      <p>Swap parameters</p>
      </div>
      
      <div className="" >
      <p>Request date:</p>
      </div>
      <div className="" >

      <Popover>
      <PopoverTrigger asChild>
      <Button
      id="date"
      variant={"outline"}
      className={cn(
      "w-[300px] justify-start text-left font-normal",
      !date && "text-muted-foreground"
      )}
      >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date?.from ? (
      date.to ? (
      <>
      {format(date.from, "LLL dd, y")} -{" "}
      {format(date.to, "LLL dd, y")}
      </>
      ) : (
      format(date.from, "LLL dd, y")
      )
      ) : (
      <span>Pick a date</span>
      )}
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
      <Calendar
      initialFocus
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      />
      </PopoverContent>
      </Popover>






      </div>

      <div className="h-full space-y-2">
      <div className="flex justify-between items-center text-sm" >
      <p>Preferred asset:</p>
      

      </div>

      <div className="flex justify-between items-center text-sm" >
      <ToggleGroup type="single">
      <ToggleGroupItem value="any" aria-label="Toggle bold">Any</ToggleGroupItem>
      <ToggleGroupItem value="nft" aria-label="Toggle bold" >NFT</ToggleGroupItem>
      <ToggleGroupItem value="received" aria-label="Toggle bold">Currency</ToggleGroupItem>
      </ToggleGroup>
      </div>


      
      

      

      </div>

     
      

      </div>
      </div>



      <footer className="bg-su_primary_bg fixed bottom-0 left-0 w-full min-h-[112px] lg:h-[104px] flex justify-between" >

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
              <ScrollArea className="p-4 lg:p-5" >
                <ScrollBar orientation="vertical" />

                <div className="space-y-3" >
                  {/* header */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4 pt-2 w-full" >
                        <h2 className="font-semibold text-xl" >Swap Details</h2>

                        <CopyTile textToCopy={state.uniqueTradeId} >
                          <span className="hidden lg:hidden" >Unique trade ID:</span> <span className="dark:text-su_primary font-semibold">#{state.uniqueTradeId}</span>
                        </CopyTile>

                        <div className="flex items-center gap-2 text-xs text-su_secondary" >
                          <span className="hidden lg:inline-block" >Etherscan link:</span>

                          <svg className="w-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.50268 6.06934C3.1801 6.06934 2.91464 6.33479 2.91464 6.65793L2.9152 10.3637C2.9152 10.6179 2.73039 10.8375 2.47669 10.8604C2.18884 10.8952 1.9581 10.9181 1.77329 10.9299C1.42719 10.9646 1.10405 10.7916 0.930994 10.4914C0.71202 10.1106 0.527208 9.71797 0.388879 9.30242C-0.879603 5.65379 1.05812 1.65961 4.7034 0.389449C8.34867 -0.880713 12.3395 1.05925 13.6085 4.70733C13.7239 5.03047 13.6662 5.37713 13.4584 5.64259C12.7662 6.54313 11.8892 7.29357 11.0357 7.91689V3.67966C11.0357 3.34476 10.7703 3.0793 10.4471 3.0793H9.45531C9.13216 3.0793 8.86671 3.35652 8.86671 3.67966V8.81687C8.86671 9.02521 8.75134 9.19826 8.56653 9.2789C8.32459 9.38251 8.0821 9.48668 8.0821 9.48668V5.18C8.0821 4.8451 7.80544 4.57964 7.4823 4.57964H6.49047C6.15613 4.57964 5.89067 4.85686 5.89067 5.18V9.82102C5.89067 10.0523 5.72882 10.2483 5.50985 10.306C5.348 10.3407 5.20967 10.3755 5.0943 10.4102V6.66969C5.0943 6.33479 4.81765 6.06934 4.4945 6.06934H3.50268ZM12.6613 11.1145C10.3893 14.2429 6.01706 14.9357 2.89093 12.6613C6.70926 12.1187 11.4276 10.3294 13.9763 6.50823L13.9779 6.53171C13.9886 6.68568 13.9993 6.8392 13.9993 6.99322C13.9993 8.4706 13.5266 9.91381 12.6613 11.1145Z" fill="white" />
                          </svg>
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
                    <OpenMarketSwapDialogSideCard data={state.sender} />

                    <svg className="w-3.5" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.72844 0L12 4.15863H0.238525V3.0368H9.21836L6.91377 0.793135L7.72844 0ZM11.7615 5.84137V6.9632H2.78164L5.08623 9.20687L4.27156 10L0 5.84137H11.7615Z" fill="#B6B6BD" />
                    </svg>

                   
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
        <OpenMarketRoomFooter layoutType="sender" setEnableApproveButtonCriteria={setEnableApproveButtonCriteria} />       
      </footer>
    </div >
  );
};

export default OpenMarket;