import { SUI_Config, SUI_ConfigEnvironment, SUT_EnvironmentKey } from "./config.types";

const environmentKey: SUT_EnvironmentKey = import.meta.env.VITE_ENVIRONMENT;

const config: SUI_Config = {
  local: {
    API_BASE_URL: import.meta.env.VITE_LOCAL_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_LOCAL_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_LOCAL_OPENSEA_BASE_URL,
    NETWORK: import.meta.env.VITE_LOCAL_NETWORK,
    CHAIN_ID: import.meta.env.VITE_LOCAL_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
  },

  dev: {
    API_BASE_URL: import.meta.env.VITE_DEV_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_DEV_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_DEV_OPENSEA_BASE_URL,
    NETWORK: import.meta.env.VITE_DEV_NETWORK,
    CHAIN_ID: import.meta.env.VITE_DEV_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
  },

  qa: {
    API_BASE_URL: import.meta.env.VITE_QA_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_QA_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_QA_OPENSEA_BASE_URL,
    NETWORK: import.meta.env.VITE_QA_NETWORK,
    CHAIN_ID: import.meta.env.VITE_QA_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
  },

  prod: {
    API_BASE_URL: import.meta.env.VITE_PROD_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_PROD_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_PROD_OPENSEA_BASE_URL,
    NETWORK: import.meta.env.VITE_PROD_NETWORK,
    CHAIN_ID: import.meta.env.VITE_PROD_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_SWAPUP_CONTRACT,
  },
};

export const Environment: SUI_ConfigEnvironment = config[environmentKey];
