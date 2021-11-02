const slugFromBlogPath = (path: string): string =>
  path.match(/([\w-]+)\/index\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export default slugFromBlogPath;
