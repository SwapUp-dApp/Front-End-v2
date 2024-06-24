import { useMutation, useQuery } from "@tanstack/react-query";
import { createOpenSwapOffer, createPrivateSwapOffer, getPendingSwapList, getNftsForWallet, getOpenSwapByOpenTradeId, getOpenSwapPendingList, getSwapHistoryList, getPendingSwapsForWallet, getPrivateSwapPendingList, getSwapHistoryForWallet, completeOpenSwapOffer, proposeSwap, getSwapDetails, completePrivateSwapOffer } from "../api";
import { SUI_OpenSwap, SUI_Swap, SUP_CreateOpenSwap, SUP_CompleteSwap } from "@/types/swap-market.types";


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

export const useCompleteOpenSwapOffer = () => {
  return useMutation({
    mutationFn: async (swap: SUP_CompleteSwap) => {
      try {
        const response = await completeOpenSwapOffer(swap);
        return response;
      } catch (error) {
        console.error("Failed to complete open swap:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error occurred during mutation:", error);
    },
    onSuccess: (data) => {
      console.log("Open Swap completed successfully:", data);
    },
  });
};

export const useCompletePrivateSwapOffer = () => {
  return useMutation({
    mutationFn: async (swap: SUP_CompleteSwap) => {
      try {
        const response = await completePrivateSwapOffer(swap);
        return response;
      } catch (error) {
        console.error("Failed to complete private swap:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error occurred during mutation:", error);
    },
    onSuccess: (data) => {
      console.log("Private Swap completed successfully:", data);
    },
  });
};

// export const useSwapUpdate = () => {
//   return useMutation({
//     mutationFn: async (swap: SUP_CompleteSwap) => {
//       try {
//         const response = await updateSwapOffer(swap);
//         return response;
//       } catch (error) {
//         console.error("Failed to accept swap offer:", error);
//         throw error;
//       }
//     },
//     onError: (error) => {
//       console.error("Error occurred during mutation:", error);
//     },
//     onSuccess: (data) => {
//       console.log("Swap offer created successfully:", data);
//     },
//   });
// };

export const useGetSwapDetails = (tradeId: string) => {
  return useQuery({
    queryKey: ['useGetSwapDetails', tradeId],
    queryFn: async () => {
      try {
        const response = await getSwapDetails(tradeId);
        return response;
      } catch (error) {
        throw error;
      }
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

export const useProposeOpenSwapOffer = () => {
  return useMutation({
    mutationFn: async (swap: SUI_OpenSwap) => {
      try {
        const response = await proposeSwap(swap);
        return response;
      } catch (error) {
        console.error("Failed to propose swap offer:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error occurred during propose open swap:", error);
    },
    onSuccess: (data) => {
      console.log("Swap offer proposed successfully:", data);
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

//for my swap view
export const usePendingSwapsList = (walletId: string) => {
  return useQuery({
    queryKey: ['getPendingSwapsForWallet', walletId],
    queryFn: async () => {
      try {
        const response = await getPendingSwapList(walletId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};

export const useSwapHistoryList = (walletId: string) => {
  return useQuery({
    queryKey: ['getSwapHistoryForWallet', walletId],
    queryFn: async () => {
      try {
        const response = await getSwapHistoryList(walletId);
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