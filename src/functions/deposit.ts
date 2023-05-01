import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MaxUint256 } from '@ethersproject/constants';
import { getERC20Contract, getStrategyContract } from '../contracts';
import parseBigInt from '../utils/parseBigInt';
import { getStrategyInfo } from './strategy';
import { SupportedChainId } from '../types';
import calculateGasMargin from '../types/calculateGasMargin';
import formatBigInt from '../utils/formatBigInt';

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
  const strategy = await getStrategyInfo(chainId, strategyAddress);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const token = strategy[tokenIdx === 0 ? 'token0' : 'token1'];

  const tokenContract = getERC20Contract(token.id, signer);
  const currentAllowanceBN = await tokenContract.allowance(accountAddress, strategyAddress);

  const currentAllowance = +formatBigInt(currentAllowanceBN, +token.decimals);

  return currentAllowance !== 0 && currentAllowance >= +(amount ?? 0);
}

export async function approveStrategyToken(
  accountAddress: string,
  tokenIdx: 0 | 1,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  amount?: string | number,
  overrides?: Overrides,
): Promise<ContractTransaction> {
  const { chainId } = jsonProvider.network;
  if (!Object.values(SupportedChainId).includes(chainId)) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  const signer = jsonProvider.getSigner(accountAddress);
  const strategy = await getStrategyInfo(chainId, strategyAddress);
  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const token = strategy[tokenIdx === 0 ? 'token0' : 'token1'];

  const tokenContract = getERC20Contract(token.id, signer);

  const amountBN = amount ? parseBigInt(amount, +token.decimals || 18) : MaxUint256;

  const gasLimit =
    overrides?.gasLimit ?? calculateGasMargin(await tokenContract.estimateGas.approve(strategyAddress, amountBN));

  return tokenContract.approve(strategyAddress, amountBN, { gasLimit });
}

export async function depositLP(
  accountAddress: string,
  amount0: string | number,
  amount1: string | number,
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
  const signer = jsonProvider.getSigner(accountAddress);
  const strategyContract = getStrategyContract(strategyAddress, signer);
  const strategy = await getStrategyInfo(chainId, strategyAddress);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  if (parseInt(strategy.token0.id, 16) > parseInt(strategy.token1.id, 16)) {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    amount1 = [amount0, (amount0 = amount1)][0];
  }

  const params: Parameters<typeof strategyContract.mint> = [
    parseBigInt(amount0, +strategy.token0.decimals),
    parseBigInt(amount1, +strategy.token1.decimals),
    parseBigInt(_amount0Min, +strategy.token0.decimals),
    parseBigInt(_amount1Min, +strategy.token1.decimals),
    0,
  ];

  const gasLimit = overrides?.gasLimit ?? calculateGasMargin(await strategyContract.estimateGas.mint(...params));

  params[5] = { ...overrides, gasLimit };

  return strategyContract.mint(...params);
}
