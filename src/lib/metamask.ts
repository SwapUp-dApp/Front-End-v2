import { useSwapMarketStore } from "@/store/swap-market";
import { SUT_RoomKeyType } from "@/store/swap-market/swap-market-types";
import { SUI_Swap } from "@/types/swap-market.types";
import { ethers, JsonRpcSigner } from 'ethers';

const state = useSwapMarketStore(state => state);



const getUserSignature = async (
  swap: SUI_Swap,
  swapEncodedMsg: string,
  chainId: number,
  swapUpContract: string,
  signer: JsonRpcSigner,
  roomKey: SUT_RoomKeyType) => {


  //return "cancel" or "error" in case user does not sign OR there is an error
  let swapEncodedBytes = await getSwapEncodedBytes(swap);

  if (swapEncodedBytes !== swapEncodedMsg) {
    console.log("bytes", swapEncodedBytes);

    const sign = await getMetamaskSignature(swap, chainId, swapUpContract, signer);
    if (sign) {
      swapEncodedMsg = swapEncodedBytes;
    }
  }
  // return this.sign;
};

export const getSwapEncodedBytes = async (swap: SUI_Swap) => {
  console.log("meta", swap);

  const abiEncoder = new ethers.AbiCoder();
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
};

export const getMetamaskSignature = async (
  swap: SUI_Swap,
  chainId: number,
  swapUpContract: string,
  signer: JsonRpcSigner) => {

  const domain = {
    name: "swap up",
    version: "1.0",
    chainId: chainId,
    verifyingContract: swapUpContract
  };

  const types = {
    set: [
      { name: "sender", type: "address" },
      { name: "msg", type: "string" }
    ]
  };

  let signerAddress = await signer.getAddress();

  try {
    let sign = await signer.signTypedData(domain, types, {
      sender: signerAddress,
      msg: generateSignString(swap)
    });

    console.log("sign", sign);
    return sign;

  } catch (err) {
    console.log(err);
    return null;
  }
};

export const generateSignString = async (swap: SUI_Swap) => {
  const initNfts = swap.metadata.init.tokens.map((tkn, i) => {
    return i === swap.metadata.init.tokens.length - 1
      ? `[
        id: ${tkn.id}, 
        type: ${tkn.type.substr(3)}, 
        contract address: ${tkn.address}
      ]`
      : `[
        id: ${tkn.id}, 
        type: ${tkn.type.substr(3)}, 
        contract address: ${tkn.address}
      ]`;
  });

  const acceptNfts = swap.metadata.accept.tokens.map((tkn, i) => {
    return i === swap.metadata.accept.tokens.length - 1
      ? `[
        id: ${tkn.id}, 
        type: ${tkn.type.substr(3)}, 
        contract address: ${tkn.address}
      ]`
      : `[
        id: ${tkn.id}, 
        type: ${tkn.type.substr(3)}, 
        contract address: ${tkn.address}
      ]`;
  });

  let signStr = `${swap.init_address} offering to swap NFTs, ${initNfts} with the NFTs, ${acceptNfts} belonging to ${swap.accept_address}`;
  console.log(signStr);

  return signStr;
};