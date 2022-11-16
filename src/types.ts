export {
  createClient,
  MicroCMSClient,
  MicroCMSDate,
  MicroCMSListContent,
  WriteApiRequestResult
} from 'microcms-js-sdk';

type depthNumber = 1 | 2 | 3;
type richEditorFormat = 'html' | 'object';

// https://document.microcms.io/content-api/get-content
export type GetQueries<T> = {
  draftKey?: string;
  fields?: T[];
  depth?: depthNumber;
  richEditorFormat?: richEditorFormat;
};

// https://document.microcms.io/content-api/get-list-contents
export type GetListQueries<T> = {
  draftKey?: string;
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  fields?: T[];
  ids?: string;
  filters?: string;
  depth?: depthNumber;
  richEditorFormat?: richEditorFormat;
};

export type GetObjectQueries<T> = GetListQueries<T>;

export type GetListResponse<T, F extends keyof T> = {
  contents: Pick<T, F>[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type EndPoints = {
  list?: {
    [key: string]: any;
  };
  object?: {
    [key: string]: any;
  };
};
