import { compareRarityRankItems } from "@/lib/utils";
import { getWalletProxy } from "@/lib/walletProxy";
import { SUI_NFTItem } from "@/types/global.types";
import { IProfileAssetsFilters, IProfileStore, SUT_SubdomainTabType, SUT_VisibilityToggleType } from "@/types/profile-store.types";
import { IProfile, IProfileDetails, IWallet, SUI_CollectionOwnedItem, SUI_SubnameItem, SUI_TokenBreakdownChartItem, SUI_TokenDistributionPerChainChartItem } from "@/types/profile.types";
import { SUT_GridViewType } from "@/types/swap-market-store.types";

export const getInitialProfile = (userType: "sender" | "receiver") => {
    const initialState: IProfile = {
        ensAddress: userType === "sender" ? 'sender.swapup.eth' : 'receiver.swapup.eth',
        avatar: '/assets/images/member11.jpg',
        coverImage: '/assets/images/cover.png',
        isPremium: false,
        joinDate: "2023-09-15T00:00:00Z",
        details: {
            title: userType,
            description: "Passionate about blockchain technology and decentralized finance. Enthusiastic trader with a keen interest in exploring the vast world of digital assets. Constantly seeking new opportunities and insights in the ever-evolving crypto space. Let's swap ideas and assets!"
        },
        wallet: {
            address: '',
            isConnected: false,
            network: {
                id: '84532',
                name: 'Base-Sepolia',
                iconUrl: '/assets/svgs/base-sepolia.svg',
                symbol: 'ETH'
            }
        },
    };

    return initialState;
};

export const setProfileDetailsHelper = (state: IProfileStore, details: IProfileDetails): IProfileStore => {
    return {
        ...state,
        profile: {
            ...state.profile,
            details
        }
    };
};

export const setProfileWalletHelper = async (state: IProfileStore, connectedWallet: IWallet): Promise<IProfileStore> => {
    let connectedUserAvatar = null;
    let connectedUserEnsName = null;

    if (connectedWallet.address) {
        try {
            const { avatar, ensName } = await getWalletProxy().getEnsInformationByWalletAddress(connectedWallet.address);
            connectedUserAvatar = avatar;
            connectedUserEnsName = ensName;
        } catch (error) {
            console.log("No ens found");
        }
    }


    return {
        ...state,
        profile: {
            ...state.profile,
            wallet: connectedWallet,
            ensAddress: connectedUserEnsName ? connectedUserEnsName : '',
            avatar: connectedUserAvatar ? connectedUserAvatar : state.profile.avatar,
        }
    };
};

export const setProfileAvatarHelper = (state: IProfileStore, avatar: string): IProfileStore => {
    return {
        ...state,
        profile: {
            ...state.profile,
            avatar
        }
    };
};

export const setProfileCoverImageHelper = (state: IProfileStore, coverImage: string): IProfileStore => {
    return {
        ...state,
        profile: {
            ...state.profile,
            coverImage
        }
    };
};
export const toggleGridViewHelper = (state: IProfileStore, value: SUT_GridViewType): IProfileStore => {
    return {
        ...state,
        assetTab: {
            ...state.assetTab,
            activeGridView: value
        }
    };
};

export const toggleVisibilityHelper = (state: IProfileStore, value: SUT_VisibilityToggleType): IProfileStore => {
    return {
        ...state,
        assetTab: {
            ...state.assetTab,
            visibility: value
        }
    };
};

export const setNftsDatasetHelper = async (state: IProfileStore, selectedNfts: SUI_NFTItem[]): Promise<IProfileStore> => {
    const collections: string[] | [] = [...new Set(selectedNfts.map(item => item.contract.name))];
    return {
        ...state,
        assetTab: {
            ...state.assetTab,
            nfts: selectedNfts,
            filteredNfts: selectedNfts,
            collections
        }
    };
};

export const resetAllFiltersHelper = (state: IProfileStore): IProfileStore => {
    return {
        ...state,
        assetTab: {
            ...state.assetTab,
            filteredNfts: state.assetTab.nfts,
            filtersApplied: false,
            filters: {}
        }
    };
};

export const setFilteredNftsByFiltersHelper = (
    state: IProfileStore,
    filters: IProfileAssetsFilters
): IProfileStore => {

    let filtersApplied = false;
    const filteredItems = getFilteredNftsByFilters(state, filters);

    if (filters.collection || filters.rarityRank) {
        filtersApplied = true;
    }

    return {
        ...state,
        assetTab: {
            ...state.assetTab,
            filtersApplied,
            filteredNfts: filteredItems,
            filters
        }
    };
};

const getFilteredNftsByFilters = (state: IProfileStore, filters: IProfileAssetsFilters) => {
    const filteredItems = state.assetTab.nfts?.reduce((filteredSwaps, nftItem) => {

        if (
            (!filters.collection || nftItem.contract.name.toLowerCase() === filters.collection.toLowerCase()) &&
            (!filters.rarityRank || (nftItem.rarityRank && (nftItem.rarityRank >= filters.rarityRank.from && nftItem.rarityRank <= filters.rarityRank.to)))
        ) {
            filteredSwaps.push(nftItem);
        }
        return filteredSwaps;
    }, [] as SUI_NFTItem[]);
    return filteredItems;
};


// Subdomain minting helpers start here

export const setNavigateCreateSubdomainStepHelper = (state: IProfileStore, navigationMode: "PREVIOUS" | "NEXT"): IProfileStore => {
    const { steps, currentStep } = state.overviewTab.subdomainSection.createNewSubdomain;

    const currentIndex = currentStep ? steps.indexOf(currentStep) : -1;

    let newStepIndex = 0;
    if (currentIndex !== -1) {
        if (navigationMode === 'NEXT') {
            newStepIndex = Math.min(currentIndex + 1, steps.length - 1);
        } else if (navigationMode === "PREVIOUS") {
            newStepIndex = Math.max(currentIndex - 1, 0);
        }
    }

    const newCurrentStep = steps[newStepIndex];

    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            subdomainSection: {
                ...state.overviewTab.subdomainSection,
                createNewSubdomain: {
                    ...state.overviewTab.subdomainSection.createNewSubdomain,
                    currentStep: newCurrentStep
                }
            }
        }
    };
};

export const setSubnameValueHelper = (state: IProfileStore, enteredValue: string): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            subdomainSection: {
                ...state.overviewTab.subdomainSection,
                createNewSubdomain: {
                    ...state.overviewTab.subdomainSection.createNewSubdomain,
                    subname: enteredValue
                }
            }
        }
    };
};

export const resetSubnameMintingProcess = (state: IProfileStore): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            subdomainSection: {
                ...state.overviewTab.subdomainSection,
                createNewSubdomain: {
                    ...state.overviewTab.subdomainSection.createNewSubdomain,
                    currentStep: undefined,
                    subname: '',
                    transactionHash: ''
                }
            }
        }
    };
};

export const setTransactionHashHelper = (state: IProfileStore, hash: string): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            subdomainSection: {
                ...state.overviewTab.subdomainSection,
                createNewSubdomain: {
                    ...state.overviewTab.subdomainSection.createNewSubdomain,
                    transactionHash: hash
                }
            }
        }
    };
};
export const setActiveTabHelper = (state: IProfileStore, switchTo: SUT_SubdomainTabType): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            subdomainSection: {
                ...state.overviewTab.subdomainSection,
                activeTab: switchTo
            }
        }
    };
};

export const setAvailableSubnamesHelper = (state: IProfileStore, subnamesData: SUI_SubnameItem[]): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            subdomainSection: {
                ...state.overviewTab.subdomainSection,
                availableSubnames: subnamesData,
                filteredAvailableSubnames: subnamesData
            }
        }
    };
};

export const setWalletTokenBreakdownDataHelper = (state: IProfileStore, tokensData: SUI_TokenBreakdownChartItem[], totalUsdAmount: number): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            walletTokenBreakdownData: tokensData,
            totalWalletValue: totalUsdAmount
        }
    };
};

export const setDistributionOfTokensPerChainHelper = (state: IProfileStore, tokensData: SUI_TokenDistributionPerChainChartItem[]): IProfileStore => {
    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            distributionOfTokensPerChain: tokensData,
        }
    };
};

export const setCollectionOwnedHelper = (state: IProfileStore, collectionsData: SUI_CollectionOwnedItem[]): IProfileStore => {
    let totalNftsOwned = 0;
    collectionsData.forEach(collection => {
        totalNftsOwned = totalNftsOwned + collection.ownedAssets;
    });

    return {
        ...state,
        overviewTab: {
            ...state.overviewTab,
            collectionsOwned: collectionsData,
            totalNftsOwned
        }
    };
};