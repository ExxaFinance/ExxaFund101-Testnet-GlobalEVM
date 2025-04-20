// /frontend/app/nav-history/page.jsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader } from "lucide-react";

export default function NAVHistoryPage() {
  const [navHistory, setNavHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch – replace with real API or contract call
    const fetchNAV = async () => {
      setLoading(true);
      try {
        const data = [
          { date: "2024-01-01", nav: 1000 },
          { date: "2024-02-01", nav: 1060 },
          { date: "2024-03-01", nav: 1115 },
          { date: "2024-04-01", nav: 1082 },
        ];
        setNavHistory(data);
      } catch (err) {
        console.error("Error fetching NAV history", err);
      }
      setLoading(false);
    };

    fetchNAV();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">NAV History</h1>
      <Card>
        <CardContent className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={navHistory}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="nav" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
