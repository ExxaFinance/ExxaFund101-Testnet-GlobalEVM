// /frontend/app/overview/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace this with actual contract or backend call
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      // Simulated data fetching
      await new Promise((r) => setTimeout(r, 1000));
      setStats({
        currentNAV: 128450, // 1.2845
        totalInvested: 500000,
        userCount: 42,
        lastUpdate: Date.now() / 1000,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Fund Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          <>
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Current NAV</p>
                <p className="text-xl font-semibold">
                  ${Number(stats.currentNAV / 10000).toFixed(4)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Total Invested</p>
                <p className="text-xl font-semibold">${stats.totalInvested.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Users Participating</p>
                <p className="text-xl font-semibold">{stats.userCount}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Last NAV Update</p>
                <p className="text-sm">{new Date(stats.lastUpdate * 1000).toLocaleString()}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
