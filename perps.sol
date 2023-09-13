// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract PerpetualsProtocol {
    struct Account {
        address owner;
        uint256 balance;
        mapping(bytes32 => Position) positions; // Each pair is associated with a position
    }

    struct Position {
        int256 quantity; // 0 for short, 1 for long
        uint256 margin;  // Amount of collateral for the position
    }

    struct Pair {
        address token1;
        address token2;
    }

    IERC20 public collateralToken; // use ERC20 tokens as collateral
    uint256 public protocolPool;   // Funds that are in the protocol's pool
    uint256 public liquidatorReward = 1 ether; // For simplicity, setting a static reward

    mapping(address => Account) public accounts;
    mapping(bytes32 => Pair) public pairs; // Pair identifier (hash of tokens) to Pair

    constructor(address _collateralToken) {
        collateralToken = IERC20(_collateralToken);
    }

    function deposit_to_account(uint256 amount) external {
        require(collateralToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        accounts[msg.sender].balance += amount;
    }

    function withdraw_from_account(uint256 amount) external {
        require(accounts[msg.sender].balance >= amount, "Insufficient balance");
        accounts[msg.sender].balance -= amount;
        require(collateralToken.transfer(msg.sender, amount), "Transfer failed");
    }

    function verifyProof(bytes memory proof) internal pure returns (bool) {
        // Placeholder function. replace with  proof verification logic.
        return true; 
    }

    function liquidate_account(address accountAddress, bytes memory proof) external {
        require(verifyProof(proof), "Invalid proof");

        // Move the account balance to the protocol pool
        protocolPool += accounts[accountAddress].balance;
        accounts[accountAddress].balance = 0;

        // Reset the positions
        for(bytes32 pairId in pairs) {
            accounts[accountAddress].positions[pairId].quantity = 0;
            accounts[accountAddress].positions[pairId].margin = 0;
        }

        // Send the reward to the caller
        protocolPool -= liquidatorReward;
        require(collateralToken.transfer(msg.sender, liquidatorReward), "Transfer failed");
    }
}
