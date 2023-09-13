// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PerpsPairs {
    
    struct Pair {
        address token1;
        address token2;
    }
    
    mapping(bytes32 => Pair) public pairs; // Pair identifier (hash of tokens) to Pair

    function create_pair(address token1, address token2) external returns (bytes32) {
        bytes32 pairId = keccak256(abi.encodePacked(token1, token2));
        require(pairs[pairId].token1 == address(0) && pairs[pairId].token2 == address(0), "Pair already exists");
        pairs[pairId] = Pair(token1, token2);
        return pairId;
    }
}
