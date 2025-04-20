# 🧪 Deployment Scripts – ExxaFund101

This folder contains TypeScript-based deployment scripts and helpers designed to deploy ExxaFund101 smart contracts on any **EVM-compatible blockchain** using either **ethers.js** or **web3.js**.

---

## 📁 Files Overview

| Script                     | Description                                                                      |
|---------------------------|----------------------------------------------------------------------------------|
| `deploy_with_ethers.ts`   | Deploy contracts using the **ethers.js** library                                 |
| `deploy_with_web3.ts`     | Deploy contracts using the **web3.js** library                                   |
| `ethers-lib.ts`           | Utility library for contract deployment via ethers (provider, signer, args)      |
| `web3-lib.ts`             | Utility library for contract deployment via web3 (connection, tx formatting)     |

---

## ⚙️ Requirements

- Node.js (>= v16)
- TypeScript
- Hardhat or standalone scripts
- `.env` for private keys and RPC endpoints

---

## 📦 Setup

```bash
# Install required dependencies
npm install ethers web3 dotenv typescript ts-node
