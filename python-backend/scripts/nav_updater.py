import os
import time
from dotenv import load_dotenv
from web3 import Web3
from utils.wallet import get_wallet
from utils.abi_loader import load_abi
from utils.contract import get_contract_instance
from config import NAV_CONTRACT_ADDRESS, ORACLE_MAPPING, CHAINLINK_ABI_PATH, NAV_ABI_PATH, RPC_URL

# Load environment variables
load_dotenv()
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CHAIN_ID = int(os.getenv("CHAIN_ID", "1"))

# Setup Web3 provider and wallet
w3 = Web3(Web3.HTTPProvider(RPC_URL))
wallet = get_wallet(w3, PRIVATE_KEY)

# Load ABIs
chainlink_abi = load_abi(CHAINLINK_ABI_PATH)
nav_abi = load_abi(NAV_ABI_PATH)

# Load NAV contract instance
nav_contract = get_contract_instance(w3, NAV_CONTRACT_ADDRESS, nav_abi)

def get_latest_price(feed_contract):
    """Calls Chainlink oracle contract to get the latest asset price."""
    latest_round_data = feed_contract.functions.latestRoundData().call()
    price = latest_round_data[1]
    decimals = feed_contract.functions.decimals().call()
    return price / (10 ** decimals)

def calculate_index_price():
    """Fetches each asset price and calculates a basic NAV (equal-weighted)."""
    prices = []
    for name, address in ORACLE_MAPPING.items():
        feed = get_contract_instance(w3, address, chainlink_abi)
        try:
            price = get_latest_price(feed)
            print(f"{name}: {price}")
            prices.append(price)
        except Exception as e:
            print(f"Error getting price for {name}: {e}")
    index_price = sum(prices) / len(prices)
    return int(index_price * 1e18)  # 18 decimals

def update_nav():
    """Submits the NAV update to the smart contract."""
    index_price = calculate_index_price()
    print(f"Computed index NAV: {index_price}")

    tx = nav_contract.functions.updateIndexPrice(index_price).build_transaction({
        "from": wallet.address,
        "nonce": w3.eth.get_transaction_count(wallet.address),
        "gas": 200_000,
        "gasPrice": w3.to_wei("20", "gwei"),
        "chainId": CHAIN_ID,
    })

    signed_tx = wallet.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f"Transaction sent: {w3.to_hex(tx_hash)}")

if __name__ == "__main__":
    update_nav()
