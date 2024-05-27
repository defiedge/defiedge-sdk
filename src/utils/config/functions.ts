import { SupportedChainId } from '../../types';
import { DataFeed, Dex } from '../../types/strategyQueryData';
import addressConfig from './addresses';
import { AddressConfig, Addresses, Config } from './addresses.imports';

/**
 * Retrieves the configuration value based on the provided parameters.
 *
 * @param {SupportedChainId} chainId - The ID of the chain.
 * @param {K} config - The configuration key.
 * @param {keyof Config[K]} subConfig - The sub-configuration key.
 * @param {boolean} [twap] - Whether to use TWAP.
 * @param {Dex} [dex] - The DEX to use.
 * @return {string | undefined} The retrieved configuration value or undefined if not found.
 */
export const getConfig = <K extends keyof Config>(
  chainId: SupportedChainId,
  config: K,
  subConfig: keyof Config[K],
  twap?: boolean,
  dex?: Dex,
): string | undefined => {
  if (!chainId) return undefined;

  let addressObj: AddressConfig | undefined = addressConfig[chainId][config][subConfig] as any;

  if (dex && dex !== Dex.Uniswap && typeof addressObj === 'object') {
    addressObj = addressObj[dex] ?? addressObj;
  }

  if (typeof addressObj === 'undefined') {
    throw new TypeError(
      `Config ${config}.${subConfig as string} not found. Options:${Object.entries({ twap, chainId, dex })
        .map((e) => e.join(':'))
        .join(', ')}`,
    );
  }

  if (typeof addressObj === 'string') return addressObj;

  const address = ((twap && addressObj?.twap) || addressObj) as Addresses | string;

  if (!address) return undefined;

  if (typeof address === 'string') return address;

  return address.default;
};

/**
 * Retrieves the factory address based on the provided chain ID, data feed, and DEX.
 *
 * @param {SupportedChainId} chainId - The ID of the chain.
 * @param {DataFeed} dataFeed - The data feed.
 * @param {Dex} dex - The DEX.
 * @return {string | undefined} The factory address or undefined if not found.
 */
export const getFactoryAddress = (chainId: SupportedChainId, dataFeed: DataFeed, dex: Dex): string | undefined =>
  getConfig(chainId, 'defiEdge', 'factoryAddress', dataFeed === DataFeed.Twap, dex);

/**
 * Retrieves the oracle address for the specified chain ID.
 *
 * @param {SupportedChainId} chainId - The ID of the chain.
 * @param {boolean} [isTwap] - Whether to retrieve the TWAP oracle address.
 * @param {Dex} [dex] - The DEX to retrieve the oracle address for.
 * @return {string | undefined} - The oracle address for the specified chain ID, or undefined if not found.
 */
export const getOracleAddress = (chainId: SupportedChainId, isTwap?: boolean, dex?: Dex): string | undefined =>
  getConfig(chainId, 'defiEdge', 'oracleAddress', isTwap, dex);

/**
 * Retrieves the chainLink registry addresses for the specified chain.
 *
 * @param {SupportedChainId} chainId - The ID of the chain.
 * @param {boolean} [isTwap] - Whether to use the TWAP version of the registry.
 * @param {Dex} [dex] - The DEX to get the registry addresses from.
 * @return {string | undefined} - The chainLink registry addresses for the specified chain, or undefined if not found.
 */
export const getChainLinkRegistryAddresses = (
  chainId: SupportedChainId,
  isTwap?: boolean,
  dex?: Dex,
): string | undefined => getConfig(chainId, 'defiEdge', 'chainLinkRegistryAddress', isTwap, dex);

/**
 * Returns the address of the liquidity helper for the specified chain and DEX.
 *
 * @param {SupportedChainId} chainId - The ID of the chain.
 * @param {Dex} dex - The DEX.
 * @param {boolean} isTwap (optional) - Whether the address is for a TWAP.
 * @return {string | undefined} The address of the liquidity helper, or undefined if not found.
 */
export const getLiquidityHelperAddress = (chainId: SupportedChainId, dex: Dex, isTwap?: boolean): string | undefined =>
  getConfig(chainId, 'defiEdge', 'liquidityHelperAddress', isTwap, dex);
