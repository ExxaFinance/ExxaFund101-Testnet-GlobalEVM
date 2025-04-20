# 🧠 ExxaFund Python Backend

This module powers the **automation and integration layer** for the ExxaFund101 smart contract ecosystem across EVM-compatible blockchains.  
It bridges **on-chain logic**, **Chainlink price feeds**, and **CEX infrastructure** through modular and scalable Python tooling.

> Designed for **multi-chain**, **multi-contract**, and **real-time rebalancing** strategies.

---

## 📦 Features

- 🔗 Web3.py integration to interact with EVM smart contracts
- 📊 Chainlink price feed integration (with ABI decoding)
- 📤 Binance API execution layer via `ccxt`
- 🧠 Contract interface auto-loader and ABI injector
- 🔐 Secure key & environment config through `.env` support
- 🧱 Modular architecture (each action = standalone script)
- 🧰 Built-in utilities for wallets, transactions, gas, decoding
- ⚙️ CLI-ready and orchestrator-compatible

---

## 🗂 Directory Structure

```plaintext
python-backend/
│
├── .env/                       # Environment variables (local .env loading)
│   ├── test-env.py
│   ├── test.txt
│   └── .env.sample
│
├── .idea/                      # IntelliJ / PyCharm workspace files (optional)
│   └── workspace.xml
│
├── config/                     # Central config management
│   ├── abi/
│   │   └── ChainlinkAggregator.json
│   └── config.py
│
├── utils/                      # Core utilities
│   ├── abi_loader.py           # Loads ABI dynamically from JSON
│   ├── chainlink.py            # Chainlink oracle price fetcher
│   ├── contract_interface.py   # Binds ABI + address into callable contracts
│   ├── wallet.py               # Signs & manages private key actions
│   └── web3utils.py            # Common Web3 helpers (RPC setup, gas, encoding)
│
├── scripts/                    # Executable core scripts
│   ├── binance_executor.py     # Places orders via Binance API
│   ├── deposit.py              # Calls `ExxaFundEntry.deposit()`
│   ├── event_watcher.py        # Watches contract events (Deposit, NAV updates)
│   ├── investment_monitor.py   # Tracks individual user performance
│   ├── nav_updater.py          # Updates NAV via Chainlink into contract
│   └── rebalance_trigger.py    # Triggers TWAP rebalancing requests
│
├── main.py                     # (Optional) Entrypoint for CLI automation
└── Readme.md                   # This file
