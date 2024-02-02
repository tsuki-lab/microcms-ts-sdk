import type {
  GetListDetailRequest as _GetListDetailRequest,
  GetListRequest as _GetListRequest,
  GetObjectRequest as _GetObjectRequest,
  GetAllContentIdsRequest as _GetAllContentIdsRequest,
  GetAllContentRequest as _GetAllContentRequest,
  MicroCMSQueries as _MicroCMSQueries,
  MicroCMSListContent,
  MicroCMSObjectContent
} from 'microcms-js-sdk';
import type { MicroCMSEndpoints, MicroCMSRelation } from './types';

// NOTE: Depth 1 only
export type ResolveQueryFieldsRelation<T, C> = {
  [K in keyof T]: T[K] extends infer Prop
    ? Prop extends MicroCMSRelation<infer U>
      ? `${Extract<K, string>}.${Extract<keyof U | keyof C, string>}` | K
      : Prop extends MicroCMSRelation<infer U>[]
        ? `${Extract<K, string>}.${Extract<keyof U | keyof C, string>}` | K
        : K
    : never;
}[keyof T];

// /////////////////////////////////
// /////////////////////////////////
// MicroCMS API Queries Types
// /////////////////////////////////
// /////////////////////////////////

/** .getListDetail() queries type */
export interface GetListDetailQueries<T>
  extends Omit<
    _MicroCMSQueries,
    'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'
  > {
  fields?: Extract<
    ResolveQueryFieldsRelation<T & MicroCMSListContent, MicroCMSListContent>,
    string
  >[];
}

/** .getList() queries type */
export interface GetListQueries<T> extends _MicroCMSQueries {
  fields?: Extract<
    ResolveQueryFieldsRelation<T & MicroCMSListContent, MicroCMSListContent>,
    string
  >[];
}

/** .getObject() queries type */
export interface GetObjectQueries<T>
  extends Omit<
    _MicroCMSQueries,
    'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'
  > {
  fields?: Extract<
    ResolveQueryFieldsRelation<T & MicroCMSObjectContent, MicroCMSObjectContent>,
    string
  >[];
}

/** .getAllContentIds() queries type */
export interface GetAllContentQueries<T>
  extends Omit<_MicroCMSQueries, 'limit' | 'offset' | 'ids'> {
  fields?: Extract<
    ResolveQueryFieldsRelation<T & MicroCMSListContent, MicroCMSListContent>,
    string
  >[];
}

// /////////////////////////////////
// /////////////////////////////////
// MicroCMS API Request Types
// /////////////////////////////////
// /////////////////////////////////

/** .getListDetail() request type */
export interface GetListDetailRequest<T extends MicroCMSEndpoints> extends _GetListDetailRequest {
  endpoint: Extract<keyof T['list'], string>;
  queries?: GetListDetailQueries<T['list'][this['endpoint']]>;
}

/** .getList() request type */
export interface GetListRequest<T extends MicroCMSEndpoints> extends _GetListRequest {
  endpoint: Extract<keyof T['list'], string>;
  queries?: GetListQueries<T['list'][this['endpoint']]>;
}

/** .getObject() request type */
export interface GetObjectRequest<T extends MicroCMSEndpoints> extends _GetObjectRequest {
  endpoint: Extract<keyof T['object'], string>;
  queries?: GetObjectQueries<T['object'][this['endpoint']]>;
}

/** .getAllContentIds() request type */
export interface GetAllContentIdsRequest<T extends MicroCMSEndpoints>
  extends _GetAllContentIdsRequest {
  endpoint: Extract<keyof T['list'], string>;
  alternateField?: Extract<keyof (T['list'][this['endpoint']] & MicroCMSListContent), string>;
}

/** .getAllContents() request type */
export interface GetAllContentRequest<T extends MicroCMSEndpoints> extends _GetAllContentRequest {
  endpoint: Extract<keyof T['list'], string>;
  queries?: GetAllContentQueries<T['list'][this['endpoint']]>;
}
