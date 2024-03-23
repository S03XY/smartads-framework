import type { Metadata } from "next";
import { SideNavigation } from "../../../components/SideNavigation";

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "SmartAds",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr,4fr] h-[100vh] w-full">
      <SideNavigation />
      {children}
    </div>
  );
}
