import { SUI_NFTItem } from "./global.types";
import { IWallet, IProfile, IProfileDetails, SUI_SubnameItem, SUI_SubnameRecordTextItem, SUI_SubnameRecordAddressItem } from "./profile.types";
import { SUT_GridViewType } from "./swap-market-store.types";

export type SUT_VisibilityToggleType = "all" | "hidden";
export type SUT_CreatingNewSubdomainProcessStepType = "advantages" | "enter-name" | "confirmation" | "transaction";
export type SUT_SubdomainTabType = "subnames" | "records";
export type SUT_EditSubdomainRecordsTabType = "text" | "address" | "other";

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

export interface SUI_CreateNewSubdomain {
  steps: SUT_CreatingNewSubdomainProcessStepType[];
  currentStep?: SUT_CreatingNewSubdomainProcessStepType;
  name: string;
  action: string;
  subname: string;
  navigateCreateSubdomainStep: (navigationMode: "PREVIOUS" | "NEXT") => void;
  resetSwapCreation: () => void;
  setSubnameValue: (enteredValue: string) => void;
}

export interface SUI_SubdomainStructure {
  createNewSubdomain: SUI_CreateNewSubdomain;
  availableSubnames: SUI_SubnameItem[];
  subdomainSectionTabs: SUT_SubdomainTabType[];
  activeTab: SUT_SubdomainTabType;
  records: {
    text?: SUI_SubnameRecordTextItem[];
    addresses?: SUI_SubnameRecordAddressItem[];
    contentHash?: string;
  };
  setActiveTab: (switchTo: SUT_SubdomainTabType) => void;

}

export interface SUI_ProfileOverviewTab {
  totalWalletValue: number;
  subdomainSection: SUI_SubdomainStructure;
  walletTokenBreakdownData: SUI_TokenBreakdownChartItem[];
  setWalletTokenBreakdownData: (tokensData: SUI_TokenBreakdownChartItem[], totalUsdAmount: number) => void;
}

export interface IProfileStore {
  profile: IProfile;
  assetTab: IProfileAssetTab;
  overviewTab: SUI_ProfileOverviewTab;
  setProfileWallet: (connectedWallet: IWallet) => void;
  setProfileAvatar: (avatar: string) => void;
  setProfileCoverImage: (coverImage: string) => void;
  setProfileDetails: (details: IProfileDetails) => void;
}

