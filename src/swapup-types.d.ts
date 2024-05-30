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

export interface IRarityRankItem {
  from: number;
  to: number;
}