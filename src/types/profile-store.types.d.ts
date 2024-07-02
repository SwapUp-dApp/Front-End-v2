import { IWallet, IProfile } from "./profile.types";

export interface IProfileStore {
  profile: IProfile;
  setProfileWallet: (connectedWallet: IWallet) => void;
}


