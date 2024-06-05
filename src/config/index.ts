import { SUI_Config, SUI_ConfigEnvironment, SUT_EnvironmentKey } from "./config.types";

const environmentKey: SUT_EnvironmentKey = import.meta.env.VITE_ENVIRONMENT;

const config: SUI_Config = {
  local: {
    API_BASE_URL: "http://localhost:8800",
  },

  dev: {
    API_BASE_URL: "http://localhost:8800",
  },

  qa: {
    API_BASE_URL: "http://localhost:8800",
  },

  prod: {
    API_BASE_URL: "http://localhost:8800",
  },
};


export const Environment: SUI_ConfigEnvironment = config[environmentKey];