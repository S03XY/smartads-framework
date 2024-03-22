"use client";

import { SiWebmoney } from "react-icons/si";
import { ButtonWIcon } from "../ButtonWIcon";
import { TbReportMoney } from "react-icons/tb";

import { MdCampaign } from "react-icons/md";

export const SideNavigation = () => {
  return (
    <div className="pt-10 shadow-lg w-full h-full px-5">
      <div className="flex justify-center items-center space-x-4">
        <SiWebmoney className="text-[64px]" />
        <div className="flex justify-end items-start flex-col">
          <h1 className="font-nosifer tracking-widest text-2xl ">
            SmartAds
          </h1>
          <p className="text-center text-sm">Get more for transacting</p>
        </div>
      </div>

      <div className="flex justify-center items-start flex-col mt-10 space-y-4 px-5 text-lg">
        <ButtonWIcon icon={TbReportMoney} label="Rewards" className="bg-gray-500 rounded-lg text-white" />
        <ButtonWIcon icon={MdCampaign} label="Publish Ads" />
      </div>
    </div>
  );
};
