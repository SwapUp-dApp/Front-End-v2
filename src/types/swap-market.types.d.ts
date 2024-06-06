import { SUI_NFTItem } from "./swapup.types";

export type SUT_GetNFTsByWalletIdResponse = SUI_NFTItem[];

// Swap Type starts here
export interface SUI_Swap {
  init_address: string;
  accept_address: string;
  init_sign: string;
  accept_sign: string;
  metadata: SUI_SwapMetadata;
}

export interface SUI_OpenSwap {
  init_address: string;
  accept_address: string;
  init_sign: string;
  accept_sign: string;
  metadata: SUI_OpenSwapMetadata;
}

export interface SUI_OpenSwapMetadata {
  init: {
    tokens: SUI_SwapToken[];
  }
}


export interface SUI_SwapMetadata {
  init: {
    tokens: SUI_SwapToken[];
  };
  accept: {
    tokens: SUI_SwapToken[];
  };
}

export interface SUI_SwapToken {
  id: string;
  address: string;
  type: string;
}

// Swap type ends here