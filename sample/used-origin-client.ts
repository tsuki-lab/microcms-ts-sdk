import { createClient } from 'microcms-js-sdk';
import { MicroCMSClient } from '../src';

type Content = {
  text: string;
};

type Endpoints = {
  list: {
    contents: Content;
  };
  object: {
    content: Content;
  };
};

const client: MicroCMSClient<Endpoints> = createClient({
  serviceDomain: 'YOUR_DOMAIN',
  apiKey: 'YOUR_API_KEY'
});

client
  .getList({
    endpoint: 'contents',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  })
  .then((res) => res.contents[0]);
