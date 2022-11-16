# microcms-ts-sdk

## Getting Started

### Install

```shell
npm i microcms-ts-sdk
# or
yarn add microcms-ts-sdk
```

### Usage

```ts
import { createClient } from 'microcms-ts-sdk';

// https://yyyyyyyy.microcms.io/api/v1/
const client = createClient<Endpoints>({
  serviceDomain: 'yyyyyyyy',
  apiKey: 'xxxxxxxxxx'
});

type Endpoints = {
  list: {
    blog: Blog;
  };
  object: {
    setting: Setting;
  };
};

type Blog = {
  title: string;
  body: string;
};

type Setting = {
  isDebug: boolean;
};
```

#### Fetch data

```ts
// microcms "list" API contents
client.getList({ endpoint: 'hoge' }); // Error
client.getList({ endpoint: 'setting' }); // Error
client.getList({ endpoint: 'blog' }); // Type safe argument "blog"

// microcms "list" API content by contentId
client.getListDetail({ endpoint: 'blog', contentId: 'xxxxxxxx' });

// microcms "list" API all contents
client.getAll({ endpoint: 'blog' });

// microcms "object" API content
client.getObject({ endpoint: 'hoge' }); // Error
client.getObject({ endpoint: 'blog' }); // Error
client.getObject({ endpoint: 'setting' }); // Type safe argument "setting"
```

#### Write data

```ts
// microcms "list" API contents// Create content
client
  .create({
    endpoint: 'blog',
    content: {
      title: 'title',
      body: 'body'
    }
  })
  .then((res) => console.log(res.id))
  .catch((err) => console.error(err));

// microcms "list" API content by contentId
client.getListDetail({ endpoint: 'blog', contentId: 'xxxxxxxx' });

// microcms "list" API all contents
client.getAll({ endpoint: 'blog' });

// microcms "object" API content
client.getObject({ endpoint: 'hoge' }); // Error
client.getObject({ endpoint: 'blog' }); // Error
client.getObject({ endpoint: 'setting' }); // Type safe argument "setting"
```
