const slugFromPath = (path: string): string =>
  path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;

export default slugFromPath;
