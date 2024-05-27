import { SUT_GridViewType } from '@/swapup-types';
import { create } from 'zustand';

interface IPrivateRoomState {
  activeGridView: SUT_GridViewType;
  toggleGridView: () => void;
  profile: {
    title: string;
    image: string;
    isPremium: boolean;
    walletAddress: string;
    ensAddress: string;
  };
  network: {
    title: string;
    image: string;
  };
  search: {
    value: string;
    removeValue: () => void;
    setValue: () => void;
  };

}
interface IPrivateRoomStoreState {
  uniqueTradeId: string;
  activeGridView: SUT_GridViewType;
  toggleGridView: () => void;
}

const initialState: IPrivateRoomStoreState = {
  uniqueTradeId: '',
  activeGridView: 'detailed',
  toggleGridView: () => { },
};

export const usePrivateRoomStore = create<IPrivateRoomStoreState>(set => ({
  ...initialState,
  activeGridView: initialState.activeGridView,
  toggleGridView: () =>
    set(state => ({
      activeGridView: state.activeGridView === 'detailed' ? 'overview' : 'detailed',
    })),
}));
