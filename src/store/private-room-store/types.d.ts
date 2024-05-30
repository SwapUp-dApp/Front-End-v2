import { IRarityRankItem } from "@/swapup-types";

export type SUT_GridViewType = 'detailed' | 'overview';
export type SUI_PrivateRoomLayoutType = "sender" | "receiver";

export interface IPrivateRoomFilterItem {
  collection: string;
  rarityRank: string;
}

export interface IPrivateRoomState {
  activeGridView: SUT_GridViewType;
  toggleGridView: (value: SUT_GridViewType) => void;
  profile: {
    title: string;
    image: string;
    isPremium?: boolean;
    walletAddress: string;
    ensAddress: string;
  };
  network: INetwork;
  filters?: IPrivateRoomFilterItem[];
  nfts?: INFTItem[];
  filteredNfts?: INFTItem[];
  nftsSelectedForSwap: INFTItem[] | [];
  setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => void;
  setFilteredNftsBySearch: (searchValue: string) => void;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: IRarityRankItem) => void;
}

export interface IPrivateRoomStoreState {
  uniqueTradeId: string;
  sender: IPrivateRoomState;
  receiver: IPrivateRoomState;
}