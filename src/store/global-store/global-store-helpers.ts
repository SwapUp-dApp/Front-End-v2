import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";


export const setAvailableCurrenciesHelper = (state: IGlobalStore, currenciesData: SUI_CurrencyChainItem[]): IGlobalStore => {

  return {
    ...state,
    availableCurrencies: currenciesData.length > 0 ? currenciesData : []
  };
};

export const setAvailableCollectionsHelper = (state: IGlobalStore, collectionsData: SUI_CollectionItem[]): IGlobalStore => {

  return {
    ...state,
    availableCollections: collectionsData.length > 0 ? collectionsData : []
  };
};