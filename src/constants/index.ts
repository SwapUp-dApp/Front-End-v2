import { SUI_NavItem, SUI_RarityRankItem } from "@/types/global.types";

export const navItemsData: SUI_NavItem[] = [
  {
    key: "swap-market",
    title: "Swap Market",
    path: "/swap-up/swap-market",
    protected: false,
  },
  {
    key: "my-swaps",
    title: "My Swaps",
    path: "/swap-up/my-swaps",
    protected: true,
  },
  {
    key: "Profile",
    title: "Profile",
    path: "/swap-up/profile",
    protected: true,
  }
];

export const availableRarityRanking: SUI_RarityRankItem[] = [
  { from: 1, to: 100 },
  { from: 101, to: 500 },
  { from: 501, to: 1000 },
  { from: 1001, to: 2500 },
  { from: 2501, to: 5000 },
  { from: 5001, to: 10000 },
];

export const testWalletAddress: string = "0xe6a28D675f38856ad383557C76dfdA2238961A49";

export const defaultNftImageFallbackURL = "/assets/nfts/default.svg";