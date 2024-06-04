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
  tempSenderNfts,
  chainsDataset,
  tempReceiverNfts
} from './swap-market-helpers';
import { IPrivateRoom } from './swap-market-types';
import { INFTItem, SUI_RarityRankItem } from '@/swapup-types';

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
      walletAddress: '0x13374200C2CF752eCeAa9a0eC6Ac099aF9D6D3D1'
    },
    nfts: tempSenderNfts,
    availableChains: chainsDataset,
    filteredNfts: tempSenderNfts,
    nftsSelectedForSwap: [],
    setSelectedNftsForSwap: () => { },
    setFilteredNftsBySearch: () => { },
    setFilteredNftsByFilters: () => { },
    removeAllFilters: () => { },
    setAddedAmount: () => { },
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
      walletAddress: '0xabCdeF1234567890AbCdEf123456789012345678'
    },
    nfts: tempReceiverNfts,
    availableChains: chainsDataset,
    filteredNfts: tempReceiverNfts,
    nftsSelectedForSwap: [],
    setSelectedNftsForSwap: () => { },
    setFilteredNftsBySearch: () => { },
    setFilteredNftsByFilters: () => { },
    removeAllFilters: () => { },
    setAddedAmount: () => { },
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
        setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'openMarket', 'openRoom', 'sender', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'openMarket', 'openRoom', 'sender', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'openMarket', 'openRoom', 'sender', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'openMarket', 'openRoom', 'sender')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'openMarket', 'openRoom', 'sender', selectedAmount, selectedCoin)),
      },
      receiver: {
        ...initialPrivateRoomState.receiver,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'openMarket', 'openRoom', 'receiver', value)),
        setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'openMarket', 'openRoom', 'receiver', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'openMarket', 'openRoom', 'receiver', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'openMarket', 'openRoom', 'receiver', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'openMarket', 'openRoom', 'receiver')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'openMarket', 'openRoom', 'receiver', selectedAmount, selectedCoin)),
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
        setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'sender', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedAmount, selectedCoin)),
      },
      receiver: {
        ...initialPrivateRoomState.receiver,
        toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'privateMarket', 'privateRoom', 'receiver', value)),
        setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'receiver', selectedNfts)),
        setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'receiver', searchValue)),
        setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'receiver', collectionTitle, selectedRarityRank)),
        removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'receiver')),
        setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'receiver', selectedAmount, selectedCoin)),
      },
      setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => set((state) => setValuesOnCreatingPrivateRoomHelper(state, 'privateMarket', 'privateRoom', tradeId, counterPartyWalletAddress)),
    }
  }
}));
