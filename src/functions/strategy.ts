// eslint-disable-next-line import/no-unresolved
import { request, gql } from 'graphql-request';
import { SupportedChainId } from '../types';
import { StrategyQueryData } from '../types/strategyQueryData';
import { StrategyMetaQuery } from '../types/strategyMetaQuery';

const promises: Record<string, Promise<any>> = {};

const urls: Record<SupportedChainId, string> = {
  [SupportedChainId.arbitrum]: 'https://api.thegraph.com/subgraphs/name/pranavraut033/defiedge-arbitrum',
  [SupportedChainId.mainnet]: 'https://api.thegraph.com/subgraphs/name/pranavraut033/defiedge',
  [SupportedChainId.optimism]: 'https://api.thegraph.com/subgraphs/name/pranavraut033/defiedge-optimism',
  [SupportedChainId.polygon]: 'https://api.thegraph.com/subgraphs/name/pranavraut033/defiedge-polygon',
  [SupportedChainId.bsc]: 'https://api.thegraph.com/subgraphs/name/pranavraut033/defiedge-bsc',
};

const APP_URL = 'https://api.defiedge.io';

const strategyQuery = gql`
  query ($strategyAddress: String!) {
    strategy(id: $strategyAddress) {
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
      rebalance(orderBy: timestamp, orderDirection: desc) {
        timestamp
        gasUsed
        ranges {
          amount0
          amount1
          tickLower
          tickUpper
        }
      }
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
