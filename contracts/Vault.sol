// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Vault Contract for Collateral Management
contract Vault {
    mapping(address => uint256) public balances;

    function depositCollateral() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawCollateral(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}

