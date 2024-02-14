<p align="left" >
  <img width="240"  src="src/assets/icAcademy.png">
</p>

# Angular StarterKit for the Internet Computer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

This starterKit is intended to make it easier for you to get started with development on the Internet Computer with Angular. It is based on the [Angular](https://angular.io/) framework and the [Internet Computer SDK](https://sdk.dfinity.org/).

It includes a greet service which is triggered by a button click or on page load. The backend service is implemented in Motoko. It uses the default ready-to-use actor and is therefore comparable to all other starter kits on the market.

This starterKit uses the usual approach of a **custom Webpack** configuration. This repository has currently two branches. 

1. The angular-ic-custom-webpack branch uses a custom-webpack configuration. This branch is also the default one.
2. The main branch uses a different approch. It uses the environment.ts file to set the environment variables. Although this is not the best approach as the variables from “process.env” need to be replaced with those from the environment files.

Only a few npm packages were added to the standard npm packages of Angular. These would be: 

- @dfinity/agent@1.0.0
- @dfinity/candid@1.0.0
- @dfinity/principal@1.0.0
- @types/globalthis@1.0.4
- globalthis@1.0.3
- @types/node@20.11.16
- dotenv@16.4.1
- @angular-builders/custom-webpack@17.0.0

## First Setup
```bash
# terminal 1
dfx start --clean

# terminal 2
mkdir myapp && cd myapp
npx degit https://github.com/samlinux-development/ic-angular.git#angular-ic-custom-webpack
npm install
```


## Start Development Server

```bash
# in terminal 2
# for the first time to create .env file
dfx deploy

# start local development server
ng serve

```
## Deployment to local Replica

```bash
dfx deploy
echo http://$(dfx canister id frontend).localhost:4943
```

## Deployment to Motoko Playground

```bash
dfx deploy --playground
```

## Deployment to Internet Computer Mainnet
Is not tested by now. But it should work. 

