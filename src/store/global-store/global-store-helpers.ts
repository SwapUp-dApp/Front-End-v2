import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";
import { SUI_OpenSwap, SUI_Swap } from "@/types/swap-market.types";


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

export const setRecentAcceptedSwapHelper = (state: IGlobalStore, swap: SUI_OpenSwap | SUI_Swap): IGlobalStore => {
  return {
    ...state,
    recentAcceptedSwap: swap
  };
};

export const setOpenShareRecentSwapDialogHelper = (state: IGlobalStore, isOpen: boolean): IGlobalStore => {
  return {
    ...state,
    openShareRecentSwapDialog: isOpen
  };
};