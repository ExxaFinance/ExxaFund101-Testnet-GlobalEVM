"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { connectWallet, getConnectedAddress } from "@/lib/connectWallet";

export default function WalletConnectButton() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const connected = await getConnectedAddress();
      if (connected) setAddress(connected);
    })();
  }, []);

  const handleConnect = async () => {
    const signer = await connectWallet();
    if (signer) {
      const addr = await signer.getAddress();
      setAddress(addr);
    }
  };

  return (
    <Button onClick={handleConnect} className="rounded-xl px-4 py-2 text-sm">
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </Button>
  );
}
