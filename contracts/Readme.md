# 📜 Smart Contracts – ExxaFund101 (Global EVM)

This folder contains all the **Solidity smart contracts** powering the ExxaFund101 decentralized index fund.  
They are designed for **modular deployment**, **multichain compatibility**, and integration with a Python-based backend for automation and execution.

---

## 📁 Files Overview

| Contract                     | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `ExxaBaseStorage.sol`       | Shared base for storage and data access across all contracts                |
| `ExxaFundEntry.sol`         | Handles user deposits, investment records, and USDT onboarding              |
| `ExxaFundExit.sol`          | Manages withdrawals, redemptions, and tracking exit NAV                    |
| `ExxaNAV.sol`               | Updates and stores global NAV via Chainlink or admin input                  |
| `ExxaAdmin.sol`             | Admin-level controls: fees, oracle, backend roles, and emergency tools      |

---

## 🧩 Modular Architecture

Each contract has a **dedicated responsibility**, and inherits from shared logic:

- `ExxaBaseStorage`: ensures all child contracts share the same investment data structure
- `Ownable` (via OpenZeppelin): secure access control for admin-only logic

The design promotes **clarity**, **upgradability**, and **multichain consistency**.

---

## 🔐 Security & Access

- Only the `owner` can:
  - Pause/unpause the fund
  - Update NAV
  - Manage backend access

 Other functions are coming.

---

## 🔗 EVM Compatibility

Contracts are compatible with:

- Ethereum Mainnet & Testnets
- BNB Smart Chain
- Polygon
- Base
- Arbitrum & Optimism
- Any EVM-compatible chain

---

## ⚙ Compilation

```bash
solc --version          # Requires ^0.8.29
```
Using Hardhat
```bash
npx hardhat compile
```
Using Foundry
```bash
forge build
```

---

## Notes

- All deposits/withdrawals are done in USDT (can be extended to others stablecoins)

- Investments are recorded with unique IDs for full tracking

- NAV is stored on-chain and externally matched with backend analytics

