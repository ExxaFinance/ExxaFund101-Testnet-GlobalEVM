// /frontend/app/components/Navbar.jsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          ExxaFund
        </Link>
        <div className="flex space-x-4">
          <Link href="/admin" className="text-white">Admin</Link>
          <Link href="/dashboard" className="text-white">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
