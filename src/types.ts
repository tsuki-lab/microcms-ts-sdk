type depthNumber = 1 | 2 | 3;

// https://document.microcms.io/content-api/get-content
export type GetQueries<T> = {
  draftKey?: string;
  fields?: T[];
  depth?: depthNumber;
  // TODO: richEditorFormat?: 'html' | 'object';
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
  // TODO: richEditorFormat?: 'html' | 'object';
};

export type EndPoints = {
  list?: {
    [key: string]: unknown;
  };
  object?: {
    [key: string]: unknown;
  };
};
