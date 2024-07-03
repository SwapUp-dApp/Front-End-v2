import { SUI_NFTItem } from "./global.types";
import { IWallet, IProfile } from "./profile.types";
import { SUT_GridViewType } from "./swap-market-store.types";

export type SUT_VisibilityToggleType = "all" | "hidden";
export interface IProfileAssetsFilters {
  collection?: string;
  rarityRank?: SUI_RarityRankItem;
}
export interface IProfileAssetTab {
  activeGridView: SUT_GridViewType;
  visibility: SUT_VisibilityToggleType;
  collections: string[] | [];
  nfts?: SUI_NFTItem[];
  filteredNfts?: SUI_NFTItem[];
  filters: IProfileAssetsFilters;
  filtersApplied: boolean;
  searchApplied: boolean;
  toggleVisibility: (value: SUT_VisibilityToggleType) => void;
  toggleGridView: (value: SUT_GridViewType) => void;
  setNftsDataset: (selectedNfts: SUI_NFTItem[]) => void;
  setNftsBySearch: (searchValue: string) => void;
  setNftsByFilters: (filters: IProfileAssetsFilters) => void;
  resetAllFilters: () => void;
}

export interface IProfileStore {
  profile: IProfile;
  setProfileWallet: (connectedWallet: IWallet) => void;
  assetTab: IProfileAssetTab;
}


