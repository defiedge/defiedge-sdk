import { ChainId, Config, Dex } from './addresses.imports';

const addressConfig: Record<ChainId, Config> = {
  [ChainId.arbitrum]: {
    defiEdge: {
      factoryAddress: {
        default: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        staging: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        twap: {
          default: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
          staging: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
        },
        [Dex.Arbidex]: {
          default: '0xbfba325437051a29ea1230de05b6020ea3e47979',
          staging: '0xb9c022db3F825040503B7790c1F7277554c4B448',
          twap: {
            default: '0xbd4e23278b01ceb2dc18ea94ba7f04c5031c5283',
            staging: '0x360f217D7400e9D99c6Ba9054238C94246Cfc904',
          },
        },
        [Dex.Camelot]: {
          default: '0x8aA209415b5fA0BB3ffA93b80Dd96b93185F934c',
          twap: '0x415650eFdbEbDAD7BB880FBf865D001a960eDcd1',
        },
        [Dex.Sushiswap]: {
          default: '0xE92D2b0d5473fC1A1B8619fC5DF3FB961F4E918b',
          twap: '0xc89bF236CB40e9Ac861514A1CED0AFc55D6753d8',
        },
        [Dex.Ramses]: {
          default: '0xcc4C4d7F487DE08Ea11D13a0550D45093cCD6a7a',
          twap: '0xD5B02244d23Ccca988B1163525d10BACf0f280b7',
        },
        [Dex.Pancakeswap]: {
          default: '0xBc805030469c36A483713EFAf9fFC8f0E8a81aeD',
          twap: '0x67190533fd42F7D68E84dD9C0528fA2c732d9f79',
        },
        [Dex.Horiza]: {
          default: '0xE87aB7693629B20015129Fbc991319428bb30B47',
          twap: '0xd7740D896C37B18cFB9f8AbDDeFe7beF62a64D09',
        },
      },
      migratorAddress: {
        default: '0xe09346241c8d52836e7410f43ff6345baae352a9',
        staging: undefined,
      },
      chainLinkRegistryAddress: '0xe43b4cde662165ba1f646022e7d41aade8993b11',
      oracleAddress: '0x5bb95d1b824bddd1e7fbf6e011ed3bc21dcbcf11',
      liquidityHelperAddress: {
        default: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        [Dex.Camelot]: '0x44ef745AF9653bc308FFFaE06a6f79f3A47713c4',
        [Dex.Ramses]: '0xdD06288279528593Db866Ba44d1D18494C6fAa1f',
        [Dex.Pancakeswap]: '0x85Ab2Eda11bC0cb73Cf798d76A1F2498CF60C841',
        [Dex.Sushiswap]: '0x4bD4835dD650705768A7319ee777FedF072EC5BC',
        [Dex.Horiza]: '0x72239eC62DfE283EAeEBcE8FFF4e41DC75A9147e',
        [Dex.Arbidex]: {
          default: '0x61622417f3c3a7f6b29784ec1a5297bae6eeafc4',
          staging: '0x220CD5C0ed655d37141922d60F3bd8C2044d044A',
        },
      },
      positionKeyHelper: {
        default: '',
        [Dex.Camelot]: '0x8aC8c590f502c52F0933417ADF599E80354E8fb5',
        [Dex.Pancakeswap]: '0x649b92e970181eEbAf73EE100fE41CB4AD7d06Ba',
        [Dex.Ramses]: '0x84fe7A22f1113778Be5495eBEfF76483d6854099',
        [Dex.Horiza]: '0x3279097A7B4B335f2a9c65d14FCFafc179B94c33',
      },
      swapProxy: {
        default: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        staging: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        twap: {
          default: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
          staging: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
        },
        [Dex.Arbidex]: {
          default: '',
          staging: '0xeCb1e9BFa177039d35D695D92bbE36f0948b38b1',
          twap: { default: '', staging: '0x2F5eE0542587703161A2F89A1E9EA817736c80A0' },
        },
        [Dex.Pancakeswap]: {
          default: '0x4C7b422e0b9B1F2C1347F826cB9F2dFf251ce880',
          twap: '0xaBfaE2b8388dc92C807b274dd36BD56487123704',
        },
        [Dex.Ramses]: {
          default: '0x76AE986Aa748f21B4A0e80280EC775d953FadA46',
          twap: '0x7141aAEA95b74b681d32d9b7D23000080e4F2771',
        },
        [Dex.Camelot]: {
          default: '0x561Edc35a79d76E431947E625F38a65Ae4a688c2',
          twap: '0x0AF791D521edA3CE6E82dba95EE6d1dB17D29256',
        },
        [Dex.Sushiswap]: {
          default: '0x1982a7Ecc9D9CdD84383AE938555CCA0409e81f1',
          twap: '0x5C58CcBA8B6f159DA8C387FF59FFC5dE09396898',
        },
        [Dex.Horiza]: {
          default: '0x473fD25b9b495303D26052b55CDdc120C47b8972',
          twap: '0x8a01ac9A14271DaEF625D7d54806C7EE53CdC437',
        },
      },
    },
    limitOrderGelato: {
      pokeMeAddress: '0xb3f5503f93d5ef84b06993a1975b9d21b962892f',
      resolverFactoryAddress: {
        default: '0x6acf62296051c21562883064c378ca6a2ce62c14',
        staging: '0x4f3f2f7421e12f285dcf4cbe4e52fb1aed1105e3',
        twap: {
          default: '0x81627dcef07384f4b9311427a1922a16b7ed5eff',
          staging: '0xdfeec9b7737e6b1e435e03eeb2741ed6ef8a9ad9',
        },
        [Dex.Arbidex]: {
          default: '0x61C2b3e5948D0eFDEb6d5E6C119218B1422beBDd',
          twap: '0x3A6b7A328c248dEAe7D3389427775C76A79db484',
        },
        [Dex.Camelot]: {
          default: '0x0fba2e4a96e32bd67b4b1ad392fbb2c28acbe1ac',
          twap: '0x3a97f824bf44ee0b95e7bde5cb76132be0389ac7',
        },
      },
      taskTreasuryAddress: '0x527a819db1eb0e34426297b03bae11f2f8b3a19e',
    },
    limitOrderKeeper: {
      registryAddress: '0x75c0530885f385721fdda23c539af3701d6183d4',
      registrarAddress: '0x4f3af332a30973106fe146af0b4220bbbea748ec',
      resolverFactoryAddress: {
        default: '0x848ab8964d0bc53a53b37ec88691ad56400adcfb',
        staging: '0x1e9daaa6057fc3d6b50abce0cd8c8dafa3419342',
        [Dex.Arbidex]: {
          default: '',
        },
        [Dex.Camelot]: {
          default: '',
        },
      },
    },
    others: {
      tickLens: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
      linkToken: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
      ramsesVeNft: {
        default: '',
        [Dex.Ramses]: '0xaaa343032aa79ee9a6897dab03bef967c3289a06',
      },
      singleSidedWrapper: {
        default: '0xfD63DE075a07B80857110D94DfCE02E3F9326e6e', // uniswap
      },
      singleSidedWrapperSwapProxy: {
        default: '0xfde275e94FeE654e3797BbE478341a6095d4e391', // uniswap
      },
    },
  },
  [ChainId.polygon]: {
    defiEdge: {
      factoryAddress: {
        default: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        staging: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        twap: {
          default: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
          staging: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
        },
        [Dex.Sushiswap]: {
          default: '0xAB34c57DA9550Ab26dcB1d74beCbf49DB5b4aa2b',
          twap: '0xc89bF236CB40e9Ac861514A1CED0AFc55D6753d8',
        },
        [Dex.Retro]: {
          default: '0x7fBf00017c094e6b9398e27A105EcA71D3D2ACbB',
          twap: '0x053Ca1F70fF5506DB5004DfFA901064cBc4A2F7A',
        },
        [Dex.Quickswap]: {
          default: '0x730d158D29165C55aBF368e9608Af160DD21Bd80',
          twap: '0x3d2E16e43485236F9E9292840999C88ab5c69C8A',
        },
      },
      chainLinkRegistryAddress: '0xe7edf6ed8197247589a9c59510e428e6955f8207',
      oracleAddress: '0x3989f5cc5fcccdc62891f5f513a6fbb58e602390',
      liquidityHelperAddress: {
        default: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        staging: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        [Dex.Retro]: {
          default: '0x340C1De3B6D0497f5DECD1a2DA92d8a95a960aAC',
          twap: '0x9D0D06ce7B73e48F5Fba410482389856fCA925A0',
        },
        [Dex.Sushiswap]: '0x4bD4835dD650705768A7319ee777FedF072EC5BC',
        [Dex.Quickswap]: {
          default: '0x264761A24502EDc9e728Bd3f1413D5f816Bb8Ac0',
          twap: '0x264761A24502EDc9e728Bd3f1413D5f816Bb8Ac0',
        },
      },
      migratorAddress: {
        default: '0xe09346241c8d52836e7410f43ff6345baae352a9',
        staging: undefined,
      },
      positionKeyHelper: {
        default: '',
        [Dex.Quickswap]: '0xcF2FFf42c3e7eB53E965eA0CeE23AD52543348f6',
        [Dex.Retro]: '0xbDF46441E57Cb9b068f9Fa63e6840Acf8dD8Ac32',
      },
      swapProxy: {
        default: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        staging: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        twap: {
          default: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
          staging: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
        },
        [Dex.Retro]: { default: '' },
        [Dex.Sushiswap]: { default: '0xC52858F9cAb15232ff27ddEE0EcEb07099746749' },
        [Dex.Quickswap]: {
          default: '0x1982a7Ecc9D9CdD84383AE938555CCA0409e81f1',
          twap: '0x5C58CcBA8B6f159DA8C387FF59FFC5dE09396898',
        },
      },
    },
    limitOrderGelato: {
      pokeMeAddress: '0x527a819db1eb0e34426297b03bae11f2f8b3a19e',
      taskTreasuryAddress: '0xa8a7bbe83960b29789d5cb06dcd2e6c1df20581c',
      resolverFactoryAddress: {
        default: '0x7d8aa0815d8fc9b8b87144beada801c5afbc86ba',
        staging: '0x41bc13b094bdcec0817491b6761f61d2d6e5a0e2',
        twap: {
          default: '0x545bda75bc944b47767d1d13ca5e0cd1bf091b2f',
          staging: '0xc18f2b1d56a4b958594ffde81b507f6300b0c380',
        },
      },
    },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: {
      linkToken: '',
      tickLens: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573 ',
      singleSidedWrapper: {
        default: '0x60ABD2fb7A3074DaA227d3C53D7C73D55ca76598',
        [Dex.Quickswap]: '0x99B322f80814487e891236FaE4ec5323e7AFE8a2',
      },
      singleSidedWrapperSwapProxy: {
        default: '0x2Ee4bf700aFE9F3675e3E95B684F1F3f54a17011',
        [Dex.Quickswap]: '0x7Df50FDc80358f1668cB3cC192C4515ec0Db9fDa',
      },
    },
  },
  [ChainId.mainnet]: {
    defiEdge: {
      factoryAddress: {
        default: '0xa631c80f5f4739565d8793cab6fd08812ce3337d',
        staging: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        twap: {
          default: '0xeeff8227ed1600e59787d9767485ba905f2f07c3',
          staging: '0x055405f46344447efd7f771c747a5d09a81413fd',
        },
      },
      oracleAddress: '0x748b4404dccef46a51dba99271e4150cfc6737ec',
      chainLinkRegistryAddress: '0xb89319a57fc0e542992cc23c1a4c97832c67700e',
      liquidityHelperAddress: {
        default: '0x34e001532d9bb140d43ee5a6abc7b790da85d540',
        staging: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
      },
      migratorAddress: {
        default: '0xe09346241c8d52836e7410f43ff6345baae352a9',
        twap: '0x63be5cebcffa32b1dfd344562d8c5a06bcf051ef',
        staging: undefined,
      },
      swapProxy: {
        default: '',
        staging: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
      },
    },
    limitOrderKeeper: {
      resolverFactoryAddress: '',
      pokeMeAddress: '',
      taskTreasuryAddress: '',
    },
    limitOrderGelato: {
      pokeMeAddress: '0xb3f5503f93d5ef84b06993a1975b9d21b962892f',
      taskTreasuryAddress: '0x2807b4ae232b624023f87d0e237a3b1bf200fd99',
      resolverFactoryAddress: {
        default: '0xc6364f745be7dbe6c1ccc3b39d708edfeafed54f',
        twap: '0xb8f6b698e77955f95d3a83c2249bbdc52398f10f',
      },
    },
    others: { linkToken: '' },
  },
  [ChainId.optimism]: {
    defiEdge: {
      factoryAddress: {
        default: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        staging: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        twap: {
          default: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
          staging: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
        },
      },
      oracleAddress: '0x5bb95d1b824bddd1e7fbf6e011ed3bc21dcbcf11',
      chainLinkRegistryAddress: '0x7deb95eb81b25e50400271b478b5766bf74579c2',
      liquidityHelperAddress: {
        default: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        staging: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        twap: {
          default: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
          staging: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        },
      },
      migratorAddress: {
        default: '0xe09346241c8d52836e7410f43ff6345baae352a9',
        staging: undefined,
      },
      swapProxy: {
        default: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        staging: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        twap: {
          default: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
          staging: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
        },
      },
    },
    limitOrderGelato: {
      resolverFactoryAddress: {
        default: '0x58b8062d2c4966c70c905c0e8d1655d0986c3cdc',
        staging: '0xa0eaf1f7b8f386c8a1ca43995130209fae3f6c71',
        twap: {
          default: '0xeaaeeb43470a9cf8fa7f0f5495e65a03424ab661',
          staging: '0xb74fa1bbae6aa9294658ac5a2773de6f406d3841',
        },
      },
      pokeMeAddress: '0x340759c8346a1e6ed92035fb8b6ec57ce1d82c2c',
      taskTreasuryAddress: '0xb3f5503f93d5ef84b06993a1975b9d21b962892f',
    },
    limitOrderKeeper: {
      resolverFactoryAddress: '0xae25ad53b387504b879d04bc731ead01079371c9',
      registryAddress: '0x75c0530885f385721fdda23c539af3701d6183d4',
      registrarAddress: '0x4f3af332a30973106fe146af0b4220bbbea748ec',
    },
    others: { linkToken: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6' },
  },
  [ChainId.bsc]: {
    defiEdge: {
      factoryAddress: {
        default: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        staging: '0x6C83886D3ed9a1a4Cfa07581EadD6B439E78A862',
        twap: {
          default: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
          staging: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
        },
        [Dex.Apeswap]: {
          default: '0x54ba7b033fe40d44b2eb22bf4a5d19e6d6308591',
          twap: '0x5854d5ea3d9cbde4dc28aa9b2c621c457ac6b9cc',
        },
        [Dex.Pancakeswap]: {
          default: '0xcf1E03E4046bc8867865f8BAE4C7aaeD9B8ABb63',
          twap: '0x26Dc9BE8c0546C91327D3CCbA6956c5F6C369288',
        },
        [Dex.Thena]: {
          default: '0x857CDCb4f4938503C2a53de08B407AeCC735ae2A',
          twap: '0x657761B0040ea03ce668C3a392DA6A1751c43331',
        },
      },
      migratorAddress: '0xd66c919058eacb989a7cc73b79d558e09774a993',
      chainLinkRegistryAddress: '0xb8f51c936c28eaeb928ed9d3b3ba02cfcecd8e25',
      oracleAddress: '0xf85795e865485176c1309c04e707c571b26b9863',
      liquidityHelperAddress: {
        default: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        staging: '0xC2f41E6EA5e4759566e4806F5AFD57394955c92c',
        [Dex.Apeswap]: '0x6b47052b21f0976d189956661774242b26802ce4',
        [Dex.Pancakeswap]: '0x7bc7B1449B5da360aCb3029038188561058d7B25',
        [Dex.Thena]: {
          default: '0xE77FA4C5521EE2287667F2C9b0Ab022F2f639cEd',
          twap: '0xE77FA4C5521EE2287667F2C9b0Ab022F2f639cEd',
        },
      },
      positionKeyHelper: {
        default: '',
        staging: '',
        [Dex.Apeswap]: { default: '' },
        [Dex.Pancakeswap]: { default: '' },
        [Dex.Thena]: '0x0FF3Ad203510986190e12fBBcC0b076F4553b6Ea',
      },
      swapProxy: {
        default: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        staging: '0x20e61ae91139516Ae35B9d0153861E27e5166DF0',
        twap: {
          default: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
          staging: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
        },
        [Dex.Apeswap]: { default: '' },
        [Dex.Thena]: {
          default: '0x4A36a3eD0b9cb1EAB211079d1122e28dEf0EE9bE',
          twap: '0xA9d17d26DD9c608325D337dfdC73D7A785D0c897',
        },
        [Dex.Pancakeswap]: {
          default: '0xAC6E255857dd92f93d440BFbD20dBcceB8982Fa2',
          twap: '0xeeBf6773Ec00723ce66277B892bD3528BcaAd2C9',
        },
      },
    },
    limitOrderGelato: {
      resolverFactoryAddress: {
        default: '0xd102414864bd55b569cad804f016baa61e1730de',
        [Dex.Pancakeswap]: {
          default: '0xd9e3a4d96f7f0ddc164f6e47912fb3d06eea41b3',
          twap: '0x869cf9b6cbf629595767f862ed36d6cd65185dca',
        },
        twap: {
          default: '0xea08ace6f7ebd06c7a411bd2c00338ccb0f0462f',
        },
      },
      pokeMeAddress: '0x527a819db1eb0e34426297b03bae11f2f8b3a19e',
      taskTreasuryAddress: '0x63c51b1d80b209cf336bec5a3e17d3523b088cdb',
    },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: {
      linkToken: '',
      tickLens: '0xD9270014D396281579760619CCf4c3af0501A47C',
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
      swapProxy: {
        default: '0x38944499Ea91De6184fD25F0701274154a0Ce34A',
        twap: '0x38944499Ea91De6184fD25F0701274154a0Ce34A',
      },
      positionKeyHelper: '0x55f92dFc651D308436BeAF79585321d8Ca73A073',
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: {
      pokeMeAddress: '0x6c3224f9b3fee000a444681d5d45e4532d5ba531',
      resolverFactoryAddress: '',
    },
    others: { linkToken: '' },
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
      swapProxy: {
        default: '',
        twap: '',
        [Dex.Fusionx]: {
          default: '0x10129AE6Bbb29DE424733ee17dE08aE28A58C64A',
          twap: '0xEDAd36f5Ee536F032b5AC03B3C535454E1E6D376',
        },
      },
      quoter: '0x90f72244294E7c5028aFd6a96E18CC2c1E913995',
      positionKeyHelper: '0x876cCF15555DA67510707c751EbcAC65cee48Bbb',
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },
  [ChainId.base]: {
    defiEdge: {
      factoryAddress: {
        default: '0x6e5837bb5C18Db65383bC12B69520533cBBE4dD5',
        staging: '0x6e5837bb5C18Db65383bC12B69520533cBBE4dD5',
        twap: {
          default: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
          staging: '0x7F26946bdC8faEa2496115Fe043F61b3C8DED2c3',
        },
        [Dex.Pancakeswap]: {
          default: '0x48D365550245a209d2A1F06244b6d8549C928C62',
          twap: '0x7a655548e8A06be96c2aD371346aB402d1541048',
        },
        [Dex.Baseswap]: {
          default: '0x39869aD930E53C859cf611a503534b67803E6a44',
          twap: '0x9E1650DCCa7377306a1f2F832549559AeF27903f',
        },
      },
      oracleAddress: {
        default: '0xF165f9f256518C82882cD7b7002b0C046Ea5C2Fc',
        twap: '0xd15e8fAD8037b57b109cf31AFb3A70B94D712cBB',
        [Dex.Pancakeswap]: {
          default: '0xe3372aFd58a6cd3DE9927Fb56E3783D0bA6eDeEB',
          staging: '0xe3372aFd58a6cd3DE9927Fb56E3783D0bA6eDeEB',
          twap: '0x3afBA71C36Ac7343B816d6a02A724918c71C50e3',
        },
        [Dex.Baseswap]: {
          default: '0xD042ef1882F32B6A4a704CB406Bd9f963f709119',
          twap: '0x89F877407EA8518f678825C45F706Bec5A8B94A6',
        },
      },
      chainLinkRegistryAddress: {
        default: '0x18E2C78e52399A9AA077CF4Aa3062c85870fB4Ea',
      },
      liquidityHelperAddress: {
        default: '0x6E9149617D54401C12bDd7050538d8aC4CE81dF5',
        [Dex.Pancakeswap]: {
          default: '0xde6Fd20C3e4d6C3fee837A4D239ee9117E9C0D63',
        },
        [Dex.Baseswap]: {
          default: '0xC80DA0435affBa5bC0eA35D8a802eBCBd669AB4A',
        },
      },
      swapProxy: {
        default: '0x10ED9De0c9487B679Af2f27363A302F82f40d2eB',
        twap: {
          default: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
          staging: '0xf0ed05DCb1EE9B4C3716622179dcB659DC5166d7',
        },
        [Dex.Pancakeswap]: {
          default: '0x74E07B29e0b7EEb5Bc19eb566d72F8523a9B3Dc2',
          twap: '0x2cEFC4d36462Ff77713BcAd366cFB65238F4fD02',
        },
        [Dex.Baseswap]: {
          default: '0x1dde63e1c2D60f3fD2294279F86f4cAB4A72dcfe',
          twap: '0x604A992Bcfd3218bD1f5AC1dF01071DD47Cdb2a0',
        },
      },
      positionKeyHelper: {
        default: '0xb9d226F9c660F24CB0E08804C020e08c783bC726',
      },
      quoter: {
        default: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
        [Dex.Baseswap]: {
          default: '0x4fDBD73aD4B1DDde594BF05497C15f76308eFfb9',
        },
      },
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },

  [ChainId.avalanche]: {
    defiEdge: {
      factoryAddress: {
        default: '',
        [Dex.Pangolin]: {
          default: '0x4d9AF7DbdAF9aB14b64EadF012fE25019D093B2A',
          twap: '0x7fBf00017c094e6b9398e27A105EcA71D3D2ACbB',
        },
      },
      oracleAddress: {
        default: '0x1a2BBc875624bFAC848e236a1AE080F0D39b0929',
        twap: '0xaDF7AcB68985789ca494D9e2AD7656E315359e1e',
      },
      chainLinkRegistryAddress: '0xD7cf8Dc79b15a61714061C5B7A1c12ddE9f3f088',
      liquidityHelperAddress: {
        default: '',
        [Dex.Pangolin]: {
          default: '0x3A2FBC329F429B0D780E2C730e9547d8D3fB382a',
        },
      },
      swapProxy: {
        default: '',
        [Dex.Pangolin]: {
          default: '0x5e6d6e83D4Ee22A4B7a1931aE515EA4D9249790F',
          twap: '0xacD58E20e82c79319DF320Fe3FCdbAB93EFDAEBE',
        },
      },
      positionKeyHelper: '0x2b857BFedAF65C8422663e5c6E4fe12a6FE4853A',
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },
  [ChainId.zksyncEra]: {
    defiEdge: {
      factoryAddress: {
        default: '',
        [Dex.Pancakeswap]: {
          default: '0x836AbBfA48d73D337bCfF946608582F070987CA2',
          twap: '0x860B5F58AF34A94553cfD729884f0523Dd73bE4D',
        },
      },
      oracleAddress: {
        default: '0xa04Cd6752aF6228D640932e38d7535CEa11Cee0a',
      },
      chainLinkRegistryAddress: '0xf087c864AEccFb6A2Bf1Af6A0382B0d0f6c5D834',
      liquidityHelperAddress: {
        default: '',
        [Dex.Pancakeswap]: {
          default: '0x3861a86D2997Db6417Bb950e33be0a96840A70d1',
        },
      },
      swapProxy: {
        default: '',
        [Dex.Pancakeswap]: {
          default: '0xdAd7E19020b244b9003B877ceBb761D521d83dF2',
          twap: '0x978E24d7b05d1AdA8Bdb3e2E6E4145AEb174d49f',
        },
      },
      quoter: '0x3d146FcE6c1006857750cBe8aF44f76a28041CCc',
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },
  [ChainId.zkEVM]: {
    defiEdge: {
      factoryAddress: {
        default: '',
        [Dex.Pancakeswap]: {
          default: '0xd27794501d2ae4B462721A0afcA73F63664D7bC0',
          twap: '0x7a655548e8A06be96c2aD371346aB402d1541048',
        },
        [Dex.Quickswap]: {
          default: '0xF9aa1ED3F3fDB44AD3002B137f1C0e65748D24bA',
          twap: '0xF78b817629B6934dCede115ECc3A550f56CC2593',
        },
      },
      oracleAddress: {
        default: '0x80eD838F75398075c09996342E4a3035570a65EF',
      },
      chainLinkRegistryAddress: '0x84C51D6eA7853dcE4496f10e55D03eD1c7c2553F',
      liquidityHelperAddress: {
        default: '',
        [Dex.Pancakeswap]: {
          default: '0x0a472a9ebDbfACACf078ea4b74E253ADe18C5Eb1',
          twap: '0x0a472a9ebDbfACACf078ea4b74E253ADe18C5Eb1',
        },
        [Dex.Quickswap]: {
          default: '0x6084A5D0Cb75cB9Ac105Ce6862a48630d0ed0c93',
          twap: '0x6084A5D0Cb75cB9Ac105Ce6862a48630d0ed0c93',
        },
      },
      swapProxy: {
        default: '',
        [Dex.Pancakeswap]: {
          default: '0xCcCd6146C2ac73fD39aDE09D7AbAB32aAC36395d',
          twap: '0x2cEFC4d36462Ff77713BcAd366cFB65238F4fD02',
        },
        [Dex.Quickswap]: {
          default: '0x812D39540235A1DF59B5C755aF87127e97Dd177F',
          twap: '0xF7A5406Dfdb716bF685f5fECdEbB1498581e9770',
        },
      },
      positionKeyHelper: {
        default: '',
        [Dex.Pancakeswap]: { default: '0x9B8610ED453d1ae69B8FCfBe5ea14324f711D3f5' },
        [Dex.Quickswap]: { default: '0x9B8610ED453d1ae69B8FCfBe5ea14324f711D3f5' },
      },
      quoter: {
        default: '',
        [Dex.Pancakeswap]: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
        [Dex.Quickswap]: '0xB18FB423Fb241CE0DE345d74904f97D60792FFd8',
      },
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },
  [ChainId.linea]: {
    defiEdge: {
      factoryAddress: {
        default: '',
        [Dex.Lynex]: {
          default: '0xeeBf6773Ec00723ce66277B892bD3528BcaAd2C9',
          twap: '0xACF0a28CA0b8C8D40FDC9fe2FDbCCDE45c0a3773',
        },
      },
      oracleAddress: {
        default: '0xbf05E64C4aD096a24b71aC126bbD31f9Ea449C0c',
      },
      chainLinkRegistryAddress: '0xF9aa1ED3F3fDB44AD3002B137f1C0e65748D24bA',
      liquidityHelperAddress: {
        default: '',
        [Dex.Lynex]: {
          default: '0x158A4FB9c385BfEB707dB3318593B1b4A9E17864',
        },
      },
      swapProxy: {
        default: '',
        [Dex.Lynex]: {
          default: '0xC1F9883Ef49b69c2D17383072d32a50dea7A9ACd',
          twap: '0x76Fd111886fB32B1a6d4bb910068d66b6ab25404',
        },
      },
      positionKeyHelper: {
        default: '',
        [Dex.Lynex]: { default: '0x6f66CccbC1794c59311FadDbC905884Ae655a2E2' },
      },
      quoter: '0xcE829655b864E56fc34B783874cf9590053A0640',
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },
  [ChainId.xLayer]: {
    defiEdge: {
      factoryAddress: {
        default: '',
        [Dex.Quickswap]: {
          default: '0x903119b94BE2d4977c45AFf9576D6DE2af3CA912',
          twap: '0xF7A5406Dfdb716bF685f5fECdEbB1498581e9770',
        },
      },
      oracleAddress: {
        default: '0x2f636b5cE785c3D76266e127926ba14B46E74c14',
      },
      chainLinkRegistryAddress: '0xcF2eF975B1F81b19B469F603977708e9De1D80b2',
      liquidityHelperAddress: {
        default: '',
        [Dex.Quickswap]: {
          default: '0x7453D091f19FA3cABc00c01641E4F39Df37Cde96',
        },
      },
      swapProxy: {
        default: '',
        [Dex.Quickswap]: {
          default: '0xDfC0E92b6c829Ba33D4C9970EF61B4B94c1dC88B',
          twap: '0x559967D5E960fc4403b7D47C592D51104ec329a6',
        },
      },
      positionKeyHelper: {
        default: '',
        [Dex.Quickswap]: { default: '0x474c90301B080fd8929dBBA2a79369fA83c81a71' },
      },
      quoter: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    limitOrderGelato: { resolverFactoryAddress: '' },
    limitOrderKeeper: { resolverFactoryAddress: '' },
    others: { linkToken: '' },
  },
};

export default addressConfig;
