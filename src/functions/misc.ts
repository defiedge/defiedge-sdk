import { tickToPrice } from '@uniswap/v3-sdk';
import { Price, Token } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { getStrategyInfo } from './strategy';
import { getERC20Contract, getLiquidityHelperContract, getPoolContract, getStrategyContract } from '../contracts';
import { IStrategyBase } from '../../abis/types/Strategy';
import { DataFeed, Strategy } from '../types/strategyQueryData';
import { getLiquidityHelperAddress } from '../utils/config/functions';
import getPositionKey from '../utils/positionKey';
import formatBigInt from '../utils/formatBigInt';

/**
 * Calculates the ratio of a given number to the square root of the minimum and maximum values.
 *
 * @param {number} p - The number to calculate the ratio for.
 * @param {number} pmin - The minimum value.
 * @param {number} pmax - The maximum value.
 * @return {number} The calculated ratio.
 */
function ratio(p: number, pmin: number, pmax: number) {
  const sqp = Math.sqrt(p);
  return (sqp * (sqp - Math.sqrt(pmin))) / (1 - sqp / Math.sqrt(pmax));
}

export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96));
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2));

/**
 * Retrieves the current price of a given pool.
 *
 * @param {string} address - The address of the pool.
 * @param {JsonRpcProvider} provider - The JSON-RPC provider.
 * @param {Token} baseToken - The base token.
 * @param {Token} quoteToken - The quote token.
 * @return {Promise<Object>} An object containing the current price, tick, square root of the price, and liquidity of the pool.
 */
async function currentPrice(address: string, provider: JsonRpcProvider, baseToken: Token, quoteToken: Token) {
  const poolContract = getPoolContract(address, provider);

  const liquidity = await poolContract.liquidity();

  const { tick, sqrtPriceX96 } = await poolContract
    .slot0()
    .catch(() => poolContract.globalState().then((e) => ({ ...e, sqrtPriceX96: e.price })));
  const sqrtRatioX96 = JSBI.BigInt(sqrtPriceX96);
  const cp = new Price(baseToken, quoteToken, Q192, JSBI.multiply(sqrtRatioX96, sqrtRatioX96)).toSignificant(6);

  return {
    cp,
    tick,
    sqrtPriceX96,
    liquidity: Number(liquidity.toString()),
  };
}

/**
 * Retrieves the price ranges for a given strategy.
 *
 * @param {string} strategyAddress - The address of the strategy.
 * @param {JsonRpcProvider} provider - The JSON-RPC provider used to interact with the blockchain.
 * @return {Promise<Range>} An array of objects representing the price ranges.
 */
export async function getRanges(strategyAddress: string, provider: JsonRpcProvider) {
  const strategyContract = getStrategyContract(strategyAddress, provider);
  let orders: IStrategyBase.TickStructOutput[] = [];
  const { chainId } = provider.network;

  if (!strategyContract) return orders;

  const [_orders, strategy] = await Promise.all([
    strategyContract.getTicks().catch(() => []),
    getStrategyInfo(chainId, strategyAddress),
  ]);

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const tokenA = new Token(chainId, strategy.token0.id, +strategy.token0.decimals, strategy.token0.symbol);
  const tokenB = new Token(chainId, strategy.token1.id, +strategy.token1.decimals, strategy.token1.symbol);

  orders = _orders;

  if (orders.length === 0) orders = [await strategyContract.ticks(0)];

  return orders.map(({ tickLower, tickUpper }) => ({
    tickLower,
    tickUpper,
    lowerTickInA: +tickToPrice(tokenA, tokenB, tickLower).toSignificant(6),
    upperTickInA: +tickToPrice(tokenA, tokenB, tickUpper).toSignificant(6),
    lowerTickInB: +tickToPrice(tokenB, tokenA, tickUpper).toSignificant(6),
    upperTickInB: +tickToPrice(tokenB, tokenA, tickLower).toSignificant(6),
  }));
}

type Amounts = {
  amount0: BigNumber;
  amount1: BigNumber;
};

/**
 * Retrieves the amounts for a given liquidity range in a strategy.
 *
 * @param {Pick<Strategy, 'pool' | 'dex' | 'type'>} strategy - The strategy object containing the pool, dex, and type.
 * @param {number} tickLower - The lower tick of the liquidity range.
 * @param {number} tickUpper - The upper tick of the liquidity range.
 * @param {BigNumber} liquidity - The liquidity amount to query.
 * @param {JsonRpcProvider} provider - The JSON-RPC provider.
 * @returns {Promise<Amounts>} A promise that resolves to the amounts for the liquidity range.
 */
async function getAmountsForLiquidity(
  strategy: Pick<Strategy, 'pool' | 'dex' | 'type'>,
  tickLower: number,
  tickUpper: number,
  liquidity: BigNumber,
  provider: JsonRpcProvider,
): Promise<Amounts> {
  const { chainId } = provider.network;

  const address = getLiquidityHelperAddress(chainId, strategy.dex, strategy.type === DataFeed.Twap)!;
  const contract = getLiquidityHelperContract(address, provider);

  return contract.getAmountsForLiquidity(strategy.pool, tickLower, tickUpper, liquidity);
}

type Position = {
  liquidity: BigNumber;
  feeGrowthInside0LastX128: BigNumber;
  feeGrowthInside1LastX128: BigNumber;
  tokensOwed0: BigNumber;
  tokensOwed1: BigNumber;
};

/**
 * Retrieves the position details for a given strategy, tick range, and provider.
 *
 * @param {Pick<Strategy, 'id' | 'pool'>} strategy - The strategy object containing the id and pool information.
 * @param {number} tickLower - The lower boundary of the tick range.
 * @param {number} tickUpper - The upper boundary of the tick range.
 * @param {JsonRpcProvider} provider - The provider used to query the position details.
 * @return {Promise<Position>} - A promise that resolves to the position details.
 */
async function getPosition(
  strategy: Pick<Strategy, 'id' | 'pool'>,
  tickLower: number,
  tickUpper: number,
  provider: JsonRpcProvider,
): Promise<Position> {
  const pool = getPoolContract(strategy.pool, provider);

  const positionKey = getPositionKey(strategy.id, tickLower, tickUpper);
  const position = await pool.positions(positionKey);
  return position;
}

/**
 * Retrieves the liquidity information for a given strategy.
 *
 * @param {string} strategyAddress - The address of the strategy.
 * @param {JsonRpcProvider} provider - The JSON-RPC provider.
 * @return {Promise<{
 *   amount0: number;
 *   amount1: number;
 *   unusedAmount0: number;
 *   unusedAmount1: number;
 *   amount0Total: number;
 *   amount1Total: number;
 *   unusedAmount0BigNumber: unknown;
 *   unusedAmount1BigNumber: unknown;
 * }>} The liquidity information.
 */
export async function getLiquidity(
  strategyAddress: string,
  provider: JsonRpcProvider,
): Promise<{
  amount0: number;
  amount1: number;
  unusedAmount0: number;
  unusedAmount1: number;
  amount0Total: number;
  amount1Total: number;
  unusedAmount0BigNumber: unknown;
  unusedAmount1BigNumber: unknown;
}> {
  const { chainId } = provider.network;
  const strategy = await getStrategyInfo(chainId, strategyAddress);
  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const token0 = getERC20Contract(strategy.token0.id, provider);
  const token1 = getERC20Contract(strategy.token1.id, provider);

  const [unusedAmount0, unusedAmount1, { a0, a1 }] = await Promise.all([
    token0.balanceOf(strategy.id),
    token1.balanceOf(strategy.id),
    (async () => {
      const orders = await getRanges(strategy.id, provider);

      const amounts = await Promise.all<{
        amount0: BigNumber;
        amount1: BigNumber;
      }>(
        orders.map(async (subarray) => {
          const { liquidity } = await getPosition(strategy, subarray.tickLower, subarray.tickUpper, provider);

          const { amount0, amount1 } = await getAmountsForLiquidity(
            strategy,
            subarray.tickLower,
            subarray.tickUpper,
            liquidity,
            provider,
          );

          return { amount0, amount1 };
        }),
      );

      const { a0: a, a1: b } = amounts.reduce(
        (total, curr) => ({
          a0: curr.amount0.add(total.a0),
          a1: curr.amount1.add(total.a1),
        }),
        { a0: BigNumber.from(0), a1: BigNumber.from(0) },
      );

      return { a0: a, a1: b };
    })(),
  ]);

  return {
    amount0: Number(formatBigInt(a0, +strategy.token0.decimals)),
    amount1: Number(formatBigInt(a1, +strategy.token1.decimals)),
    unusedAmount0: Number(formatBigInt(unusedAmount0, +strategy.token0.decimals)),
    unusedAmount1: Number(formatBigInt(unusedAmount1, +strategy.token1.decimals)),
    amount0Total: Number(formatBigInt(a0.add(unusedAmount0), +strategy.token0.decimals)),
    amount1Total: Number(formatBigInt(a1.add(unusedAmount1), +strategy.token1.decimals)),
    unusedAmount0BigNumber: unusedAmount0,
    unusedAmount1BigNumber: unusedAmount1,
  };
}

/**
 * Calculates the liquidity ratio for a given strategy.
 *
 * @param {string} strategyAddress - The address of the strategy.
 * @param {JsonRpcProvider} provider - The provider for the JSON-RPC.
 * @param {boolean} wrtToken1 - Whether to calculate the ratio with respect to token1.
 * @return {Promise<number>} - The liquidity ratio.
 * @throws {Error} - If the strategy doesn't have valid liquidity distribution or if the strategy is not found.
 */
export async function getLiquidityRatio(
  strategyAddress: string,
  provider: JsonRpcProvider,
  wrtToken1: boolean = false,
): Promise<number> {
  const { chainId } = provider.network;
  const strategy = await getStrategyInfo(chainId, strategyAddress);

  if (strategy.type === DataFeed.Twap) {
    const liquidity = await getLiquidity(strategyAddress, provider);

    if (!liquidity.amount1 || !liquidity.amount0) {
      throw new Error(`Strategy doesn't have valid liquidity distribution [${chainId}, ${strategyAddress}]`);
    }

    return wrtToken1
      ? liquidity.amount1Total / liquidity.amount0Total
      : liquidity.amount0Total / liquidity.amount1Total;
  }

  if (!strategy) throw new Error(`Strategy not found [${chainId}, ${strategyAddress}]`);

  const tokenA = new Token(chainId, strategy.token0.id, +strategy.token0.decimals, strategy.token0.symbol);
  const tokenB = new Token(chainId, strategy.token1.id, +strategy.token1.decimals, strategy.token1.symbol);
  const { cp, tick } = await currentPrice(strategy.pool, provider, tokenA, tokenB);

  const [range] = await getRanges(strategy.id, provider);

  if (!range) {
    console.warn('Strategy on hold, only single sided deposit is allowed');
    return 0;
  }

  if (+range.tickLower > tick && tick < +range.tickUpper) {
    console.warn('Primary position is out of range, only single sided deposit is allowed');
    return 0;
  }

  const pa = +tickToPrice(tokenA, tokenB, +range.tickLower).toSignificant(6);
  const pb = +tickToPrice(tokenA, tokenB, +range.tickUpper).toSignificant(6);

  return wrtToken1 ? ratio(1 / +cp, 1 / pb, 1 / pa) : ratio(+cp, pa, pb);
}
