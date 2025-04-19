# 📦 .deps – Solidity Dependencies

This folder contains Solidity dependencies installed via `npm`, such as OpenZeppelin and Chainlink. These are required for compilation, inheritance, and usage in the smart contracts.

---

## 📚 Included Dependencies

### 🔐 [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)

> Version: `^4.x`

Used for:
- `Ownable.sol`: Role-based admin access
- ERC20 utilities (if needed in future expansions)

### 🔗 [Chainlink Contracts](https://github.com/smartcontractkit/chainlink)

> Version: `^0.6` or `^0.8` depending on your oracle deployment

Used for:
- Price Feed interfaces
- On-chain NAV calculation via `AggregatorV3Interface`

---

## 📦 How to Install

From the root of your project:

```bash
npm install @openzeppelin/contracts
npm install @chainlink/contracts

.deps/
└── npm/
    ├── @openzeppelin/
    │   └── contracts/
    │       ├── access/Ownable.sol
    │       └── token/ERC20/...
    └── @chainlink/
        └── contracts/src/v0.8/interfaces/AggregatorV3Interface.sol

// For ownership logic
import "@openzeppelin/contracts/access/Ownable.sol";

// For Chainlink price feeds
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

```







