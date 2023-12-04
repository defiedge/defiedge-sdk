/* eslint-disable camelcase */
// Generated by https://quicktype.io

export interface StrategyMetaQuery {
  strategy: Strategy;
}

type Currency = 'USD' | 'BTC' | 'MATIC' | 'ETH';

export interface Strategy {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  updatedAt: string;
  network: string;
  sharePrice: number;
  address: string;
  aum: number;
  createdAt: string;
  fees_apr_usd: number;
  seven_day_apy_usd: number;
  one_day_apy_usd: number;
  since_inception_usd: number;
  feesApr: Record<Currency, number>;
  sevenDayApy: Record<Currency, number>;
  sinceInception: Record<Currency, number>;
  oneDayApy: Record<Currency, number>;
}
