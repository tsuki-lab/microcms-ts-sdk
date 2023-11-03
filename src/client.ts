import {
  createClient as _createClient,
  MicroCMSClient,
  WriteApiRequestResult
} from 'microcms-js-sdk';
import { MicroCMSEndpoints } from './types';
import {
  CreateRequest,
  DeleteRequest,
  GetAllContentIdsRequest,
  GetAllContentRequest,
  GetListDetailRequest,
  GetListRequest,
  GetObjectRequest,
  UpdateRequest
} from './request';
import {
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

/**
 * Initialize SDK Client
 */
export const createClient = <T extends MicroCMSEndpoints>(
  params: MicroCMSClient
): {
  getList<R extends GetListRequest<T>>(request: R): Promise<GetListResponse<T, R>>;
  getListDetail<R extends GetListDetailRequest<T>>(request: R): Promise<GetDetailResponse<T, R>>;
  getObject<R extends GetObjectRequest<T>>(request: R): Promise<GetObjectResponse<T, R>>;
  getAllContentIds<R extends GetAllContentIdsRequest<T>>(request: R): Promise<string[]>;
  getAllContents<R extends GetAllContentRequest<T>>(
    request: R
  ): Promise<GetAllContentResponse<T, R>>;
  create<R extends CreateRequest<T>>(request: R): Promise<WriteApiRequestResult>;
  update<R extends UpdateRequest<T>>(request: R): Promise<WriteApiRequestResult>;
  delete<R extends DeleteRequest<T>>(request: R): Promise<void>;
} => _createClient(params);
