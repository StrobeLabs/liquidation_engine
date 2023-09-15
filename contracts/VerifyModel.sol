// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.4;
import {Verifier} from "./VerifyModel.sol";

contract PerpsProtocol {
    Order[] public orders;
    mapping(bytes32 => Pair) public pairs; // Pair identifier (hash of tokens) to Pair
    bytes32[] public pairIds;
    mapping(address => PerpsAccount) public accounts;

    uint256 public maintenanceMarginRatio = 75; // Stored as a percentage with two decimal places (0.075 = 7.5%)

    struct PerpsAccount {
        address payable account;
        uint256 balance;
        uint256 openPositionValue; 
    }

    struct Pair {
        address token1;
        address token2;
    }

    struct Order {
        uint256 orderId;
        address user;
        uint256 pairIndex; // Refers to the index/id in PerpsPairs
        bool orderType; // f = short, t = long
        uint256 amount;
        bool status; // f = closed, t = open
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance / 1000000000000000000;
    }

    function createAccount() external {
        require(accounts[msg.sender].account == address(0), "Account already exists");
        accounts[msg.sender].account = payable(msg.sender);
    }

    function create_pair(address token1, address token2) public {
        // sepolia token addresses:
        // wETH: 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9
        // USDC: 0xf7B6d04C21dB982A47086953e677B26420D7d027
        // wBTC: 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
        // pairIDs: 
        // wETH/USDC: 0x870ee1d2b32c6e2df49712b7c734fd9b1941d6e7333e5a4f34a3dbf95e24183d
        // wBTC/USDC: 0x26f8166c57b23ec4ecd5527f3a5da9c922e339528a7067babbcb0caf53a02f0e
        bytes32 pairId = keccak256(abi.encodePacked(token1, token2));
        require(pairs[pairId].token1 == address(0) && pairs[pairId].token2 == address(0), "Pair already exists");
        
        // store the pair
        pairs[pairId] = Pair(token1, token2);
        
        // store the pairId
        pairIds.push(pairId);
    }

    function createOrder(uint256 pairIndex, bool orderType, uint256 amount) external {
        require(getAccountBalance(msg.sender) - accounts[msg.sender].openPositionValue >= amount, "Insufficient funds in PerpsAccount");
        // assume no trading fee, all orders are 10x leverage
        orders.push(Order({
            orderId: orders.length,
            user: msg.sender,
            pairIndex: pairIndex,
            orderType: orderType,
            amount: amount,
            status: true
        }));
        accounts[msg.sender].openPositionValue += amount;
    }

    function closePosition(uint256 orderId) external {
        require(orders[orderId].user == msg.sender, "Only the owner of the order can close it");
        // Assume the value of the position is equal to the order amount for simplicity
        accounts[msg.sender].openPositionValue -= orders[orderId].amount;  // Reduce the open position value
        orders[orderId].status = false;
    }

    // 1 eth: 1000000000000000000
    function deposit() external payable {
        require(msg.value > 0, "Must send ether");
        accounts[msg.sender].balance += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(accounts[msg.sender].balance - accounts[msg.sender].openPositionValue >= amount, "Insufficient funds");
        // require that account has no open positions
        accounts[msg.sender].balance -= amount;
        accounts[msg.sender].account.transfer(amount);
    }

    function liquidate(address user, bytes memory proof, uint256 orderId, uint256[] memory inputs) external {
        uint256 size = inputs[0];
        uint256 price = inputs[1];
        bool order_type = false;
        uint256 margin_req = inputs[3];
        uint256 risk_score = inputs[4]; // risk score from 0-100
        if (inputs[2] > 0) order_type = true;
        uint256[1] memory inputs2 = [inputs[0]];

        require(orders[orderId].status == true, "Order is already closed");
        require(orders[orderId].user == user, "Order user doesn't match"); // check that order user matches
        require(orders[orderId].amount == size, "Order size doesn't match"); // check that order size matches

        // check that order price matches the token pair
        // tokenPair = pairs[orders[orderId].pairIndex];
        // axiomprice = axiomprice(tokenPair.token1, tokenPair.token2)
        // require(price == axiomprice);
        price=price;

        // check that order type matches
        require(orders[orderId].orderType == order_type, "Order type doesn't match");

        // check that margin requirement matches
        require(maintenanceMarginRatio == margin_req, "Maintenance Margin Ratio doesn't match");

        // check that risk score is above 50
        require(risk_score > 50, "Risk score isn't high enough");

        // verify proof of EZKL model given s, p, m
        Verifier v = new Verifier();
        v.verify(inputs2, proof);

        uint256 liquidationAmount = accounts[user].balance;
        require(liquidationAmount > 0, "Nothing to liquidate");
        
        // liquidate user's account
        accounts[user].balance = 0;
        accounts[user].openPositionValue = 0;

        // reward 1% to liquidator
        uint256 reward = liquidationAmount / 100;  

        // send reward
        payable(msg.sender).transfer(reward);
    }

    function getAccountBalance(address user) public view returns(uint256) {
        return accounts[user].balance;
    }

    function setMaintenanceMarginRatio(uint256 newRatio) external {
        // Add access control
        maintenanceMarginRatio = newRatio;
    }
}