let nft = {
    existingSwap: null,

    generateNftCard4Swap: function (
        chkName,
        nftId,
        nftUrl,
        nftTitle,
        nftContract,
        existingSwap = false,
        tknType,
        mediaType
    ) {
        let id = nftId
        let title = nftTitle
        if (nftTitle.length > 21) {
            title = nftTitle.substr(0, 21) + "..."
        }
        if (nftId.length > 4) {
            id = nftId.substr(0, 4) + "..."
        }
        if (existingSwap) {
            //disable the onclick event. make the image darker
            return `<div class="col-lg-4 col-md-4 col-6 mb-4" id="parent_${nftContract}_${nftId}" style="order:-1">
            <div class="nft-card" id="checkbox1">
              <div name="${chkName}" class="nft-img" style="filter: brightness(0.3)" id="${nftContract}_${nftId}" data-nft="${nftId}" data-type=${tknType} data-contract="${nftContract}">
                ` + ui.generateImageOrVideoTag(mediaType, nftUrl, nftTitle) + `
                <div class="check-nft">
                  <img src="assets/images/checked-icon.png">
                </div>
              </div>
              <div class="nft-details">
                <div class="nft-name"><h6 class="name mb-1">${title}</h6></div>
                <div class="IdnBtns">
                    <div class="nft-id"><h6 id="nft-id" class="mb-1">#${id}</h6></div>
                    <div class="d-flex align-items-center gap-2">
                        <a href='${ui.getEtherScanContractNftUrl(
                            nftContract,
                            nftId
                        )}' target='_blank'><img src="assets/images/build.svg" height="20px" alt=""></a>
                        <a href='${ui.getOpenSeaNftUrl(
                            nftContract,
                            nftId
                        )}' target='_blank'><img src="assets/images/boat.svg" height="20px" alt=""></a>
                    </div>
                </div>
              </div>
            </div>
        </div>`
        }
        return `<div class="col-lg-4 col-md-4 col-6 mb-4" id="parent_${nftContract}_${nftId}">
        <div class="nft-card" id="checkbox1">
              <div name="${chkName}" class="nft-img" id="${nftContract}_${nftId}" onclick="ui.checkMark('${nftContract}_${nftId}')" data-nft="${nftId}" data-type=${tknType} data-contract="${nftContract}">
              ` + ui.generateImageOrVideoTag(mediaType, nftUrl, nftTitle) + `
                <div class="check-nft">
                  <img src="assets/images/checked-icon.png" alt="selected">
                </div>
              </div>
              <div class="nft-details">
                <div class="nft-name"><h6 class="name mb-1">${title}</h6></div>
                <div class="IdnBtns">
                    <div class="nft-id"><h6 id="nft-id" class="mb-1">#${id}</h6></div>
                    <div class="d-flex align-items-center gap-2">
                        <a href='${ui.getEtherScanContractNftUrl(
                            nftContract,
                            nftId
                        )}' target='_blank'><img src="assets/images/build.svg" height="20px" alt=""></a>
                        <a href='${ui.getOpenSeaNftUrl(
                            nftContract,
                            nftId
                        )}' target='_blank'><img src="assets/images/boat.svg" height="20px" alt=""></a>
                    </div>
                </div>
              </div>
            </div>
        </div>`
    },

    bindNfts4Swap: function (data, pending, elem, chkName) {
        pending = pending.map((p) => ({
            id: p.id,
            metadata: JSON.parse(p.metadata)
        }))
        var nftInnerHtml = ""
        data.forEach((element) => {
            var id = element.tokenId
            var title = element.title
            var type = element.tokenType
            var src = element.media[0]?.gateway
            var mediaType = element.media[0]?.format
            var address = element.contract.address
            var existingSwap = this.isPartOfPendingSwap(id, address, pending)
            nftInnerHtml += this.generateNftCard4Swap(
                chkName,
                id,
                src,
                title,
                address,
                existingSwap,
                type,
                mediaType
            )
        })

        document.getElementById(elem).innerHTML = nftInnerHtml
    },

    //check if the current nft is part of an other pending swap
    isPartOfPendingSwap: function (tokenId, tokenAddress, pending) {
        //do not include existing/current swap.
        if (this.existingSwap)
            pending = pending.filter((p) => p.id !== this.existingSwap.id)

        let found = false
        pending.forEach((swap) => {
            //swap.metadata = JSON.parse(swap.metadata);
            let obj1 = swap.metadata.init.tokens.find(
                (t) => t.id === tokenId && t.address === tokenAddress
            )
            let obj2 = swap.metadata.accept.tokens.find(
                (t) => t.id === tokenId && t.address === tokenAddress
            )
            if (obj1 || obj2) found = true
        })

        return found
    },

    //load nfts for the connected wallet
    loadNftsForConnectedWallet: async function () {
        let connectedWallet = await metamask.getConnectedWallet()
        if (!connectedWallet) return false

        ui.setTextBoxValue("txtInitWallet", connectedWallet, true)

        //get the nfts for the current network the wallet is connected to
        let nfts = await api.getNftsForWallet(connectedWallet)
        let pendingSwaps = await api.getPendingSwapsForWallet(connectedWallet)
        //bind the nfts
        this.bindNfts4Swap(
            nfts,
            pendingSwaps.data,
            "nftInitiatorHtml",
            "chkInitiator"
        )

        ui.showHideControl(false, "btnConnectWallet")
    },

    //load nfts for searched wallet
    loadNftsForSecondaryWallet: async function (secondaryWallet) {
        //check if initiator and acceptor are different wallets
        let connectedWallet = await metamask.getConnectedWallet()
        if (!connectedWallet) return
        if (connectedWallet === secondaryWallet.trim()) {
            ui.alert("Please inupt a different wallet address")
            return
        }

        let nfts = await api.getNftsForWallet(secondaryWallet)
        let pendingSwaps = await api.getPendingSwapsForWallet(secondaryWallet)

        this.bindNfts4Swap(
            nfts,
            pendingSwaps.data,
            "nftAcceptorHtml",
            "chkAcceptor"
        )
    },

    //load existing swap details
    loadExistingSwapDetails: async function (swapData, connectedWallet) {
        this.existingSwap = swapData
        if (this.existingSwap.status !== 1) {
            ui.alert("this trade has ended")
            return false
        }

        this.existingSwap.metadata = JSON.parse(swapData.metadata)
        console.log("Existing Swap: " + this.existingSwap)

        if (
            connectedWallet !== this.existingSwap.accept_address &&
            connectedWallet !== this.existingSwap.init_address
        ) {
            ui.alert(
                "connected wallet must be either the initiator or acceptor of this swap"
            )
            return false
        }

        //connected wallet will always be on the left hand side
        await this.loadNftsForConnectedWallet()

        let initiator = false
        //load the secondary wallet data
        if (connectedWallet === this.existingSwap.init_address) initiator = true

        if (initiator) {
            await this.loadNftsForSecondaryWallet(
                this.existingSwap.accept_address
            )
            ui.setTextBoxValue(
                "txtDestWallet",
                this.existingSwap.accept_address,
                true
            )
        } else {
            await this.loadNftsForSecondaryWallet(
                this.existingSwap.init_address
            )
            ui.setTextBoxValue(
                "txtDestWallet",
                this.existingSwap.init_address,
                true
            )
        }

        //set the checked items based on existing swap
        ui.setCheckedItems(this.existingSwap)
        return true
    },

    //send offer flow
    sendOffer: async function () {
        let src = ui.getSourceCheckedItems()
        let dst = ui.getDestinationCheckedItems()

        //make sure atleast one nft is selected on either side
        if (src.length == 0 || dst.length == 0) {
            ui.alert("Please select at least one item from each wallet")
            return
        }

        ui.showHideControl(false, "btnOffer")
        let swap = {}
        swap = {
            init_address: null,
            accept_address: null,
            init_sign: null,
            accept_sign: null,
            metadata: {
                init: {
                    tokens: src
                },
                accept: {
                    tokens: dst
                }
            }
        }

        //if this was an existing swap then update the existing one
        swap.init_address = await metamask.getConnectedWallet()
        if (this.existingSwap) {
            //if init address is the same for existing swap then it means the initiator has opened the swap again
            swap.id = this.existingSwap.id
            if (this.existingSwap.init_address === swap.init_address)
                swap.accept_address = this.existingSwap.accept_address
            else swap.accept_address = this.existingSwap.init_address
        } else {
            //this is a new swap, so fetch the accept address from text box
            swap.accept_address = document.getElementById("txtDestWallet").value
        }

        console.log("Sending Offer", swap.init_address, swap.accept_address)

        // todo: trigger metamask for nft approvals. we need to check everytime even if it is a counter offer
        ui.showloadingScreen(true)
        let signature = await metamask.getUserSignature(swap)
        if (!signature) {
            ui.showloadingScreen(false)
            ui.nftChecked()
            return
        }
        swap.init_sign = signature
        let approval = await metamask.getUserApproval(swap, true)
        ui.showloadingScreen(false)

        if (!approval) {
            ui.nftChecked()
            return
        }

        // - The following section contains logic for getting user signatures. Not sure if it is needed
        // // todo: trigger metamask for signature.
        // let signature = await metamask.getUserSignature(swap);
        // if(signature === "cancel" || signature === "error") return;
        //NOTE: Every swap offer/counteroffer will be a new offer where the current wallet is the initiator
        // So we just overwrite the swap structure in case of existing swap without worrying whether the current wallet was initiator or acceptor
        //save swap signatures
        //swap.init_sign = signature

        //save swap offer in database

        let res = null
        if (swap.id) res = await api.updateSwapOffer(swap)
        else res = await api.createSwapOffer(swap)

        if (res.success) {
            ui.alert("Offer Succesfully Sent")
            setTimeout(() => {
                ui.goToAppHome()
            }, 5000)
            ui.setOfferState("offer_sent")
        } else {
            ui.alert("an error occurred while sending the offer")
        }
    },

    acceptOffer: async function () {
        ui.showloadingScreen(true)
        let approve = await metamask.getUserApproval(this.existingSwap, false)
        ui.showloadingScreen(false)

        if (!approve) return

        //initiate the transfers
        ui.showloadingScreen(true)
        let res = await metamask.triggerTransfer(this.existingSwap)
        ui.showloadingScreen(false)

        if (!res) {
            this.insertUrlsAndNamesInMetadata("init")
            this.insertUrlsAndNamesInMetadata("accept")
            let res2 = await api.updateSwapStatus({
                id: this.existingSwap.id,
                status: 4,
                txn: res?.hash,
                notes: res?.notes,
                metadata: JSON.stringify(this.existingSwap.metadata),
                timestamp: Math.floor(new Date().getTime() / 1000)
            })
            if (res2.success) {
                ui.alert("Swap Failed")
                setTimeout(() => {
                    ui.goToAppHome()
                }, 5000)
            } else {
                ui.alert(
                    `An error occurred while accepting the swap. Blockchain status 4. Contact the admin`
                )
            }
            return
        }

        let stts = 2 //keep default status to pending
        if (res.status == 0) stts = 4 //Failed
        //update the database
        this.insertUrlsAndNamesInMetadata("init")
        this.insertUrlsAndNamesInMetadata("accept")
        let res2 = await api.updateSwapStatus({
            id: this.existingSwap.id,
            status: stts,
            txn: res.hash,
            notes: res.notes,
            metadata: JSON.stringify(this.existingSwap.metadata),
            timestamp: res.timestamp
        })
        if (res2.success) {
            ui.alert("Swap Completed")
            setTimeout(() => {
                ui.goToAppHome()
            }, 5000)
        } else {
            ui.alert(
                `An error occurred while accepting the swap. Blockchain status ${stts}. Contact the admin`
            )
        }
    },

    insertUrlsAndNamesInMetadata: function (user) {
        this.existingSwap.metadata[user].tokens.forEach((tkn) => {
            const img = document.getElementById(`${tkn.address}_${tkn.id}`)
                .childNodes[1]
            const url = img.src
            const name = img.alt
            tkn.image = url
            tkn.name = name
        })
    },

    rejectOffer: async function () {
        this.insertUrlsAndNamesInMetadata("init")
        this.insertUrlsAndNamesInMetadata("accept")
        let res = await api.updateSwapStatus({
            id: this.existingSwap.id,
            status: 3,
            txn: "",
            notes: "",
            metadata: JSON.stringify(this.existingSwap.metadata),
            timestamp: Math.floor(new Date().getTime() / 1000)
        })
        if (res.success) {
            ui.alert("Offer Rejected")
            setTimeout(() => {
                ui.goToAppHome()
            }, 5000)
        } else {
            ui.alert("an error occurred while rejecting the swap")
        }
    }
}

;(async function () {
    //load existing swap if swapId is present in the query string
    const swapId = ui.getValueFromQueryString("swapId")
    if (swapId) {
        //make sure metamask is connected before fetching the swap details
        let connectedWallet = await metamask.getConnectedWallet()
        if (!connectedWallet) return

        ui.setTextBoxValue("txtInitWallet", connectedWallet, true)

        //load existing swap view
        const swapData = await api.getSwapDetails(swapId, connectedWallet)
        if (swapData.success) {
            let res = await nft.loadExistingSwapDetails(
                swapData.data,
                connectedWallet
            )
            if (!res) return //do not unless it is a pending swap or some other issues.

            //do not allow users to modify the destination wallet address for existing swaps
            if (connectedWallet !== nft.existingSwap.init_address) {
                ui.setOfferState("accept")
            } else {
                //current wallet is the initiator
                ui.setOfferState("readonly")
            }

            ui.setAllLoaded() //only allow ui selection once all are loaded
        } else ui.alert(swapData.message)
    } else {
        //load new swap view
        await nft.loadNftsForConnectedWallet()
        ui.setAllLoaded()
    }
})()
