/* eslint-disable no-unused-vars */
import { MicroCMSRelation, createClient } from '../src';

type Post = {
  text: string;
  category: MicroCMSRelation<{ slug: string; name: string }>;
  relatedArticles: MicroCMSRelation<Post>[];
};

type Endpoints = {
  list: {
    posts: Post;
  }
  object: {
    pickup: {
      articles: MicroCMSRelation<Post>[];
    };
  }
};

const client = createClient<Endpoints>({
  serviceDomain: 'YOUR_DOMAIN',
  apiKey: 'YOUR_API_KEY'
});

(async () => {
  const getResult = await client.getList({
    endpoint: 'posts',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  });
  type GetResult = (typeof getResult)['contents'][number];
  //   ^?

  const getDetailResult = await client.getListDetail({
    endpoint: 'posts',
    contentId: 'CONTENT_ID',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  });
  type GetDetailResult = typeof getDetailResult;
  //   ^?

  const getObjectResult = await client.getObject({
    endpoint: 'pickup',
    queries: {
      fields: ['articles']
    }
  });
  type GetObjectResult = typeof getObjectResult;
  //   ^?

  const getAllContentIdsResult = await client.getAllContentIds({
    endpoint: 'posts',
    queries: {
      fields: ['id']
    }
  });
  type GetAllContentIdsResult = typeof getAllContentIdsResult;
  //   ^?

  const getRelatedArticlesResult = await client.getListDetail({
    endpoint: 'posts',
    contentId: 'CONTENT_ID',
    queries: {
      fields: ['category.slug', 'id']
    }
  });
  type GetRelatedArticlesResult = typeof getRelatedArticlesResult;
  //   ^?

  const getRelatedArticlesResult2 = await client.getListDetail({
    endpoint: 'posts',
    contentId: 'CONTENT_ID',
    queries: {
      fields: ['text', 'relatedArticles.id']
    }
  });
  type GetRelatedArticlesResult2 = typeof getRelatedArticlesResult2;
  //   ^?

  const createResult = await client.create({
    endpoint: 'posts',
    content: {
      text: 'text',
      category: 'CONTENTS_ID',
      relatedArticles: ['CONTENTS_ID', 'CONTENTS_ID']
    }
  });
  type CreateResult = typeof createResult;
  //   ^?

  const updateResult = await client.update({
    endpoint: 'posts',
    contentId: 'CONTENT_ID',
    content: {
      text: 'text',
      category: 'CONTENTS_ID',
      relatedArticles: ['CONTENTS_ID', 'CONTENTS_ID']
    }
  });
  type UpdateResult = typeof updateResult;
  //   ^?

  const updateResult2 = await client.update({
    endpoint: 'pickup',
    contentId: 'CONTENT_ID',
    content: {
      articles: ['CONTENTS_ID', 'CONTENTS_ID']
    }
  });
  type UpdateResult2 = typeof updateResult2;
  //   ^?

  const deleteResult = await client.delete({
    endpoint: 'posts',
    contentId: 'CONTENT_ID'
  });
  type DeleteResult = typeof deleteResult;
  //   ^?

  const getAllResult = await client.getAllContents({
    endpoint: 'posts',
    queries: {
      fields: ['id', 'text', 'publishedAt']
    }
  });
  type GetAllResult = (typeof getAllResult)[number];
  //   ^?

  const getAllIdResult = await client.getAllContentIds({
    endpoint: 'posts',
    alternateField: 'text'
  });
})();
