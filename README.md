# ExxaFund101 – Global EVM Version (v1.0)

This repository contains the **EVM-compatible version** of the ExxaFund101 architecture. Built for maximum modularity, transparency, and compatibility with multiple EVM networks, it powers decentralized crypto fund management and enables smart, rules-based investing.

---

## 📦 Version
- **Current:** v1.0 (Stable & Compilable)
- **Status:** Testnet Deployment in Progress
- **Target Networks:** Ethereum, Binance Smart Chain (BSC), Polygon, Base, Arbitrum, Optimism...
- **License:** MIT (code public for transparency, not open-source or for commercial reuse)

---

## 🔍 Overview
This repository includes everything required to deploy and operate a decentralized index fund smart contract system:

- Modular Solidity contracts for user deposits, investment records, rebalancing requests, NAV updates, and fund administration
- A unified base storage contract (`ExxaBaseStorage`) for data consistency across modules
- NAV tracking contract (`ExxaNAV`) with Chainlink oracle compatibility
- Rebalancing request handler (`ExxaRebalanceRequest`) for external TWAP logic
- Admin control module (`ExxaAdmin`) for managing fees, oracles, and backend access

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

The architecture supports **cross-chain deposits and NAV tracking**:
- USDT is assumed as the base currency.
- Chainlink oracles are pluggable on each supported chain.
- Designed to be deployed independently all EVM blockchains.

---

## 🧠 Smart Contract Modules

### `ExxaBaseStorage.sol`
Central shared data layout for:
- Investment history (per user + global mapping)
- Index value at deposit
- Internal ID counters

### `ExxaFundEntry.sol`
- Accepts user deposits (in USDT)
- Records investment ID, timestamp, amount, index at entry

### `ExxaNAV.sol`
- Stores and updates global NAV/index
- Can be updated manually or using Chainlink price feeds
- Tracks NAV per user over time

### `ExxaRebalanceRequest.sol`
- External module to initiate rebalancing events
- Compatible with external scripts, bots, or keepers
- Triggers backend execution (TWAP or other strategies)

### `ExxaAdmin.sol`
- Central authority for fund management
- Pause/unpause deposits
- Set oracle addresses
- Adjust fees
- Set backend automation operators

---

## 🔐 Security & Roles

- **Admin Access:** Restricted via `Ownable`
- **Storage:** Unified across contracts to prevent data mismatch
- **Upgradeable Architecture:** Contracts are written modularly for proxy integration if needed

---

## 📁 Repository Structure

```
/contracts
    ExxaBaseStorage.sol
    ExxaFundEntry.sol
    ExxaNAV.sol
    ExxaRebalanceRequest.sol
    ExxaAdmin.sol

/scripts
    deploy_with_ethers.ts
    deploy_with_web3.ts

/artifacts
    (Compiled contract ABIs + metadata)
```

---

## 🛠 Deployment Prerequisites

- Solidity ^0.8.20
- EVM-compatible chain & RPC endpoint
- Chainlink price feeds (if used)

```bash
# Install dependencies
npm install ethers web3 dotenv
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
