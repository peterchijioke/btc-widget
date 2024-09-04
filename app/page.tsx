import React from "react";
import BtcWidget from "./_components/BtcWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTC Converter",
  description: "This is the entry point on this application",
};
/**
 * This is the main page component for the BTC Converter application.
 * It renders the BtcWidget component and applies basic styling.
 * @page
 **/
export default function page() {
  return (
    <main className=" w-full h-screen bg-zinc-800 py-20">
      <BtcWidget />
    </main>
  );
}
