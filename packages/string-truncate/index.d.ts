declare function truncate<T extends string>(string: T): T;
declare function truncate(string: string, maxLength: number): string;
declare function truncate(
  string: string,
  maxLength: number,
  ellipsis: string
): string;
export default truncate;
