import { SUI_NFTItem, SUI_RarityRankItem } from "./swapup.types";

export type SUT_GetNFTsByWalletIdResponse = SUI_NFTItem[];
export type SUT_PreferredAssetType = "any" | "nft" | "currency";


// Swap Type starts here
export interface SUI_Swap {
  trade_id: string;
  swap_mode: 0 | 1;
  trading_chain: string;
  init_address: string;
  accept_address: string;
  init_sign: string;
  accept_sign: string;
  metadata: SUI_SwapMetadata;
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


// Open Market Swap types
export interface SUI_OpenSwap extends SUI_Swap {
  swap_preferences: SUI_SwapPreferences;
}

export interface SUI_SwapPreferences {
  expiration_date: string;
  preferred_asset: {
    type: SUT_PreferredAssetType;
    parameters: {
      collection?: string;
      rank?: SUI_RarityRankItem;
      added_amount?: string;
      preferred_currency?: SUI_SwapCurrencyItem[];
    };
  };
}

export interface SUI_SwapCurrencyItem {
  uuid: string;
  icon_url: string;
  name: string;
}

// Swap type ends here