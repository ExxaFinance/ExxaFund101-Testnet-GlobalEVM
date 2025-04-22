from utils.contract import get_contract
from utils.web3_provider import w3
from config import EXXA_NAV_CONTRACT_ADDRESS, EXXA_NAV_ABI_PATH, EXXA_ENTRY_CONTRACT_ADDRESS, EXXA_ENTRY_ABI_PATH

from decimal import Decimal
import sys

def get_user_investments(user_address: str):
    """
    Fetch all investments of a user and show gain/loss based on current NAV.
    """
    entry = get_contract(w3, EXXA_ENTRY_CONTRACT_ADDRESS, EXXA_ENTRY_ABI_PATH)
    nav = get_contract(w3, EXXA_NAV_CONTRACT_ADDRESS, EXXA_NAV_ABI_PATH)

    # 1. Get all user investments
    try:
        investments = entry.functions.getUserInvestments(user_address).call()
    except Exception as e:
        print("Error fetching investments:", e)
        return

    if len(investments) == 0:
        print("No investments found for this address.")
        return

    # 2. Get current NAV
    current_nav = nav.functions.getCurrentNAV().call()
    print(f"\n Current NAV Index: {current_nav / 1e6:.6f}\n")

    total_initial = Decimal(0)
    total_current = Decimal(0)

    for inv in investments:
        inv_id = inv[0]
        amount = Decimal(inv[2]) / Decimal(1e6)
        index_at_entry = Decimal(inv[3]) / Decimal(1e6)
        current_value = (Decimal(current_nav) / Decimal(index_at_entry)) * amount
        gain = current_value - amount

        print(f" Investment ID: {inv_id}")
        print(f"    Timestamp: {inv[4]}")
        print(f"    Amount: {amount:.2f} USDT")
        print(f"    Index at Entry: {index_at_entry:.6f}")
        print(f"    Current Value: {current_value:.2f} USDT")
        print(f"    Gain/Loss: {gain:.2f} USDT\n")

        total_initial += amount
        total_current += current_value

    print("=== Summary ===")
    print(f"Initial Capital: {total_initial:.2f} USDT")
    print(f"Current Value : {total_current:.2f} USDT")
    print(f"Total P/L     : {(total_current - total_initial):.2f} USDT")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python investment_monitor.py <user_wallet_address>")
    else:
        get_user_investments(sys.argv[1])
