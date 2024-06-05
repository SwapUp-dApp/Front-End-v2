export type SUT_EnvironmentKey = "local" | "dev" | "qa" | "prod";

export interface SUI_ConfigEnvironment {
  API_BASE_URL: string;
}
export interface SUI_Config {
  local: SUI_ConfigEnvironment;
  dev: SUI_ConfigEnvironment;
  qa: SUI_ConfigEnvironment;
  prod: SUI_ConfigEnvironment;
}