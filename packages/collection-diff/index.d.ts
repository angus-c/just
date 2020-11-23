export type Operation = "add" | "replace" | "remove";

export type JSONPatchPathConverter<OUTPUT> = (
  arrayPath: Array<string | number>
) => OUTPUT;

export function diff(
  a: any,
  b: any
): Array<{ op: Operation; path: Array<string | number>; value: any }>;

export function diff<PATH>(
  a: any,
  b: any,
  jsonPatchPathConverter: JSONPatchPathConverter<PATH>
): Array<{ op: Operation; path: PATH; value: any }>;

export const jsonPatchPathConverter: JSONPatchPathConverter<string>;
