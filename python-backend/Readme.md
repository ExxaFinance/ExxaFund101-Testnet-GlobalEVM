# 🧠 ExxaFund Python Backend

This module powers the **automation and cross-chain integration layer** for ExxaFund101 on EVM blockchains.  
It bridges **smart contracts**, **Chainlink price feeds**, and **CEX execution (e.g. Binance)** through Python logic designed for fund rebalancing, NAV tracking, and user investment monitoring.

---

## 📦 Features

- 🔗 Web3 integration to interact with EVM smart contracts (`Web3.py`)
- 📈 Chainlink oracle reader for price aggregation
- 📤 Binance API integration for centralized trade execution (`ccxt`)
- 🧾 ABI autoloader and dynamic contract interface mapper
- 🛠 Modular architecture: deposit handler, NAV updater, rebalancer, event monitor
- 🔐 Secure environment management using `.env`

---

## 🗂 Directory Structure

```text
python-backend/
│
├── .env/                         # Environment variables
│   ├── test-env.py
│   ├── test.txt
│   └── .env.sample
│
├── config/                       # Configuration loaders and ABIs
│   ├── abi/
│   │   └── ChainlinkAggregator.json
│   └── config.py
│
├── utils/                        # Utility scripts (wallets, chainlink, ABI, web3)
│   ├── abi_loader.py
│   ├── chainlink.py
│   ├── contract_interface.py
│   ├── wallet.py
│   └── web3utils.py
│
├── scripts/                      # Executable logic
│   ├── binance_executor.py       # Places buy/sell orders via Binance (ccxt)
│   ├── deposit.py                # Calls ExxaFundEntry.deposit()
│   ├── event_watcher.py          # Listens to contract events (Deposit, NAV update)
│   ├── investment_monitor.py     # Tracks individual user investment performance
│   ├── nav_updater.py            # Updates index/NAV via Chainlink
│   └── rebalance_trigger.py      # Calls ExxaRebalanceRequest to trigger rebalancing
│
└── main.py                       # Optional entrypoint for CLI or orchestration
```
