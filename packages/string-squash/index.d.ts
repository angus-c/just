type Space = " ";

type Tab = "\t";

type NewLine = "\n";

type FormFeed = "\f";

type VertTab = "\v";

type Return = "\r";

type Replace<
  T extends string,
  Match extends string,
  Replacement extends string
> = T extends `${infer Start}${Match}${infer End}`
  ? `${Start}${Replacement}${End}`
  : T;

type SquashExtra<
  T extends string,
  U extends string = Replace<T, Space, "">,
  V extends string = Replace<T, Tab, "">,
  W extends string = Replace<T, NewLine, "">,
  X extends string = Replace<T, FormFeed, "">,
  Y extends string = Replace<T, VertTab, "">,
  Z extends string = Replace<T, Return, "">
> = U extends T
  ? V extends T
    ? W extends T
      ? X extends T
        ? Y extends T
          ? Z extends T
            ? T
            : SquashExtra<Z>
          : SquashExtra<Y>
        : SquashExtra<X>
      : SquashExtra<W>
    : SquashExtra<V>
  : SquashExtra<U>;

type Squash<T extends string, U extends boolean = false> = U extends true
  ? SquashExtra<T>
  : Replace<T, " ", ""> extends T
  ? T
  : Squash<Replace<T, " ", "">>;

declare function squash<T extends string>(str: T): Squash<T>;
declare function squash<T extends string, U extends boolean>(
  str: T,
  squashEscapeSequences: U
): Squash<T, U>;

export default squash;
