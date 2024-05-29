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