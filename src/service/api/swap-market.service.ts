import { AxiosResponse } from "axios";
import API from "../Axios";
import { SUI_Swap, SUI_OpenSwap, SUP_CreateOpenSwap, SUP_CompleteSwap } from "@/types/swap-market.types";

export const getNftsForWallet = (walletId: string): Promise<AxiosResponse> => {
  return API.get(`/api/nfts/${walletId}`);
};

export const getPendingSwapsForWallet = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/pending/?address=${walletId}`);

export const getSwapHistoryForWallet = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/history/?address=${walletId}`);

export const getSwapDetails = (tradeId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/get-swap-details/?trade_id=${tradeId}`);

export const createPrivateSwapOffer = (swap: SUI_Swap): Promise<AxiosResponse> =>
  API.post('/api/swaps/', swap);

export const completeSwapOffer = (swap: SUI_Swap): Promise<AxiosResponse> =>
  API.post('/api/swaps/', swap);

export const completePrivateSwapOffer = (swap: SUP_CompleteSwap): Promise<AxiosResponse> =>
  API.patch('/api/swaps/accept', swap);



export const updateSwapStatus = (swapStatus: any): Promise<AxiosResponse> =>
  API.patch('/api/swaps/status', swapStatus);

export const getPrivateSwapPendingList = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/private-swaplist/?address=${walletId}`);

//for my swaps view
export const getPendingSwapList = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/pendingswaps/?address=${walletId}`);

export const getSwapHistoryList = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/swapshistory/?address=${walletId}`);

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

export const completeOpenSwapOffer = (swap: SUP_CompleteSwap): Promise<AxiosResponse> =>
  API.patch(`/api/openswap/accept`, swap);

export const acceptSwapOffer = (tradeId: string, opentradeId: string): Promise<AxiosResponse> =>
  API.patch(`/api/openswap/accept?swapId=${tradeId}&walletId=${opentradeId}`);