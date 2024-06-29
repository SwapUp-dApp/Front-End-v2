import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { Environment } from "@/config";
import { chainsDataset } from "@/constants/data";
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { defaults } from "@/constants/defaults";
import { SUI_RarityRankItem } from "@/types/global.types";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyThemeClass = (theme: 'dark' | 'light' | 'system') => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme
  );
};

export const getIsActiveNav = (path: string, pathname: string) => {
  return pathname.toLowerCase().startsWith(path.toLowerCase());
};

export const getActiveTabFromPathname = (pathname: string): string => {
  const parts = pathname.split('/').filter(part => part !== '');
  return parts.length > 0 ? parts[parts.length - 1] : '';
};

export const isValidTradeId = (tradeId: string): boolean => {
  return uuidValidate(tradeId);
};

export const getNameInitials = (name = '') => {
  const nameWords = name.split(' ');
  return `${nameWords[0].charAt(0)}${nameWords[nameWords.length - 1].charAt(0)}`;
};

export const getShortenWalletAddress = (address: string) => {
  if (!address || address.length < 12) {
    return address;
  }

  const firstPart = address.slice(0, 6);
  const lastPart = address.slice(-5);

  return `${firstPart}...${lastPart}`;
};

export const getLastCharacters = (value: string, lastCharacters: number) => {
  return value.slice(value.length - lastCharacters);
};


export const generateRandomTradeId = (): string => {
  return uuidv4();
};
export const generateRandomKey = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const getEtherScanContractNftUrl = (token: string, nftId: string) => {
  const baseUrl = Environment.ETHERSCAN_BASE_URL;
  return `${baseUrl}/token/${token}?a=${nftId}`;
};

export const getEtherScanTransactionURL = (tx: string) => {
  const baseUrl = Environment.ETHERSCAN_BASE_URL;
  return `${baseUrl}/tx/${tx}`;
};

export const getOpenSeaNftUrl = (token: string, nftId: string) => {
  const baseUrl = Environment.OPENSEA_BASE_URL;
  const network = Environment.NETWORK;

  return `${baseUrl}/assets/${network}/${token}/${nftId}`;
};

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'X-RapidAPI-Key': '54b84c30c5msh0e4a7ee7fa87fc2p1e8e3ajsn27e01700ad9c',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//   }
// };

// export const getCoinsData = async () => {
//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const isValidWalletAddress = (address: string) => {
  const regex = /^0x[0-9a-fA-F]{40}$/;
  return regex.test(address);
};

export const getDefaultNftImageOnError = (e: any) => {
  e.currentTarget.src = defaults.fallback.nftImageUrl;
};

export const resolveAssetPath = (path: string) => {
  return `/${path}`; // Assuming assets are under /public directory
};

export const getNetworkImageById = (id: string) => {
  const network = chainsDataset.find(chain => chain.uuid === id);

  if (network) {
    return network.iconUrl;
  }

  return "/assets/svgs/ethereum.svg";
};


export const compareRarityRankItems = (item1: SUI_RarityRankItem, item2: SUI_RarityRankItem) => {
  return item1.from === item2.from && item1.to === item2.to;
};

export const getNormalizeAndCompareTwoStrings = (str1: string, str2: string) => {
  const normalize = (str: string) => str.replace(/[\s\-_.]/g, '').toLowerCase();
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);

  return normalizedStr1 === normalizedStr2;
};


export const checkIsDateInRange = (dateToCheck: string, dateRangeFrom: string, dateRangeTo: string) => {
  const dateToCheckUTC = moment.utc(dateToCheck);
  const dateRangeFromUTC = moment.utc(dateRangeFrom);
  const dateRangeToUTC = moment.utc(dateRangeTo);

  return dateToCheckUTC.isSameOrAfter(dateRangeFromUTC) && dateToCheckUTC.isSameOrBefore(dateRangeToUTC);
};