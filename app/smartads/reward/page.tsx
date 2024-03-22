"use client";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MdOutlineWavingHand } from "react-icons/md";

import "./reward.css";

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
              <p>10</p>
            </div>
            <div className="flex justify-between items-center space-x-10">
              <p>SmartAds Points Claimed</p>
              <p>0</p>
            </div>
            <div className="flex justify-between items-center space-x-10">
              <p>SmartAds Points Balance</p>
              <p>
                5 <span className="text-sm text-gray-500">= $20.09</span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-[64px]">
            Balance: 5<span className="text-sm text-gray-500">= $20.09</span>
          </p>
          <button className="border p-2 px-8 w-full max-w-fit rounded-lg text-gray-500">
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
              <td>Ad</td>
            </tr>
          </thead>

          <tbody className="">
            <tr className="text-gray-500">
              <td>1</td>
              <td>
                0x0f6e0d6c56d31ba1abdeeb349b979323dd18d24cbaee8eca15c9061099f114ba
              </td>
              <td>10</td>
              <td>b349b979323dd18d24cbae</td>
            </tr>
            <tr className="text-gray-500">
              <td className="">2</td>
              <td>
                0x0f6e0d6c56d31ba1abdeeb349b979323dd18d24cbaee8eca15c9061099f114ba
              </td>
              <td>5</td>
              <td>b349b979323dd18d24cbae</td>
            </tr>
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
