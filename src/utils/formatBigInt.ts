import { BigNumber } from 'ethers';

export default function formatBigInt(value: number | string | BigNumber, decimals: number): string {
  const bigVal = BigNumber.from(value.toString());
  const divisor = BigNumber.from(10).pow(decimals);

  return bigVal.div(divisor).toString();
}
