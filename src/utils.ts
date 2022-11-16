import { MicroCMSQueries } from 'microcms-js-sdk';
import { GetListQueries, GetQueries } from './types';

export const queryParser = <T>(queries: GetQueries<T> | GetListQueries<T>): MicroCMSQueries => {
  return { ...queries, fields: queries.fields?.map((v) => String(v)) };
};
