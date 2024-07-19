import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";
import { create } from "zustand";
import { setAvailableCollectionsHelper, setAvailableCurrenciesHelper } from "./global-store-helpers";


const initialState: IGlobalStore = {
  availableCurrencies: [],
  availableCollections: [],
  setAvailableCurrencies: () => { },
  setAvailableCollections: () => { }
};

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialState,
  setAvailableCurrencies: (currenciesData: SUI_CurrencyChainItem[]) => set(state => setAvailableCurrenciesHelper(state, currenciesData)),
  setAvailableCollections: (collectionsData: SUI_CollectionItem[]) => set(state => setAvailableCollectionsHelper(state, collectionsData))
}));
