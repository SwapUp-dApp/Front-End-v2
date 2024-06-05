import { create } from 'zustand';
import { ISwapMarketStore, SUT_GridViewType } from './swap-market-types';
import {
  toggleGridViewHelper,
  setSelectedNftsForSwapHelper,
  setFilteredNftsBySearchHelper,
  setFilteredNftsByFiltersHelper,
  removeAllFiltersHelper,
  setAddedAmountHelper,
  setValuesOnCreatingPrivateRoomHelper,
  chainsDataset,
  setNftsDatasetHelper
} from './swap-market-helpers';
import { IPrivateRoom } from './swap-market-types';
import { SUI_NFTItem, SUI_RarityRankItem } from '@/types/swapup.types';
import { testWalletAddress } from '@/constants';

const initialPrivateRoomState: IPrivateRoom = {
  uniqueTradeId: '',
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
};

const initialState: ISwapMarketStore = {
  openMarket: {
    openRoom: initialPrivateRoomState,
  },
  privateMarket: {
    privateRoom: initialPrivateRoomState,
  }
};

export const useSwapMarketStore = create<ISwapMarketStore>((set) => ({
  ...initialState,
  openMarket: {
    openRoom: {
      ...initialPrivateRoomState,
      sender: {
        ...initialPrivateRoomState.sender,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'openMarket', 'openRoom', 'sender', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'openMarket', 'openRoom', 'sender', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'openMarket', 'openRoom', 'sender', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'openMarket', 'openRoom', 'sender', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'openMarket', 'openRoom', 'sender')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'openMarket', 'openRoom', 'sender', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'openMarket', 'privateRoom', 'sender', dataset)),

      },
      receiver: {
        ...initialPrivateRoomState.receiver,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'openMarket', 'openRoom', 'receiver', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'openMarket', 'openRoom', 'receiver', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'openMarket', 'openRoom', 'receiver', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'openMarket', 'openRoom', 'receiver', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'openMarket', 'openRoom', 'receiver')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'openMarket', 'openRoom', 'receiver', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'openMarket', 'openRoom', 'receiver', dataset)),

      },
      setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => set((state) => setValuesOnCreatingPrivateRoomHelper(state, 'openMarket', 'openRoom', tradeId, counterPartyWalletAddress)),
    }
  },
  privateMarket: {
    privateRoom: {
      ...initialPrivateRoomState,
      sender: {
        ...initialPrivateRoomState.sender,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'privateMarket', 'privateRoom', 'sender', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'sender', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'privateMarket', 'privateRoom', 'sender', dataset)),

      },
      receiver: {
        ...initialPrivateRoomState.receiver,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'privateMarket', 'privateRoom', 'receiver', value)),
        setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'receiver', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'receiver', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'receiver', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'receiver')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'receiver', selectedAmount, selectedCoin)),
        setNftsDataset: (dataset: SUI_NFTItem[]) => set((state) => setNftsDatasetHelper(state, 'privateMarket', 'privateRoom', 'receiver', dataset)),

      },
      setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => set((state) => setValuesOnCreatingPrivateRoomHelper(state, 'privateMarket', 'privateRoom', tradeId, counterPartyWalletAddress)),
    }
  }
}));
