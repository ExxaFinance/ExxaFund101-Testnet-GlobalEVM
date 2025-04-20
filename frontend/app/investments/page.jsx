// /frontend/app/investments/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch from contract (replace with real call)
  useEffect(() => {
    async function fetchInvestments() {
      setLoading(true);
      // TODO: Replace with actual smart contract call
      await new Promise((r) => setTimeout(r, 1000));
      setInvestments([
        {
          id: 1,
          amountUSD: 1000,
          timestamp: 1713270000,
          indexAtEntry: 123456,
          withdrawn: false,
        },
        {
          id: 2,
          amountUSD: 500,
          timestamp: 1711000000,
          indexAtEntry: 121000,
          withdrawn: true,
        },
      ]);
      setLoading(false);
    }
    fetchInvestments();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Investments</h1>

      {loading ? (
        <Skeleton className="h-20 w-full rounded-xl" />
      ) : investments.length === 0 ? (
        <p className="text-gray-500">No investments found.</p>
      ) : (
        investments.map((inv) => (
          <Card key={inv.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Investment ID:</span>
                <span>{inv.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount (USDT):</span>
                <span>${inv.amountUSD}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Index at Entry:</span>
                <span>{inv.indexAtEntry}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{format(new Date(inv.timestamp * 1000), "PPPp")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Withdrawn:</span>
                <span>{inv.withdrawn ? "✅ Yes" : "❌ No"}</span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
