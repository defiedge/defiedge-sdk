import { getAddress } from '@ethersproject/address';
import { SignerOrProvider } from '../types';
import {
  Strategy,
  StrategyManager,
  StrategyManager__factory as StrategyManagerFactory,
  Strategy__factory as StrategyFactory,
  ERC20__factory as ERC20Factory,
  ERC20,
  SingleSidedWrapper__factory as SingleSidedWrapperFactory,
  LiquidityHelper__factory as LiquidityHelperFactory,
  Pool,
  Pool__factory as PoolFactory,
  SingleSidedWrapper,
} from '../../abis/types';

/**
 * Retrieves the strategy contract for the given address.
 *
 * @param {string} address - The address of the strategy contract.
 * @param {SignerOrProvider} signerOrProvider - The signer or provider to use for interacting with the contract.
 * @return {Strategy} The strategy contract instance.
 */
function getStrategyContract(address: string, signerOrProvider: SignerOrProvider): Strategy {
  getAddress(address);
  return StrategyFactory.connect(address, signerOrProvider);
}

function getSingleSidedStrategyContract(address: string, signerOrProvider: SignerOrProvider): SingleSidedWrapper {
  getAddress(address);
  return SingleSidedWrapperFactory.connect(address, signerOrProvider);
}

/**
 * Retrieves the StrategyManager contract using the specified address and signer or provider.
 *
 * @param {string} address - The address of the StrategyManager contract.
 * @param {SignerOrProvider} signerOrProvider - The signer or provider used to interact with the contract.
 * @return {StrategyManager} The StrategyManager contract instance.
 */
function getStrategyManagerContract(address: string, signerOrProvider: SignerOrProvider): StrategyManager {
  getAddress(address);
  return StrategyManagerFactory.connect(address, signerOrProvider);
}

/**
 * Retrieves an ERC20 contract instance by providing the contract address and a signer or provider.
 *
 * @param {string} address - The address of the ERC20 contract.
 * @param {SignerOrProvider} signerOrProvider - The signer or provider to use for interacting with the contract.
 * @return {ERC20} - An instance of the ERC20 contract.
 */
function getERC20Contract(address: string, signerOrProvider: SignerOrProvider): ERC20 {
  getAddress(address);
  return ERC20Factory.connect(address, signerOrProvider);
}

/**
 * Returns a LiquidityHelperContract instance connected to the specified address and signer or provider.
 *
 * @param {string} address - The address of the LiquidityHelperContract.
 * @param {SignerOrProvider} signerOrProvider - The signer or provider object.
 * @return {LiquidityHelperContract} The instance of the LiquidityHelperContract connected to the specified address and signer or provider.
 */
function getLiquidityHelperContract(address: string, signerOrProvider: SignerOrProvider) {
  getAddress(address);
  return LiquidityHelperFactory.connect(address, signerOrProvider);
}

/**
 * Returns a Pool contract instance connected to the specified address using the provided
 * signer or provider.
 *
 * @param {string} address - The address of the Pool contract.
 * @param {SignerOrProvider} signerOrProvider - The signer or provider to use for connecting
 *                                              to the contract.
 * @return {Pool} The Pool contract instance.
 */
function getPoolContract(address: string, signerOrProvider: SignerOrProvider): Pool {
  getAddress(address);
  return PoolFactory.connect(address, signerOrProvider);
}

export {
  getERC20Contract,
  getLiquidityHelperContract,
  getPoolContract,
  getSingleSidedStrategyContract,
  getStrategyContract,
  getStrategyManagerContract,
};
