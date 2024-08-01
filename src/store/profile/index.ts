import { create } from 'zustand';
import { IProfileAssetsFilters, IProfileStore, SUT_SubdomainTabType, SUT_VisibilityToggleType } from "@/types/profile-store.types";
import { getInitialProfile, resetAllFiltersHelper, resetOpenSwapCreationRoomHelper, setActiveTabHelper, setFilteredNftsByFiltersHelper, setNavigateCreateSubdomainStepHelper, setNftsDatasetHelper, setProfileAvatarHelper, setProfileCoverImageHelper, setProfileDetailsHelper, setProfileWalletHelper, setSubnameValueHelper, toggleGridViewHelper, toggleVisibilityHelper } from './profile-helpers';
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
    subdomainSection: {
      createNewSubdomain: {
        steps: ['advantages', 'enter-name', 'confirmation', 'transaction'],
        name: "swapup.eth",
        action: "Create subdomain",
        subname: "",
        navigateCreateSubdomainStep: () => { },
        setSubnameValue: () => { },
        resetSwapCreation: () => { }
      },
      availableSubnames: [
        {
          id: "khalil.swapup.eth",
          subname: "khalil.swapup.eth",
          expiry: "No expiry",
          isPrimary: false,
          manager: "swapup.eth",
          parent: "swapup.eth",
          ownerAddress: "0xe6a28D675f38856ad383557C76dfdA2238961A49"
        },
        {
          id: "ahmad.swapup.eth",
          subname: "ahmad.swapup.eth",
          expiry: "No expiry",
          isPrimary: true,
          manager: "swapup.eth",
          parent: "swapup.eth",
          ownerAddress: "hdjshjdhjshjdhsjhdjshdjhdjhjshdjhsjhdjshjdh"
        },
      ],
      records: {},
      activeTab: 'subnames',
      subdomainSectionTabs: ['subnames', 'records'],
      setActiveTab: () => { }
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
    subdomainSection: {
      ...initialState.overviewTab.subdomainSection,
      createNewSubdomain: {
        ...initialState.overviewTab.subdomainSection.createNewSubdomain,
        navigateCreateSubdomainStep: (navigationMode: "PREVIOUS" | "NEXT") => set((state) => setNavigateCreateSubdomainStepHelper(state, navigationMode)),
        setSubnameValue: (enteredValue: string) => set(state => setSubnameValueHelper(state, enteredValue)),
        resetSwapCreation: () => set(state => resetOpenSwapCreationRoomHelper(state))
      },
      setActiveTab: (switchTo: SUT_SubdomainTabType) => set(state => setActiveTabHelper(state, switchTo))
    }
  }
}));
