import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const search = req.nextUrl.searchParams;
  const fid = search.get("fid");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  };

  const reponse = await fetch(
    `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
    options
  );
  const data = await reponse.json();

  return NextResponse.json(data);
};
