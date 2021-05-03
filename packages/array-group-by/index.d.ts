type PropertyKey = string | symbol
type Stringifyable = {
  toString: () => string
}

export default function groupBy<T>(arr: T[], cb: (arg: T) => Stringifyable): { [key in PropertyKey]: T[] }