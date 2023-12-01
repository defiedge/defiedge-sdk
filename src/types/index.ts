import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';

export type SignerOrProvider = Signer | Provider;

export enum SupportedChainId {
  arbitrum = 42161,
  avalanche = 43114,
  base = 8453,
  bsc = 56,
  mainnet = 1,
  mantle = 5000,
  moonbeam = 1284,
  optimism = 10,
  polygon = 137,
  zkEVM = 1101,
  zksyncEra = 324,
}
