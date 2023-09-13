// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Perpetuals Market Contract
contract PerpetualsMarket {
    address public vaultAddress;
    address public owner;

    constructor(address _vaultAddress) {
        vaultAddress = _vaultAddress;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    struct TradingPair {
        bool exists;
        uint256 lastPrice;
    }

    mapping(bytes32 => TradingPair) public tradingPairs;

    event TradingPairCreated(bytes32 indexed pairId);

    function createTradingPair(bytes32 pairId) external onlyOwner {
        require(!tradingPairs[pairId].exists, "Pair already exists");
        tradingPairs[pairId] = TradingPair(true, 0);
        emit TradingPairCreated(pairId);
    }
}
