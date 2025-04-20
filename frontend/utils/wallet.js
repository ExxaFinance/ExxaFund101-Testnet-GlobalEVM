// /utils/wallet.js

import Web3 from 'web3';

/**
 * Initialize a Web3 instance using the provider from the browser.
 * This function checks for Metamask or any other Ethereum-compatible wallet.
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
 * Request the user's wallet to connect (Metamask, Coinbase, etc.)
 */
export const requestAccount = async () => {
  const web3 = initWeb3();
  if (!web3) return null;

  try {
    const accounts = await web3.eth.requestAccounts();
    return accounts[0]; // Return the first account
  } catch (err) {
    console.error('Failed to connect wallet', err);
    return null;
  }
};

/**
 * Get the current account address from the wallet.
 * @returns {string|null} - The address or null if no account found.
 */
export const getAccount = async () => {
  const web3 = initWeb3();
  if (!web3) return null;

  const accounts = await web3.eth.getAccounts();
  return accounts[0] || null; // Return first account or null if no account is connected
};

/**
 * Switch to the network provided by the user.
 * @param {string} chainId - The chain ID (e.g. '0x1' for Ethereum mainnet).
 */
export const switchNetwork = async (chainId) => {
  const web3 = initWeb3();
  if (!web3) return;

  try {
    await web3.eth.requestAccounts();
    await web3.currentProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }],
    });
  } catch (err) {
    console.error('Failed to switch network', err);
  }
};
