// lib/contractInterface.ts

import { ethers } from "ethers";
import AdminABI from "@/abi/ExxaAdmin.json"; // Assure-toi que l'ABI est bien là
import { toast } from "react-hot-toast";

// Replace with your deployed contract address
const EXXA_ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_CONTRACT as string;

// Set up a generic Ethers contract
export function getAdminContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(EXXA_ADMIN_ADDRESS, AdminABI, signerOrProvider);
}

// Call to pause/unpause deposits
export async function toggleDeposits(paused: boolean, signer: ethers.Signer) {
  try {
    const contract = getAdminContract(signer);
    const tx = await contract.setDepositPaused(paused);
    await tx.wait();
    toast.success(`Deposits ${paused ? "paused" : "unpaused"} successfully`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update deposit status");
  }
}

// Call to update oracle address
export async function updateOracleAddress(newAddress: string, signer: ethers.Signer) {
  try {
    const contract = getAdminContract(signer);
    const tx = await contract.setOracle(newAddress);
    await tx.wait();
    toast.success("Oracle address updated");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update oracle");
  }
}

// Call to update deposit fee (in basis points)
export async function updateDepositFee(bps: number, signer: ethers.Signer) {
  try {
    const contract = getAdminContract(signer);
    const tx = await contract.setDepositFee(bps);
    await tx.wait();
    toast.success("Deposit fee updated");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update deposit fee");
  }
}
