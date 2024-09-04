"use client";

import React, { useState, useEffect } from "react";
import { fetchBtcPrice } from "../_services/fetch-btc-price";
import useSWR from "swr";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * BtcWidget is a React component that fetches the current Bitcoin price
 * and allows users to convert a USD amount to Bitcoin. It also displays
 * the last updated timestamp for the Bitcoin price.
 * @BtcWidget
 */

const BtcWidget = () => {
  const { data, isLoading } = useSWR(
    "/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    fetchBtcPrice
  );
  const [btcPrice, setBtcPrice] = useState<any>(
    data?.data?.bitcoin.usd ?? undefined
  );
  const [usdAmount, setUsdAmount] = useState("");
  const [btcAmount, setBtcAmount] = useState("--");
  const [lastUpdated, setLastUpdated] = useState(
    format(new Date(), "dd/MM/yyyy, HH:mm:ss") ?? "--"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      if (btcPrice) {
        setUsdAmount(value);
        setBtcAmount(value ? (Number(value) / btcPrice).toFixed(8) : "--");
      }
    }
  };

  useEffect(() => {
    if (data?.error) {
      alert(data.message);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className=" w-full h-full flex items-center justify-center">
        <span>
          <Loader className=" animate-spin text-lg" />
        </span>
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50 text-center ">
      <CardHeader>
        <CardTitle>Bitcoin Price Converter</CardTitle>
      </CardHeader>
      <CardContent className=" grid gap-5">
        <div className="text-lg mb-2">
          <span className=" font-semibold"> Current Price:</span> $
          {btcPrice ? btcPrice?.toLocaleString() : "--"} USD
        </div>
        <div className="text-lg mb-2">Last Updated: {lastUpdated}</div>
        <Input
          type="number"
          placeholder="Enter USD amount"
          value={usdAmount}
          onChange={handleInputChange}
          maxLength={12}
          className="w-full p-2 text-lg "
        />
        <div className="text-lg">
          BTC Equivalent: <strong>{btcAmount}</strong>
        </div>
      </CardContent>
    </Card>
  );
};

export default BtcWidget;
