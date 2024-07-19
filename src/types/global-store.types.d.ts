import { SUI_CollectionItem, SUI_CurrencyChainItem } from "./global.types";

export interface IGlobalStore {
  availableCurrencies: SUI_CurrencyChainItem[];
  availableCollections: SUI_CollectionItem[];
  setAvailableCurrencies: (currenciesData: SUI_CurrencyChainItem[]) => void;
  setAvailableCollections: (collectionsData: SUI_CollectionItem[]) => void;
}