import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { Environment } from "@/config";
import { defaultNftImageFallbackURL } from "@/constants";

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


export const generateRandomTradeId = (length: number = 7): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const getEtherScanContractNftUrl = (token: string, nftId: string) => {
  const baseUrl = Environment.ETHERSCAN_BASE_URL;
  return `${baseUrl}/token/${token}?a=${nftId}`;
};

export const getOpenSeaNftUrl = (token: string, nftId: string) => {
  const baseUrl = Environment.OPENSEA_BASE_URL;
  const network = Environment.NETWORK;

  return `${baseUrl}/assets/${network}/${token}/${nftId}`;
};

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': '54b84c30c5msh0e4a7ee7fa87fc2p1e8e3ajsn27e01700ad9c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

export const getCoinsData = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const isValidWalletAddress = (address: string) => {
  const regex = /^0x[0-9a-fA-F]{40}$/;
  return regex.test(address);
};

export const getDefaultNftImageOnError = (e: any) => {
  e.currentTarget.src = defaultNftImageFallbackURL;
};