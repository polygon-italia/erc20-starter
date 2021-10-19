const UMi20 = artifacts.require("./UMi20.sol");
const fs = require('fs')

module.exports = async (deployer) => {
    const name = process.env.NAME;
    const ticker = process.env.TICKER;
    const decimals = process.env.DECIMALS;
    const realOwnerAddress = process.env.OWNER;
    await deployer.deploy(UMi20, name, ticker, decimals, { gas: 5000000 });
    const contract = await UMi20.deployed();
    console.log('Saving address in config file..')
    let configs = JSON.parse(fs.readFileSync(process.env.CONFIG).toString())
    configs.contract_address = contract.address
    fs.writeFileSync(process.env.CONFIG, JSON.stringify(configs, null, 4))
    console.log('--')
};