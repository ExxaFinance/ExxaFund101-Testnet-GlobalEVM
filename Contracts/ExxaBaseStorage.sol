// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

abstract contract ExxaBaseStorage {
    // Counter to assign a unique ID to each user investment
    uint256 internal globalInvestmentId;

    // USDT token address - used for all deposits and withdrawals
    address public usdt;

    // Address of the fund owner or admin who can update critical parameters
    address public owner_;

    // Latest recorded index value for the fund (used to calculate performance)
    uint256 public currentIndexPrice;

    // A single investment made by a user
    struct Investment {
        uint256 id;              // Unique ID for tracking
        address user;            // Address of the user
        uint256 amountUSD;       // Amount deposited in USDT
        uint256 indexAtEntry;    // Index value at the time of entry
        uint256 timestamp;       // When the deposit was made
        bool withdrawn;          // True if user has withdrawn this investment
    }

    // Mapping of all investments per user
    mapping(address => Investment[]) internal userInvestments;

    // Optional: global investment tracking by ID (if we need to reference it later)
    mapping(uint256 => Investment) internal investmentsById;

    // Modifier to ensure only the fund owner can call certain functions
   // modifier onlyOwner_() {
     //   require(msg.sender == owner_, "Not authorized");
     //   _;
   // }

    // Constructor sets the USDT token and assigns ownership to deployer
    constructor(address _usdt) {
        require(_usdt != address(0), "Invalid USDT address");
        usdt = _usdt;
        owner_ = msg.sender;
    }
}