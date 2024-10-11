import { paymentChain } from "@/lib/thirdWebClient";
import { SUI_NavigationObject, SUI_TabItem } from "@/types/global.types";
import { SUT_AvailablePointSystemKeysType, SUT_AvailablePointSystemPointsType, SUT_PointSystemType, SUT_ProfileTagsVariantType } from "@/types/profile.types";
import { darkTheme, PayUIOptions, Theme } from "thirdweb/react";

interface IDefaultVariables {
  swapMarket: SUI_NavigationObject;
  mySwaps: SUI_NavigationObject;
  profile: SUI_NavigationObject;
  fallback: {
    nftImageUrl: string;
    profileCover: string;
    route: string;
  };
  userSettings: {
    newUser: {
      tags: SUT_ProfileTagsVariantType[];
      points: SUT_PointSystemType;
    };
  };
  pointSystem: SUT_PointSystemType;

  thirdweb: {
    getCustomPaymentOptions: (fundWalletMode?: boolean) => PayUIOptions;
    getCustomTheme: () => Theme;
  };
}

const swapMarketBaseRoute = "/swap-up/swap-market";
const mySwapsBaseRoute = "/swap-up/my-swaps";
const profileBaseRoute = "/swap-up/profile";

const defaultTagForNewUser: SUT_ProfileTagsVariantType = 'normie';
const availableUserTags: SUT_ProfileTagsVariantType[] = ['normie', 'trader', 'premium', 'community-member', 'collector'];

export const defaults: IDefaultVariables = {

  swapMarket: {
    title: 'Swap Market',
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
    title: 'My Swaps',
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
  profile: {
    title: "Profile",
    baseRoute: profileBaseRoute,
    defaultActiveTab: 'wallet-overview',
    tabs: [
      {
        key: 'wallet-overview',
        title: 'Wallet Overview',
        path: `${profileBaseRoute}/wallet-overview`
      },
      {
        key: 'assets',
        title: 'NFTs',
        path: `${profileBaseRoute}/assets`
      },
      {
        key: 'points-swappot',
        title: 'Member Benefits',
        path: `${profileBaseRoute}/points-swappot`
      },
    ]
  },
  fallback: {
    nftImageUrl: '/assets/nfts/default.svg',
    profileCover: '/assets/images/cover-fallback.png',
    route: `${swapMarketBaseRoute}`
  },
  userSettings: {
    newUser: {
      points: {
        "completed-open-trade": 0,
        "completed-private-trade": 0,
        "created-open-trade": 0,
        "created-social-post": 0,
        "minted-subname": 0,
        "total": 0
      },
      tags: ['normie']
    }
  },
  pointSystem: {
    "created-open-trade": 500,
    "completed-open-trade": 2000,
    "completed-private-trade": 2000,
    "created-social-post": 500,
    "minted-subname": 20000,
    "total": 0
  },
  thirdweb: {
    getCustomPaymentOptions: (fundWalletMode: boolean = true) => {

      const paymentOptionsObj: PayUIOptions = {
        prefillBuy: {
          chain: paymentChain,
          allowEdits: {
            amount: false,
            chain: false,
            token: true
          }
        },

        buyWithCrypto: {
          testMode: paymentChain.testnet,
          prefillSource: {
            chain: paymentChain,
            allowEdits: {
              chain: paymentChain.testnet || false,
              token: true
            },
          }
        },

        buyWithFiat: {
          testMode: paymentChain.testnet,
        },

        metadata: {
          name: `Buy ${fundWalletMode ? "Crypto" : "Subname"}`,
          image: "/swapup.png"
        },
      };
      return (fundWalletMode ? paymentOptionsObj : { prefillBuy: undefined, ...paymentOptionsObj } as PayUIOptions);
    },
    getCustomTheme: () => {
      return darkTheme({
        fontFamily: "Urbanist, Poppins, sans-serif",
        colors: {
          modalBg: "rgba(13, 13, 35, 1)",
          primaryButtonBg: "linear-gradient(to right, #9452FF, #51C0FF)",
          primaryButtonText: "white",
          connectedButtonBgHover: "rgba(13, 13, 35, 1)",
        }
      });

    }
  }
};