import { getAddress } from '@ethersproject/address';
import { SignerOrProvider } from '../types';
import {
  Strategy,
  StrategyManager,
  StrategyManager__factory as StrategyManagerFactory,
  Strategy__factory as StrategyFactory,
  ERC20__factory as ERC20Factory,
  ERC20,
  Pool,
  Pool__factory as PoolFactory,
} from '../../abis/types';

function getStrategyContract(address: string, signerOrProvider: SignerOrProvider): Strategy {
  getAddress(address);
  return StrategyFactory.connect(address, signerOrProvider);
}

function getStrategyManagerContract(address: string, signerOrProvider: SignerOrProvider): StrategyManager {
  getAddress(address);
  return StrategyManagerFactory.connect(address, signerOrProvider);
}

function getERC20Contract(address: string, signerOrProvider: SignerOrProvider): ERC20 {
  getAddress(address);
  return ERC20Factory.connect(address, signerOrProvider);
}

function getPoolContract(address: string, signerOrProvider: SignerOrProvider): Pool {
  getAddress(address);
  return PoolFactory.connect(address, signerOrProvider);
}

export { getStrategyContract, getERC20Contract, getPoolContract, getStrategyManagerContract };
