import { BigNumber } from '@ethersproject/bignumber';
import { parseEther } from '@ethersproject/units';

/**
 * Parses a big integer value and returns a BigNumber.
 *
 * @param {number | string} _value - The value to be parsed. It can be either a number or a string.
 * @param {number} decimals - The number of decimal places in the resulting BigNumber.
 * @return {BigNumber} The parsed BigNumber value.
 */
export default function parseBigInt(_value: number | string, decimals: number): BigNumber {
  const value = Number(_value).toFixed(18);

  const bi18 = parseEther(value.toString());
  const divisor = BigNumber.from(10).pow(18 - decimals);

  return bi18.div(BigNumber.from(divisor));
}
