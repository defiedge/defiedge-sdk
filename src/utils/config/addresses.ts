import { SupportedChainId as ChainId } from '../../types';
import { Dex } from '../../types/strategyQueryData';

export type Addresses = {
  twap?: string;
  default: string;
};

export type _AddressConfig = Addresses;

export type AddressConfig = (_AddressConfig & { [key in Exclude<Dex, 'Uniswap'>]?: _AddressConfig | string }) | string;

export const v2Map: Partial<Record<Dex, true | Partial<Record<ChainId, true>>>> = {
  [Dex.Camelot]: true,
  [Dex.Stellaswap]: true,
  [Dex.Thena]: true,
  [Dex.Fusionx]: true,
  [Dex.Retro]: true,
  [Dex.Horiza]: true,
  [Dex.Ramses]: true,
  [Dex.Uniswap]: {
    [ChainId.base]: true,
  },
  [Dex.Pancakeswap]: {
    [ChainId.arbitrum]: true,
  },
};

export type Config = {
  defiEdge: {
    factoryAddress: AddressConfig;
    oracleAddress: AddressConfig;
    chainLinkRegistryAddress: AddressConfig;
    liquidityHelperAddress: AddressConfig;
    positionKeyHelper?: AddressConfig;
  };
};

const addressConfig: Record<ChainId, Config> = {
  [ChainId.arbitrum]: {
    defiEdge: {
      factoryAddress: {
        default: '0x7d55d4ff054f5e2b748ea2cf0765fbfba7ae222f',
        twap: '0x4082c6aef2cc2e478e624f6ac89dd6e8e0483b90',
        [Dex.Arbidex]: {
          default: '0xbfba325437051a29ea1230de05b6020ea3e47979',
          twap: '0xbd4e23278b01ceb2dc18ea94ba7f04c5031c5283',
        },
        [Dex.Camelot]: {
          default: '0x8aA209415b5fA0BB3ffA93b80Dd96b93185F934c',
          twap: '0x5C67032e4ea64B2118f208C797E837732B92aa3C',
        },
        [Dex.Sushiswap]: {
          default: '0x5015422641c162221fa35bbb60bb13c744f7ac7a',
          twap: '0x95b0575c803e5eec7b3c37338817822659a6ac84',
        },
        [Dex.Ramses]: {
          default: '0xcc4C4d7F487DE08Ea11D13a0550D45093cCD6a7a',
          twap: '0xD5B02244d23Ccca988B1163525d10BACf0f280b7',
        },
        [Dex.Pancakeswap]: {
          default: '0xBc805030469c36A483713EFAf9fFC8f0E8a81aeD',
          twap: '0x913d1Cc7b0F7946e3724cC59DEd7E172201EAc91',
        },
      },

      chainLinkRegistryAddress: '0xe43b4cde662165ba1f646022e7d41aade8993b11',
      oracleAddress: '0x5bb95d1b824bddd1e7fbf6e011ed3bc21dcbcf11',
      liquidityHelperAddress: {
        default: '0x61622417f3c3a7f6b29784ec1a5297bae6eeafc4',
        [Dex.Camelot]: '0x44ef745AF9653bc308FFFaE06a6f79f3A47713c4',
        [Dex.Ramses]: '0xdD06288279528593Db866Ba44d1D18494C6fAa1f',
        [Dex.Pancakeswap]: '0x85Ab2Eda11bC0cb73Cf798d76A1F2498CF60C841',
      },
      positionKeyHelper: {
        default: '',
        [Dex.Camelot]: '0x8aC8c590f502c52F0933417ADF599E80354E8fb5',
        [Dex.Pancakeswap]: '0x649b92e970181eEbAf73EE100fE41CB4AD7d06Ba',
        [Dex.Ramses]: '0x84fe7A22f1113778Be5495eBEfF76483d6854099',
      },
    },
  },
  [ChainId.polygon]: {
    defiEdge: {
      factoryAddress: {
        default: '0x49c868a7710bf4d91a77a035324ed34d2886c41c',
        twap: '0xf9654b734bf76069b04d7efd9bf2268691a0ff00',
        [Dex.Sushiswap]: {
          default: '0xd510A6Ad3549d4862339Cc54bb649706D2885a28',
          twap: '0x0bcEAB2572F9EE57ca84031E2c19Dbd2B98A7e9d',
        },
        [Dex.Retro]: {
          default: '0x7fBf00017c094e6b9398e27A105EcA71D3D2ACbB',
          twap: '0x053Ca1F70fF5506DB5004DfFA901064cBc4A2F7A',
        },
      },
      chainLinkRegistryAddress: '0xe7edf6ed8197247589a9c59510e428e6955f8207',
      oracleAddress: '0x3989f5cc5fcccdc62891f5f513a6fbb58e602390',
      liquidityHelperAddress: {
        default: '0x8ec08892a88506d2ce679e1cf83bfbbe03b3a835',
        [Dex.Retro]: {
          default: '0x84C51D6eA7853dcE4496f10e55D03eD1c7c2553F',
          twap: '0x84C51D6eA7853dcE4496f10e55D03eD1c7c2553F',
        },
      },

      positionKeyHelper: {
        default: '',
        [Dex.Retro]: {
          default: '0xbDF46441E57Cb9b068f9Fa63e6840Acf8dD8Ac32',
        },
        [Dex.Thena]: {
          default: '0xeFccEEAD2Ee62Ddeb0f463ee49C4D5E48e29c7A6',
        },
      },
    },
  },
  [ChainId.mainnet]: {
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

  [ChainId.optimism]: {
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

  [ChainId.bsc]: {
    defiEdge: {
      factoryAddress: {
        default: '0x5a7bfb597323decd653a44e9771ad6a0f9cc6df9',
        twap: '0xe09b82d9b9da83921eb21dca99da43c6abba9353',
        [Dex.Apeswap]: {
          default: '0x54ba7b033fe40d44b2eb22bf4a5d19e6d6308591',
          twap: '0x5854d5ea3d9cbde4dc28aa9b2c621c457ac6b9cc',
        },
        [Dex.Pancakeswap]: {
          default: '0x4FD639cd1aFc3DDd4d2622e24E778a35a4141eA9',
          twap: '0x1d48012740FABf7bcd83976a852DfE88174D56A5',
        },
        [Dex.Thena]: {
          default: '0xB4B715a85B552381a82570a0bb4392d2c77bA883',
          twap: '0x8cf22573DfDE65Af782b22D10D6300d21edDE19B',
        },
      },
      chainLinkRegistryAddress: '0xb8f51c936c28eaeb928ed9d3b3ba02cfcecd8e25',
      oracleAddress: '0xf85795e865485176c1309c04e707c571b26b9863',
      liquidityHelperAddress: {
        default: '0x6b47052b21f0976d189956661774242b26802ce4',
        [Dex.Apeswap]: '0x6b47052b21f0976d189956661774242b26802ce4',
        [Dex.Pancakeswap]: '0xd540dc521814e90dbc040ce5e0fe74e42b54f351',
        [Dex.Thena]: '0x95b0575c803e5eEC7b3c37338817822659A6ac84',
      },
      positionKeyHelper: {
        default: '',
        [Dex.Thena]: '0xd27794501d2ae4b462721a0afca73f63664d7bc0',
      },
    },
  },
  [ChainId.moonbeam]: {
    defiEdge: {
      factoryAddress: {
        default: '0x5361AfaE1E25509C811B164a221A5D32effDBe90',
        twap: '0xd0e1596eaf70421141d56E0E720e44821Ac06dAF',
      },
      oracleAddress: '0x4d9AF7DbdAF9aB14b64EadF012fE25019D093B2A',
      chainLinkRegistryAddress: '0x0bf2acf5a53975333cf3fb5ef74eb7aa420fe1de',
      liquidityHelperAddress: {
        default: '0xcB691BbbA105Cd08CBA1a80E53cd1ae34B24ba3E',
        twap: '0xcB691BbbA105Cd08CBA1a80E53cd1ae34B24ba3E',
      },

      positionKeyHelper: '0x55f92dFc651D308436BeAF79585321d8Ca73A073',
    },
  },
  [ChainId.mantle]: {
    defiEdge: {
      factoryAddress: {
        default: '',
        twap: '',
        [Dex.Fusionx]: {
          default: '0x5015422641C162221fa35bBB60bb13C744f7aC7A',
          twap: '0x95b0575c803e5eEC7b3c37338817822659A6ac84',
        },
      },
      oracleAddress: {
        default: '',
        twap: '',
        [Dex.Fusionx]: {
          default: '0xd0e1596eaf70421141d56E0E720e44821Ac06dAF',
          twap: '0xA093729b392fE82b5fA6fC7f54E6a6C33ca3C250',
        },
      },
      chainLinkRegistryAddress: '0xA2aa501b19aff244D90cc15a4Cf739D2725B5729',
      liquidityHelperAddress: {
        default: '',
        twap: '',
        [Dex.Fusionx]: {
          default: '0x2b857BFedAF65C8422663e5c6E4fe12a6FE4853A',
          twap: '0x2b857BFedAF65C8422663e5c6E4fe12a6FE4853A',
        },
      },

      positionKeyHelper: '0x876cCF15555DA67510707c751EbcAC65cee48Bbb',
    },
  },
  [ChainId.base]: {
    defiEdge: {
      factoryAddress: {
        default: '0x6e5837bb5C18Db65383bC12B69520533cBBE4dD5',
        twap: '0x535bDcaD61A2C964C1f7Da021bB26A2b290B911d',
      },
      oracleAddress: {
        default: '0xF165f9f256518C82882cD7b7002b0C046Ea5C2Fc',
        twap: '0xd15e8fAD8037b57b109cf31AFb3A70B94D712cBB',
      },
      chainLinkRegistryAddress: '0x18E2C78e52399A9AA077CF4Aa3062c85870fB4Ea',
      liquidityHelperAddress: '0x6E9149617D54401C12bDd7050538d8aC4CE81dF5',
      positionKeyHelper: '0xb9d226F9c660F24CB0E08804C020e08c783bC726',
    },
  },
};

export default addressConfig;
