import React from "react";
import Layout from "../components/Layout";
import { useWallet } from "../hooks/useWallet"; // Hook pour connexion Web3
import { useEffect, useState } from "react";

function Dashboard() {
  const { address, connectWallet } = useWallet();
  const [nav, setNav] = useState(null);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    if (address) {
      // Simuler récupération NAV (à relier au backend ou Web3 ensuite)
      setNav("123.45 USDT");
      // Simuler historique d’investissements (à remplacer par un call réel)
      setInvestments([
        { id: 1, amount: 100, date: "2024-01-15", status: "Active" },
        { id: 2, amount: 50, date: "2024-02-02", status: "Withdrawn" },
      ]);
    }
  }, [address]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>

        {!address ? (
          <button
            onClick={connectWallet}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <p className="text-gray-700 mb-4">
              Connected as: <span className="font-mono">{address}</span>
            </p>

            <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
              <h2 className="text-xl font-semibold mb-2">Net Asset Value (NAV)</h2>
              <p className="text-2xl font-bold">{nav || "Loading..."}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Investment History</h2>
              <table className="w-full text-left border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv) => (
                    <tr key={inv.id} className="border-t">
                      <td className="px-4 py-2">{inv.id}</td>
                      <td className="px-4 py-2">{inv.amount} USDT</td>
                      <td className="px-4 py-2">{inv.date}</td>
                      <td className="px-4 py-2">{inv.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
