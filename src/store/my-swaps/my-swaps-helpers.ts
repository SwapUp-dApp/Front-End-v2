import { Environment } from "@/config";
import { SUE_SWAP_MODE, SUE_SWAP_MODE_TO_STRING, SUE_SWAP_OFFER_TYPE_TO_STRING, SUE_SWAP_STATUS } from "@/constants/enums";
import { IHistoryFilters, IMySwapsStore, IPendingFilters, SUT_MySwapsTabType } from "@/types/my-swaps-store.types";
import { SUI_OpenSwap } from "@/types/swap-market.types";
import moment from "moment";


export const setMySwapsDataHelper = (state: IMySwapsStore, data: SUI_OpenSwap[], tabType: SUT_MySwapsTabType): IMySwapsStore => {
  const pendingSwaps = data.length > 0 ? data : state.pendingSwaps;
  const historySwaps = data.length > 0 ? data : state.pendingSwaps;

  if (tabType === 'pending') {
    return ({
      ...state,
      pendingSwaps,
      filteredPendingSwaps: pendingSwaps
    });
  } else {
    return ({
      ...state,
      historySwaps,
      filteredHistorySwaps: historySwaps,
    });
  }
};

export const setFilteredMySwapsBySearchHelper = (state: IMySwapsStore, searchValue: string, tabType: SUT_MySwapsTabType, loginWalletAddress: string): IMySwapsStore => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredPendingSwaps = state.pendingSwaps?.filter(swap =>
    swap.trade_id.includes(lowerCaseSearchValue) ||
    moment.utc(swap.updated_at).format('MMM Do, YYYY').toLowerCase().includes(lowerCaseSearchValue) ||
    SUE_SWAP_MODE_TO_STRING[`value${swap.swap_mode}`].toLocaleLowerCase().includes(lowerCaseSearchValue) ||
    SUE_SWAP_OFFER_TYPE_TO_STRING[`value${swap.offer_type}`].toLocaleLowerCase().includes(lowerCaseSearchValue) ||
    swap.accept_address.toLowerCase().includes(lowerCaseSearchValue)
  );

  const filteredHistorySwaps = state.historySwaps?.filter(swap =>
    swap.trade_id.includes(lowerCaseSearchValue) ||
    moment.utc(swap.updated_at).format('MMM Do, YYYY').toLowerCase().includes(lowerCaseSearchValue) ||
    SUE_SWAP_MODE_TO_STRING[`value${swap.swap_mode}`].toLocaleLowerCase().includes(lowerCaseSearchValue) ||
    swap.accept_address.toLowerCase().includes(lowerCaseSearchValue) ||
    swap.init_address.toLowerCase().includes(lowerCaseSearchValue)
  );

  if (tabType === 'pending') {
    return ({
      ...state,
      filteredPendingSwaps: (filteredPendingSwaps || []).length > 0 ? filteredPendingSwaps : []
    });
  } else {
    return ({
      ...state,
      filteredHistorySwaps: (filteredHistorySwaps || []).length > 0 ? filteredHistorySwaps : []
    });
  }
};

export const setFilteredPendingSwapByFiltersHelper = (state: IMySwapsStore, filters: IPendingFilters, loginWalletAddress: string): IMySwapsStore => {
  const filteredItems = getPendingFilteredSwaps(state, filters, loginWalletAddress);
  return {
    ...state,
    pendingFilters: filters,
    filteredPendingSwaps: filteredItems
  };
};

export const setFilteredHistorySwapByFiltersHelper = (state: IMySwapsStore, filters: IHistoryFilters): IMySwapsStore => {
  const filteredItems = getHistoryFilteredSwaps(state, filters);

  return {
    ...state,
    historyFilters: filters,
    filteredHistorySwaps: filteredItems
  };
};

export const resetAllFiltersHelper = (state: IMySwapsStore, tabType: SUT_MySwapsTabType): IMySwapsStore => {

  if (tabType === 'pending') {
    return ({
      ...state,
      pendingFilters: {
        offersFromCurrentChain: false,
        requestedDate: '',
        swapRequestStatus: 'all',
        swapMode: 'all',
      },
      filteredPendingSwaps: state.pendingSwaps
    });
  } else {
    return ({
      ...state,
      historyFilters: {
        offersFromCurrentChain: false,
        requestedDate: '',
        swapMode: 'all',
        swapStatus: 'all'
      },
      filteredHistorySwaps: state.historySwaps
    });
  }

};

const getPendingFilteredSwaps = (state: IMySwapsStore, filters: IPendingFilters, loginWalletAddress: string) => {
  const filteredItems = state.pendingSwaps?.reduce((filteredSwaps, swap) => {
    if (
      (filters.swapRequestStatus === 'all' ||
        (filters.swapRequestStatus === 'sent' && swap.init_address.toLowerCase() === loginWalletAddress.toLowerCase()) ||
        (filters.swapRequestStatus === 'received' && swap.accept_address.toLowerCase() === loginWalletAddress.toLowerCase())
      ) &&
      (filters.swapMode === 'all' || swap.swap_mode === SUE_SWAP_MODE[filters.swapMode === 'open-market' ? 'OPEN' : 'PRIVATE']) &&
      (!filters.requestedDate || swap.updated_at === filters.requestedDate) &&
      (!filters.offersFromCurrentChain || swap.trading_chain === String(Environment.CHAIN_ID))
    ) {
      filteredSwaps.push(swap);
    }
    return filteredSwaps;
  }, [] as SUI_OpenSwap[]);

  return filteredItems;
};

const getHistoryFilteredSwaps = (state: IMySwapsStore, filters: IHistoryFilters) => {
  const filteredItems = state.historySwaps?.reduce((filteredSwaps, swap) => {
    if (
      (filters.swapStatus === 'all' || swap.status === SUE_SWAP_STATUS[filters.swapStatus.toUpperCase() as keyof typeof SUE_SWAP_STATUS]) &&
      (filters.swapMode === 'all' || swap.swap_mode === SUE_SWAP_MODE[filters.swapMode === 'open-market' ? 'OPEN' : 'PRIVATE']) &&
      (!filters.requestedDate || swap.updated_at === filters.requestedDate) &&
      (!filters.offersFromCurrentChain || swap.trading_chain === String(Environment.CHAIN_ID))
    ) {
      filteredSwaps.push(swap);
    }
    return filteredSwaps;
  }, [] as SUI_OpenSwap[]);
  return filteredItems;
};