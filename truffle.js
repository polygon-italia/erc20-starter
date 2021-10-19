const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

module.exports = {
    contracts_directory: "./contracts/",
    networks: {
        ganache: {
            host: "localhost",
            port: 7545,
            gas: 5000000,
            gasPrice: 15000000000,
            network_id: "*", // Match any network id
        },
        mumbai: {
            provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER),
            network_id: 80001,
            confirmations: 2,
            gasPrice: "5000000000",
            timeoutBlocks: 200,
            skipDryRun: true
        },
        polygon: {
            provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER),
            network_id: 137,
            confirmations: 2,
            timeoutBlocks: 200,
            gasPrice: "6000000000",
            skipDryRun: true
        },
        rinkeby: {
          provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER),
          network_id: 4,
          confirmations: 2,
          gasPrice: process.env.GAS_PRICE,
          timeoutBlocks: 200,
          skipDryRun: true
        },
        ethereum: {
          provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.PROVIDER),
          network_id: 1,
          confirmations: 2,
          timeoutBlocks: 200,
          gas: 3000000,
          gasPrice: process.env.GAS_PRICE,
          skipDryRun: true
        }
    },
    mocha: {
        reporter: "eth-gas-reporter",
        reporterOptions: {
            currency: "USD",
            gasPrice: 2,
        },
    },
    compilers: {
        solc: {
            version: "^0.8.4"
        },
    },
};