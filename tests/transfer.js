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
            configs.provider
        );
        const web3Instance = new web3(provider);

        const contract = new web3Instance.eth.Contract(
            ABI,
            configs.contract_address, { gasLimit: "5000000" }
        );

        try {
            console.log('Minting new tokens...')
            const transfer = await contract.methods.transfer("0x0977979BFe5ccBC7feCA2bE15b9E303c96Bb1B6d", 1000).send({ from: configs.owner_address })
            console.log(transfer)
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