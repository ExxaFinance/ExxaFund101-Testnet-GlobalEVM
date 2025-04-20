// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        ExxaFund101
      </Link>

      <nav className="space-x-4">
        <Link to="/dashboard" className="hover:text-blue-500">
          Dashboard
        </Link>
        <Link to="/deposit" className="hover:text-blue-500">
          Deposit
        </Link>
        <Link to="/rebalance" className="hover:text-blue-500">
          Rebalance
        </Link>
        <Link to="/nav" className="hover:text-blue-500">
          NAV
        </Link>
      </nav>

      <button className="flex items-center space-x-2 border px-3 py-1 rounded-lg hover:bg-gray-100">
        <Wallet className="w-4 h-4" />
        <span className="text-sm">Connect</span>
      </button>
    </header>
  );
}

export default Header;
