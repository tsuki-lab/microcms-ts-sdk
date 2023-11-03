import {
  MicroCMSContentId,
  MicroCMSListContent,
  MicroCMSObjectContent,
  MicroCMSQueries
} from 'microcms-js-sdk';
import { DecrementNum, PickByFields } from './utils';
import { MicroCMSEndpoints, MicroCMSRelation } from './types';
import { MicroCMSListAPIPropertiesOnly } from './helper';
import {
  GetAllContentRequest,
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
  R extends { endpoint: keyof T },
  C = R['endpoint'] extends keyof MicroCMSListAPIPropertiesOnly<T>
    ? T[R['endpoint']]['contents'][number]
    : T[R['endpoint']],
  M = R['endpoint'] extends keyof MicroCMSListAPIPropertiesOnly<T>
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
  R extends GetListRequest<T>
> = GetResponse<T, R>;

/** .getList() response type */
export type GetListResponse<T extends MicroCMSEndpoints, R extends GetListRequest<T>> = {
  contents: GetResponse<T, R>[];
  totalCount: number;
  offset: number;
  limit: number;
};

/** .getObject() response type */
export type GetObjectResponse<
  T extends MicroCMSEndpoints,
  R extends GetObjectRequest<T>
> = GetResponse<T, R>;

/** .getAllContents() response type */
export type GetAllContentResponse<
  T extends MicroCMSEndpoints,
  R extends GetAllContentRequest<T>
> = GetResponse<T, R>[];
