const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const child_process = require('child_process')

async function deploy() {
    try {
        const configs = JSON.parse(fs.readFileSync('./configs/' + argv._ + '.json').toString())
        if (
            configs.contract.ticker !== undefined &&
            configs.contract.name !== undefined &&
            configs.contract.decimals !== undefined &&
            configs.provider !== undefined &&
            configs.owner_mnemonic !== undefined &&
            configs.owner_address !== undefined
        ) {

            // Read current gas price from gas station:
            let gas_station
            let gas_price = "1"
            if (configs.network === 'mumbai') {
                gas_station = 'https://gasstation-mumbai.matic.today'
            } else if (configs.network === 'polygon') {
                gas_station = 'https://gasstation-mainnet.matic.network'
            }

            console.log('Removing existing build..')
            child_process.execSync('sudo rm -rf build')

            let output
            if (argv.debug !== undefined) {
                output = { stdio: 'inherit' }
            }

            console.log('Deploying contract..')
            let out = child_process.execSync('sudo PROVIDER="' + configs.provider + '" MNEMONIC="' + configs.owner_mnemonic + '" OWNER="' + configs.owner_address + '" TICKER="' + configs.contract.ticker + '" NAME="' + configs.contract.name + '" DECIMALS="' + configs.contract.decimals + '" GAS_PRICE="' + gas_price + '" truffle deploy --network ' + configs.network + ' --reset', output)

            // Extracting address
            out = out.toString()
            let head = out.split('CONTRACT ADDRESS IS*||*')
            let foot = head[1].split('*||*')
            const address = foot[0]

            console.log('Extrating ABI..')
            child_process.execSync('sudo npm run extract-abi')
            console.log('--')

            console.log('Deployed address is: ' + address)
            configs.contract_address = address
            console.log('Saving address in config file..')
            fs.writeFileSync('./configs/' + argv._ + '.json', JSON.stringify(configs, null, 4))
            console.log('--')

            console.log('All done, exiting!')
            process.exit();
        } else {
            console.log('Config file missing.')
        }
    } catch (e) {
        console.log(e.message)
        process.exit()
    }
}

if (argv._ !== undefined) {
    deploy();
} else {
    console.log('Provide a config first.')
}