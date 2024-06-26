import { IWallet, IProfile } from "./profile.types";

export interface IProfileStore {
  profile: IProfile
  
  updateWalletInProfileState: (wallet: IWallet) => void;  
}
