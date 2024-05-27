// eslint-disable-next-line import/no-unresolved
import { gql, request } from 'graphql-request';

import crossFetch, { Request } from 'cross-fetch';
import { StrategyMetaQuery } from '../types/strategyMetaQuery';
import { StrategyQueryData } from '../types/strategyQueryData';
import { SupportedChainId } from '../types';
import CACHE, { TEN_MINUTES } from '../utils/Cache';

const urls: Record<SupportedChainId, string> = {
  [SupportedChainId.arbitrum]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-arbitrum',
  [SupportedChainId.avalanche]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-avalanche',
  [SupportedChainId.base]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-base',
  [SupportedChainId.bsc]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-bsc',
  [SupportedChainId.linea]: 'https://api.studio.thegraph.com/query/58813/defiedge-linea/version/latest',
  [SupportedChainId.mainnet]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-mainnet',
  [SupportedChainId.mantle]: 'https://graph.fusionx.finance/subgraphs/name/unbound-finance/mantle-staging',
  [SupportedChainId.moonbeam]: 'https://api.thegraph.com/subgraphs/name/unbound-finance/moonbeam-staging',
  [SupportedChainId.optimism]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-optimism',
  [SupportedChainId.polygon]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-polygon',
  [SupportedChainId.xLayer]: 'https://api.studio.thegraph.com/query/58813/defiedge-xlayer/version/latest',
  [SupportedChainId.zkEVM]: 'https://api.studio.thegraph.com/query/58813/defiedge-zkevm/version/latest',
  [SupportedChainId.zksyncEra]: 'https://api.thegraph.com/subgraphs/name/defiedge/defiedge-zksync-era',
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
      address
      aum
      createdAt
      description
      dex
      fees_apr_usd
      id
      network
      one_day_apy_usd
      seven_day_apy_usd
      sharePrice
      since_inception_usd
      subTitle
      title
      updatedAt
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
export function getStrategyMetaData(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<StrategyMetaQuery['strategy']> {
  const key = `${chainId + strategyAddress}-meta`;

  return CACHE.getOrSet(
    key,
    request<StrategyMetaQuery, { strategyAddress: string; network: string }>(`${APP_URL}/graphql`, strategyMetaQuery, {
      strategyAddress,
      network: Object.entries(SupportedChainId).find((e) => e[1] === chainId)![0],
    })
      .then((e) => ({
        ...e.strategy,
        feesApr: { USD: e.strategy.fees_apr_usd },
        sevenDayApy: { USD: e.strategy.seven_day_apy_usd },
        sinceInception: { USD: e.strategy.since_inception_usd },
        oneDayApy: { USD: e.strategy.one_day_apy_usd },
      }))
      .catch((e) => {
        try {
          const { strategy } = JSON.parse(e.response.error).data;

          return {
            ...strategy,
            feesApr: { USD: strategy.fees_apr_usd },
            sevenDayApy: { USD: strategy.seven_day_apy_usd },
            sinceInception: { USD: strategy.since_inception_usd },
            oneDayApy: { USD: strategy.one_day_apy_usd },
          };
        } catch {
          throw e;
        }
      }),
  );
}

/**
 * Retrieves the information of a strategy.
 *
 * @param {SupportedChainId} chainId - The chain ID of the strategy.
 * @param {string} strategyAddress - The address of the strategy.
 * @return {Promise<StrategyQueryData['strategy']>} A promise that resolves to the strategy information.
 */
export function getStrategyInfo(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<StrategyQueryData['strategy']> {
  return CACHE.getOrSet(
    `${chainId + strategyAddress}-info`,
    request<StrategyQueryData, { strategyAddress: string }>(urls[chainId], strategyQuery, {
      strategyAddress,
    }).then(({ strategy }) => strategy),
  );
}

export function getSSDStrategies(): Promise<Record<SupportedChainId, string[]>> {
  return CACHE.getOrSet(
    'ssw-strategies',
    crossFetch(new Request(`${APP_URL}/single-sided-deposit-strategies`)).then((e) => e.json()),
    TEN_MINUTES,
  );
}

/**
 * Retrieves the details of a strategy, including its information and metadata.
 *
 * @param {SupportedChainId} chainId - The chain ID of the strategy.
 * @param {string} strategyAddress - The address of the strategy.
 * @return {Promise<StrategyQueryData['strategy'] & StrategyMetaQuery>} A promise that resolves to the strategy details.
 */
export function getStrategyDetails(
  chainId: SupportedChainId,
  strategyAddress: string,
): Promise<StrategyQueryData['strategy'] & StrategyMetaQuery['strategy']> {
  const key = `${chainId + strategyAddress}-both`;

  return CACHE.getOrSet(
    key,
    Promise.all([getStrategyInfo(chainId, strategyAddress), getStrategyMetaData(chainId, strategyAddress)]).then(
      ([a, b]) => ({ ...a, ...b }),
    ),
  );
}
