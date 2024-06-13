import { IProfile } from "@/types/.types";


export interface IProfile {
    openMarket: {
        // transaction history
        openRoom: IOpenRoom;
      },
      privateMarket: {
        privateRoom: IPrivateRoom;
      };
    
    wallet: IWallet;
    connectWallet: () => void;
    setProvider: (provider: any) => void;
    ensAddress:string;
    
  }
  