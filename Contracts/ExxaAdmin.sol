// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ExxaBaseStorage.sol";

/**
 * Handles global fund settings such as pausing, oracle setup, fees, and backend operators.
 * This is meant to be inherited or used as a base admin control layer.
 */
contract ExxaAdmin is Ownable, ExxaBaseStorage {
    bool public depositsPaused = false;
    address public oracle;
    address public backendOperator;
    uint256 public depositFeeBps;

    event DepositsPaused(bool paused);
    event OracleUpdated(address newOracle);
    event BackendOperatorUpdated(address newOperator);
    event DepositFeeUpdated(uint256 newFeeBps);

    constructor(address initialOwner, address _usdt) Ownable(initialOwner) ExxaBaseStorage(_usdt) {}

    // Allows admin to pause or unpause deposits to the fund
    function setDepositPaused(bool paused) external onlyOwner {
        depositsPaused = paused;
        emit DepositsPaused(paused);
    }

    // Set a new oracle address (e.g., Chainlink aggregator)
    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle address");
        oracle = _oracle;
        emit OracleUpdated(_oracle);
    }

    // Appoint or change backend automation operator
    function setBackendOperator(address _operator) external onlyOwner {
        backendOperator = _operator;
        emit BackendOperatorUpdated(_operator);
    }

    // Define deposit fee (in basis points, max 5%)
    function setDepositFee(uint256 feeBps) external onlyOwner {
        require(feeBps <= 500, "Fee too high");
        depositFeeBps = feeBps;
        emit DepositFeeUpdated(feeBps);
    }

    // Utility function to check if a caller is owner or operator
    function isAuthorizedOperator(address caller) public view returns (bool) {
        return (caller == owner() || caller == backendOperator);
    }
}

