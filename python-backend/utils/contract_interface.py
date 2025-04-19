from web3 import Web3
from utils.abi_loader import load_abi
from config.config import EXXA_FUND_ADDRESS, NAV_CONTRACT_ADDRESS
from utils.web3utils import get_web3
from utils.wallet import get_wallet
import json


class ContractInterface:
    """
    Provides an interface to interact with deployed smart contracts (ExxaFund, NAV, etc.).
    Handles loading ABIs, contract instances, and calling read/write functions.
    """

    def __init__(self):
        self.web3 = get_web3()
        self.account = get_wallet(self.web3)

        # Load and bind contract instances
        self.exxafund_contract = self._load_contract(EXXA_FUND_ADDRESS, "ExxaFund")
        self.nav_contract = self._load_contract(NAV_CONTRACT_ADDRESS, "ExxaNAV")

    def _load_contract(self, contract_address: str, abi_name: str):
        abi = load_abi(abi_name)
        return self.web3.eth.contract(address=contract_address, abi=abi)

    def call_read_function(self, contract, function_name: str, *args):
        """
        Calls a read-only function on the contract.
        Returns the result.
        """
        return getattr(contract.functions, function_name)(*args).call()

    def send_transaction(self, contract, function_name: str, *args):
        """
        Sends a transaction to modify contract state (e.g., deposit, updateNAV).
        Signs with local wallet.
        """
        nonce = self.web3.eth.get_transaction_count(self.account.address)
        gas_price = self.web3.eth.gas_price

        tx = getattr(contract.functions, function_name)(*args).build_transaction({
            'from': self.account.address,
            'nonce': nonce,
            'gasPrice': gas_price,
        })

        signed_tx = self.account.sign_transaction(tx)
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        return self.web3.to_hex(tx_hash)


# Example usage
if __name__ == "__main__":
    ci = ContractInterface()
    fund_owner = ci.call_read_function(ci.exxafund_contract, "owner")
    print(f"Fund owner: {fund_owner}")