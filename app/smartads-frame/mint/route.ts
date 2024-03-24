import { getFrameMessage } from "frames.js";

import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_DEBUGGER_HUB_URL } from "../../debug";
import { kv } from "@vercel/kv";
import { RandomNumberRequestStateValue } from "../../examples/slow-request/slow-fetch/types";
import { POST as POSTNext, PreviousFrame } from "frames.js/next/server";

export const POST = async (req: NextRequest, res: any) => {



  
  const redirectHandler = (prevFrame: PreviousFrame) => {
    return "https://www.google.com";
  };

  return Response.json(null, {
    status: 302,
    headers: {
      Location: "http://localhost:3000/smartads/reward",
    },
  });
};
