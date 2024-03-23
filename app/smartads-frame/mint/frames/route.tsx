import { POST as POSTNext, PreviousFrame } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest, res: any) {
  const redirectHandler = (prevFrame: PreviousFrame) => {
    return "https://www.framesjs.org";
  };
  return POSTNext(req, res, redirectHandler);
}
