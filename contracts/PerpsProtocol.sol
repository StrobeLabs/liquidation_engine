// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PerpsAccounts.sol";
import "./PerpsPairs.sol";

contract PerpsProtocol {
    Order[] public orders;
    PerpsAccounts public perpsAccounts;
    PerpsPairs public perpsPairs;
    mapping(bytes32 => Pair) public pairs; // Pair identifier (hash of tokens) to Pair
    mapping(address => PerpsAccount) public accounts;

    enum OrderType { LONG, SHORT }

    struct Order {
        address user;
        uint256 pairIndex; // Refers to the index/id in PerpsPairs
        OrderType orderType;
        uint256 amount;
    }

    struct Pair {
        address token1;
        address token2;
    }
    
    struct PerpsAccount {
        address payable account;
        uint256 balance;
    }

    function create_pair(address token1, address token2) external returns (bytes32) {
        bytes32 pairId = keccak256(abi.encodePacked(token1, token2));
        require(pairs[pairId].token1 == address(0) && pairs[pairId].token2 == address(0), "Pair already exists");
        pairs[pairId] = Pair(token1, token2);
        return pairId;
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

    function liquidate(address user, bytes memory proof) external {
        // Placeholder for the proof verification logic
        require(verifyProof(proof), "Invalid proof");

        uint256 liquidationAmount = accounts[user].balance;
        require(liquidationAmount > 0, "Nothing to liquidate");
        
        // liquidate user's account
        accounts[user].balance = 0;

        // reward 1% to liquidator
        uint256 reward = liquidationAmount / 100;  

        // send reward
        payable(msg.sender).transfer(reward);
    }

    function verifyProof(bytes memory proof) internal pure returns(bool) {
        // TODO: Add the actual proof verification logic here
        proof = proof;
        return true;  // Placeholder
    }

    function getAccountBalance(address user) external view returns(uint256) {
        return accounts[user].balance;
    }

    function createOrder(uint256 pairIndex, OrderType orderType, uint256 amount) external {
        require(perpsAccounts.getAccountBalance(msg.sender) >= amount, "Insufficient funds in PerpsAccount");

        orders.push(Order({
            user: msg.sender,
            pairIndex: pairIndex,
            orderType: orderType,
            amount: amount
        }));
    }

    function getOrder(uint256 index) external view returns(address, uint256, OrderType, uint256) {
        require(index < orders.length, "Invalid order index");
        Order memory order = orders[index];
        return (order.user, order.pairIndex, order.orderType, order.amount);
    }

    function totalOrders() external view returns(uint256) {
        return orders.length;
    }
}
