let _blockchains = {
    BTS: {
        walletSymbols: ['BTS','BADCOIN','HONEST.USD','HONEST.CNY','POCKET','USD','OPEN.ETH'],
        coreSymbol: 'BTS',
        name: 'BitShares',
        chainId: '4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8',
        faucet: {
                url: "https://faucet.bitshares.eu/onboarding", // 2017-12-infrastructure worker proposal
                show: true,
                editable: false,
                referrer: "onboarding.bitshares.foundation"
           
        },
        nodeList: [
            {
                url: "wss://eu.nodes.bitshares.ws"
            },
            {
                url: "wss://bitshares.openledger.info/ws"
            },
            {
                url: "wss://new-york.us.api.bitshares.org/ws"
            },
            {
                url: "wss://bts-seoul.clockwork.gr"
            },
            {
                url: "wss://na.openledger.info/ws"
            },
            {
                url: "wss://bts.proxyhosts.info/wss"
            },
            {
                url: "wss://btsfullnode.bangzi.info/ws"
            },
            {
                url: "wss://japan.bitshares.apasia.tech/ws"
            },
            {
                url: "wss://ws.gdex.top"
            },
            {
                url: "wss://api.dex.trading/"
            }
        ]
    },
    BTS_TEST: {
        walletSymbols:['TEST'],
        coreSymbol: 'TEST',
        name: 'BitShares',
        testnet: true,
        chainId: '39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447',
        faucet: {
            url: "https://faucet.testnet.bitshares.eu", // operated as a contribution by BitShares EU
            show: true,
            editable: false
        },
        nodeList: [
            {
                url: "wss://testnet.nodes.bitshares.ws",
                region: "Western Europe",
                country: "Germany",
                operator: "Infrastructure Worker",
                contact: "email:info@blockchainprojectsbv.com"
            }
        ]
    }
};

Object.keys(_blockchains).forEach(key => {
    _blockchains[key].identifier = key;
});

export const blockchains = _blockchains;
