export type SUT_PurchaseType = "subname-purchase" | "crypto-purchase";

export interface SUI_PurchaseData {
  purchaseType: SUT_PurchaseType;
  details: {
    subname?: SUI_PurchaseSubnameInfo;
    crypto?: SUI_PurchaseCryptoInfo;
  };
}

export interface SUI_PurchaseSubnameInfo {
  buyerAddress: string;
  subnameLabel: string;
  domain: string;
  message: string;
}

export interface SUI_PurchaseCryptoInfo extends Pick<SUI_PurchaseSubnameInfo, 'message'> {
}