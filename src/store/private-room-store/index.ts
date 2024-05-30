import { INFTItem, SUT_GridViewType } from '@/swapup-types';
import { create } from 'zustand';
import { IPrivateRoomStoreState } from './types';
import { setSelectedNftsForSwapHelper, tempReceiverNfts, tempSenderNfts, toggleGridViewHelper } from './helpers';



const initialState: IPrivateRoomStoreState = {
  uniqueTradeId: '46Aic2o',
  sender: {
    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '1',
      image: 'src/assets/svgs/ethereum.svg',
      title: 'ethereum'
    },
    profile: {
      ensAddress: 'sender.swapup.eth',
      image: 'src/assets/images/avatar.png',
      isPremium: false,
      title: 'sender',
      walletAddress: '0x13374200C2CF752eCeAa9a0eC6Ac099aF9D6D3D1'
    },
    nfts: tempSenderNfts,
    filteredNfts: tempSenderNfts,
    setSelectedNftsForSwap: () => { },
    nftsSelectedForSwap: []
  },
  receiver: {
    activeGridView: 'detailed',
    toggleGridView: () => { },
    network: {
      id: '9090',
      image: 'src/assets/svgs/solana.svg',
      title: 'solana'
    },
    profile: {
      ensAddress: 'receiver.swapup.eth',
      image: '',
      isPremium: true,
      title: 'sender',
      walletAddress: '0xabCdeF1234567890AbCdEf123456789012345678'
    },
    nfts: tempReceiverNfts,
    filteredNfts: tempReceiverNfts,
    setSelectedNftsForSwap: () => { },
    nftsSelectedForSwap: []
  }
};

export const usePrivateRoomStore = create<IPrivateRoomStoreState>((set) => ({
  ...initialState,
  sender: {
    ...initialState.sender,
    toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'sender', value)),
    setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'sender', selectedNfts))
  },
  receiver: {
    ...initialState.receiver,
    toggleGridView: (value: SUT_GridViewType) => set((state) => toggleGridViewHelper(state, 'receiver', value)),
    setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => set((state) => setSelectedNftsForSwapHelper(state, 'receiver', selectedNfts))
  }
}));


