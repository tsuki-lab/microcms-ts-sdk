import {
  MicroCMSContentId,
  MicroCMSListContent,
  MicroCMSObjectContent,
  MicroCMSListResponse,
  MicroCMSQueries,
  WriteApiRequestResult as _WriteApiRequestResult,
  GetListDetailRequest as _GetListDetailRequest,
  GetListRequest as _GetListRequest,
  GetObjectRequest as _GetObjectRequest,
  CreateRequest as _CreateRequest,
  UpdateRequest as _UpdateRequest,
  DeleteRequest as _DeleteRequest,
  GetAllContentIdsRequest as _GetAllContentIdsRequest
} from 'microcms-js-sdk';
import { DecrementNum } from './type-utils';
import { createClient } from './client';

export type ClientEndPoints = {
  list?: {
    [key: string]: any;
  };
  object?: {
    [key: string]: any;
  };
};

/** adapted relation fields */
export type MicroCMSRelation<T> = T & MicroCMSListContent;

// default depth = 1
// https://document.microcms.io/content-api/get-list-contents#h30fce9c966
type ResolveDepthResponse<T, D extends number = 1> = MicroCMSListContent & {
  [K in keyof T]: T[K] extends infer Prop
    ? Prop extends MicroCMSRelation<infer R>
      ? D extends 0
        ? MicroCMSContentId
        : ResolveDepthResponse<NonNullable<R>, DecrementNum<D>>
      : Prop extends MicroCMSRelation<infer R>[]
      ? D extends 0
        ? MicroCMSContentId[]
        : ResolveDepthResponse<NonNullable<R>, DecrementNum<D>>[]
      : Prop
    : never;
};

type ResolveDepthQuery<R, C> = R extends {
  queries: {
    depth: infer D extends NonNullable<MicroCMSQueries['depth']>;
  };
}
  ? ResolveDepthResponse<C, D>
  : ResolveDepthResponse<C>;

type ResolveContentType<
  T extends ClientEndPoints,
  I extends keyof ClientEndPoints,
  R extends { endpoint: keyof T[I] },
  C = T[I][R['endpoint']] & (I extends 'list' ? MicroCMSListContent : MicroCMSObjectContent)
> = R extends {
  queries: {
    fields: (infer F extends keyof C)[];
  };
}
  ? ResolveDepthQuery<R, Pick<C, F>>
  : ResolveDepthQuery<R, C>;

type ResolveUpsertRelation<T> = {
  [K in keyof T]: T[K] extends infer Props
    ? Props extends MicroCMSRelation<unknown>
      ? string
      : Props extends MicroCMSRelation<unknown>[]
      ? string[]
      : Props
    : never;
};

/** getListDetail queries type */
export interface MicroCMSGetListDetailQueries<E>
  extends Omit<
    MicroCMSQueries,
    'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'
  > {
  fields?: Extract<keyof E | keyof MicroCMSListContent, string>[];
}

/** getListDetail request type */
export interface MicroCMSGetListDetailRequest<T extends ClientEndPoints>
  extends _GetListDetailRequest {
  endpoint: Extract<keyof T['list'], string>;
  queries?: MicroCMSGetListDetailQueries<T['list'][this['endpoint']]>;
}

/** getListDetail response type */
export type MicroCMSGetListDetailResponse<
  T extends ClientEndPoints,
  R extends MicroCMSGetListDetailRequest<T>
> = ResolveContentType<T, 'list', R>;

/** getList queries type */
export interface MicroCMSGetListQueries<E> extends MicroCMSQueries {
  fields?: Extract<keyof E | keyof MicroCMSListContent, string>[];
}

/** getList request type */
export interface MicroCMSGetListRequest<T extends ClientEndPoints> extends _GetListRequest {
  endpoint: Extract<keyof T['list'], string>;
  queries?: MicroCMSGetListQueries<T['list'][this['endpoint']]>;
}

/** getList response type */
export interface MicroCMSGetListResponse<
  T extends ClientEndPoints,
  R extends MicroCMSGetListRequest<T>
> extends Omit<MicroCMSListResponse<unknown>, 'contents'> {
  contents: ResolveContentType<T, 'list', R>[];
}

/** getObject queries type */
export interface MicroCMSGetObjectQueries<E>
  extends Omit<
    MicroCMSQueries,
    'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'
  > {
  fields?: Extract<keyof E | keyof MicroCMSObjectContent, string>[];
}

/** getObject queries type */
export interface MicroCMSGetObjectRequest<T extends ClientEndPoints> extends _GetObjectRequest {
  endpoint: Extract<keyof T['object'], string>;
  queries?: MicroCMSGetObjectQueries<T['object'][this['endpoint']]>;
}

/** getObject response type */
export type MicroCMSGetObjectResponse<
  T extends ClientEndPoints,
  R extends MicroCMSGetObjectRequest<T>
> = ResolveContentType<T, 'object', R>;

/** create and update result type */
export type WriteApiRequestResult = _WriteApiRequestResult;

/** create request type */
export interface CreateRequest<T extends ClientEndPoints>
  extends _CreateRequest<Record<string, any>> {
  endpoint: Extract<keyof T['list'] | keyof T['object'], string>;
  content: ResolveUpsertRelation<(T['list'] & T['object'])[this['endpoint']] & Record<string, any>>;
}

/** getAllContentIds request type */
export interface GetAllContentIdsRequest<T extends ClientEndPoints>
  extends _GetAllContentIdsRequest {
  endpoint: Extract<keyof T['list'], string>;
  alternateField?: Extract<keyof T['list'][this['endpoint']] | keyof MicroCMSListContent, string>;
}

export interface UpdateListRequest<T extends ClientEndPoints> extends _UpdateRequest<unknown> {
  endpoint: Extract<keyof T['list'], string>;
  contentId: string;
  content: Partial<ResolveUpsertRelation<T['list'][this['endpoint']]>>;
}

export interface UpdateObjectRequest<T extends ClientEndPoints> extends _UpdateRequest<unknown> {
  endpoint: Extract<keyof T['object'], string>;
  content: Partial<ResolveUpsertRelation<T['object'][this['endpoint']]>>;
}

/** update request type */
export type UpdateRequest<T extends ClientEndPoints> =
  | UpdateListRequest<T>
  | UpdateObjectRequest<T>;

/** delete request type */
export interface DeleteRequest<T extends ClientEndPoints> extends _DeleteRequest {
  endpoint: Extract<keyof T['list'] | keyof T['object'], string>;
}

export interface MicroCMSClient<T extends ClientEndPoints> {
  getListDetail<R extends MicroCMSGetListDetailRequest<T>>(
    request: R
  ): Promise<MicroCMSGetListDetailResponse<T, R>>;
  getList<R extends MicroCMSGetListRequest<T>>(request: R): Promise<MicroCMSGetListResponse<T, R>>;
  getObject<R extends MicroCMSGetObjectRequest<T>>(
    request: R
  ): Promise<MicroCMSGetObjectResponse<T, R>>;
  create<R extends CreateRequest<T>>(request: R): Promise<WriteApiRequestResult>;
  update<R extends UpdateRequest<T>>(request: R): Promise<WriteApiRequestResult>;
  delete<R extends DeleteRequest<T>>(request: R): Promise<void>;
  getAllContentIds<R extends GetAllContentIdsRequest<T>>(request: R): Promise<string[]>;
}

export interface MicroCMSTsClient<T extends ClientEndPoints> extends MicroCMSClient<T> {
  getAll<R extends MicroCMSGetListRequest<T>>(request: R): Promise<MicroCMSGetListResponse<T, R>>;
}
type ExceptEndpoints<T> = T extends MicroCMSTsClient<infer U> ? U : unknown;

export type MicroCMSSchemaInfer<T extends ReturnType<typeof createClient>> = {
  [K in Parameters<T['getList']>[0]['endpoint']]: MicroCMSGetListDetailResponse<
    ExceptEndpoints<T>,
    { endpoint: K; contentId: string }
  >;
} & {
  [K in Parameters<T['getObject']>[0]['endpoint']]: MicroCMSGetObjectResponse<
    ExceptEndpoints<T>,
    { endpoint: K }
  >;
};

export type MicroCMSDepthInfer<T, D extends number> = T extends ResolveDepthResponse<infer U>
  ? ResolveDepthResponse<U, D>
  : ResolveDepthResponse<T, D>;
