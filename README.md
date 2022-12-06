# MicroCMS TypeScript SDK

This package is a wrapper for "microcms-js-sdk". More type-safe.

[![npm version](https://badge.fury.io/js/microcms-ts-sdk.svg)](https://badge.fury.io/js/microcms-ts-sdk)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Getting Started

### install

install npm package.

```shell
npm i microcms-ts-sdk
# or
yarn add microcms-ts-sdk
```

### How to use

Supported of "microcms-js-sdk".<br />
For more information on how to use this service, please click [here](https://github.com/microcmsio/microcms-js-sdk#how-to-use).

### Type safe usage

```ts
import { createClient, MicroCMSSchemaInfer } from 'microcms-ts-sdk';

// Type definition
type Content = {
  text: string;
};

interface Endpoints {
  // API in list format.
  list: {
    contents: Content;
  };
  // API in object format
  object: {
    content: Content;
  };
}

// Initialize Client SDK.
const client = createClient<Endpoints>({
  serviceDomain: 'YOUR_DOMAIN', // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
  apiKey: 'YOUR_API_KEY'
});

// Schema type inference
type Schema = MicroCMSSchemaInfer<typeof client>;
/**
 * Schema[contents]
 * {
 *   id: string;
 *   createdAt: string;
 *   updatedAt: string;
 *   publishedAt?: string;
 *   revisedAt?: string;
 *   text: string;
 * }
 *
 * Schema[content]
 * {
 *   createdAt: string;
 *   updatedAt: string;
 *   publishedAt?: string;
 *   revisedAt?: string;
 *   text: string;
 * }
 */
```

It is also possible to use only type definitions for the original client.
(Unsupported `getAll` method)

```ts
import { createClient } from 'microcms-js-sdk';
import { MicroCMSClient } from 'microcms-ts-sdk';

type Endpoints = {
  // definition
};

const client: MicroCMSClient<Endpoints> = createClient({
  serviceDomain: 'YOUR_DOMAIN',
  apiKey: 'YOUR_API_KEY'
});
```

## Feature

Support endpoint specification.

```ts
// The "contents" will be complemented.
client.getList({ endpoint: 'contents' });

// Error: Not in list format endpoint.
client.getList({ endpoint: 'content' });
```

Support response types.

```ts
/**
 * // getList response type
 * {
 *  contents: {
 *    id: string;
 *    createdAt: string;
 *    updatedAt: string;
 *    publishedAt?: string;
 *    revisedAt?: string;
 *    text: string;
 *  }[];
 *  totalCount: number;
 *  limit: number;
 *  offset: number;
 * }
 */
client.getList({ endpoint: 'contents' });

/**
 * // Set options "queries.fields"
 * {
 *  contents: {
 *    id: string;
 *    publishedAt?: string;
 *    text: string;
 *  }[];
 *  totalCount: number;
 *  limit: number;
 *  offset: number;
 * }
 */
client.getList({
  endpoint: 'contents',
  queries: {
    fields: ['id', 'text', 'publishedAt'] // (keyof (Content & MicroCMSListContent))[]
  }
});
```

Support for all acquisitions.

```ts
/** Get all contents for endpoint */
client.getAll({
  endpoint: 'contents'
});
```

# LICENSE

Apache-2.0
