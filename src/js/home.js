var home = {
    generateNftCard: function (nftId, nftTitle, nftUrl, token) {
        let id = nftId
        let title = nftTitle
        if (nftTitle.length > 21) {
            title = nftTitle.substr(0, 21) + "..."
        }
        if (nftId.length > 4) {
            id = nftId.substr(0, 4) + "..."
        }
        return `<div class="nft-card">
                  <div class="nft-img">
                    <img src="${nftUrl}" alt="">
                  </div>
                  <div class="nft-details">
                <div class="nft-name"><h6 class="name mb-1">${title}</h6></div>
                <div class="IdnBtns">
                    <div class="nft-id"><h6 id="nft-id" class="mb-1">#${id}</h6></div>
                    <div class="d-flex align-items-center gap-2">
                        <a href='${ui.getEtherScanContractNftUrl(
                            token,
                            nftId
                        )}' target='_blank'><img src="assets/images/build.svg" height="20px" alt=""></a>
                        <a href='${ui.getOpenSeaNftUrl(
                            token,
                            nftId
                        )}' target='_blank'><img src="assets/images/boat.svg" height="20px" alt=""></a>
                    </div>
                </div>
              </div>
                </div>`
    },

    generatePendingRow: function (
        id,
        wallet,
        date,
        metadata,
        initAdd,
        acceptAdd
    ) {
        return `<tr id=${id.toString()}>
              <td><a href='nft.html?swapId=${id}'><div class="address-wallet">${wallet}</div><a/></td>
              <td>${date}</td>
              <td>Pending</td>
              <td>
                <a href="javascript:void(0)" class="cancel-icon" onclick="home.cancelSwap(event)">
                <img src="assets/images/cancel-icon.svg" alt="" id=${id.toString()} data-meta=${metadata} data-init=${initAdd} data-accept=${acceptAdd}>
                </a>
              </td>
            </tr>`
    },

    generateHistoryRow: function (
        wallet,
        date,
        status,
        txn,
        user,
        counterparty,
        metadata,
        initiator
    ) {
        var statusText = ""
        let icon
        switch (status) {
            case 0: //cancelled
                statusText = "Cancelled"
                break
            case 1: //pending/signed
                statusText = "Pending"
                break
            case 2: //accepted
                statusText = "Accepted"
                break
            case 3: //rejected
                statusText = "Rejected"
                break
            case 4: //failed
                statusText = "TXN Failed"
                break
        }
        icon =
            statusText === "Accepted" ? "checked-icon.png" : "cancel-icon.svg"
        //history
        if (txn && txn !== "undefined")
            txn = `<a href='${ui.getEtherScanTransactionUrl(
                txn
            )}' target='_blank'>${"" + txn.substring(0, 10).concat("...")}</a>`
        else txn = ""

        return `<tr>
              <td><div class="address-wallet">${wallet}</div></td>
              <td>${date}</td>
              <td>
                <a
                    href="javascript:void(0)"
                    onclick="ui.swapSummaryGenerator(event)"
                    data-status='${statusText}'
                    data-user='${user}'
                    data-counterparty='${counterparty}'
                    data-init='${initiator}'
                    data-meta='${metadata}'
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="view-btn"
                >
                    VIEW
                </a>
              </td>
              <td>
                <a
                    href="javascript:void(0)"
                    class="cancel-icon"
                >
                    <img src="assets/images/${icon}" alt="" />
                </a>
              </td>
              <td>${txn}</td>
            </tr>`
    },

    //bind pending swaps on the index page
    bindPendingSwaps: function (data, connectedWallet) {
        var pendingInnerHtml = ""
        data.sort((a, b) => {
            let diff = new Date(a.updatedAt) - new Date(b.updatedAt)
            //console.log(diff)
            return diff
        })
        data.forEach((element) => {
            var id = element.id
            var acceptAddress =
                connectedWallet === element.init_address
                    ? element.accept_address
                    : element.init_address
            let metadata = element.metadata
            acceptAddress = this.shortWalletAddress(acceptAddress)
            var created = new Date(element.updatedAt).toLocaleString()
            pendingInnerHtml += this.generatePendingRow(
                id,
                acceptAddress,
                created,
                metadata,
                element.init_address,
                element.accept_address
            )
        })

        document.getElementById("tbodyPending").innerHTML = pendingInnerHtml
    },

    //bind swap history on the index page
    bindSwapHistory: function (data, connectedWallet) {
        let historyInnerHtml = ""
        data.sort((a, b) => {
            let diff = new Date(b.updatedAt) - new Date(a.updatedAt)
            //console.log(diff)
            return diff
        })
        data.forEach((element) => {
            let acceptAddress =
                connectedWallet === element.init_address
                    ? element.accept_address
                    : element.init_address
            let shortAcceptAddress = this.shortWalletAddress(acceptAddress)
            // Create a new Date object from the Unix timestamp
            let timestamp = new Date(element?.timestamp * 1000).toLocaleString()
            //.substring(0, 10)
            let status = element.status
            let tx = element.tx
            let meta = element.metadata
            //console.log(meta)
            let initAdd = element.init_address
            if (status !== 1)
                //bind only non pending records
                historyInnerHtml += this.generateHistoryRow(
                    shortAcceptAddress,
                    timestamp,
                    status,
                    tx,
                    connectedWallet,
                    acceptAddress,
                    meta,
                    initAdd
                )
        })

        document.getElementById("tbodyHistory").innerHTML = historyInnerHtml
    },

    //bind nfts on the index page
    bindNfts: function (data) {
        var nftInnerHtml = ""
        data.forEach((element) => {
            //if(element.tokenType !== "ERC721") return;
            var id = element.tokenId
            var title = element.title
            var src = element.media[0]?.gateway
            nftInnerHtml += this.generateNftCard(
                id,
                title,
                src,
                element.contract.address
            )
        })

        document.getElementById("nftScroll").innerHTML = nftInnerHtml
    },

    loadPendingSwaps: async function () {
        let connectedWallet = await metamask.getConnectedWallet()
        if (!connectedWallet) return

        //get the nfts for the current network the wallet is connected to
        let pendingSwaps = await api.getPendingSwapsForWallet(connectedWallet)

        this.bindPendingSwaps(pendingSwaps.data, connectedWallet)
    },

    loadSwapHistory: async function () {
        let connectedWallet = await metamask.getConnectedWallet()
        if (!connectedWallet) return

        //get the nfts for the current network the wallet is connected to
        let swapHistory = await api.getSwapHistoryForWallet(connectedWallet)

        this.bindSwapHistory(swapHistory.data, connectedWallet)
    },

    cancelSwap: async function (e) {
        const id = e.target.id
        let meta = JSON.parse(e.target.dataset.meta)
        await this.insertUrlsAndNamesInMetadata(
            meta,
            e.target.dataset.init,
            e.target.dataset.accept
        )
        console.log("meta", meta)
        meta = JSON.stringify(meta)
        let res = await api.updateSwapStatus({
            id: id,
            status: 0,
            metadata: meta,
            timestamp: Math.floor(new Date().getTime() / 1000)
        })
        if (res.success) {
            ui.alert("Offer Cancelled")
            document.getElementById(id).remove()
            //await this.loadPendingSwaps();
        }
    },

    insertUrlsAndNamesInMetadata: async function (
        metadata,
        initAdd,
        acceptAdd
    ) {
        const initNfts = await api.getNftsForWallet(initAdd)
        console.log(initNfts)
        const acceptNfts = await api.getNftsForWallet(acceptAdd)
        console.log(acceptNfts)
        metadata.init.tokens.forEach((tkn) => {
            initNfts.forEach((nft) => {
                if (
                    nft.contract.address === tkn.address &&
                    nft.tokenId == tkn.id
                ) {
                    tkn.image = nft.rawMetadata.image
                    tkn.name = nft.rawMetadata.name
                }
            })
        })
        metadata.accept.tokens.forEach((tkn) => {
            acceptNfts.forEach((nft) => {
                if (
                    nft.contract.address === tkn.address &&
                    nft.tokenId == tkn.id
                ) {
                    tkn.image = nft.rawMetadata.image
                    tkn.name = nft.rawMetadata.name
                }
            })
        })
    },

    shortWalletAddress: function (address) {
        let left = address.substring(0, 8).concat("...")
        let right = address.slice(-6)
        return left.concat(right)
    },

    linkToEtherscan: function () {},

    loadNftsOnMainPage: async function () {
        let connectedWallet = await metamask.getConnectedWallet()
        if (!connectedWallet) {
            ui.alert(
                "Please Connect Wallet to Load Assets and Use the SwapUp dApp"
            )
            return
        }

        ui.setTextBoxValue(
            "txtWalletName",
            this.shortWalletAddress(connectedWallet)
        )
        //get the nfts for the current network the wallet is connected to
        let nfts = await api.getNftsForWallet(connectedWallet)
        //bind the nfts on home screen
        this.bindNfts(nfts)

        ui.showHideControl(false, "btnConnectWallet")
    }
}

//load nfts when index view is loaded
home.loadNftsOnMainPage()
