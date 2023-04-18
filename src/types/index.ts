import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';

export type SignerOrProvider = Signer | Provider;

export enum SupportedChainId {
  arbitrum = 42161,
  mainnet = 1,
  optimism = 10,
  polygon = 137,
  bsc = 56,
}
