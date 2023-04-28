import { SupportedChainId } from '../../types';
import { DataFeed, Dex } from '../../types/strategyQueryData';
import addressConfig, { AddressConfig, Addresses, Config } from './addresses';

export const getConfig = <K extends keyof Config>(
  chainId: SupportedChainId,
  config: K,
  subConfig: keyof Config[K],
  twap?: boolean,
  dex?: Dex,
): string | undefined => {
  if (!chainId) return undefined;

  let addressObj: AddressConfig | undefined = addressConfig[chainId][config][subConfig] as any;

  if (typeof addressObj === 'object') {
    addressObj = dex ? addressObj[dex] : addressObj;
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

export const getFactoryAddress = (chainId: SupportedChainId, dataFeed: DataFeed, dex: Dex): string | undefined =>
  getConfig(chainId, 'defiEdge', 'factoryAddress', dataFeed === DataFeed.Twap, dex);

export const getOracleAddress = (chainId: SupportedChainId, isTwap?: boolean, dex?: Dex): string | undefined =>
  getConfig(chainId, 'defiEdge', 'oracleAddress', isTwap, dex);

export const getChainLinkRegistryAddresses = (
  chainId: SupportedChainId,
  isTwap?: boolean,
  dex?: Dex,
): string | undefined => getConfig(chainId, 'defiEdge', 'chainLinkRegistryAddress', isTwap, dex);

export const getLiquidityHelperAddress = (chainId: SupportedChainId, dex: Dex, isTwap?: boolean): string | undefined =>
  getConfig(chainId, 'defiEdge', 'liquidityHelperAddress', isTwap, dex);
