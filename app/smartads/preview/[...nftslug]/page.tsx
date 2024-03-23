"use client";

import placeholder from "../../../assets/25290.json";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const PreviewPage = () => {
  return (
    <div className="fixed h-[100vh]  w-full bg-black font-josefin-sans">
      <div className="bg-white w-full flex justify-center items-center p-5">
        <DynamicWidget />
      </div>

      <div className="grid grid-cols-2 place-content-center place-items-center">
        <div className="w-full h-full relative">
          <video
            src={`https://ipfs.io/ipfs/${placeholder.animation_url.replace(
              "ipfs://",
              ""
            )}`}
            autoPlay
            loop
            controls
            className="h-full w-full"
          />
        </div>
        <div className="w-full h-full flex justify-center flex-col items-center text-white p-10 ">
          <h1 className="text-4xl">{placeholder.name}</h1>
          <h5 className="text-sm mt-10">{placeholder.description}</h5>

          <div className="grid grid-cols-4 gap-4 mt-10">
            {placeholder.attributes.map((d, i) => (
              <div
                key={i}
                className="flex flex-col p-2 bg-gray-800 rounded-lg text-center"
              >
                <h5>{d.trait_type}</h5>
                <p className="text-gray-500 mt-2">{d.value}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 text-center text-lg bg-gray-800 py-4">
            Mint
          </button>
        </div>
      </div>
    </div>
  );
};
export default PreviewPage;
