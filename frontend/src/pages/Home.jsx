import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to ExxaFund</h1>
        <p className="text-lg text-gray-700 mb-6">
          A cross-chain decentralized index fund platform. Built on EVM and powered by automation,
          Chainlink oracles, and backend smart contracts.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
        >
          Launch Dashboard
        </Link>
      </section>
    </Layout>
  );
}

export default Home;
