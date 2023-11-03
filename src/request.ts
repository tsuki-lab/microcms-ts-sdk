import {
  GetListDetailRequest as _GetListDetailRequest,
  GetListRequest as _GetListRequest,
  GetObjectRequest as _GetObjectRequest,
  GetAllContentIdsRequest as _GetAllContentIdsRequest,
  GetAllContentRequest as _GetAllContentRequest,
  CreateRequest as _CreateRequest,
  UpdateRequest as _UpdateRequest,
  DeleteRequest as _DeleteRequest,
  MicroCMSQueries as _MicroCMSQueries,
  MicroCMSListContent,
  MicroCMSObjectContent
} from 'microcms-js-sdk';
import { MicroCMSEndpoints, MicroCMSListAPI, MicroCMSObjectAPI, MicroCMSRelation } from './types';
import { MicroCMSListAPIPropertiesOnly } from './helper';

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

type ResolveRequestRelation<T> = {
  [K in keyof T]: T[K] extends infer Prop
    ? Prop extends MicroCMSRelation<any>[]
      ? string[]
      : Prop extends MicroCMSRelation<any>
      ? string
      : Prop
    : never;
};

// /////////////////////////////////
// /////////////////////////////////
// MicroCMS API Queries Types
// /////////////////////////////////
// /////////////////////////////////

/** .getListDetail() queries type */
export interface GetListDetailQueries<T extends MicroCMSListAPIPropertiesOnly<any>>
  extends Omit<
    _MicroCMSQueries,
    'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'
  > {
  fields?: Extract<
    ResolveQueryFieldsRelation<T['contents'][number], MicroCMSListContent>,
    string
  >[];
}

/** .getList() queries type */
export interface GetListQueries<T extends MicroCMSListAPI<any>> extends _MicroCMSQueries {
  fields?: Extract<
    ResolveQueryFieldsRelation<T['contents'][number], MicroCMSListContent>,
    string
  >[];
}

/** .getObject() queries type */
export interface GetObjectQueries<T extends MicroCMSObjectAPI<any>>
  extends Omit<
    _MicroCMSQueries,
    'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'
  > {
  fields?: Extract<ResolveQueryFieldsRelation<T, MicroCMSObjectContent>, string>[];
}

/** .getAllContentIds() queries type */
export interface GetAllContentQueries<T extends MicroCMSListAPI<any>>
  extends Omit<_MicroCMSQueries, 'limit' | 'offset' | 'ids'> {
  fields?: Extract<
    ResolveQueryFieldsRelation<T['contents'][number], MicroCMSListContent>,
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
  endpoint: Extract<keyof MicroCMSListAPIPropertiesOnly<T>, string>;
  queries?: GetListDetailQueries<T[this['endpoint']]>;
}

/** .getList() request type */
export interface GetListRequest<T extends MicroCMSEndpoints> extends _GetListRequest {
  endpoint: Extract<keyof MicroCMSListAPIPropertiesOnly<T>, string>;
  queries?: GetListQueries<T[this['endpoint']]>;
}

/** .getObject() request type */
export interface GetObjectRequest<T extends MicroCMSEndpoints> extends _GetObjectRequest {
  endpoint: Extract<Exclude<keyof T, keyof MicroCMSListAPIPropertiesOnly<T>>, string>;
  queries?: GetObjectQueries<T[this['endpoint']]>;
}

/** .getAllContentIds() request type */
export interface GetAllContentIdsRequest<T extends MicroCMSEndpoints>
  extends _GetAllContentIdsRequest {
  endpoint: Extract<keyof MicroCMSListAPIPropertiesOnly<T>, string>;
  alternateField?: Extract<keyof T['contents'][number], string>;
}

/** .getAllContents() request type */
export interface GetAllContentRequest<T extends MicroCMSEndpoints> extends _GetAllContentRequest {
  endpoint: Extract<keyof MicroCMSListAPIPropertiesOnly<T>, string>;
  queries?: GetAllContentQueries<T[this['endpoint']]>;
}

/** .create() request type */
export interface CreateRequest<T extends MicroCMSEndpoints> extends _CreateRequest<unknown> {
  endpoint: Extract<keyof MicroCMSListAPIPropertiesOnly<T>, string>;
  content: Partial<
    ResolveRequestRelation<Omit<T[this['endpoint']]['contents'][number], keyof MicroCMSListContent>>
  > &
    Record<string | number, unknown>;
}

interface UpdateListAPIRequest<T extends MicroCMSEndpoints> extends _UpdateRequest<unknown> {
  endpoint: Extract<keyof MicroCMSListAPIPropertiesOnly<T>, string>;
  content: Partial<
    ResolveRequestRelation<Omit<T[this['endpoint']]['contents'][number], keyof MicroCMSListContent>>
  > &
    Record<string | number, unknown>;
}

interface UpdateObjectAPIRequest<T extends MicroCMSEndpoints> extends _UpdateRequest<unknown> {
  endpoint: Extract<Exclude<keyof T, keyof MicroCMSListAPIPropertiesOnly<T>>, string>;
  content: ResolveRequestRelation<Omit<T[this['endpoint']], keyof MicroCMSObjectContent>>;
}

/** .update() request type */
export type UpdateRequest<T extends MicroCMSEndpoints> =
  | UpdateListAPIRequest<T>
  | UpdateObjectAPIRequest<T>;

/** .delete() request type */
export interface DeleteRequest<T extends MicroCMSEndpoints> extends _DeleteRequest {
  endpoint: Extract<keyof T, string>;
}
