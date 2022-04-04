# ERC-20 Starter for Polygon

This is a fully working example of ERC20 for Polygon or any EVM-based blockchain.

The contract is based on OpenZeppelin v4 with minting and pausing enabled.

## Setting up the environment

To start develop your own ERC-20 you will need a couple of tools:
- NodeJS: https://nodejs.org/en/
- Ganache (which is used to create a local blockchain): https://www.trufflesuite.com/ganache
- IPFS: to create the NFTs and uploading it to the distributed file system

So we can install the dependencies:
```
yarn
```

Now you have to create a configuration file, you can find a template here: `configs/ganache.json`.
This file is used to deploy the contract and test it, we suggest to create different configs for different enviorments.

Let's comment what's inside:
- `network`: You can use `ganache`, `mumbai` or `polygon`
- `contract_address`: It's the final contract address, it will be auto-compiled during the deploy
- `owner_address`: The owner of the contract
- `owner_mnemonic`: The mnemonic phrase of the owner
- `contract`: This is an object containing the informations of the contract:
    - `name`: The name of the contract, this will be visible on PolygonScan or other blockchain explorer
    - `ticker`: The ticker of the token, this represents the token in a short form
    - `decimals`: Number of decimals of the token, usually 18 (like main chain)
- `provider`: You node provider, we suggest Alchemy (https://www.alchemy.com)

## Deploy the contract

Now we're ready to deploy our first contract, we'll use the command line like this:
```
yarn deploy ganache
```

If you want to see what's going on the background you can use:

```
yarn deploy:debug ganache
```

Please pay attention, the address will not be recovered automatically in debug mode!

## Test the contract

If everything was ok you will find the updated contract address inside `config/ganache.json` and you will even see the `abi.json` file, which is automatically extracted.
We can now test the contract using different scripts, they're all under `tests` folder:

- `yarn test:details ganache`: This script will check the owner and all the minted tokens
- `yarn test:mint ganache`: This script will mint new tokens
- `yarn test:burn ganache`: This script will burn a specific amount of tokens
- `yarn test:transfer ganache`: This script will transfer a specific amount of tokens

## Migrating from ganache to a network

You can now create a new config file, inserting your real data and deploy the contract to Mumbai or Polygon.
After you've minted new tokens and depolyed on a network you can add the token in your Metamask and start transferring tokens!
