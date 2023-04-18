import { tickToPrice } from '@uniswap/v3-sdk';
import { Price, Token } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { JsonRpcProvider } from '@ethersproject/providers';
import { getStrategyInfo } from './strategy';
import { getPoolContract } from '../contracts';

function ratio(p: number, pmin: number, pmax: number) {
  const sqp = Math.sqrt(p);
  return (sqp * (sqp - Math.sqrt(pmin))) / (1 - sqp / Math.sqrt(pmax));
}

export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96));
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2));

async function currentPrice(address: string, provider: JsonRpcProvider, baseToken: Token, quoteToken: Token) {
  const poolContract = getPoolContract(address, provider);

  const liquidity = await poolContract.liquidity();

  const { tick, sqrtPriceX96 } = await poolContract.slot0();
  const sqrtRatioX96 = JSBI.BigInt(sqrtPriceX96);
  const cp = new Price(baseToken, quoteToken, Q192, JSBI.multiply(sqrtRatioX96, sqrtRatioX96)).toSignificant(6);

  return {
    cp,
    tick,
    sqrtPriceX96,
    liquidity: Number(liquidity.toString()),
  };
}

export default async function getLiquidityRatio(strategyAddress: string, provider: JsonRpcProvider) {
  const { chainId } = provider.network;
  const { strategy } = await getStrategyInfo(chainId, strategyAddress);
  const tokenA = new Token(chainId, strategy.token0.id, +strategy.token0.decimals, strategy.token0.symbol);
  const tokenB = new Token(chainId, strategy.token1.id, +strategy.token1.decimals, strategy.token1.symbol);
  const { cp, tick } = await currentPrice(strategy.pool, provider, tokenA, tokenB);

  const range = strategy.rebalance[0].ranges[0];

  if (!range) {
    console.warn('Strategy on hold');
    return 0;
  }

  if (+range.tickLower > tick && tick < +range.tickUpper) {
    console.warn('Range are single sided is allowed');
    return 0;
  }

  const data = {
    amount0: range.amount0, // BigNumber
    amount1: range.amount1, // BigNumber
    lowerBound: +tickToPrice(tokenA, tokenB, +range.tickLower).toSignificant(6), // Number
    upperBound: +tickToPrice(tokenA, tokenB, +range.tickUpper).toSignificant(6), // Number
  };

  const pa = data.lowerBound;
  const pb = data.upperBound;

  return ratio(+cp, pa, pb);
}
