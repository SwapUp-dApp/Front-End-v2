export const getInitialProfile = (userType: "sender" | "receiver") => {
  return {
    ensAddress: userType === "sender" ? 'sender.swapup.eth' : 'receiver.swapup.eth',
    avatar: '/assets/images/avatar.png',
    isPremium: false,
    title: userType,
    wallet: {
        address: '',
        isConnected: false,
        network: {
            id: '1',
            name: 'Ethereum',
            iconUrl: '/assets/svgs/ethereum.svg',
            symbol: 'ETH'                
        }
    }
} 
}