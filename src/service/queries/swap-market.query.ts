import { useMutation, useQuery } from "@tanstack/react-query";
import { createSwapOffer, getNftsForWallet } from "../api";
import { SUI_Swap } from "@/types/swap-market.types";

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


export const useCreateSwapOffer = () => {
  return useMutation({
    mutationFn: async (swap: SUI_Swap) => {
      try {
        const response = await createSwapOffer(swap);
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