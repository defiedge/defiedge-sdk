import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import { getERC20Contract, getSingleSidedStrategyContract, getStrategyContract } from '../contracts';
import parseBigInt from '../utils/parseBigInt';
import { getSSDStrategies, getStrategyInfo } from './strategy';
import { SupportedChainId } from '../types';
import calculateGasMargin from '../types/calculateGasMargin';
import formatBigInt from '../utils/formatBigInt';
import { getConfig } from '../utils/config/functions';
import { DataFeed } from '../types/strategyQueryData';

export async function isStrategySingleSidedDeposit(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<boolean> {
  const ssdStrategies = await getSSDStrategies();

  return ssdStrategies[chainId].includes(strategyAddress.toLocaleLowerCase());
}

export async function isToken1DefaultTokenForStrategy(strategyAddress: string, jsonProvider: JsonRpcProvider) {
  const { chainId } = jsonProvider.network;
  const strategy = await getStrategyInfo(chainId, strategyAddress);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const singleSidedWrapper = getConfig(
    chainId,
    'others',
    'singleSidedWrapper',
    strategy.type === DataFeed.Twap,
    strategy.dex,
  );

  if (!singleSidedWrapper) throw new Error(`Single sided wrapper not found [${chainId}, ${strategyAddress}]`);

  const singleSidedWrapperContract = getSingleSidedStrategyContract(singleSidedWrapper, jsonProvider);

  return singleSidedWrapperContract.isToken1DefaultTokenForStrategy(strategy.id);
}

/**
 * Checks if the strategy token is approved.
 *
 * @param {string} accountAddress - The address of the account.
 * @param {0 | 1} tokenIdx - The index of the token.
 * @param {string | number} amount - The amount of the token.
 * @param {string} strategyAddress - The address of the strategy.
 * @param {JsonRpcProvider} jsonProvider - The JSON provider.
 * @return {Promise<boolean>} A Promise that resolves to a boolean value indicating if the token is approved.
 */
export async function isStrategyTokenApproved(
  accountAddress: string,
  tokenIdx: 0 | 1,
  amount: string | number,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
): Promise<boolean> {
  const { chainId } = jsonProvider.network;
  if (!Object.values(SupportedChainId).includes(chainId)) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  const signer = jsonProvider.getSigner(accountAddress);

  const [isSingleSided, isToken1DefaultToken, strategy] = await Promise.all([
    isStrategySingleSidedDeposit(chainId, strategyAddress),
    isToken1DefaultTokenForStrategy(strategyAddress, jsonProvider),
    getStrategyInfo(chainId, strategyAddress),
  ]);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  let token;
  let depositAddress;

  if (isSingleSided) {
    const singleSidedWrapper = getConfig(
      chainId,
      'others',
      'singleSidedWrapper',
      strategy.type === DataFeed.Twap,
      strategy.dex,
    );

    token = strategy[isToken1DefaultToken ? 'token1' : 'token0'];
    depositAddress = singleSidedWrapper ?? strategyAddress;
  } else {
    token = strategy[tokenIdx === 0 ? 'token0' : 'token1'];
    depositAddress = strategyAddress;
  }

  const tokenContract = getERC20Contract(token.id, signer);
  const currentAllowanceBN = await tokenContract.allowance(accountAddress, depositAddress);

  const currentAllowance = +formatBigInt(currentAllowanceBN, +token.decimals);

  return currentAllowance !== 0 && currentAllowance >= +(amount ?? 0);
}

/**
 * Approve a strategy token.
 *
 * @param {string} accountAddress - The account address.
 * @param {0 | 1} tokenIdx - The token index.
 * @param {string} strategyAddress - The strategy address.
 * @param {JsonRpcProvider} jsonProvider - The JSON RPC provider.
 * @param {string | number | BigNumber} [amount] - The amount.
 * @param {Overrides} [overrides] - The overrides.
 * @return {Promise<ContractTransaction>} The contract transaction promise.
 */
export async function approveStrategyToken(
  accountAddress: string,
  tokenIdx: 0 | 1,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  amount?: string | number | BigNumber,
  overrides?: Overrides,
): Promise<ContractTransaction> {
  const { chainId } = jsonProvider.network;

  if (!Object.values(SupportedChainId).includes(chainId)) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  const [isSingleSided, isToken1DefaultToken, strategy] = await Promise.all([
    isStrategySingleSidedDeposit(chainId, strategyAddress),
    isToken1DefaultTokenForStrategy(strategyAddress, jsonProvider),
    getStrategyInfo(chainId, strategyAddress),
  ]);

  const signer = jsonProvider.getSigner(accountAddress);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  let token;
  let depositAddress;

  if (isSingleSided) {
    const singleSidedWrapper = getConfig(
      chainId,
      'others',
      'singleSidedWrapper',
      strategy.type === DataFeed.Twap,
      strategy.dex,
    );

    token = strategy[isToken1DefaultToken ? 'token1' : 'token0'];
    depositAddress = singleSidedWrapper ?? strategyAddress;
  } else {
    token = strategy[tokenIdx === 0 ? 'token0' : 'token1'];
    depositAddress = strategyAddress;
  }

  const tokenContract = getERC20Contract(token.id, signer);

  // eslint-disable-next-line no-nested-ternary
  const amountBN = amount
    ? amount instanceof BigNumber
      ? amount
      : parseBigInt(amount, +token.decimals || 18)
    : MaxUint256;

  const gasLimit =
    overrides?.gasLimit ?? calculateGasMargin(await tokenContract.estimateGas.approve(depositAddress, amountBN));

  return tokenContract.approve(strategyAddress, amountBN, { gasLimit });
}

/**
 * Deposits liquidity into a strategy contract.
 *
 * @param {string} accountAddress - The address of the user account.
 * @param {string | number | BigNumber} amount0 - The amount of token0 to deposit.
 * @param {string | number | BigNumber} amount1 - The amount of token1 to deposit.
 * @param {string} strategyAddress - The address of the strategy contract.
 * @param {JsonRpcProvider} jsonProvider - The JSON-RPC provider.
 * @param {Overrides} [overrides] - The transaction overrides.
 * @param {string} [_amount0Min='0'] - The minimum amount of token0 to deposit.
 * @param {string} [_amount1Min='0'] - The minimum amount of token1 to deposit.
 * @return {Promise<ContractTransaction>} - A promise that resolves to the contract transaction.
 */
export async function depositLP(
  accountAddress: string,
  amount0: string | number | BigNumber,
  amount1: string | number | BigNumber,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  overrides?: Overrides,
  _amount0Min: string = '0',
  _amount1Min: string = '0',
): Promise<ContractTransaction> {
  const { chainId } = jsonProvider.network;

  if (!Object.values(SupportedChainId).includes(chainId)) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  const isSingleSided = await isStrategySingleSidedDeposit(chainId, strategyAddress);

  const signer = jsonProvider.getSigner(accountAddress);
  const strategy = await getStrategyInfo(chainId, strategyAddress);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const singleSidedWrapper = getConfig(
    chainId,
    'others',
    'singleSidedWrapper',
    strategy.type === DataFeed.Twap,
    strategy.dex,
  );

  if (isSingleSided && singleSidedWrapper) {
    const isToken1DefaultToken = await isToken1DefaultTokenForStrategy(strategyAddress, jsonProvider);
    const strategyContract = getSingleSidedStrategyContract(singleSidedWrapper, signer);
    const amount = isToken1DefaultToken ? amount1 : amount0;

    const params: Parameters<typeof strategyContract.deposit> = [
      strategyAddress,
      amount instanceof BigNumber ? amount : parseBigInt(amount, +strategy.token0.decimals),
      0,
    ];

    const gasLimit = overrides?.gasLimit; // ?? calculateGasMargin(await strategyContract.estimateGas.mint(...params));

    params[3] = { ...overrides, gasLimit };

    return strategyContract.deposit(...params);
  }

  const strategyContract = getStrategyContract(strategyAddress, signer);

  // if (parseInt(strategy.token0.id, 16) > parseInt(strategy.token1.id, 16)) {
  //   // eslint-disable-next-line prefer-destructuring, no-param-reassign
  //   amount1 = [amount0, (amount0 = amount1)][0];
  // }

  const params: Parameters<typeof strategyContract.mint> = [
    amount0 instanceof BigNumber ? amount0 : parseBigInt(amount0, +strategy.token0.decimals),
    amount1 instanceof BigNumber ? amount1 : parseBigInt(amount1, +strategy.token1.decimals),
    parseBigInt(_amount0Min, +strategy.token0.decimals),
    parseBigInt(_amount1Min, +strategy.token1.decimals),
    0,
  ];

  const gasLimit = overrides?.gasLimit; // ?? calculateGasMargin(await strategyContract.estimateGas.mint(...params));

  params[5] = { ...overrides, gasLimit };

  return strategyContract.mint(...params);
}
