"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OwnerPage = () => {
  const search = useSearchParams();
  const [userData, setUserData] = useState<any>();
  const [castData, setCastData] = useState<any[]>([]);

  useEffect(() => {
    async function getUserData() {
      const fid = search.get("fid");
      console.log(fid);

      const response = await fetch("/api/pinata-user-fid?fid=1");
      const data = await response.json();

      setUserData(data.data);

      const response1 = await fetch("/api/pinata-user-cast?fid=2");
      const data1 = await response1.json();
      setCastData(data1.data.casts);
    }

    getUserData();
  }, []);

  return (
    <div className="bg-black fixed h-[100vh] w-full p-10">
      {userData ? (
        <div className="w-full  text-white">
          <div className="flex justify-start items-center space-x-4">
            <Image
              src={userData?.pfp_url}
              alt=""
              height={64}
              width={64}
              className=""
            />

            <div>
              <p className="text-lg">{userData?.display_name}</p>
              <p className="text-sm text-gray-500">{`@${userData?.username}`}</p>
            </div>
          </div>

          <div className="mt-5">{userData?.bio}</div>
          <div className=" flex justify-start items-center space-x-4 mt-5">
            <div className="flex justify-between items-center space-x-4 ">
              <p>Follower</p>
              <p>{userData?.follower_count}</p>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <p>Following</p>
              <p>{userData?.following_count}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white">
          Loding...
        </div>
      )}

      {userData && !castData ? (
        <div className="w-full h-full overflow-y-auto  p-10 text-white flex justify-center items-center">
          Loding...
        </div>
      ) : (
        <div className="w-full h-full overflow-y-auto  p-10 text-white">
          {castData.map((d: any, i: number) => (
            <div key={i} className="border-b-[1px] border-white/10 p-10">
              <div className="text-sm p-2 bg-slate-500 rounded-lg p-4">
                {d?.content}
              </div>

              {d?.embeds.length > 0 && (
                <div className="grid grid-cols-4 mt-5 gap-4">
                  {d?.embeds.map((u: any, i: number) => (
                    <div key={i}>
                      <Image src={u.url} alt="" height={500} width={500} />
                      {/* <video src={u.url}  height={500} width={500} autoPlay controls/> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerPage;
