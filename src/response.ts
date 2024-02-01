import type {
  MicroCMSContentId,
  MicroCMSListContent,
  MicroCMSObjectContent,
  MicroCMSQueries
} from 'microcms-js-sdk';
import type { DecrementNum, PickByFields } from './utils';
import type { MicroCMSEndpoints, MicroCMSRelation } from './types';
import type {
  GetAllContentRequest,
  GetListDetailRequest,
  GetListRequest,
  GetObjectRequest,
  ResolveQueryFieldsRelation
} from './request';

type ResolveDepthContent<T, D extends number = 1> = {
  [K in keyof T]: T[K] extends infer Prop
    ? Prop extends MicroCMSRelation<infer R>
      ? D extends 0
        ? MicroCMSContentId
        : ResolveDepthContent<NonNullable<R>, DecrementNum<D>> & MicroCMSListContent
      : Prop extends MicroCMSRelation<infer R>[]
      ? D extends 0
        ? MicroCMSContentId[]
        : (ResolveDepthContent<NonNullable<R>, DecrementNum<D>> & MicroCMSListContent)[]
      : Prop
    : never;
};

type ResolveDepthResponse<R, C> = R extends {
  queries: {
    depth: infer D extends NonNullable<MicroCMSQueries['depth']>;
  };
}
  ? ResolveDepthContent<C, D>
  : ResolveDepthContent<C>;

type GetResponse<
  T extends MicroCMSEndpoints,
  I extends keyof T,
  R extends { endpoint: keyof T[I] },
  C = T[I][R['endpoint']] & (I extends 'list' ? MicroCMSListContent : MicroCMSObjectContent),
  M = I extends 'list'
    ? MicroCMSListContent
    : MicroCMSObjectContent
> = R extends {
  queries: {
    fields: (infer F extends Extract<ResolveQueryFieldsRelation<C, M>, string>)[];
  };
}
  ? ResolveDepthResponse<R, PickByFields<C, F>>
  : ResolveDepthResponse<R, C>;

// /////////////////////////////////
// /////////////////////////////////
// MicroCMS API Response Types
// /////////////////////////////////
// /////////////////////////////////

/** .getListDetail() response type */
export type GetDetailResponse<
  T extends MicroCMSEndpoints,
  R extends GetListDetailRequest<T>
> = GetResponse<T, 'list', R>;

/** .getList() response type */
export type GetListResponse<T extends MicroCMSEndpoints, R extends GetListRequest<T>> = {
  contents: GetResponse<T, 'list', R>[];
  totalCount: number;
  offset: number;
  limit: number;
};

/** .getObject() response type */
export type GetObjectResponse<
  T extends MicroCMSEndpoints,
  R extends GetObjectRequest<T>
> = GetResponse<T, 'object', R>;

/** .getAllContents() response type */
export type GetAllContentResponse<
  T extends MicroCMSEndpoints,
  R extends GetAllContentRequest<T>
> = GetResponse<T, 'list', R>[];
