import type { Metadata } from "next";
import { Rubik_Vinyl } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const rubik_vinyl = Rubik_Vinyl({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-rubik-vinyl",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefin_sans.variable} ${rubik_vinyl.variable} font-josefin-sans`}>
        {children} 
      </body>
    </html>
  );
}
