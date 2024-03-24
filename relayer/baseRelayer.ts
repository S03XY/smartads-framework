import { createPublicClient, createWalletClient, http } from "viem";
import { baseSepolia, optimismSepolia } from "viem/chains";
import { RELAYER_CONTRACT_ABI } from "../contract/relayerContractAbi";
import {
  BASE_MINT_CONTRACT,
  BASE_RELAYER_CONTRACT,
  OP_MINT_CONTRACT,
  OP_RELAYER_CONTRACT,
} from "../libs/constants";
import { privateKeyToAccount } from "viem/accounts";
import { CONTRACT_ABI } from "../contract/abi";

export const initBaseRelayer = async () => {
  const client = createPublicClient({
    transport: http(),
    chain: optimismSepolia,
  });

  client.watchContractEvent({
    abi: RELAYER_CONTRACT_ABI,
    address: BASE_RELAYER_CONTRACT,
    eventName: "DepositEvent",
    onLogs: async (log) => {
      const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY!}`);
      const basePubClient = createPublicClient({
        transport: http(),
        chain: optimismSepolia,
      });

      const { request } = await basePubClient.simulateContract({
        account,
        address: OP_MINT_CONTRACT,
        abi: CONTRACT_ABI,
        functionName: "publicMint",
      });

      const walletClient = createWalletClient({
        account,
        chain: optimismSepolia,
        transport: http(),
      });

      await walletClient.writeContract(request);
    },
  });
};
