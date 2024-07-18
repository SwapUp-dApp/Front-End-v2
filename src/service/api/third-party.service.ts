import axios, { AxiosResponse } from "axios";
import { Environment } from "@/config";

const coinRankingAPI = axios.create({
  baseURL: Environment.COIN_RANKING_BASE_URL,
  headers: { "Content-Type": "application/json", "x-access-token": Environment.COIN_RANKING_API_KEY },
});

coinRankingAPI.interceptors.response.use(
  response => response,
  error => {
    console.log(
      "Error in Response Interceptor:",
      JSON.stringify(error?.response || error?.message),
    );
    return Promise.reject(error);
  }
);

export const getAvailableCurrenciesApi = (blockchains: string = "ethereum"): Promise<AxiosResponse> => {
  return coinRankingAPI.get(`/v2/coins?blockchains[]=${blockchains}&scopeLimit=1000`);
};