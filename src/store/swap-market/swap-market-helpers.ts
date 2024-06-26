import { SUI_Swap, SUI_OpenSwap, SUI_SwapPreferences, SUT_SwapOfferType, SUI_SwapToken } from "@/types/swap-market.types";
import { IOpenRoom, IPrivateRoom, ISwapMarketStore, SUT_GridViewType } from "./swap-market-store.types";
import { SUI_RarityRankItem, SUI_NFTItem } from "@/types/swapup.types";
import { ethers } from "ethers";
import { SUE_SWAP_MODE } from "@/constants/enums";
import { Environment } from "@/config";
import { chainsDataset } from "@/constants/data";

// Shared Room Helper start
export const toggleGridViewHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
  value: SUT_GridViewType
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          activeGridView: value,
        },
      },
    },
  };
};

export const setSelectedNftsForSwapHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
  selectedNfts: SUI_NFTItem[] | []
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          nftsSelectedForSwap: selectedNfts,
        },
      },
    },
  };
};

export const setFilteredNftsBySearchHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
  searchValue: string
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  const lowerCaseSearchValue = searchValue.toLowerCase();

  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          filteredNfts: searchValue
            ? room[side].nfts?.filter((nft: SUI_NFTItem) =>
              nft.tokenId.toLowerCase().includes(lowerCaseSearchValue) ||
              nft.title.toLowerCase().includes(lowerCaseSearchValue)
            )
            : room[side].nfts,
        },
      },
    },
  };
};

export const setFilteredNftsByFiltersHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
  collectionTitle: string,
  selectedRarityRank: SUI_RarityRankItem
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  const lowerCaseCollectionTitle = collectionTitle.toLowerCase();

  let filteredNfts: SUI_NFTItem[] | undefined = [];

  if (collectionTitle && selectedRarityRank) {
    filteredNfts = room[side].nfts?.filter((nft: SUI_NFTItem) =>
      nft.contract.name.toLowerCase().includes(lowerCaseCollectionTitle) &&
      (nft.rarityRank && (nft.rarityRank >= selectedRarityRank.from && nft.rarityRank <= selectedRarityRank.to))
    );
  }

  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          filteredNfts: (filteredNfts && filteredNfts.length > 0) ? filteredNfts : [],
          filters: {
            collection: collectionTitle,
            rarityRank: {
              from: selectedRarityRank.from,
              to: selectedRarityRank.to
            }
          }
        },
      },
    },
  };
};

export const removeAllFiltersHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          filteredNfts: room[side].nfts,
          filters: undefined,
        },
      },
    },
  };
};

export const setAddedAmountHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
  selectedAmount: string,
  selectedCoin: string
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  const coin = room[side].availableChains.find((c: any) => c.uuid === selectedCoin);

  if (!coin) {
    return state;
  }

  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          addedAmount: {
            usdAmount: parseFloat(selectedAmount),
            coin,
          },
        },
      },
    },
  };
};

export const setNftsDatasetHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',
  dataset: SUI_NFTItem[] | []
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;

  const collections: string[] | [] = [...new Set(dataset.map(item => item.contract.name))];


  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          filteredNfts: dataset.length > 0 ? dataset : [],
          nfts: dataset.length > 0 ? dataset : [],
          collections
        },
      },
    },
  };
};

export const setValuesOnViewSwapRoomHelper = async (
  state: ISwapMarketStore,
  tradeId: string,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  swap: SUI_OpenSwap | SUI_Swap
): Promise<ISwapMarketStore> => {

  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;

  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        uniqueTradeId: tradeId,
        swap,
        sender: {
          ...room.sender,
          addedAmount: {
            usdAmount: 2,
            coin: chainsDataset[1] //static values may need to change in future
          },
          profile: {
            ...room.sender.profile,
            walletAddress: swap.init_address
          }
        },
        receiver: {
          ...room.receiver,
          addedAmount: {
            usdAmount: 2,
            coin: chainsDataset[1] //static values may need to change in future
          },
          profile: {
            ...room.receiver.profile,
            walletAddress: swap.accept_address
          }
        }
      },
    },
  };
};

export const resetViewSwapRoomHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
): ISwapMarketStore => {

  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;

  const openRoomInitialSwap = {
    accept_address: '',
    init_address: '',
    accept_sign: '',
    init_sign: '',
    metadata: {
      accept: {
        tokens: []
      },
      init: {
        tokens: []
      }
    },
    swap_mode: SUE_SWAP_MODE.OPEN,
    trade_id: '',
    offer_type: 0,
    open_trade_id: '',
    trading_chain: '',
    swap_preferences: {
      expiration_date: '',
      preferred_asset: {
        type: 'any',
        parameters: {}
      }
    }
  };

  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        nftsLength: 0,
        sign: '',
        uniqueTradeId: '',
        swap: roomKey === 'openRoom' ? { ...openRoomInitialSwap } : undefined,
        swapEncodedMsg: '',
        swapUpContract: "",
        sender: {
          ...room.sender,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed',
          profile: {
            ...room.sender.profile,
            ensAddress: 'sender.swapup.eth',
            image: '/assets/images/avatar.png',
            isPremium: false,
            title: 'sender',
            walletAddress: ''
          }
        },
        receiver: {
          ...room.receiver,
          collections: [],
          nftsSelectedForSwap: [],
          addedAmount: undefined,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed',
          profile: {
            ...room.receiver.profile,
            ensAddress: 'receiver.swapup.eth',
            image: '/assets/images/avatar.png',
            isPremium: false,
            title: 'receiver',
            walletAddress: ''
          },
          network: {
            id: '1',
            image: '/assets/svgs/ethereum.svg',
            title: 'ethereum',
            shortTitle: "eth"
          }
        }
      },
    },
  };
};

// Shared Room Helper end


// Private Room helpers start
export const setValuesOnCreatingPrivateRoomHelper = (
  state: ISwapMarketStore,
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  tradeId: string,
  counterPartyWalletAddress: string
): ISwapMarketStore => {
  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;
  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        uniqueTradeId: tradeId ? tradeId : room.uniqueTradeId,
        receiver: {
          ...room.receiver,
          profile: {
            ...room.receiver.profile,
            walletAddress: counterPartyWalletAddress ? counterPartyWalletAddress : room.receiver.profile.walletAddress,
          },
        },
      },
    },
  };
};
export const createPrivateMarketSwapHelper = async (state: ISwapMarketStore, offer_type: SUT_SwapOfferType): Promise<ISwapMarketStore> => {
  const room = state.privateMarket.privateRoom as IPrivateRoom;

  const swap: SUI_Swap = {
    trade_id: state.privateMarket.privateRoom.uniqueTradeId,
    swap_mode: SUE_SWAP_MODE.PRIVATE,
    trading_chain: String(Environment.CHAIN_ID),
    init_address: room.sender.profile.walletAddress,
    accept_address: room.receiver.profile.walletAddress,
    accept_sign: '',
    init_sign: '',
    offer_type,
    metadata: {
      init: {
        tokens: room.sender.nftsSelectedForSwap ?
          getNftSwapTokensFromNftItems(room.sender.nftsSelectedForSwap) : []
      },
      accept: {
        tokens: room.receiver.nftsSelectedForSwap ?
          getNftSwapTokensFromNftItems(room.receiver.nftsSelectedForSwap) : []
      },
    }
  };

  // console.info("Private Swaps ---------> \n", swap);

  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      privateRoom: {
        ...room,
        swap,
        nftsLength: swap.metadata.init.tokens.length + swap.metadata.accept.tokens.length
      },
    },
  };
};
export const setSwapEncodedMsgAndSignPrivateHelper = async (
  state: ISwapMarketStore,
  swapEncodedMsg: string,
  sign: string,
): Promise<ISwapMarketStore> => {

  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      privateRoom: {
        ...state.privateMarket.privateRoom,
        swapEncodedMsg: swapEncodedMsg,
        swap: state.privateMarket.privateRoom.swap && {
          ...state.privateMarket.privateRoom.swap,
          init_sign: sign
        }
      }
    }
  };
};
const getNftSwapTokensFromNftItems = (nfts: SUI_NFTItem[]): SUI_SwapToken[] => {

  return nfts.map(nft => ({
    id: nft.tokenId,
    address: nft.contract.address,
    type: nft.tokenType,
    image_url: nft.media[0].gateway
  }));

};

export const resetPrivateRoomDataHelper = (
  state: ISwapMarketStore,
): ISwapMarketStore => {

  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      privateRoom: {
        ...state.privateMarket.privateRoom,
        nftsLength: 0,
        sign: '',
        uniqueTradeId: '',
        swap: undefined,
        swapEncodedMsg: '',
        swapUpContract: "",
        sender: {
          ...state.privateMarket.privateRoom.sender,
          collections: [],
          nftsSelectedForSwap: [],
          addedAmount: undefined,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed'
        },
        receiver: {
          ...state.privateMarket.privateRoom.receiver,
          collections: [],
          nftsSelectedForSwap: [],
          addedAmount: undefined,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed',
          profile: {
            ...state.privateMarket.privateRoom.receiver.profile,
            walletAddress: '',
            // we need to remove the profile completely in future
          }
        }
      }
    },
  };
};

//my-swaps functions
export const setPendingSwapsDataHelper = (
  state: ISwapMarketStore,
  pendingSwaps: SUI_OpenSwap[],
): ISwapMarketStore => {

  let availablePendingSwaps: SUI_OpenSwap[] = [];

  if (state.wallet.address && state.wallet.isConnected) {
    availablePendingSwaps = pendingSwaps;
  }
  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      pendingSwaps: availablePendingSwaps
    },
  };
};

//my-swaps functions
export const setSwapHistoryDataHelper = (
  state: ISwapMarketStore,
  swapHistory: SUI_OpenSwap[],
): ISwapMarketStore => {

  let availableSwapHistory: SUI_OpenSwap[] = [];


  if (state.wallet.address && state.wallet.isConnected) {
    availableSwapHistory = swapHistory;
  }
  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      swapHistory: availableSwapHistory
    },
  };
};


export const setPrivateSwapsDataHelper = (
  state: ISwapMarketStore,
  swapsData: SUI_Swap[],
): ISwapMarketStore => {

  let availablePrivateSwaps: SUI_Swap[] = [];


  if (state.wallet.address && state.wallet.isConnected) {
    availablePrivateSwaps = swapsData.filter(swap => swap.swap_mode === 1);
  }
  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      availablePrivateSwaps: availablePrivateSwaps,
      filteredAvailablePrivateSwaps: availablePrivateSwaps
    },
  };
};

export const setFilteredAvailablePrivateSwapsBySearchHelper = (
  state: ISwapMarketStore,
  searchValue: string
): ISwapMarketStore => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredAvailablePrivateSwaps = state.privateMarket.availablePrivateSwaps?.filter(swap =>
    swap.init_address.includes(lowerCaseSearchValue) ||
    swap.trade_id.includes(lowerCaseSearchValue)
  );
  return {
    ...state,
    privateMarket: {
      ...state.privateMarket,
      filteredAvailablePrivateSwaps: filteredAvailablePrivateSwaps ? filteredAvailablePrivateSwaps : state.privateMarket.availablePrivateSwaps
    }
  };
};
// Private Room helpers end



//=== Open Market Room helpers start====
export const setFilteredNftsBySwapTokensHelper = (
  state: ISwapMarketStore,
  dataset: SUI_NFTItem[] | [],
  marketKey: 'openMarket' | 'privateMarket',
  roomKey: 'openRoom' | 'privateRoom',
  side: 'sender' | 'receiver',

): ISwapMarketStore => {

  const market = state[marketKey] as Record<string, any>;
  const room = market[roomKey] as Record<string, any>;


  const collections: string[] | [] = [...new Set(dataset.map(item => item.contract.name))];
  const newNftsDataset = dataset.length ? dataset : [];

  // console.log("Inside setter: ", newNftsDataset);

  return {
    ...state,
    [marketKey]: {
      ...market,
      [roomKey]: {
        ...room,
        [side]: {
          ...room[side],
          filteredNfts: newNftsDataset,
          nfts: newNftsDataset,
          nftsSelectedForSwap: [...newNftsDataset],
          collections,
        }
      }
    }
  };
};
export const setOpenSwapsDataHelper = (
  state: ISwapMarketStore,
  swapsData: SUI_OpenSwap[],
): ISwapMarketStore => {

  let availableSwaps: SUI_OpenSwap[] = [];
  let createdSwaps: SUI_OpenSwap[] = [];

  if (state.wallet.address && state.wallet.isConnected) {
    availableSwaps = swapsData.filter(swap => swap.init_address !== state.wallet.address);
    createdSwaps = swapsData.filter(swap => swap.init_address === state.wallet.address);
  }
  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      availableSwaps,
      createdSwaps,
      filteredAvailableSwaps: availableSwaps
    },
  };
};

export const setMyOpenSwapsDataHelper = (
  state: ISwapMarketStore,
  swapsData: SUI_OpenSwap[],
): ISwapMarketStore => {

  let createdSwaps: SUI_OpenSwap[] = [];

  if (state.wallet.address && state.wallet.isConnected) {
    createdSwaps = swapsData.filter(swap => swap.init_address === state.wallet.address);
  }
  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      createdSwaps
    },
  };
};

export const setFilteredAvailableSwapsBySearchHelper = (
  state: ISwapMarketStore,
  searchValue: string
): ISwapMarketStore => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredAvailableSwaps = state.openMarket.availableSwaps?.filter(swap =>
    swap.init_address.includes(lowerCaseSearchValue) ||
    swap.open_trade_id.includes(lowerCaseSearchValue) ||
    swap.swap_preferences.expiration_date.includes(lowerCaseSearchValue) ||
    swap.swap_preferences.preferred_asset.type.includes(lowerCaseSearchValue) ||
    swap.swap_preferences.preferred_asset.parameters.collection?.includes(lowerCaseSearchValue)
  );
  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      filteredAvailableSwaps: filteredAvailableSwaps ? filteredAvailableSwaps : state.openMarket.availableSwaps
    }
  };
};

export const setValuesOnCreateOpenSwapRoomHelper = (
  state: ISwapMarketStore,
  tradeId: string,
): ISwapMarketStore => {
  const market = state['openMarket'] as Record<string, any>;
  const room = market['openRoom'] as IOpenRoom;

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...room,
        uniqueTradeId: tradeId ? tradeId : room.uniqueTradeId,
      },
    },
  };
};

export const setValuesOnProposeOpenSwapRoomHelper = async (
  state: ISwapMarketStore,
  tradeId: string,
  swap: SUI_OpenSwap
): Promise<ISwapMarketStore> => {
  const market = state['openMarket'] as Record<string, any>;
  const room = market['openRoom'] as IOpenRoom;

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...room,
        uniqueTradeId: tradeId,
        swap,
        receiver: {
          ...room.receiver,
          addedAmount: {
            usdAmount: 2,
            coin: chainsDataset[1] //static values may need to change in future
          },
          profile: {
            ...room.receiver.profile,
            walletAddress: swap.init_address
          }
        }
      },
    },
  };
};
export const setSwapPreferencesHelper = (
  state: ISwapMarketStore,
  preferences: SUI_SwapPreferences
): ISwapMarketStore => {

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...state.openMarket.openRoom,
        swap: {
          ...state.openMarket.openRoom.swap,
          swap_preferences: preferences
        }
      }
    }
  };
};

export const createOpenSwapHelper = async (
  state: ISwapMarketStore,
): Promise<ISwapMarketStore> => {
  const room = state.openMarket.openRoom as IOpenRoom;

  const swap: SUI_OpenSwap = {
    ...state.openMarket.openRoom.swap,
    open_trade_id: state.openMarket.openRoom.uniqueTradeId,
    init_address: room.sender.profile.walletAddress,
    swap_mode: SUE_SWAP_MODE.OPEN,
    trading_chain: String(Environment.CHAIN_ID),
    metadata: {
      init: {
        tokens: room.sender.nftsSelectedForSwap ?
          getNftSwapTokensFromNftItems(room.sender.nftsSelectedForSwap) : []
      },
      accept: {
        tokens: []
      }
    },
  };

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...room,
        swap,
        nftsLength: swap.metadata.init.tokens.length
      },
    },
  };
};

export const createProposeOpenSwapHelper = async (
  state: ISwapMarketStore,
): Promise<ISwapMarketStore> => {
  const room = state.openMarket.openRoom as IOpenRoom;

  const swap: SUI_OpenSwap = {
    ...state.openMarket.openRoom.swap,
    id: state.openMarket.openRoom.swap.id,
    open_trade_id: state.openMarket.openRoom.swap.open_trade_id,
    trade_id: state.openMarket.openRoom.uniqueTradeId,
    init_address: room.sender.profile.walletAddress,
    accept_address: room.swap.init_address,
    swap_mode: SUE_SWAP_MODE.OPEN,
    trading_chain: String(Environment.CHAIN_ID),
    metadata: {
      init: {
        tokens: room.sender.nftsSelectedForSwap ?
          getNftSwapTokensFromNftItems(room.sender.nftsSelectedForSwap) : []
      },
      accept: {
        tokens: state.openMarket.openRoom.swap.metadata.init.tokens
      }
    },
  };

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...room,
        proposeSwap: swap,
        nftsLength: swap.metadata.init.tokens.length
      },
    },
  };
};

export const resetOpenSwapCreationRoomHelper = (
  state: ISwapMarketStore,
): ISwapMarketStore => {

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...state.openMarket.openRoom,
        nftsLength: 0,
        sign: '',
        uniqueTradeId: '',
        swap: {
          accept_address: '',
          init_address: '',
          accept_sign: '',
          init_sign: '',
          metadata: {
            accept: {
              tokens: []
            },
            init: {
              tokens: []
            }
          },
          swap_mode: SUE_SWAP_MODE.OPEN,
          trade_id: '',
          offer_type: 0,
          open_trade_id: '',
          trading_chain: '',
          swap_preferences: {
            expiration_date: '',
            preferred_asset: {
              type: 'any',
              parameters: {}
            }
          }
        },
        swapEncodedMsg: '',
        sender: {
          ...state.openMarket.openRoom.sender,
          collections: [],
          nftsSelectedForSwap: [],
          addedAmount: undefined,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed'
        },
      }
    },
  };
};

export const resetOpenSwapProposeRoomHelper = (
  state: ISwapMarketStore,
): ISwapMarketStore => {

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...state.openMarket.openRoom,
        nftsLength: 0,
        sign: '',
        uniqueTradeId: '',
        proposeSwap: undefined,
        swap: {
          accept_address: '',
          init_address: '',
          accept_sign: '',
          init_sign: '',
          metadata: {
            accept: {
              tokens: []
            },
            init: {
              tokens: []
            }
          },
          swap_mode: SUE_SWAP_MODE.OPEN,
          trade_id: '',
          offer_type: 0,
          open_trade_id: '',
          trading_chain: '',
          swap_preferences: {
            expiration_date: '',
            preferred_asset: {
              type: 'any',
              parameters: {}
            }
          }
        },
        swapEncodedMsg: '',
        sender: {
          ...state.openMarket.openRoom.sender,
          collections: [],
          nftsSelectedForSwap: [],
          addedAmount: undefined,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed'
        },
        receiver: {
          ...state.openMarket.openRoom.receiver,
          collections: [],
          nftsSelectedForSwap: [],
          addedAmount: undefined,
          nfts: undefined,
          filteredNfts: undefined,
          filters: undefined,
          activeGridView: 'detailed',
          profile: {
            ...state.openMarket.openRoom.receiver.profile,
            walletAddress: '',
          }
        }
      }
    },
  };
};

export const setSwapEncodedMsgAndSignOpenHelper = async (
  state: ISwapMarketStore,
  swapEncodedMsg: string,
  sign: string,
): Promise<ISwapMarketStore> => {

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...state.openMarket.openRoom,
        swapEncodedMsg: swapEncodedMsg,
        swap: state.openMarket.openRoom.swap && {
          ...state.openMarket.openRoom.swap,
          init_sign: sign
        }
      }
    }
  };
};
//==========================================


// Wallet connect helpers start
export const connectToWalletHelper = async (state: ISwapMarketStore): Promise<ISwapMarketStore> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // console.log("signer---->", signer);

      const address = await signer.getAddress();
      let ensAddress = null;
      // ensAddress = await provider.lookupAddress(address);

      const network = await provider.getNetwork();

      let image = '';

      if (ensAddress) {
        // Fetch ENS avatar if available
        const ensResolver = await provider.getResolver(ensAddress);
        if (ensResolver) {
          const avatar = await ensResolver.getAvatar();

          if (avatar) {
            image = avatar;
          }
        }
      }

      return {
        ...state,
        wallet: {
          ...state.wallet,
          isConnected: true,
          address,
          provider,
          signer,
          image,
          ensAddress: ensAddress ? ensAddress : state.wallet.ensAddress,
          network: {
            ...state.wallet.network,
            title: network.name,
            id: String(network.chainId)
          }
        },
        privateMarket: {
          ...state.privateMarket,
          privateRoom: {
            ...state.privateMarket.privateRoom,
            sender: {
              ...state.privateMarket.privateRoom.sender,
              profile: {
                ...state.privateMarket.privateRoom.sender.profile,
                image,
                ensAddress: ensAddress ? ensAddress : state.privateMarket.privateRoom.sender.profile.ensAddress,
                walletAddress: address,
              },
              network: {
                ...state.privateMarket.privateRoom.sender.network,
                title: network.name,
                id: String(network.chainId)
              }
            }
          }
        },
        openMarket: {
          ...state.openMarket,
          openRoom: {
            ...state.openMarket.openRoom,
            sender: {
              ...state.openMarket.openRoom.sender,
              profile: {
                ...state.openMarket.openRoom.sender.profile,
                image,
                ensAddress: ensAddress ? ensAddress : state.openMarket.openRoom.sender.profile.ensAddress,
                walletAddress: address,
              },
              network: {
                ...state.openMarket.openRoom.sender.network,
                title: network.name,
                id: String(network.chainId)
              }
            }
          }
        }
      };
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  } else {
    console.error("No wallet provider found");
  }

  return state;
};