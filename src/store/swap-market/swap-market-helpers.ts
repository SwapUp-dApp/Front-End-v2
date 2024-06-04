// import { IChainItem, INFTItem, IRarityRankItem } from "@/swapup-types";
// import { ISwapMarketStore, SUT_MarketKeyType, SUT_PrivateRoomLayoutType, SUT_RoomKeyType } from "./swap-market-types";



// // Private Room Helper functions start here

// export const setFilteredNftsBySearchHelper = (
//   state: ISwapMarketStore,
//   marketKey: SUT_MarketKeyType,
//   roomKey: SUT_RoomKeyType,
//   roomSideKey: SUT_PrivateRoomLayoutType,
//   searchValue: string
// ): ISwapMarketStore => {
//   const lowerCaseSearchValue = searchValue.toLowerCase();

//   return {
//     ...state,
//     [marketKey]: {
//       ...state[marketKey],
//       [roomKey]: {
//         ...state[marketKey][roomKey],
//         [roomKey]: {
//           [roomSideKey]: {
//             ...state[marketKey][roomKey][roomSideKey],
//             filteredNfts: searchValue
//               ? state[marketKey][roomKey][roomSideKey].nfts?.filter((nft) =>
//                 nft.id.toLowerCase().includes(lowerCaseSearchValue) ||
//                 nft.title.toLowerCase().includes(lowerCaseSearchValue)
//               )
//               : state[marketKey][roomKey][roomSideKey].nfts,
//           },
//         }
//       }
//     }
//   };
// };

// export const setFilteredNftsByFiltersHelper = (
//   state: ISwapMarketStore,
//   marketKey: SUT_MarketKeyType,
//   roomKey: SUT_RoomKeyType,
//   roomSideKey: SUT_PrivateRoomLayoutType,
//   collectionTitle: string,
//   selectedRarityRank: IRarityRankItem
// ): ISwapMarketStore => {
//   const lowerCaseCollectionTitle = collectionTitle.toLowerCase();

//   let filteredNfts: INFTItem[] | undefined = [];

//   if (collectionTitle && selectedRarityRank) {
//     filteredNfts = state[roomSideKey].nfts?.filter((nft) =>
//       nft.collection.toLowerCase().includes(lowerCaseCollectionTitle) &&
//       (nft.rarityRank >= selectedRarityRank.from && nft.rarityRank <= selectedRarityRank.to));
//   }

//   return {
//     ...state,
//     [roomSideKey]: {
//       ...state[roomSideKey],
//       filteredNfts: (filteredNfts && filteredNfts?.length > 0) ? filteredNfts : [],
//       filters: {
//         collection: collectionTitle,
//         rarityRank: {
//           from: selectedRarityRank.from,
//           to: selectedRarityRank.to
//         }
//       }
//     },
//   };
// };

// export const removeAllFiltersHelper = (
//   state: ISwapMarketStore,
//   marketKey: SUT_MarketKeyType,
//   roomKey: SUT_RoomKeyType,
//   roomSideKey: SUT_PrivateRoomLayoutType,
// ) => {
//   return ({
//     ...state,
//     [roomSideKey]: {
//       ...state[roomSideKey],
//       filteredNfts: state[roomSideKey].nfts,
//       filters: undefined
//     }
//   });
// };

// export const setAddedAmountHelper = (
//   state: ISwapMarketStore,
//   marketKey: SUT_MarketKeyType,
//   roomKey: SUT_RoomKeyType,
//   roomSideKey: SUT_PrivateRoomLayoutType,
//   selectedAmount: string,
//   selectedCoin: string
// ): Partial<ISwapMarketStore> => {

//   const coin = state[roomSideKey].availableChains.find(c => c.uuid === selectedCoin);

//   if (!coin) {
//     return state;
//   }

//   return {
//     [roomSideKey]: {
//       ...state[roomSideKey],
//       addedAmount: {
//         usdAmount: parseFloat(selectedAmount),
//         coin
//       }
//     }
//   };
// };

// export const setValuesOnCreatingPrivateRoomHelper = (
//   state: ISwapMarketStore,
//   marketKey: SUT_MarketKeyType,
//   roomKey: SUT_RoomKeyType,
//   roomSideKey: SUT_PrivateRoomLayoutType,
//   counterPartyWalletAddress: string
// ): Partial<ISwapMarketStore> => {

//   return {
//     ...state,
//     uniqueTradeId: tradeId ? tradeId : state.uniqueTradeId,
//     receiver: {
//       ...state.receiver,
//       profile: {
//         ...state.receiver.profile,
//         walletAddress: counterPartyWalletAddress ? counterPartyWalletAddress : state.receiver.profile.walletAddress,
//       }
//     }
//   };
// };