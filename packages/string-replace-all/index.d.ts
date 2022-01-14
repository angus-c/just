type ReplaceAll<
  Str extends string,
  SubStr extends string,
  NewSubStr extends string
> = Str extends `${infer Before}${SubStr}${infer After}`
  ? `${Before}${NewSubStr}${ReplaceAll<After, SubStr, NewSubStr>}`
  : Str;

declare function replaceAll<
  Str extends string,
  SubStr extends string,
  NewSubStr extends string
>(
  str: Str,
  subStr: SubStr,
  newSubStr: NewSubStr
): ReplaceAll<Str, SubStr, NewSubStr>;
export default replaceAll;
