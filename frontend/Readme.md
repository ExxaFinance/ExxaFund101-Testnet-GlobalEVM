# 🧠 ExxaFund Frontend

This module serves as the **user-facing interface** for interacting with the ExxaFund101 ecosystem. Built using **Next.js** and **React**, it allows users to manage their investments, track NAV, make deposits, and interact with the decentralized fund. This frontend is designed to work seamlessly with the **EVM-compatible** ExxaFund101 smart contracts.

---

## 📦 Features

- 🔗 **Wallet Connection**: Securely connect with MetaMask or any EVM-compatible wallet.
- 📊 **Investment Overview**: View user portfolio and investment performance.
- 🧾 **Deposit**: Allow users to deposit funds (USDT or other stablecoins).
- 📈 **Rebalancing**: Execute fund rebalancing strategy through the frontend.
- 🔄 **Cross-chain Interactions**: Interact with multiple EVM chains for deposit, withdrawal, and contract interaction.
- 📡 **Smart Contract Interactions**: Perform contract functions like NAV update, deposits, and rebalancing.

---

## 🗂 Directory Structure
```bash
/frontend
  ├── .env                     # Environment variables for configuration
  ├── .gitignore                # Ignore node_modules, build files, etc.
  ├── package.json              # Project dependencies and scripts
  ├── next.config.js            # Next.js configuration
  ├── app/                      # App directory for page routing
  │   ├── admin/                # Admin panel and configurations
  │   ├── history/              # Displays transaction history
  │   ├── investments/          # User investments and portfolio overview
  │   ├── nav-history/          # Navigation through portfolio history
  │   ├── overview/             # Dashboard overview
  │   ├── rebalance/            # Rebalancing interface
  │   └── withdraw/             # Withdrawal page
  ├── lib/                      # Utilities for wallet and contract interactions
  │   ├── connectWallet.ts      # Handles wallet connection
  │   └── contractInterface.ts  # Interacts with deployed contracts
  ├── src/                      # Source code for frontend components
  │   ├── components/           # Reusable components (Navbar, Footer, etc.)
  │   ├── pages/                # Next.js pages for routing
  │   └── styles/               # CSS/SCSS for custom styling
  ├── utils/                    # Utility functions for Web3, wallet, etc.
  │   ├── wallet.js             # Handles wallet interaction and network
  │   └── web3utils.js          # Web3.js utilities
  └── .env.sample               # Template for .env configuration
```

---

## 🧠 How It Works

1. **Connect Wallet**: Users can securely connect their wallet using MetaMask or other Web3 wallets.
2. **Deposit**: Users can deposit USDT or other supported stablecoins into the fund.
3. **Portfolio Overview**: Users can track the performance of their investments.
4. **Rebalancing**: Users can trigger rebalancing actions based on predefined strategies.
5. **NAV Updates**: The NAV is automatically updated over time using Chainlink price feeds.

---

## ⚙️ Setup

### Prerequisites

Ensure you have the following tools installed:

- Node.js v16 or later
- npm (or yarn)

### Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

```bash
# Web3 provider URL (Infura, Alchemy, etc.)
WEB3_PROVIDER_URL="your_web3_provider_url"
```

```bash
# Smart contract addresses and other configuration
EXXA_CONTRACT_ADDRESS="your_exxa_contract_address"
```

```bash
npm run dev
```

---

## 🔐 Security & Roles

- Admin Access: Admins have control over certain operations such as updating NAV, pausing deposits, and executing rebalancing strategies.
- Wallet Connection: Securely connects with Web3 wallets such as MetaMask.

---
## 🛠 Deployment

For production deployment, you can build and deploy the frontend using the following commands:

```bash
npm run build
npm run start
```

---

## 🧑‍💼 Contributions

We welcome contributions! Feel free to fork the repository and submit pull requests. You can help by fixing bugs, adding features, or improving the documentation.
