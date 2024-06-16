import { useMutation, useQuery } from "@tanstack/react-query";
import { createOpenSwapOffer, createPrivateSwapOffer, getNftsForWallet, getPendingSwapsForWallet, getSwapHistoryForWallet } from "../api";
import { SUI_OpenSwap, SUI_Swap, SUP_CreateOpenSwap } from "@/types/swap-market.types";


export const getWalletSwapHistory = (walletId: string) => {
  return useQuery({
    queryKey: ['getSwapHistoryForWallet', walletId],
    queryFn: async () => {
      try {
        const response = await getSwapHistoryForWallet(walletId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const getWalletPendingSwaps = (walletId: string) => {
  return useQuery({
    queryKey: ['getPendingSwapsForWallet', walletId],
    queryFn: async () => {
      try {
        const response = await getPendingSwapsForWallet(walletId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useNFTsByWallet = (walletId: string) => {
  return useQuery({
    queryKey: ['getNftsForWallet', walletId],
    queryFn: async () => {
      try {
        const response = await getNftsForWallet(walletId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};


export const useCreatePrivateSwapOffer = () => {
  return useMutation({
    mutationFn: async (swap: SUI_Swap) => {
      try {
        const response = await createPrivateSwapOffer(swap);
        return response;
      } catch (error) {
        console.error("Failed to create swap offer:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error occurred during mutation:", error);
    },
    onSuccess: (data) => {
      console.log("Swap offer created successfully:", data);
    },
  });
};

export const useCreateOpenSwapOffer = () => {
  return useMutation({
    mutationFn: async (swap: SUP_CreateOpenSwap) => {
      try {
        const response = await createOpenSwapOffer(swap);
        return response;
      } catch (error) {
        console.error("Failed to create swap offer:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error occurred during mutation:", error);
    },
    onSuccess: (data) => {
      console.log("Swap offer created successfully:", data);
    },
  });
};