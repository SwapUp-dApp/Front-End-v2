import { create } from 'zustand';
import { IHistoryFilters, IMySwapsStore, IPendingFilters, SUT_MySwapsTabType } from "@/types/my-swaps-store.types";
import { resetAllFiltersHelper, resetModeFiltersHelper, resetStatusFiltersHelper, setFilteredHistorySwapByFiltersHelper, setFilteredMySwapsBySearchHelper, setFilteredPendingSwapByFiltersHelper, setMySwapsDataHelper } from './my-swaps-helpers';
import { SUI_OpenSwap } from '@/types/swap-market.types';

const initialState: IMySwapsStore = {
  pendingFilters: {
    offersFromCurrentChain: false,
    requestedDate: '',
    swapMode: 'all',
    swapOfferStatus: 'all'
  },
  historyFilters: {
    offersFromCurrentChain: false,
    requestedDate: '',
    swapMode: 'all',
    swapStatus: 'all'
  },
  setMySwapsData: () => { },
  setFilteredMySwapsBySearch: () => { },
  setFilteredPendingSwapByFilters: () => { },
  setFilteredHistorySwapByFilters: () => { },
  resetAllFilters: () => { },
  resetStatusFilters: () => { },
  resetModeFilters: () => { },
};




export const useMySwapStore = create<IMySwapsStore>((set, get): IMySwapsStore => ({
  ...initialState,
  setMySwapsData: (data: SUI_OpenSwap[], tabType: SUT_MySwapsTabType) => set(state => setMySwapsDataHelper(state, data, tabType)),
  setFilteredMySwapsBySearch: (searchValue: string, tabType: SUT_MySwapsTabType) => set(state => setFilteredMySwapsBySearchHelper(state, searchValue, tabType)),
  setFilteredPendingSwapByFilters: (filters: IPendingFilters) => set(state => setFilteredPendingSwapByFiltersHelper(state, filters)),
  setFilteredHistorySwapByFilters: (filters: IHistoryFilters) => set(state => setFilteredHistorySwapByFiltersHelper(state, filters)),
  resetAllFilters: (tabType: SUT_MySwapsTabType) => set(state => resetAllFiltersHelper(state, tabType)),
  resetModeFilters: (tabType: SUT_MySwapsTabType) => set(state => resetModeFiltersHelper(state, tabType)),
  resetStatusFilters: (tabType: SUT_MySwapsTabType) => set(state => resetStatusFiltersHelper(state, tabType)),
}));