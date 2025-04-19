from utils.contract_interface import get_contract_instance
from utils.config import EXXA_FUND_ENTRY_ADDRESS, EXXA_FUND_ENTRY_ABI_PATH


class ExxaFundInterface:
    def __init__(self, web3):
        self.web3 = web3
        self.contract = get_contract_instance(
            web3, EXXA_FUND_ENTRY_ADDRESS, EXXA_FUND_ENTRY_ABI_PATH
        )

    def deposit(self, user_address, token_address, amount_usd, private_key):
        tx = self.contract.functions.deposit(token_address, amount_usd).build_transaction({
            'from': user_address,
            'nonce': self.web3.eth.get_transaction_count(user_address),
            'gas': 300000,
            'gasPrice': self.web3.to_wei('5', 'gwei')
        })
        signed_tx = self.web3.eth.account.sign_transaction(tx, private_key)
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        return tx_hash.hex()

    def get_user_investments(self, user_address):
        return self.contract.functions.getUserHistory(user_address).call()

    def get_top_assets(self):
        return self.contract.functions.getTop10Assets().call()

    def get_user_share_value(self, user_address):
        return self.contract.functions.getUserShareValue(user_address).call()

    def get_stablecoins(self):
        return self.contract.functions.getStablecoins().call()

    def total_fund_value(self):
        return self.contract.functions.totalFundValueUSD().call()

    def total_shares(self):
        return self.contract.functions.totalShares().call()

    def rebalance(self, caller_address, private_key):
        tx = self.contract.functions.rebalancePortfolio().build_transaction({
            'from': caller_address,
            'nonce': self.web3.eth.get_transaction_count(caller_address),
            'gas': 300000,
            'gasPrice': self.web3.to_wei('5', 'gwei')
        })
        signed_tx = self.web3.eth.account.sign_transaction(tx, private_key)
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        return tx_hash.hex()