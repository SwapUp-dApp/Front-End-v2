import { SUI_Config, SUI_ConfigEnvironment, SUT_EnvironmentKey } from "./config.types";

const environmentKey: SUT_EnvironmentKey = import.meta.env.VITE_ENVIRONMENT;

const config: SUI_Config = {
  local: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://sepolia.etherscan.io",
    OPENSEA_BASE_URL: "https://testnets.opensea.io",
    // NETWORK: "sepolia",
    // CHAIN_ID: 11155111,
    // SWAPUP_CONTRACT: "0x608ab31e043b78e69a818ce47a145ca40419c362"
    NETWORK: "base-sepolia",
    CHAIN_ID: 84532,
    SWAPUP_CONTRACT: "0xA0D8918D03766f539dF2de9Be3dA62Cae5B421a4"
  },

  dev: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://sepolia.etherscan.io",
    OPENSEA_BASE_URL: "https://testnets.opensea.io",
    NETWORK: "sepolia",
    CHAIN_ID: 11155111,
    SWAPUP_CONTRACT: "0x608ab31e043b78e69a818ce47a145ca40419c362"
  },

  qa: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://sepolia.etherscan.io",
    OPENSEA_BASE_URL: "https://testnets.opensea.io",
    NETWORK: "sepolia",
    CHAIN_ID: 11155111,
    SWAPUP_CONTRACT: "0x608ab31e043b78e69a818ce47a145ca40419c362"
  },

  prod: {
    API_BASE_URL: "http://localhost:8800",
    ETHERSCAN_BASE_URL: "https://etherscan.io",
    OPENSEA_BASE_URL: "https://opensea.io",
    NETWORK: "homestead",
    CHAIN_ID: 1,
    SWAPUP_CONTRACT: "0x608ab31e043b78e69a818ce47a145ca40419c362"
  },
};


export const Environment: SUI_ConfigEnvironment = config[environmentKey];