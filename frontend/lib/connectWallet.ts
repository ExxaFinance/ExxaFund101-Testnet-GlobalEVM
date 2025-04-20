// lib/connectWallet.ts

import { ethers } from "ethers";

/**
 * Connects to MetaMask and returns the signer.
 */
export async function connectWallet(): Promise<ethers.Signer | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    alert("Please install MetaMask.");
    return null;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  } catch (err) {
    console.error("Wallet connection failed:", err);
    return null;
  }
}

/**
 * Returns the connected address (if any).
 */
export async function getConnectedAddress(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) return null;

  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (err) {
    console.error("Error fetching accounts:", err);
    return null;
  }
}
