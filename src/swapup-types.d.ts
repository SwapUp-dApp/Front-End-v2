export interface INavItem {
  key: string;
  title: string;
  path: string;
}
export interface INetwork {
  id: string;
  title: string;
  shortTitle: string;
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


export interface ICoinItem{
  uuid: string
  symbol: string
  name: string
  color: string
  iconUrl: string
  marketCap: string
  price: string
  listedAt: number
  tier: number
  change: string
  rank: number
  sparkline: string[]
  lowVolume: boolean
  coinrankingUrl: string
  "24hVolume": string
  btcPrice: string
  contractAddresses: any[]
}