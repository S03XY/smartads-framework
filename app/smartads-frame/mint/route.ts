import { getFrameMessage } from "frames.js";

import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_DEBUGGER_HUB_URL } from "../../debug";
import { kv } from "@vercel/kv";
import { RandomNumberRequestStateValue } from "../../examples/slow-request/slow-fetch/types";
import { POST as POSTNext, PreviousFrame } from "frames.js/next/server";
import { Abi, encodeFunctionData } from "viem";
import { CONTRACT_ABI } from "../../../contract/abi";

export const POST = async (req: NextRequest, res: any) => {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  // 0xf266692F6Ec2b45b7Bb20C6B681a4a6017e450bb

  const calldata = encodeFunctionData({
    abi: CONTRACT_ABI,
    functionName: "publicMint",
    args: [],
  });

  return NextResponse.json({
    chainId: "eip155:84532",
    method: "eth_sendTransaction",
    params: {
      abi: CONTRACT_ABI as Abi,
      to: "0xf266692F6Ec2b45b7Bb20C6B681a4a6017e450bb",
      data: calldata,
      value: 0,
    },
  });

  // return Response.json(null, {
  //   status: 302,
  //   headers: {
  //     Location: "http://localhost:3000/smartads/reward",
  //   },
  // });

  // return Response.json({});
};
