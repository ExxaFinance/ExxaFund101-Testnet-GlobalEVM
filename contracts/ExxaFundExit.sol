// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
//
import "./ExxaBaseStorage.sol";

// ExxaFundExit allows users to securely withdraw their investments
contract ExxaFundExit is ExxaBaseStorage {
    // Event that logs when a user successfully withdraws funds
    event Withdrawn(address indexed user, uint256 id, uint256 amount, uint256 time);

    // Constructor that sets the USDT address for this contract
    constructor(address _usdt) ExxaBaseStorage(_usdt) {}

    // Allows a user to withdraw their specific investment by referencing the investment ID
    function withdraw(uint256 investmentId) external {
        Investment storage inv = investmentsById[investmentId];

        // Make sure the investment belongs to the caller
        require(inv.user == msg.sender, "Not your investment");

        // Prevent double withdrawal
        require(!inv.withdrawn, "Already withdrawn");

        // Mark investment as withdrawn
        inv.withdrawn = true;

        // Transfer funds in USDT to the user
        IERC20(usdt).transfer(msg.sender, inv.amountUSD);

        // Emit event for logging
        emit Withdrawn(msg.sender, investmentId, inv.amountUSD, block.timestamp);
    }

    // Admin function to help users recover funds in case of issues or emergencies
    function emergencyAdminWithdraw(address user, uint256 id) external onlyOwner {
        require(id < userInvestments[user].length, "Invalid ID");
        Investment storage inv = userInvestments[user][id];
        require(!inv.withdrawn, "Already withdrawn");

        inv.withdrawn = true;
        IERC20(usdt).transfer(user, inv.amountUSD);

        emit Withdrawn(user, inv.id, inv.amountUSD, block.timestamp);
    }
}

// ERC20 token interface to interact with USDT transfers
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}
