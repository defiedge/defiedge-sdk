/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import 'dotenv/config';

import HDWalletProvider from '@truffle/hdwallet-provider';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { SupportedChainId } from '../types';
import STRATEGY_ABI from '../abis/Strategy.json';
import {
  removeLP,
  depositLP,
  getUserDeshareBalance,
  getLiquidityRatio,
  getStrategyMetaData,
  getStrategyInfo,
  isStrategyTokenApproved,
  approveStrategyToken,
  getRanges,
  getLiquidity,
} from '../index';
import formatBigInt from '../utils/formatBigInt';

const DEFAULT_REGISTRY: Record<SupportedChainId, string> = {
  // [SupportedChainId.a]: '',
  // [SupportedChainId.CELO_MAINNET]: 'https://forno.celo.org',
  // [SupportedChainId.FANTOM_OPERA_MAINNET]: 'https://rpc.ftm.tools/',
  // [SupportedChainId.GNOSIS_MAINNET]: 'https://rpc.gnosischain.com/',
  // [SupportedChainId.HARMONY_MAINNET]: 'https://harmony.public-rpc.com',
  // [SupportedChainId.MOONRIVER_MAINNET]: 'https://rpc.moonriver.moonbeam.SupportedChainId',
  // [SupportedChainId.CRONOS_MAINNET]: 'https://evm-cronos.crypto.org',
  // [SupportedChainId.AURORA_MAINNET]: 'https://mainnet.aurora.dev',
  [SupportedChainId.arbitrum]: 'https://arb1.arbitrum.io/rpc',
  [SupportedChainId.avalanche]: 'https://avalanche.public-rpc.com',
  [SupportedChainId.base]: 'https://base.llamarpc.com',
  [SupportedChainId.bsc]: 'https://bsc-dataseed.binance.org/',
  [SupportedChainId.linea]: 'https://1rpc.io/linea',
  [SupportedChainId.mainnet]: 'https://eth-mainnet-public.unifra.io',
  // [SupportedChainId.mantle]: 'https://1rpc.io/mantle',
  [SupportedChainId.moonbeam]: 'https://endpoints.omniatech.io/v1/moonbeam/mainnet/public',
  [SupportedChainId.optimism]: 'https://mainnet.optimism.io',
  [SupportedChainId.polygon]: 'https://polygon-rpc.com',
  [SupportedChainId.xLayer]: 'https://rpc.xlayer.tech',
  [SupportedChainId.zkEVM]: 'https://1rpc.io/polygon/zkevm',
  [SupportedChainId.zksyncEra]: 'https://1rpc.io/zksync2-era',
};

const strategy = {
  address: '0x004ec957a099df21ca12b7f551111ee17157a4b4',
  chainId: SupportedChainId.arbitrum,
  name: 'arbitrum',
};

const hdWalletProvider = new HDWalletProvider([process.env.PRIVATE_KEY!], DEFAULT_REGISTRY[strategy.chainId], 0, 1);

const provider = new Web3Provider(hdWalletProvider, { chainId: strategy.chainId, name: strategy.name });
const account = '0xa6e0E2a242240d09D14De787FfE00C71E34fBE6E'; // process.env.ACCOUNT!;

const iface = new ethers.utils.Interface(STRATEGY_ABI);
const amount0 = 0;
const amount1 = 0.00000001;

describe('Strategy', () => {
  let share: string | null = null;

  it('getRanges', async () => {
    const ranges = await getRanges(strategy.address, provider);

    expect(ranges.length).toBeGreaterThan(0);
  });

  it('removeLP:all', async () => {
    const userShares = await getUserDeshareBalance(account, strategy.address, provider);

    if (+userShares <= 0) return;

    await removeLP(account, userShares, strategy.address, provider)
      .then((e) => e.wait())
      .then((a) => {
        const result: any = a.logs
          .map((e: any) => {
            try {
              return iface.parseLog(e);
            } catch (error) {
              return null;
            }
          })
          .find((e: any) => e && e.name === 'Burn')?.args;

        console.log('BURN:', result);
        expect(formatBigInt(result.share)).toEqual(share);
      });
  });

  it.skip('depositLp', async () => {
    const isApproved0 = await isStrategyTokenApproved(account, 0, amount0, strategy.address, provider);
    const isApproved1 = await isStrategyTokenApproved(account, 1, amount1, strategy.address, provider);

    let approve0: ethers.ContractTransaction | null = null;
    let approve1: ethers.ContractTransaction | null = null;

    if (!isApproved0) {
      approve0 = await approveStrategyToken(account, 0, strategy.address, provider, amount0);
      await approve0.wait();
    }

    if (!isApproved1) {
      approve1 = await approveStrategyToken(account, 1, strategy.address, provider, amount1);
      await approve1.wait();
    }

    const r = await depositLP(account, amount0, amount1, strategy.address, provider);
    const a = await r.wait();

    const result: any = a.logs
      .map((e: any) => {
        try {
          return iface.parseLog(e);
        } catch (error) {
          return null;
        }
      })
      .find((e: any) => e && e.name === 'Mint')?.args;

    console.log('MINT:', result);

    share = formatBigInt(result.share);
  });

  it('getUserDeshareBalance', async () => {
    const userShares = await getUserDeshareBalance(account, strategy.address, provider);

    expect(userShares).toEqual(share || '0');
  });

  it('getLiquidity', async () => {
    const liquidity = await getLiquidity(strategy.address, provider);

    expect(liquidity.amount0Total).toBeGreaterThanOrEqual(0);
    expect(liquidity.amount1Total).toBeGreaterThanOrEqual(0);
  });

  it('removeLP:deposited', async () => {
    if (!share) return;

    await removeLP(account, share, strategy.address, provider)
      .then((e) => e.wait())
      .then((a) => {
        const result: any = a.logs
          .map((e: any) => {
            try {
              return iface.parseLog(e);
            } catch (error) {
              return null;
            }
          })
          .find((e: any) => e && e.name === 'Burn')?.args;

        console.log('BURN:', result);
        expect(formatBigInt(result.share)).toEqual(share);
      });
  });

  it('getLiquidityRatio', async () => {
    const a = await getLiquidityRatio(strategy.address, provider);

    expect(a).toBeGreaterThanOrEqual(0);
  });
});

describe('GraphQL', () => {
  it('getStrategyMetaData', async () => {
    const a = await getStrategyMetaData(strategy.chainId, strategy.address);
    expect(a).toBeTruthy();
  });

  it('GetStrategyInfo', async () => {
    const a = await getStrategyInfo(strategy.chainId, strategy.address);
    expect(a).toBeTruthy();
  });
});
