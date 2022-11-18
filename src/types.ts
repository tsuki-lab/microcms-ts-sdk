import {
  MicroCMSListResponse,
  MicroCMSQueries,
  MicroCMSClient,
  WriteApiRequestResult as _WriteApiRequestResult,
  GetListDetailRequest as _GetListDetailRequest,
  GetListRequest as _GetListRequest,
  GetObjectRequest as _GetObjectRequest,
  CreateRequest as _CreateRequest,
  UpdateRequest as _UpdateRequest,
  DeleteRequest as _DeleteRequest
} from 'microcms-js-sdk';

export type ClientEndPoints = {
  list?: {
    [key: string]: any;
  };
  object?: {
    [key: string]: any;
  };
};

/** getListDetail queries type */
export type GetListDetailQueries<F> = {
  fields?: F[];
} & Omit<MicroCMSQueries, 'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'>;

/** getListDetail request type */
export type GetListDetailRequest<
  T extends ClientEndPoints,
  E extends keyof T['list'],
  C extends T['list'][E],
  F extends keyof C
> = {
  endpoint: E;
  queries?: GetListDetailQueries<F>;
} & Omit<_GetListDetailRequest, 'endpoint' | 'queries'>;

/** getListDetail response type */
export type GetListDetailResponse<C, F extends keyof C> = Pick<C, F>;

/** getList queries type */
export type GetListQueries<F> = {
  fields?: F[];
} & Omit<MicroCMSQueries, 'fields'>;

/** getList request type */
export type GetListRequest<
  T extends ClientEndPoints,
  E extends keyof T['list'],
  C extends T['list'][E],
  F extends keyof C
> = {
  endpoint: E;
  queries?: GetListQueries<F>;
} & Omit<_GetListRequest, 'endpoint' | 'queries'>;

/** getList response type */
export type GetListResponse<C, F extends keyof C> = {
  contents: Pick<C, F>[];
  totalCount: number;
  offset: number;
  limit: number;
} & Omit<MicroCMSListResponse<C>, 'contents'>;

/** getObject queries type */
export type GetObjectQueries<F> = {
  fields?: F[];
} & Omit<MicroCMSQueries, 'fields' | 'limit' | 'offset' | 'orders' | 'q' | 'ids' | 'filters'>;

/** getObject request type */
export type GetObjectRequest<
  T extends ClientEndPoints,
  E extends keyof T['object'],
  C extends T['object'][E],
  F extends keyof C
> = {
  endpoint: E;
  queries?: GetObjectQueries<F>;
} & Omit<_GetObjectRequest, 'endpoint' | 'queries'>;

/** getObject response type */
export type GetListObjectResponse<C, F extends keyof C> = Pick<C, F>;

/** create and update result type */
export type WriteApiRequestResult = _WriteApiRequestResult;

/** create request type */
export type CreateRequest<E, C> = {
  endpoint: E;
} & Omit<_CreateRequest<C>, 'endpoint'>;

/** update request type */
export type UpdateRequest<
  T extends ClientEndPoints,
  LE extends keyof T['list'],
  OE extends keyof T['object']
> =
  | ({
      endpoint: LE;
      contentId: string;
    } & Omit<_UpdateRequest<T['list'][OE]>, 'endpoint' | 'contentId'>)
  | ({
      endpoint: OE;
    } & Omit<_UpdateRequest<T['object'][OE]>, 'endpoint' | 'contentId'>);

/** delete request type */
export type DeleteRequest<E> = {
  endpoint: E;
} & Omit<_DeleteRequest, 'endpoint'>;

export { MicroCMSClient };
