import Link from "next/link";
import { createDebugUrl } from "../debug";
import { currentURL } from "../utils";

import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getPreviousFrame,
  NextServerPageProps,
  useFramesReducer,
} from "frames.js/next/server";
import React from "react";

type FrameState = {
  pageState: string;
};

const initState: FrameState = {
  pageState: "landing",
};

const reducer: FrameReducer<FrameState> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex!;

  // console.log("during state", state);
  console.log("frame action", action);

  switch (state.pageState) {
    case "landing":
      return buttonIndex === 1 ? { pageState: "app" } : state;

    case "app":
      if (buttonIndex === 1) {
        return { pageState: "landing" };
      } else if (buttonIndex === 3) {
        return { pageState: "ad" };
      } else {
        return state;
      }

    default:
      return { pageState: "landing" };
  }
};

const SmartAdsFrame = ({ searchParams }: NextServerPageProps) => {
  const previousFrame = getPreviousFrame<FrameState>(searchParams);

  const [state, dispatch] = useFramesReducer<FrameState>(
    reducer,
    initState,
    previousFrame
  );

  const images = [
    {
      src: "https://copper-real-macaw-836.mypinata.cloud/ipfs/QmUzTkpd1t2GurZWi9uSqVf2BEjd6kmHvCxnkqsK19XV53",
      name: "home page",
    },
    {
      src: "https://copper-real-macaw-836.mypinata.cloud/ipfs/QmU7r6yNoEggRAJosxASLxmQZZetcWfuQmBsS1NMVgD8bc",
      name: "advertisement",
    },
  ];

  let intermidiateFrame: React.ReactElement;

  const initialPage = [
    <FrameImage src={images[0]?.src!} key={0}></FrameImage>,
    <FrameButton key={1}>&rarr;</FrameButton>,
  ];

  // console.log("currrent state", state);

  const appPage = [
    <FrameImage key={0}>
      <div tw="h-full w-full flex flex-col">
        <p tw="flex justify-center items-center font-josefin-sans">Sale</p>
        <p tw="bg-black text-white w-full flex justify-center items-center flex-col  h-full w-full">
          Name: RTFKT x Nike Dunk Genesis CRYPTOKICKS <br />{" "}
          Contract:0xf2...450bb <br /> Token id: 1 <br /> Creator fees: 10%
        </p>
      </div>
    </FrameImage>,
    <FrameButton
      key={1}
      action="link"
      target="/smartads/preview/0xf266692F6Ec2b45b7Bb20C6B681a4a6017e450bb/1"
    >
      Preview
    </FrameButton>,

    // <FrameButton
    //   key={2}
    //   action="link"
    //   target="https://ipfs.io/ipfs/QmUFuKaQLyhGAiugMy81ggqc28Wpn3yrDmyWtRso8t7j1H/base.mp4"
    // >
    //   Asset
    // </FrameButton>,

    <FrameButton key={2} action="link" target={`/smartads/owner?fid=${"fid"}`}>
      Owner
    </FrameButton>,
    <FrameButton
      key={3}
      action="post_redirect"
      target={`${currentURL("/smartads-frame/mint")}`}
    >
      Mint
    </FrameButton>,
    <FrameButton
      key={3}
      action="link"
      target={`${currentURL(
        "/smartads/magictxn/0xf266692F6Ec2b45b7Bb20C6B681a4a6017e450bb/1"
      )}`}
    >
      MagicTxn
    </FrameButton>,
  ];

  const adPage = [
    <FrameImage src={images[1]?.src!} key={0}></FrameImage>,
    <FrameButton key={1}>&rarr;</FrameButton>,
    <FrameButton key={2}>&#8599; Claim</FrameButton>,
  ];

  return (
    <div>
      <p className="p-2">
        Smart ads api demo usecase frame
        <Link
          href={createDebugUrl(currentURL("/smartads-frame"))}
          className="ml-2 text-gray-500 text-lg underline"
        >
          debug smartads frame
        </Link>
      </p>

      <FrameContainer
        pathname="/smartads-frame"
        postUrl="/smartads-frame/frames"
        state={state}
        previousFrame={previousFrame}
      >
        {state.pageState === "landing"
          ? initialPage
          : state.pageState === "ad"
          ? adPage
          : appPage}
      </FrameContainer>
    </div>
  );
};

export default SmartAdsFrame;
