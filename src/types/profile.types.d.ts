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
    description: string;
    twitter?: string;
    warpcast?: string;
};

export interface IProfile {
    wallet: IWallet;
    ensAddress: string;
    avatar: string,
    isPremium: boolean,
    title: string,
    details?: IProfileDetails;
}
