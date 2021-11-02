import slugFromPath from '$utils/slugFromPath';

export const getPublishedPosts = async () => {
  const modules = import.meta.glob('/**/*.md');

  const postPromises = [];

  for (const [path, resolver] of Object.entries(modules)) {
    const slug = slugFromPath(path);
    const promise = resolver().then((post) => ({
      slug,
      ...post.metadata
    }));

    postPromises.push(promise);
  }

  const posts = await Promise.all(postPromises);
  const publishedPosts = posts.filter((post) => post.published);

  return publishedPosts.sort((a, b) => {
    return new Date(a.date.split('.').reverse().toString()) <
      new Date(b.date.split('.').reverse().toString())
      ? 1
      : -1;
  });
};
