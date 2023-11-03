import { MicroCMSListContent, MicroCMSListResponse, MicroCMSObjectContent } from 'microcms-js-sdk';

/** ListAPI Endpoint Type */
export type MicroCMSListAPI<T> = MicroCMSListResponse<T>;

/** ObjectAPI Endpoint Type */
export type MicroCMSObjectAPI<T> = T & MicroCMSObjectContent;

/** Relation Type */
export type MicroCMSRelation<T> = T & MicroCMSListContent;

/** Endpoints Type */
export type MicroCMSEndpoints = {
  [key: string]: MicroCMSListAPI<any> | MicroCMSObjectAPI<any>;
};
