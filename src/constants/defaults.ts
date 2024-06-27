import { SUI_TabItem } from "@/types/global.types";

interface IDefaultVariables {
  swapMarket: {
    baseRoute: string,
    defaultActiveTab: string;
    tabs: SUI_TabItem[];
  };
  mySwaps: {
    baseRoute: string;
    defaultActiveTab: string;
    tabs: SUI_TabItem[];
  };
  fallback: {
    nftImageUrl: string;
    route: string;
  };
}

const swapMarketBaseRoute = "/swap-up/swap-market";
const mySwapsBaseRoute = "/swap-up/my-swaps";


export const defaults: IDefaultVariables = {

  swapMarket: {
    baseRoute: swapMarketBaseRoute,
    defaultActiveTab: 'open',
    tabs: [
      {
        key: 'open',
        title: 'Open Market',
        path: `${swapMarketBaseRoute}/open`
      },
      {
        key: 'private',
        title: 'Private Party',
        path: `${swapMarketBaseRoute}/private`
      },
    ]
  },
  mySwaps: {
    baseRoute: mySwapsBaseRoute,
    defaultActiveTab: 'pending',
    tabs: [
      {
        key: 'pending',
        title: 'Pending',
        path: `${mySwapsBaseRoute}/pending`
      },
      {
        key: 'history',
        title: 'History',
        path: `${mySwapsBaseRoute}/history`
      },
    ]
  },
  fallback: {
    nftImageUrl: '/assets/nfts/default.svg',
    route: `${swapMarketBaseRoute}`
  }
};