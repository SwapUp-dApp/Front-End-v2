import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { SUI_ChainItem, SUI_NFTItem } from "@/types/swapup.types";
import AddCurrencyModalDialog from "./AddCurrencyModalDialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useSwapMarketStore } from "@/store/swap-market";
import { SUT_OpenMarketLayoutType } from "@/store/swap-market/swap-market-store.types";

interface IProp {
  layoutType: SUT_OpenMarketLayoutType;
  setEnableApproveButtonCriteria: React.Dispatch<React.SetStateAction<boolean>>;
}

export const amountConvertFormSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required.", })
    .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number.", })
    .refine((val) => Number(val) > 0, { message: "Amount must be greater than 0.", }),

  chain: z.string().min(1, {
    message: "Chain is required.",
  }),
});

const OpenMarketRoomFooter = ({ layoutType, setEnableApproveButtonCriteria }: IProp) => {

  const {
    setSelectedNftsForSwap,
    nftsSelectedForSwap,
    availableChains,
    setAddedAmount
  } = useSwapMarketStore((state) => layoutType === "sender" ?
    state.privateMarket.privateRoom.sender :
    state.privateMarket.privateRoom.sender
  );

  const removeSelectedNftById = (paramId: string) => {
    const filteredNfts = nftsSelectedForSwap.filter(nft => nft.tokenId !== paramId);
    setSelectedNftsForSwap([...filteredNfts]);
  };

  const removeAllSelectedNft = () => {
    setSelectedNftsForSwap([]);
    setEnableApproveButtonCriteria(false);
  };

  const nftsImageMapper = (nfts: SUI_NFTItem[], lengthToShowParam: number) => {
    const lengthToShow = lengthToShowParam - 1;
    return (
      nfts.map((nft, index) => {
        if (index < lengthToShow || (index === lengthToShow && nfts.length > lengthToShow))
          return (
            <div
              className="group relative w-8 h-8 rounded-xs lg:w-12 lg:h-12 object-cover lg:rounded-sm border-[1.5px] border-white/20"
              key={nft.tokenId}>
              <img
                className="w-full h-full object-cover rounded-xs lg:rounded-sm"
                src={nft.media[0].gateway}
                alt="nft"
              />
              {
                (index === lengthToShow) && nfts.length > lengthToShowParam ?
                  <div className="absolute w-full h-full rounded-xs lg:rounded-sm bg-black/50 top-0 left-0 flex justify-center items-center font-semibold text-xs lg:text-sm" >
                    +{nfts.length - lengthToShowParam}
                  </div> : ''
              }

              <div className="hidden group-hover:absolute group-hover:flex w-full h-full rounded-xs lg:rounded-sm bg-black/50 top-0 left-0 justify-end items-start font-semibold text-xs lg:text-sm p-1" >

                <span
                  className="rounded-full p-1 bg-white/30 relative cursor-pointer"
                  onClick={() => removeSelectedNftById(nft.tokenId)}
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

  // Form Handling
  const form = useForm<z.infer<typeof amountConvertFormSchema>>({
    resolver: zodResolver(amountConvertFormSchema),
    defaultValues: {
      amount: '',
      chain: 'razxDUgYGNAdQ'
    },
  });

  const handleFormSubmit = (values: z.infer<typeof amountConvertFormSchema>) => {
    console.log(values);
  };

  const getSelectedChain = () => {
    const selectedChainId = form.getValues("chain");
    const chain: SUI_ChainItem | undefined = availableChains.find(chain => chain.uuid === selectedChainId);

    return chain || availableChains[1];
  };

  useEffect(() => {
    const chainId = form.getValues('chain');
    const amount = form.getValues('amount');

    if (amount && chainId) {
      setAddedAmount(amount, chainId);
    }

  }, [form.getValues('chain'), form.getValues('amount')]);

  return (
    <aside className="space-y-2.5 lg:space-y-2 w-full p-4 border border-su_disabled"  >
      <div className="flex justify-between items-center text-su_secondary " >
        <h2 className="dark:text-white text-xs">You offer:</h2>

        {
          nftsSelectedForSwap.length > 0 &&
          <span
            className="flex items-center gap-1 lg:gap-2 text-2xs lg:text-xs font-semibold cursor-pointer"
            onClick={() => removeAllSelectedNft()}
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
          !(nftsSelectedForSwap.length > 0) &&
          <p className="text-xs text-su_secondary">Awaiting asset selection. You can choose up to 20 assets.</p>
        }

        {
          nftsSelectedForSwap.length > 0 &&
          <>
            {/* For Desktop */}
            <div className="hidden lg:flex items-center gap-1.5 lg:gap-2" >
              {nftsImageMapper(nftsSelectedForSwap, 6)}
            </div>

            {/* For Mobile */}
            <div className="lg:hidden flex items-center gap-1.5 lg:gap-2" >
              {nftsImageMapper(nftsSelectedForSwap, 4)}
            </div>
          </>
        }
        <div className="hidden lg:inline-block" >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">

              <div
                className={cn(
                  "relative flex items-center justify-between py-2 px-3 rounded-md bg-su_enable_bg ring-offset-su_active_bg focus-within:ring-1 focus-within:ring-su_active_bg focus-within:ring-offset-1",
                )
                } >
                <div className="flex gap-2 items-center" >
                  <svg className="w-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9294 5.71425C11.9294 8.87042 9.37083 11.429 6.21469 11.429C3.05856 11.429 0.5 8.87042 0.5 5.71425C0.5 2.55809 3.05856 -0.000488281 6.21469 -0.000488281C9.37083 -0.000488281 11.9294 2.55809 11.9294 5.71425ZM8.99618 11.9817C8.12045 12.3703 7.17301 12.5711 6.21493 12.5711C5.98634 12.5711 5.75775 12.5597 5.53259 12.5379C5.90083 13.3962 6.47376 14.1512 7.20127 14.7368C7.92877 15.3224 8.78869 15.7208 9.70581 15.8972C10.6229 16.0736 11.5693 16.0226 12.4621 15.7486C13.3549 15.4747 14.167 14.9861 14.8274 14.3256C15.4877 13.6652 15.9762 12.853 16.25 11.9601C16.5238 11.0673 16.5747 10.1209 16.3982 9.2038C16.2216 8.28671 15.8231 7.42684 15.2374 6.69942C14.6516 5.97199 13.8966 5.39917 13.0383 5.03106C13.1336 5.98439 13.0281 6.94712 12.7286 7.85719C12.4291 8.76726 11.9422 9.60448 11.2994 10.3149C10.6565 11.0252 9.87191 11.593 8.99618 11.9817Z" fill="#868691" />
                  </svg>
                  <span className="space-y-1">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="" >
                          <FormControl>
                            <Input
                              type="number"
                              className="w-[100px] text-sm ring-offset-0 focus-within:ring-0 focus-within:ring-transparent focus-within:ring-offset-0"
                              placeholder="Enter amount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="absolute -bottom-4 left-2 text-2xs" />
                        </FormItem>
                      )}
                    />
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name="chain"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value} >
                        <FormControl>
                          <SelectTrigger className="bg-transparent border-none flex items-center gap-2 w-[100px]">
                            <SelectValue
                              className="uppercase"
                              placeholder={
                                <span className="flex items-center gap-2" >
                                  <img className="w-4 h-4 rounded-full" src={'/src/assets/svgs/ethereum.svg'} alt="" />
                                  Eth
                                </span>
                              }
                            />
                          </SelectTrigger>
                        </FormControl>


                        <SelectContent
                          className="bg-su_primary_bg border-none absolute w-[240px] h-[160px] -left-[130px] -top-[210px]"
                        >
                          {
                            availableChains.map(coin => (
                              <SelectItem key={coin.uuid} className="hover:bg-su_active_bg py-3" value={coin.uuid}>
                                <span className="flex items-center gap-2"  >
                                  <img className="w-4 h-4 rounded-full" src={coin.iconUrl} alt="" />
                                  {coin.symbol}
                                </span>
                              </SelectItem>
                            ))
                          }
                        </SelectContent>

                      </Select>
                      <FormMessage className="absolute -bottom-4 right-0 text-2xs" />
                    </FormItem>
                  )}
                />
              </div>

              <button className="hidden" type="submit" >Hidden Submit pressing</button>
            </form>
          </Form>
        </div>
      </div>

      {/* Mobile add currency button */}
      <div className="lg:hidden" >
        {
          !form.formState.isValid ?

            <AddCurrencyModalDialog availableChains={availableChains} handleFormSubmit={handleFormSubmit} form={form} >
              <span className="flex items-center gap-2 font-semibold text-xs" >
                <svg className="w-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.74862 0.996582V0.246582H5.24862V0.996582V5.24834H0.99707H0.24707V6.74834H0.99707H5.24862V11.0004V11.7504H6.74862V11.0004V6.74834H11.0009H11.7509V5.24834H11.0009H6.74862V0.996582Z" fill="white" />
                </svg>


                Add Currency
              </span>
            </AddCurrencyModalDialog>
            :
            <div className="space-y-1">
              <p className="dark:text-su_secondary text-2xs" >Added amount:</p>
              <div className="flex items-center justify-between" >
                <span className="flex items-center gap-2">
                  <img
                    className="w-4"
                    src={getSelectedChain().iconUrl} alt=""
                  />

                  <span className="text-sm dark:text-su_primary font-semibold uppercase" >
                    {form.getValues('amount')} {getSelectedChain().symbol}
                  </span>
                </span>

                <AddCurrencyModalDialog availableChains={availableChains} handleFormSubmit={handleFormSubmit} form={form}>
                  <svg className="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9.63998V11.6666C0 11.8533 0.146667 12 0.333333 12H2.36C2.44667 12 2.53333 11.9666 2.59333 11.9L9.87333 4.62665L7.37333 2.12665L0.1 9.39998C0.0333334 9.46665 0 9.54665 0 9.63998ZM11.8067 1.75331L10.2467 0.193315C10.185 0.131512 10.1117 0.0824806 10.0311 0.0490263C9.95043 0.015572 9.86398 -0.00164795 9.77667 -0.00164795C9.68935 -0.00164795 9.6029 0.015572 9.52225 0.0490263C9.4416 0.0824806 9.36834 0.131512 9.30667 0.193315L8.08667 1.41331L10.5867 3.91331L11.8067 2.69332C11.8685 2.63164 11.9175 2.55838 11.951 2.47773C11.9844 2.39708 12.0016 2.31063 12.0016 2.22331C12.0016 2.136 11.9844 2.04955 11.951 1.9689C11.9175 1.88825 11.8685 1.81499 11.8067 1.75331Z" fill="#B6B6BD" />
                  </svg>
                </AddCurrencyModalDialog>

              </div>
            </div>
        }
      </div>
    </aside>
  );
};

export default OpenMarketRoomFooter;