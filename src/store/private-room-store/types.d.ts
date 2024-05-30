import { IPrivateRoomState } from "@/swapup-types";

export interface IPrivateRoomFilterItem {
  collection: string;
  rarityRank: string;
}

export interface IPrivateRoomStoreState {
  uniqueTradeId: string;
  sender: IPrivateRoomState;
  receiver: IPrivateRoomState;
}