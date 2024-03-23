import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../libs/db";

export const POST = async (req: NextRequest) => {
  const { email, walletAddress, hash } = await req.json();
  const connection = await connectToDatabase();

  const db = connection?.useDb("smartAds");
  const response = await db?.collection("user_data").insertOne({
    email,
    walletAddress,
    hash,
  });

  console.log(response?.insertedId);

  return NextResponse.json({ objectId: response?.insertedId });
};

export const GET = async (req: NextRequest) => {
  const searchparam = req.nextUrl.searchParams;
  const walletAddress = searchparam.get("wallet_address");
  const email = searchparam.get("email");

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
  response?.map((d) => {
    d.points = 10;
  });

  return NextResponse.json({ response });
};
