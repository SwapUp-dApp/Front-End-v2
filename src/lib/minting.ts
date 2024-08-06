import { createNamespaceClient, MintTransactionParameters } from "namespace-sdk";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { Environment } from "@/config";
import { getWalletProxy } from "./walletProxy";
import { SUI_MintParamsRequest, SUI_MintParamsResponse } from "@/types/profile.types";
import { mintSubnameApi } from "@/service/api";

import { ethers } from 'ethers';

const LISTED_NAME = Environment.NAMESPACE_LISTED_ENS_NAME;
const ETH_COIN_TYPE = 60;


export const generateMintingParameters = async (subnameLabel: string, minterAddress: `0x${string}`): Promise<MintTransactionParameters> => {
  // console.log("Sepolia: ", sepolia);
  // Get listed name from namespace api
  const namespaceClient = createNamespaceClient({
    chainId: sepolia.id,
  });

  const listedName = await namespaceClient.getListedName(
    LISTED_NAME,
    sepolia.id
  );

  // Check for name availability
  const isNotTaken = await namespaceClient.isSubnameAvailable(
    listedName,
    subnameLabel
  );

  if (!isNotTaken) {
    throw Error("Subname is already taken!");
  }

  // Generate mint transcation parameters
  const mintDetails = await namespaceClient.getMintTransactionParameters(listedName, {
    minterAddress: minterAddress,
    subnameLabel: subnameLabel,
    subnameOwner: minterAddress,
    // Optionaly, we can also set resolver records with the mint transaction
    records: {
      addresses: [
        {
          address: minterAddress,
          coinType: ETH_COIN_TYPE
        }
      ],
      texts: [
        {
          key: "name",
          value: "namespace"
        }
      ]
    }
  });
  return mintDetails;
};

export const sendMintTransaction = async (subnameLabel: string, minterAddress: `0x${string}`) => {

  // Import your wallet and create a Viem Wallet Client
  // const walletKey = generatePrivateKey();
  const walletKey = generatePrivateKey();

  // console.log("Address: ", privateKey.address);
  // const connectedAccount = getWalletProxy().getConnectedWalletAccount();

  const walletVar = "0xcd2dda722ff681a5703df732cb0d1a463f2ea658bc88251f68d5da87e5943148";

  const privateKey = privateKeyToAccount(walletVar);
  const walletClient = createWalletClient({
    transport: http(),
    chain: sepolia,
    account: privateKey
  });

  const namespaceClient = createNamespaceClient({
    chainId: sepolia.id,
  });

  const listedName = await namespaceClient.getListedName(
    LISTED_NAME,
    sepolia.id
  );

  const mintParams = await namespaceClient.getMintTransactionParameters(listedName, {
    minterAddress: "0xe6a28D675f38856ad383557C76dfdA2238961A49",
    subnameLabel: subnameLabel,
    subnameOwner: "0xe6a28D675f38856ad383557C76dfdA2238961A49"
  });

  // Send transaction
  const transactionHash = await walletClient.writeContract({
    abi: mintParams.abi,
    address: mintParams.contractAddress,
    functionName: mintParams.functionName,
    args: mintParams.args,
    value: mintParams.value,
  });

  console.log(transactionHash);

  return transactionHash;
};


export const handleMintNewSubname = async (subnameLabel: string, minterAddress: `0x${string}`) => {

  try {
    // const latestEnsPublicResolver = "0x8FADE66B79cC9f707aB26799354482EB93a5B7dD";
    const parentLabel = Environment.NAMESPACE_LISTED_ENS_NAME.replace(".eth", '');

    const payload: SUI_MintParamsRequest = {
      parentLabel: parentLabel,
      subnameLabel: subnameLabel,
      label: subnameLabel,
      subnameOwner: minterAddress,
      // resolver: minterAddress,
      network: 'sepolia'
    };

    const response = await mintSubnameApi(payload);
    console.log(response.data);

    const namespaceContract = await getWalletProxy().getNamespaceContractInstance();

    const result: SUI_MintParamsResponse = response.data;

    // Ensure mintFee and mintPrice are parsed correctly using ethers.toBigInt
    const mintPrice = ethers.toBigInt(result.parameters.mintPrice);
    const mintFee = ethers.toBigInt(result.parameters.mintFee);

    // Calculate the total value (mintPrice + mintFee)
    const totalValue = mintPrice + mintFee;

    // Estimate gas limit (or set a conservative default)
    const gasLimit = 300000n; // Adjust as needed, use BigInt

    // Estimate gas price (fetch from network or use a default)
    const gasPrice = ethers.parseUnits('30', 'gwei'); // Example gas price as BigInt

    const tx = await namespaceContract["mint((bytes32,string,address,address,uint32,uint256,uint256,uint64,uint64),bytes)"](
      result.parameters,
      result.signature,
      {
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        value: totalValue,
      }
    );

    const transactionReceipt = await tx.wait();
    console.log(`Transaction Hash: ${tx.hash}`);

    return tx.hash;

  } catch (error) {
    throw error;
  }
};