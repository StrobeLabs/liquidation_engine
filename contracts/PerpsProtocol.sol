// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PerpsAccounts.sol";
import "./PerpsPairs.sol";

contract PerpsProtocol {
    enum OrderType { LONG, SHORT }
    struct Order {
        address user;
        uint256 pairIndex; // Refers to the index/id in PerpsPairs
        OrderType orderType;
        uint256 amount;
    }

    Order[] public orders;

    PerpsAccounts public perpsAccounts;
    PerpsPairs public perpsPairs;

    constructor(address _perpsAccounts, address _perpsPairs) {
        perpsAccounts = PerpsAccounts(_perpsAccounts);
        perpsPairs = PerpsPairs(_perpsPairs);
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

    function liquidate(address user, bytes memory proof) external {
        // Transfer funds from the user's account to the protocol's pool
        // require(accountContract.transferFunds(pool, balance), "Transfer failed");
        perpsAccounts.liquidateAccount(user, proof);
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
