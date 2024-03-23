"use client";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MdOutlineWavingHand } from "react-icons/md";

import "./reward.css";
import { useEffect, useState } from "react";

const RewardHomePage = () => {
  const { showAuthFlow, primaryWallet } = useDynamicContext();

  return primaryWallet && !showAuthFlow ? (
    <LoggedInInterface />
  ) : (
    <LoggedOutInterface />
  );
};

export default RewardHomePage;

export const LoggedInInterface = () => {
  const { user, primaryWallet } = useDynamicContext();

  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    async function getUserData() {
      const response = await fetch(
        `/api/update-user?wallet_address=${primaryWallet?.address}&email=${user?.email}`
      );

      const data = await response.json();
      setUserData(data.response);
    }
    getUserData();
  }, [primaryWallet, user]);

  const claim = async () => {
    const response = await fetch(`/api/airdrop`, {
      method: "POST",
      body: JSON.stringify({
        email: user?.email,
        walletAddress: primaryWallet?.address,
      }),
    });

    const data = await response.json();
    console.log("claim tx", data);
  };

  return (
    <div className="px-10">
      <div className="w-full flex justify-between items-center py-4">
        <div className="flex justify-start items-center space-x-4 text-gray-500">
          <MdOutlineWavingHand className="text-[24px] animate-bounce" />
          <p className="text-lg ">{`Hello, ${
            user?.email ? user.email : primaryWallet?.address
          }`}</p>
        </div>
        <DynamicWidget />
      </div>

      <div className="mt-10 grid grid-cols-[1fr,2fr]">
        <div>
          <h1 className="text-lg">Stats</h1>
          <div className="mt-5 space-y-4 max-w-fit">
            <div className="flex justify-between items-center space-x-10">
              <p>SmartAds Points Accumulated</p>
              <p>{userData.length * 10}</p>
            </div>
            <div className="flex justify-between items-center space-x-10">
              <p>SmartAds Points Claimed</p>
              <p>0</p>
            </div>
            <div className="flex justify-between items-center space-x-10">
              <p>SmartAds Points Balance</p>
              <p>
                {userData.length * 10}{" "}
                <span className="text-sm text-gray-500">
                  = {`$ ${userData.length * 10 * 0.05} `}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-[64px]">
            Balance: {userData.length * 10}
            <span className="text-sm text-gray-500">
              = {`$ ${userData.length * 10 * 0.05} `}
            </span>
          </p>
          <button
            className="border p-2 px-8 w-full max-w-fit rounded-lg text-gray-500"
            onClick={claim}
          >
            Claim
          </button>
        </div>
      </div>

      <div className="mt-10 w-full">
        <table className="w-full table-auto border-collapse border-spacing-1 ">
          <thead className="">
            <tr className="">
              <td></td>
              <td>TxHash</td>
              <td>Points</td>
            </tr>
          </thead>

          <tbody className="">
            {userData.map((d: any, i: number) => {
              return (
                <tr className="text-gray-500" key={i}>
                  <td className="">{i + 1}</td>
                  <td>{d.hash}</td>
                  <td>{d.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const LoggedOutInterface = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <DynamicWidget />
    </div>
  );
};
