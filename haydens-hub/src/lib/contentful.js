import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getEntries(contentType) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}

export async function getAllBlogs() {
  const types = [
    'academicBlog',
    'advocacyBlog',
    'communitySpotlightBlog',
    'creativeBlog',
    'youthVoicesBlog',
  ];

  const all = await Promise.all(
    types.map((type) =>
      client.getEntries({ content_type: type, include: 2 }) // include=2 fetches author link
    )
  );

  return all.flatMap((res) => res.items);
}

export async function getAllAuthors() {
  const authors = await client.getEntries({ content_type: 'author', include: 10 });
  return authors.items;
}
