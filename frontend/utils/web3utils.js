// /utils/webutils.js

import Web3 from 'web3';

/**
 * Initialize a Web3 instance with the specified provider (Metamask, etc.)
 */
export const initWeb3 = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    console.error('No Ethereum provider detected.');
    return null;
  }
};

/**
 * Call a function from a smart contract.
 * @param {string} contractAddress - The smart contract address.
 * @param {object} abi - The ABI of the smart contract.
 * @param {string} functionName - The function name you want to call.
 * @param {array} params - The parameters for the contract function.
 * @returns {Promise} - A promise that resolves to the function result.
 */
export const callContractFunction = async (contractAddress, abi, functionName, params = []) => {
  const web3 = initWeb3();
  if (!web3) return;

  const contract = new web3.eth.Contract(abi, contractAddress);
  try {
    const result = await contract.methods[functionName](...params).call();
    return result;
  } catch (err) {
    console.error('Error calling contract function', err);
  }
};

/**
 * Send a transaction to a contract method.
 * @param {string} contractAddress - The contract address.
 * @param {object} abi - The ABI of the contract.
 * @param {string} functionName - The function name to call.
 * @param {array} params - The parameters to pass to the function.
 * @param {string} fromAddress - The address from which to send the transaction.
 * @returns {Promise} - A promise that resolves when the transaction is sent.
 */
export const sendTransaction = async (contractAddress, abi, functionName, params = [], fromAddress) => {
  const web3 = initWeb3();
  if (!web3) return;

  const contract = new web3.eth.Contract(abi, contractAddress);
  try {
    const tx = await contract.methods[functionName](...params).send({ from: fromAddress });
    return tx;
  } catch (err) {
    console.error('Error sending transaction', err);
  }
};

/**
 * Fetch the balance of an address for a specific token contract.
 * @param {string} tokenAddress - The ERC20 token contract address.
 * @param {string} userAddress - The address for which to fetch the balance.
 * @returns {Promise} - The token balance for the address.
 */
export const getTokenBalance = async (tokenAddress, userAddress) => {
  const web3 = initWeb3();
  if (!web3) return null;

  const tokenContract = new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
      },
    ],
    tokenAddress
  );
  try {
    const balance = await tokenContract.methods.balanceOf(userAddress).call();
    return web3.utils.fromWei(balance, 'ether');
  } catch (err) {
    console.error('Error fetching token balance', err);
  }
};
