import { SUI_Config, SUI_ConfigEnvironment, SUT_SwapupEnvironmentId, SUT_SwapupEnvironmentKey } from "./config.types";

const swapupEnvironmentKey: SUT_SwapupEnvironmentKey = import.meta.env.VITE_SWAPUP_ENVIRONMENT_KEY || 'staging';

const config: SUI_Config = {
  local: {
    ENVIRONMENT_KEY: import.meta.env.VITE_LOCAL_ENVIRONMENT_KEY,
    ENVIRONMENT_ID: Number(import.meta.env.VITE_LOCAL_ENVIRONMENT_ID) as SUT_SwapupEnvironmentId,
    API_BASE_URL: import.meta.env.VITE_LOCAL_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_LOCAL_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_LOCAL_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_LOCAL_OPENSEA_API_BASE_URL,
    NETWORK: import.meta.env.VITE_LOCAL_NETWORK,
    CHAIN_ID: import.meta.env.VITE_LOCAL_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_LOCAL_SWAPUP_CONTRACT,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_LOCAL_NAMESPACE_LISTED_ENS_NAME,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_API_BASE_URL: import.meta.env.VITE_NAMESPACE_API_BASE_URL,
    NAMESPACE_API_KEY: import.meta.env.VITE_NAMESPACE_API_KEY,
    NAMESPACE_OFFCHAIN_API_BASE_URL: import.meta.env.VITE_NAMESPACE_OFFCHAIN_API_BASE_URL,
    TWITTER_CLIENT_ID: import.meta.env.VITE_TWITTER_CLIENT_ID,
    SWAPUP_TREASURY_WALLET: import.meta.env.VITE_SWAPUP_TREASURY_WALLET,
    NEW_SUBNAME_CHARGES: Number(import.meta.env.VITE_NEW_SUBNAME_CHARGES),
    SUBSCRIPTION_TOKEN_ADDRESS: import.meta.env.VITE_SUBSCRIPTION_TOKEN_ADDRESS,
    SUBSCRIPTION_CHARGES: Number(import.meta.env.VITE_SUBSCRIPTION_CHARGES),
  },

  development: {
    ENVIRONMENT_KEY: import.meta.env.VITE_DEVELOPMENT_ENVIRONMENT_KEY,
    ENVIRONMENT_ID: Number(import.meta.env.VITE_DEVELOPMENT_ENVIRONMENT_ID) as SUT_SwapupEnvironmentId,
    API_BASE_URL: import.meta.env.VITE_DEVELOPMENT_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_DEVELOPMENT_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_DEVELOPMENT_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_DEVELOPMENT_OPENSEA_API_BASE_URL,
    NETWORK: import.meta.env.VITE_DEVELOPMENT_NETWORK,
    CHAIN_ID: import.meta.env.VITE_DEVELOPMENT_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_DEVELOPMENT_SWAPUP_CONTRACT,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_DEVELOPMENT_NAMESPACE_LISTED_ENS_NAME,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_API_BASE_URL: import.meta.env.VITE_NAMESPACE_API_BASE_URL,
    NAMESPACE_API_KEY: import.meta.env.VITE_NAMESPACE_API_KEY,
    NAMESPACE_OFFCHAIN_API_BASE_URL: import.meta.env.VITE_NAMESPACE_OFFCHAIN_API_BASE_URL,
    TWITTER_CLIENT_ID: import.meta.env.VITE_TWITTER_CLIENT_ID,
    SWAPUP_TREASURY_WALLET: import.meta.env.VITE_SWAPUP_TREASURY_WALLET,
    NEW_SUBNAME_CHARGES: Number(import.meta.env.VITE_NEW_SUBNAME_CHARGES),
    SUBSCRIPTION_TOKEN_ADDRESS: import.meta.env.VITE_SUBSCRIPTION_TOKEN_ADDRESS,
    SUBSCRIPTION_CHARGES: Number(import.meta.env.VITE_SUBSCRIPTION_CHARGES),
  },

  staging: {
    ENVIRONMENT_KEY: import.meta.env.VITE_STAGING_ENVIRONMENT_KEY,
    ENVIRONMENT_ID: Number(import.meta.env.VITE_STAGING_ENVIRONMENT_ID) as SUT_SwapupEnvironmentId,
    API_BASE_URL: import.meta.env.VITE_STAGING_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_STAGING_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_STAGING_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_STAGING_OPENSEA_API_BASE_URL,
    NETWORK: import.meta.env.VITE_STAGING_NETWORK,
    CHAIN_ID: import.meta.env.VITE_STAGING_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_STAGING_SWAPUP_CONTRACT,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_STAGING_NAMESPACE_LISTED_ENS_NAME,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_API_BASE_URL: import.meta.env.VITE_NAMESPACE_API_BASE_URL,
    NAMESPACE_API_KEY: import.meta.env.VITE_NAMESPACE_API_KEY,
    NAMESPACE_OFFCHAIN_API_BASE_URL: import.meta.env.VITE_NAMESPACE_OFFCHAIN_API_BASE_URL,
    TWITTER_CLIENT_ID: import.meta.env.VITE_TWITTER_CLIENT_ID,
    SWAPUP_TREASURY_WALLET: import.meta.env.VITE_SWAPUP_TREASURY_WALLET,
    NEW_SUBNAME_CHARGES: Number(import.meta.env.VITE_NEW_SUBNAME_CHARGES),
    SUBSCRIPTION_TOKEN_ADDRESS: import.meta.env.VITE_SUBSCRIPTION_TOKEN_ADDRESS,
    SUBSCRIPTION_CHARGES: Number(import.meta.env.VITE_SUBSCRIPTION_CHARGES),
  },

  production: {
    ENVIRONMENT_KEY: import.meta.env.VITE_PRODUCTION_ENVIRONMENT_KEY,
    ENVIRONMENT_ID: Number(import.meta.env.VITE_PRODUCTION_ENVIRONMENT_ID) as SUT_SwapupEnvironmentId,
    API_BASE_URL: import.meta.env.VITE_PRODUCTION_API_BASE_URL,
    ETHERSCAN_BASE_URL: import.meta.env.VITE_PRODUCTION_ETHERSCAN_BASE_URL,
    OPENSEA_BASE_URL: import.meta.env.VITE_PRODUCTION_OPENSEA_BASE_URL,
    OPENSEA_API_BASE_URL: import.meta.env.VITE_PRODUCTION_OPENSEA_API_BASE_URL,
    NETWORK: import.meta.env.VITE_PRODUCTION_NETWORK,
    CHAIN_ID: import.meta.env.VITE_PRODUCTION_CHAIN_ID,
    SWAPUP_CONTRACT: import.meta.env.VITE_PRODUCTION_SWAPUP_CONTRACT,
    NAMESPACE_LISTED_ENS_NAME: import.meta.env.VITE_PRODUCTION_NAMESPACE_LISTED_ENS_NAME,
    OPENSEA_API_KEY: import.meta.env.VITE_OPENSEA_API_KEY,
    THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
    COIN_RANKING_API_KEY: import.meta.env.VITE_COIN_RANKING_API_KEY,
    COIN_RANKING_BASE_URL: import.meta.env.VITE_COIN_RANKING_BASE_URL,
    NAMESPACE_API_BASE_URL: import.meta.env.VITE_NAMESPACE_API_BASE_URL,
    NAMESPACE_API_KEY: import.meta.env.VITE_NAMESPACE_API_KEY,
    NAMESPACE_OFFCHAIN_API_BASE_URL: import.meta.env.VITE_NAMESPACE_OFFCHAIN_API_BASE_URL,
    TWITTER_CLIENT_ID: import.meta.env.VITE_TWITTER_CLIENT_ID,
    SWAPUP_TREASURY_WALLET: import.meta.env.VITE_SWAPUP_TREASURY_WALLET,
    NEW_SUBNAME_CHARGES: Number(import.meta.env.VITE_NEW_SUBNAME_CHARGES),
    SUBSCRIPTION_TOKEN_ADDRESS: import.meta.env.VITE_SUBSCRIPTION_TOKEN_ADDRESS,
    SUBSCRIPTION_CHARGES: Number(import.meta.env.VITE_SUBSCRIPTION_CHARGES),
  },
};

export const Environment: SUI_ConfigEnvironment = config[swapupEnvironmentKey];
