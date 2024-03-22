import type { Metadata } from "next";
import { Nosifer } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const nosifer = Nosifer({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-nosifer",
});

const josefin_sans = Josefin_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "frames.js starter",
  description: "...",
};
import { AppDynamicContextProvider } from "../modules/providers/dynamicProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppDynamicContextProvider>
        <body
          className={`${josefin_sans.variable} ${nosifer.variable} font-josefin-sans`}
        >
          {children}
        </body>
      </AppDynamicContextProvider>
    </html>
  );
}
