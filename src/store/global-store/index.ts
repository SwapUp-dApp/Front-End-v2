import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";
import { create } from "zustand";
import { setAvailableCollectionsHelper, setAvailableCurrenciesHelper, setOpenShareRecentSwapDialogHelper, setRecentAcceptedSwapHelper } from "./global-store-helpers";
import { SUI_OpenSwap, SUI_Swap } from "@/types/swap-market.types";


const initialState: IGlobalStore = {
  availableCurrencies: [],
  filteredAvailableCurrencies: [],
  availableCollections: [],
  openShareRecentSwapDialog: false,
  setAvailableCurrencies: () => { },
  setAvailableCollections: () => { },
  setRecentAcceptedSwap: () => { },
  setOpenShareRecentSwapDialog: () => { }
};

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialState,
  setAvailableCurrencies: (currenciesData: SUI_CurrencyChainItem[]) => set(state => setAvailableCurrenciesHelper(state, currenciesData)),
  setAvailableCollections: (collectionsData: SUI_CollectionItem[]) => set(state => setAvailableCollectionsHelper(state, collectionsData)),
  setRecentAcceptedSwap: (swap: SUI_OpenSwap | SUI_Swap) => set(state => setRecentAcceptedSwapHelper(state, swap)),
  setOpenShareRecentSwapDialog: (isOpen: boolean) => set(state => setOpenShareRecentSwapDialogHelper(state, isOpen))
}));
