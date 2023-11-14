// eslint-disable-next-line import/no-unresolved
import { request, gql } from 'graphql-request';
import { SupportedChainId } from '../types';
import { StrategyQueryData } from '../types/strategyQueryData';
import { StrategyMetaQuery } from '../types/strategyMetaQuery';

const promises: Record<string, Promise<any>> = {};

const urls: Record<SupportedChainId, string> = {
  [SupportedChainId.arbitrum]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-arbitrum',
  // [SupportedChainId.avalanche]: 'https://api.thegraph.com/subgraphs/name/unbound-finance/avalanche-staging',
  [SupportedChainId.base]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-base',
  [SupportedChainId.bsc]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-bsc',
  [SupportedChainId.mainnet]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-mainnet',
  [SupportedChainId.mantle]: 'https://graph.fusionx.finance/subgraphs/name/unbound-finance/mantle-staging',
  [SupportedChainId.moonbeam]: 'https://api.thegraph.com/subgraphs/name/unbound-finance/moonbeam-staging',
  [SupportedChainId.optimism]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-optimism',
  [SupportedChainId.polygon]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-polygon',
};

const APP_URL = 'https://api.defiedge.io';

const strategyQuery = gql`
  query ($strategyAddress: String!) {
    strategy(id: $strategyAddress, subgraphError: allow) {
      id
      name
      hash
      pool
      createdAtTimestamp
      amount0
      amount1
      unusedAmount0
      unusedAmount1
      shares
      owner
      userCount
      feeTier
      collectedFeesToken0
      type
      collectedFeesToken1
      onHold
      dex
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
      # adds(first: 1000) {
      #   id
      #   timestamp
      #   user {
      #     id
      #   }
      #   amount0
      #   amount1
      # }
      # removes(first: 1000) {
      #   id
      #   timestamp
      #   user {
      #     id
      #   }
      #   amount0
      #   amount1
      # }
      # rebalance(orderBy: timestamp, orderDirection: desc, first: 1) {
      #   timestamp
      #   gasUsed
      #   ranges {
      #     amount0
      #     amount1
      #     tickLower
      #     tickUpper
      #   }
      # }
    }
    # fees(where: { strategy: $strategyAddress }, first: 1000) {
    #   id
    #   timestamp
    #   amount0: collectedFeesToken0
    #   amount1: collectedFeesToken1
    # }
  }
`;

const strategyMetaQuery = gql`
  query strategyMetadata($strategyAddress: String!, $network: Network!) {
    strategy(where: { network_address: { address: $strategyAddress, network: $network } }) {
      id
      title
      subTitle
      description
      updatedAt
      network
      sharePrice
      address
      aum
      createdAt
      dex
      feesApr: fees_apr {
        USD
        BTC
        MATIC
        ETH
      }
      sevenDayApy: seven_day_apy {
        USD
        BTC
        MATIC
        ETH
      }
      sinceInception: since_inception {
        USD
        BTC
        MATIC
        ETH
      }
      oneDayApy: one_day_apy {
        USD
        BTC
        MATIC
        ETH
      }
    }
  }
`;

/**
 * Retrieves the metadata for a strategy.
 *
 * @param {SupportedChainId} chainId - The chain ID of the strategy.
 * @param {string} strategyAddress - The address of the strategy.
 * @return {Promise<StrategyMetaQuery['strategy']>} A promise that resolves to the strategy metadata.
 */
export async function getStrategyMetaData(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<StrategyMetaQuery['strategy']> {
  const key = `${chainId + strategyAddress}-meta`;

  if (Object.prototype.hasOwnProperty.call(promises, key)) return promises[key];

  promises[key] = request<StrategyMetaQuery, { strategyAddress: string; network: string }>(
    `${APP_URL}/graphql`,
    strategyMetaQuery,
    {
      strategyAddress,
      network: Object.entries(SupportedChainId).find((e) => e[1] === chainId)![0],
    },
  )
    .then((e) => e.strategy)
    .finally(() => setTimeout(() => delete promises[key], 2 * 60 * 100 /* 2 mins */));

  // eslint-disable-next-line no-return-await
  return await promises[key];
}

export async function getStrategyInfo(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<StrategyQueryData['strategy']> {
  const key = `${chainId + strategyAddress}-info`;

  if (Object.prototype.hasOwnProperty.call(promises, key)) return promises[key];

  promises[key] = request<StrategyQueryData, { strategyAddress: string }>(urls[chainId], strategyQuery, {
    strategyAddress,
  })
    .then(({ strategy }) => strategy)
    .finally(() => setTimeout(() => delete promises[key], 2 * 60 * 100 /* 2 mins */));

  // eslint-disable-next-line no-return-await
  return await promises[key];
}

export async function getStrategyDetails(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<StrategyQueryData['strategy'] & StrategyMetaQuery> {
  const key = `${chainId + strategyAddress}-both`;

  if (Object.prototype.hasOwnProperty.call(promises, key)) return promises[key];

  promises[key] = Promise.all([
    getStrategyInfo(chainId, strategyAddress),
    getStrategyMetaData(chainId, strategyAddress),
  ])
    .then(([a, b]) => ({ ...a, ...b }))
    .finally(() => setTimeout(() => delete promises[key], 2 * 60 * 100 /* 2 mins */));

  // eslint-disable-next-line no-return-await
  return promises[key];
}
