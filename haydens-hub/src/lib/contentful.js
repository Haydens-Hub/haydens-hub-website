import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getEntries(contentType) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
