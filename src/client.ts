import { createClient as _createClient, MicroCMSClient } from 'microcms-js-sdk';
import { ClientEndPoints, ExtendedMicroCMSClient, GetListRequest, GetListResponse } from './types';

export const createClient = <T extends ClientEndPoints>(
  clientArg: MicroCMSClient
): ExtendedMicroCMSClient<T> => ({
  ..._createClient(clientArg),
  // eslint-disable-next-line space-before-function-paren
  async getAll<R extends GetListRequest<T>>(request: R) {
    const LIMIT = 1;
    const handler = async (offset = 0, limit = LIMIT): Promise<GetListResponse<T, R>> => {
      const data = await this.getList<R>(
        Object.assign({}, request, {
          queries: Object.assign({}, request.queries, { offset, limit })
        })
      );

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
  }
});
