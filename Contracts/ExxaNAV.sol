// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title ExxaNAV
 * @notice Calculates and stores Net Asset Value (NAV) of the fund globally and per user.
 */
contract ExxaNAV is Ownable {
    struct NAVRecord {
        uint256 timestamp;
        uint256 totalValue;
    }

    struct UserNAVRecord {
        uint256 timestamp;
        uint256 userValue;
    }

    // NAV per fund ID
    mapping(uint256 => NAVRecord[]) public fundNAVHistory;

    // NAV per user per fund ID
    mapping(address => mapping(uint256 => UserNAVRecord[])) public userNAVHistory;

    // Oracle feed per asset
    mapping(string => address) public priceFeeds;

    event NAVUpdated(uint256 indexed fundId, uint256 value, uint256 timestamp);
    event UserNAVUpdated(address indexed user, uint256 indexed fundId, uint256 value, uint256 timestamp);
    event PriceFeedSet(string symbol, address feed);

    constructor(address initialOwner) Ownable(initialOwner) {}

    // Link a token symbol to a Chainlink price feed
    function setPriceFeed(string calldata symbol, address feed) external onlyOwner {
        priceFeeds[symbol] = feed;
        emit PriceFeedSet(symbol, feed);
    }

    // Get the latest price from Chainlink oracle
    function getLatestPrice(string memory symbol) public view returns (uint256) {
        require(priceFeeds[symbol] != address(0), "No feed for asset");
        AggregatorV3Interface feed = AggregatorV3Interface(priceFeeds[symbol]);
        (
            , int price, , ,
        ) = feed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    // Called by fund logic to update NAV globally
    function updateFundNAV(uint256 fundId, uint256 navUSD) external onlyOwner {
        fundNAVHistory[fundId].push(NAVRecord({
            timestamp: block.timestamp,
            totalValue: navUSD
        }));

        emit NAVUpdated(fundId, navUSD, block.timestamp);
    }

    // Called to store user NAV snapshots
    function updateUserNAV(address user, uint256 fundId, uint256 navUSD) external onlyOwner {
        userNAVHistory[user][fundId].push(UserNAVRecord({
            timestamp: block.timestamp,
            userValue: navUSD
        }));

        emit UserNAVUpdated(user, fundId, navUSD, block.timestamp);
    }

    function getFundNAVHistory(uint256 fundId) external view returns (NAVRecord[] memory) {
        return fundNAVHistory[fundId];
    }

    function getUserNAVHistory(address user, uint256 fundId) external view returns (UserNAVRecord[] memory) {
        return userNAVHistory[user][fundId];
    }
}
