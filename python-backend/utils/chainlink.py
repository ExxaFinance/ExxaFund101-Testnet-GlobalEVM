import os
from web3 import Web3
from dotenv import load_dotenv
from utils.web3_utils import load_abi

load_dotenv()

# Initialize Web3
RPC_URL = os.getenv("RPC_URL")
w3 = Web3(Web3.HTTPProvider(RPC_URL))

# Chainlink AggregatorV3Interface ABI (simplified)
CHAINLINK_ABI = load_abi("ChainlinkAggregator.json")

# Example Chainlink feed address for ETH/USD (update per chain)
CHAINLINK_FEEDS = {
    "ETH/USD": os.getenv("CHAINLINK_ETH_USD"),
    "BTC/USD": os.getenv("CHAINLINK_BTC_USD"),
    # Add more assets here...
}

def get_latest_price(feed_name: str) -> float:
    """
    Fetch the latest price from a Chainlink feed.
    :param feed_name: e.g. "ETH/USD"
    :return: float price
    """
    feed_address = CHAINLINK_FEEDS.get(feed_name)
    if not feed_address:
        raise ValueError(f"Feed {feed_name} not configured")

    feed = w3.eth.contract(address=feed_address, abi=CHAINLINK_ABI)
    round_data = feed.functions.latestRoundData().call()
    decimals = feed.functions.decimals().call()

    price = round_data[1] / (10 ** decimals)
    return price
