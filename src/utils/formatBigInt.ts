// eslint-disable-next-line import/no-extraneous-dependencies
import { BigNumber as BN } from 'bignumber.js';
import { BigNumber } from 'ethers';

/**
 * Formats a big integer value by dividing it by a specified number of decimals.
 *
 * @param {number | string | BigNumber} value - The value to be formatted.
 * @param {number} decimals - The number of decimal places to divide the value by. Default is 18.
 * @returns {string} - The formatted value as a string.
 */
export default function formatBigInt(value: number | string | BigNumber, decimals: number = 18): string {
  const bigVal = new BN(value.toString());
  const divisor = new BN(10).pow(decimals);

  return bigVal.div(divisor).toString();
}
