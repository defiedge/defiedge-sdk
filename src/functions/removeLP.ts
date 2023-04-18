/* eslint-disable import/prefer-default-export */

import { Overrides } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { getStrategyContract } from '../contracts';
import parseBigInt from '../utils/parseBigInt';
import { getStrategyInfo } from './strategy';
import { SupportedChainId } from '../types';
import calculateGasMargin from '../types/calculateGasMargin';

export default async function removeLP(
  accountAddress: string,
  shares: string | number,
  strategyAddress: string,
  jsonProvider: JsonRpcProvider,
  overrides?: Overrides,
  _amount0Min: string = '0',
  _amount1Min: string = '0',
) {
  const { chainId } = jsonProvider.network;

  if (!Object.values(SupportedChainId).includes(chainId)) {
    throw new Error(`Unsupported chainId: ${chainId ?? 'undefined'}`);
  }

  const signer = jsonProvider.getSigner(accountAddress);

  const strategyContract = getStrategyContract(strategyAddress, signer);
  const { strategy } = await getStrategyInfo(chainId, strategyAddress);

  const params: Parameters<typeof strategyContract.burn> = [
    parseBigInt(shares, 18),
    parseBigInt(_amount0Min, +strategy.token0.decimals),
    parseBigInt(_amount1Min, +strategy.token1.decimals),
  ];

  const gasLimit = overrides?.gasLimit ?? calculateGasMargin(await strategyContract.estimateGas.burn(...params));

  params[3] = { ...overrides, gasLimit };

  return strategyContract.burn(...params);
}
