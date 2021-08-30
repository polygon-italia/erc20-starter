const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
require('dotenv').config()
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const contract_name = argv._[0]
const ABI = require('../abi.json')

async function main() {
    try {
        const configs = JSON.parse(fs.readFileSync('./configs/' + argv._ + '.json').toString())
        const provider = new HDWalletProvider(
            configs.owner_mnemonic,
            "http://localhost:7545"
        );
        const web3Instance = new web3(provider);

        const contract = new web3Instance.eth.Contract(
            ABI,
            configs.contract_address, { gasLimit: "5000000" }
        );

        try {
            console.log('Burn tokens...')
            const burn = await contract.methods.burn(50000).send({ from: configs.owner_address })
            console.log(burn)
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