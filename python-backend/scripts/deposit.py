import os
from dotenv import load_dotenv
from web3 import Web3
from config.config import config
from utils.wallet import get_wallet
from utils.abi_loader import load_abi
from utils.contract_interface import get_contract_instance

load_dotenv()

# Load Web3 and wallet
w3 = Web3(Web3.HTTPProvider(config["RPC_URL"]))
account = get_wallet(w3)

# Load ABI and contract
entry_abi = load_abi("ExxaFundEntry")
entry_contract = get_contract_instance(w3, entry_abi, config["ENTRY_CONTRACT"])


def deposit_usdt(amount_usdt):
    """
    Deposits USDT into the fund and records investment.
    :param amount_usdt: Amount in smallest unit (e.g., 6 decimals for USDT)
    """
    usdt_contract = get_contract_instance(w3, load_abi("USDT"), config["USDT_CONTRACT"])

    # Approve USDT first
    nonce = w3.eth.get_transaction_count(account.address)
    approve_txn = usdt_contract.functions.approve(
        config["ENTRY_CONTRACT"], amount_usdt
    ).build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 100000,
        "gasPrice": w3.to_wei("5", "gwei")
    })

    signed_approve = account.sign_transaction(approve_txn)
    tx_approve_hash = w3.eth.send_raw_transaction(signed_approve.rawTransaction)
    w3.eth.wait_for_transaction_receipt(tx_approve_hash)
    print(f"USDT approved: {tx_approve_hash.hex()}")

    # Now deposit
    nonce += 1
    deposit_txn = entry_contract.functions.deposit(amount_usdt).build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 200000,
        "gasPrice": w3.to_wei("5", "gwei")
    })

    signed_deposit = account.sign_transaction(deposit_txn)
    tx_deposit_hash = w3.eth.send_raw_transaction(signed_deposit.rawTransaction)
    w3.eth.wait_for_transaction_receipt(tx_deposit_hash)
    print(f"Deposit successful: {tx_deposit_hash.hex()}")


if __name__ == "__main__":
    from decimal import Decimal

    usdt_amount = Decimal(input("Enter amount to deposit in USDT: "))
    deposit_usdt(int(usdt_amount * 10**6))