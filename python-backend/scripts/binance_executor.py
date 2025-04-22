import ccxt
import os
from dotenv import load_dotenv
from decimal import Decimal

load_dotenv()

# Load Binance credentials
api_key = os.getenv("BINANCE_API_KEY")
api_secret = os.getenv("BINANCE_API_SECRET")

# Initialize Binance client
binance = ccxt.binance({
    'apiKey': api_key,
    'secret': api_secret,
    'enableRateLimit': True
})

# Configuration: Top 10 Assets and Target Weights (in %)
target_allocation = {
    'BTC/USDT': 10,
    'ETH/USDT': 10,
    'BNB/USDT': 10,
    'SOL/USDT': 10,
    'XRP/USDT': 10,
    'ADA/USDT': 10,
    'TRX/USDT': 10,
    'LINK/USDT': 10,
    'DOGE/USDT': 10,
    'MATIC/USDT': 10
}

def get_total_usdt_balance():
    balance = binance.fetch_balance()
    usdt = balance['total'].get('USDT', 0)
    return Decimal(usdt)

def get_prices(symbols):
    prices = {}
    for symbol in symbols:
        ticker = binance.fetch_ticker(symbol)
        prices[symbol] = Decimal(ticker['last'])
    return prices

def place_orders(prices, total_usdt):
    for symbol, weight in target_allocation.items():
        allocation_usdt = (Decimal(weight) / Decimal(100)) * total_usdt
        price = prices[symbol]
        quantity = allocation_usdt / price

        # Round quantity to 6 decimals for safety
        quantity = round(quantity, 6)

        print(f"Placing market buy: {quantity} {symbol.split('/')[0]} for ~{allocation_usdt} USDT")

        try:
            order = binance.create_market_buy_order(
                symbol,
                quantity
            )
            print(f" Order filled: {order['id']}")
        except Exception as e:
            print(f" Error placing order for {symbol}: {str(e)}")

def main():
    print("--- EXXA Binance Rebalancer ---")
    usdt_balance = get_total_usdt_balance()
    print(f"Available USDT: {usdt_balance}")

    prices = get_prices(target_allocation.keys())
    place_orders(prices, usdt_balance)

if __name__ == "__main__":
    main()
