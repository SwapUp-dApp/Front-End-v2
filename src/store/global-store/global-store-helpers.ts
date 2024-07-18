import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CurrencyChainItem } from "@/types/global.types";


export const setAvailableCurrenciesHelper = (state: IGlobalStore, currenciesData: SUI_CurrencyChainItem[]): IGlobalStore => {

  return {
    ...state,
    availableCurrencies: currenciesData.length > 0 ? currenciesData : []
  };
};