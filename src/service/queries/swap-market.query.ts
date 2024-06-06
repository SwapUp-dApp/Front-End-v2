import { useQuery } from "@tanstack/react-query";
import { getNftsForWallet } from "../api";

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