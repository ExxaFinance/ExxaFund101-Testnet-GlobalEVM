"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { callContract } from "@/lib/contractUtils";

export default function Rebalance() {
  const { address, isConnected } = useWeb3ModalAccount();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const triggerRebalance = async () => {
    if (!isConnected) {
      setStatus("Connect your wallet first.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const result = await callContract({
        contractName: "ExxaRebalanceRequest",
        functionName: "requestRebalance",
        args: [],
      });

      if (result?.hash) {
        setStatus(`✅ Rebalance transaction sent: ${result.hash}`);
      } else {
        setStatus("⚠️ Rebalance failed or reverted.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error during rebalance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Trigger Rebalancing</h2>
        <p className="text-muted-foreground mb-4">
          This will submit a rebalance request to the contract. Execution is handled off-chain.
        </p>
        <Button
          onClick={triggerRebalance}
          disabled={loading || !isConnected}
          className="w-full"
        >
          {loading ? "Submitting..." : "Trigger Rebalance"}
        </Button>
        {status && (
          <p className="text-sm mt-4 text-muted-foreground">{status}</p>
        )}
      </CardContent>
    </Card>
  );
}
