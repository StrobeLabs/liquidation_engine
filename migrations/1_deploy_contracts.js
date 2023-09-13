const Vault = artifacts.require("Vault");
const PerpetualsMarket = artifacts.require("PerpetualsMarket");
const TradingPair = artifacts.require("TradingPair");

module.exports = function (deployer) {
  deployer.deploy(Vault)
    .then(() => deployer.deploy(PerpetualsMarket, Vault.address))
    .then(() => deployer.deploy(TradingPair, Vault.address, PerpetualsMarket.address));
};

