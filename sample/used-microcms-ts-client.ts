import { MicroCMSRelation, createClient } from '../src';

type Content = {
  text: string;
  related: MicroCMSRelation<Content>[];
};

type Endpoints = {
  list: {
    contents: Content;
  };
  object: {
    pickup: {
      pickupContents: MicroCMSRelation<Content>[];
    };
  };
};

const client = createClient<Endpoints>({
  serviceDomain: 'YOUR_DOMAIN',
  apiKey: 'YOUR_API_KEY',
  retry: true
});

client
  .getListDetail({
    endpoint: 'contents',
    contentId: 'xxx',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  })
  .then((res) => res);

client
  .getList({
    endpoint: 'contents',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  })
  .then((res) => res.contents[0]);

client
  .getAll({
    endpoint: 'contents',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  })
  .then((res) => res.contents[0]);

client
  .getObject({
    endpoint: 'pickup',
    queries: {
      fields: ['text', 'publishedAt']
    }
  })
  .then((res) => res);

client
  .getAllContents({
    endpoint: 'contents'
  })
  .then((res) => res[0]);

client
  .create({
    endpoint: 'contents',
    content: {
      text: 'dummy',
      related: ['xxxxxx']
    }
  })
  .then((res) => res);

client
  .create({
    endpoint: 'contents',
    contentId: 'xxxxxx',
    content: {
      text: 'dummy',
      related: ['xxxxxx']
    }
  })
  .then((res) => res);

client
  .update({
    endpoint: 'contents',
    contentId: 'xxxxxx',
    content: {
      text: 'dummy'
    }
  })
  .then((res) => res);

client
  .update({
    endpoint: 'pickup',
    content: {
      pickupContents: ['xxxxxx']
    }
  })
  .then((res) => res);

client
  .delete({
    endpoint: 'contents',
    contentId: 'xxxxxx'
  })
  .then((res) => res);
