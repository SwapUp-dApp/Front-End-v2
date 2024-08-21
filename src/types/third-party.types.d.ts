import { SUI_SwapToken } from "./swap-market.types";

export interface SUI_TwitterAuthCodeToAccessTokenReqParams {
  code: string;
  redirectUri: string;
  walletAddress: string;
}

export interface SUI_TwitterUserInformation {
  id: string,
  name: string;
  username: string;
}

export interface SUI_TwitterAccessToken {
  accessToken: string;
  refreshToken: string | undefined;
  expiresIn: number;
  scope: string[];
  createdAt: number;
  userInfo: SUI_TwitterUserInformation;
}

interface SUI_TwitterPostImageProps {
  tradeId: string;
  title: string;
  initTokens: SUI_SwapToken[];
  acceptTokens: SUI_SwapToken[];
}

export interface SUI_CreateTweetOnBehalfOfUserReqParams {
  imageProps: SUI_TwitterPostImageProps;
  mentions: string[];
  hashtags: string[];
  postTitle: string;
  appLink: string;
  postDescription: string;
  walletAddress: string;
}

export interface SUI_TwitterPostLocalStorageState {
  started: boolean,
  tradeId: string;
}