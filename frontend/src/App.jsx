// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Rebalance from "./pages/Rebalance";
import NavView from "./pages/NavView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/rebalance" element={<Rebalance />} />
            <Route path="/nav" element={<NavView />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />  
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
