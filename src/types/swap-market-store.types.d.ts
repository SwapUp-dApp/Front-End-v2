import { SUI_OpenSwap, SUI_Swap, SUI_SwapPreferences, SUT_SwapOfferType } from "@/types/swap-market.types";
import { SUI_ChainItem, INetwork, INFTItem, SUI_RarityRankItem, SUI_NFTItem } from "@/types/global.types";
import { IProfile, IWallet } from "./profile.types";

export type SUT_GridViewType = 'detailed' | 'overview';
export type SUT_PrivateRoomLayoutType = "sender" | "receiver";
export type SUT_OpenMarketLayoutType = "sender" | "parameters";
export type SUT_MarketKeyType = "privateMarket" | "openMarket";
export type SUT_RoomKeyType = "privateRoom" | "openRoom";


//====OpenMarket Specific Types=====
export interface IOpenMarketFilterItem {
  collection: string;
  rarityRank: SUI_RarityRankItem;
}

export interface IOpenMarketAddedAmount {
  usdAmount: number;
  coin: SUI_ChainItem;
}

export interface IOpenRoom {
  uniqueTradeId: string;
  sender: IOpenMarketLayoutSide;
  receiver: IOpenMarketLayoutSide;
  swap: SUI_OpenSwap;
  proposeSwap?: SUI_OpenSwap;
  swapEncodedMsg: string;
  sign: string;
  nftsLength: number;
  swapUpOpenContract: string;
  chainId: number;
  setValuesOnCreateOpenSwapRoom: (tradeId: string) => void;
  setValuesOnProposeOpenSwapRoom: (tradeId: string, swap: SUI_OpenSwap) => void;
  setValuesOnViewSwapRoom: (tradeId: string, swap: SUI_OpenSwap) => void;
  createOpenSwap: (initWalletAddress: string) => void;
  createProposeOpenSwap: (initWalletAddress: string) => void;
  setSwapEncodedMsgAndSign: (swapEncodedBytes: string, sign: string) => void;
  setSwapPreferences: (preferences: SUI_SwapPreferences) => void;
  resetOpenSwapCreationRoom: () => void;
  resetOpenSwapProposeRoom: () => void;
  resetViewSwapRoom: () => void;
}

export interface IOpenMarketLayoutSide {
  activeGridView: SUT_GridViewType;
  toggleGridView: (value: SUT_GridViewType) => void;
  profile: IProfile;
  collections: string[] | [];
  addedAmount?: IOpenMarketAddedAmount;
  availableChains: SUI_ChainItem[];
  filters?: IOpenMarketFilterItem;
  nfts?: SUI_NFTItem[];
  filteredNfts?: SUI_NFTItem[];
  nftsSelectedForSwap: SUI_NFTItem[] | [];
  setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => void;
  setFilteredNftsBySearch: (searchValue: string) => void;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => void;
  setAddedAmount: (selectedAmount: string, selectedCoin: string) => void;
  setNftsDataset: (selectedNfts: SUI_NFTItem[]) => void;
  setFilteredNftsBySwapTokens: (selectedNfts: SUI_NFTItem[]) => void;
  removeAllFilters: () => void;
}

//====================================



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
  profile: IProfile;
  collections: string[] | [];
  addedAmount?: IAddedAmount;
  availableChains: SUI_ChainItem[];
  filters?: IPrivateRoomFilterItem;
  nfts?: SUI_NFTItem[];
  filteredNfts?: SUI_NFTItem[];
  nftsSelectedForSwap: SUI_NFTItem[] | [];
  setSelectedNftsForSwap: (selectedNfts: SUI_NFTItem[] | []) => void;
  setFilteredNftsBySearch: (searchValue: string) => void;
  setFilteredNftsByFilters: (collectionTitle: string, selectedRarityRank: SUI_RarityRankItem) => void;
  setFilteredNftsBySwapTokens: (selectedNfts: SUI_NFTItem[]) => void;
  setAddedAmount: (selectedAmount: string, selectedCoin: string) => void;
  setNftsDataset: (selectedNfts: SUI_NFTItem[] | []) => void;
  removeAllFilters: (doNotRemoveSelectedNfts?: boolean) => void;
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
  createPrivateMarketSwap: (offer_type: SUT_SwapOfferType,  initWalletAddress: strimg) => void;
  setSwapEncodedMsgAndSign: (swapEncodedBytes: string, sign: string) => void;
  resetPrivateRoom: () => void;
  setValuesOnViewSwapRoom: (tradeId: string, swap: SUI_Swap) => void;
  resetViewSwapRoom: () => void;
}

export interface ISwapMarketStore {
  openMarket: {
    availableSwaps?: SUI_OpenSwap[];
    filteredAvailableSwaps?: SUI_OpenSwap[];
    createdSwaps?: SUI_OpenSwap[];
    pendingSwaps?: SUI_OpenSwap[];
    history?: SUI_OpenSwap[];
    openRoom: IOpenRoom;
    setOpenSwapsData: (swapsData: SUI_OpenSwap[], wallet: IWallet) => void;
    setMyOpenSwapsData: (createdSwaps: SUI_OpenSwap[], wallet: IWallet) => void;
    setFilteredAvailableSwapsBySearch: (searchValue: string) => void;
  },
  privateMarket: {
    availablePrivateSwaps?: SUI_Swap[];
    filteredAvailablePrivateSwaps?: SUI_Swap[];
    pendingSwaps?: SUI_OpenSwap[];
    swapHistory?: SUI_OpenSwap[];
    privateRoom: IPrivateRoom;
    setPendingSwapsData: (pendingswapsData: SUI_OpenSwap[]) => void;
    setSwapHistoryData: (swaphistoryData: SUI_OpenSwap[]) => void;
    setPrivateSwapsData: (swapsData: SUI_Swap[]) => void;
    setFilteredAvailablePrivateSwapsBySearch: (searchValue: string) => void;
  }
}
