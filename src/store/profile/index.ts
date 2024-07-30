import { create } from 'zustand';
import { IProfileAssetsFilters, IProfileStore, SUT_VisibilityToggleType } from "@/types/profile-store.types";
import { getInitialProfile, resetAllFiltersHelper, setFilteredNftsByFiltersHelper, setNavigateCreateSubdomainStepHelper, setNftsDatasetHelper, setProfileAvatarHelper, setProfileCoverImageHelper, setProfileDetailsHelper, setProfileWalletHelper, toggleGridViewHelper, toggleVisibilityHelper } from './profile-helpers';
import { IProfileDetails, IWallet } from '@/types/profile.types';
import { SUT_GridViewType } from '@/types/swap-market-store.types';
import { SUI_NFTItem } from '@/types/global.types';

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
    subdomain: {
      createNewSubdomain: {
        steps: ['enter-name', 'confirmation', 'sending-data'],
        name: "swapup.eth",
        action: "Create subdomain",
        subname: "",
        navigateCreateSubdomainStep: () => { },
      }
    }
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
    subdomain: {
      ...initialState.overviewTab.subdomain,
      createNewSubdomain: {
        ...initialState.overviewTab.subdomain.createNewSubdomain,
        navigateCreateSubdomainStep: (navigationMode: "PREVIOUS" | "NEXT") => set((state) => setNavigateCreateSubdomainStepHelper(state, navigationMode)),
      }
    }
  }
}));
