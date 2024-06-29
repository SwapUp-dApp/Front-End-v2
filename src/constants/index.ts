import { SUI_NavItem, SUI_RarityRankItem } from "@/types/global.types";
import { defaults } from "./defaults";

export const navItemsData: SUI_NavItem[] = [
  {
    key: "swap-market",
    title: "Swap Market",
    path: `${defaults.swapMarket.baseRoute}/${defaults.swapMarket.defaultActiveTab}`,
    protected: false,
  },
  {
    key: "my-swaps",
    title: "My Swaps",
    path: `${defaults.mySwaps.baseRoute}/${defaults.mySwaps.defaultActiveTab}`,
    protected: true,
  },
  {
    key: "Profile",
    title: "Profile",
    path: "/swap-up/profile",
    protected: true,
  }
];

export const landingPageNavData: SUI_NavItem[] = [
  {
    key: "audiences",
    title: "Audiences",
    path: "/",
    protected: false,
  },
  {
    key: "services",
    title: "Services",
    path: "/",
    protected: true,
  },
  {
    key: "teck-stack",
    title: "Teck Stack",
    path: "/",
    protected: true,
  },
  {
    key: "roadmap",
    title: "Roadmap",
    path: "/",
    protected: true,
  },
  {
    key: "utility",
    title: "Utility",
    path: "/",
    protected: true,
  },
  {
    key: "education",
    title: "Education",
    path: "/",
    protected: true,
  },
];

export const availableRarityRanking: SUI_RarityRankItem[] = [
  { from: 1, to: 100 },
  { from: 101, to: 500 },
  { from: 501, to: 1000 },
  { from: 1001, to: 2500 },
  { from: 2501, to: 5000 },
  { from: 5001, to: 10000 },
];