import { create } from "zustand";
import { coinsDataset, tempReceiverNfts, tempSenderNfts } from "../private-room-store/helpers";
import { ISwapMarketStore, SUT_GridViewType } from "./swap-market-types";
import { INFTItem, IRarityRankItem } from "@/swapup-types";
// import { setFilteredNftsBySearchHelper } from "./swap-market-helpers";

const swapMarketInitialState: ISwapMarketStore = {
  openMarket: {},
  privateMarket: {
    privateRoom: {
      uniqueTradeId: '',
      sender: {
        activeGridView: 'detailed',
        toggleGridView: () => { },
        network: {
          id: '1',
          image: 'src/assets/svgs/ethereum.svg',
          title: 'ethereum',
          shortTitle: 'eth'
        },
        profile: {
          ensAddress: 'sender.swapup.eth',
          image: 'src/assets/images/avatar.png',
          isPremium: false,
          title: 'sender',
          walletAddress: '0x13374200C2CF752eCeAa9a0eC6Ac099aF9D6D3D1'
        },
        nfts: tempSenderNfts,
        availableChains: coinsDataset,
        filteredNfts: tempSenderNfts,
        nftsSelectedForSwap: [],
        setSelectedNftsForSwap: () => void {},
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
          title: 'sender',
          walletAddress: '0xabCdeF1234567890AbCdEf123456789012345678'
        },
        nfts: tempReceiverNfts,
        availableChains: coinsDataset,
        filteredNfts: tempReceiverNfts,
        nftsSelectedForSwap: [],
        setSelectedNftsForSwap: () => { },
        setFilteredNftsBySearch: () => { },
        setFilteredNftsByFilters: () => { },
        removeAllFilters: () => { },
        setAddedAmount: () => { },

      },
      setValuesOnCreatingRoom: () => { }
    }
  }
};


export const useSwapMarketStore = create<ISwapMarketStore>((set) => ({
  ...swapMarketInitialState,
  privateMarket: {
    ...swapMarketInitialState.privateMarket,
    room: {
      ...swapMarketInitialState.privateMarket.privateRoom,
      sender: {
        ...swapMarketInitialState.privateMarket.privateRoom.sender,
        // toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'privateMarket', 'privateRoom', 'sender', value)),
        // setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedNfts)),
        // setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'sender', searchValue)),
        // setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: IRarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender', collectionTitle, selectedRarityRank)),
        // removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'privateMarket', 'privateRoom', 'sender')),
        // setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'privateMarket', 'privateRoom', 'sender', selectedAmount, selectedCoin)),
      },
      receiver: {
        ...swapMarketInitialState.privateMarket.privateRoom.receiver,
        // toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'receiver', value)),
        // setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'receiver', selectedNfts)),
        // setFilteredNftsBySearch: (searchValue: string) => set((state) => setFilteredNftsBySearchHelper(state, 'privateMarket', 'privateRoom', 'receiver', searchValue)),
        // setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: IRarityRankItem) => set((state) => setFilteredNftsByFiltersHelper(state, 'receiver', collectionTitle, selectedRarityRank)),
        // removeAllFilters: () => set((state) => removeAllFiltersHelper(state, 'receiver')),
        // setAddedAmount: (selectedAmount: string, selectedCoin: string) => set((state) => setAddedAmountHelper(state, 'receiver', selectedAmount, selectedCoin)),
      },
      // setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => set((state) => setValuesOnCreatingPrivateRoomHelper(state, tradeId, counterPartyWalletAddress)),
    }
  }
}));