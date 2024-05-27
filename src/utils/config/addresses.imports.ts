import { Dex } from '../../types/strategyQueryData';

import { SupportedChainId as ChainId } from '../../types';

export { ChainId, Dex };

export type AddressString = `0x${string}`;

export type Addresses = {
  staging?: AddressString | '';
  default: AddressString | '';
};

export type _AddressConfig = Addresses & {
  twap?: Addresses | AddressString | '';
};

export type AddressConfig =
  | (_AddressConfig & {
      [key in Exclude<Dex, 'Uniswap'>]?: _AddressConfig | AddressString;
    })
  | AddressString
  | '';

export type LimitOrderConfig = {
  resolverFactoryAddress: AddressConfig;
  pokeMeAddress?: AddressConfig;
  taskTreasuryAddress?: AddressConfig;
  registrarAddress?: AddressConfig;
  registryAddress?: AddressConfig;
};

export type LimitOrderProvider = 'Gelato' | 'Keeper';

export type Config = {
  defiEdge: {
    factoryAddress: AddressConfig;
    oracleAddress: AddressConfig;
    chainLinkRegistryAddress: AddressConfig;
    liquidityHelperAddress: AddressConfig;
    migratorAddress?: AddressConfig;
    positionKeyHelper?: AddressConfig;
    swapProxy?: AddressConfig;
    quoter?: AddressConfig;
  };
  others: {
    linkToken?: AddressConfig;
    tickLens?: AddressConfig;
    ramsesVeNft?: AddressConfig;
    singleSidedWrapper?: AddressConfig;
    singleSidedWrapperSwapProxy?: AddressConfig;
  };
} & Record<`limitOrder${LimitOrderProvider}`, LimitOrderConfig>;
