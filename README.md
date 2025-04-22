# ExxaFund101 – Global EVM Version (v1.0)

![Status](https://img.shields.io/badge/Status-In%20Development-orange)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.29-lightgrey)](https://soliditylang.org)
[![Python](https://img.shields.io/badge/Python-3.10+-blue)](https://www.python.org/)
[![Chainlink Oracle Ready](https://img.shields.io/badge/Oracle-Chainlink-blueviolet)](https://chain.link)
![dotenv](https://img.shields.io/badge/Config-dotenv-green?logo=envato)
![License](https://img.shields.io/badge/License-Proprietary-red)



This repository contains the **EVM-compatible version** of the ExxaFund101 architecture.  
Built for modularity, transparency, and multichain deployment, it powers decentralized crypto fund management across Ethereum-compatible chains.

> Cross-chain decentralized fund system built by Exxa Finance: EVM-compatible, modular, Chainlink-integrated, and Frontend & Backend connected.


---

## 📦 Version

- **Current:** v1.0 (Stable & Compilable)
- **Status:** Testnet Deployment in Progress
- **Target Networks:** Ethereum & Layer 2 (BNB Chain, Polygon, Base, Arbitrum, Optimism..)
- **Solidity Version:** `^0.8.29`
- **License:** MIT (Public for transparency – not for commercial reuse)

---

## 🔍 Overview

This repository includes everything required to deploy and operate a decentralized index fund system:

- 💼 Modular Solidity contracts for deposits, NAV tracking, admin control, and rebalancing
- 🧠 Backend Python infrastructure for NAV calculation, event monitoring, and rebalancing execution
- 🔗 Chainlink price feed integration
- 🪙 Exchange Integration integration (Example with Binance via `ccxt` here) for market order execution
- 🌐 Multichain ready architecture for cross-chain compatibility
- 🖥 Admin-facing frontend built using Next.js to interact with smart contracts on the testnet, offering an interface for deposits, rebalancing, and NAV management.

---

## 💸 User Workflow

1. **User deposits USDT** via `ExxaFundEntry`
2. **Investment is recorded** with:
   - Entry index
   - Timestamp
   - Investment ID
3. **NAV updates** over time using Chainlink oracles (`ExxaNAV`)
4. **Admins** can:
   - Pause deposits
   - Initiate rebalancing
   - Update key parameters
5. **Rebalancing strategy** runs externally via backend or scripts

---

## 🌐 Multichain Ready

- USDT is used as the stablecoin reference on all chains. Others stablecoin will be added in the final structure.
- Chainlink oracles are pluggable per deployment.
- Architecture supports sidechains and rollups includes:
  - ✅ Ethereum Mainnet/Testnets
  - ✅ Binance Smart Chain
  - ✅ Polygon
  - ✅ Arbitrum / Optimism
  - ✅ Base
  - ✅ Linea
  - ✅ zkSync (future-ready)
  - ✅ dYdX
  - ✅ Celer Network
- Works also on Hyperliquid Blockchain (but Hyperliquid blockchain have an Exxa Finance repo dedicaded with enhanced features related to the Hyperliquid Exchange)

---

## 🧠 Smart Contract Modules

| Contract | Description |
|---------|-------------|
| `ExxaBaseStorage.sol` | Shared storage structure for all modules |
| `ExxaFundEntry.sol` | Handles USDT deposits and logs investment data |
| `ExxaNAV.sol` | Tracks NAV via Chainlink or manual inputs |
| `ExxaRebalanceRequest.sol` | Receives and stores rebalance triggers |
| `ExxaAdmin.sol` | Owner/admin logic for parameters, fees, oracles |

---

## 🔐 Security & Roles

- **Admin Access:** Restricted via `Ownable`
- **Storage:** Unified across contracts to prevent data mismatch
- **Upgradeable Architecture:** Contracts are written modularly for proxy integration if needed

---

## 💻 Python Backend (Off-chain Logic)

| Script                  | Purpose |
|-------------------------|---------|
| `deposit.py`            | Simulate or send USDT deposit via `ExxaFundEntry.deposit()` |
| `nav_updater.py`        | Updates NAV using live Chainlink prices |
| `rebalance_trigger.py`  | Triggers rebalancing events |
| `event_watcher.py`      | Listens to blockchain events: deposits, NAV updates, etc. |
| `investment_monitor.py` | Monitors investment performance and NAV delta |
| `binance_executor.py`   | Places orders via Binance using `ccxt` |
| `main.py`               | CLI runner for all scripts |

### 🔧 Utilities & Config

- `wallet.py` – Private key & signer setup  
- `web3utils.py` – RPC connection, block tracking  
- `abi_loader.py` – Loads contract ABI from `/config/abi`  
- `chainlink.py` – Fetches prices from Chainlink Aggregators  
- `contract_interface.py` – Connects to deployed contracts  
- `config.py` – Loads all `.env` environment variables  

---

## 💻 Frontend (User Interface)

| Page                    | Purpose |
|-------------------------|---------|
| `admin.jsx`              | Admin panel for controlling fund parameters (pause deposits, update fees, etc.) |
| `history.jsx`            | Displays transaction history for the user |
| `investments.jsx`        | User investments and portfolio overview |
| `nav-history.jsx`        | Displays portfolio history and NAV tracking |
| `overview.jsx`           | Dashboard overview of investments, NAV, etc. |
| `rebalance.jsx`          | Interface for rebalancing investments manually |
| `withdraw.jsx`           | Allows users to withdraw funds or assets from the system |

### 🔧 Utilities & Config

- `connectWallet.ts` – Manages wallet connection and integration with Web3 providers  
- `contractInterface.ts` – Interfaces with deployed smart contracts on the blockchain  
- `web3utils.js` – Contains utility functions for interacting with Web3 (e.g., RPC connection, gas estimation)  
- `wallet.js` – Handles wallet interactions (e.g., network selection, account management)  
- `web3utils.js` – Utility functions for Web3.js (e.g., managing network connections)  
- `.env` – Stores sensitive configuration variables (API keys, wallet private keys, etc.)  
- `.gitignore` – Git exclusions for node_modules, build files, etc.  
- `next.config.js` – Configuration for Next.js project setup  
- `package.json` – Manages dependencies and project scripts  

---

## 📁 Repository Structure

```bash
ExxaFund101-Testnet-GlobalEVM/
├── .deps/                      # NPM packages (e.g., OpenZeppelin, Chainlink)
│   └── README.md               # Installed dependency list

├── artifacts/                  # ABIs & metadata (compiled contracts)
│   ├── ExxaAdmin.json
│   ├── ExxaNAV.json
│   ├── ...
│   └── README.md

├── contracts/                  # Solidity smart contracts (modular fund logic)
│   ├── ExxaFundEntry.sol
│   ├── ExxaNAV.sol
│   ├── ...
│   └── ExxaAdmin.sol

├── scripts/                    # TypeScript deployment scripts (web3/ethers)
│   ├── deploy_with_ethers.ts
│   ├── deploy_with_web3.ts
│   └── ...

├── python-backend/             # Automation, oracles, and cross-chain logic
│   ├── config/                 # Config + ABIs
│   ├── scripts/                # deposit.py, nav_updater.py, ...
│   ├── utils/                  # web3, wallet, ABI tools
│   └── main.py

├── frontend/                   # Frontend UI for interacting with contracts
│   ├── app/                    # Pages for different views (e.g., admin, investments)
│   ├── lib/                    # Library for wallet and contract interactions
│   ├── src/                    # Frontend components, pages, and styles
│   ├── .env                    # Environment configuration
│   ├── .gitignore              # Git exclusion rules
│   ├── next.config.js          # Next.js configuration
│   ├── package.json            # JS dependencies for frontend
│   └── README.md               # Frontend overview

├── .env.sample                 # Example environment file
├── .gitignore                  # Git exclusion rules
├── requirements.txt            # Python requirements
└── README.md                   # Project overview
```

---

## 📜 Legal Notice

> This repository is part of the **ExxaFund101 project**, developed and maintained by **Exxa Finance**.  
> All contents (smart contracts, backend scripts, configurations, documentation, and structure) are made **public for transparency and auditability**, but are **not open-source**.

---

### 🔐 Intellectual Property

- All source code, structure, logic, and designs are **the exclusive intellectual property** of Exxa Finance.
- You may **read, review, and learn** from the public codebase.
- **Any reproduction, commercial reuse, distribution, or derivation** of the work without **explicit written consent** from Exxa Finance is strictly prohibited.

---

### ⚖️ Usage Restrictions

- This project **is not licensed for commercial or public use**.
- **MIT license** is applied **only to enable contract compilation** and toolchain compatibility.
- The license **does not grant rights of reuse** unless **granted in writing** by Exxa Finance.

---

### 🔍 Transparency

- Public availability of the code aims to ensure:
  - Transparency in smart contract logic
  - External audits
  - Community trust
  - Regulatory clarity

---

### 📬 Contact

For permission requests, licensing discussions, audits, or integrations:

- 🌐 Website: [https://exxafinance.com](https://exxafinance.com)
- ✉️ Email: business@exxa.finance
- 📎 Legal/Compliance inquiries: business@exxa.finance
- 🧑‍💼 Partnerships: business@exxa.finance or [See Telegram](https://t.me/exxafinancechat)
