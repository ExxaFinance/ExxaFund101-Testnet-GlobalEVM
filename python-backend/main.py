from scripts.deposit import run_deposit
from scripts.nav_updater import run_nav_update
from scripts.rebalance_trigger import run_rebalance
from scripts.event_watcher import watch_events

def main():
    print("\n=== Exxa Fund CLI ===")
    print("1. Deposit")
    print("2. Update NAV")
    print("3. Rebalance")
    print("4. Watch Events")
    choice = input("Select an option: ")

    if choice == "1":
        run_deposit()
    elif choice == "2":
        run_nav_update()
    elif choice == "3":
        run_rebalance()
    elif choice == "4":
        watch_events()
    else:
        print("Invalid selection.")

if __name__ == "__main__":
    main()
