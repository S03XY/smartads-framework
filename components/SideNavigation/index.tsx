import { SiWebmoney } from "react-icons/si";

export const SideNavigation = () => {
  return (
    <div className="pt-10 shadow-lg w-full h-full">
      <div className="flex justify-center items-center space-x-4">
        <SiWebmoney className="text-[64px]" />
        <div className="flex justify-end items-start flex-col">
          <h1 className="text-lg font-rubik-vinyl tracking-widest ">
            SmartAds
          </h1>
          <p className="text-center text-sm">Get more for transacting</p>
        </div>
      </div>
    </div>
  );
};
