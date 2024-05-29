export type SUT_GridViewType = 'detailed' | 'overview';
export type SUI_PrivateRoomLayoutType = "sender" | "receiver";

export interface INetwork {
  id: string;
  title: string;
  image: string;
};
export interface INFTItem {
  id: string;
  title: string;
  collection: string;
  image: string;
  isTopRated?: boolean;
  network: INetwork;
  amount: number;
  rarityRank: number;
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
}