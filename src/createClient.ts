import {
  createClient as _createClient,
  MicroCMSClient,
  MicroCMSDate,
  MicroCMSListContent,
  WriteApiRequestResult,
  EndPoints,
  GetListQueries,
  GetListResponse,
  GetObjectQueries,
  GetQueries
} from './types';
import { queryParser } from './utils';

export const createClient = <T extends EndPoints>(clientArg: MicroCMSClient) => {
  const _client = _createClient(clientArg);

  const getListDetail = <
    E extends keyof T['list'],
    F extends keyof T['list'][E] & MicroCMSListContent
  >({
    endpoint,
    contentId,
    queries = {}
  }: {
    endpoint: E;
    contentId: string;
    queries?: GetQueries<F>;
  }): Promise<Pick<T['list'][E] & MicroCMSListContent, F>> => {
    return _client.getListDetail<Pick<T['list'][E] & MicroCMSListContent, F>>({
      endpoint: String(endpoint),
      contentId,
      queries: queryParser(queries)
    });
  };

  const getList = <E extends keyof T['list'], F extends keyof T['list'][E] & MicroCMSListContent>({
    endpoint,
    queries = {}
  }: {
    endpoint: E;
    queries?: GetListQueries<F>;
  }): Promise<GetListResponse<T['list'][E] & MicroCMSListContent, F>> => {
    return _client.getList<Pick<T['list'][E] & MicroCMSListContent, F>>({
      endpoint: String(endpoint),
      queries: queryParser(queries)
    });
  };

  const getObject = <E extends keyof T['object'], F extends keyof T['object'][E]>({
    endpoint,
    queries = {}
  }: {
    endpoint: E;
    queries?: GetObjectQueries<F>;
  }): Promise<Pick<T['object'][E] & MicroCMSDate, F>> => {
    return _client.getObject<Pick<T['object'][E] & MicroCMSDate, F>>({
      endpoint: String(endpoint),
      queries: queryParser(queries)
    });
  };

  const getAll = <E extends keyof T['list'], F extends keyof T['list'][E] & MicroCMSListContent>({
    endpoint,
    queries = {}
  }: {
    endpoint: E;
    queries?: GetListQueries<F>;
  }) => {
    const LIMIT = 1;
    const handler = async (
      offset = 0,
      limit = LIMIT
    ): Promise<GetListResponse<T['list'][E] & MicroCMSListContent, F>> => {
      const data = await getList({
        endpoint,
        queries: {
          ...queries,
          offset,
          limit
        }
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

  const create = <E extends keyof T['list']>({
    endpoint,
    contentId,
    content,
    isDraft
  }: {
    endpoint: E;
    contentId?: string;
    content: T['list'][E];
    isDraft?: boolean;
  }): Promise<WriteApiRequestResult> => {
    return _client.create({
      endpoint: String(endpoint),
      contentId,
      content: content as Record<number | string, any>,
      isDraft
    });
  };

  const update = <LE extends keyof T['list'], OE extends keyof T['object']>({
    endpoint,
    contentId,
    content
  }:
    | {
        endpoint: LE;
        contentId: string;
        content: Partial<T['list'][LE]>;
      }
    | {
        endpoint: OE;
        contentId: undefined;
        content: Partial<T['object'][OE]>;
      }): Promise<WriteApiRequestResult> => {
    return _client.update({
      endpoint: String(endpoint),
      contentId,
      content: content as Record<number | string, any>
    });
  };

  const _delete = <E extends keyof T['list']>({
    endpoint,
    contentId
  }: {
    endpoint: E;
    contentId: string;
  }): Promise<void> => {
    return _client.delete({
      endpoint: String(endpoint),
      contentId
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
