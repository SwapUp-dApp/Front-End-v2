import { create } from 'zustand';
import { IPrivateRoom, IOpenRoom, ISwapMarketStore, SUT_GridViewType, } from './swap-market-store.types';
import { SUI_NFTItem, SUI_RarityRankItem } from '@/types/swapup.types';
import { Environment } from '@/config';

import {
  toggleGridViewHelper,
  setSelectedNftsForSwapHelper,
  setFilteredNftsBySearchHelper,
  setFilteredNftsByFiltersHelper,
  removeAllFiltersHelper,
  setAddedAmountHelper,
  setValuesOnCreatingPrivateRoomHelper,
  setNftsDatasetHelper,
  setValuesOnCreateOpenSwapRoomHelper,
  createOpenSwapHelper,
  createPrivateMarketSwapHelper,
  connectToWalletHelper,
  setSwapEncodedMsgAndSignPrivateHelper,
  resetPrivateRoomDataHelper,
  setSwapPreferencesHelper,
  resetOpenSwapCreationRoomHelper,
  setOpenSwapsDataHelper,
  setFilteredAvailableSwapsBySearchHelper,
  setValuesOnProposeOpenSwapRoomHelper,
  setPrivateSwapsDataHelper,
  setFilteredAvailablePrivateSwapsBySearchHelper,
  setFilteredNftsBySwapTokensHelper,
  resetOpenSwapProposeRoomHelper,
  createProposeOpenSwapHelper,
  setSwapEncodedMsgAndSignOpenHelper,
  setPendingSwapsDataHelper,
  setSwapHistoryDataHelper,
  setValuesOnViewSwapRoomHelper,
  resetViewSwapRoomHelper,
  setMyOpenSwapsDataHelper,
} from './swap-market-helpers';

import { chainsDataset } from '@/constants/data';
import { SUI_OpenSwap, SUI_Swap, SUI_SwapPreferences, SUT_SwapOfferType } from '@/types/swap-market.types';
import { SUE_SWAP_MODE } from '@/constants/enums';


export const openMarketRoomInitialState: IOpenRoom = {
  swapUpOpenContract: Environment.SWAPUP_CONTRACT,
  chainId: Environment.CHAIN_ID,
  uniqueTradeId: '',
  nftsLength: 0,
  sign: '',
  swapEncodedMsg: '',
  sender: {
    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '1',
      image: '/assets/svgs/ethereum.svg',
      title: 'ethereum',
      shortTitle: "eth"
    },
    profile: {
      ensAddress: 'sender.swapup.eth',
      image: '/assets/images/avatar.png',
      isPremium: false,
      title: 'sender',
      walletAddress: ''
    },
    collections: [],
    nfts: [],
    availableChains: chainsDataset,
    filteredNfts: [],
    nftsSelectedForSwap: [],
    setSelectedNftsForSwap: () => { },
    setFilteredNftsBySearch: () => { },
    setFilteredNftsByFilters: () => { },
    removeAllFilters: () => { },
    setAddedAmount: () => { },
    setNftsDataset: () => { },
    setFilteredNftsBySwapTokens: () => { }
  },
  receiver: {
    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '1',
      image: '/assets/svgs/ethereum.svg',
      title: 'ethereum',
      shortTitle: "eth"
    },
    profile: {
      ensAddress: 'receiver.swapup.eth',
      image: '/assets/images/avatar.png',
      isPremium: false,
      title: 'receiver',
      walletAddress: ''
    },
    collections: [],
    nfts: [],
    availableChains: chainsDataset,
    filteredNfts: [],
    nftsSelectedForSwap: [],
    setSelectedNftsForSwap: () => { },
    setFilteredNftsBySearch: () => { },
    setFilteredNftsByFilters: () => { },
    removeAllFilters: () => { },
    setAddedAmount: () => { },
    setNftsDataset: () => { },
    setFilteredNftsBySwapTokens: () => { }
  },
  swap: {
    accept_address: '',
    init_address: '',
    accept_sign: '',
    init_sign: '',
    metadata: {
      accept: {
        tokens: []
      },
      init: {
        tokens: []
      }
    },
    swap_mode: SUE_SWAP_MODE.OPEN,
    trade_id: '',
    offer_type: 0,
    open_trade_id: '',
    trading_chain: '',
    swap_preferences: {
      expiration_date: '',
      preferred_asset: {
        type: 'any',
        parameters: {}
      }
    }
  },
  setValuesOnCreateOpenSwapRoom: () => { },
  setValuesOnProposeOpenSwapRoom: () => { },
  createOpenSwap: () => { },
  createProposeOpenSwap: () => { },
  setSwapEncodedMsgAndSign: () => { },
  setSwapPreferences: () => { },
  resetOpenSwapCreationRoom: () => { },
  resetOpenSwapProposeRoom: () => { },
  setValuesOnViewSwapRoom: () => { },
  resetViewSwapRoom: () => { }
};

export const privateMarketRoomInitialState: IPrivateRoom = {
  swapUpContract: Environment.SWAPUP_CONTRACT,
  chainId: Environment.CHAIN_ID,
  uniqueTradeId: '',
  nftsLength: 0,
  sign: '',
  swapEncodedMsg: '',
  sender: {
    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '1',
      image: '/assets/svgs/ethereum.svg',
      title: 'ethereum',
      shortTitle: "eth"
    },
    profile: {
      ensAddress: 'sender.swapup.eth',
      image: '/assets/images/avatar.png',
      isPremium: false,
      title: 'sender',
      walletAddress: ''
    },
    collections: [],
    nfts: [],
    availableChains: chainsDataset,
    filteredNfts: [],
    nftsSelectedForSwap: [],
    setSelectedNftsForSwap: () => { },
    setFilteredNftsBySearch: () => { },
    setFilteredNftsByFilters: () => { },
    removeAllFilters: () => { },
    setAddedAmount: () => { },
    setNftsDataset: () => { },
    setFilteredNftsBySwapTokens: () => { }
  },
  receiver: {
    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '9090',
      image: '/assets/svgs/solana.svg',
      title: 'solana',
      shortTitle: 'sol'
    },
    profile: {
      ensAddress: 'receiver.swapup.eth',
      image: '',
      isPremium: true,
      title: 'receiver',
      walletAddress: ''
    },
    collections: [],
    nfts: [],
    availableChains: chainsDataset,
    filteredNfts: [],
    nftsSelectedForSwap: [],
    setSelectedNftsForSwap: () => { },
    setFilteredNftsBySearch: () => { },
    setFilteredNftsByFilters: () => { },
    removeAllFilters: () => { },
    setAddedAmount: () => { },
    setNftsDataset: () => { },
    setFilteredNftsBySwapTokens: () => { }
  },
  setValuesOnCreatingRoom: () => { },
  createPrivateMarketSwap: () => { },
  setSwapEncodedMsgAndSign: () => { },
  resetPrivateRoom: () => { },
  setValuesOnViewSwapRoom: () => { },
  resetViewSwapRoom: () => { }
};

const initialState: ISwapMarketStore = {
  openMarket: {
    openRoom: openMarketRoomInitialState,
    setOpenSwapsData: () => { },
    setMyOpenSwapsData: () => { },
    setFilteredAvailableSwapsBySearch: () => { }
  },
  privateMarket: {
    privateRoom: privateMarketRoomInitialState,
    setPrivateSwapsData: () => { },
    setFilteredAvailablePrivateSwapsBySearch: () => { },
    setPendingSwapsData: () => { },
    setSwapHistoryData: () => { }
  },
  wallet: {
    address: '',
    isConnected: false,
    ensAddress: 'sender.swapup.eth',
    image: '/assets/images/avatar.png',
    isPremium: false,
    title: 'sender',
    network: {
      id: '1',
      image: '/assets/svgs/ethereum.svg',
      title: 'ethereum',
      shortTitle: "eth"
    },
  },
  setProvider: () => { },
  connectWallet: () => { },
};

export const useSwapMarketStore = create<ISwapMarketStore>((set, get) => ({
  ...initialState,
  openMarket: {
    openRoom: {
      ...openMarketRoomInitialState,
      sender: {
        ...openMarketRoomInitialState.sender,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'openMarket', 'openRoom', 'sender', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'openMarket', 'openRoom', 'sender', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'openMarket', 'openRoom', 'sender', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'openMarket', 'openRoom', 'sender', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'openMarket', 'openRoom', 'sender')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'openMarket', 'openRoom', 'sender', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'openMarket', 'openRoom', 'sender', dataset)),
        setFilteredNftsBySwapTokens: (dataset: SUI_NFTItem[]) => set((state) => setFilteredNftsBySwapTokensHelper(state, dataset, 'openMarket', 'openRoom', 'sender')),
      },
      receiver: {
        ...openMarketRoomInitialState.receiver,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'openMarket', 'openRoom', 'receiver', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'openMarket', 'openRoom', 'receiver', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'openMarket', 'openRoom', 'receiver', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'openMarket', 'openRoom', 'receiver', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'openMarket', 'openRoom', 'receiver')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'openMarket', 'openRoom', 'receiver', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'openMarket', 'openRoom', 'receiver', dataset)),
        setFilteredNftsBySwapTokens: (dataset: SUI_NFTItem[]) => set((state) => setFilteredNftsBySwapTokensHelper(state, dataset, 'openMarket', 'openRoom', 'receiver')),
      },
      resetOpenSwapCreationRoom: () => set(state => resetOpenSwapCreationRoomHelper(state)),
      resetOpenSwapProposeRoom: () => set(state => resetOpenSwapProposeRoomHelper(state)),
      resetViewSwapRoom: () => set(state => resetViewSwapRoomHelper(state, 'openMarket', 'openRoom')),
      setValuesOnCreateOpenSwapRoom: (tradeId: string) => set((state) => setValuesOnCreateOpenSwapRoomHelper(state, tradeId)),
      setValuesOnProposeOpenSwapRoom: async (tradeId: string, swap: SUI_OpenSwap) => {
        const state = get();
        const newState = await setValuesOnProposeOpenSwapRoomHelper(state, tradeId, swap);
        set(newState);
      },
      setValuesOnViewSwapRoom: async (tradeId: string, swap: SUI_OpenSwap) => {
        const state = get();
        const newState = await setValuesOnViewSwapRoomHelper(state, tradeId, 'openMarket', 'openRoom', swap);
        set(newState);
      },
      createOpenSwap: async () => {
        const state = get();
        const newState = await createOpenSwapHelper(state);
        set(newState);
      },
      createProposeOpenSwap: async () => {
        const state = get();
        const newState = await createProposeOpenSwapHelper(state);
        set(newState);
      },
      setSwapEncodedMsgAndSign: async (swapEncodedMsg: string, sign: string) => {
        const state = get();
        const newState = await setSwapEncodedMsgAndSignOpenHelper(state, swapEncodedMsg, sign);
        set(newState);
      },
      setSwapPreferences: (preferences: SUI_SwapPreferences) => set((state) => setSwapPreferencesHelper(state, preferences))
    },
    setOpenSwapsData: (swapsData: SUI_OpenSwap[]) => set(state => setOpenSwapsDataHelper(state, swapsData)),
    setMyOpenSwapsData: (createdSwaps: SUI_OpenSwap[]) => set(state => setMyOpenSwapsDataHelper(state, createdSwaps)),
    setFilteredAvailableSwapsBySearch: (searchValue: string) => set(state => setFilteredAvailableSwapsBySearchHelper(state, searchValue))
  },
  privateMarket: {
    privateRoom: {
      ...privateMarketRoomInitialState,
      sender: {
        ...privateMarketRoomInitialState.sender,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'privateMarket', 'privateRoom', 'sender', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'sender', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'privateMarket', 'privateRoom', 'sender', dataset)),
        setFilteredNftsBySwapTokens: (dataset: SUI_NFTItem[]) => set((state) => setFilteredNftsBySwapTokensHelper(state, dataset, 'privateMarket', 'privateRoom', 'sender')),
      },
      receiver: {
        ...privateMarketRoomInitialState.receiver,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'privateMarket', 'privateRoom', 'receiver', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'receiver', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'receiver', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'receiver', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'receiver')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'receiver', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'privateMarket', 'privateRoom', 'receiver', dataset)),
        setFilteredNftsBySwapTokens: (dataset: SUI_NFTItem[]) => set((state) => setFilteredNftsBySwapTokensHelper(state, dataset, 'privateMarket', 'privateRoom', 'receiver')),
      },
      resetViewSwapRoom: () => set(state => resetViewSwapRoomHelper(state, 'privateMarket', 'privateRoom')),
      setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => set((state) => setValuesOnCreatingPrivateRoomHelper(state, 'privateMarket', 'privateRoom', tradeId, counterPartyWalletAddress)),
      setValuesOnViewSwapRoom: async (tradeId: string, swap: SUI_Swap) => {
        const state = get();
        const newState = await setValuesOnViewSwapRoomHelper(state, tradeId, 'privateMarket', 'privateRoom', swap);
        set(newState);
      },
      createPrivateMarketSwap: async (offer_type: SUT_SwapOfferType) => {
        const state = get();
        const newState = await createPrivateMarketSwapHelper(state, offer_type);
        set(newState);
      },
      setSwapEncodedMsgAndSign: async (swapEncodedMsg: string, sign: string) => {
        const state = get();
        const newState = await setSwapEncodedMsgAndSignPrivateHelper(state, swapEncodedMsg, sign);
        set(newState);
      },
      resetPrivateRoom: () => set((state) => resetPrivateRoomDataHelper(state)),

    },
    setPendingSwapsData: (pendingswapsData: SUI_OpenSwap[]) => set(state => setPendingSwapsDataHelper(state, pendingswapsData)),
    setSwapHistoryData: (swaphistoryData: SUI_OpenSwap[]) => set(state => setSwapHistoryDataHelper(state, swaphistoryData)),
    setPrivateSwapsData: (privateswapsData: SUI_Swap[]) => set(state => setPrivateSwapsDataHelper(state, privateswapsData)),
    setFilteredAvailablePrivateSwapsBySearch: (searchValue: string) => set(state => setFilteredAvailablePrivateSwapsBySearchHelper(state, searchValue)),
  },

  connectWallet: async () => {
    const state = get();
    const newState = await connectToWalletHelper(state);
    set(newState);
  }

}));
