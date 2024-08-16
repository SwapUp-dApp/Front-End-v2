export interface SUI_TwitterAuthCodeToAccessTokenReqParams {
  code: string;
  redirectUri: string;
}

export interface SUI_TwitterAuthCodeToAccessTokenResponse {
  accessToken: string;
  refreshToken: string | undefined;
  expiresIn: number;
  scope: string[];
  createdAt: number;
}

export interface SUI_CreateTweetOnBehalfOfUserReqParams extends Pick<SUI_TwitterAuthCodeToAccessTokenResponse, "accessToken" | "createdAt" | "expiresIn" | "refreshToken"> {
  image: string;
  mentions: string[];
  hashtags: string[];
  postTitle: string;
  appLink: string;
  postDescription: string;
}