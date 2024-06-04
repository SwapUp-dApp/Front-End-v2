import { SUI_ChainItem, INetwork, INFTItem, SUI_RarityRankItem } from "@/swapup-types";

export type SUT_GridViewType = 'detailed' | 'overview';
export type SUT_PrivateRoomLayoutType = "sender" | "receiver";
export type SUT_MarketKeyType = "privateMarket" | "openMarket";
export type SUT_RoomKeyType = "privateRoom" | "openRoom";

export interface IPrivateRoomFilterItem {
  collection: string;
  rarityRank: SUI_RarityRankItem;
}

export interface IAddedAmount {
  usdAmount: number;
  coin: SUI_ChainItem;
}

export interface IPrivateRoomsLayoutSide {
  activeGridView: SUT_GridViewType;
  toggleGridView: (value: SUT_GridViewType) => void;
  profile: {
    title: string;
    image: string;
    isPremium?: boolean;
    walletAddress: string;
    ensAddress: string;
  };
  addedAmount?: IAddedAmount;
  availableChains: SUI_ChainItem[];
  network: INetwork;
  filters?: IPrivateRoomFilterItem;
  nfts?: INFTItem[];
  filteredNfts?: INFTItem[];
  nftsSelectedForSwap: INFTItem[] | [];
  setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => void;
  setFilteredNftsBySearch: (searchValue: string) => void;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => void;
  setAddedAmount: (selectedAmount: string, selectedCoin: string) => void;
  removeAllFilters: () => void;
}

export interface IPrivateRoom {
  uniqueTradeId: string;
  sender: IPrivateRoomsLayoutSide;
  receiver: IPrivateRoomsLayoutSide;
  setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => void;
}

export interface ISwapMarketStore {
  openMarket: {
    // transaction history
    openRoom: IPrivateRoom;
  },
  privateMarket: {
    privateRoom: IPrivateRoom;
  };
}
