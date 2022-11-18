import { MicroCMSQueries } from 'microcms-js-sdk';
import { GetListQueries, GetListDetailQueries, GetObjectQueries } from './types';

export const queryParser = <T>(
  queries: GetListDetailQueries<T> | GetListQueries<T> | GetObjectQueries<T>
): MicroCMSQueries => {
  return { ...queries, fields: queries.fields?.map((v) => String(v)) };
};
