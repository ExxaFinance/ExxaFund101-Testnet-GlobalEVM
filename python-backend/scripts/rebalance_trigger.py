from utils.contract import get_contract
from utils.wallet import get_wallet
from utils.web3_provider import w3
from config import EXXA_REBALANCE_CONTRACT_ADDRESS, EXXA_REBALANCE_ABI_PATH
from web3.exceptions import ContractLogicError

def trigger_rebalance():
    wallet = get_wallet()
    contract = get_contract(w3, EXXA_REBALANCE_CONTRACT_ADDRESS, EXXA_REBALANCE_ABI_PATH)

    try:
        print("⚖️  Sending rebalance request...")
        tx = contract.functions.requestRebalance().build_transaction({
            'from': wallet.address,
            'nonce': w3.eth.get_transaction_count(wallet.address),
            'gas': 300000,
            'gasPrice': w3.to_wei('10', 'gwei'),
        })

        signed_tx = wallet.sign_transaction(tx)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        print(f" Rebalance triggered in tx: {tx_hash.hex()}")
        print(" Receipt status:", receipt.status)
    except ContractLogicError as e:
        print("Contract error:", e)
    except Exception as e:
        print("General error:", e)

if __name__ == "__main__":
    trigger_rebalance()
