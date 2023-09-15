# Proving-Driven Liquidations

### A Liquidation Engine Powered by Proving Middleware

In this project, we demonstrate a method for succinct proofs as triggers to liquidate undercollateralized trades in permissionless markets. 

### Get Started
First, you'll need the following installed:
- metamask / coinbase wallet / walletconnect compatible wallet
- python
- rust
- torch
- npm
- vite
- ezkl cli (https://docs.ezkl.xyz/getting_started/)

Next, you can interact with the smart contracts deployed on Sepolia Testnet here: 
  https://sepolia.etherscan.io/address/0x04c046d793da4fb808bec147772b8042bc8c5056

The functioning smart contract actions include:
  - createAccount
  - createPair
  - createOrder
  - deposit
  - withdraw
  - liquidate
  - closePosition
  - setMaitenanceMarginRatio
  - totalOrders
  - getAccountBalance
  - getContractBalance

To deploy the contracts yourself, we recommend using Atlas (https://atlaszk.com/)

You can view the trading interface by running:
  vite preview

After connecting your wallet, you should be able to open long and short positions for pairs that have been created. You should also be able to deposit and withdraw. 

You can view the orderbook by navigating to:
  /dashboard

In order to liquidate a position, you'll have to first copy the fields in the corresponding row on the dashboard. Then, you can compute the risk score for that position by running:
  python liquidation_model.py with those fields as inputs

This will generate a .onnx file that you'll need in order to prove the output. Follow EZKL's instructions (https://docs.ezkl.xyz/getting_started/) to perform:
  - create a setup
  - settings generation
  - witness generation
  - proof generation
  - local verification
  - evm verifier

Then, you'll want to copy the public inputs (instances) in a uint256[] and the proof in bytes: 
  navigate to model/flatten
  cargo run

Lastly, to liquidate, you can call the liquidate function (using AtlasZK or the frontend), passing in:
  - the orderer's address
  - orderID
  - proof
  - inputs used for the model



