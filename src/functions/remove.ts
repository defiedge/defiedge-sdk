/* eslint-disable import/prefer-default-export */

import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { getERC20Contract, getStrategyContract } from '../contracts';
import parseBigInt from '../utils/parseBigInt';
import { getStrategyInfo } from './strategy';
import { SupportedChainId } from '../types';
import calculateGasMargin from '../types/calculateGasMargin';
import formatBigInt from '../utils/formatBigInt';

/**
 * Retrieves the user's Deshare balance.
 *
 * @param {string} accountAddress - The user's account address.
 * @param {string} strategyAddress - The strategy address.
 * @param {JsonRpcProvider} jsonProvider - The JSON-RPC provider.
 * @return {Promise<string>} A promise that resolves to the user's Deshare balance.
 */
export async function getUserDeshareBalance(
  accountAddress: string,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
): Promise<string>;

/**
 * Retrieves the balance of a user's Deshare tokens.
 *
 * @param {string} accountAddress - The address of the user's account.
 * @param {string} strategyAddress - The address of the strategy.
 * @param {JsonRpcProvider} jsonProvider - The JSON-RPC provider.
 * @param {true} raw - A flag indicating if the balance should be returned in raw format.
 * @return {Promise<BigNumber>} - A promise that resolves to the user's Deshare token balance.
 */
export async function getUserDeshareBalance(
  accountAddress: string,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  raw: true,
): Promise<BigNumber>;

/**
 * Get the balance of a user's Deshare tokens.
 *
 * @param {string} accountAddress - The address of the user's account.
 * @param {string} strategyAddress - The address of the strategy.
 * @param {JsonRpcProvider} jsonProvider - The JSON-RPC provider.
 * @param {boolean} [raw] - Optional flag to return the raw balance.
 * @return {Promise<BigNumber | string>} The user's Deshare balance.
 */
export async function getUserDeshareBalance(
  accountAddress: string,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  raw?: true,
): Promise<BigNumber | string> {
  const strategyContract = getERC20Contract(strategyAddress, jsonProvider);
  const shares = await strategyContract.balanceOf(accountAddress);

  return raw ? shares : formatBigInt(shares, 18);
}

/**
 * Removes LP (Liquidity Provider) tokens from a strategy and burns the shares.
 *
 * @param {string} accountAddress - The address of the account performing the removal.
 * @param {string | number | BigNumber} shares - The number of shares to be burned.
 * @param {string} strategyAddress - The address of the strategy from which the shares are being burned.
 * @param {JsonRpcProvider} jsonProvider - The JSON-RPC provider used to interact with the blockchain.
 * @param {Overrides} [overrides] - Optional overrides for the transaction.
 * @param {string} [_amount0Min='0'] - The minimum amount of token0 that must be received from the burn.
 * @param {string} [_amount1Min='0'] - The minimum amount of token1 that must be received from the burn.
 * @returns {Promise<ContractTransaction>} A promise that resolves to the transaction object.
 */
export async function removeLP(
  accountAddress: string,
  shares: string | number | BigNumber,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  overrides?: Overrides,
  _amount0Min: string = '0',
  _amount1Min: string = '0',
): Promise<ContractTransaction> {
  const { chainId } = jsonProvider.network;

  if (!Object.values(SupportedChainId).includes(chainId)) {
    throw new Error(`Unsupported chainId: ${chainId ?? 'undefined'}`);
  }

  const signer = jsonProvider.getSigner(accountAddress);

  const strategyContract = getStrategyContract(strategyAddress, signer);
  const strategy = await getStrategyInfo(chainId, strategyAddress);
  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const params: Parameters<typeof strategyContract.burn> = [
    shares instanceof BigNumber ? shares : parseBigInt(shares, 18),
    parseBigInt(_amount0Min, +strategy.token0.decimals),
    parseBigInt(_amount1Min, +strategy.token1.decimals),
  ];

  const gasLimit = overrides?.gasLimit ?? calculateGasMargin(await strategyContract.estimateGas.burn(...params));

  params[3] = { ...overrides, gasLimit };

  return strategyContract.burn(...params);
}
