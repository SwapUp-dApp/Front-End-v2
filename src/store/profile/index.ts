import { create } from 'zustand';
import { IProfileAssetsFilters, IProfileStore, SUT_SubdomainTabType, SUT_VisibilityToggleType } from "@/types/profile-store.types";
import { getInitialProfile, resetAllFiltersHelper, resetSubnameMintingProcess, setActiveTabHelper, setAvailableSubnamesHelper, setCollectionOwnedHelper, setDistributionOfTokensPerChainHelper, setFilteredNftsByFiltersHelper, setNavigateCreateSubdomainStepHelper, setNftsDatasetHelper, setProfileAvatarHelper, setProfileCoverImageHelper, setProfileDetailsHelper, setProfileWalletHelper, setSubnameValueHelper, setTransactionHashHelper, setWalletTokenBreakdownDataHelper, toggleGridViewHelper, toggleVisibilityHelper } from './profile-helpers';
import { IProfileDetails, IWallet, SUI_CollectionOwnedItem, SUI_SubnameItem, SUI_TokenBreakdownChartItem, SUI_TokenDistributionPerChainChartItem } from '@/types/profile.types';
import { SUT_GridViewType } from '@/types/swap-market-store.types';
import { SUI_NFTItem } from '@/types/global.types';
import { Environment } from '@/config';

const initialState: IProfileStore = {
  profile: getInitialProfile("sender"),
  setProfileWallet: () => { },
  setProfileAvatar: () => { },
  setProfileDetails: () => { },
  setProfileCoverImage: () => { },
  assetTab: {
    activeGridView: 'detailed',
    visibility: "all",
    collections: [],
    filtersApplied: false,
    searchApplied: false,
    filters: {},
    toggleVisibility: () => { },
    toggleGridView: () => { },
    setNftsDataset: () => { },
    setNftsBySearch: () => { },
    setNftsByFilters: () => { },
    resetAllFilters: () => { },
  },
  overviewTab: {
    totalWalletValue: 0,
    totalNftsOwned: 0,
    subdomainSection: {
      createNewSubdomain: {
        steps: ['advantages', 'enter-name', 'confirmation', 'transaction'],
        name: Environment.NAMESPACE_LISTED_ENS_NAME,
        action: "Create subdomain",
        transactionHash: '',
        subname: "",
        navigateCreateSubdomainStep: () => { },
        setSubnameValue: () => { },
        resetSwapCreation: () => { },
        setTransactionHash: () => { }
      },
      availableSubnames: [],
      filteredAvailableSubnames: [],
      records: {},
      activeTab: 'subnames',
      subdomainSectionTabs: ['subnames', 'records'],
      setActiveTab: () => { },
      setAvailableSubnames: () => { }
    },
    walletTokenBreakdownData: [],
    distributionOfTokensPerChain: [],
    collectionsOwned: [],
    setWalletTokenBreakdownData: () => { },
    setDistributionOfTokensPerChain: () => { },
    setCollectionOwned: () => { }
  }
};

export const useProfileStore = create<IProfileStore>((set, get) => ({
  ...initialState,
  setProfileWallet: async (connectedWallet: IWallet) => {
    const state = get();
    const newState = await setProfileWalletHelper(state, connectedWallet);
    set(newState);
  },
  setProfileAvatar: (avatar: string) => set(state => setProfileAvatarHelper(state, avatar)),
  setProfileDetails: (details: IProfileDetails) => set((state) => setProfileDetailsHelper(state, details)),
  setProfileCoverImage: (coverImage: string) => set((state) => setProfileCoverImageHelper(state, coverImage)),
  assetTab: {
    ...initialState.assetTab,
    toggleVisibility: (value: SUT_VisibilityToggleType) => set(state => toggleVisibilityHelper(state, value)),
    toggleGridView: (value: SUT_GridViewType) => set(state => toggleGridViewHelper(state, value)),
    setNftsDataset: async (selectedNfts: SUI_NFTItem[]) => {
      const state = get();
      const newState = await setNftsDatasetHelper(state, selectedNfts);
      set(newState);
    },
    resetAllFilters: () => set(state => resetAllFiltersHelper(state)),
    setNftsByFilters: (filters: IProfileAssetsFilters) => set(state => setFilteredNftsByFiltersHelper(state, filters)),
  },
  overviewTab: {
    ...initialState.overviewTab,
    subdomainSection: {
      ...initialState.overviewTab.subdomainSection,
      createNewSubdomain: {
        ...initialState.overviewTab.subdomainSection.createNewSubdomain,
        navigateCreateSubdomainStep: (navigationMode: "PREVIOUS" | "NEXT") => set((state) => setNavigateCreateSubdomainStepHelper(state, navigationMode)),
        setSubnameValue: (enteredValue: string) => set(state => setSubnameValueHelper(state, enteredValue)),
        resetSwapCreation: () => set(state => resetSubnameMintingProcess(state)),
        setTransactionHash: (hash: string) => set(state => setTransactionHashHelper(state, hash))
      },
      setActiveTab: (switchTo: SUT_SubdomainTabType) => set(state => setActiveTabHelper(state, switchTo)),
      setAvailableSubnames: (subnamesData: SUI_SubnameItem[]) => set(state => setAvailableSubnamesHelper(state, subnamesData))
    },
    setWalletTokenBreakdownData: (tokensData: SUI_TokenBreakdownChartItem[], totalUsdAmount: number) => set(state => setWalletTokenBreakdownDataHelper(state, tokensData, totalUsdAmount)),
    setDistributionOfTokensPerChain: (tokensData: SUI_TokenDistributionPerChainChartItem[]) => set(state => setDistributionOfTokensPerChainHelper(state, tokensData)),
    setCollectionOwned: (collectionsData: SUI_CollectionOwnedItem[]) => set(state => setCollectionOwnedHelper(state, collectionsData))
  }
}));
