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

  let filteredSwapsByStatus: SUI_OpenSwap[] = [];
  let filteredSwapsBySwapMode: SUI_OpenSwap[] = [];
  let filteredSwapsByDate: SUI_OpenSwap[] = [];
  let filteredSwapsByChainId: SUI_OpenSwap[] = [];

  if (filters.swapRequestStatus !== 'all') {
    filteredSwapsByStatus = (state.pendingSwaps || [])?.filter(swap => swap.init_address === loginWalletAddress);
  }

  if (filters.swapMode !== 'all') {
    const swapModeKey = filters.swapMode === 'open-market' ? 'OPEN' : 'PRIVATE';
    filteredSwapsBySwapMode = (state.pendingSwaps || [])?.filter(swap => swap.swap_mode === SUE_SWAP_MODE[swapModeKey]);
  }

  if (filters.requestedDate !== 'all') {
    filteredSwapsByDate = (state.pendingSwaps || [])?.filter(swap => swap.updated_at === filters.requestedDate);
  }

  if (filters.offersFromCurrentChain) {
    filteredSwapsByChainId = (state.pendingSwaps || [])?.filter(swap => swap.trading_chain === String(Environment.CHAIN_ID));
  }

  const filteredItems = [...new Set([...filteredSwapsByStatus, ...filteredSwapsBySwapMode, ...filteredSwapsByChainId, ...filteredSwapsByDate])];

  return ({
    ...state,
    pendingFilters: filters,
    filteredPendingSwaps: filteredItems.length > 0 ? filteredItems : []
  });
};

export const setFilteredHistorySwapByFiltersHelper = (state: IMySwapsStore, filters: IHistoryFilters): IMySwapsStore => {
  let filteredSwapsByStatus: SUI_OpenSwap[] = [];
  let filteredSwapsBySwapMode: SUI_OpenSwap[] = [];
  let filteredSwapsByDate: SUI_OpenSwap[] = [];
  let filteredSwapsByChainId: SUI_OpenSwap[] = [];

  if (filters.swapStatus !== 'all') {
    const swapStatusKey = filters.swapStatus.toUpperCase();
    filteredSwapsByStatus = (state.pendingSwaps || [])?.filter(swap => swap.status === SUE_SWAP_STATUS[swapStatusKey as keyof typeof SUE_SWAP_STATUS]);

    console.log("History filters: ", SUE_SWAP_STATUS[swapStatusKey as keyof typeof SUE_SWAP_STATUS]);
  }

  if (filters.swapMode !== 'all') {
    const swapModeKey = filters.swapMode === 'open-market' ? 'OPEN' : 'PRIVATE';
    filteredSwapsBySwapMode = (state.pendingSwaps || [])?.filter(swap => swap.swap_mode === SUE_SWAP_MODE[swapModeKey]);
  }

  if (filters.requestedDate !== 'all') {
    filteredSwapsByDate = (state.pendingSwaps || [])?.filter(swap => swap.updated_at === filters.requestedDate);
  }

  if (filters.offersFromCurrentChain) {
    filteredSwapsByChainId = (state.pendingSwaps || [])?.filter(swap => swap.trading_chain === String(Environment.CHAIN_ID));
  }

  const filteredItems = [...new Set([...filteredSwapsByStatus, ...filteredSwapsBySwapMode, ...filteredSwapsByChainId, ...filteredSwapsByDate])];


  return ({
    ...state,
    historyFilters: filters,
    filteredHistorySwaps: filteredItems.length > 0 ? filteredItems : []
  });
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

export const resetStatusFiltersHelper = (state: IMySwapsStore, tabType: SUT_MySwapsTabType): IMySwapsStore => {
  if (tabType === 'pending') {
    return ({
      ...state,
      pendingFilters: {
        ...state.pendingFilters,
        swapRequestStatus: 'all',
      },
    });
  } else {
    return ({
      ...state,
      historyFilters: {
        ...state.historyFilters,
        swapStatus: 'all'
      },
    });
  }
};

export const resetModeFiltersHelper = (state: IMySwapsStore, tabType: SUT_MySwapsTabType): IMySwapsStore => {
  if (tabType === 'pending') {
    return ({
      ...state,
      pendingFilters: {
        ...state.pendingFilters,
        swapMode: 'all',
      },
    });
  } else {
    return ({
      ...state,
      historyFilters: {
        ...state.historyFilters,
        swapMode: 'all'
      },
    });
  }
};