![Deifedge Logo](https://app.defiedge.io/favicon.png)
# @defiedge/sdk
![MIT License](https://badgen.net/badge/license/MIT/blue) ![minified gzipped size](https://badgen.net/bundlephobia/minzip/@defiedge/sdk@0.0.1-a/)

This sdk contains collection of functions to interact with defiedge's smart contract.

## Table of Contents

* [___Installation___](#Installation)
* [___Usage___](#Usage)
     * [___Strategy Functions___](#Strategy)
        * [___isStrategyTokenApproved___](#1-isStrategyTokenApproved)
        * [___approveStrategyToken___](#2-approveStrategyToken)
        * [___depositLP___](#3-depositLP)
        * [___removeLP___](#4-removeLP)
        * [___getLiquidityRatio___](#5-getLiquidityRatio)
    * [___Metadata Information___](#MetaInfo)
        * [___getStrategyMetaData___](#1-getStrategyMetaData)



## Installation
Install with
```bash
yarn add @defiedge/sdk
```
or
```bash
npm install @defiedge/sdk
```

## Usage
### Strategy

#### 1. `isStrategyTokenApproved()`

| param | type |  default | required
| -------- | -------- | -------- | --------
| userAddress   | string | - | true
| tokenIdx           | 0 \| 1 | - | true
| amount   | string \| number, | - | true |
| strategyAddress   | string | - | true |
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { isToken0Approved } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xab..ac"
const accountAddress = "0xab..12"
const amount = 100

const isToken0Approved: boolean = await isStrategyTokenApproved(
    accountAddress,
    0, // 0 | 1
    amount,
    strategyAddress, 
    web3Provider
)
```

#### 2. `approveStrategyToken()`

| param | type |  default | required
| -------- | -------- | -------- | --------
| userAddress   | string | - | true
| tokenIdx           | 0 \| 1 | - | true
| strategyAddress   | string | - | true |
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true
| amount   | string \| number | undefined | true | 
| overrides         | [Overrides](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/contracts/lib/index.d.ts#L7)  | undefined | false

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { approveStrategyToken } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xab..ac"
const accountAddress = "0xab..12"
const amount = 100

const transaction = await approveStrategyToken(
    accountAddress, 
    0, // 0 | 1
    strategyAddress, 
    provider,
    amount // (optional)
);

await transaction.wait(); 
```

#### 3. `getLiquidityRatio()`

| param | type |  default | required
| -------- | -------- | -------- | --------
| strategyAddress   | string | - | true |
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true


```typescript
import { Web3Provider } from '@ethersproject/providers';
import { getLiquidityRatio } from '@defiedge/sdk';

const provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xab..ac"
const accountAddress = "0xab..12"

const ratio = await getLiquidityRatio(
    strategyAddress, 
    web3Provider
)

const amount0 = 100
const amount1 = amount0 * ratio

// - or - 

const amount1 = 100
const amount0 = amount1 * 1 / ratio 
```

#### 4. `depositLP()`

| param | type |  default | required
| -------- | -------- | -------- | --------
| userAddress   | string | - | true
| amount0           | string \| number | - | true
| amount1           | string \| number | - | true
| strategyAddress   | string | - | true 
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true
| overrides         | [Overrides](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/contracts/lib/index.d.ts#L7)  | undefined | false

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { depositLP } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xab..ac"
const accountAddress = "0xab..12"

const amount0 = 100
const amount1 = amount0 * ratio // getLiquidityRatio()
 
let txnDetails = await depositLP(
    accountAddress,
    amount0, // can be 0 when only depositing amount1
    amount1, // can be 0 when only depositing amount0
    strategyAddress, 
    web3Provider
)
```

#### 5. `removeLP()`
| param | type |  default | required
| -------- | -------- | -------- | --------
| userAddress   | string | - | true
| shares           | string \| number | - | true
| strategyAddress   | string | - | true 
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true
| overrides         | [Overrides](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/contracts/lib/index.d.ts#L7)  | undefined | false


```typescript
import { Web3Provider } from '@ethersproject/providers';
import { removeLP } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xab..ac"
const accountAddress = "0xab..12"

const totalUserShare = await erc20Contract(strategyAddress).balanceOf(accountAddress) // DE Shares 

let shares = 0.0001 // DE Shares or percentage of totalUserShare

await removeLP(
    accountAddress,
    shares, // de shares
    strategyAddress, 
    web3Provider
)
```

<div id="MetaInfo"></div>

### Metadata Information

#### 1. `getStrategyMetaData()`
| param | type |  default | required
| -------- | -------- | -------- | --------
| chainId              | SupportedChainId | - | true |
| strategyAddress      | string | - | true


```typescript
import { getStrategyMetaData } from '@defiedge/sdk';

const strategyAddress = '0xc3ad...72bf9eb'

const strategy: Strategy = await getStrategyMetaData(
    SupportedChainId.bsc, 
    strategyAddress
)
```

For api detail and other functions please refer to this [postman documentation](https://documenter.getpostman.com/view/16281910/2s93XvWk5h).

## Types

### SupportedChainId
```typescript
enum SupportedChainId {
  arbitrum = 42161,
  mainnet = 1,
  optimism = 10,
  polygon = 137,
  bsc = 56,
}
```

### Strategy (metadata)
```typescript
type Currency = 'USD' | 'BTC' | 'MATIC' | 'ETH';

interface Strategy {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  updatedAt: string;
  network: string;
  sharePrice: number;
  address: string;
  aum: number;
  createdAt: string;
  feesApr: Record<Currency, number>;
  sevenDayApy: Record<Currency, number>;
  sinceInception: Record<Currency, number>;
  oneDayApy: Record<Currency, number>;
}
```


This version of `@defiedge/sdk` is still in beta, so unfortunately documentation is pretty sparse at the moment. Comments and the source code itself are the best ways to get an idea of what's going on. More thorough documentation is a priority as development continues!