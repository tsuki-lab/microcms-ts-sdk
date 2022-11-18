import {
  createClient as _createClient,
  MicroCMSListContent,
  MicroCMSObjectContent
} from 'microcms-js-sdk';
import {
  MicroCMSClient,
  WriteApiRequestResult,
  ClientEndPoints,
  GetListResponse,
  GetListDetailResponse,
  GetListRequest,
  GetObjectRequest,
  DeleteRequest,
  UpdateRequest,
  CreateRequest,
  GetListObjectResponse,
  GetListDetailRequest
} from './types';
import { queryParser } from './utils';

export const createClient = <T extends ClientEndPoints>(clientArg: MicroCMSClient) => {
  const _client = _createClient(clientArg);

  const getListDetail = <
    E extends keyof T['list'],
    C extends T['list'][E] & MicroCMSListContent,
    F extends keyof C
  >({
    endpoint,
    queries = {},
    ...arg
  }: GetListDetailRequest<T, E, C, F>): Promise<GetListDetailResponse<C, F>> => {
    return _client.getListDetail({
      endpoint: String(endpoint),
      queries: queryParser(queries),
      ...arg
    });
  };

  const getList = <
    E extends keyof T['list'],
    C extends T['list'][E] & MicroCMSListContent,
    F extends keyof C
  >({
    endpoint,
    queries = {},
    ...arg
  }: GetListRequest<T, E, C, F>): Promise<GetListResponse<C, F>> => {
    return _client.getList({
      endpoint: String(endpoint),
      queries: queryParser(queries),
      ...arg
    });
  };

  const getAll = <
    E extends keyof T['list'],
    C extends T['list'][E] & MicroCMSListContent,
    F extends keyof C
  >({
    endpoint,
    queries = {},
    ...arg
  }: GetListRequest<T, E, C, F>) => {
    const LIMIT = 1;
    const handler = async (offset = 0, limit = LIMIT): Promise<GetListResponse<C, F>> => {
      const data = await getList<E, C, F>({
        endpoint,
        queries: {
          ...queries,
          offset,
          limit
        },
        ...arg
      });

      if (data.offset + data?.limit >= data.totalCount) return data;

      const result = await handler(data.limit, data.offset + data.limit);

      return {
        offset: 0,
        limit: result.totalCount,
        totalCount: result.totalCount,
        contents: [...data.contents, ...result.contents]
      };
    };

    return handler();
  };

  const getObject = <
    E extends keyof T['object'],
    C extends T['object'][E] & MicroCMSObjectContent,
    F extends keyof C
  >({
    endpoint,
    queries = {},
    ...arg
  }: GetObjectRequest<T, E, C, F>): Promise<GetListObjectResponse<C, F>> => {
    return _client.getObject({
      endpoint: String(endpoint),
      queries: queryParser(queries),
      ...arg
    });
  };

  const create = <E extends keyof T['list']>({
    endpoint,
    content,
    ...arg
  }: CreateRequest<E, T['list'][E]>): Promise<WriteApiRequestResult> => {
    return _client.create({
      endpoint: String(endpoint),
      content: content as Record<number | string, any>,
      ...arg
    });
  };

  const update = ({
    endpoint,
    content,
    ...arg
  }: UpdateRequest<T, keyof T['list'], keyof T['object']>): Promise<WriteApiRequestResult> => {
    return _client.update({
      endpoint: String(endpoint),
      content: content as Record<number | string, any>,
      ...arg
    });
  };

  const _delete = ({ endpoint, ...arg }: DeleteRequest<keyof T['list']>): Promise<void> => {
    return _client.delete({
      endpoint: String(endpoint),
      ...arg
    });
  };

  return {
    getListDetail,
    getList,
    getObject,
    getAll,
    create,
    update,
    delete: _delete
  };
};
