import { SUI_NFTItem } from "./global.types";
import { IWallet, IProfile, IProfileDetails } from "./profile.types";
import { SUT_GridViewType } from "./swap-market-store.types";

export type SUT_VisibilityToggleType = "all" | "hidden";
export type SUT_CreatingNewSubdomainProcessStepType = "enter-name" | "confirmation" | "sending-data";

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

export interface ICreateNewSubdomain {
  steps: SUT_CreatingNewSubdomainProcessStepType[];
  currentStep?: SUT_CreatingNewSubdomainProcessStepType;
  name: string;
  action: string;
  subname: string;
  navigateCreateSubdomainStep: (navigationMode: "PREVIOUS" | "NEXT") => void;
}

export interface ISubdomain {
  createNewSubdomain: ICreateNewSubdomain;
}

export interface IProfileOverviewTab {
  subdomain: ISubdomain;
}

export interface IProfileStore {
  profile: IProfile;
  assetTab: IProfileAssetTab;
  overviewTab: IProfileOverviewTab;
  setProfileWallet: (connectedWallet: IWallet) => void;
  setProfileAvatar: (avatar: string) => void;
  setProfileCoverImage: (coverImage: string) => void;
  setProfileDetails: (details: IProfileDetails) => void;
}

