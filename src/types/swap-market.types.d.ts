import { SUI_NFTItem, SUI_RarityRankItem } from "./swapup.types";

export type SUT_GetNFTsByWalletIdResponse = SUI_NFTItem[];
export type SUT_SwapMode = 0 | 1;
export type SUT_SwapOfferType = 0 | 1;
export type SUT_PreferredAssetType = "any" | "nft" | "currency";


// Swap Type starts here
export interface SUI_Swap {
  trade_id: string;
  swap_mode: SUT_SwapMode;
  trading_chain: string;
  init_address: string;
  accept_address: string;
  init_sign: string;
  accept_sign: string;
  metadata: SUI_SwapMetadata;
  offer_type: SUT_SwapOfferType;
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
  open_trade_id: string;
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


// Swap api payload types starts here

export interface SUP_CreateOpenSwap extends Pick<
  SUI_OpenSwap,
  'init_address' | 'offer_type' | 'open_trade_id' | 'swap_preferences' | 'trading_chain' | 'swap_mode'> {
  metadata: {
    init: {
      tokens: SUI_SwapToken[];
    };
  };
}

// Swap api payload types ends here

