/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import 'dotenv/config';

import HDWalletProvider from '@truffle/hdwallet-provider';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { formatEther } from '@ethersproject/units';
import { SupportedChainId } from '../types';
import STRATEGY_ABI from '../abis/Strategy.json';
import {
  removeLP,
  depositLP,
  getLiquidityRatio,
  getStrategyMetaData,
  getStrategyInfo,
  isStrategyTokenApproved,
  approveStrategyToken,
} from '../index';

const hdWalletProvider = new HDWalletProvider([process.env.PRIVATE_KEY!], 'https://bsc-dataseed1.binance.org', 0, 1);

const provider = new Web3Provider(hdWalletProvider, { chainId: SupportedChainId.bsc, name: 'bsc' });
const account = process.env.ACCOUNT!;

const strategy = {
  address: '0xb6e4664c6f6d0d09ef71882977048799baf472d1',
  chainId: SupportedChainId.bsc,
};

const iface = new ethers.utils.Interface(STRATEGY_ABI);
const amount0 = 0;
const amount1 = 0.00000001;

describe('Strategy', () => {
  let share: string;
  it('Strategy depositLp', async () => {
    const isApproved0 = await isStrategyTokenApproved(account, 0, amount0, strategy.address, provider);
    const isApproved1 = await isStrategyTokenApproved(account, 1, amount1, strategy.address, provider);

    let approve0: ethers.ContractTransaction | null = null;
    let approve1: ethers.ContractTransaction | null = null;

    console.log({ isApproved0, isApproved1 });

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

    share = formatEther(result.share);
  });

  it('Strategy removeLP', async () => {
    if (!share) return;

    expect(share).toEqual(share);
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
        expect(formatEther(result.share)).toEqual(share);
      });
  });

  it('LP ratio', async () => {
    const a = await getLiquidityRatio(strategy.address, provider);
    expect(a).toBeGreaterThanOrEqual(0);
  });

  it('getStrategyMetaData', async () => {
    const a = await getStrategyMetaData(strategy.chainId, strategy.address);
    expect(a).toBeTruthy();
  });
  it('GetStrategyInfo', async () => {
    const a = await getStrategyInfo(strategy.chainId, strategy.address);
    expect(a).toBeTruthy();
  });
});
