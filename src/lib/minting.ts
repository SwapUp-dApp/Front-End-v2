import { createNamespaceClient, MintTransactionParameters } from "namespace-sdk";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { Environment } from "@/config";

export const namespaceClient = createNamespaceClient({
  chainId: sepolia.id,
});

const LISTED_NAME = Environment.NAMESPACE_LISTED_ENS_NAME;
const ETH_COIN_TYPE = 60;

const privateKey = generatePrivateKey();

export const generateMintingParameters = async (subnameLabel: string, minterAddress: `0x${string}`): Promise<MintTransactionParameters> => {
  // console.log("Sepolia: ", sepolia);
  // Get listed name from namespace api
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
  const walletKey = privateKeyToAccount(privateKey);
  const walletClient = createWalletClient({
    transport: http(),
    chain: sepolia,
    account: minterAddress || walletKey
  });

  // Generate minting parameters
  const mintParams = await generateMintingParameters(subnameLabel, minterAddress);

  // Send transaction
  const transactionHash = await walletClient.writeContract({
    abi: mintParams.abi,
    address: mintParams.contractAddress,
    functionName: mintParams.functionName,
    args: mintParams.args,
    value: mintParams.value
  });

  console.log(transactionHash);

  return transactionHash;
};