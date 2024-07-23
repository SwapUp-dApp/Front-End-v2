// -- // @ts-nocheck

import { Environment } from "@/config";
import { abi } from "@/constants/abi";
import { SUI_OpenSwap, SUI_Swap } from "@/types/swap-market.types";
import { ethers, JsonRpcProvider } from 'ethers';
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { Account } from "thirdweb/wallets";
import { ErrorDecoder } from 'ethers-decode-error';
import type { DecodedError } from "ethers-decode-error";
import { thirdWebClient, currentChain } from "./thirdWebClient.ts";
import { SUT_SwapMethodType } from "@/types/wallet-proxy.types.js";
import { SUE_SWAP_MODE } from "@/constants/enums.ts";

interface IAsset {
  assetAddress: string,
  value: number;
}

type SUT_ContractType = "openSwaps" | "swapup";

let walletInstance: ReturnType<typeof walletProxy> | null = null;

export const getWalletProxy = (): ReturnType<typeof walletProxy> => {
  if (!walletInstance) {
    walletInstance = walletProxy();
  }
  return walletInstance;
};

export const walletProxy = () => {
  let connectedWalletAccount: Account | null = null;

  const setConnectedWalletAccount = (connectedAccount: Account) => {
    connectedWalletAccount = connectedAccount;
  };

  const getConnectedWalletAccount = () => {
    return connectedWalletAccount;
  };

  const getEthersProviderAndSigner = async () => {
    // convert a thirdweb account to ethers signer
    let provider: JsonRpcProvider = await ethers6Adapter.provider.toEthers({ client: thirdWebClient, chain: currentChain });
    let signer = await ethers6Adapter.signer.toEthers({
      client: thirdWebClient,
      chain: currentChain,
      account: connectedWalletAccount!,
    });
    return { provider, signer };
  };

  const getEnsInformationByWalletAddress = async (walletAddress: string) => {
    let avatar = null;

    const { provider } = await getEthersProviderAndSigner();
    const ensName = await provider.lookupAddress(walletAddress);

    if (ensName) {
      const resolver = await provider.getResolver(ensName);
      if (resolver) {
        avatar = await resolver.getAvatar();
      }
    }

    return { ensName, avatar };
  };

  const getSwapupContractInstance = async () => {
    const { signer } = await getEthersProviderAndSigner();
    const contract = new ethers.Contract(
      Environment.SWAPUP_CONTRACT,
      abi.swapUp,
      signer
    );
    return contract;
  };

  const getUserSignature = async (
    swap: SUI_Swap,
    swapEncodedMsg: string,
  ) => {
    return { sign: "sign", swapEncodedBytes: "" };
  };

  const getUserApproval = async (swap: SUI_Swap, init = true) => {
    //if there are multiple NFT's in different smart contracts then we will have to call approve for all
    //get unique contracts from swap.metadata.init.tokens
    let tokens =
      init === true
        ? swap.metadata.init.tokens
        : swap.metadata.accept.tokens;
    let uniqueContracts = [...new Set(tokens.map((e) => e.address))];
    let transactions = [];

    //initiate all the approves at once and then wait
    for (const contract of uniqueContracts) {
      try {
        let tx = await setApprovalForAll(contract);
        if (tx) transactions.push(tx);
      } catch (err) {
        //errors like user rejecting the transaction in metamask
        console.log(err);
        return false;
      }
    }

    for (const tx of transactions) {
      if ((await getTransactionReceipt(tx)).status === 0) return false;
    }

    return true;
  };

  //This function checks if our swap contract is given approval to move NFT minted from a contract 
  const setApprovalForAll = async (contractAddress: string) => {
    const { signer } = await getEthersProviderAndSigner();
    const contract = new ethers.Contract(
      contractAddress,
      abi.nft,
      signer
    );

    const currentSmartContract = Environment.SWAPUP_CONTRACT;

    const approved4all = await contract.isApprovedForAll(
      signer,
      currentSmartContract
    );

    console.log('ApprovedForAll : ' + approved4all);
    if (approved4all) return null;

    const tx = await contract.setApprovalForAll(currentSmartContract, true);
    console.log(tx.hash);

    return tx;
  };

  const createAndUpdateSwap = async (swap: SUI_Swap | SUI_OpenSwap, swapAction: SUT_SwapMethodType) => {
    let contract = await getSwapupContractInstance();

    try {
      let initAssets: IAsset[] = [];
      let acceptAssets: IAsset[] = [];

      if (swap.metadata.init.tokens.length > 0) {
        swap.metadata.init.tokens.forEach(ele => {
          initAssets.push({ assetAddress: ele.address, value: Number(ele.id) });
        });
      }

      if (swap.metadata.accept.tokens.length > 0) {
        swap.metadata.accept.tokens.forEach(ele => {
          acceptAssets.push({ assetAddress: ele.address, value: Number(ele.id) });
        });
      }

      let feeInETH = await contract.getFeeInETH();
      console.log(feeInETH);

      let swapType = swap.swap_mode === 1 ? 'PRIVATE' : 'OPEN';
      // if (swapType === 'OPEN' && swapAction !== 'COUNTER') return null; //prevent open market swaps for now.

      let gasLimit = 900000;
      let tx = null;
      switch (swapAction) {
        case 'CREATE':
          tx = await contract["createSwap(string, address, tuple(address, uint256)[], tuple(address, uint256)[], string)"](
            swap.swap_mode === SUE_SWAP_MODE.OPEN ? (swap as SUI_OpenSwap).open_trade_id : swap.trade_id,
            swap.swap_mode === SUE_SWAP_MODE.OPEN ? "0x0000000000000000000000000000000000000000" : swap.accept_address,
            initAssets,
            swap.swap_mode === SUE_SWAP_MODE.OPEN ? [] : acceptAssets,
            swapType,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'PROPOSE':
          tx = await contract["proposeToOpenSwap(string, string, tuple(address, uint256)[])"](
            (swap as SUI_OpenSwap).open_trade_id,
            swap.trade_id,
            initAssets,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'COUNTER':
          tx = await contract["counterSwap(string, tuple(address, uint256)[], tuple(address, uint256)[])"](
            swap.trade_id,
            initAssets,
            acceptAssets,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'ACCEPT':
        case 'REJECT':
          tx = await contract["completeSwap(string, tuple(address, uint256)[], tuple(address, uint256)[], string)"](
            (swap as SUI_OpenSwap).open_trade_id,
            initAssets,
            acceptAssets,
            swapAction === 'ACCEPT' ? 'COMPLETED' : 'REJECTED',
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'CANCEL':
          tx = await contract["cancelSwap(string)"](
            swap.trade_id,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
      }

      let res = await getTransactionReceipt(tx);
      console.log("rec", res);
      return res;
    } catch (err) {
      console.log("txErr", err);
      return null; //transaction rejected or other issues
    }

  };

  const createAndUpdateOpenSwap = async (swap: SUI_OpenSwap, swapAction: SUT_SwapMethodType) => {
    let contract = await getSwapupContractInstance();

    try {
      let initAssets: IAsset[] = [];
      let acceptAssets: IAsset[] = [];

      swap.metadata.init.tokens.forEach(ele => {
        initAssets.push({ assetAddress: ele.address, value: Number(ele.id) });
      });

      if (swap.metadata.accept.tokens.length > 0) {
        swap.metadata.accept.tokens.forEach(ele => {
          acceptAssets.push({ assetAddress: ele.address, value: Number(ele.id) });
        });
      }

      let feeInETH = await contract.getFeeInETH();
      console.log(feeInETH);

      let gasLimit = 900000;
      let tx = null;
      switch (swapAction) {
        case 'CREATE':
          tx = await contract["createOpenMarketSwap(string, tuple(address, uint256)[])"](
            swap.open_trade_id,
            initAssets,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'PROPOSE':
          tx = await contract["proposeForOpenMarketSwap(string, string, tuple(address, uint256)[])"](
            swap.open_trade_id,
            swap.trade_id,
            initAssets,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'COUNTER':
          tx = await contract["counterSwap(string, tuple(address, uint256)[], tuple(address, uint256)[])"](
            swap.trade_id,
            initAssets,
            acceptAssets,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'ACCEPT':
          tx = await contract["acceptOpenMarketProposal(string, string)"](
            swap.open_trade_id,
            swap.trade_id,
            {
              gasLimit: gasLimit,
              value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
        case 'REJECT':
          tx = await contract["completeSwap(string, tuple(address, uint256)[], tuple(address, uint256)[], string)"](
            swap.trade_id,
            initAssets,
            acceptAssets,
            'REJECTED',
            {
              gasLimit: gasLimit,
              // value: feeInETH, //add a bit more to 
            }
          );
          console.log(tx);
          break;
      }

      let res = await getTransactionReceipt(tx);
      console.log("rec", res);
      return res;
    } catch (err) {
      console.log("txErr", err);
      return null; //transaction rejected or other issues
    }

  };

  const getFeeInETH = async () => {
    let contract = await getSwapupContractInstance();

    try {
      const tx = await contract.getFeeInETH();
      console.log(tx);
    } catch (err) {
      const errorDecoder = ErrorDecoder.create();
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`TX Error: ${decodedError.type}, ${decodedError.reason}`);
      return null; //transaction rejected or other issues
    }
  };

  //get the current state of an existing swap from BC
  const getSwap = async (swapId: string) => {
    let contract = await getSwapupContractInstance();
    try {
      const tx = await contract.swaps(swapId);
      console.log(tx);
    } catch (err) {
      const errorDecoder = ErrorDecoder.create();
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`TX Error: ${decodedError.type}, ${decodedError.reason}`);
      return null; //transaction rejected or other issues
    }
  };

  const getTransactionReceipt = async (tx: any) => {
    try {
      // Wait for the transaction to be mined
      let rcpt = await tx.wait();
      console.log(rcpt);
      return rcpt;
    } catch (error: any) {
      const errorDecoder = ErrorDecoder.create();
      const decodedError: DecodedError = await errorDecoder.decode(error);

      console.log(`BC Error: ${decodedError.type}, ${decodedError.reason}`);
    }
    return null;
  };

  const getTimestamp = async (tx: any) => {
    const provider = tx.provider;
    const receipt = await provider.getTransactionReceipt(tx.hash);
    const block = await provider.getBlock(receipt.blockNumber);
    return block.timestamp;
  };

  return {
    setConnectedWalletAccount,
    getConnectedWalletAccount,
    getEthersProviderAndSigner,
    getEnsInformationByWalletAddress,
    getUserApproval,
    getUserSignature,
    createAndUpdateSwap,
    createAndUpdateOpenSwap,
    getFeeInETH,
    getSwap
  };
};