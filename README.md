# Ethers React

An ethers.js React library to simplify interactions with an Ethereum Blockchain.

# Installation

```
$ npm install @ethers-react/system
$ yarn add @ethers-react/system
```

## Extensions

```.sh
// Reactive Extension
$ npm install @ethers-react/reactive
$ yarn add @ethers-react/reactive

// Provider Select Extension
$ npm install @ethers-react/provider
$ yarn add @ethers-react/provider

// Global State Extension
$ npm install @ethers-react/reactive
$ yarn add @ethers-react/reactive
```

# Introduction

The `ethers-react` module is built to increase developer velocity and improve the Ethereum developer experience.

By encapsulating `ethers.js` functionality into a suite of React hooks, developers can more easily manage everyday blockchain tasks like sending transactions, reading from smart contracts, filtering log events and managing typed data.

#### Common Tasks

Below is a small list of functionality the `ethers-react` module provides.

**Sending & Watching Transactions**

- useSendTransaction
- useContractSendTransaction
- useGetTransaction
- useGetTransactionReceipt
- useTransactionWatch

**Reading & Parsing Data**

- useContractRead
- useGetEncodedData
- useGetEvents
- useGetTransaction
- useGetTransactionReceipt

**Signing Data**

- useWalletSignMessage
- useWalletSignTransaction
- useWalletSignTypedMessage
- useWalletSignTypedMessageV3
- useWalletSignTypedMessageV4

# Extensions

The `ethers-react` module was built with extensibility in mind.

Core functionality is provided by `@ethers-react/system` and additional functionality can be added with extensions.

## Examples

### Web3Modal Extension

Developers can add the `Web3Modal` extension to give users the ability to select their wallet of choice.

```.js
import {EthersProvider} from '@ethers-react/system';
import {extension as Web3ModalExtension} from '@ethers-react/web3modal';
import Web3Modal from 'web3modal';

export const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions:  {}
});

Web3ModalExtension.initialState = {
  web3Modal: web3Modal,
};

export default props => {
  return (
    <EthersProvider extensions={[Web3ModalExtension]}>
      {props.children}
    </EthersProvider>
  );
};
```

### Reactive Extension

Developers can add reactive functinality to automate important state updates.

```.js
import {EthersProvider} from '@ethers-react/system';
import {extension as ReactiveExtension} from '@ethers-react/reactive';

/* --- Reactive --- */
ReactiveExtension.settings.getAccountBalance = true;
ReactiveExtension.settings.getAccountOnLoad = true;
ReactiveExtension.settings.getProviderSigner = true;
ReactiveExtension.settings.getWalletProviderInitialize = false;
ReactiveExtension.settings.watchAccountOnChange = true;
ReactiveExtension.settings.watchBlockCurrent = true;
ReactiveExtension.settings.getWalletBalance = true;
ReactiveExtension.settings.getWalletAddress = true;
ReactiveExtension.settings.getWalletNetwork = true;
ReactiveExtension.settings.getWalletNonce = false;

export default props => {
  return (
    <EthersProvider extensions={[ReactiveExtension]}>
      {props.children}
    </EthersProvider>
  );
};
```

#### ⚠️ Minimal Viable Library Warning ⚠️

How modules are initialize IS NOT perfected.

I'm still experimenting with passing in extensions and figuring out how to best handle unique and repeated reducers. For example the `ADDRESS_UPDATE` switch case is included multiple times both in the `@ethers-react/system` and several of the extensions.

# Setup

The `ethers-react` module is a small family of individual modules that provide specific functionlity.

The `@ethers-react/system` module is the core module that provides the scaffolding for installing other extensions and also a suite of essential hooks to make everyday Ethereum interactions easier.

The `@ethers-react/reactive` module provides "reactive" functionality or simply put certain functionality us "triggered" or reacts to state changes in the application. For example when a user enables a provider, the reactive module will automatically detect that change and call functions like `balance` and `getSigner` making those state variables available to the rest of the application.

The `@ethers-react/web3modal` module adds provider selection features by including Web3Modal functionality to the application state management system. In other words users can select their provider of choice (MetaMask, Fortmatic, Portis, BurnerWallet, etc...) and that provider will be used as the primary provider and wallet.

### Basic Setup

```
import {EthersProvider} from '@ethers-react/system';

export default props => {
  return (
      <EthersProvider>
        {props.children}
      </EthersProvider>
  );
};


```

### Extensions Setup

```.js
import {EthersProvider} from '@ethers-react/system';

// Configuration
import {contracts, extensions} from './settings/blockchain';


export default props => {
  return (
    <EthersProvider contracts={contracts} extensions={extensions}>
      {props.children}
    </EthersProvider>
  );
};
```

# Hooks

## System (`@ethers-react/system`)

- useBalanceChange
- useBlockMined
- useContractDeploy
- useContractRead
- useContractSendTransaction
- useGetEncodedData
- useGetEvents
- useGetTransaction
- useGetTransactionReceipt
- useTransactionWatch
- useWalletBalanceChange
- useWalletEstiamteTransaction
- useWalletSendTransaction
- useWalletSignMessage
- useWalletSignTransaction
- useWalletSignTypedMessage
- useWalletSignTypedMessageV3
- useWalletSignTypedMessageV4

## Reactive (`@ethers-react/reactive`)

## Why

The `ethers-react` module was crafted, because `ethers.js` is Ethereum's most advanced Javascript library. The `ethers.js` module provides a suite of functionality and utilities for developers building decentralized applications.

**Why not Web3.js you ask?**

The `Web3.js` library is fine. The `web3.js` library provides full Web3 functionality, like access to Whisper and Swarm, that `ethers.js` does not. That being said, I never use either those protocols so don't need the additional "bloat" that comes with installing `Web3.js`.

If you're want to use `Web3.js` I recommend checking out `web3-react` built by @NoahZinsmeister.

https://github.com/NoahZinsmeister/web3-react

## Contributors

| Name               | Website                   |
| ------------------ | ------------------------- |
| **Kames Geraghty** | <https://www.kamescg.com> |

## License

[MIT](LICENSE) © [Kames](https://www.kamescg.com)

##

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
