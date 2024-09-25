export type SUT_EnvironmentKey = "local" | "dev" | "qa" | "prod";

export interface SUI_ConfigEnvironment {
  API_BASE_URL: string;
  OPENSEA_BASE_URL: string;
  OPENSEA_API_BASE_URL: string;
  OPENSEA_API_KEY: string;
  ETHERSCAN_BASE_URL: string;
  NETWORK: string;
  CHAIN_ID: number;
  SWAPUP_CONTRACT: string;
  THIRDWEB_CLIENT_ID: string;
  COIN_RANKING_API_KEY: string;
  COIN_RANKING_BASE_URL: string;
  NAMESPACE_LISTED_ENS_NAME: string;
  NAMESPACE_API_KEY: string;
  NAMESPACE_API_BASE_URL: string;
  NAMESPACE_OFFCHAIN_API_BASE_URL: string;
  TWITTER_CLIENT_ID: string;
  SWAPUP_TREASURY_WALLET: string;
  NEW_SUBNAME_CHARGES: number;
}
export interface SUI_Config {
  local: SUI_ConfigEnvironment;
  dev: SUI_ConfigEnvironment;
  qa: SUI_ConfigEnvironment;
  prod: SUI_ConfigEnvironment;
}