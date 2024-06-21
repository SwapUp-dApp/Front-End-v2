import { SUI_Swap, SUI_OpenSwap, SUI_SwapPreferences, SUT_SwapOfferType } from "@/types/swap-market.types";
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
const getNftSwapTokensFromNftItems = (nfts: SUI_NFTItem[]) => {

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
      filteredAvailablePrivateSwaps: filteredAvailablePrivateSwaps
    }
  };
};
// Private Room helpers end



//=== Open Market Room helpers start====
export const setCounterPartyNftsDatasetHelper = (
  state: ISwapMarketStore,
  dataset: SUI_NFTItem[] | []
): ISwapMarketStore => {

  const collections: string[] | [] = [...new Set(dataset.map(item => item.contract.name))];
  const newNftsDataset = dataset.length ? dataset : [];

  // console.log("Inside setter: ", newNftsDataset);

  return {
    ...state,
    openMarket: {
      ...state.openMarket,
      openRoom: {
        ...state.openMarket.openRoom,
        receiver: {
          ...state.openMarket.openRoom.receiver,
          filteredNfts: newNftsDataset,
          nfts: newNftsDataset,
          nftsSelectedForSwap: newNftsDataset,
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
      filteredAvailableSwaps: filteredAvailableSwaps
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
          isConnected: true,
          address,
          provider,
          signer
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

export const tempSenderNfts: SUI_NFTItem[] = [
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "15",
    "tokenType": "ERC721",
    "title": "Cool Cat #15",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2023-11-14T18:23:38.254Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmRiwJtPoPcRckxXDWu7THoCz4JLVikf4oM7D96acW48e2",
      "name": "Cool Cat #15",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "antlers",
          "trait_type": "hats"
        },
        {
          "value": "tanktop white",
          "trait_type": "shirt"
        },
        {
          "value": "unamused",
          "trait_type": "face"
        },
        {
          "value": "cool_1",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1bfrD7uh2LhtH0pMt0afpcg_uUMhbQ1bV",
      "ipfs_image": "https://ipfs.io/ipfs/QmRiwJtPoPcRckxXDWu7THoCz4JLVikf4oM7D96acW48e2",
      "points": {
        "Hats": 1,
        "Shirt": 1,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/15",
      "raw": "https://api.coolcatsnft.com/cat/15"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmRiwJtPoPcRckxXDWu7THoCz4JLVikf4oM7D96acW48e2",
        "raw": "https://ipfs.io/ipfs/QmRiwJtPoPcRckxXDWu7THoCz4JLVikf4oM7D96acW48e2"
      }
    ],
    "balance": 1,
    "rarityRank": 15
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "268",
    "tokenType": "ERC721",
    "title": "Cool Cat #268",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:19.059Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmQAAXgJ3isYvjKbzoqEYSrWKtDDQdcNNM3fn4y8dJ8nRo",
      "name": "Cool Cat #268",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "mohawk green",
          "trait_type": "hats"
        },
        {
          "value": "buttondown blue flannel",
          "trait_type": "shirt"
        },
        {
          "value": "angry scar",
          "trait_type": "face"
        },
        {
          "value": "cool_2",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1fzqRyLV10P0lfsGbOP6HgZgALRzd61nQ",
      "ipfs_image": "https://ipfs.io/ipfs/QmQAAXgJ3isYvjKbzoqEYSrWKtDDQdcNNM3fn4y8dJ8nRo",
      "points": {
        "Hats": 1,
        "Shirt": 1,
        "Face": 2,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/268",
      "raw": "https://api.coolcatsnft.com/cat/268"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmQAAXgJ3isYvjKbzoqEYSrWKtDDQdcNNM3fn4y8dJ8nRo",
        "raw": "https://ipfs.io/ipfs/QmQAAXgJ3isYvjKbzoqEYSrWKtDDQdcNNM3fn4y8dJ8nRo"
      }
    ],
    "balance": 1,
    "rarityRank": 268
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "269",
    "tokenType": "ERC721",
    "title": "Cool Cat #269",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:19.020Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmajmkKdWSzTHMZD6ezWvLfBouuhTabm8sNi7KFi6XVk4B",
      "name": "Cool Cat #269",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "afro black",
          "trait_type": "hats"
        },
        {
          "value": "labcoat",
          "trait_type": "shirt"
        },
        {
          "value": "unamused",
          "trait_type": "face"
        },
        {
          "value": "wild_1",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1MGgLRkco6Oa9_DNv05DdMUlexnA87KId",
      "ipfs_image": "https://ipfs.io/ipfs/QmajmkKdWSzTHMZD6ezWvLfBouuhTabm8sNi7KFi6XVk4B",
      "points": {
        "Hats": 2,
        "Shirt": 2,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/269",
      "raw": "https://api.coolcatsnft.com/cat/269"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmajmkKdWSzTHMZD6ezWvLfBouuhTabm8sNi7KFi6XVk4B",
        "raw": "https://ipfs.io/ipfs/QmajmkKdWSzTHMZD6ezWvLfBouuhTabm8sNi7KFi6XVk4B"
      }
    ],
    "balance": 1,
    "rarityRank": 269
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "270",
    "tokenType": "ERC721",
    "title": "Cool Cat #270",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:18.992Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmfTzZAgrZ8wmbrCwrwEwEFVtgfv2dwbBJ26NijeS1ygdQ",
      "name": "Cool Cat #270",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "wreath",
          "trait_type": "hats"
        },
        {
          "value": "buttondown green",
          "trait_type": "shirt"
        },
        {
          "value": "glossy",
          "trait_type": "face"
        },
        {
          "value": "cool_1",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1jlRhCtETxgdqgecXeQRpBsm-m0zDEkRb",
      "ipfs_image": "https://ipfs.io/ipfs/QmfTzZAgrZ8wmbrCwrwEwEFVtgfv2dwbBJ26NijeS1ygdQ",
      "points": {
        "Hats": 1,
        "Shirt": 1,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/270",
      "raw": "https://api.coolcatsnft.com/cat/270"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmfTzZAgrZ8wmbrCwrwEwEFVtgfv2dwbBJ26NijeS1ygdQ",
        "raw": "https://ipfs.io/ipfs/QmfTzZAgrZ8wmbrCwrwEwEFVtgfv2dwbBJ26NijeS1ygdQ"
      }
    ],
    "balance": 1,
    "rarityRank": 270
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "271",
    "tokenType": "ERC721",
    "title": "Cool Cat #271",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:18.998Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmXoWQN17cjSZyYcEFzAapj8FAPmVFGsVuu1MF8kaefngu",
      "name": "Cool Cat #271",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "costume gorilla",
          "trait_type": "hats"
        },
        {
          "value": "labcoat",
          "trait_type": "shirt"
        },
        {
          "value": "dizzy",
          "trait_type": "face"
        },
        {
          "value": "classy_1",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1ocVP5rqWs3lOBCpFckhdGLBHrVi-iDZR",
      "ipfs_image": "https://ipfs.io/ipfs/QmXoWQN17cjSZyYcEFzAapj8FAPmVFGsVuu1MF8kaefngu",
      "points": {
        "Hats": 4,
        "Shirt": 2,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/271",
      "raw": "https://api.coolcatsnft.com/cat/271"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmXoWQN17cjSZyYcEFzAapj8FAPmVFGsVuu1MF8kaefngu",
        "raw": "https://ipfs.io/ipfs/QmXoWQN17cjSZyYcEFzAapj8FAPmVFGsVuu1MF8kaefngu"
      }
    ],
    "balance": 1,
    "rarityRank": 271
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "272",
    "tokenType": "ERC721",
    "title": "Cool Cat #272",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:18.995Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmRvPQXLT5Z2isgXHDMpoRQJQa9WqYVft4DHu9GF6S5yAd",
      "name": "Cool Cat #272",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "goggles seaweed",
          "trait_type": "hats"
        },
        {
          "value": "shirt yellow",
          "trait_type": "shirt"
        },
        {
          "value": "sunglasses squad",
          "trait_type": "face"
        },
        {
          "value": "wild_2",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=17Aet1HZxXnU_-X3LmzQ9BQ79BqQADqnV",
      "ipfs_image": "https://ipfs.io/ipfs/QmRvPQXLT5Z2isgXHDMpoRQJQa9WqYVft4DHu9GF6S5yAd",
      "points": {
        "Hats": 3,
        "Shirt": 1,
        "Face": 2,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/272",
      "raw": "https://api.coolcatsnft.com/cat/272"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmRvPQXLT5Z2isgXHDMpoRQJQa9WqYVft4DHu9GF6S5yAd",
        "raw": "https://ipfs.io/ipfs/QmRvPQXLT5Z2isgXHDMpoRQJQa9WqYVft4DHu9GF6S5yAd"
      }
    ],
    "balance": 1,
    "rarityRank": 272
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "273",
    "tokenType": "ERC721",
    "title": "Cool Cat #273",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:19.024Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmS1bfZxG8u9NHCtnd96yTA2N1Wb5FRasSTqgYWnLY6qz6",
      "name": "Cool Cat #273",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "beanie orange",
          "trait_type": "hats"
        },
        {
          "value": "bandana green",
          "trait_type": "shirt"
        },
        {
          "value": "smirk",
          "trait_type": "face"
        },
        {
          "value": "cool_1",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1GdgN4YSMsWp7QJz7SD0w6MyOCQGLjetv",
      "ipfs_image": "https://ipfs.io/ipfs/QmS1bfZxG8u9NHCtnd96yTA2N1Wb5FRasSTqgYWnLY6qz6",
      "points": {
        "Hats": 1,
        "Shirt": 1,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/273",
      "raw": "https://api.coolcatsnft.com/cat/273"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmS1bfZxG8u9NHCtnd96yTA2N1Wb5FRasSTqgYWnLY6qz6",
        "raw": "https://ipfs.io/ipfs/QmS1bfZxG8u9NHCtnd96yTA2N1Wb5FRasSTqgYWnLY6qz6"
      }
    ],
    "balance": 1,
    "rarityRank": 273
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "274",
    "tokenType": "ERC721",
    "title": "Cool Cat #274",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:18.994Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmQbgbAB6kvuXz1dpb2yGzDYKuvK4Luij649YfXeDWy7Ri",
      "name": "Cool Cat #274",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "piercings",
          "trait_type": "hats"
        },
        {
          "value": "epaulette black",
          "trait_type": "shirt"
        },
        {
          "value": "mummy",
          "trait_type": "face"
        },
        {
          "value": "wild_2",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=17NtY3iIXmdsF0Qz6HJLjwoFG24Nw2Oma",
      "ipfs_image": "https://ipfs.io/ipfs/QmQbgbAB6kvuXz1dpb2yGzDYKuvK4Luij649YfXeDWy7Ri",
      "points": {
        "Hats": 1,
        "Shirt": 3,
        "Face": 2,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/274",
      "raw": "https://api.coolcatsnft.com/cat/274"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmQbgbAB6kvuXz1dpb2yGzDYKuvK4Luij649YfXeDWy7Ri",
        "raw": "https://ipfs.io/ipfs/QmQbgbAB6kvuXz1dpb2yGzDYKuvK4Luij649YfXeDWy7Ri"
      }
    ],
    "balance": 1,
    "rarityRank": 274
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "275",
    "tokenType": "ERC721",
    "title": "Cool Cat #275",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:19.007Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmVfwMPQ5DnNcLewk9HzR5eKcE4fdgwR8Xmp21tiDJGrWN",
      "name": "Cool Cat #275",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "hat skull",
          "trait_type": "hats"
        },
        {
          "value": "bandana purple",
          "trait_type": "shirt"
        },
        {
          "value": "angry",
          "trait_type": "face"
        },
        {
          "value": "cool_2",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1K5K0IL5mFLGa8KcvTbIMG_pl4Kk7tl7X",
      "ipfs_image": "https://ipfs.io/ipfs/QmVfwMPQ5DnNcLewk9HzR5eKcE4fdgwR8Xmp21tiDJGrWN",
      "points": {
        "Hats": 2,
        "Shirt": 1,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/275",
      "raw": "https://api.coolcatsnft.com/cat/275"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmVfwMPQ5DnNcLewk9HzR5eKcE4fdgwR8Xmp21tiDJGrWN",
        "raw": "https://ipfs.io/ipfs/QmVfwMPQ5DnNcLewk9HzR5eKcE4fdgwR8Xmp21tiDJGrWN"
      }
    ],
    "balance": 1,
    "rarityRank": 275
  },
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "276",
    "tokenType": "ERC721",
    "title": "Cool Cat #276",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:18.999Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmNsK29s92tpHLFDZGTMvBzCzRvNkVjs6fGZXKcgWrwiGm",
      "name": "Cool Cat #276",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "cowboy brown",
          "trait_type": "hats"
        },
        {
          "value": "ninja blue",
          "trait_type": "shirt"
        },
        {
          "value": "double face",
          "trait_type": "face"
        },
        {
          "value": "wild_2",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=11c3tnOljpkIOYDVASs7Rts0BzP4QuPZn",
      "ipfs_image": "https://ipfs.io/ipfs/QmNsK29s92tpHLFDZGTMvBzCzRvNkVjs6fGZXKcgWrwiGm",
      "points": {
        "Hats": 2,
        "Shirt": 2,
        "Face": 2,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/276",
      "raw": "https://api.coolcatsnft.com/cat/276"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmNsK29s92tpHLFDZGTMvBzCzRvNkVjs6fGZXKcgWrwiGm",
        "raw": "https://ipfs.io/ipfs/QmNsK29s92tpHLFDZGTMvBzCzRvNkVjs6fGZXKcgWrwiGm"
      }
    ],
    "balance": 1,
    "rarityRank": 276
  },
];

export const tempReceiverNfts: SUI_NFTItem[] = [
  {
    "contract": {
      "address": "0x3d7e741b5e806303adbe0706c827d3acf0696516",
      "name": "Cool Cats NFT",
      "symbol": "Cool Cats NFT",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "277",
    "tokenType": "ERC721",
    "title": "Cool Cat #277",
    "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
    "timeLastUpdated": "2024-05-20T11:01:18.996Z",
    "rawMetadata": {
      "image": "https://ipfs.io/ipfs/QmW9pm7mDArgpQZQVZ6AvFGTNV8Gigvfqk5CBirYKRqvg8",
      "name": "Cool Cat #277",
      "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit [www.coolcatsnft.com](https://www.coolcatsnft.com/) to learn more.",
      "attributes": [
        {
          "value": "blue cat skin",
          "trait_type": "body"
        },
        {
          "value": "pirate black",
          "trait_type": "hats"
        },
        {
          "value": "buttondown black flannel",
          "trait_type": "shirt"
        },
        {
          "value": "wink",
          "trait_type": "face"
        },
        {
          "value": "wild_1",
          "trait_type": "tier"
        }
      ],
      "google_image": "https://drive.google.com/uc?id=1X2uohNrYglHGb8AYMlXBHespqKaPLpsM",
      "ipfs_image": "https://ipfs.io/ipfs/QmW9pm7mDArgpQZQVZ6AvFGTNV8Gigvfqk5CBirYKRqvg8",
      "points": {
        "Hats": 3,
        "Shirt": 1,
        "Face": 1,
        "Body": 0
      }
    },
    "tokenUri": {
      "gateway": "https://api.coolcatsnft.com/cat/277",
      "raw": "https://api.coolcatsnft.com/cat/277"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmW9pm7mDArgpQZQVZ6AvFGTNV8Gigvfqk5CBirYKRqvg8",
        "raw": "https://ipfs.io/ipfs/QmW9pm7mDArgpQZQVZ6AvFGTNV8Gigvfqk5CBirYKRqvg8"
      }
    ],
    "balance": 1,
    "rarityRank": 277
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "320",
    "tokenType": "ERC721",
    "title": "Doodle #320",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.321Z",
    "rawMetadata": {
      "name": "Doodle #320",
      "image": "ipfs://QmYnjDZofuSon8TdXT4WViSsPehnMBY3Eih7FG4yEsXKW7",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "happy",
          "trait_type": "face"
        },
        {
          "value": "green mullet",
          "trait_type": "hair"
        },
        {
          "value": "pink and green jacket",
          "trait_type": "body"
        },
        {
          "value": "orange",
          "trait_type": "background"
        },
        {
          "value": "tan",
          "trait_type": "head"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/320",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/320"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmYnjDZofuSon8TdXT4WViSsPehnMBY3Eih7FG4yEsXKW7",
        "raw": "ipfs://QmYnjDZofuSon8TdXT4WViSsPehnMBY3Eih7FG4yEsXKW7"
      }
    ],
    "balance": 1,
    "rarityRank": 320
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "321",
    "tokenType": "ERC721",
    "title": "Doodle #321",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.369Z",
    "rawMetadata": {
      "name": "Doodle #321",
      "image": "ipfs://QmUL4uTKWZVVEqgWMV7q6EQ49cDy5UThcirGHPvzmT4GkV",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "default",
          "trait_type": "face"
        },
        {
          "value": "purple cap",
          "trait_type": "hair"
        },
        {
          "value": "pink fleece",
          "trait_type": "body"
        },
        {
          "value": "gradient 2",
          "trait_type": "background"
        },
        {
          "value": "gradient 2",
          "trait_type": "head"
        },
        {
          "value": "pearl",
          "trait_type": "piercing"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/321",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/321"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmUL4uTKWZVVEqgWMV7q6EQ49cDy5UThcirGHPvzmT4GkV",
        "raw": "ipfs://QmUL4uTKWZVVEqgWMV7q6EQ49cDy5UThcirGHPvzmT4GkV"
      }
    ],
    "balance": 1,
    "rarityRank": 321
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "322",
    "tokenType": "ERC721",
    "title": "Doodle #322",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.222Z",
    "rawMetadata": {
      "name": "Doodle #322",
      "image": "ipfs://QmSrZyLqY16kG79xx22eMX8eFBqXz2E5Rb9z4hJUxQJwfB",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "aviators with mustache",
          "trait_type": "face"
        },
        {
          "value": "blue messy",
          "trait_type": "hair"
        },
        {
          "value": "pink and green jacket",
          "trait_type": "body"
        },
        {
          "value": "orange",
          "trait_type": "background"
        },
        {
          "value": "gradient 2",
          "trait_type": "head"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/322",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/322"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmSrZyLqY16kG79xx22eMX8eFBqXz2E5Rb9z4hJUxQJwfB",
        "raw": "ipfs://QmSrZyLqY16kG79xx22eMX8eFBqXz2E5Rb9z4hJUxQJwfB"
      }
    ],
    "balance": 1,
    "rarityRank": 322
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "323",
    "tokenType": "ERC721",
    "title": "Doodle #323",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.429Z",
    "rawMetadata": {
      "name": "Doodle #323",
      "image": "ipfs://QmcNurt5GtMLppdJwHLf9MtG9c6rQrFJaccVftUQMZgi9d",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "3d glasses",
          "trait_type": "face"
        },
        {
          "value": "brown mullet",
          "trait_type": "hair"
        },
        {
          "value": "purple chain",
          "trait_type": "body"
        },
        {
          "value": "gradient 4",
          "trait_type": "background"
        },
        {
          "value": "yellow",
          "trait_type": "head"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/323",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/323"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmcNurt5GtMLppdJwHLf9MtG9c6rQrFJaccVftUQMZgi9d",
        "raw": "ipfs://QmcNurt5GtMLppdJwHLf9MtG9c6rQrFJaccVftUQMZgi9d"
      }
    ],
    "balance": 1,
    "rarityRank": 323
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "324",
    "tokenType": "ERC721",
    "title": "Doodle #324",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.673Z",
    "rawMetadata": {
      "name": "Doodle #324",
      "image": "ipfs://QmWco6qjMWy6PNJK94fZha4zNHKvGnjmLQFKeeVm4gNQYz",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "chill cig",
          "trait_type": "face"
        },
        {
          "value": "brown mullet",
          "trait_type": "hair"
        },
        {
          "value": "white sweater",
          "trait_type": "body"
        },
        {
          "value": "space",
          "trait_type": "background"
        },
        {
          "value": "yellow",
          "trait_type": "head"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/324",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/324"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmWco6qjMWy6PNJK94fZha4zNHKvGnjmLQFKeeVm4gNQYz",
        "raw": "ipfs://QmWco6qjMWy6PNJK94fZha4zNHKvGnjmLQFKeeVm4gNQYz"
      }
    ],
    "balance": 1,
    "rarityRank": 324
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "325",
    "tokenType": "ERC721",
    "title": "Doodle #325",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.403Z",
    "rawMetadata": {
      "name": "Doodle #325",
      "image": "ipfs://QmPYSnPwnr1tqry14RXzPE7q8JyuUb5aJtkeqynLyrdsxX",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "surprised",
          "trait_type": "face"
        },
        {
          "value": "yellow toque",
          "trait_type": "hair"
        },
        {
          "value": "blue fleece",
          "trait_type": "body"
        },
        {
          "value": "gradient 1",
          "trait_type": "background"
        },
        {
          "value": "purple",
          "trait_type": "head"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/325",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/325"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmPYSnPwnr1tqry14RXzPE7q8JyuUb5aJtkeqynLyrdsxX",
        "raw": "ipfs://QmPYSnPwnr1tqry14RXzPE7q8JyuUb5aJtkeqynLyrdsxX"
      }
    ],
    "balance": 1,
    "rarityRank": 325
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "326",
    "tokenType": "ERC721",
    "title": "Doodle #326",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.615Z",
    "rawMetadata": {
      "name": "Doodle #326",
      "image": "ipfs://QmVVUQBkzASbJDKpUwUHWV7GHkFFJbPfEMZHJEgpPMvY4a",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "designer glasses",
          "trait_type": "face"
        },
        {
          "value": "blue puffballs",
          "trait_type": "hair"
        },
        {
          "value": "blue fleece",
          "trait_type": "body"
        },
        {
          "value": "gradient 2",
          "trait_type": "background"
        },
        {
          "value": "med",
          "trait_type": "head"
        },
        {
          "value": "hoop",
          "trait_type": "piercing"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/326",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/326"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmVVUQBkzASbJDKpUwUHWV7GHkFFJbPfEMZHJEgpPMvY4a",
        "raw": "ipfs://QmVVUQBkzASbJDKpUwUHWV7GHkFFJbPfEMZHJEgpPMvY4a"
      }
    ],
    "balance": 1,
    "rarityRank": 326
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "327",
    "tokenType": "ERC721",
    "title": "Doodle #327",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.274Z",
    "rawMetadata": {
      "name": "Doodle #327",
      "image": "ipfs://QmVCKbz5Hn9EXvUxfPiVYbAKo24gYjwLKwGZVU1j9Jj8xN",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "in love",
          "trait_type": "face"
        },
        {
          "value": "green brushcut",
          "trait_type": "hair"
        },
        {
          "value": "blue and yellow jacket",
          "trait_type": "body"
        },
        {
          "value": "purple",
          "trait_type": "background"
        },
        {
          "value": "pink",
          "trait_type": "head"
        },
        {
          "value": "hoop",
          "trait_type": "piercing"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/327",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/327"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmVCKbz5Hn9EXvUxfPiVYbAKo24gYjwLKwGZVU1j9Jj8xN",
        "raw": "ipfs://QmVCKbz5Hn9EXvUxfPiVYbAKo24gYjwLKwGZVU1j9Jj8xN"
      }
    ],
    "balance": 1,
    "rarityRank": 327
  },
  {
    "contract": {
      "address": "0x49d3b3c0d5252e8c8b4331885479880847287a92",
      "name": "Doodles",
      "symbol": "Doodles",
      "tokenType": "ERC721",
      "openSea": {}
    },
    "tokenId": "328",
    "tokenType": "ERC721",
    "title": "Doodle #328",
    "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
    "timeLastUpdated": "2024-05-20T11:01:19.242Z",
    "rawMetadata": {
      "name": "Doodle #328",
      "image": "ipfs://QmSpepsvZ9owxSEVsZsU7gwpLFRPGkBQwkz84B4TZQhSmK",
      "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian–based illustrator, designer, animator and muralist.",
      "attributes": [
        {
          "value": "sunglasses",
          "trait_type": "face"
        },
        {
          "value": "pink long",
          "trait_type": "hair"
        },
        {
          "value": "white collar",
          "trait_type": "body"
        },
        {
          "value": "grey",
          "trait_type": "background"
        },
        {
          "value": "gradient 1",
          "trait_type": "head"
        }
      ]
    },
    "tokenUri": {
      "gateway": "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/328",
      "raw": "https://cloudflare-ipfs.com/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/328"
    },
    "media": [
      {
        "gateway": "https://ipfs.io/ipfs/QmSpepsvZ9owxSEVsZsU7gwpLFRPGkBQwkz84B4TZQhSmK",
        "raw": "ipfs://QmSpepsvZ9owxSEVsZsU7gwpLFRPGkBQwkz84B4TZQhSmK"
      }
    ],
    "balance": 1,
    "rarityRank": 328
  },
];