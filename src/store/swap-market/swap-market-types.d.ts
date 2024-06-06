import { SUI_Swap } from "@/types/swap-market.types";
import { SUI_ChainItem, INetwork, INFTItem, SUI_RarityRankItem, SUI_NFTItem } from "@/types/swapup.types";

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
  collections: string[] | [];
  addedAmount?: IAddedAmount;
  availableChains: SUI_ChainItem[];
  network: INetwork;
  filters?: IPrivateRoomFilterItem;
  nfts?: SUI_NFTItem[];
  filteredNfts?: SUI_NFTItem[];
  nftsSelectedForSwap: SUI_NFTItem[] | [];
  setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => void;
  setFilteredNftsBySearch: (searchValue: string) => void;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => void;
  setAddedAmount: (selectedAmount: string, selectedCoin: string) => void;
  setNftsDataset: (selectedNfts: SUI_NFTItem[] | []) => void;
  removeAllFilters: () => void;

}

export interface IPrivateRoom {
  uniqueTradeId: string;
  sender: IPrivateRoomsLayoutSide;
  receiver: IPrivateRoomsLayoutSide;
  swap?: SUI_Swap;
  swapEncodedMsg: string;
  sign: string;
  nftsLength: number;
  swapUpContract: string;
  chainId: number;
  setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => void;
  createSwap: () => void;
}

interface IOpenMarket {
  openRoom: IPrivateRoom;
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
