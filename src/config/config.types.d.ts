export type SUT_EnvironmentKey = "local" | "dev" | "qa" | "prod";

export interface SUI_ConfigEnvironment {
  API_BASE_URL: string;
  OPENSEA_BASE_URL: string;
  ETHERSCAN_BASE_URL: string;
  NETWORK: string;
  CHAIN_ID: number;
  SWAPUP_CONTRACT: string;
  THIRDWEB_CLIENT_ID: string;
}
export interface SUI_Config {
  local: SUI_ConfigEnvironment;
  dev: SUI_ConfigEnvironment;
  qa: SUI_ConfigEnvironment;
  prod: SUI_ConfigEnvironment;
}