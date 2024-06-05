import { useQuery } from "@tanstack/react-query";
import { getNftsForWallet } from "../api";

export const useNFTsByWallet = (walletId: string) =>
  useQuery({
    queryKey: ['getNftsForWallet', walletId],
    queryFn: async () => await getNftsForWallet(walletId)
  });
