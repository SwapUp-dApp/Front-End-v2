import { AxiosResponse } from "axios";
import API from "../Axios";

export const getNftsForWallet = (walletId: string): Promise<AxiosResponse> => {
  return API.get(`/api/nfts/${walletId}`);
};

export const getPendingSwapsForWallet = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/pending/?address=${walletId}`);

export const getSwapHistoryForWallet = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps/history/?address=${walletId}`);

export const getSwapDetails = (swapId: string, walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/swaps?swapId=${swapId}&walletId=${walletId}`);

export const createSwapOffer = (swap: any): Promise<AxiosResponse> =>
  API.post('/api/swaps/', swap);

export const updateSwapOffer = (swap: any): Promise<AxiosResponse> =>
  API.put('/api/swaps/', swap);

export const updateSwapStatus = (swapStatus: any): Promise<AxiosResponse> =>
  API.patch('/api/swaps/status', swapStatus);