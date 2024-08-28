import { handleTwitterSharingProcessLocalstorageState } from "@/lib/utils";
import { IGlobalStore } from "@/types/global-store.types";
import { SUI_CollectionItem, SUI_CurrencyChainItem } from "@/types/global.types";
import { SUI_OpenSwap, SUI_Swap } from "@/types/swap-market.types";


export const setAvailableCurrenciesHelper = (state: IGlobalStore, currenciesData: SUI_CurrencyChainItem[]): IGlobalStore => {

  const allFilteredCurrenciesWithoutMainnet = currenciesData.filter(currency => currency.symbol !== "ETH");

  const swapupDemoChain: SUI_CurrencyChainItem = {
    "uuid": "swapup-demo",
    "symbol": "SWP",
    "name": "Swapup Demo",
    "color": "#22a079",
    "iconUrl": "https://www.swapup.io/assets/images/swapip-logo-black.png",
    "marketCap": "115217077712",
    "price": "2",
    "listedAt": 1420600,
    "tier": 1,
    "change": "0.05",
    "rank": 3,
    "sparkline": [
      "1.0013893068803361",
      "1.000970861576145",
    ],
    "lowVolume": false,
    "coinrankingUrl": "https://coinranking.com/coin/HIVsRcGKkPFtW+tetherusd-usdt",
    "24hVolume": "56513273955",
    "btcPrice": "0.000017515470706104",
    "contractAddresses": [
      "ethereum/0x69A80fc0AEEADAb709ac0e939E94d195D98579eb",
    ]
  };

  return {
    ...state,
    availableCurrencies: currenciesData.length > 0 ? [swapupDemoChain, ...currenciesData] : [],
    filteredAvailableCurrencies: [swapupDemoChain, ...allFilteredCurrenciesWithoutMainnet]
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

export const setStartRecentSwapSharingProcessHelper = (state: IGlobalStore, isOpen: boolean): IGlobalStore => {

  if (!isOpen) {
    handleTwitterSharingProcessLocalstorageState('REMOVE');
  }

  return {
    ...state,
    startRecentSwapSharingProcess: isOpen
  };
};