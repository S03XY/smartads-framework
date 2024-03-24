"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import placeholder from "../../../assets/25290.json";
import Image from "next/image";
import {
  useSearchParams,
  useParams,
  redirect,
  useRouter,
} from "next/navigation";
import Link from "next/link";
import { Contract } from "ethers";
import { CONTRACT_ABI } from "../../../../contract/abi";
import NIKE_AD from "../../../assets/nike hoodi ad.jpeg";
import { VscServerProcess } from "react-icons/vsc";

// import { WalletClient } from "viem";

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useEffect, useState } from "react";
import { randomUUID } from "crypto";

const MagicTxn = () => {
  const { slug } = useParams();
  const [showAd, setShowAds] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);

  const { showAuthFlow, user, primaryWallet, walletConnector } =
    useDynamicContext();

  const { config } = usePrepareContractWrite({
    abi: CONTRACT_ABI,
    address: `0xf266692F6Ec2b45b7Bb20C6B681a4a6017e450bb`,
    functionName: "publicMint",
  });

  const { data, write } = useContractWrite(config);

  const router = useRouter();

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    isLoading && setShowAds(true);
  }, [isLoading]);

  useEffect(() => {
    if (showAd) {
      setTimeout(async () => {
        console.log("before redirec");
        router.push("/smartads/reward");
        setShowAds(false);
      }, 5000);
    }
  }, [showAd]);

  const mint = async () => {
    console.log("minting nft...");
    // setIsLoading(true);
    write!();
  };

  useEffect(() => {
    if (isLoading === false && isSuccess === true) {
      async function updateUserData() {
        await fetch("/api/update-user", {
          method: "POST",
          body: JSON.stringify({
            email: user?.email,
            walletAddress: primaryWallet?.address,
            hash: data?.hash,
          }),
        });
      }

      updateUserData();
    }
  }, [isSuccess, isLoading]);

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-full bg-black text-whiter">
      <div className="flex justify-center items-center py-5">
        <DynamicWidget />
      </div>
      {showAd ? (
        <div>
          <div className="mx-auto w-fit mt-10 cursor-pointer">
            <Image
              src={NIKE_AD}
              alt=""
              className="max-h-[500px] max-w-[500px] rounded-lg"
            />
          </div>
          <div className="mt-10 w-fit mx-auto">
            <p className="text-white text-lg flex justify-center items-center space-x-4">
              <VscServerProcess className="text-xl" />
              <p>{data?.hash}</p>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-fit mx-auto">
          <div>
            <Image
              src={`https://ipfs.io/ipfs/${placeholder.image.replace(
                "ipfs://",
                ""
              )}`}
              alt=""
              height={1000}
              width={1000}
              className="max-h-[500px] max-w-[500px] rounded-lg"
            />
          </div>

          <div className="text-white text-center mt-10 ">
            {placeholder.name}
          </div>

          <Link
            href={`https://sepolia.basescan.org/address/${slug![0]}`}
            className="underline"
          >
            <div className="text-white text-center mt-10  flex justify-between items-center">
              <p>Contract</p>
              <p>{slug![0]}</p>
            </div>
          </Link>
          <div className="text-white text-center mt-10  flex justify-between items-center">
            <p>Id</p>
            <p>{slug![1]}</p>
          </div>

          {primaryWallet && !showAuthFlow ? (
            <button
              className="text-white border-[1px] border-white w-full p-4 rounded-lg mt-10"
              onClick={mint}
            >
              Mint
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MagicTxn;
