export const getInitialProfile = (userType: "sender" | "receiver") => {
    return {
        ensAddress: userType === "sender" ? 'sender.swapup.eth' : 'receiver.swapup.eth',
        avatar: 'assets/images/member11.jpg',
        isPremium: false,
        title: userType,
        wallet: {
            address: '',
            isConnected: false,
            network: {
                id: '84532',
                name: 'Base-Sepolia',
                iconUrl: '/assets/svgs/base-sepolia.svg',
                symbol: 'ETH'
            }
        }
    }
}