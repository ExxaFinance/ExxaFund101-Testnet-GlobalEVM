# 📁 artifacts/

This directory contains the **compiled artifacts** for all smart contracts in the ExxaFund101 system.

These JSON files are auto-generated during compilation and are required for:

- Deployments
- Interactions via Web3, Ethers.js, or Python (web3.py)
- Integration with frontend/backends using ABI + bytecode

---

## 📦 Contents

Each contract is represented by:

- `ContractName.json`: ABI + bytecode + interface
- `ContractName_metadata.json`: Compiler details, source hash, optimization flags, etc.

### Example Contracts Included

| Contract                | Purpose                                   |
|------------------------|-------------------------------------------|
| `ExxaFundEntry.json`    | User deposits & investment recording      |
| `ExxaFundExit.json`     | Withdrawal handler (if used)              |
| `ExxaNAV.json`          | Index value storage & NAV calculation     |
| `ExxaAdmin.json`        | Admin controls for fees/oracles/settings |
| `ExxaRebalanceRequest.json` | External trigger for rebalancing logic |
| `ExxaBaseStorage.json`  | Shared storage layout                     |
| `IERC20.json`           | ERC20 interface used for token handling  |

---

## 🔁 How It's Used

These artifacts are consumed by:

- `scripts/deploy_with_ethers.ts` or `web3.ts`
- Python backend via `abi_loader.py`
- Any frontend DApp interacting with the contracts

---

## 🛠 Compilation (if regenerating)

These files are created when running a build tool like:

```bash
# Hardhat
npx hardhat compile

# Foundry
forge build

