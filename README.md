![Deifedge Logo](https://app.defiedge.io/favicon.png)
# @defiedge/sdk
![MIT License](https://badgen.net/badge/license/MIT/blue) ![minified gzipped size](https://badgen.net/bundlephobia/minzip/@defiedge/sdk@0.0.1-a/)

This sdk contains collection of functions to interact with defiedge's smart contract.

## Table of Contents

* [__Installation__](#Installation)
* [__Usage__](#Usage)
     * [__Strategy Functions__](#Strategy)
        * [`isStrategyTokenApproved`](#1-isStrategyTokenApproved)
        * [`approveStrategyToken`](#2-approveStrategyToken)
        * [`getLiquidityRatio`](#3-getLiquidityRatio)
        * [`depositLP`](#4-depositLP)
        * [`getUserDeshareBalance`](#5-getUserDeshareBalance)
        * [`removeLP`](#6-removeLP)
    * [__Metadata Information__](#MetaInfo)
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

<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { isToken0Approved } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"
const amount = 100

const isToken0Approved: boolean = await isStrategyTokenApproved(
    accountAddress,
    0, // token idx can be 0 or 1
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
| amount   | string \| number | undefined | false | 
| overrides         | [Overrides](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/contracts/lib/index.d.ts#L7)  | undefined | false

<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { approveStrategyToken } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"
const amount = 100

const txnDetails = await approveStrategyToken(
    accountAddress, 
    0, // token idx can be 0 or 1
    strategyAddress, 
    provider,
    amount // (optional)
);

await txnDetails.wait(); 

// can now deposit token0 
// ...
```

#### 3. `getLiquidityRatio()`

| param | type |  default | required
| -------- | -------- | -------- | --------
| strategyAddress   | string | - | true |
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true

<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { getLiquidityRatio } from '@defiedge/sdk';

const provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"

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

<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { depositLP } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"

const amount0 = 100
const amount1 = amount0 * ratio // getLiquidityRatio()
 
const txnDetails = await depositLP(
    accountAddress,
    amount0, // can be 0 when only depositing amount1
    amount1, // can be 0 when only depositing amount0
    strategyAddress, 
    web3Provider
)
```

#### 5. `getUserDeshareBalance()`

| param | type |  default | required
| -------- | -------- | -------- | --------
| accountAddress   | string | - | true |
| strategyAddress   | string | - | true |
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true
| raw   | true | undefined | false | 

<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { getLiquidityRatio } from '@defiedge/sdk';

const provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"

const deShare: string = await getUserDeshareBalance(
    strategyAddress, 
    accountAddress,
    web3Provider
)

// - or - 

const deShareBN: BigNumber = await getUserDeshareBalance(
    strategyAddress, 
    accountAddress,
    web3Provider,
    true
)
```

#### 6. `removeLP()`
| param | type |  default | required
| -------- | -------- | -------- | --------
| userAddress   | string | - | true
| shares           | string \| number | - | true
| strategyAddress   | string | - | true 
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true
| overrides         | [Overrides](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/contracts/lib/index.d.ts#L7)  | undefined | false
<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { removeLP } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"

const totalUserShare: string = getUserDeshareBalance(
    accountAddress,
    strategyAddress, 
    web3Provider
)

let shares = Number(totalUserShare) * 0.5 // 50% of user deshare

const txnDetails = await removeLP(
    accountAddress,
    shares, // de shares
    strategyAddress, 
    web3Provider
)
```

<div id="MetaInfo"></div>
#### 5. `removeLP()`
| param | type |  default | required
| -------- | -------- | -------- | --------
| userAddress   | string | - | true
| shares           | string \| number | - | true
| strategyAddress   | string | - | true 
| jsonProvider      | [JsonRpcProvider](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-provider.ts#L393) | - | true
| overrides         | [Overrides](https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/contracts/lib/index.d.ts#L7)  | undefined | false
<br/>

```typescript
import { Web3Provider } from '@ethersproject/providers';
import { removeLP } from '@defiedge/sdk';

const web3Provider = new Web3Provider(YOUR_WEB3_PROVIDER);
const strategyAddress = "0xc3ad...72bf9eb"
const accountAddress = "0xaaaa...aaaaaa"

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

<br/>

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