import { utils } from 'ethers';

/**
 * Generates a position key based on the given address, lower tick, and upper tick.
 *
 * @param {string} address - The address to generate the position key for.
 * @param {number} lowerTick - The lower tick value.
 * @param {number} upperTick - The upper tick value.
 * @return {string} - The generated position key.
 */
const getPositionKey = (address: string, lowerTick: number, upperTick: number): string =>
  utils.keccak256(utils.solidityPack(['address', 'int24', 'int24'], [address, lowerTick, upperTick]));

export default getPositionKey;
