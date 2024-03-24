import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../libs/db";

import { privateKeyToAccount } from "viem/accounts";
import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
  parseEther,
} from "viem";
import { baseSepolia } from "viem/chains";

export const POST = async (req: NextRequest) => {
  const { email, walletAddress } = await req.json();

  const connection = await connectToDatabase();
  const db = connection?.useDb("smartAds");

  let query = {};
  if (email) {
    query = { email };
  }
  if (walletAddress) {
    query = { walletAddress };
  }

  const response = await db?.collection("user_data").find(query).toArray();

  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY!}`);

  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  });

  const value = parseEther(`${response?.length! * 10 * 0.05 * 0.00001}`);

  const txn = await client.sendTransaction({
    account,
    to: walletAddress!,
    value: value,
  });

  //   send the ether from admin wallet to user wallet

  // const network = await ethers.providers.getNetwork({
  //   chainId: 8453,
  //   name: "base",
  // });

  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://mainnet.base.org",
  //   network
  // );

  // console.log(await provider.getGasPrice());

  // const signer = new ethers.Wallet(, provider);

  // const value = ethers.utils.parseUnits(
  //   `${response?.length! * 10 * 0.05 * 0.00001}`,
  //   "ether"
  // );

  // const contract = new ethers.Contract(
  //   "0xf266692F6Ec2b45b7Bb20C6B681a4a6017e450bb",
  //   CONTRACT_ABI,
  //   signer
  // );

  // const data = await contract.symbol();

  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(1);
  //   }, 2000);
  // });

  // const tx = await signer.sendTransaction({
  //   to: walletAddress!,
  //   value,
  // });

  return NextResponse.json({
    value: formatEther(value),
    txn,
  });
};
