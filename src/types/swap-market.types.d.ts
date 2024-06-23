import { SUI_NFTItem, SUI_RarityRankItem } from "./swapup.types";

export type SUT_GetNFTsByWalletIdResponse = SUI_NFTItem[];
export type SUT_SwapMode = 0 | 1;
export type SUT_SwapStatus = 1 | 2 | 3 | 4;
export type SUT_SwapOfferType = 0 | 1;
export type SUT_PreferredAssetType = "any" | "nft" | "currency";
export type SUT_TradeIdType = "trade_id" | "open_trade_id";
export type SUT_SwapRoomViewType = "default" | "view" | "propose" | "counter";


// Swap Type starts here
export interface SUI_Swap {
  id?: string;
  trade_id: string;
  swap_mode: SUT_SwapMode;
  trading_chain: string;
  init_address: string;
  accept_address: string;
  init_sign: string;
  accept_sign: string;
  metadata: SUI_SwapMetadata;
  offer_type: SUT_SwapOfferType;
  status?: SUT_SwapStatus;
  created_at?: string;
  updated_at?: string;
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
  image_url: string;
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

export interface SUP_UpdateSwap extends Pick<
  SUI_OpenSwap,
  'init_address' | 'accept_address' | 'init_sign' | 'trade_id' | 'trading_chain' | 'swap_mode' | 'offer_type' | 'metadata'> {
  status: number;
  txt: string;
  notes: string;
  timestamp: string;
  id: string;
}

let res2 = await api.updateSwapStatus({
  id: this.existingSwap.id,
  status: 4,
  txn: res?.hash,
  notes: res?.notes,
  metadata: JSON.stringify(this.existingSwap.metadata),
  timestamp: Math.floor(new Date().getTime() / 1000)
});


// Swap api payload types ends here

