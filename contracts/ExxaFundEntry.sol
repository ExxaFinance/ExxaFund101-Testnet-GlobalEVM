// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;
//
import "./ExxaBaseStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Handles new investments into the fund using USDT. Inherits base storage.
 
contract ExxaFundEntry is ExxaBaseStorage {
    event Deposited(address indexed user, uint256 amountUSD, uint256 indexAtEntry, uint256 id);

    constructor(address _usdt) ExxaBaseStorage(_usdt) {}

    function deposit(uint256 amountUSD, uint256 currentIndex) external {
        require(amountUSD > 0, "Amount must be > 0");
        require(currentIndex > 0, "Invalid index");

        IERC20(usdt).transferFrom(msg.sender, address(this), amountUSD);

        globalInvestmentId++;

        Investment memory inv = Investment({
            id: globalInvestmentId,
            user: msg.sender,
            amountUSD: amountUSD,
            indexAtEntry: currentIndex,
            timestamp: block.timestamp,
            withdrawn: false
        });

        userInvestments[msg.sender].push(inv);
        investmentsById[globalInvestmentId] = inv;

        emit Deposited(msg.sender, amountUSD, currentIndex, globalInvestmentId);
    }
}
