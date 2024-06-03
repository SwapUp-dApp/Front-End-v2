import { ICoinItem, IRarityRankItem } from "@/swapup-types";

export type SUT_GridViewType = 'detailed' | 'overview';
export type SUI_PrivateRoomLayoutType = "sender" | "receiver";

export interface IPrivateRoomFilterItem {
  collection: string;
  rarityRank: IRarityRankItem;
}

export interface IAddedAmount {
  usdAmount: number;
  coin: ICoinItem;
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
  addedAmount?: IAddedAmount;
  availableCoins: ICoinItem[];
  network: INetwork;
  filters?: IPrivateRoomFilterItem;
  nfts?: INFTItem[];
  filteredNfts?: INFTItem[];
  nftsSelectedForSwap: INFTItem[] | [];
  setSelectedNftsForSwap: (selectedNfts: INFTItem[] | []) => void;
  setFilteredNftsBySearch: (searchValue: string) => void;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: IRarityRankItem) => void;
  setAddedAmount: (selectedAmount: string, selectedCoin: string) => void;
  removeAllFilters: () => void;

}

export interface IPrivateRoomStoreState {
  uniqueTradeId: string;
  sender: IPrivateRoomState;
  receiver: IPrivateRoomState;
  setValuesOnCreatingRoom: (tradeId: string, counterPartyWalletAddress: string) => void;
}


