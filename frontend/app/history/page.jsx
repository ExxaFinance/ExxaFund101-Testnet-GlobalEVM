'use client'

import { useEffect, useState } from 'react'

export default function InvestmentHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel à une API ou un smart contract
    const fetchHistory = async () => {
      setLoading(true)
      // Ici, on utiliserait web3/ethers ou fetch vers le backend Python
      const mockData = [
        {
          id: 1,
          date: '2024-01-15',
          amount: '500 USDT',
          navAtEntry: '1.032',
          status: 'Active'
        },
        {
          id: 2,
          date: '2023-12-10',
          amount: '1000 USDT',
          navAtEntry: '0.998',
          status: 'Withdrawn'
        }
      ]
      setHistory(mockData)
      setLoading(false)
    }

    fetchHistory()
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">📜 Investment History</h1>

      {loading ? (
        <p className="text-gray-500">Loading investment records...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">NAV at Entry</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((inv) => (
              <tr key={inv.id}>
                <td className="border p-2">{inv.id}</td>
                <td className="border p-2">{inv.date}</td>
                <td className="border p-2">{inv.amount}</td>
                <td className="border p-2">{inv.navAtEntry}</td>
                <td className="border p-2">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
