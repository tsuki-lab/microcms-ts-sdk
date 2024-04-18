import {
  createClient as createClientOrigin,
  type MicroCMSClient as MicroCMSClientParams
} from 'microcms-js-sdk';
import type {
  ClientEndPoints,
  MicroCMSTsClient,
  MicroCMSGetListRequest,
  MicroCMSGetListResponse
} from './types';

export const createClient = <T extends ClientEndPoints>(
  clientArg: MicroCMSClientParams
): MicroCMSTsClient<T> => ({
  ...createClientOrigin(clientArg),
  getAll<R extends MicroCMSGetListRequest<T>>(request: R) {
    const LIMIT = 100;
    const handler = async (offset = 0, limit = LIMIT): Promise<MicroCMSGetListResponse<T, R>> => {
      console.log({ offset, limit });
      const data = await (this.getList as MicroCMSTsClient<T>['getList'])<R>(
        Object.assign({}, request, {
          queries: Object.assign({}, request.queries, { offset, limit })
        })
      );

      if (data.offset + data?.limit >= data.totalCount) return data;

      const result = await handler(data.offset + data.limit, data.limit);

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
