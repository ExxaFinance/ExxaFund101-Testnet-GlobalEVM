// /frontend/app/admin/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function AdminPanel() {
  const [oracleAddress, setOracleAddress] = useState("");
  const [fee, setFee] = useState("");
  const [paused, setPaused] = useState(false);

  const handlePauseToggle = () => {
    setPaused(!paused);
    toast.success(`Deposits ${!paused ? "paused" : "unpaused"}`);
    // TODO: Call smart contract method here
  };

  const handleOracleUpdate = () => {
    if (!oracleAddress) return toast.error("Invalid address");
    toast.success(`Oracle updated to ${oracleAddress}`);
    // TODO: Call smart contract method here
  };

  const handleFeeUpdate = () => {
    const feeBps = parseInt(fee);
    if (isNaN(feeBps) || feeBps > 500) return toast.error("Fee must be <= 500 BPS");
    toast.success(`Fee set to ${feeBps} BPS`);
    // TODO: Call smart contract method here
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Button variant="destructive" onClick={handlePauseToggle}>
            {paused ? "Unpause Deposits" : "Pause Deposits"}
          </Button>

          <div>
            <label className="block font-semibold mb-1">Update Oracle Address</label>
            <div className="flex gap-2">
              <Input
                placeholder="0x..."
                value={oracleAddress}
                onChange={(e) => setOracleAddress(e.target.value)}
              />
              <Button onClick={handleOracleUpdate}>Update</Button>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Set Deposit Fee (BPS)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="e.g. 50"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
              <Button onClick={handleFeeUpdate}>Set Fee</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
