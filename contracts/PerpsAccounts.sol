// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PerpsAccounts {

    struct PerpsAccount {
        address payable account;
        uint256 balance;
    }

    mapping(address => PerpsAccount) public accounts;
    address public protocolPool; // address of the protocol's pool

    constructor(address _protocolPool) {
        protocolPool = _protocolPool;
    }

    function createAccount() external {
        require(accounts[msg.sender].account == address(0), "Account already exists");
        accounts[msg.sender].account = payable(msg.sender);
    }

    function deposit() external payable {
        require(msg.value > 0, "Must send ether");
        accounts[msg.sender].balance += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(accounts[msg.sender].balance >= amount, "Insufficient funds");
        // require that account has no open positions
        accounts[msg.sender].balance -= amount;
        accounts[msg.sender].account.transfer(amount);
    }

    function liquidateAccount(address user, bytes memory proof) external {
        // Placeholder for the proof verification logic
        require(verifyProof(proof), "Invalid proof");

        uint256 liquidationAmount = accounts[user].balance;
        require(liquidationAmount > 0, "Nothing to liquidate");
        
        accounts[user].balance = 0;

        uint256 reward = liquidationAmount / 100;  // reward 1% to liquidator

        uint256 protocolAmount = liquidationAmount - reward; // rest goes to the protocol pool
        payable(protocolPool).transfer(protocolAmount);

        // send reward
        payable(msg.sender).transfer(reward);
    }

    function getAccountBalance(address user) external view returns(uint256) {
        return accounts[user].balance;
    }

    // Placeholder function for verifying the proof. Implement actual logic.
    function verifyProof(bytes memory proof) internal pure returns(bool) {
        // TODO: Add the actual proof verification logic here
        proof = proof;
        return true;  // Placeholder
    }
}
