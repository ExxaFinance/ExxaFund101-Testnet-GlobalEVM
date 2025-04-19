// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ExxaBaseStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExxaRebalanceRequest is ExxaBaseStorage, Ownable {
    struct RebalanceRequest {
        uint256 id;
        address triggeredBy;
        uint256 timestamp;
        bool executed;
        string[] overweights;
        string[] underweights;
    }

    uint256 public requestCounter;
    mapping(uint256 => RebalanceRequest) public rebalanceRequests;
    mapping(address => bool) public authorizedCallers;

    event RebalanceRequested(
        uint256 indexed id,
        address indexed triggeredBy,
        uint256 time,
        string[] overweights,
        string[] underweights
    );

    event RequestExecuted(uint256 indexed id);
    event CallerAuthorizationUpdated(address caller, bool status);

    modifier onlyAuthorized() {
        require(owner() == msg.sender || authorizedCallers[msg.sender], "Unauthorized");
        _;
    }

    constructor(address _usdt) ExxaBaseStorage(_usdt) Ownable(msg.sender) {}

    function updateAuthorizedCaller(address caller, bool status) external onlyOwner {
        authorizedCallers[caller] = status;
        emit CallerAuthorizationUpdated(caller, status);
    }

    function requestRebalance(string[] calldata overweights, string[] calldata underweights) external onlyAuthorized {
        requestCounter++;

        rebalanceRequests[requestCounter] = RebalanceRequest({
            id: requestCounter,
            triggeredBy: msg.sender,
            timestamp: block.timestamp,
            executed: false,
            overweights: overweights,
            underweights: underweights
        });

        emit RebalanceRequested(requestCounter, msg.sender, block.timestamp, overweights, underweights);
    }

    function markRequestExecuted(uint256 id) external onlyAuthorized {
        require(!rebalanceRequests[id].executed, "Already executed");
        rebalanceRequests[id].executed = true;
        emit RequestExecuted(id);
    }

    function getRequest(uint256 id) external view returns (RebalanceRequest memory) {
        return rebalanceRequests[id];
    }

    function isCallerAuthorized(address caller) external view returns (bool) {
        return authorizedCallers[caller];
    }
}