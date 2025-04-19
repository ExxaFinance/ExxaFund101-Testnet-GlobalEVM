import os
import json
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# Load env vars
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
RPC_URL = os.getenv("RPC_URL")
CHAIN_ID = int(os.getenv("CHAIN_ID", "137"))  # default: Polygon Mainnet

# Contract addresses from .env
EXXA_ENTRY_ADDRESS = Web3.to_checksum_address(os.getenv("EXXA_ENTRY"))
EXXA_NAV_ADDRESS = Web3.to_checksum_address(os.getenv("EXXA_NAV"))

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(RPC_URL))
account = w3.eth.account.from_key(PRIVATE_KEY)


def load_abi(name):
    """
    Load contract ABI from config/abi folder
    """
    with open(f"config/abi/{name}.json") as f:
        return json.load(f)


def get_contract(name, address):
    """
    Return a contract object (by name and address)
    """
    abi = load_abi(name)
    return w3.eth.contract(address=address, abi=abi)


# Contracts
entry_contract = get_contract("ExxaFundEntry", EXXA_ENTRY_ADDRESS)
nav_contract = get_contract("ExxaNav", EXXA_NAV_ADDRESS)


def build_tx_options():
    """
    Common transaction options (gas, nonce, chain ID)
    """
    return {
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "chainId": CHAIN_ID,
        "gas": 3000000,
        "gasPrice": w3.eth.gas_price,
    }


def send_tx(tx):
    """
    Sign and send a transaction
    """
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f"\u2705 Transaction sent: {tx_hash.hex()}")
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"\u2705 Confirmed in block {receipt.blockNumber}")
    return receipt
