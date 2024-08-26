import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";
import { create } from "zustand";
import { setAvailableCollectionsHelper, setAvailableCurrenciesHelper, setRecentAcceptedSwapHelper, setStartRecentSwapSharingProcessHelper } from "./global-store-helpers";
import { SUI_OpenSwap, SUI_Swap } from "@/types/swap-market.types";


const initialState: IGlobalStore = {
  availableCurrencies: [],
  filteredAvailableCurrencies: [],
  availableCollections: [],
  startRecentSwapSharingProcess: true,
  recentAcceptedSwap: {
    "id": '113',
    "metadata": {
      "init": {
        "tokens": [
          {
            "id": "5",
            "address": "0xc96939c0e48b3d1a4061263fc57cce7e2d071feb",
            "type": "ERC721",
            "image_url": "https://nft-cdn.alchemy.com/base-sepolia/c3073c93604442d9bf1a02f3baac4b61"
          },
          {
            "id": "4",
            "address": "0xc96939c0e48b3d1a4061263fc57cce7e2d071feb",
            "type": "ERC721",
            "image_url": "https://nft-cdn.alchemy.com/base-sepolia/6c4e7f323c20aad4ffc6d78663e492d4"
          },
          {
            "id": "0",
            "address": "0xc96939c0e48b3d1a4061263fc57cce7e2d071feb",
            "type": "ERC721",
            "image_url": "https://nft-cdn.alchemy.com/base-sepolia/373b50a6be234fb73c20599edaa813a4"
          }
        ]
      },
      "accept": {
        "tokens": [
          {
            "id": "3",
            "address": "0xc96939c0e48b3d1a4061263fc57cce7e2d071feb",
            "type": "ERC721",
            "image_url": "https://nft-cdn.alchemy.com/base-sepolia/12c5c4f731b42565073d9785b77e8f3c"
          }
        ]
      }
    },
    "accept_address": "0xe6a28D675f38856ad383557C76dfdA2238961A49",
    "init_address": "0xaE6638C082C14dE30c6906a8D9cE79Cf841a0B6B",
    "accept_sign": "sign",
    "init_sign": "sign",
    "status": 2,
    "tx": "0x9746cbdbb8783a406b9391caa0ab15d65b90ca0aa6638cfd509e6fc83327ea9a",
    "notes": "",
    "trade_id": "ffa49286-079c-4c96-8229-438beafaf36d",
    "trading_chain": "84532",
    "swap_mode": 1,
    "offer_type": 0,
  }
  ,
  setAvailableCurrencies: () => { },
  setAvailableCollections: () => { },
  setRecentAcceptedSwap: () => { },
  setStartRecentSwapSharingProcess: () => { }
};

export const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialState,
  setAvailableCurrencies: (currenciesData: SUI_CurrencyChainItem[]) => set(state => setAvailableCurrenciesHelper(state, currenciesData)),
  setAvailableCollections: (collectionsData: SUI_CollectionItem[]) => set(state => setAvailableCollectionsHelper(state, collectionsData)),
  setRecentAcceptedSwap: (swap: SUI_OpenSwap | SUI_Swap) => set(state => setRecentAcceptedSwapHelper(state, swap)),
  setStartRecentSwapSharingProcess: (isOpen: boolean) => set(state => setStartRecentSwapSharingProcessHelper(state, isOpen))
}));
