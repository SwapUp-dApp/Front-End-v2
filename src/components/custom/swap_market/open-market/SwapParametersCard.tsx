import moment from "moment";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import ToastLookCard from "../../shared/ToastLookCard";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import CurrencySelectCombobox from "../../shared/CurrencySelectCombobox";
import { availableCollections, chainsDataset } from "@/constants/data";
import { SUFS_OpenSwapParameters } from "@/schema";
import { availableRarityRanking } from "@/constants";
import { SUI_SwapCurrencyItem, SUI_SwapPreferences, SUT_PreferredAssetType } from "@/types/swap-market.types";
import { SUI_CurrencyItem } from "@/types/swapup.types";
import { useSwapMarketStore } from "@/store/swap-market";
import { useEffect } from "react";


const currenciesDataset: SUI_CurrencyItem[] = chainsDataset.map(coin => ({ uuid: coin.uuid, name: coin.name, iconUrl: coin.iconUrl }));
const preferredAssetsData: SUT_PreferredAssetType[] = ["any", "nft", "currency"];

interface IProp {
  setIsValidParametersForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwapParametersCard = ({ setIsValidParametersForm }: IProp) => {

  const setSwapPreferences = useSwapMarketStore(state => state.openMarket.openRoom.setSwapPreferences);

  const form = useForm<z.infer<typeof SUFS_OpenSwapParameters>>({
    resolver: zodResolver(SUFS_OpenSwapParameters),
    defaultValues: {
      collection: '',
      rarityRank: '',
      preferredAsset: 'any',
      expirationDate: undefined,
      amountWantToReceive: '',
      currencies: []
    }
  });

  const handleFormValidationAndSettingState = async () => {
    const isValid = await form.trigger();
    setIsValidParametersForm(isValid);
    const { expirationDate, preferredAsset, amountWantToReceive, collection, currencies, rarityRank } = form.getValues();


    let newPreferences: SUI_SwapPreferences = {
      expiration_date: moment.utc(expirationDate).format(),
      preferred_asset: {
        type: 'any',
        parameters: {}
      }
    };

    if ((preferredAsset === "nft") && rarityRank && collection) {
      form.formState.validatingFields;
      newPreferences = {
        ...newPreferences,
        preferred_asset: {
          type: preferredAsset,
          parameters: {
            collection,
            rank: JSON.parse(rarityRank)
          }
        }
      };
    }

    if (((preferredAsset === "currency") && (currencies && currencies.length > 0) && amountWantToReceive)) {

      const mappedCurrencies: SUI_SwapCurrencyItem[] = currencies.map(currency => ({
        uuid: currency.uuid,
        name: currency.name,
        icon_url: currency.iconUrl
      }));

      newPreferences = {
        ...newPreferences,
        preferred_asset: {
          type: preferredAsset,
          parameters: {
            added_amount: amountWantToReceive,
            preferred_currency: mappedCurrencies
          }
        }
      };
    }

    setSwapPreferences(newPreferences);
  };

  useEffect(() => {
    const validateAndLog = async () => {
      await handleFormValidationAndSettingState();
    };

    validateAndLog();
  }, [
    form.watch("preferredAsset"),
    form.watch('expirationDate'),
    form.watch('collection'),
    form.watch('amountWantToReceive'),
    form.watch('currencies'),
    form.watch('rarityRank'),
  ]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-none flex flex-col gap-4 dark:bg-su_secondary_bg p-2 lg:p-6">
      <h2 className="font-semibold text-sm lg:text-xl w-2/3 lg:w-auto">
        Swap parameters
      </h2>

      <ToastLookCard
        variant="info"
        title="Escrow swap ahead"
        description="The initial proposer escrows assets in the smart contract, signaling a serious offer with limited negotiations. Changing assets later incurs extra gas fees."
        hideCloseButton
      />

      <Form {...form}>
        <form className="space-y-3">
          {/* Expiration date */}
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-su_secondary text-sm font-normal">Expiration date:</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full flex justify-between items-center text-left font-normal bg-su_enable_bg rounded-sm text-su_secondary text-sm"
                      )}
                    >
                      {field.value ?
                        <span className="text-su_primary" >{moment(field.value).format('MMM DD, YYYY hh:mm a')}</span>
                        :
                        (
                          <span>Set expiration date</span>
                        )}
                      <CalendarIcon className="w-4" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="" align="center">
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={field.value || undefined}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredAsset"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-su_secondary text-sm font-normal">Preferred asset:</FormLabel>
                <ToggleGroup
                  type="single"
                  className="w-[200px]"
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
        </form>
      </Form>
    </div>
  );
};

export default SwapParametersCard;
