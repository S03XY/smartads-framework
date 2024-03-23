import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../libs/db";
import * as ethers from "ethers";

export const POST = async (req: NextRequest) => {
  const { email, walletAddress } = await req.json();

  console.log(email, walletAddress);

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

  //   send the ether from admin wallet to user wallet

  const provider = new ethers.providers.JsonRpcProvider(
    "https://base-sepolia.g.alchemy.com/v2/sjw-yse2kw2qzbAR3jh2IsdHRnwsi6Zg",
    "base"
  );

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const value = ethers.utils.parseUnits(
    `${response?.length! * 10 * 0.05 * 0.00001}`,
    "ether"
  );

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });

  const tx = await signer.sendTransaction({
    to: walletAddress!,
    value,
  });

  return NextResponse.json({
    value: 0.0001,
    tx: "0xf86a91cf325cb35ba2610ff406902b9eaf8d59c4f8a0d1f645d7faf180953381",
  });
};
