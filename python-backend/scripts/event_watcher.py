from utils.contract import get_contract
from utils.web3_provider import w3
from config import EXXA_ENTRY_CONTRACT_ADDRESS, EXXA_ENTRY_ABI_PATH, EXXA_NAV_CONTRACT_ADDRESS, EXXA_NAV_ABI_PATH
import time
from datetime import datetime

def watch_events(poll_interval=10):
    entry_contract = get_contract(w3, EXXA_ENTRY_CONTRACT_ADDRESS, EXXA_ENTRY_ABI_PATH)
    nav_contract = get_contract(w3, EXXA_NAV_CONTRACT_ADDRESS, EXXA_NAV_ABI_PATH)

    print("📡 Listening for contract events...\n")
    last_checked = w3.eth.block_number

    while True:
        latest_block = w3.eth.block_number
        if latest_block > last_checked:
            print(f"🔎 Checking new blocks {last_checked+1} to {latest_block}...")

            # === Deposit Events ===
            try:
                deposit_events = entry_contract.events.InvestmentDeposited().get_logs(fromBlock=last_checked+1, toBlock=latest_block)
                for event in deposit_events:
                    user = event['args']['user']
                    amount = event['args']['amountUSD']
                    print(f"💰 Deposit: {user} deposited {amount / 1e6:.2f} USDT at {datetime.utcfromtimestamp(event['args']['timestamp'])}")
            except Exception as e:
                print("❌ Deposit event error:", e)

            # === NAV Updates ===
            try:
                nav_events = nav_contract.events.NAVUpdated().get_logs(fromBlock=last_checked+1, toBlock=latest_block)
                for event in nav_events:
                    new_nav = event['args']['newNav']
                    print(f"📈 NAV Updated: {new_nav / 1e6:.6f}")
            except Exception as e:
                print("❌ NAV event error:", e)

            last_checked = latest_block
        time.sleep(poll_interval)

if __name__ == "__main__":
    try:
        watch_events()
    except KeyboardInterrupt:
        print("\n🛑 Stopped by user.")
