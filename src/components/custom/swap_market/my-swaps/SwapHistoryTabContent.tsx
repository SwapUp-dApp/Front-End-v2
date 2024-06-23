import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import FilterButton from '../../shared/FilterButton';
import { DrawerTrigger, Drawer, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { generateRandomTradeId, getDefaultNftImageOnError, getLastCharacters, getShortenWalletAddress } from '@/lib/utils';
import EmptyDataset from '../../shared/EmptyDataset';
import { SUI_OpenSwap, SUI_SwapToken } from '@/types/swap-market.types';
import { usePendingSwapsList } from '@/service/queries/swap-market.query';
import ToastLookCard from '../../shared/ToastLookCard';
import { chainsDataset } from '@/constants/data';
import moment from 'moment';
import LoadingDataset from '../../shared/LoadingDataset';
import { useSwapMarketStore } from '@/store/swap-market';
import CreatePrivateSwapDialog from "@/components/custom/swap_market/private-party/CreatePrivateSwapDialog";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";


import CustomOutlineButton from "@/components/custom/shared/CustomOutlineButton";
import { Button } from "@/components/ui/button";

interface IProp {
  handleShowWalletConnectionToast: () => void;
}

const SwapHistoryTabContent = ({ handleShowWalletConnectionToast }: IProp) => {
  const navigate = useNavigate();
  const { setSwapHistoryData, swapHistory } = useSwapMarketStore(state => state.privateMarket);
  const wallet = useSwapMarketStore(state => state.wallet);

  const [isOpen, setIsOpen] = useState(false);



  // const handlePrivateSwapFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value.toLowerCase();
  //   setFilteredAvailablePrivateSwapsBySearch(value);
  // };

  const handleResetFilters = () => { };

  const { isLoading, isError, error, data, isSuccess } = usePendingSwapsList(wallet.address);

  useEffect(() => {
    if (data?.data && isSuccess) {

      if (data.data.data.length > 0) {
        setSwapHistoryData(data.data.data as SUI_OpenSwap[]);
      }
    }

    if (error && isError) {
        setSwapHistoryData([]);
      toast.custom(
        (id) => (
          <ToastLookCard
            variant="error"
            title="Request failed!"
            description={error.message}
            onClose={() => toast.dismiss(id)}
          />
        ),
        {
          duration: 3000,
          className: 'w-full !bg-transparent',
          position: "bottom-left",
        }
      );
    }

  }, [isError, error, data, isSuccess]);

  const nftsImageMapper = (nfts: SUI_SwapToken[]) => {
    return (
      nfts.map((nft, index) => {
        if (index < 3)
          return (
            <div className="relative w-8 h-8" key={nft.id}>
              <img
                className="w-full h-full object-cover rounded-xs border-[1.5px] border-white/20"
                src={nft.image_url}
                alt="nft"
                onError={getDefaultNftImageOnError}
              />

              {
                (index === 2) &&
                  nfts.length > 3 ?
                  <div className="absolute w-full h-full rounded-xs bg-black/50 top-0 flex justify-center items-center font-semibold" >
                    +{nfts.length - 3}
                  </div> : ''
              }
            </div>
          );
      })
    );
  };

  return (
    <div className="space-y-4">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
          <TableHead className="font-semibold min-w-[288px]">Assets</TableHead>
            <TableHead className="font-semibold min-w-[150px] pl-8" >Unique trade ID</TableHead>
            <TableHead className="font-semibold px-4" >Counterparty wallet address</TableHead>
            <TableHead className="font-semibold px-4" >Swap mode</TableHead>
            <TableHead className="font-semibold px-4" >Trading chain</TableHead>
            <TableHead className="font-semibold px-4" >Offer review date</TableHead>
            <TableHead className="font-semibold px-4" >Status</TableHead>
            <TableHead className="w-[130px] pr-2" >

            <div className="flex items-center gap-2" >
                        <Drawer direction="right" open={isOpen} onClose={() => setIsOpen(false)} >

                          <DrawerTrigger onClick={() => setIsOpen(true)} >
                            <FilterButton />
                          </DrawerTrigger>

                          <DrawerContent className="p-3 h-screen w-1/3 right-0 bg-transparent" >
                            <div className="rounded-sm h-full w-full bg-su_secondary_bg flex flex-col gap-4 p-4" >
                              <DrawerTitle className="text-su_primary" >
                                <div className="flex justify-between items-start">
                                  <h2 className="font-semibold text-xl pt-2" >Filter options</h2>
                                  <DrawerClose
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-xs hover:bg-su_active_bg" >
                                    <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                  </DrawerClose>
                                </div>

                                <p className="text-su_secondary text-base font-medium" >Refine your search with custom filters:</p>
                              </DrawerTitle>

                              <div className="space-y-3" >


                                <div className="flex items-center space-x-2">
                                  <Switch id="airplane-mode" />
                                  <Label htmlFor="airplane-mode">Show offers from only current chain</Label>
                                </div>


                                <div className="h-full space-y-2">
                                  <div className="flex justify-between items-center text-sm" >
                                    <p>Status</p>
                                    <button onClick={handleResetFilters} type="reset" className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg" >
                                      <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                                      </svg>

                                      Reset
                                    </button>

                                  </div>

                                  <div className="flex justify-between items-center text-sm" >
                                    <ToggleGroup type="single">
                                      <ToggleGroupItem value="all" aria-label="Toggle bold">All</ToggleGroupItem>
                                      <ToggleGroupItem value="completed" aria-label="Toggle bold" >Completed</ToggleGroupItem>
                                      <ToggleGroupItem value="declined" aria-label="Toggle bold">Declined</ToggleGroupItem>
                                      <ToggleGroupItem value="cancelled" aria-label="Toggle bold">Cancelled</ToggleGroupItem>
                                    </ToggleGroup>
                                  </div>


                                  <div className="flex justify-between items-center text-sm" >
                                    <p>Swap mode</p>
                                    <button onClick={handleResetFilters} type="reset" className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg" >
                                      <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                                      </svg>

                                      Reset
                                    </button>
                                  </div>
                                  <div className="flex justify-between items-center text-sm" >
                                    <ToggleGroup type="single">
                                      <ToggleGroupItem value="all" aria-label="Toggle bold">All</ToggleGroupItem>
                                      <ToggleGroupItem value="openmarket" aria-label="Toggle bold" >Open Market</ToggleGroupItem>
                                      <ToggleGroupItem value="privateparty" aria-label="Toggle bold">Private Party</ToggleGroupItem>
                                    </ToggleGroup>
                                  </div>

                                </div>
                                <div className="w-full grid grid-cols-2 gap-4" >
                                  <CustomOutlineButton onClick={handleResetFilters} >
                                    Clear filters
                                  </CustomOutlineButton>

                                  <Button variant={"default"} type="submit" >Apply filters</Button>

                                </div>
                              </div>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>

            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y">
          {
            swapHistory?.map((swap) => {
              const currentChain = chainsDataset.find(chain => chain.uuid === swap.trading_chain) || chainsDataset[1];
              return (
                <TableRow key={swap.trade_id}>
                  <TableCell className="font-medium flex items-center gap-2">   
                        <div className="flex items-center gap-1" >
                          <div >
                            {nftsImageMapper(swap.metadata.init.tokens)}
                          </div>
                          <svg className="w-4" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.72844 0L12 4.15863H0.238525V3.0368H9.21836L6.91377 0.793135L7.72844 0ZM11.7615 5.84137V6.9632H2.78164L5.08623 9.20687L4.27156 10L0 5.84137H11.7615Z" fill="#868691" />
                          </svg>
                          <div className="flex items-center gap-1" >
                            {nftsImageMapper(swap.metadata.accept.tokens)}
                          </div>
                        </div>     
                  </TableCell>
                  <TableCell className="font-medium pl-8">
                    <div className="w-auto flex justify-start" >  #
                      {getLastCharacters(swap.trade_id, 7)}</div>
                  </TableCell>
                  <TableCell className="font-medium px-4">
                    {
                      swap.init_address === wallet.address ?
                        <div className="w-auto flex justify-start" >{getShortenWalletAddress(swap.accept_address)}</div>
                        :
                        <div className="w-auto flex justify-start" >{getShortenWalletAddress(swap.init_address)}</div>
                    }
                  </TableCell>
                  <TableCell className="font-medium px-4">
                    <div className="w-auto flex justify-start" >{
                      swap.swap_mode === 0 ?
                        <span className="flex items-center justify-center gap-2 py-2 px-3  rounded-full bg-su_enable_bg capitalize" >
                          Open market
                        </span>
                        :
                        <span className="flex items-center justify-center gap-2 p-2 rounded-full bg-su_enable_bg capitalize" >
                          Private party
                        </span>
                    }</div>
                  </TableCell>
                 
                  <TableCell className="font-medium px-4 flex justify-start">
                    <span className="w-auto flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-su_enable_bg capitalize" >
                      <img
                        className='w-4 h-4'
                        src={currentChain.iconUrl}
                        alt=""
                      />

                      {currentChain.name}
                    </span>
                  </TableCell>
                  {/* <TableCell className="font-medium px-4">{moment.utc(swap.updated_at).format('MMM DD, YYYY')}</TableCell> */}
                  <TableCell className="font-medium px-4">{moment.utc(swap.updated_at).format('MMM DD YYYY HH:mm:ss')}</TableCell>
                  <TableCell className="font-medium px-4 capitalize">
                    <div className="w-auto flex justify-start" >{
                      swap.status === 2 ?
                        <div>
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="2" fill="#75FFC1"/>
                            </svg>Completed 
                        </div>
                        :
                        swap.status === 3 ?
                        <div>
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="2" fill="#FF7585"/>
                            </svg>Declined
                        </div>
                        :
                        swap.status === 4 ?
                        <div>
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="2" r="2" fill="#FF7585"/>
                            </svg>Cancelled 
                        </div>
                        :
                        <div>
                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#FF7585"/>
                        </svg>Unknown
                        </div>
                    }</div>
                  </TableCell>

                  <TableCell className="font-medium flex pr-8 justify-end">
                          <svg
                            onClick={() =>
                              toast.info("Options", {
                                duration: 2000,
                                description: "History View Feature is under construction!",
                                action: {
                                  label: "Close",
                                  onClick: () => console.log("Close"),
                                },
                                className: '!bg-gradient-primary border-none',
                                descriptionClassName: '!text-white',
                              })
                            }
                            className="w-12 h-6 cursor-pointer" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 8.3C9.42135 8.3 8.86639 8.53178 8.45722 8.94436C8.04805 9.35695 7.81818 9.91652 7.81818 10.5C7.81818 11.0835 8.04805 11.6431 8.45722 12.0556C8.86639 12.4682 9.42135 12.7 10 12.7C10.5787 12.7 11.1336 12.4682 11.5428 12.0556C11.9519 11.6431 12.1818 11.0835 12.1818 10.5C12.1818 9.91652 11.9519 9.35695 11.5428 8.94436C11.1336 8.53178 10.5787 8.3 10 8.3ZM10 14.1667C9.03558 14.1667 8.11065 13.7804 7.4287 13.0927C6.74675 12.4051 6.36364 11.4725 6.36364 10.5C6.36364 9.52754 6.74675 8.59491 7.4287 7.90728C8.11065 7.21964 9.03558 6.83333 10 6.83333C10.9644 6.83333 11.8893 7.21964 12.5713 7.90728C13.2532 8.59491 13.6364 9.52754 13.6364 10.5C13.6364 11.4725 13.2532 12.4051 12.5713 13.0927C11.8893 13.7804 10.9644 14.1667 10 14.1667ZM10 5C6.36364 5 3.25818 7.28067 2 10.5C3.25818 13.7193 6.36364 16 10 16C13.6364 16 16.7418 13.7193 18 10.5C16.7418 7.28067 13.6364 5 10 5Z" fill="#B6B6BD" />
                          </svg>
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>

      <LoadingDataset
        isLoading={isLoading}
        title="Loading swaps history"
        description='swaps history data is being loaded...'
      />

      {
        (!isLoading && ((swapHistory || []).length === 0)) &&
        <EmptyDataset
          title="No Pending Swaps Offers Yet"
          description="Your pending swap inbox is empty create your own swap!"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="gradient-button px-5 py-3 gap-4">
              Create Swap

              <svg className={`w-4 rotate-180`} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L6 2L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="dark:bg-su_least_bg rounded-md min-w-full px-6 py-4 mt-1 flex flex-col gap-2 z-50">

              <div
                className="relative text-sm flex items-center gap-4 cursor-pointer hover:bg-su_enable_bg py-2 px-4 rounded-md"
                onClick={() => {
                  wallet.isConnected ? navigate(`/swap-up/swap-market/open-swap/create/${generateRandomTradeId()}`) : handleShowWalletConnectionToast();
                }}
              >
                <svg className="w-5" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C8.61884 0 9.21233 0.25431 9.64992 0.706984C10.0875 1.15966 10.3333 1.77362 10.3333 2.41379C10.3333 3.05397 10.0875 3.66793 9.64992 4.1206C9.21233 4.57328 8.61884 4.82759 8 4.82759C7.38116 4.82759 6.78767 4.57328 6.35008 4.1206C5.9125 3.66793 5.66667 3.05397 5.66667 2.41379C5.66667 1.77362 5.9125 1.15966 6.35008 0.706984C6.78767 0.25431 7.38116 0 8 0ZM3.33333 1.72414C3.70667 1.72414 4.05333 1.82759 4.35333 2.01379C4.25333 3 4.53333 3.97931 5.10667 4.74483C4.77333 5.4069 4.10667 5.86207 3.33333 5.86207C2.8029 5.86207 2.29419 5.64409 1.91912 5.25608C1.54405 4.86808 1.33333 4.34183 1.33333 3.7931C1.33333 3.24438 1.54405 2.71813 1.91912 2.33012C2.29419 1.94212 2.8029 1.72414 3.33333 1.72414ZM12.6667 1.72414C13.1971 1.72414 13.7058 1.94212 14.0809 2.33012C14.456 2.71813 14.6667 3.24438 14.6667 3.7931C14.6667 4.34183 14.456 4.86808 14.0809 5.25608C13.7058 5.64409 13.1971 5.86207 12.6667 5.86207C11.8933 5.86207 11.2267 5.4069 10.8933 4.74483C11.4743 3.96843 11.7441 2.99046 11.6467 2.01379C11.9467 1.82759 12.2933 1.72414 12.6667 1.72414ZM3.66667 8.7931C3.66667 7.36552 5.60667 6.2069 8 6.2069C10.3933 6.2069 12.3333 7.36552 12.3333 8.7931V10H3.66667V8.7931ZM0 10V8.96552C0 8.0069 1.26 7.2 2.96667 6.96552C2.57333 7.43448 2.33333 8.08276 2.33333 8.7931V10H0ZM16 10H13.6667V8.7931C13.6667 8.08276 13.4267 7.43448 13.0333 6.96552C14.74 7.2 16 8.0069 16 8.96552V10Z" fill="#B6B6BD" />
                </svg>
                Open Market
              </div>

              <div className="group relative" >
                <CreatePrivateSwapDialog>
                  <div className="relative text-sm flex items-center gap-4 cursor-pointer group-hover:bg-su_enable_bg py-2 px-4 rounded-md">
                    <svg className="w-5" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5.05556L5.45455 2.52778L8 0L10.5455 2.52778L8 5.05556ZM0 13V10.1111C0 9.70185 0.142545 9.3588 0.427636 9.08194C0.712727 8.80509 1.05503 8.66667 1.45455 8.66667H3.83636C4.07879 8.66667 4.30909 8.72685 4.52727 8.84722C4.74545 8.96759 4.92121 9.13009 5.05454 9.33472C5.40606 9.80417 5.83951 10.1713 6.35491 10.4361C6.8703 10.7009 7.41867 10.8333 8 10.8333C8.59394 10.8333 9.14861 10.7009 9.664 10.4361C10.1794 10.1713 10.6065 9.80417 10.9455 9.33472C11.103 9.13009 11.288 8.96759 11.5004 8.84722C11.7127 8.72685 11.9338 8.66667 12.1636 8.66667H14.5455C14.9576 8.66667 15.303 8.80509 15.5818 9.08194C15.8606 9.3588 16 9.70185 16 10.1111V13H10.9091V11.3569C10.4848 11.6579 10.0272 11.8866 9.536 12.0431C9.04485 12.1995 8.53285 12.2778 8 12.2778C7.47879 12.2778 6.9697 12.1966 6.47273 12.0344C5.97576 11.8721 5.51515 11.6403 5.09091 11.3389V13H0ZM2.18182 7.94444C1.57576 7.94444 1.06061 7.7338 0.636364 7.3125C0.212121 6.8912 0 6.37963 0 5.77778C0 5.16389 0.212121 4.64943 0.636364 4.23439C1.06061 3.81935 1.57576 3.61159 2.18182 3.61111C2.8 3.61111 3.3183 3.81887 3.73673 4.23439C4.15515 4.64991 4.36412 5.16437 4.36364 5.77778C4.36364 6.37963 4.15467 6.8912 3.73673 7.3125C3.31879 7.7338 2.80048 7.94444 2.18182 7.94444ZM13.8182 7.94444C13.2121 7.94444 12.697 7.7338 12.2727 7.3125C11.8485 6.8912 11.6364 6.37963 11.6364 5.77778C11.6364 5.16389 11.8485 4.64943 12.2727 4.23439C12.697 3.81935 13.2121 3.61159 13.8182 3.61111C14.4364 3.61111 14.9547 3.81887 15.3731 4.23439C15.7915 4.64991 16.0005 5.16437 16 5.77778C16 6.37963 15.791 6.8912 15.3731 7.3125C14.9552 7.7338 14.4368 7.94444 13.8182 7.94444Z" fill="#B6B6BD" />
                    </svg>
                    Private Party
                  </div>
                </CreatePrivateSwapDialog>

                <span
                  className={`${wallet.isConnected ? "hidden" : "absolute"} cursor-pointer top-0 left-0 w-full h-full bg-transparent rounded-full`}
                  onClick={handleShowWalletConnectionToast}
                ></span>

              </div>

            </DropdownMenuContent>
          </DropdownMenu>
          <span
            className={`${wallet.isConnected ? "hidden" : "absolute"} cursor-pointer top-0 left-0 w-full h-full bg-transparent rounded-full`}
            onClick={handleShowWalletConnectionToast}
          ></span>

        </EmptyDataset>
      }


    </div >
  );
};

export default SwapHistoryTabContent;