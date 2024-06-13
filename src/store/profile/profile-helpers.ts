import { ethers } from "ethers";
import { IProfile } from "./profile-store.types";


//==========================================


// Wallet connect helpers start
export const connectToWalletHelper = async (state: IProfile): Promise<IProfile> => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
  
        const address = await signer.getAddress();
        const ensAddress = await provider.lookupAddress(address) || '';
        const network = await provider.getNetwork();
  
        let image = '/src/assets/images/avatar.png';
  
        if (ensAddress) {
          // Fetch ENS avatar if available
          const ensResolver = await provider.getResolver(ensAddress);
          if (ensResolver) {
            const avatar = await ensResolver._getAvatar();
  
            if (avatar && avatar.url) {
              image = avatar.url;
            }
          }
        }
  
        return {
          ...state,
          ensAddress,
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
                  ensAddress,
                  walletAddress: address,
                },
                network: {
                  ...state.privateMarket.privateRoom.sender.network,
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
  
  
  // Wallet connect heplers end
  