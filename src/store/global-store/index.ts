import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CurrencyChainItem } from "@/types/global.types";
import { create } from "zustand";
import { setAvailableCurrenciesHelper } from "./global-store-helpers";


const initialState: IGlobalStore = {
  availableCurrencies: [],
  setAvailableCurrencies: () => { }
};

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialState,
  setAvailableCurrencies: (currenciesData: SUI_CurrencyChainItem[]) => set(state => setAvailableCurrenciesHelper(state, currenciesData))
}));
