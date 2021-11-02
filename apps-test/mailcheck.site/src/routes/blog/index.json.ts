import { getPublishedPosts } from './_blog';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const body = await getPublishedPosts();
  return { body };
};
