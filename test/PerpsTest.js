const PerpsPairs = artifacts.require("PerpsPairs");
const PerpsAccounts = artifacts.require("PerpsAccounts");
const PerpsProtocol = artifacts.require("PerpsProtocol");

contract("PerpsTest", (accounts) => {

    let perpsPairs;
    let perpsAccounts;
    let perpsProtocol;

    beforeEach(async () => {
        perpsPairs = await PerpsPairs.new();
        perpsAccounts = await PerpsAccounts.new(accounts[0]); // Assuming accounts[0] is the protocol pool
        perpsProtocol = await PerpsProtocol.new(perpsAccounts.address, perpsPairs.address);
    });

    it("should create a new trading pair", async () => {
        await perpsPairs.create_pair(accounts[1], accounts[2]);
    });

    it("should create a new perps account", async () => {
        await perpsAccounts.createAccount({ from: accounts[1] });
        const acc = await perpsAccounts.accounts(accounts[1]);
        assert.equal(acc.account, accounts[1]);
    });

    it("should allow deposits and withdrawals", async () => {
        await perpsAccounts.createAccount({ from: accounts[1] });
        await perpsAccounts.deposit({ from: accounts[1], value: web3.utils.toWei("1", "ether") });
        const balance = await perpsAccounts.getAccountBalance(accounts[1]);
        assert.equal(balance.toString(), web3.utils.toWei("1", "ether"));

        await perpsAccounts.withdraw(web3.utils.toWei("0.5", "ether"), { from: accounts[1] });
        const postWithdrawBalance = await perpsAccounts.getAccountBalance(accounts[1]);
        assert.equal(postWithdrawBalance.toString(), web3.utils.toWei("0.5", "ether"));
    });

    it("should allow creating orders", async () => {
        await perpsAccounts.createAccount({ from: accounts[1] });
        await perpsAccounts.deposit({ from: accounts[1], value: web3.utils.toWei("1", "ether") });

        await perpsPairs.create_pair(accounts[1], accounts[2]);
        await perpsProtocol.createOrder(0, 0, web3.utils.toWei("0.5", "ether"), { from: accounts[1] }); // Long order

        const order = await perpsProtocol.getOrder(0);
        assert.equal(order[0], accounts[1]);
        assert.equal(order[3].toString(), web3.utils.toWei("0.5", "ether"));
    });

    it("should allow liquidation", async () => {
        await perpsAccounts.createAccount({ from: accounts[1] });
        await perpsAccounts.deposit({ from: accounts[1], value: web3.utils.toWei("1", "ether") });

        // Assuming verifyProof always returns true for now
        await perpsAccounts.liquidateAccount(accounts[1], "0x00", { from: accounts[2] });

        const balanceAfterLiquidation = await perpsAccounts.getAccountBalance(accounts[1]);
        assert.equal(balanceAfterLiquidation.toString(), "0");
    });

});

