# config/config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# === RPC CONFIG ===
RPC_URL = os.getenv("RPC_URL")  # Your mainnet/testnet RPC endpoint
CHAIN_ID = int(os.getenv("CHAIN_ID", "1"))  # Default to Ethereum Mainnet

# === PRIVATE KEYS / ACCOUNTS ===
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
PUBLIC_ADDRESS = os.getenv("PUBLIC_ADDRESS")

# === CONTRACT ADDRESSES ===
EXXA_FUND_ENTRY = os.getenv("EXXA_FUND_ENTRY")  # Entry contract
EXXA_NAV_CONTRACT = os.getenv("EXXA_NAV_CONTRACT")
EXXA_REBALANCE_REQUEST = os.getenv("EXXA_REBALANCE_REQUEST")

# === CHAINLINK FEEDS ===
CHAINLINK_FEEDS = {
    "ETH": os.getenv("CHAINLINK_ETH_USD"),
    "BTC": os.getenv("CHAINLINK_BTC_USD"),
    "USDT": os.getenv("CHAINLINK_USDT_USD"),
    # Add more if needed
}

# === BINANCE API (for price cross-checking if needed) ===
BINANCE_API_KEY = os.getenv("BINANCE_API_KEY")
BINANCE_API_SECRET = os.getenv("BINANCE_API_SECRET")

# === GENERAL CONFIG ===
GAS_LIMIT = int(os.getenv("GAS_LIMIT", 300000))
GAS_PRICE_GWEI = int(os.getenv("GAS_PRICE_GWEI", 5))

# === LOGGING CONFIG ===
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
