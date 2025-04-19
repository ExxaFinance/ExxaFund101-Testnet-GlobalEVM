
from scripts.deposit import run_deposit
from scripts.nav_updater import run_nav_update
from scripts.rebalance_trigger import run_rebalance
from scripts.event_watcher import watch_events
from scripts.investment_monitor import monitor_investments
from scripts.place_orders_binance import run_order_execution

def main():
    print("""
==================================
     Exxa Fund Python Console     
==================================
[1] ➕  Deposit
[2] 📈  Update NAV
[3] 🔁  Trigger Rebalance
[4] 🧾  Watch Contract Events
[5] 🕵️  Monitor Investments
[6] 📊  Execute Orders on Binance
[0] ❌  Exit
""")
    choice = input("Select an option: ")

    if choice == "1":
        run_deposit()
    elif choice == "2":
        run_nav_update()
    elif choice == "3":
        run_rebalance()
    elif choice == "4":
        watch_events()
    elif choice == "5":
        monitor_investments()
    elif choice == "6":
        run_order_execution()
    elif choice == "0":
        print("Exiting...")
        return
    else:
        print("Invalid option. Try again.")

if __name__ == "__main__":
    while True:
        main()
