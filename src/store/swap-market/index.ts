import { create } from 'zustand';
import { IPrivateRoom, IOpenRoom, ISwapMarketStore, SUT_GridViewType, SUT_MarketKeyType, SUT_RoomKeyType } from './swap-market-store.types';
import { SUI_NFTItem, SUI_RarityRankItem } from '@/types/swapup.types';
import { testWalletAddress } from '@/constants';
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
  setValuesOnCreatingOpenSwapRoomHelper,
  createOpenSwapHelper,
  createPrivateMarketSwapHelper,
  connectToWalletHelper,
  setSwapEncodedMsgAndSignPrivateHelper,
  resetRoomDataHelper,
} from './swap-market-helpers';
import { chainsDataset } from '@/constants/data';


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
      image: 'src/assets/svgs/ethereum.svg',
      title: 'ethereum',
      shortTitle: "eth"
    },
    profile: {
      ensAddress: 'sender.swapup.eth',
      image: 'src/assets/images/avatar.png',
      isPremium: false,
      title: 'sender',
      walletAddress: testWalletAddress
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

  },
  setValuesOnCreatingOpenMarket: () => { },
  createOpenSwap: () => { },
  setSwapEncodedMsgAndSign: () => { }
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
      image: 'src/assets/svgs/ethereum.svg',
      title: 'ethereum',
      shortTitle: "eth"
    },
    profile: {
      ensAddress: 'sender.swapup.eth',
      image: 'src/assets/images/avatar.png',
      isPremium: false,
      title: 'sender',
      walletAddress: testWalletAddress
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
  },
  receiver: {

    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '9090',
      image: 'src/assets/svgs/solana.svg',
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

  },
  setValuesOnCreatingRoom: () => { },
  createPrivateMarketSwap: () => { },
  setSwapEncodedMsgAndSign: () => { },
};

const initialState: ISwapMarketStore = {
  openMarket: {
    openRoom: openMarketRoomInitialState,
  },
  privateMarket: {
    privateRoom: privateMarketRoomInitialState,
  },
  wallet: {
    address: '',
    isConnected: false,
  },
  setProvider: () => { },
  connectWallet: () => { },
  resetRoom: () => { }
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
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'openMarket', 'privateRoom', 'sender', dataset)),

      },
      setValuesOnCreatingOpenMarket: (tradeId: string) => set((state) => setValuesOnCreatingOpenSwapRoomHelper(state, 'openMarket', 'openRoom', tradeId)),
      createPrivateMarketSwap: async () => {
        const state = get();
        const newState = await createOpenSwapHelper(state);
        set(newState);
      },
      setSwapEncodedMsgAndSign: async (swapEncodedMsg: string, sign: string) => {
        const state = get();
        const newState = await setSwapEncodedMsgAndSignPrivateHelper(state, swapEncodedMsg, sign);
        set(newState);
      },
    }
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

      },
      setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => set((state) => setValuesOnCreatingPrivateRoomHelper(state, 'privateMarket', 'privateRoom', tradeId, counterPartyWalletAddress)),
      createPrivateMarketSwap: async () => {
        const state = get();
        const newState = await createPrivateMarketSwapHelper(state);
        set(newState);
      },
      setSwapEncodedMsgAndSign: async (swapEncodedMsg: string, sign: string) => {
        const state = get();
        const newState = await setSwapEncodedMsgAndSignPrivateHelper(state, swapEncodedMsg, sign);
        set(newState);
      },
    }
  },

  connectWallet: async () => {
    const state = get();
    const newState = await connectToWalletHelper(state);
    set(newState);
  },

  resetRoom: (marketKey: SUT_MarketKeyType, roomKey: SUT_RoomKeyType) => set((state) => resetRoomDataHelper(state, marketKey, roomKey)),

}));
