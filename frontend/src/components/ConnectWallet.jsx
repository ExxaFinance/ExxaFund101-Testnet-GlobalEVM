// /frontend/app/components/ConnectWallet.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function ConnectWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        toast.success(`Wallet connected: ${accounts[0]}`);
      } catch (error) {
        toast.error("Failed to connect wallet");
      }
    } else {
      toast.error("MetaMask not detected");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
      <Button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </Button>
    </div>
  );
}
