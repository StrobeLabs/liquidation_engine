export const CONTRACT_ADDRESS = '0xa1C14A9C1c34f1529651a79915ed55219A41b2a6' as const;

export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "accounts",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x5e5c06e2"
  },
  {
    "inputs": [],
    "name": "createAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x9dca362f"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pairIndex",
        "type": "uint256"
      },
      {
        "internalType": "enum PerpsProtocol.OrderType",
        "name": "orderType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "createOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x24d51935"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token2",
        "type": "address"
      }
    ],
    "name": "create_pair",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf930eb4f"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true,
    "signature": "0xd0e30db0"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getAccountBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x93423e9c"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getOrder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "enum PerpsProtocol.OrderType",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xd09ef241"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "proof",
        "type": "bytes"
      }
    ],
    "name": "liquidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0eccd2c9"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "pairIndex",
        "type": "uint256"
      },
      {
        "internalType": "enum PerpsProtocol.OrderType",
        "name": "orderType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0xa85c38ef"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",

"type": "bytes32"
      }
    ],
    "name": "pairs",
    "outputs": [
      {
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token2",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x673e0481"
  },
  {
    "inputs": [],
    "name": "totalOrders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true,
    "signature": "0x1d834409"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2e1a7d4d"
  }
] as const;