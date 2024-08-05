import { SUI_Config, SUI_ConfigEnvironment, SUT_EnvironmentKey } from "./config.types";

const environmentKey: SUT_EnvironmentKey = import.meta.env.VITE_ENVIRONMENT;

const config: SUI_Config = {
  local: {
    API_BASE_URL: import.meta.env.VITE_LOCAL_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_LOCAL_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_LOCAL_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_LOCAL_OPENSEA_API_BASE_URL,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    NETWORK: import.meta.env.VITE_LOCAL_NETWORK,
    CHAIN_ID: import.meta.env.VITE_LOCAL_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_LOCAL_NAMESPACE_LISTED_ENS_NAME
  },

  dev: {
    API_BASE_URL: import.meta.env.VITE_DEV_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_DEV_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_DEV_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_DEV_OPENSEA_API_BASE_URL,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    NETWORK: import.meta.env.VITE_DEV_NETWORK,
    CHAIN_ID: import.meta.env.VITE_DEV_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_DEV_NAMESPACE_LISTED_ENS_NAME
  },

  qa: {
    API_BASE_URL: import.meta.env.VITE_QA_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_QA_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_QA_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_QA_OPENSEA_API_BASE_URL,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    NETWORK: import.meta.env.VITE_QA_NETWORK,
    CHAIN_ID: import.meta.env.VITE_QA_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_QA_NAMESPACE_LISTED_ENS_NAME
  },

  prod: {
    API_BASE_URL: import.meta.env.VITE_PROD_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_PROD_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_PROD_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_PROD_OPENSEA_API_BASE_URL,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    NETWORK: import.meta.env.VITE_PROD_NETWORK,
    CHAIN_ID: import.meta.env.VITE_PROD_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_PROD_NAMESPACE_LISTED_ENS_NAME
  },
};

export const Environment: SUI_ConfigEnvironment = config[environmentKey];
