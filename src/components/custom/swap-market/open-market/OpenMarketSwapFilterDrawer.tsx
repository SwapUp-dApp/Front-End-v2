import { useState } from "react";
import moment from "moment";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, generateRandomKey } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Schema_OpenMarketFiltersForm, Schema_PendingMySwapsFiltersForm } from "@/schema";

import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { SUT_PendingFiltersStatusType, SUT_FiltersSwapModeType, IPendingFilters } from "@/types/my-swaps-store.types";
import { Switch } from "@/components/ui/switch";
import CustomOutlineButton from "../../shared/CustomOutlineButton";
import { useMySwapStore } from "@/store/my-swaps";
import { useProfileStore } from "@/store/profile";
import { SUI_CurrencyItem } from "@/types/global.types";
import { SUT_PreferredAssetType } from "@/types/swap-market.types";
import Combobox from "../../shared/Combobox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableRarityRanking } from "@/constants";
import { availableCollections, chainsDataset } from "@/constants/data";
import { Input } from "@/components/ui/input";
import CurrencySelectCombobox from "../../shared/CurrencySelectCombobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface IProp {
  children: any;
}

const currenciesDataset: SUI_CurrencyItem[] = chainsDataset.map(coin => ({ uuid: coin.uuid, name: coin.name, iconUrl: coin.iconUrl }));
const preferredAssetsData: SUT_PreferredAssetType[] = ["any", "nft", "currency"];

const OpenMarketSwapFilterDrawer = ({ children, }: IProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(generateRandomKey(6));

  const walletAddress = useProfileStore(state => state.profile.wallet.address);


  const form = useForm<z.infer<typeof Schema_OpenMarketFiltersForm>>({
    resolver: zodResolver(Schema_OpenMarketFiltersForm),
    defaultValues: {

      offersFromCurrentChain: false,
    }
  });

  const onSubmit = async (data: z.infer<typeof Schema_OpenMarketFiltersForm>) => {

    const { offersFromCurrentChain } = data;

    setIsOpen(false);
  };

  const handleResetOfferedRarityRank = () => {
    form.setValue("offeredRarityRank", '');
    setFormKey(generateRandomKey(6));
  };

  const handleResetPreferredAssets = () => {
    form.setValue('preferredAsset', 'any');
    setFormKey(generateRandomKey(6));
  };

  const handleResetAll = () => {
    setFormKey(generateRandomKey(6));
  };


  return (

    <Drawer open={isOpen} direction="right" onClose={() => setIsOpen(false)}  >
      <DrawerTrigger onClick={() => setIsOpen(true)}>
        {children}
      </DrawerTrigger>

      <DrawerContent
        className="p-3 h-screen w-11/12 lg:w-1/3 right-0 bg-transparent"
      >
        <DrawerClose
          className="bg-transparent fixed top-0 left-[-10%] lg:left-[-200%] h-screen w-[25vw] lg:w-[67vw]"
          onClose={() => setIsOpen(false)}
        ></DrawerClose>

        <div className="rounded-sm h-full w-full bg-su_secondary_bg flex flex-col gap-4 p-4" >
          <DrawerTitle className="text-su_primary" >
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-xl pt-2" >Filter options</h2>
              <DrawerClose className="p-1 rounded-xs hover:bg-su_active_bg" onClick={() => setIsOpen(false)} >
                <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </DrawerClose>
            </div>

            <p className="text-su_secondary text-base font-medium" >Refine your search with custom filters:</p>
          </DrawerTitle>

          <div className="h-full">
            <Form {...form} key={formKey} >
              <form className="h-full pb-4 " onSubmit={form.handleSubmit(onSubmit)}>

                <ScrollArea className="h-3/4" >
                  <div className="space-y-4 mr-3 mt-3 mb-4 ml-1">
                    <FormField
                      control={form.control}
                      name="offersFromCurrentChain"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2" >
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={field.name}
                          />

                          <FormLabel htmlFor={field.name} className="cursor-pointer text-su_secondary text-sm font-normal flex items-center justify-between">
                            Show offers from only current chain:
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="offeredRarityRank"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-su_secondary text-sm font-normal flex items-center justify-between">
                            Offered asset rarity rank:

                            <button
                              onClick={handleResetOfferedRarityRank}
                              className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg"
                            >
                              <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                              </svg>

                              Reset
                            </button>
                          </FormLabel>

                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className=""
                            >
                              <div className="flex items-center gap-2 flex-wrap">
                                {availableRarityRanking.map(rarityRank => {
                                  const currentValue = JSON.stringify(rarityRank);
                                  return (
                                    <FormItem key={rarityRank.from} className="">
                                      <FormControl><RadioGroupItem id={currentValue} value={currentValue} className="hidden" /></FormControl>

                                      <FormLabel
                                        htmlFor={currentValue}
                                        className={cn(
                                          "flex items-center gap-2 cursor-pointer text-xs text-su_primary bg-su_enable_bg py-2 px-2.5 rounded-xs",
                                          field.value === currentValue && "border-2 border-su_active_bg bg-su_enable_bg"
                                        )}
                                      >
                                        <svg className="w-2.5" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="currentColor" />
                                        </svg>

                                        {rarityRank.from} - {rarityRank.to}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                })}
                              </div>

                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* PreferredAssets */}
                    <FormField
                      control={form.control}
                      name="preferredAsset"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-su_secondary text-sm font-normal flex items-center justify-between">
                            Preferred asset:

                            <button
                              onClick={handleResetPreferredAssets}
                              className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-su_active_bg"
                            >
                              <svg className="w-3" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12C4.46667 12 3.13067 11.4918 1.992 10.4753C0.853333 9.45889 0.200444 8.18933 0.0333333 6.66667H1.4C1.55556 7.82222 2.06956 8.77778 2.942 9.53333C3.81444 10.2889 4.83378 10.6667 6 10.6667C7.3 10.6667 8.40289 10.214 9.30867 9.30867C10.2144 8.40333 10.6671 7.30045 10.6667 6C10.6662 4.69956 10.2136 3.59689 9.30867 2.692C8.40378 1.78711 7.30089 1.33422 6 1.33333C5.23333 1.33333 4.51667 1.51111 3.85 1.86667C3.18333 2.22222 2.62222 2.71111 2.16667 3.33333H4V4.66667H0V0.666667H1.33333V2.23333C1.9 1.52222 2.59178 0.972222 3.40867 0.583333C4.22556 0.194444 5.08933 0 6 0C6.83333 0 7.614 0.158445 8.342 0.475333C9.07 0.792222 9.70333 1.21978 10.242 1.758C10.7807 2.29622 11.2084 2.92956 11.5253 3.658C11.8422 4.38645 12.0004 5.16711 12 6C11.9996 6.83289 11.8413 7.61356 11.5253 8.342C11.2093 9.07045 10.7816 9.70378 10.242 10.242C9.70244 10.7802 9.06911 11.208 8.342 11.5253C7.61489 11.8427 6.83422 12.0009 6 12Z" fill="#B6B6BD" />
                              </svg>

                              Reset
                            </button>
                          </FormLabel>
                          <ToggleGroup
                            type="single"
                            className="w-[192px]"
                            onValueChange={field.onChange} defaultValue={field.value}
                          >
                            {preferredAssetsData.map(asset => (
                              <ToggleGroupItem
                                key={asset}
                                value={asset}
                                aria-label="Toggle bold"
                                className="capitalize"
                              >
                                {asset}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Swap parameters depending on preferred assets */}
                    {
                      form.watch("preferredAsset") === "nft" &&
                      <div className="space-y-3" >
                        <FormField
                          control={form.control}
                          name="collection"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-su_secondary text-sm font-normal">Preferred collection:</FormLabel>
                              <Combobox
                                items={availableCollections}
                                onChange={field.onChange}
                                value={field.value}
                                title="collection"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="rarityRank"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-su_secondary text-sm font-normal">Preferred rarity rank:</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-su_enable_bg py-3 px-4 rounded-sm">
                                    <SelectValue placeholder={
                                      <span className="flex items-center gap-2">
                                        <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                                        </svg>
                                        Any
                                      </span>
                                    } />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableRarityRanking.map((rarityRank, index) => (
                                    <SelectItem key={index + rarityRank.from} value={JSON.stringify(rarityRank)}>
                                      <span className="flex items-center gap-2">
                                        <svg className="w-3" viewBox="0 0 16 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10.29 4L8 0L5.71 4H10.29ZM2.29 10L0 14H16L13.71 10H2.29ZM13.14 9L10.86 5H5.14L2.86 9H13.14Z" fill="#868691" />
                                        </svg>
                                        {rarityRank.from} - {rarityRank.to}
                                      </span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    }

                    {
                      form.watch("preferredAsset") === "currency" &&
                      <div className="space-y-3" >
                        <FormField
                          control={form.control}
                          name="amountWantToReceive"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-su_secondary text-sm font-normal">Amount you want to receive:</FormLabel>
                              <Input
                                className="!bg-su_enable_bg py-3.5 px-4"
                                icon={
                                  <svg className="w-2.5" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.33236 6.08366H9.99902C9.99902 3.71949 7.70319 2.64116 5.83236 2.39283V0.666992H4.16569V2.39283C2.29486 2.64116 -0.000976562 3.71949 -0.000976562 6.08366C-0.000976562 8.33866 2.22069 9.51116 4.16569 9.77533V13.917C2.95902 13.7078 1.66569 13.0637 1.66569 11.917H-0.000976562C-0.000976562 14.0745 2.01986 15.3495 4.16569 15.6137V17.3337H5.83236V15.6087C7.70319 15.3603 9.99902 14.2812 9.99902 11.917C9.99902 9.55282 7.70319 8.47449 5.83236 8.22616V4.08366C6.94069 4.28283 8.33236 4.86783 8.33236 6.08366ZM1.66569 6.08366C1.66569 4.86783 3.05736 4.28283 4.16569 4.08366V8.08283C3.02319 7.87199 1.66569 7.24783 1.66569 6.08366ZM8.33236 11.917C8.33236 13.1328 6.94069 13.7178 5.83236 13.917V9.91699C6.94069 10.1162 8.33236 10.7012 8.33236 11.917Z" fill="#868691" />
                                  </svg>
                                }
                                type="number"
                                onChange={field.onChange}
                                value={field.value}
                                placeholder="0.00"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currencies"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-su_secondary text-sm font-normal">Currencies:</FormLabel>
                              <CurrencySelectCombobox
                                currencies={currenciesDataset}
                                value={field.value || []}
                                onChange={field.onChange}
                                className="bg-su_enable_bg"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>
                    }
                  </div>

                  <ScrollBar orientation="vertical" className="bg-transparent" />
                </ScrollArea>

                <div className="h-1/4 pt-6" >
                  <span className="w-full grid grid-cols-2 gap-4 " >
                    <CustomOutlineButton onClick={handleResetAll} >
                      Clear filters
                    </CustomOutlineButton>
                    <Button variant={"default"} type="submit" >Apply filters</Button>
                  </span>
                </div>

              </form>
            </Form>

          </div>
        </div>

      </DrawerContent>

    </Drawer >

  );
};

export default OpenMarketSwapFilterDrawer;