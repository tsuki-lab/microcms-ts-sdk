# microcms-ts-client

## Usage

```ts
import { createClient } from 'microcms-ts-client';

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
