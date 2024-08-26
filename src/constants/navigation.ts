import { SUI_NavItem, SUI_RarityRankItem } from "@/types/global.types";
import { defaults } from "./defaults";

export const navItemsData: SUI_NavItem[] = [
  {
    key: "swap-market",
    title: "Swap Market",
    basePath: `${defaults.swapMarket.baseRoute}`,
    path: `${defaults.swapMarket.baseRoute}/${defaults.swapMarket.defaultActiveTab}`,
    protected: false,
  },
  {
    key: "my-swaps",
    title: "My Swaps",
    basePath: `${defaults.mySwaps.baseRoute}`,
    path: `${defaults.mySwaps.baseRoute}/${defaults.mySwaps.defaultActiveTab}`,
    protected: true,
  },
  {
    key: "Profile",
    title: "Profile",
    basePath: `${defaults.profile.baseRoute}`,
    path: `${defaults.profile.baseRoute}/${defaults.profile.defaultActiveTab}`,
    protected: true,
  }
];

export const landingPageNavData: SUI_NavItem[] = [
  {
    key: "audiences",
    title: "Audiences",
    basePath: '/',
    path: "/",
    protected: false,
  },
  {
    key: "teck-stack",
    title: "Teck Stack",
    basePath: '/',
    path: "/",
    protected: true,
  },
  {
    key: "roadmap",
    title: "Roadmap",
    basePath: '/',
    path: "/",
    protected: true,
  },
  {
    key: "services",
    title: "Services",
    basePath: '/',
    path: "/services",
    protected: true,
  },
];