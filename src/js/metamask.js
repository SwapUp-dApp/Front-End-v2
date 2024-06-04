var metamask = {
    // networkName: (_global.isProd ? "homestead" : "goerli"), //5 = goerli, 1 = homestead,
    networkName: (_global.isProd ? "homestead" : "sepolia"),
    chainId: (_global.isProd ? 1 : 11155111),
    // chainId: (_global.isProd ? 1 : 5),
    signer: null,
    provider: null,
    swapUpContract: _global.contract,
    swapEncodedMsg: "",
    sign: "",
    nftsLength: 0,
    //connectWallet function on the main page
    connectWallet: async function (forceConnect) {
        //wallet connection through metamask
        if (typeof window.ethereum !== "undefined") {
            //ethereum.request( {method: "eth_requestAccounts" } );
            this.provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
            );
            // The "any" network will allow spontaneous network changes
            this.provider.on("network", (newNetwork, oldNetwork) => {
                // When a Provider makes its initial connection, it emits a "network"
                // event with a null oldNetwork along with the newNetwork. So, if the
                // oldNetwork exists, it represents a changing network
                console.log(oldNetwork, newNetwork);
                if (oldNetwork) {
                    window.location.reload();
                }
            });

            //ethereum.on is coming from @metamask/detectprovider library
            ethereum.on("accountsChanged", (accounts) => {
                console.log(accounts);
                window.location.reload();
            });

            let network = await this.provider.getNetwork();
            console.log(network);

            //make sure we are connected to the right network in metamask
            // if (network.name !== this.networkName) {
            //     ui.alert(`Please connect to the correct network`);
            //     return;
            // }

            if (!forceConnect) {
                const accounts = await ethereum.request({
                    method: "eth_accounts"
                });
                if (accounts.length > 0) {
                    ui.showHideControl(false, "btnConnectWallet");
                } else {
                    ui.showHideControl(true, "btnConnectWallet");
                    return;
                }
            } else {
                await this.provider.send("eth_requestAccounts", []);
            }

            this.signer = this.provider.getSigner();
            let userAddress = await this.signer.getAddress();
            console.log("Current Signer: ", userAddress);
            ui.showHideControl(false, "btnConnectWallet");
            if (typeof home !== "undefined") home.loadNftsOnMainPage();

            if (userAddress === undefined)
                ui.alert("Could not get wallet address");
        } else {
            ui.alert("metamask not connected");
        }
    },

    getConnectedWallet: async function () {
        //show connect Wallet button
        if (!this.signer) await this.connectWallet();

        if (this.signer) return await this.signer.getAddress();
    },

    //get user signatures
    getUserSignature: async function (swap) {
        //return "cancel" or "error" in case user does not sign OR there is an error
        let swapEncodedBytes = this.getSwapEncodedBytes(swap);
        if (swapEncodedBytes !== this.swapEncodedMsg) {
            console.log("bytes", swapEncodedBytes);
            this.sign = await this.getMetamaskSignature(swap);
            if (this.sign) {
                this.swapEncodedMsg = swapEncodedBytes;
            }
        }
        return this.sign;
    },

    getMetamaskSignature: async function (swap) {
        const domain = {
            name: "swap up",
            version: "1.0",
            chainId: this.chainId,
            verifyingContract: this.swapUpContract
        };
        const types = {
            set: [
                { name: "sender", type: "address" },
                { name: "msg", type: "string" }
            ]
        };
        let signerAddress = await this.signer.getAddress();
        try {
            let sign = await this.signer._signTypedData(domain, types, {
                sender: signerAddress,
                msg: this.generateSignString(swap)
            });
            console.log("sign", sign);
            return sign;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    generateSignString: function (swap) {
        const initNfts = swap.metadata.init.tokens.map((tkn, i) => {
            return i === swap.metadata.init.tokens.length - 1
                ? `[id: ${tkn.id}, type: ${tkn.type.substr(
                    3
                )}, contract address: ${tkn.address}]`
                : `[id: ${tkn.id}, type: ${tkn.type.substr(
                    3
                )}, contract address: ${tkn.address}]`;
        });
        const acceptNfts = swap.metadata.accept.tokens.map((tkn, i) => {
            return i === swap.metadata.accept.tokens.length - 1
                ? `[id: ${tkn.id}, type: ${tkn.type.substr(
                    3
                )}, contract address: ${tkn.address}]`
                : `[id: ${tkn.id}, type: ${tkn.type.substr(
                    3
                )}, contract address: ${tkn.address}]`;
        });
        let signStr = `${swap.init_address} offering to swap NFTs, ${initNfts} with the NFTs, ${acceptNfts} belonging to ${swap.accept_address}`;
        console.log(signStr);
        return signStr;
    },

    //check if user approval is not needed to trade nft on their behalf
    getUserApproval: async function (swap, init = true) {
        //if there are multiple NFT's in different smart contracts then we will have to call approve for all
        //get unique contracts from swap.metadata.init.tokens
        let tokens =
            init === true
                ? swap.metadata.init.tokens
                : swap.metadata.accept.tokens;
        let uniqueContracts = [...new Set(tokens.map((e) => e.address))];
        let transactions = [];

        //initiate all the approves at once and then wait
        for (const elem of uniqueContracts) {
            try {
                let tx = await this.triggerApprovalForall(elem);
                if (tx) transactions.push(tx);
            } catch (err) {
                //errors like user rejecting the transaction in metamask
                console.log(err);
                return false;
            }
        }

        for (const tx of transactions) {
            if ((await this.getTransactionReceipt(tx)).status == 0) return false;
        }

        return true;
    },

    //approve all nfts within an nft contract at once
    triggerApprovalForall: async function (nftContractAddress) {
        const contract = new ethers.Contract(
            nftContractAddress,
            abi.nft,
            this.signer
        );
        console.log(contract);

        const approved4all = await contract.isApprovedForAll(
            this.getConnectedWallet(),
            this.swapUpContract
        );
        console.log(approved4all);
        if (approved4all) return null;

        const tx = await contract.setApprovalForAll(this.swapUpContract, true);
        console.log(tx.hash);

        return tx;
    },

    //approve one nft at a time
    triggerApprovalForOne: function (nftContractAddress, tokenId) {
        //return the transaction hash.
    },

    triggerTransfer: async function (swap) {
        const contract = new ethers.Contract(
            this.swapUpContract,
            abi.swapUp,
            this.signer
        );
        console.log(contract);
        let swapEncodedBytes = this.getSwapEncodedBytes(swap);
        try {
            let gas = 200000 + 60000 * this.nftsLength;
            const tx = await contract["swap(bytes,bytes)"](
                swapEncodedBytes,
                swap.init_sign,
                {
                    gasLimit: gas
                }
            );
            console.log(tx);
            let res = await this.getTransactionReceipt(tx);
            ui.changeOfferColor("imgSourceAgreement", "green");
            console.log("rec", res);
            return res;
        } catch (err) {
            console.log("txErr", err);
            return null; //transaction rejected or other issues
        }
    },

    getTimestamp: async function (tx) {
        const rec = await this.provider.getTransactionReceipt(tx.hash);
        const block = await this.provider.getBlock(rec.blockNumber);
        console.log("ts", block.timestamp);
        return block.timestamp;
    },

    getTransactionReceipt: async function (tx) {
        /*** Transaction Receipt Logic (https://docs.ethers.org/v5/api/providers/types/#providers-TransactionResponse)
      If the transaction execution failed (i.e. the receipt status is 0), a CALL_EXCEPTION error will be rejected with the following properties:
          error.transaction - the original transaction
          error.transactionHash - the hash of the transaction
          error.receipt - the actual receipt, with the status of 0
      If the transaction is replaced by another transaction, a TRANSACTION_REPLACED error will be rejected with the following properties:
          error.hash - the hash of the original transaction which was replaced
          error.reason - a string reason; one of "repriced", "cancelled" or "replaced"
          error.cancelled - a boolean; a "repriced" transaction is not considered cancelled, but "cancelled" and "replaced" are
          error.replacement - the replacement transaction (a TransactionResponse)
          error.receipt - the receipt of the replacement transaction (a TransactionReceipt)
    *** Transaction Receipt Logic */
        let res = {
            status: 0,
            hash: tx.hash,
            notes: ""
        };
        try {
            // Wait for the transaction to be mined
            let rcpt = await tx.wait();
            const timestamp = await this.getTimestamp(tx);
            // The transactions was mined without issue
            res.status = rcpt.status;
            res.notes = `from: ${rcpt.from}`;
            res.timestamp = timestamp;
        } catch (error) {
            if (error.code === Logger.errors.TRANSACTION_REPLACED) {
                res.notes = `${error.reason}: ${error.hash} - ${error.replacement?.hash}`;
                if (error.cancelled) {
                    //the transaction was cancelled or replaced
                    res.status = 0;
                } else {
                    //Repriced
                    // The user used "speed up" or something similar in their client, but we now have the updated info
                    if (error.receipt.status == 1) {
                        res.status = 1;
                        res.notes += ` - repriced with success - replacement hash ${error.receipt.hash}`;
                    } else {
                        res.status = 0;
                        res.notes += ` - repriced with failure - replacement hash ${error.receipt.hash}`;
                    }
                }
            } else {
                //CALL_EXCEPTION
            }
        }
        return res;
    },

    getSwapEncodedBytes: function (swap) {
        this.nftsLength =
            swap.metadata.init.tokens.length +
            swap.metadata.accept.tokens.length;
        console.log("meta", swap);
        const abiEncoder = ethers.utils.defaultAbiCoder;
        const encodedInitNftBytesArray = swap.metadata.init.tokens.map(
            (nft) => {
                let type = nft.type === "ERC721" ? 721 : 1155;
                return abiEncoder.encode(
                    ["string", "address", "uint", "uint"],
                    [nft.address, nft.address, nft.id, type]
                );
            }
        );
        const encodedAcceptNftBytesArray = swap.metadata.accept.tokens.map(
            (nft) => {
                let type = nft.type === "ERC721" ? 721 : 1155;
                return abiEncoder.encode(
                    ["string", "address", "uint", "uint"],
                    [nft.address, nft.address, nft.id, type]
                );
            }
        );
        const encodedInitBytes = abiEncoder.encode(
            ["bytes[]", "string", "address", "uint"],
            [
                encodedInitNftBytesArray,
                swap.init_address,
                swap.init_address,
                swap.metadata.init.tokens.length
            ]
        );
        const encodedAcceptBytes = abiEncoder.encode(
            ["bytes[]", "string", "address", "uint"],
            [
                encodedAcceptNftBytesArray,
                swap.accept_address,
                swap.accept_address,
                swap.metadata.accept.tokens.length
            ]
        );
        let finalBytes = abiEncoder.encode(
            ["bytes[]"],
            [[encodedInitBytes, encodedAcceptBytes]]
        );
        return finalBytes;
    }
};
