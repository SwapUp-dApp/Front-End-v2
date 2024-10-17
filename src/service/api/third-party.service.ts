import axios, { AxiosResponse } from "axios";
import { Environment } from "@/config";
import { SUI_CheckSubnameAvailabilityParams, SUI_MintNewOffchainSubnameRequestParams, SUI_MintParamsRequest } from "@/types/profile.types";

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

// Opensea api
const openseaApi = axios.create({
  baseURL: Environment.OPENSEA_API_BASE_URL,
  headers: { accept: 'application/json', 'x-api-key': Environment.OPENSEA_API_KEY },
});

openseaApi.interceptors.response.use(
  response => response,
  error => {
    console.log(
      "Error in Response Interceptor:",
      JSON.stringify(error?.response || error?.message),
    );
    return Promise.reject(error);
  }
);

export const getAvailableCollectionsApi = (): Promise<AxiosResponse> => {
  const chain = Environment.NETWORK.replace("-", "_");
  return openseaApi.get(`/api/v2/collections?chain=${chain}`);
};


// Namespace APIs for Minting L1 subname --- Starts here
const namespaceApi = axios.create({
  baseURL: Environment.NAMESPACE_API_BASE_URL,
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Environment.NAMESPACE_API_KEY}` },
});

namespaceApi.interceptors.response.use(
  response => response,
  error => {
    console.log(
      "Error in Response Interceptor:",
      JSON.stringify(error?.response || error?.message),
    );
    return Promise.reject(error);
  }
);

export const mintSubnameApi = (mintParams: SUI_MintParamsRequest): Promise<AxiosResponse> => {
  return namespaceApi.post(`/api/v1/mint`, mintParams);
};

export const checkSubnameAvailabilityApi = (availabilityParams: SUI_CheckSubnameAvailabilityParams): Promise<AxiosResponse> => {
  return namespaceApi.get(`/api/v1/listings/available`, { params: availabilityParams });
};
// Namespace APIs for Minting L1 subname --- Ends here



// Namespace Offchain APIs for Minting L2 subname --- starts here

const namespaceOffchainApi = axios.create({
  baseURL: Environment.NAMESPACE_OFFCHAIN_API_BASE_URL,
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Environment.NAMESPACE_API_KEY}` },
});

namespaceOffchainApi.interceptors.response.use(
  response => response,
  error => {
    console.log(
      "Error in Response Interceptor:",
      JSON.stringify(error?.response || error?.message),
    );
    return Promise.reject(error);
  }
);

export const mintOffchainSubnameApi = (mintParams: SUI_MintNewOffchainSubnameRequestParams): Promise<AxiosResponse> => {
  return namespaceOffchainApi.post(`/v1/subname/mint`, mintParams);
};

export const checkOffchainSubnameAvailabilityApi = (subnameLabel: string, listedDomain: string): Promise<AxiosResponse> => {
  return namespaceOffchainApi.get(`/v1/subname/availability/${subnameLabel}/${listedDomain}`);
};

export const resolveOffChainSubnameByWalletIdApi = (walletId: string): Promise<AxiosResponse> => {
  return namespaceOffchainApi.get(`/v1/subname/resolution/${walletId}/60`);
};

export const deleteOffChainSubnameApi = (label: string, domain: string): Promise<AxiosResponse> => {
  return namespaceOffchainApi.delete(`/v1/subname/${label}/${domain}`);
};

// Namespace Offchain APIs for Minting L2 subname --- Ends here