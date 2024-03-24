import { createPublicClient, createWalletClient, http } from "viem";
import { baseSepolia, optimismSepolia } from "viem/chains";
import { RELAYER_CONTRACT_ABI } from "../contract/relayerContractAbi";
import { BASE_MINT_CONTRACT, OP_RELAYER_CONTRACT } from "../libs/constants";
import { privateKeyToAccount } from "viem/accounts";
import { CONTRACT_ABI } from "../contract/abi";

export const initOpRelayer = async () => {
  const client = createPublicClient({
    transport: http(),
    chain: optimismSepolia,
  });

  client.watchContractEvent({
    abi: RELAYER_CONTRACT_ABI,
    address: OP_RELAYER_CONTRACT,
    eventName: "crossDeposit",
    onLogs: async (log) => {
      console.log("");
      const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY!}`);

      const basePubClient = createPublicClient({
        transport: http(),
        chain: baseSepolia,
      });

      const { request } = await basePubClient.simulateContract({
        account,
        address: BASE_MINT_CONTRACT,
        abi: CONTRACT_ABI,
        functionName: "publicMint",
      });

      const walletClient = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(),
      });

      await walletClient.writeContract(request);
    },
  });
};
