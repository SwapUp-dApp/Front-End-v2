import { SUI_Config, SUI_ConfigEnvironment, SUT_EnvironmentKey } from "./config.types";

const environmentKey: SUT_EnvironmentKey = import.meta.env.VITE_ENVIRONMENT;

const config: SUI_Config = {
  local: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://sepolia.etherscan.io",
    OPENSEA_BASE_URL: "https://testnets.opensea.io",
    NETWORK: "sepolia"
  },

  dev: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://sepolia.etherscan.io",
    OPENSEA_BASE_URL: "https://testnets.opensea.io",
    NETWORK: "sepolia"
  },

  qa: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://sepolia.etherscan.io",
    OPENSEA_BASE_URL: "https://testnets.opensea.io",
    NETWORK: "sepolia"
  },

  prod: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://etherscan.io",
    OPENSEA_BASE_URL: "https://opensea.io",
    NETWORK: "ethereum"
  },
};


export const Environment: SUI_ConfigEnvironment = config[environmentKey];