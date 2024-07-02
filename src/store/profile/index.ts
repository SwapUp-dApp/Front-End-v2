import { create } from 'zustand';
import { IProfileStore } from "@/types/profile-store.types";
import { getInitialProfile, setProfileWalletHelper } from './profile-helpers';
import { IWallet } from '@/types/profile.types';

const initialState: IProfileStore = {
  profile: getInitialProfile("sender"),
  setProfileWallet: () => { }
};

export const useProfileStore = create<IProfileStore>((set, get) => ({
  ...initialState,
  setProfileWallet: (connectedWallet: IWallet) => set(state => setProfileWalletHelper(state, connectedWallet))
}));
