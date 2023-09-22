import { BigNumber } from '@ethersproject/bignumber';

/**
 * Calculates the gas margin for the given value.
 *
 * @param {BigNumber} value - The value for which the gas margin needs to be calculated.
 * @return {BigNumber} The calculated gas margin.
 */
export default function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}
