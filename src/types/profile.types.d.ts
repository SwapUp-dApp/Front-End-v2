import { SUI_CurrencyChainItem } from "./global.types";

export interface INetwork {
    id: string;
    name: string;
    symbol: string;
    iconUrl: string;
};

export interface IWallet {
    isConnected: boolean;
    address: string;
    network: INetwork;
}

export interface IProfileDetails {
    title: string,
    description: string;
    twitter?: string;
    warpcast?: string;
};

export interface IProfile {
    wallet: IWallet;
    ensAddress: string;
    avatar: string,
    coverImage: string;
    isPremium: boolean,
    joinDate: string;
    details?: IProfileDetails;
}


export interface SUI_TokenDistributionPerChainChartItem {
    key: string,
    network: SUI_TokenDistributionPerChainChartItemNetwork;
    totalPercentage: number;
    tradePercentage: { available: number, openTrade: number; };
}

interface SUI_TokenDistributionPerChainChartItemNetwork extends Pick<SUI_CurrencyChainItem, "iconUrl" | "name" | "symbol"> { }