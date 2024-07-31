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

export interface SUI_TokenBreakdownChartItem extends Pick<SUI_TokenDistributionPerChainChartItem, "key" | "network" | "totalPercentage"> {
    usdAmount: number;
}

interface SUI_TokenDistributionPerChainChartItemNetwork extends Pick<SUI_CurrencyChainItem, "iconUrl" | "name" | "symbol"> { }

export interface SUI_CollectionOwnedItem {
    id: string;
    cover: string;
    collectionName: string;
    assets: number;
    floorPrice: number;
    highestRankNft: number;
    volume: number;
    openApproval: boolean;
}

export interface SUI_SubnameItem {
    id: string;
    subname: string;
    ownerAddress: string;
    manager: string;
    parent: string;
    expiry: string;
    isPrimary: boolean;
}

export interface SUI_SubnameRecordTextItem {
    id: string;
    title: string;
    iconURL: string;
    text: string;
}

export interface SUI_SubnameRecordAddressItem extends Pick<SUI_CurrencyChainItem, "iconUrl" | "symbol" | "name" | "uuid"> {
    address: string;
}