import { createClient } from '../src';

type Content = {
  text: string;
};

interface Endpoints {
  list: {
    contents: Content;
  };
  object: {
    content: Content;
  };
}

const client = createClient<Endpoints>({
  serviceDomain: '',
  apiKey: ''
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
  .then((res) => res);

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
    endpoint: 'content',
    queries: {
      fields: ['text', 'publishedAt']
    }
  })
  .then((res) => res);

client
  .create({
    endpoint: 'contents',
    content: {
      text: 'dummy'
    }
  })
  .then((res) => res);

client
  .create({
    endpoint: 'contents',
    contentId: 'xxxxxx',
    content: {
      text: 'dummy'
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
    endpoint: 'content',
    content: {
      text: 'dummy'
    }
  })
  .then((res) => res);

client
  .delete({
    endpoint: 'contents',
    contentId: 'xxxxxx'
  })
  .then((res) => res);
