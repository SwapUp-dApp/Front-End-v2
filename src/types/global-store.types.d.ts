import { SUI_CurrencyChainItem } from "./global.types";

export interface IGlobalStore {
  availableCurrencies: SUI_CurrencyChainItem[];
  setAvailableCurrencies: (currenciesData: SUI_CurrencyChainItem[]) => void;
}