import { useMutation, useQuery } from "@tanstack/react-query";
import { createOpenSwapOffer, createPrivateSwapOffer, getNftsForWallet, getOpenSwapByOpenTradeId, getOpenSwapPendingList, getPendingSwapsForWallet, getPrivateSwapPendingList, getSwapHistoryForWallet, updateSwapOffer } from "../api";
import { SUI_Swap, SUP_CreateOpenSwap, SUP_UpdateSwap } from "@/types/swap-market.types";


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

export const useSwapUpdate = () => {
  return useMutation({
    mutationFn: async (swap: SUP_UpdateSwap) => {
      try {
        const response = await updateSwapOffer(swap);
        return response;
      } catch (error) {
        console.error("Failed to accept swap offer:", error);
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

// Open Market queries
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

export const useOpenSwapsPendingList = () => {
  return useQuery({
    queryKey: ['getNftsForWallet'],
    queryFn: async () => {
      try {
        const response = await getOpenSwapPendingList();
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};


export const usePrivateSwapsPendingList = (walletId: string) => {
  return useQuery({
    queryKey: ['getPendingPrivateSwapsForWallet', walletId],
    queryFn: async () => {
      try {
        const response = await getPrivateSwapPendingList(walletId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useOpenSwapByOpenTradId = (openTradeId: string) => {
  return useQuery({
    queryKey: ['getOpenSwapByOpenTradeId', openTradeId],
    queryFn: async () => {
      try {
        const response = await getOpenSwapByOpenTradeId(openTradeId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};