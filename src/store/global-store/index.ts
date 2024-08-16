import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";
import { create } from "zustand";
import { setAvailableCollectionsHelper, setAvailableCurrenciesHelper, setOpenShareRecentSwapDialogHelper, setRecentAcceptedSwapHelper } from "./global-store-helpers";
import { SUI_OpenSwap, SUI_Swap } from "@/types/swap-market.types";


const initialState: IGlobalStore = {
  availableCurrencies: [],
  filteredAvailableCurrencies: [],
  availableCollections: [],
  recentAcceptedSwap: {
    "id": "99",
    "metadata": {
      "init": {
        "tokens": [
          {
            "id": "4",
            "address": "0xc96939c0e48b3d1a4061263fc57cce7e2d071feb",
            "type": "ERC721",
            "image_url": "https://nft-cdn.alchemy.com/base-sepolia/6c4e7f323c20aad4ffc6d78663e492d4"
          }
        ]
      },
      "accept": {
        "tokens": [
          {
            "id": "5",
            "address": "0xc96939c0e48b3d1a4061263fc57cce7e2d071feb",
            "type": "ERC721",
            "image_url": "https://nft-cdn.alchemy.com/base-sepolia/c3073c93604442d9bf1a02f3baac4b61"
          }
        ]
      }
    },
    "accept_address": "0xaE6638C082C14dE30c6906a8D9cE79Cf841a0B6B",
    "init_address": "0xe6a28D675f38856ad383557C76dfdA2238961A49",
    "accept_sign": "sign",
    "init_sign": "sign",
    "status": 2,
    "tx": "0x1fdbc7c72d2dd7372557358519d751240923ac4fb20071fefeb9e10cfaa16a95",
    "notes": "",
    "trade_id": "51ecd5c4-afba-47f3-9110-109f1dbddfdd",
    "trading_chain": "84532",
    "swap_mode": 1,
    "offer_type": 0,
    "created_at": "2024-08-08T11:40:53.060Z",
    "updated_at": "2024-08-08T11:42:09.244Z"
  },
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
