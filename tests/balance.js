const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
require('dotenv').config()
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const ABI = require('../abi.json')
const BigNumber = require('big-number');

async function main() {
    try {
        const configs = JSON.parse(fs.readFileSync('./configs/' + argv._ + '.json').toString())
        const provider = new HDWalletProvider(
            configs.owner_mnemonic,
            configs.provider
        );
        const web3Instance = new web3(provider);

        const contract = new web3Instance.eth.Contract(
            ABI,
            configs.contract_address, { gasLimit: "5000000" }
        );
        try {
            const balance = await contract.methods.balanceOf("0x7eDecB2FedD2378f18e42B302E22FA40FE0ddCD6").call()
            const division = BigNumber(10).pow(configs.contract.decimals)
            const normalized = BigNumber(balance).divide(division.toString())
            console.log('Balance is:', normalized.toString())
            process.exit();
        } catch (e) {
            console.log(e.message)
            process.exit();
        }
    } catch (e) {
        console.log(e.message)
        process.exit();
    }
}

if (argv._ !== undefined) {
    main();
} else {
    console.log('Provide a deployed contract first.')
}