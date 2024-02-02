import type { MicroCMSListContent } from 'microcms-js-sdk';

/** Relation Type */
export type MicroCMSRelation<T> = T & MicroCMSListContent;

/** Endpoints Type */
export type MicroCMSEndpoints = {
  list: {
    [key: string]: any;
  };
  object: {
    [key: string]: any;
  };
};
