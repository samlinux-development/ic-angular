<p align="left" >
  <img width="240"  src="src/assets/icAcademy.png">
</p>

# Angular StarterKit for the Internet Computer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

This starterKit is intended to make it easier for you to get started with development on the Internet Computer with Angular. It is based on the [Angular](https://angular.io/) framework and the [Internet Computer SDK](https://sdk.dfinity.org/).

It includes a greet service which is triggered by a button click or on page load. The backend service is implemented in Motoko. It uses the default ready-to-use actor and is therefore comparable to all other starter kits on the market.

This starter kit does not use the usual approach of a **custom Webpack** configuration. The approach is to add the environment variables into the Angular environment files according to the deployment situation. The following deployment situations are currently covered:

- local (a local replica)
- playground (Motoko Playground)
- ic (the Internet Computer mainnet)

Only a few npm packages were added to the standard npm packages of Angular. These would be: 

- @dfinity/agent@0.20.2
- @dfinity/candid@0.20.2
- @dfinity/principal@0.20.2
- @types/globalthis@1.0.4
- globalthis@1.0.3
- @types/node@20.11.16
- dotenv@16.4.1
- ejs@3.1.9


## First Setup
```bash
# terminal 1
dfx start --clean --background

#terminal 2
mkdir myapp && cd myapp
npx degit https://github.com/samlinux-development/ic-angular
npm install

```


## Start Development Server

```bash
# in terminal 2
# for the first time
dfx deploy backend

# If you changes something in the backend canister reinstall it with dfx deploy backend any time.

# Every time you want to start the frontend or change the deployment environment, 
# because of the environment variables.
# Do not use ng serve in that context, because of the deploy.js script 
# which has to be executed to let Angular know about the environment variables.
npm run start --network=local

echo http://$(dfx canister id frontend).localhost:4943
```
## Deployment to Local Replica

```bash
npm run deploy --network=local
```

## Deployment to Motoko Playground

```bash
npm run deploy --network=playground
```

## Deployment to Internet Computer Mainnet
Is not tested by now. But it should work. 

