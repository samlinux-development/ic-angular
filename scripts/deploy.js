#!/usr/bin/env node

const fs = require('fs');
const path = require('path')
const ejs = require('ejs');

let network = process.argv[2];
if (!network) {
  console.error('Please provide a network as an argument to this script');
  process.exit(1);
}

//console.log('>> Generating environment variables for', network);
const environmentFilesDirectory = path.join(__dirname, '../src/environments');

const targetEnvironmentTemplateFileName = 'environment.template.ts';
const targetEnvironmentFileName = 'environment.ts';

// make sure, we can deploy to local, ic and playground network
let host = "https://ic0.app";
if(network === 'local') {
  host = 'http://127.0.0.1:4943';
}
else if(network === 'playground') {
  host = 'https://icp0.io';
}

// Default environment values for environment.ts
const defaultEnvValues = {
  BACKEND_CANISTER_ID: '', 
  FRONTEND_CANISTER_ID: '',
  DFX_NETWORK: network,
  DFX_HOST: host
};

// read canister_ids depending on the network
const readCanisterIds = () => {
	const canisterIdsJsonFile =
		network === 'ic'
			? path.join(process.cwd(), 'canister_ids.json')
			: path.join(process.cwd(), '.dfx', network, 'canister_ids.json');
	try {
    
		const config = JSON.parse(fs.readFileSync(canisterIdsJsonFile, 'utf-8'));
   
		return Object.entries(config).reduce((acc, current) => {
			const [canisterName, canisterDetails] = current;
			return {
				...acc,
				[`${canisterName.toUpperCase()}_CANISTER_ID`]:canisterDetails[network]
			};
		}, {});
	} catch (e) {
		throw Error(`Could not get canister ID from ${canisterIdsJsonFile}: ${e}`);
	}
};
const canisterIds = readCanisterIds();

// Load template file
const environmentTemplate = fs.readFileSync(
  path.join(environmentFilesDirectory, targetEnvironmentTemplateFileName),
  {encoding: 'utf-8'}
);

// Generate output data
const output = ejs.render(environmentTemplate, Object.assign({}, defaultEnvValues, canisterIds));

// Write environment file
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), output);

process.exit(0);