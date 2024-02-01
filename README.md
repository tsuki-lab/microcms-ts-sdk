# MicroCMS TypeScript SDK

This package is a wrapper for "microcms-js-sdk". More **TYPE SAFE**. 🛡️

[![npm version](https://badge.fury.io/js/microcms-ts-sdk.svg)](https://badge.fury.io/js/microcms-ts-sdk)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Supported type safe methods.
- 🛡️ `.getList()`
- 🛡️ `.getListDetail()`
- 🛡️ `.getObject()`
- 🛡️ `.getAllContentIds()`
- 🛡️ `.getAllContents()`
- 🛠️ `.create()`
- 🛠️ `.update()`
- 🛠️ `.delete()`
- 🛠️ `.get()`

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
import { createClient } from 'microcms-ts-sdk';

type Category = {
  slug: string;
  name: string;
};

type Post = {
  text: string;
  category: MicroCMSRelation<Category>;
  relatedArticles: MicroCMSRelation<Post>[];
};

type Endpoints = {
  // List API
  posts: MicroCMSListAPI<Post>;
  categories: MicroCMSListAPI<Category>;
  // Object API
  pickup: MicroCMSObjectAPI<{
    articles: MicroCMSRelation<Post>[];
  }>;
};

// Initialize Client SDK.
const client = createClient<Endpoints>({
  serviceDomain: 'YOUR_DOMAIN',
  apiKey: 'YOUR_API_KEY'
});

client
  .getList({
    endpoint: 'posts' // type safe endpoint
  })
  .then((res) => {
    // res: MicroCMSListResponse<Post>
    console.log(res);
  });
```

## Feature

### Support endpoint specification.

```ts
// The "contents" will be complemented.
client.getList({ endpoint: 'posts' });

// Error: Not in list format endpoint.
client.getList({ endpoint: 'posts' });
```

### Support response types.

```ts
// getList response type
client.getList({ endpoint: 'posts' });
// {
//   contents: {
//     id: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt?: string;
//     revisedAt?: string;
//     text: string;
//     category: {
//       id: string;
//       createdAt: string;
//       updatedAt: string;
//       publishedAt?: string;
//       revisedAt?: string;
//       slug: string;
//       name: string;
//     }
//     relatedArticles: {...}[];
//   }[];
//   totalCount: number;
//   limit: number;
//   offset: number;
// }

// Set options "queries.fields"
client.getList({
  endpoint: 'posts',
  queries: {
    fields: ['id', 'text', 'publishedAt', 'category.slug']
    // ^ (keyof (Post & MicroCMSListContent))[]
  }
});
// {
//   contents: {
//     id: string;
//     publishedAt?: string;
//     text: string;
//     category: {
//       slug: string;
//     }
//   }[];
//   totalCount: number;
//   limit: number;
//   offset: number;
// }
```

## LICENSE

Apache-2.0
