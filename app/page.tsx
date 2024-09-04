import React from "react";
import BtcWidget from "./_components/BtcWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTC Converter",
  description: "This is the entry point on this application",
};
export default function page() {
  return (
    <main className=" w-full h-screen bg-zinc-800 py-20">
      <BtcWidget />
    </main>
  );
}
