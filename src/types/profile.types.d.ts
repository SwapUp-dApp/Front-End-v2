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
