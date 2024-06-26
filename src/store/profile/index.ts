import { create } from 'zustand';
import { IProfileStore } from "@/types/profile-store.types";
import { getInitialProfile } from './profile-helpers';

const initialState: IProfileStore = {
    profile: getInitialProfile("sender"),
    updateWalletInProfileState: () => {}
  };

export const useProfileStore = create<IProfileStore>((set, get) => ({

    ...initialState,
    updateWalletInProfileState: async (wallet: any) => {
      const state = get();
      state.profile.wallet = wallet;
      set(state);
    }
  
  }));
  