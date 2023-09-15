# liquidation_engine

### A Liquidation Engine Powered by Proving Middleware

Perpetuals are a type of financial instrument that has been popular for trading crypto assets. They let you track the price of an asset without neccesarily needing to own the asset.

Currently there are two approaches to designing markets for perpetuals -- fully on chain with limited complexity and limited trust assumptions and mostly off chain with more complexity and more trust assumptions. With zero knowledge technology, we may actually be able to get the best of both worlds. 

In this project, we use state proofs and zkml to design a fully permissionless perpetuals market with a liquidation engine powered by proving middleware. Users can deposit collateral and submit orders on chain. Actors can only liquidate users if they prove they ran the risk engine on a set of inputs that represent historical on chain state. 
