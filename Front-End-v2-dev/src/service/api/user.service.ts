import { AxiosResponse } from "axios";
import API from "../Axios";

export const createUserByWalletIdApi = (walletId: string): Promise<AxiosResponse> =>
  API.post(`/api/user/create/${walletId}`);

export const getUsersListApi = (): Promise<AxiosResponse> =>
  API.post(`/api/user/list`);

export const getUserTwitterAccessApi = (walletId: string): Promise<AxiosResponse> =>
  API.get(`/api/user/twitter-access/${walletId}`);
