import { create } from 'zustand';
import { IProfileAssetsFilters, IProfileStore, SUT_VisibilityToggleType } from "@/types/profile-store.types";
import { getInitialProfile, resetAllFiltersHelper, setFilteredNftsByFiltersHelper, setNftsDatasetHelper, setProfileAvatarHelper, setProfileDetailsHelper, setProfileWalletHelper, toggleGridViewHelper, toggleVisibilityHelper } from './profile-helpers';
import { IProfileDetails, IWallet } from '@/types/profile.types';
import { SUT_GridViewType } from '@/types/swap-market-store.types';
import { SUI_NFTItem } from '@/types/global.types';

const initialState: IProfileStore = {
  profile: getInitialProfile("sender"),
  setProfileWallet: () => { },
  setProfileAvatar: () => { },
  setProfileDetails: () => { },
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
  }
};

export const useProfileStore = create<IProfileStore>((set, get) => ({
  ...initialState,
  setProfileWallet: (connectedWallet: IWallet) => set(state => setProfileWalletHelper(state, connectedWallet)),
  setProfileAvatar: (avatar: string) => set(state => setProfileAvatarHelper(state, avatar)),
  setProfileDetails: (details: IProfileDetails) => set((state) => setProfileDetailsHelper(state, details)),
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
  }
}));
