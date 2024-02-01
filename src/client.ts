import {
  createClient as _createClient,
  type MicroCMSClient as MicroCMSClientParams,
} from 'microcms-js-sdk';
import type { MicroCMSEndpoints } from './types';
import type {
  GetAllContentIdsRequest,
  GetAllContentRequest,
  GetListDetailRequest,
  GetListRequest,
  GetObjectRequest,
} from './request';
import type {
  GetAllContentResponse,
  GetDetailResponse,
  GetListResponse,
  GetObjectResponse
} from './response';

// /////////////////////////////////
// /////////////////////////////////
// Client
// /////////////////////////////////
// /////////////////////////////////

type CustomResponseType<T extends MicroCMSEndpoints> = {
  getList<R extends GetListRequest<T>>(request: R): Promise<GetListResponse<T, R>>;
  getListDetail<R extends GetListDetailRequest<T>>(request: R): Promise<GetDetailResponse<T, R>>;
  getObject<R extends GetObjectRequest<T>>(request: R): Promise<GetObjectResponse<T, R>>;
  getAllContentIds<R extends GetAllContentIdsRequest<T>>(request: R): Promise<string[]>;
  getAllContents<R extends GetAllContentRequest<T>>(
    request: R
  ): Promise<GetAllContentResponse<T, R>>;
}

export type MicroCMSClient<T extends MicroCMSEndpoints> = CustomResponseType<T> & Omit<ReturnType<typeof _createClient>, keyof CustomResponseType<T>>

/**
 * Initialize SDK Client
 */
export const createClient = <T extends MicroCMSEndpoints>(
  params: MicroCMSClientParams
): MicroCMSClient<T> => _createClient(params);
