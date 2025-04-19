# ExxaFund101 – Global EVM Version (v1.0)

[![Build Status](https://img.shields.io/github/actions/workflow/status/ExxaFinance/exxafund101-ci/test.yml?branch=main)](https://github.com/ExxaFinance/exxafund101-ci/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.29-lightgrey)](https://soliditylang.org)
[![Python](https://img.shields.io/badge/Python-3.10+-blue)](https://www.python.org/)
[![Chainlink Oracle Ready](https://img.shields.io/badge/Oracle-Chainlink-blueviolet)](https://chain.link)

This repository contains the **EVM-compatible version** of the ExxaFund101 architecture.  
Built for modularity, transparency, and multichain deployment, it powers decentralized crypto fund management across Ethereum-compatible chains.

> Cross-chain EVM crypto fund infrastructure by Exxa Finance — multi-contract, modular, and testnet-ready.


---

## 📦 Version

- **Current:** v1.0 (Stable & Compilable)
- **Status:** Testnet Deployment in Progress
- **Target Networks:** Ethereum, BNB Chain, Polygon, Base, Arbitrum, Optimism
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

- USDT is used as the stablecoin reference on all chains.
- Chainlink oracles are pluggable per deployment.
- Architecture supports sidechains and rollups:
  - ✅ Ethereum Mainnet/Testnets
  - ✅ Binance Smart Chain
  - ✅ Polygon
  - ✅ Arbitrum / Optimism
  - ✅ Base
  - ✅ zkSync (future-ready)

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

## 🐍 Python Backend (Off-chain Logic)

| Script                  | Purpose |
|-------------------------|---------|
| `deposit.py`            | Simulate or send USDT deposit via `ExxaFundEntry.deposit()` |
| `nav_updater.py`        | Updates NAV using live Chainlink prices |
| `rebalance_trigger.py`  | Triggers rebalancing events |
| `event_watcher.py`      | Listens to blockchain events: deposits, NAV updates, etc. |
| `investment_monitor.py` | Monitors investment performance and NAV delta |
| `binance_executor.py`   | Places real orders via Binance using `ccxt` |
| `main.py`               | CLI runner for all scripts |

### 🔧 Utilities & Config

- `wallet.py` – Private key & signer setup  
- `web3utils.py` – RPC connection, block tracking  
- `abi_loader.py` – Loads contract ABI from `/config/abi`  
- `chainlink.py` – Fetches prices from Chainlink Aggregators  
- `contract_interface.py` – Connects to deployed contracts  
- `config.py` – Loads all `.env` environment variables  

---

## 📁 Repository Structure

```bash
/contracts
  ├── ExxaBaseStorage.sol
  ├── ExxaFundEntry.sol
  ├── ExxaNAV.sol
  ├── ExxaRebalanceRequest.sol
  └── ExxaAdmin.sol

/python-backend
  ├── config/
  │   ├── config.py
  │   └── abi/
  ├── scripts/
  │   ├── deposit.py
  │   ├── nav_updater.py
  │   ├── rebalance_trigger.py
  │   ├── event_watcher.py
  │   ├── investment_monitor.py
  │   └── binance_executor.py
  ├── utils/
  │   ├── wallet.py
  │   ├── web3utils.py
  │   ├── abi_loader.py
  │   ├── chainlink.py
  │   └── contract_interface.py
  └── main.py

/.env.sample
/README.md

```

---

## ⚠️ Legal Notice

> This project is made public **for informational purposes only**.
> 
> 📎 **It remains the exclusive intellectual property of Exxa Finance.**
> 
> 🚫 Commercial use, reproduction, or redistribution is **strictly prohibited** without prior written consent.

---

## 📬 Contact

- 🌐 Website: [https://exxafinance.com](https://exxafinance.com)
- ✉️ Email: contact@exxafinance.com
- 🧑‍💼 Partnerships: See Telegram or contact form
