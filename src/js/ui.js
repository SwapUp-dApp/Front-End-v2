//global settings
var _global = {
    isProd: false,
    contract: "0x608ab31e043b78e69a818ce47a145ca40419c362"
};

var ui = {
    readOnlyView: false,
    allLoaded: false,
    // etherScanUrl: (_global.isProd ? "https://etherscan.io" : "https://goerli.etherscan.io"), //.etherscan.io
    etherScanUrl: (_global.isProd ? "https://etherscan.io" : "https://sepolia.etherscan.io"), //.etherscan.io
    openSeaUrl: (_global.isProd ? "https://opensea.io" : "https://testnets.opensea.io"), //assets/[ethereum/goerli]/0x394e3d3044fc89fcdd966d3cb35ac0b32b0cda91/1534",

    getEtherScanTransactionUrl: function (txnHash) {
        return `${this.etherScanUrl}/tx/${txnHash}`;
    },

    getEtherScanContractNftUrl: function (token, nftId) {
        return `${this.etherScanUrl}/token/${token}?a=${nftId}`;
    },

    getOpenSeaNftUrl: function (token, nftId) {
        let network = (_global.isProd ? "ethereum" : "goerli");
        return `${this.openSeaUrl}/assets/${network}/${token}/${nftId}`;
    },

    setAllLoaded: function () {
        this.allLoaded = true;
    },

    showSidebar: function () {
        var element = document.getElementById("sidebar");
        element.classList.toggle("show-sidebar");

        var elem = document.getElementById("toggle");
        elem.classList.toggle("activate");
    },

    handleBrowseClick: function (input_image) {
        var fileinput = document.getElementById(input_image);
        fileinput.click();
    },

    checkMark: function (chkId) {
        if (this.readOnlyView) return;

        var element = document.getElementById(chkId);
        element.classList.toggle("checked");
        element.className.includes("checked")
            ? (document.querySelector(`#parent_${chkId}`).style.order = -2)
            : (document.querySelector(`#parent_${chkId}`).style.order = 0);
        //the allLoaded check prevents the nftChecked callback to be fired before all the nfts are loaded for existing swaps
        if (this.allLoaded) this.nftChecked();
    },

    nftChecked: async function () {
        let connectedWallet = await metamask.getConnectedWallet();

        let src = this.getSourceCheckedItems();
        let dst = this.getDestinationCheckedItems();

        if (src.length == 0 || dst.length == 0) {
            //atleast one item must be selected to enable the command buttons, otherwise keep them empty
            this.setOfferState("empty");
            return;
        }

        if (!nft.existingSwap) {
            this.setOfferState("offer");
            return;
        }

        //** Load for existing swaps //
        //if connected wallet initiated the swap then he cannot modify it.
        if (connectedWallet === nft.existingSwap.init_address) return;

        let existingSwapDirty = false;
        if (!this.areTokensEqual(nft.existingSwap.metadata.init.tokens, dst))
            existingSwapDirty = true;
        if (!this.areTokensEqual(nft.existingSwap.metadata.accept.tokens, src))
            existingSwapDirty = true;

        if (existingSwapDirty) {
            //hide accept and reject buttons
            this.setOfferState("counter");
        } else {
            this.setOfferState("accept");
        }
    },

    areTokensEqual: function (a, b) {
        if (a.length !== b.length) return false;

        let equal = true;
        a.forEach((v) => {
            const b1 = b.filter((e) => e.id === v.id && e.address === v.address);
            if (b1.length == 0) equal = false;
        });
        return equal;
    },

    setOfferState: function (offerState) {
        this.readOnlyView = false;
        switch (offerState) {
            case "readonly": //for initiator, it will always be a readonly view
                this.readOnlyView = true;
                this.changeOfferColor("source", "green");
            case "empty": //do not show any offer/accept/reject buttons
                //helpful in handling checked/unchcked situations
                this.showHideControl(false, "btnAccept");
                this.showHideControl(false, "btnReject");
                this.showHideControl(false, "btnOffer");
                break;
            case "offer": //'assets/images/un-checked.png'
                this.showHideControl(false, "btnAccept");
                this.showHideControl(false, "btnReject");
                this.showHideControl(true, "btnOffer");
                break;
            case "offer_sent":
                this.changeOfferColor("source", "green");
                break;
            case "accept":
                this.showHideControl(false, "btnOffer");
                this.showHideControl(true, "btnAccept");
                this.showHideControl(true, "btnReject");
                this.changeOfferColor("dest", "green");
                break;
            case "accept_sent":
                break;
            case "counter":
                this.showHideControl(false, "btnAccept");
                this.showHideControl(false, "btnReject");
                this.changeControlText("btnOffer", "Counter Offer");
                this.showHideControl(true, "btnOffer");
                this.changeOfferColor("source", "red");
                this.changeOfferColor("dest", "red");
                break;
            case "wait":
                this.showloadingScreen();
                break;
        }
    },

    showloadingScreen: function (show = true) {
        if (show) {
            document.getElementById("nftContentWait").style.display = "block";
            document.getElementById("nftContent").style.zIndex = -1;
            if (document.getElementById("nftCommands"))
                document.getElementById("nftCommands").style.display = "none";
        } else {
            document.getElementById("nftContent").style.zIndex = 0;
            document.getElementById("nftContentWait").style.display = "none";
            if (document.getElementById("nftCommands"))
                document.getElementById("nftCommands").style.display = "block";
        }
    },

    showHideControl: function (show, controlId) {
        let ctrl = document.getElementById(controlId);
        if (ctrl) {
            if (!show) {
                ctrl.style.display = "none";
            } else {
                ctrl.style.display = "block";
            }
        }
    },

    changeControlText: function (controlId, text) {
        document.getElementById(controlId).innerHTML = `<span> ${text} </span>`;
    },

    setTextBoxValue: function (textBoxId, text, readonly = false) {
        let inputBox = document.getElementById(textBoxId);
        inputBox.value = text;
        inputBox.readOnly = readonly;
    },

    getSourceCheckedItems: function () {
        return this.getAllCheckedItems("chkInitiator");
    },

    getDestinationCheckedItems: function () {
        return this.getAllCheckedItems("chkAcceptor");
    },

    getAllCheckedItems: function (name) {
        var elems = document.getElementsByName(name);
        var checked = [];
        elems.forEach((e) => {
            if (e.classList.contains("checked")) {
                checked.push({
                    id: e.dataset.nft,
                    address: e.dataset.contract,
                    type: e.dataset.type
                });
            }
        });
        return checked;
    },

    setCheckedItems: function (swapData) {
        swapData.metadata.init.tokens.forEach((elem) => {
            this.checkMark(`${elem.address}_${elem.id}`);
        });

        swapData.metadata.accept.tokens.forEach((elem) => {
            this.checkMark(`${elem.address}_${elem.id}`);
        });
    },

    getValueFromQueryString: function (id) {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);

        return urlParams.get(id);
    },

    goToAppHome: function () {
        window.location.href = "/app";
    },

    changeOfferColor: function (party, color) {
        let ctrl =
            party === "source" ? "imgSourceAgreement" : "imgDestAgreement";
        let img =
            color === "green"
                ? "assets/images/checked-icon.png"
                : "assets/images/un-checked.png";

        document.getElementById(ctrl).src = img;
    },

    alert: function (msg) {
        Swal.fire({
            position: "top",
            title: msg,
            timer: 5000,
            timerProgressBar: true
        });
    },

    // generate nft cards for swap summary
    swapSummaryGenerator: function (e) {
        const meta = JSON.parse(e.target.dataset.meta);
        this.modalSmileyOrSad(e);
        let initHtml = "";
        let acceptHtml = "";
        initHtml = this.nftCardGenerator(meta.init.tokens);
        acceptHtml = this.nftCardGenerator(meta.accept.tokens);
        if (e.target.dataset.user === e.target.dataset.init) {
            document.querySelector(".user-nfts").innerHTML = initHtml;
            document.querySelector(".counterparty-nfts").innerHTML = acceptHtml;
        } else {
            document.querySelector(".user-nfts").innerHTML = acceptHtml;
            document.querySelector(".counterparty-nfts").innerHTML = initHtml;
        }
    },

    nftCardGenerator: function (tokens) {
        let html = "";
        tokens.forEach((tkn) => {
            html += `<div class="sm-card">
                                    <div class="sm-img">
                                        <img
                                            src="${tkn.image}"
                                            alt=""
                                        />
                                    </div>
                                    <div class="sm-details" style="overflow:hidden">
                                        <h6 class="name">${tkn?.name}</h6>
                                        <h6 class="name">#${tkn.id}</h6>
                                    </div>
                                </div>`;
        });
        return html;
    },

    // show smiley face or sad face in summary modal according to swap outcome
    modalSmileyOrSad: function (e) {
        const usernames = document.querySelectorAll(".user-detail .name");
        e.target.dataset.status === "Accepted"
            ? (document.querySelector("#status-img > img").src =
                "assets/images/happy.svg")
            : (document.querySelector("#status-img > img").src =
                "assets/images/sad.svg");
        usernames[0].innerHTML = e.target.dataset.user;
        usernames[1].innerHTML = e.target.dataset.counterparty;
    },

    generateImageOrVideoTag: function (mediaType, nftUrl, nftTitle) {
        let isVideo = false;
        if (mediaType === "mp4") isVideo = true;
        return isVideo === false ? `<img src="${nftUrl}" alt="${nftTitle}">` : `<video src="${nftUrl}" alt="${nftTitle}">`;
    },
};
