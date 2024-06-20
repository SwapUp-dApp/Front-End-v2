import { AxiosResponse } from "axios";
import API from "../Axios";
import { SUI_Swap, SUI_OpenSwap, SUP_CreateOpenSwap } from "@/types/swap-market.types";

export const getNftsForWallet = (walletId: string): Promise<AxiosResponse> => {
  return API.get(`/api/nfts/${walletId}`);
};

export const getPendingSwapsForWallet = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/pending/?address=${walletId}`);

export const getSwapHistoryForWallet = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/history/?address=${walletId}`);

export const getSwapDetails = (swapId: string, walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps?swapId=${swapId}&walletId=${walletId}`);

export const createPrivateSwapOffer = (swap: SUI_Swap): Promise<AxiosResponse> =>
  API.post('/api/swaps/', swap);

export const updateSwapOffer = (swap: any): Promise<AxiosResponse> =>
  API.put('/api/swaps/', swap);

export const updateSwapStatus = (swapStatus: any): Promise<AxiosResponse> =>
  API.patch('/api/swaps/status', swapStatus);

export const getPrivateSwapPendingList = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/private-swaplist/?address=${walletId}`);

//open swap
export const createOpenSwapOffer = (swap: SUP_CreateOpenSwap): Promise<AxiosResponse> =>
  API.post('/api/openswap/create', swap);

export const getOpenSwapPendingList = (): Promise<AxiosResponse> =>
  API.get(`/api/openswap/list`);

export const getOpenSwapByOpenTradeId = (openTradeId: string): Promise<AxiosResponse> =>
  API.get(`/api/openswap/get-swap-by-id/?open_trade_id=${openTradeId}`);

export const proposeSwap = (swap: SUI_OpenSwap): Promise<AxiosResponse> =>
  API.post(`/api/openswap/propose`, swap);

export const closeSwapOffer = (swap: any): Promise<AxiosResponse> =>
  API.patch(`/api/openswap/close-offers`, swap);

export const acceptSwapOffer = (tradeId: string, opentradeId: string): Promise<AxiosResponse> =>
  API.patch(`/api/openswap/accept?swapId=${tradeId}&walletId=${opentradeId}`);