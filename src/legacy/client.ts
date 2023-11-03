import {
  createClient as createClientOrigin,
  MicroCMSClient as MicroCMSClientParams
} from 'microcms-js-sdk';
import {
  ClientEndPoints,
  MicroCMSTsClient,
  MicroCMSGetListRequest,
  MicroCMSGetListResponse
} from './types';

/**
 * Creates a MicroCMS client with the specified parameters.
 * @deprecated This function is deprecated and will be removed in a future release.
 * @template T - The type of the client endpoints.
 * @param {MicroCMSClientParams} clientArg - The client parameters.
 * @returns {MicroCMSTsClient<T>} - The MicroCMS client.
 */
export const createClient = <T extends ClientEndPoints>(
  clientArg: MicroCMSClientParams
): MicroCMSTsClient<T> => ({
  ...createClientOrigin(clientArg),
  getAll<R extends MicroCMSGetListRequest<T>>(request: R) {
    const LIMIT = 100;
    const handler = async (offset = 0, limit = LIMIT): Promise<MicroCMSGetListResponse<T, R>> => {
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
