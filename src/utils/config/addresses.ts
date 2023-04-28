import { SupportedChainId } from '../../types';
import { Dex } from '../../types/strategyQueryData';

export type Addresses = {
  twap?: string;
  default: string;
};

export type _AddressConfig = Addresses;

export type AddressConfig = (_AddressConfig & { [key in Exclude<Dex, 'Uniswap'>]?: _AddressConfig | string }) | string;

export type Config = {
  defiEdge: {
    factoryAddress: AddressConfig;
    oracleAddress: AddressConfig;
    chainLinkRegistryAddress: AddressConfig;
    liquidityHelperAddress: AddressConfig;
  };
};

const addressConfig: Record<SupportedChainId, Config> = {
  [SupportedChainId.arbitrum]: {
    defiEdge: {
      factoryAddress: {
        default: '0x7d55d4ff054f5e2b748ea2cf0765fbfba7ae222f',
        twap: '0x4082c6aef2cc2e478e624f6ac89dd6e8e0483b90',
      },
      chainLinkRegistryAddress: '0xe43b4cde662165ba1f646022e7d41aade8993b11',
      oracleAddress: '0x5bb95d1b824bddd1e7fbf6e011ed3bc21dcbcf11',
      liquidityHelperAddress: '0x61622417f3c3a7f6b29784ec1a5297bae6eeafc4',
    },
  },
  [SupportedChainId.polygon]: {
    defiEdge: {
      factoryAddress: {
        default: '0x49c868a7710bf4d91a77a035324ed34d2886c41c',
        twap: '0xf9654b734bf76069b04d7efd9bf2268691a0ff00',
      },
      chainLinkRegistryAddress: '0xe7edf6ed8197247589a9c59510e428e6955f8207',
      oracleAddress: '0x3989f5cc5fcccdc62891f5f513a6fbb58e602390',
      liquidityHelperAddress: '0x8ec08892a88506d2ce679e1cf83bfbbe03b3a835',
    },
  },
  [SupportedChainId.mainnet]: {
    defiEdge: {
      factoryAddress: {
        default: '0xa631c80f5f4739565d8793cab6fd08812ce3337d',
        twap: '0xeeff8227ed1600e59787d9767485ba905f2f07c3',
      },
      oracleAddress: '0x748b4404dccef46a51dba99271e4150cfc6737ec',
      chainLinkRegistryAddress: '0xb89319a57fc0e542992cc23c1a4c97832c67700e',
      liquidityHelperAddress: '0x34e001532d9bb140d43ee5a6abc7b790da85d540',
    },
  },
  [SupportedChainId.optimism]: {
    defiEdge: {
      factoryAddress: {
        default: '0x106a524c49b924a92194f6fe4f3da81c2d42e607',
        twap: '0xe1fd038cbe37475faab39c9d676d9daeaa47da0c',
      },
      oracleAddress: '0x5bb95d1b824bddd1e7fbf6e011ed3bc21dcbcf11',
      chainLinkRegistryAddress: '0x7deb95eb81b25e50400271b478b5766bf74579c2',
      liquidityHelperAddress: '0xe43b4cde662165ba1f646022e7d41aade8993b11',
    },
  },
  [SupportedChainId.bsc]: {
    defiEdge: {
      factoryAddress: {
        default: '0x5a7bfb597323decd653a44e9771ad6a0f9cc6df9',
        twap: '0xe09b82d9b9da83921eb21dca99da43c6abba9353',
        [Dex.Apeswap]: {
          default: '0x54ba7b033fe40d44b2eb22bf4a5d19e6d6308591',
          twap: '0x5854d5ea3d9cbde4dc28aa9b2c621c457ac6b9cc',
        },
        [Dex.Pancakeswap]: {
          default: '0x4fd639cd1afc3ddd4d2622e24e778a35a4141ea9',
          twap: '0x1d48012740fabf7bcd83976a852dfe88174d56a5',
        },
      },
      chainLinkRegistryAddress: '0xb8f51c936c28eaeb928ed9d3b3ba02cfcecd8e25',
      oracleAddress: '0xf85795e865485176c1309c04e707c571b26b9863',
      liquidityHelperAddress: {
        default: '0x6b47052b21f0976d189956661774242b26802ce4',
        [Dex.Apeswap]: '0x6b47052b21f0976d189956661774242b26802ce4',
        [Dex.Pancakeswap]: '0xd540Dc521814E90DbC040cE5e0fE74e42B54f351',
      },
    },
  },
};

export default addressConfig;
